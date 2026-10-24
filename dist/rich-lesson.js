// Renders the in-depth lessons: text, tables, figures and interactive activities placed
// inside the section they teach, plus quick checks and worked examples.
import {renderWidget, mountWidgets, e, inline} from './lesson-widgets.js';
import {FIGURES} from './rich/figures.js';
import {conceptMap} from './visual-studio.js';

const CALLOUT = {exam: 'On the test', safety: 'Safety first', clinical: 'In practice', remember: 'Remember', mistake: 'Common mistake', history: 'History'};

function block(b, section) {
  if (typeof b === 'string') return `<p>${inline(b)}</p>`;
  switch (b.t) {
    case 'list': { const tag = b.ordered ? 'ol' : 'ul'; return `${b.title ? `<p class="lesson-list-title">${inline(b.title)}</p>` : ''}<${tag} class="lesson-list">${b.items.map(i => `<li>${inline(i)}</li>`).join('')}</${tag}>`; }
    case 'table': return `<figure class="lesson-table">${b.caption ? `<figcaption>${inline(b.caption)}</figcaption>` : ''}<div class="table-scroll"><table><thead><tr>${b.head.map(h => `<th scope="col">${inline(h)}</th>`).join('')}</tr></thead><tbody>${b.rows.map(r => `<tr>${r.map((c, i) => i ? `<td>${inline(c)}</td>` : `<th scope="row">${inline(c)}</th>`).join('')}</tr>`).join('')}</tbody></table></div></figure>`;
    case 'callout': return `<aside class="lesson-callout ${e(b.kind || 'remember')}"><strong>${e(b.title || CALLOUT[b.kind] || 'Note')}</strong><p>${inline(b.text)}</p></aside>`;
    case 'check': return `<form class="quick-check" data-quick="${b.answer}"><span class="eyebrow">Quick check</span><p class="qc-q">${inline(b.q)}</p>${b.options.map((o, i) => `<label class="mcq-option"><input type="radio" name="qc" value="${i}"><span>${inline(o)}</span></label>`).join('')}<div class="qc-foot"><button type="submit" class="button secondary">Check</button><p class="qc-why" aria-live="polite" data-why="${e(b.why)}"></p></div></form>`;
    case 'example': return `<section class="worked" data-worked><span class="eyebrow">Worked example</span><h4>${inline(b.title || 'Try it')}</h4><p>${inline(b.prompt)}</p><ol class="worked-steps">${b.steps.map(s => `<li hidden>${inline(s)}</li>`).join('')}</ol>${b.answer ? `<p class="worked-answer" hidden><strong>Answer:</strong> ${inline(b.answer)}</p>` : ''}<button type="button" class="button secondary" data-next-step>Show the first step</button></section>`;
    case 'fig': { const f = FIGURES[b.file]; if (!f) return ''; return `<figure class="lesson-media lesson-fig"><button type="button" class="fig-zoom" data-zoom aria-label="Enlarge figure: ${e(b.alt)}"><img src="${e(f.url)}" alt="${e(b.alt)}" loading="lazy" referrerpolicy="no-referrer"${f.width ? ` style="aspect-ratio:${f.width}/${f.height}"` : ''}></button><figcaption>${inline(b.caption)}<span class="credit">Image: ${e(f.credit)} · <a href="${e(f.source)}" target="_blank" rel="noreferrer">Source ↗</a> · <a href="${e(f.licenseUrl || f.source)}" target="_blank" rel="noreferrer">${e(f.license)}</a></span></figcaption></figure>`; }
    case 'w': return renderWidget({...b, studyNotes: section ? {title:section.title, paragraphs:section.blocks.filter(x=>typeof x==='string').slice(0,3)} : null});
    default: return '';
  }
}

