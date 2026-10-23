// In-depth Medical Assisting course mapped to the HOSA 2026–27 test plan and eight Round Two skills.
import {course} from './build.js';
import {M1, M2, M3, M4, M5} from './ma-a.js';
import {M6, M7, M8, M9, M10} from './ma-b.js';

export default course('Medical Assisting', {
  intro: 'Ten in-depth lessons following the HOSA Medical Assisting 2026–27 test plan and all eight Round Two skills, built from the official references (Blesi, Wise and Kelley-Arney and DHO). Covers administrative and clinical competencies with telephone triage and routing drills, a medical word lab, dose calculation practice, vital-sign and ECG activities, insurance examples and skill step-ordering drills. Always follow the scenario and rating sheets you are given.',
  units: [
    {title: 'Unit 1 · The profession, communication and law', summary: 'Test plan: professionalism 4%, communication 6%, legal and ethical issues 10%. Skill I.', lessons: [M1, M2, M3]},
    {title: 'Unit 2 · The administrative office', summary: 'Test plan: office procedures 10%, health insurance and coding 10%. Skill II.', lessons: [M4, M5]},
    {title: 'Unit 3 · Clinical foundations', summary: 'Test plan: infection control 10%, anatomy, physiology and terminology 10%. Skill VIII.', lessons: [M6, M7]},
    {title: 'Unit 4 · Clinical procedures, specimens and diagnostics', summary: 'Test plan: physical exams, specimens, diagnostic testing and clinical procedures (10% each). Skills III–VII.', lessons: [M8, M9, M10]},
  ],
});
