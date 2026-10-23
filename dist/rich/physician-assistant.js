// In-depth Physician Assistant – Medical Case Challenge course mapped to the HOSA 2026–27 test plan and Round Two case presentation.
import {course} from './build.js';
import {A1, A2, A3, A4, A5} from './pa-a.js';
import {A6, A7, A8, A9, A10} from './pa-b.js';

export default course('Physician Assistant - Medical Case Challenge', {
  intro: 'Ten in-depth lessons for the new HOSA Physician Assistant – Medical Case Challenge (2026–27): the full test plan (diagnosis 14%, patient assessment 12%, disease process and cancer 10%, and every body system from circulatory and digestive at 10% to integumentary, reproductive and urinary at 4%) and the Round Two case review and five-minute team presentation. Built around CMDT and MedlinePlus, with history-taking and diagnostic-reasoning drills, labeled body-system diagrams, lab-pattern matching, an ECG rhythm lab, case scenarios in every lesson and a full practice case. Always base your presentation on the case documents you are given.',
  units: [
    {title: 'Unit 1 · The PA role, assessment and diagnosis', summary: 'Test plan: patient assessment 12%, diagnosis 14%. Round Two strategy.', lessons: [A1, A2, A3]},
    {title: 'Unit 2 · Disease process and the circulatory system', summary: 'Test plan: disease process and terminology 10%, circulatory and lymphatic 10%.', lessons: [A4, A5]},
    {title: 'Unit 3 · Respiratory, digestive and endocrine/genitourinary systems', summary: 'Test plan: respiratory 6%, digestive 10%, endocrine 6%, urinary 4%, reproductive 4%.', lessons: [A6, A7, A8]},
    {title: 'Unit 4 · Nervous system, mind, skin and bones', summary: 'Test plan: nervous and senses 8%, mental disorders 6%, integumentary 4%, musculoskeletal 6%. Full practice case.', lessons: [A9, A10]},
  ],
});
