// Interactive activities for the in-depth lessons. A lesson block {t:'w', kind, …} renders through
// renderWidget(); mountWidgets() wires up behaviour after the HTML is on the page.
import {DIAGRAMS} from './lesson-diagrams.js';
import {SIMS} from './lesson-sims.js';

export const e = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const inline = s => e(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>');
export const shuffle = list => { const a = list.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const say = (node, text, good) => { node.textContent = text; node.dataset.state = good === undefined ? '' : good ? 'good' : 'bad'; };

/* ---------- labeled diagram: explore parts, then quiz yourself ---------- */
const label = {
  label: 'Interactive model',
  render: w => `<div class="lw-label"><div class="lw-figure">${DIAGRAMS[w.diagram] || ''}</div><div class="lw-side">${w.noquiz ? '' : '<div class="lw-modes" role="group" aria-label="Mode"><button type="button" class="chip on" data-mode="explore">Explore</button><button type="button" class="chip" data-mode="quiz">Quiz me</button></div>'}<div class="lw-parts">${w.parts.map(([id, name]) => `<button type="button" class="chip" data-pick="${e(id)}">${e(name)}</button>`).join('')}</div><div class="lw-detail" aria-live="polite"><p class="subtle">Select any part of the model or a label to learn what it does.</p></div></div></div>`,
  mount(node, w) {
    const parts = new Map(w.parts.map(([id, name, detail]) => [id, {name, detail}]));
    const detail = node.querySelector('.lw-detail');
    let quiz = null;
    const light = id => { node.querySelectorAll('[data-part]').forEach(p => p.classList.toggle('hl', p.dataset.part === id)); node.querySelectorAll('[data-pick]').forEach(b => b.classList.toggle('on', b.dataset.pick === id)); };
    const show = id => { const p = parts.get(id); if (!p) return; light(id); detail.innerHTML = `<h5>${e(p.name)}</h5><p>${inline(p.detail)}</p>`; };
    const ask = () => {
      if (!quiz.order.length) { detail.innerHTML = `<h5>Quiz complete</h5><p>You found ${quiz.score} of ${parts.size} on the first try.</p><button type="button" class="button secondary" data-restart>Try again</button>`; light(null); return; }
      quiz.target = quiz.order[0]; quiz.first = true;
      detail.innerHTML = `<h5>Find: ${e(parts.get(quiz.target).name)}</h5><p class="subtle">Select it on the model. ${parts.size - quiz.order.length} of ${parts.size} done · ${quiz.score} correct first try.</p><p class="lw-msg" aria-live="polite"></p>`;
    };
    const choose = id => {
      if (!parts.has(id)) return;
      if (!quiz) return show(id);
      const msg = detail.querySelector('.lw-msg');
      if (id === quiz.target) { light(id); if (quiz.first) quiz.score++; quiz.order.shift(); say(msg, 'Correct.', true); setTimeout(ask, 650); }
      else { quiz.first = false; say(msg, `That is the ${parts.get(id).name}. Try again.`, false); }
    };
    node.addEventListener('click', ev => {
      const mode = ev.target.closest('[data-mode]');
      if (mode) {
        node.querySelectorAll('[data-mode]').forEach(b => b.classList.toggle('on', b === mode));
        node.querySelector('.lw-parts').hidden = mode.dataset.mode === 'quiz';
        quiz = mode.dataset.mode === 'quiz' ? {order: shuffle([...parts.keys()]), score: 0} : null;
        light(null);
        if (quiz) ask(); else detail.innerHTML = '<p class="subtle">Select any part of the model or a label to learn what it does.</p>';
        return;
      }
      if (ev.target.closest('[data-restart]')) { quiz = {order: shuffle([...parts.keys()]), score: 0}; return ask(); }
      const pick = ev.target.closest('[data-pick]') || ev.target.closest('[data-part]');
      if (pick) choose(pick.dataset.pick || pick.dataset.part);
    });
    node.querySelectorAll('svg [data-part]').forEach(p => { p.setAttribute('tabindex', '0'); p.setAttribute('role', 'button'); p.setAttribute('aria-label', parts.get(p.dataset.part)?.name || p.dataset.part); p.addEventListener('keydown', ev => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); choose(p.dataset.part); } }); });
  },
};

