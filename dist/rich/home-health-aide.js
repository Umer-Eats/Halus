// In-depth Home Health Aide course mapped to the HOSA 2026–27 test plan and eight Round Two skills.
import {course} from './build.js';
import {H1, H2, H3, H4, H5} from './hha-a.js';
import {H6, H7, H8, H9, H10} from './hha-b.js';

export default course('Home Health Aide', {
  intro: 'Ten in-depth lessons following the HOSA Home Health Aide 2026–27 test plan and all eight Round Two skills, built from the official references (Balduzzi and Leahy, Fuzy and Grafe). Includes a vital-signs reporting drill, an intake-and-output calculator, labeled body-system diagrams, skill step-ordering drills and home-care cases. Always follow the scenario, the care plan and the rating sheets you are given.',
  units: [
    {title: 'Unit 1 · The aide’s role, communication and safety', summary: 'Test plan: responsibilities and legal/ethical issues 10%, communication 6%, infection control and safety 10%.', lessons: [H1, H2, H3]},
    {title: 'Unit 2 · Basic skills and body systems I', summary: 'Basic healthcare skills 10% and body systems 40%. Skills I, II and VIII.', lessons: [H4, H5, H6]},
    {title: 'Unit 3 · Body systems II', summary: 'Skin, musculoskeletal, nervous, sensory and endocrine care; nutrition. Skills III–VII.', lessons: [H7, H8]},
    {title: 'Unit 4 · Caring for special populations', summary: 'Test plan: special populations 24%. Older adults, dementia, mental health, disabilities, newborns, children and end of life.', lessons: [H9, H10]},
  ],
});
