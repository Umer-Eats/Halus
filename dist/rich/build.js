// Turns the compact authoring format of the in-depth courses into lesson objects.
//
// A lesson is written as:
//   { title, hook, objectives:[…], sections:[[title, [blocks…]], …], takeaways:[…],
//     terms:[[term, meaning], …], mcqs:[[prompt, [correct, wrong, wrong, wrong], why], …],
//     frq:{prompt, rubric:[[label, [keywords]], …], model}, sources:[[title, url], …] }
// A block is a paragraph string, or {t:'list'|'table'|'callout'|'check'|'example'|'fig'|'w', …}.
// Correct options are written first and moved to a stable, prompt-dependent position here.

const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const hash = s => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);

export function placeCorrect(prompt, options) {
  const [correct, ...wrong] = options, at = hash(prompt) % options.length;
  wrong.splice(at, 0, correct);
  return { options: wrong, answer: at };
}

const words = s => String(s).split(/\s+/).length;
function blockWords(b) {
  if (typeof b === 'string') return words(b);
  if (b.t === 'list') return b.items.reduce((n, i) => n + words(i), 0);
  if (b.t === 'table') return b.rows.flat().reduce((n, c) => n + words(c), 0);
  if (b.t === 'callout' || b.t === 'example') return words(JSON.stringify(b));
  return 0;
}
const interactive = b => typeof b === 'object' && ['w', 'check', 'example'].includes(b.t);

function lesson(courseName, l) {
  const sections = l.sections.map(([title, blocks]) => ({
    title,
    blocks: blocks.map(b => b && b.t === 'check' ? { ...b, ...placeCorrect(b.q, b.options) } : b),
  }));
  const all = sections.flatMap(s => s.blocks);
  // Reading time at ~170 words a minute, two minutes per activity, and twelve for the checkpoint.
  const raw = all.reduce((n, b) => n + blockWords(b), words(l.hook || '')) / 170 + all.filter(interactive).length * 2 + 12;
  const minutes = Math.max(15, Math.round(raw / 5) * 5);
  return {
    id: slug(courseName + ' ' + l.title), title: l.title, rich: true, minutes,
    hook: l.hook, objectives: l.objectives, sections, takeaways: l.takeaways || [], terms: l.terms || [],
    mcqs: l.mcqs.map(([prompt, options, explanation]) => ({ prompt, ...placeCorrect(prompt, options), explanation })),
    frq: { prompt: l.frq.prompt, rubric: l.frq.rubric.map(([label, keywords]) => ({ label, keywords })), modelAnswer: l.frq.model },
    sources: l.sources.map(([title, url]) => ({ title, url })),
  };
}

/** Build a course: units of lessons, each lesson numbered and normalized. */
export function course(name, { intro, units }) {
  return { rich: true, intro, units: units.map(u => ({ title: u.title, summary: u.summary, lessons: u.lessons.map(l => lesson(name, l)) })) };
}

/** Plain text of a lesson for the written-response grader (no widgets or markup). */
export function lessonText(l, limit = 14000) {
  const text = b => typeof b === 'string' ? b
    : b.t === 'list' ? b.items.join('; ')
    : b.t === 'table' ? [b.head.join(' | '), ...b.rows.map(r => r.join(' | '))].join('\n')
    : b.t === 'callout' ? b.text
    : b.t === 'example' ? [b.prompt, ...(b.steps || []), b.answer].join(' ')
    : '';
  const body = (l.sections || []).map(s => s.title + ': ' + (s.blocks || s.paragraphs || []).map(text).filter(Boolean).join(' ')).join('\n\n');
  return body.replace(/\*\*/g, '').slice(0, limit);
}
