import {COURSES_TWO} from './courses-two.js';
import {COURSES_THREE} from './courses-three.js';
import {COURSES_FOUR} from './courses-four.js';
import {RICH_COURSES} from './rich/index.js';

export const COURSES = {...COURSES_TWO, ...COURSES_THREE, ...COURSES_FOUR};
export const courseLessons = name => COURSES[name]?.units.flatMap(unit => unit.lessons) || [];
export const findCourseLesson = id => {
  for (const name of Object.keys(COURSES)) {
    const lessons = courseLessons(name), index = lessons.findIndex(l => l.id === id);
    if (index !== -1) return {name, lesson: lessons[index], previous: lessons[index - 1], index};
  }
  return null;
};

// In-depth courses are large, so each loads on first use (with the lesson renderer) and then
// replaces any older version of that course.
export let richView = null;
const loading = new Map();
export const hasCourse = name => Boolean(COURSES[name] || RICH_COURSES[name]);
export const courseReady = name => !RICH_COURSES[name] || Boolean(COURSES[name]?.rich && richView);
export const contentReady = name => !RICH_COURSES[name] || Boolean(COURSES[name]?.rich);
export const courseNames = () => [...new Set([...Object.keys(COURSES), ...Object.keys(RICH_COURSES)])].sort((a, b) => a.localeCompare(b));
export function loadCourse(name, {view = true} = {}) {
  if (!RICH_COURSES[name]) return Promise.resolve();
  const key = name + (view ? ':view' : '');
  if (!loading.has(key)) loading.set(key, Promise.all([
    COURSES[name]?.rich ? null : RICH_COURSES[name]().then(m => { COURSES[name] = m.default; }),
    view && !richView ? import('./rich-lesson.js').then(m => { richView = m; }) : null,
  ]).catch(error => { loading.delete(key); throw error; }));
  return loading.get(key);
}
export const loadAllCourses = options => Promise.all(Object.keys(RICH_COURSES).map(name => loadCourse(name, options)));

// MCQs are deterministic; the server separately grades the FRQ with Gemini.
export function assessLesson(lesson, input = {}) {
  const answers = Array.isArray(input.answers) ? input.answers : [];
  const mcqs = lesson.mcqs.map((q, i) => ({correct: answers[i] === q.answer, explanation: q.explanation}));
  const response = typeof input.response === 'string' ? input.response.trim() : '';
  const responseReady = response.length >= 80 && response.length <= 10000;
  return {readyForGrading: mcqs.every(q => q.correct) && responseReady, mcqs, responseReady};
}
