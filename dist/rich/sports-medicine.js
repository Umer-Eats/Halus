// In-depth Sports Medicine course mapped to the HOSA 2026–27 test plan and all Round Two skills.
import {course} from './build.js';
import {SM1, SM2, SM3, SM4, SM5} from './sm-a.js';
import {SM6, SM7, SM8, SM9, SM10} from './sm-b.js';

export default course('Sports Medicine', {
  intro: 'Ten in-depth lessons following the HOSA Sports Medicine 2026–27 test plan (prevention and wellness 30%, examination and assessment 30%, immediate and emergency care 16%, therapeutic intervention 16%, administration 8%) and every Round Two skill: anatomical landmarks, joint actions with HOSA’s maximum range-of-motion values, and ankle, Achilles, shoulder spica and wrist/hand taping. Built around Prentice, France and Beam, with landmark and ligament matching, ROM tables and spelling drills, special-test sorting, emergency scenarios and step-ordering for every taping sheet. Bring your own tape and pads, and always follow the scenario you are given.',
  units: [
    {title: 'Unit 1 · The team and anatomy', summary: 'Test plan: administration 8%. Skill I landmarks.', lessons: [SM1, SM2, SM3]},
    {title: 'Unit 2 · Motion and prevention', summary: 'Test plan: prevention and wellness 30%. Skill II joint actions and ROM.', lessons: [SM4, SM5]},
    {title: 'Unit 3 · Assessment and emergency care', summary: 'Test plan: examination and assessment 30%, immediate and emergency care 16%.', lessons: [SM6, SM7, SM8]},
    {title: 'Unit 4 · Therapeutic intervention and taping', summary: 'Test plan: therapeutic intervention 16%. Skills III-A to III-D.', lessons: [SM9, SM10]},
  ],
});