/* ---------- sort items into categories ---------- */
const sort = {
  label: 'Sort it out',
  render: w => `<div class="lw-sort"><p class="subtle">Select an item, then select the category it belongs in. Select a placed item to move it back.</p><div class="lw-pool" data-pool></div><div class="lw-buckets" style="--cols:${Math.min(w.buckets.length, 4)}">${w.buckets.map((b, i) => `<div class="lw-bucket" data-bucket="${i}" role="button" tabindex="0"><strong>${e(b)}</strong><div data-slot></div></div>`).join('')}</div><div class="lw-actions"><button type="button" class="button" data-check>Check</button><button type="button" class="text-button" data-reset>Reset</button><span class="lw-msg" aria-live="polite"></span></div></div>`,
  mount(node, w) {
    const pool = node.querySelector('[data-pool]'), msg = node.querySelector('.lw-msg');
    let picked = null;
    const reset = () => { pool.innerHTML = shuffle(w.items.map((it, i) => i)).map(i => `<button type="button" class="chip" data-item="${i}">${inline(w.items[i][0])}</button>`).join(''); node.querySelectorAll('[data-slot]').forEach(s => s.innerHTML = ''); say(msg, ''); picked = null; };
    reset();
    const place = bucket => { if (!picked) return; bucket.querySelector('[data-slot]').append(picked); picked.classList.remove('on', 'good', 'bad'); picked = null; };
    node.addEventListener('click', ev => {
      const item = ev.target.closest('[data-item]');
      if (item) {
        if (item.closest('[data-slot]')) { pool.append(item); item.classList.remove('good', 'bad'); return; }
        if (picked) picked.classList.remove('on');
        picked = picked === item ? null : item; if (picked) picked.classList.add('on'); return;
      }
      const bucket = ev.target.closest('[data-bucket]'); if (bucket) return place(bucket);
      if (ev.target.closest('[data-reset]')) return reset();
      if (ev.target.closest('[data-check]')) {
        let right = 0;
        node.querySelectorAll('[data-slot] [data-item]').forEach(b => { const ok = w.items[b.dataset.item][1] === Number(b.closest('[data-bucket]').dataset.bucket); b.classList.toggle('good', ok); b.classList.toggle('bad', !ok); if (ok) right++; });
        const left = pool.children.length;
        say(msg, left ? `${right} correct so far · ${left} still to place.` : right === w.items.length ? `All ${right} correct.` : `${right} of ${w.items.length} correct. Move the red ones and check again.`, !left && right === w.items.length);
      }
    });
    node.querySelectorAll('[data-bucket]').forEach(b => b.addEventListener('keydown', ev => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); place(b); } }));
  },
};

/* ---------- match each term to its partner ---------- */
const match = {
  label: 'Match up',
  render: w => { const right = shuffle(w.pairs.map(p => p[1])); return `<div class="lw-match">${w.pairs.map(([l], i) => `<label class="lw-match-row"><span>${inline(l)}</span><select data-row="${i}"><option value="">Choose…</option>${right.map(r => `<option>${e(r)}</option>`).join('')}</select></label>`).join('')}<div class="lw-actions"><button type="button" class="button" data-check>Check matches</button><span class="lw-msg" aria-live="polite"></span></div></div>`; },
  mount(node, w) {
    const msg = node.querySelector('.lw-msg');
    node.querySelector('[data-check]').addEventListener('click', () => {
      let right = 0;
      node.querySelectorAll('[data-row]').forEach(s => { const ok = s.value === w.pairs[s.dataset.row][1]; s.closest('label').dataset.state = s.value ? ok ? 'good' : 'bad' : ''; if (ok) right++; });
      say(msg, right === w.pairs.length ? 'Every match is correct.' : `${right} of ${w.pairs.length} correct.`, right === w.pairs.length);
    });
  },
};

/* ---------- put steps in the right order ---------- */
const order = {
  label: 'Put it in order',
  render: () => `<div class="lw-order"><ol data-list></ol><div class="lw-actions"><button type="button" class="button" data-check>Check order</button><button type="button" class="text-button" data-reset>Shuffle</button><span class="lw-msg" aria-live="polite"></span></div></div>`,
  mount(node, w) {
    const list = node.querySelector('[data-list]'), msg = node.querySelector('.lw-msg');
    const draw = idx => { list.innerHTML = idx.map(i => `<li data-step="${i}"><span>${inline(w.steps[i])}</span><span class="lw-move"><button type="button" class="icon-button" data-up aria-label="Move up">↑</button><button type="button" class="icon-button" data-down aria-label="Move down">↓</button></span></li>`).join(''); say(msg, ''); };
    const fresh = () => { let idx; do idx = shuffle(w.steps.map((_, i) => i)); while (idx.every((v, i) => v === i) && w.steps.length > 1); draw(idx); };
    fresh();
    node.addEventListener('click', ev => {
      const li = ev.target.closest('li');
      if (ev.target.closest('[data-up]') && li.previousElementSibling) li.previousElementSibling.before(li);
      else if (ev.target.closest('[data-down]') && li.nextElementSibling) li.nextElementSibling.after(li);
      else if (ev.target.closest('[data-reset]')) return fresh();
      else if (ev.target.closest('[data-check]')) {
        const items = [...list.children]; let right = 0;
        items.forEach((li, i) => { const ok = Number(li.dataset.step) === i; li.dataset.state = ok ? 'good' : 'bad'; if (ok) right++; });
        return say(msg, right === items.length ? 'Perfect sequence.' : `${right} of ${items.length} in the right place.`, right === items.length);
      }
      list.querySelectorAll('li').forEach(li => li.dataset.state = '');
    });
  },
};

