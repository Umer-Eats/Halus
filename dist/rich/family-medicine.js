// In-depth Family Medicine Physician course mapped to the HOSA 2026–27 learning objectives and presentation rubric.
import {course} from './build.js';
import {F1, F2, F3, F4, F5} from './fmp-a.js';
import {F6, F7, F8, F9, F10} from './fmp-b.js';

export default course('Family Medicine Physician', {
  intro: 'Ten in-depth lessons that cover every Family Medicine Physician learning objective (a–f) and every rubric item: what family medicine is, demand and outlook, the education path and career options, work, lifestyle and finances, primary care and health equity, planning the two interviews, telling the physician’s WHY, building a creative peer presentation and presenting to judges in ten minutes. Use the AAFP landing page and the current HOSA guidelines as your official references.',
  units: [
    {title: 'Unit 1 · The event and the specialty', summary: 'Rubric, verification form, deadlines and what makes family medicine unique.', lessons: [F1, F2]},
    {title: 'Unit 2 · Researching the learning objectives', summary: 'Objectives a–d: demand, education and options, work and finances, primary care and equity.', lessons: [F3, F4, F5, F6]},
    {title: 'Unit 3 · Interviews and the WHY', summary: 'Objectives e–f: interview planning, storytelling and personal fit.', lessons: [F7, F8]},
    {title: 'Unit 4 · Presenting to peers and judges', summary: 'Distinctiveness, visual aids, organization and delivery.', lessons: [F9, F10]},
  ],
});
