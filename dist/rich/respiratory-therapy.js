// In-depth Respiratory Therapy course mapped to the HOSA 2026–27 test plan and all seven Round Two skills.
import {course} from './build.js';
import {E1, E2, E3, E4, E5} from './rt-a.js';
import {E6, E7, E8, E9, E10} from './rt-b.js';

export default course('Respiratory Therapy', {
  intro: 'Ten in-depth lessons following the HOSA Respiratory Therapy 2026–27 test plan (foundations, assessment, cardiopulmonary diseases and basic therapeutics 20% each; applied anatomy and physiology and patient education 10% each) and all seven Round Two skills, built around Egan’s Fundamentals of Respiratory Care, DHO: Health Science and AARC resources. Includes labeled airway diagrams, breath-sound and ABG drills, oxygen-device comparisons, a vitals report lab, Apgar practice and step-ordering for every rating sheet. Always follow the scenario and rating sheets you are given.',
  units: [
    {title: 'Unit 1 · Foundations of respiratory care', summary: 'Test plan: foundations 20%. Skill II.', lessons: [E1, E2]},
    {title: 'Unit 2 · Anatomy, physiology and assessment', summary: 'Test plan: applied A&P 10%, assessment 20%. Skills IV and VI.', lessons: [E3, E4, E5]},
    {title: 'Unit 3 · Cardiopulmonary diseases', summary: 'Test plan: cardiopulmonary diseases 20%.', lessons: [E6, E7]},
    {title: 'Unit 4 · Therapeutics, newborns and long-term care', summary: 'Test plan: basic therapeutics 20%, patient education and long-term care 10%. Skills I, III, V and VII.', lessons: [E8, E9, E10]},
  ],
});
