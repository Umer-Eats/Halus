// In-depth Nursing Assisting course mapped to the HOSA 2026–27 test plan and eight Round Two skills.
import {course} from './build.js';
import {A1, A2, A3, A4, A5} from './nas-a.js';
import {A6, A7, A8, A9, A10} from './nas-b.js';

export default course('Nursing Assisting', {
  intro: 'Ten in-depth lessons following the HOSA Nursing Assisting 2026–27 test plan and all eight Round Two skills, built from the official references (Dugan and Roe). Includes a vital-signs reporting drill, an intake-and-output calculator, labeled body-system diagrams, skill step-ordering drills and resident-care cases. Always follow the scenario, the care plan and the rating sheets you are given.',
  units: [
    {title: 'Unit 1 · Role, communication and infection control', summary: 'Test plan: roles 6%, communication and culture 10%, infection control and safety 14%. Skills I and II.', lessons: [A1, A2, A3]},
    {title: 'Unit 2 · Safety and body systems', summary: 'Test plan: safety and anatomy and physiology 20%. Skills VI and VII.', lessons: [A4, A5, A6]},
    {title: 'Unit 3 · Providing and reporting care', summary: 'Test plan: providing and reporting care 30%. Skills III, IV, V and VIII.', lessons: [A7, A8, A9]},
    {title: 'Unit 4 · Disabilities, disorders and end of life', summary: 'Test plan: disabilities and disorders 20%.', lessons: [A10]},
  ],
});
