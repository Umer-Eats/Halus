// In-depth Clinical Nursing course mapped to the HOSA 2026–27 test plan and skills.
import {course} from './build.js';
import {N1, N2, N3, N4, N5} from './cn-a.js';
import {N6, N7, N8, N9, N10} from './cn-b.js';

export default course('Clinical Nursing', {
  intro: 'Ten in-depth lessons following the HOSA Clinical Nursing 2026–27 test plan (basic care 20%, life span 20%, systems 60%) and the Round Two skills: postoperative exercises, wound irrigation, straight catheterization, postmortem care and neonatal eye prophylaxis. Includes clinical judgment cases, an injection-site diagram, dose calculators, vital-sign and Glasgow Coma Scale simulators and step-ordering drills. Always follow the scenario and facility policy you are given.',
  units: [
    {title: 'Unit 1 · Foundations of nursing care', summary: 'Test plan: basic care 20%. Nursing process, infection control and medication administration.', lessons: [N1, N2, N3]},
    {title: 'Unit 2 · Fluids, nutrition and perioperative care', summary: 'Fluids, electrolytes, NG tubes, surgery and wound care. Skills IV and VI.', lessons: [N4, N5]},
    {title: 'Unit 3 · Care across the life span', summary: 'Test plan: life span 20%. Maternal, newborn, pediatric, older adult, mental health and end-of-life care. Skills V and VII.', lessons: [N6, N7]},
    {title: 'Unit 4 · Body systems disorders', summary: 'Test plan: systems 60%. Cardiovascular, respiratory, neurological, endocrine, renal, musculoskeletal, skin, immune and oncology. Skill III.', lessons: [N8, N9, N10]},
  ],
});
