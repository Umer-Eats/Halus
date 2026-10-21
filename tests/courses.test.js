import test, { after, before } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { createApp } from '../server/app.js';
import { AppError } from '../server/http.js';
import { loadCommunities } from '../server/communities.js';
import { createDb } from '../server/db.js';
import { COURSES, courseLessons } from '../dist/courses.js';
import { coursePage } from '../dist/course-workspace.js';

const communities = loadCommunities([{ id: 'ppchs', name: 'Pines', studentPassword: { env: 'S' }, instructorPassword: { env: 'T' } }]);
const env = { S: 'student-pass', T: 'teacher-pass' };
const verifyToken = async (token) => {
  if (!token) throw new AppError(401, 'Please log in.');
  return { uid: token, email: `${token}@example.com`, name: token };
};
// The grader is swapped per test: a fixed score, or an outage.
let grader = async () => ({ score: 50, points: 3, maximum: 6, passed: false, feedback: 'Add reasoning.', safetyConcern: false, criteria: [] });

const lessons = courseLessons('Pharmacology'), [first, second] = lessons;
let dir, server, base;
before(async () => {
  dir = mkdtempSync(path.join(tmpdir(), 'valus-course-'));
  const db = createDb({ TURSO_DATABASE_URL: 'file:' + path.join(dir, 'test.db').replaceAll('\\', '/') });
  server = http.createServer(createApp({ db, verifyToken, env, communities, gradeFRQ: (...a) => grader(...a) }));
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  base = `http://127.0.0.1:${server.address().port}/api`;
  for (const [as, role, password] of [['ana', 'student', 'student-pass'], ['ben', 'student', 'student-pass'], ['teach', 'instructor', 'teacher-pass']])
    await call('POST', '/auth/register', { as, body: { role, communityId: 'ppchs', password } });
  await call('PUT', '/me/event', { as: 'ana', body: { event: 'Pharmacology' } });
  await call('PUT', '/me/event', { as: 'ben', body: { event: 'Nutrition' } });
});
after(() => { server.close(); try { rmSync(dir, { recursive: true, force: true }); } catch {} });

async function call(method, route, { as, body } = {}) {
  const res = await fetch(base + route, { method, headers: { ...(as && { Authorization: 'Bearer ' + as }), ...(body && { 'Content-Type': 'application/json' }) }, body: body && JSON.stringify(body) });
  return { status: res.status, data: res.status === 204 ? null : await res.json() };
}
const response = 'Absorption, distribution, metabolism and excretion explain how the drug reaches and leaves circulation in this case.';
const answers = (lesson, right = lesson.mcqs.length) => lesson.mcqs.map((q, i) => (i < right ? q.answer : (q.answer + 1) % q.options.length));

test('students move on to any lesson without a checkpoint', async () => {
  assert.equal((await call('POST', `/courses/lessons/${second.id}/complete`, { as: 'ana' })).status, 200, 'no previous-lesson gate');
  assert.equal((await call('POST', `/courses/lessons/${first.id}/complete`, { as: 'ana' })).status, 200);
  assert.equal((await call('POST', `/courses/lessons/${first.id}/complete`, { as: 'ana' })).status, 200, 'repeat is harmless');
  assert.equal((await call('POST', '/courses/lessons/nope/complete', { as: 'ana' })).status, 404);
  assert.equal((await call('POST', `/courses/lessons/${first.id}/complete`, { as: 'teach' })).status, 403);
  assert.deepEqual((await call('GET', '/courses/progress', { as: 'ana' })).data.completed.sort(), [first.id, second.id].sort());
});

test('course pages have no checkpoint for students and an assign button for teachers', () => {
  const student = coursePage('Pharmacology', first.id, { completed: [] }, false);
  assert.doesNotMatch(student, /data-checkpoint|name="mcq0"/);
  assert.match(student, /data-course-complete/);
  assert.doesNotMatch(coursePage('Pharmacology', '', { completed: [] }, false), /Locked/);
  assert.match(coursePage('Pharmacology', first.id, {}, true), /data-action="assign-checkpoint"/);
});

