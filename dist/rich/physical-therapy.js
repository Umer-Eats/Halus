// In-depth Physical Therapy course mapped to the HOSA 2026–27 test plan and all eight Round Two skills.
import {course} from './build.js';
import {T1, T2, T3, T4, T5} from './pt-a.js';
import {T6, T7, T8, T9, T10} from './pt-b.js';

export default course('Physical Therapy', {
  intro: 'Ten in-depth lessons following the HOSA Physical Therapy 2026–27 test plan (musculoskeletal, neuromuscular and pediatrics/older adults 16% each; profession, cardiopulmonary and integumentary 14% each; legal and ethical 10%) and all eight Round Two skills, built around Pierson and Fairchild, Pagliarulo, DHO: Health Science and APTA’s PT Moves Me videos. Includes device-fitting and gait-sequence drills, labeled joint, brain, skin, heart and lung diagrams, a rule-of-nines lab, PROM hand-placement cards and safety scenarios. Always follow the scenario and rating sheets you are given.',
  units: [
    {title: 'Unit 1 · The profession, ethics and infection control', summary: 'Test plan: profession 14%, legal and ethical 10%. Skill VIII.', lessons: [T1, T2]},
    {title: 'Unit 2 · Transfers and ambulation', summary: 'Skills I, II, III, IV and VII.', lessons: [T3, T4]},
    {title: 'Unit 3 · Musculoskeletal and integumentary care', summary: 'Test plan: musculoskeletal 16%, integumentary 14%. Skills V and VI.', lessons: [T5, T6, T7]},
    {title: 'Unit 4 · Neuromuscular, cardiopulmonary and lifespan', summary: 'Test plan: neuromuscular 16%, cardiopulmonary 14%, pediatrics and older adults 16%.', lessons: [T8, T9, T10]},
  ],
});
