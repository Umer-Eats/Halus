import {COURSES_ONE} from './courses-one.js';
import {COURSES_TWO} from './courses-two.js';
import {COURSES_THREE} from './courses-three.js';
import {COURSES_FOUR} from './courses-four.js';

export const COURSES = {...COURSES_ONE, ...COURSES_TWO, ...COURSES_THREE, ...COURSES_FOUR};
export const courseLessons = name => COURSES[name]?.units.flatMap(unit => unit.lessons) || [];
export const findCourseLesson = id => {
  for (const name of Object.keys(COURSES)) {
    const lessons = courseLessons(name), index = lessons.findIndex(l => l.id === id);
    if (index !== -1) return {name, lesson: lessons[index], previous: lessons[index - 1], index};
  }
  return null;
};

// MCQs are deterministic; the server separately grades the FRQ with Gemini.
export function assessLesson(lesson, input = {}) {
  const answers = Array.isArray(input.answers) ? input.answers : [];
  const mcqs = lesson.mcqs.map((q, i) => ({correct: answers[i] === q.answer, explanation: q.explanation}));
  const response = typeof input.response === 'string' ? input.response.trim() : '';
  const responseReady = response.length >= 80 && response.length <= 10000;
  return {readyForGrading: mcqs.every(q => q.correct) && responseReady, mcqs, responseReady};
}