test('teachers assign a lesson checkpoint and every attempt records accuracy', async () => {
  const bad = await call('POST', '/assignments', { as: 'teach', body: { title: 'Check', type: 'Lesson checkpoint', due: '2026-12-01' } });
  assert.equal(bad.status, 400, 'a checkpoint needs a lesson');
  const made = await call('POST', '/assignments', { as: 'teach', body: { title: 'Check', type: 'Lesson checkpoint', due: '2026-12-01', event: null, lessonId: first.id } });
  assert.equal(made.status, 201);
  const a = made.data.assignment;
  assert.equal(a.lessonId, first.id);
  assert.equal(a.event, 'Pharmacology', 'audience follows the lesson');
  assert.ok(!(await call('GET', '/assignments', { as: 'ben' })).data.assignments.some((x) => x.id === a.id));
  assert.equal((await call('POST', `/assignments/${a.id}/checkpoint`, { as: 'ben', body: { answers: answers(first), response } })).status, 404);
  assert.equal((await call('PUT', `/assignments/${a.id}/submission`, { as: 'ana', body: { body: 'text only' } })).status, 400);
  assert.equal((await call('POST', `/assignments/${a.id}/checkpoint`, { as: 'ana', body: { answers: [0], response } })).status, 400);

  // One of two MCQs right (50%) and FRQ 50% gives 50% accuracy; a wrong MCQ no longer blocks submitting.
  const one = await call('POST', `/assignments/${a.id}/checkpoint`, { as: 'ana', body: { answers: answers(first, 1), response } });
  assert.equal(one.status, 200);
  assert.deepEqual([one.data.mcqCorrect, one.data.mcqTotal, one.data.frqScore, one.data.accuracy], [1, 2, 50, 50]);

  // Grader outage still records MCQ accuracy.
  grader = async () => { throw new AppError(503, 'Gemini could not grade this response right now.'); };
  const two = await call('POST', `/assignments/${a.id}/checkpoint`, { as: 'ana', body: { answers: answers(first), response } });
  assert.equal(two.status, 200);
  assert.equal(two.data.frqScore, null);
  assert.equal(two.data.accuracy, 100);
  assert.match(two.data.gradingError, /could not grade/);

  const subs = (await call('GET', `/assignments/${a.id}/submissions`, { as: 'teach' })).data.submissions;
  assert.equal(subs.length, 1);
  assert.deepEqual(subs[0].checkpoint, { accuracy: 100, mcqCorrect: 2, mcqTotal: 2, frqScore: null, attempts: 2 });
  assert.equal((await call('GET', '/assignments', { as: 'ana' })).data.assignments.find((x) => x.id === a.id).submitted, true);
  assert.deepEqual((await call('GET', '/courses/progress', { as: 'ana' })).data.accuracy[first.id], { latest: 100, attempts: 2 });
  const ana = (await call('GET', '/students', { as: 'teach' })).data.students.find((s) => s.uid === 'ana');
  assert.equal(ana.checkpointAccuracy, 75);
  assert.equal(ana.courseLessonsCompleted, 2);

  // Changing the type away from a checkpoint drops its lesson link.
  const edited = await call('PATCH', `/assignments/${a.id}`, { as: 'teach', body: { type: 'Reflection' } });
  assert.equal(edited.data.assignment.lessonId, null);
  assert.equal((await call('PATCH', `/assignments/${a.id}`, { as: 'teach', body: { type: 'Lesson checkpoint' } })).status, 400);
});

test('every course lesson has a gradable checkpoint for teachers to assign', () => {
  for (const name of Object.keys(COURSES)) for (const l of courseLessons(name)) {
    assert.ok(l.mcqs.length >= 2, l.id);
    for (const q of l.mcqs) assert.ok(Number.isInteger(q.answer) && q.options[q.answer], l.id);
    assert.ok(l.frq.prompt && l.frq.rubric.length >= 2 && l.frq.modelAnswer, l.id);
  }
  const ids = Object.keys(COURSES).flatMap(courseLessons).map((l) => l.id);
  assert.equal(new Set(ids).size, ids.length, 'lesson ids are unique');
});
