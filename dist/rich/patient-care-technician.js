// In-depth Patient Care Technician course mapped to the HOSA 2026–27 test plan and seven Round Two skills.
import {course} from './build.js';
import {P1, P2, P3, P4, P5} from './pct-a.js';
import {P6, P7, P8, P9, P10} from './pct-b.js';

export default course('Patient Care Technician', {
  intro: 'Ten in-depth lessons following the HOSA Patient Care Technician 2026–27 test plan (patient care 44%, compliance and safety 20%, phlebotomy 14%, infection control 12%, EKG 10%) and all seven Round Two skills, built around NHA’s PCT SkillsBuilder Plus and CPCT/A study guide topics. Includes labeled conduction and waveform diagrams, an EKG rhythm lab, vital-sign and intake/output drills, a glucose model, the order of draw and skill step-ordering drills. Always follow the scenario, facility policy and the rating sheets you are given.',
  units: [
    {title: 'Unit 1 · Professional practice, safety and infection control', summary: 'Test plan: compliance, safety and professional responsibility 20%; infection control 12%.', lessons: [P1, P2, P3]},
    {title: 'Unit 2 · Core patient care', summary: 'Test plan: patient care 44%. Skills II, III and IV.', lessons: [P4, P5, P6]},
    {title: 'Unit 3 · Advanced clinical skills', summary: 'IV discontinuation and point-of-care glucose testing. Skills I and VII.', lessons: [P7, P9]},
    {title: 'Unit 4 · Phlebotomy and EKG', summary: 'Test plan: phlebotomy 14%, EKG 10%. Skills V and VI.', lessons: [P8, P10]},
  ],
});
