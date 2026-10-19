import test from 'node:test';
import assert from 'node:assert/strict';
import {HAL_ACTIONS, halPose, boundHal, stepHal} from '../dist/hal-motion.js';
import {halSVG} from '../dist/hal-character.js';
import {askHal, settleHalReply, readHalInput, allowHalMessage} from '../server/hal.js';

test('every action renders a valid 48px rig, mirrored when facing left', () => {
  for (const action of HAL_ACTIONS) for (const seconds of [0, 0.37, 2.2]) {
    const svg = halSVG({action, seconds});
    assert.match(svg, /^<svg class="hal-rig" viewBox="0 0 48 48"/);
    assert.doesNotMatch(svg, /NaN|undefined/);
  }
  assert.match(halSVG({facing: -1}), /scale\(-1 1\)/);
});

test('poses interpolate smoothly and only slithering moves the coils', () => {
  assert.equal(halPose('idle', 1).stride, 0);
  assert.notEqual(halPose('walk', 0.15).stride, 0);
  const a = halPose('happy', 0.1).bounce, b = halPose('happy', 0.11).bounce;
  assert.ok(Math.abs(a - b) < 0.5);
});

test('movement stays on screen and never overshoots its target', () => {
  assert.deepEqual(boundHal({x: -40, y: 5000}, 800, 600), {x: 0, y: 504});
  assert.deepEqual(stepHal({x: 0, y: 0}, {x: 10, y: 0}, 1, 70), {x: 10, y: 0});
  assert.deepEqual(stepHal({x: 0, y: 0}, {x: 100, y: 0}, 0.5, 70), {x: 35, y: 0});
});

test('Hal only gets angry when the server judged a wrong why, and gives up after three misses', () => {
  const raw = {reply: 'Hmm', mood: 'angry', verdict: 'incorrect', askedWhy: true};
  assert.equal(settleHalReply(raw, {pendingWhy: false, missedWhys: 0}).mood, 'thinking');
  assert.deepEqual(settleHalReply(raw, {pendingWhy: true, missedWhys: 0}), {reply: 'Hmm', mood: 'angry', verdict: 'incorrect', awaitingWhy: true, missedWhys: 1});
  assert.equal(settleHalReply(raw, {pendingWhy: true, missedWhys: 2}).mood, 'sad');
  assert.equal(settleHalReply({...raw, verdict: 'correct', mood: 'idle'}, {pendingWhy: true, missedWhys: 1}).mood, 'happy');
});

test('input is validated and lesson context is resolved on the server', () => {
  assert.throws(() => readHalInput({message: '   '}), /under/);
  assert.throws(() => readHalInput({message: 'hi', history: [{role: 'system', text: 'x'}]}), /could not read/);
  assert.throws(() => readHalInput({message: 'hi', lessonId: 'nope'}), /not part/);
  const turn = readHalInput({message: 'hi', event: 'Not a real event', lessonId: 'guidelines'});
  assert.equal(turn.event, null);
  assert.equal(turn.lesson.id, 'guidelines');
});

test('askHal sends the lesson to Gemini with the key in a header, and fails closed', async () => {
  let sent;
  const fetcher = async (url, init) => {
    sent = {url, init, body: JSON.parse(init.body)};
    return new Response(JSON.stringify({candidates: [{finishReason: 'STOP', content: {parts: [{text: JSON.stringify({reply: 'Hi there!', mood: 'wave', verdict: 'none', askedWhy: false})}]}}]}));
  };
  const reply = await askHal({message: 'hello', lessonId: 'guidelines', event: 'Nursing Assisting'}, {apiKey: 'test-key', model: 'gemini-test', fetcher});
  assert.deepEqual(reply, {reply: 'Hi there!', mood: 'wave', verdict: 'none', awaitingWhy: false, missedWhys: 0});
  assert.match(sent.url, /models\/gemini-test:generateContent$/);
  assert.equal(sent.init.headers['x-goog-api-key'], 'test-key');
  const payload = JSON.parse(sent.body.contents[0].parts[0].text);
  assert.equal(payload.event.name, 'Nursing Assisting');
  assert.equal(payload.lesson.answer, 'The current official event guidelines');
  const broken = async () => new Response('{}', {status: 500});
  await assert.rejects(askHal({message: 'hello'}, {apiKey: 'k', fetcher: broken}), /nap/);
  await assert.rejects(askHal({message: 'hello'}, {apiKey: ' '}), /GEMINI_API_KEY/);
});

test('the rate limiter blocks after the limit within the window', () => {
  const log = new Map();
  for (let i = 0; i < 3; i++) assert.ok(allowHalMessage(log, 'a', 1000, 3));
  assert.equal(allowHalMessage(log, 'a', 1000, 3), false);
  assert.ok(allowHalMessage(log, 'a', 1000 + 11 * 60_000, 3));
});
