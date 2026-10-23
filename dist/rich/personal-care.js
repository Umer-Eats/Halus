// Personal Care course (HOSA IEP event): ten plain-language lessons covering all eight Round One skills.
import {course} from './build.js';
import {C1, C2, C3, C4, C5} from './pc-a.js';
import {C6, C7, C8, C9, C10} from './pc-b.js';

export default course('Personal Care', {
  intro: 'Ten step-by-step lessons for the HOSA Personal Care event (for members classified under IDEA), following the 2026–27 guidelines and all eight rating sheets: handwashing, PPE, unoccupied and occupied beds, admitting, transfer, vital signs (TPR and aneroid blood pressure) and ostomy care. Each lesson uses plain language, numbered steps that match the rating sheet, ordering drills, flip cards and practice scenarios. Remember to upload the IEP Verification and Accommodation Form by May 15. Always follow the scenario the judge reads to you.',
  units: [
    {title: 'Unit 1 · The event, the caregiver role and infection control', summary: 'Eligibility, how the skills round works and Skills I and II.', lessons: [C1, C2, C3]},
    {title: 'Unit 2 · Beds and comfort', summary: 'Skills III and IV: unoccupied and occupied beds.', lessons: [C4, C5]},
    {title: 'Unit 3 · Admission and safe moving', summary: 'Skills V and VI: admitting a patient and bed-to-wheelchair transfer.', lessons: [C6, C7]},
    {title: 'Unit 4 · Vital signs and ostomy care', summary: 'Skill VII (worth the most points) and Skill VIII.', lessons: [C8, C9, C10]},
  ],
});