/* ---------- flashcards ---------- */
const flip = {
  label: 'Flashcards',
  render: w => `<div class="lw-flip"><div class="lw-cards">${w.cards.map(([f, b], i) => `<button type="button" class="lw-card" data-card="${i}" aria-pressed="false"><span class="front">${inline(f)}</span><span class="back">${inline(b)}</span></button>`).join('')}</div><div class="lw-actions"><span class="lw-msg" aria-live="polite">Select a card to flip it.</span><button type="button" class="text-button" data-reset>Shuffle</button></div></div>`,
  mount(node) {
    const seen = new Set(), msg = node.querySelector('.lw-msg'), box = node.querySelector('.lw-cards');
    node.addEventListener('click', ev => {
      const card = ev.target.closest('[data-card]');
      if (card) { const on = card.getAttribute('aria-pressed') !== 'true'; card.setAttribute('aria-pressed', String(on)); seen.add(card.dataset.card); msg.textContent = `${seen.size} of ${box.children.length} cards reviewed.`; }
      if (ev.target.closest('[data-reset]')) { shuffle([...box.children]).forEach(c => { c.setAttribute('aria-pressed', 'false'); box.append(c); }); }
    });
  },
};

/* ---------- step through a process ---------- */
const stepper = {
  label: 'Step through it',
  render: w => `<div class="lw-stepper ${w.diagram ? 'with-figure' : ''}">${w.diagram ? `<div class="lw-figure">${DIAGRAMS[w.diagram] || ''}</div>` : ''}<div class="lw-step"><div class="lw-dots">${w.steps.map((_, i) => `<button type="button" data-go="${i}" aria-label="Step ${i + 1}">${i + 1}</button>`).join('')}</div><div class="lw-step-text" aria-live="polite"></div><div class="lw-actions"><button type="button" class="text-button" data-prev>← Back</button><button type="button" class="button" data-next>Next →</button></div></div></div>`,
  mount(node, w) {
    let at = 0;
    const draw = () => {
      const [title, text, partsLit] = w.steps[at];
      node.querySelector('.lw-step-text').innerHTML = `<span class="eyebrow">Step ${at + 1} of ${w.steps.length}</span><h5>${e(title)}</h5><p>${inline(text)}</p>`;
      node.querySelectorAll('[data-go]').forEach(b => b.classList.toggle('on', Number(b.dataset.go) === at));
      const lit = new Set(partsLit || []);
      node.querySelectorAll('[data-part]').forEach(p => p.classList.toggle('hl', lit.has(p.dataset.part)));
      node.querySelector('[data-prev]').disabled = at === 0;
      node.querySelector('[data-next]').textContent = at === w.steps.length - 1 ? 'Start over' : 'Next →';
    };
    node.addEventListener('click', ev => {
      if (ev.target.closest('[data-next]')) at = at === w.steps.length - 1 ? 0 : at + 1;
      else if (ev.target.closest('[data-prev]')) at = Math.max(0, at - 1);
      else if (ev.target.closest('[data-go]')) at = Number(ev.target.closest('[data-go]').dataset.go);
      else return;
      draw();
    });
    draw();
  },
};

