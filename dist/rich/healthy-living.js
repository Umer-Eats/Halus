// In-depth Healthy Living course mapped to the HOSA 2026–27 test plan and Round Two rubric.
import {course} from './build.js';
import {HL1, HL2, HL3, HL4, HL5} from './hl-a.js';
import {HL6, HL7, HL8, HL9, HL10} from './hl-b.js';

export default course('Healthy Living', {
  intro: 'Ten in-depth lessons for the HOSA Healthy Living solo event, following the 2026–27 test plan built from the NASM HOSA Healthy Living Course (nutrition 25%, physical activity 25%, wellness through the lifespan 20%, disease prevention 20%, mental health 10%) and the Round Two portfolio presentation: writing a challenging but attainable SMART goal, completing a baseline health assessment, documenting the journey and presenting it in five minutes. Includes calorie, %DV, heart-rate and progress calculations, prevention and lifespan sorting and practice scenarios.',
  units: [
    {title: 'Unit 1 · The event and nutrition', summary: 'Event structure, nutrition fundamentals (25%).', lessons: [HL1, HL2]},
    {title: 'Unit 2 · Nutrition in practice and physical activity', summary: 'Labels and supplements, activity guidelines and training (25%).', lessons: [HL3, HL4, HL5]},
    {title: 'Unit 3 · Mind, lifespan and prevention', summary: 'Mental health (10%), lifespan (20%) and disease prevention (20%).', lessons: [HL6, HL7, HL8]},
    {title: 'Unit 4 · Goal, portfolio and presentation', summary: 'SMART goal, baseline, portfolio and Round Two.', lessons: [HL9, HL10]},
  ],
});