/** The body of an in-depth lesson, from the opening scenario to key terms. */
export function richLessonBody(lesson) {
  const toc = lesson.sections.map((s, i) => `<li><button type="button" class="text-button" data-jump="${i}">${e(s.title)}</button></li>`).join('');
  return `${lesson.hook ? `<section class="lesson-hook"><span class="eyebrow">Start here</span><p>${inline(lesson.hook)}</p></section>` : ''}
  <div class="lesson-intro-grid"><section class="course-card objectives"><h3>What you’ll be able to do</h3><ul>${lesson.objectives.map(o => `<li>${inline(o)}</li>`).join('')}</ul></section><nav class="course-card lesson-toc" aria-label="In this lesson"><h3>In this lesson</h3><ol>${toc}<li><button type="button" class="text-button" data-jump="checkpoint">Lesson checkpoint</button></li></ol></nav></div>
  ${renderWidget(conceptMap(lesson))}
  <div class="lesson-prose rich">${lesson.sections.map((s, i) => `<section class="lesson-section" data-section="${i}"><h3><span class="section-num">${String(i + 1).padStart(2, '0')}</span>${e(s.title)}</h3>${s.blocks.map(b=>block(b,s)).join('')}</section>`).join('')}</div>
  ${lesson.takeaways.length ? `<section class="course-card takeaways"><span class="eyebrow">Key takeaways</span><ul>${lesson.takeaways.map(t => `<li>${inline(t)}</li>`).join('')}</ul></section>` : ''}
  ${lesson.terms.length ? `<section class="course-card terms"><span class="eyebrow">Key terms</span><dl>${lesson.terms.map(([t, d]) => `<div><dt>${inline(t)}</dt><dd>${inline(d)}</dd></div>`).join('')}</dl></section>` : ''}`;
}

/** Wire up quick checks, worked examples, the table of contents and activities. */
export function mountRichLesson(root) {
  mountWidgets(root);
  root.querySelectorAll('.lesson-fig img').forEach(img => img.addEventListener('error', () => { img.closest('.lesson-fig').hidden = true; }, {once: true}));
  root.querySelectorAll('[data-zoom]').forEach(button => button.addEventListener('click', () => {
    const img = button.querySelector('img'), dialog = document.createElement('dialog');
    dialog.className = 'fig-viewer';
    dialog.innerHTML = `<img src="${e(img.src)}" alt="${e(img.alt)}" referrerpolicy="no-referrer"><button type="button" class="icon-button" aria-label="Close">✕</button>`;
    document.body.append(dialog);
    dialog.addEventListener('click', () => dialog.close());
    dialog.addEventListener('close', () => dialog.remove());
    dialog.showModal();
  }));
  root.querySelectorAll('[data-quick]').forEach(form => form.addEventListener('submit', ev => {
    ev.preventDefault(); ev.stopPropagation();
    const pickd = form.querySelector('input:checked'), why = form.querySelector('.qc-why');
    if (!pickd) { why.textContent = 'Choose an answer first.'; why.dataset.state = ''; return; }
    const ok = pickd.value === form.dataset.quick;
    form.querySelectorAll('.mcq-option').forEach((l, i) => { l.dataset.state = String(i) === form.dataset.quick ? 'good' : l.contains(pickd) ? 'bad' : ''; });
    why.textContent = (ok ? 'Correct. ' : 'Not quite. ') + why.dataset.why; why.dataset.state = ok ? 'good' : 'bad';
  }));
  root.querySelectorAll('[data-worked]').forEach(sec => sec.querySelector('[data-next-step]').addEventListener('click', ev => {
    const hidden = sec.querySelector('.worked-steps li[hidden]');
    if (hidden) { hidden.hidden = false; ev.target.textContent = sec.querySelector('.worked-steps li[hidden]') ? 'Show the next step' : sec.querySelector('.worked-answer') ? 'Show the answer' : 'Done'; return; }
    const ans = sec.querySelector('.worked-answer'); if (ans) ans.hidden = false; ev.target.hidden = true;
  }));
  root.querySelectorAll('[data-jump]').forEach(b => b.addEventListener('click', () => {
    const target = b.dataset.jump === 'checkpoint' ? root.querySelector('#lesson-checkpoint') : root.querySelector(`[data-section="${b.dataset.jump}"]`);
    target?.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start'});
  }));
}