/* ---------- branching case ---------- */
const scenario = {
  label: 'Case simulation',
  render: () => `<div class="lw-case"><div class="lw-case-log" aria-live="polite"></div><div class="lw-case-choices"></div></div>`,
  mount(node, w) {
    const log = node.querySelector('.lw-case-log'), box = node.querySelector('.lw-case-choices');
    let score = 0, steps = 0;
    const go = id => {
      const n = w.nodes[id];
      log.insertAdjacentHTML('beforeend', `<div class="lw-case-node"><p>${inline(n.text)}</p></div>`);
      if (n.end || !n.choices) { box.innerHTML = `<p class="lw-msg" data-state="${score === steps ? 'good' : ''}">Case complete · ${score} of ${steps} decisions were the best choice.</p><button type="button" class="button secondary" data-restart>Run the case again</button>`; return; }
      box.innerHTML = n.choices.map(([text], i) => `<button type="button" class="lw-choice" data-choice="${i}">${inline(text)}</button>`).join('');
      box.dataset.node = id;
    };
    node.addEventListener('click', ev => {
      if (ev.target.closest('[data-restart]')) { log.innerHTML = ''; score = steps = 0; return go(w.start); }
      const c = ev.target.closest('[data-choice]'); if (!c) return;
      const [text, next, feedback, best] = w.nodes[box.dataset.node].choices[c.dataset.choice];
      steps++; if (best) score++;
      log.insertAdjacentHTML('beforeend', `<div class="lw-case-pick" data-state="${best ? 'good' : 'bad'}"><strong>You chose:</strong> ${inline(text)}<p>${inline(feedback)}</p></div>`);
      go(next);
    });
    go(w.start);
  },
};

/* ---------- build a word from parts ---------- */
const wordbuild = {
  label: 'Word builder',
  render: w => `<div class="lw-word"><p class="subtle">Build the term that matches each definition from its prefix, root and suffix.</p>${w.targets.map(([definition], i) => `<div class="lw-word-row" data-target="${i}"><p><strong>${i + 1}.</strong> ${inline(definition)}</p><div class="lw-word-picks">${['prefix', 'root', 'suffix'].map(k => `<select data-kind="${k}" aria-label="${k}"><option value="">${k === 'prefix' ? '(no prefix)' : k}</option>${(w.parts[k] || []).map(([p, m]) => `<option value="${e(p)}">${e(p)} · ${e(m)}</option>`).join('')}</select>`).join('')}<output></output></div></div>`).join('')}<div class="lw-actions"><button type="button" class="button" data-check>Check words</button><span class="lw-msg" aria-live="polite"></span></div></div>`,
  mount(node, w) {
    const msg = node.querySelector('.lw-msg');
    const update = row => { const [p, r, s] = [...row.querySelectorAll('select')].map(x => x.value); row.querySelector('output').textContent = [p, r, s].filter(Boolean).join(' + '); };
    node.addEventListener('change', ev => { const row = ev.target.closest('[data-target]'); if (row) { update(row); row.dataset.state = ''; } });
    node.querySelector('[data-check]').addEventListener('click', () => {
      let right = 0;
      node.querySelectorAll('[data-target]').forEach(row => {
        const [, answer, term] = w.targets[row.dataset.target], picked = [...row.querySelectorAll('select')].map(x => x.value);
        const ok = answer.every((v, i) => (v || '') === picked[i]);
        row.dataset.state = ok ? 'good' : 'bad';
        row.querySelector('output').textContent = ok ? `${picked.filter(Boolean).join(' + ')} = ${term}` : picked.filter(Boolean).join(' + ') + ' — not quite';
        if (ok) right++;
      });
      say(msg, `${right} of ${w.targets.length} built correctly.`, right === w.targets.length);
    });
  },
};

const W = {label, sort, match, order, flip, stepper, case: scenario, wordbuild, ...SIMS};

let seq = 0;
const CONFIG = new Map();
/** HTML for one interactive block. */
export function renderWidget(w) {
  const def = W[w.kind];
  if (!def) return '';
  const id = 'lw' + (++seq);
  CONFIG.set(id, w);
  return `<section class="lw lwk-${e(w.kind)}" data-wid="${id}"><header class="lw-head"><span class="eyebrow">${e(def.label)}</span>${w.title ? `<h4>${e(w.title)}</h4>` : ''}${w.prompt ? `<p>${inline(w.prompt)}</p>` : ''}</header>${def.render(w, id)}</section>`;
}
/** Attach behaviour to every widget rendered inside root. */
export function mountWidgets(root) {
  root.querySelectorAll('[data-wid]').forEach(node => {
    const w = CONFIG.get(node.dataset.wid);
    if (!w || node.dataset.ready) return;
    node.dataset.ready = '1';
    try { W[w.kind].mount(node, w); } catch (error) { console.error('Lesson activity failed', w.kind, error); node.insertAdjacentHTML('beforeend', '<p class="subtle">This activity could not start. Reload the page to try again.</p>'); }
  });
}
export const widgetKinds = () => Object.keys(W);
