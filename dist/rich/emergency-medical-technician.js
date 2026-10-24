// In-depth Emergency Medical Technician course mapped to the HOSA 2026–27 test plan and all Round Two skills.
import {course} from './build.js';
import {E1, E2, E3, E4, E5} from './emt-a.js';
import {E6, E7, E8, E9, E10} from './emt-b.js';

export default course('Emergency Medical Technician', {
  intro: 'Ten in-depth lessons for the two-person HOSA Emergency Medical Technician event, following the 2026–27 test plan (patient assessment 20%, basic life support 20%, trauma 16%, pediatrics and childbirth 16%, medical emergencies 14%, environmental emergencies 10%, special situations 4%) and all nine Round Two skills: trauma and medical patient assessment, BVM ventilation of an apneic adult, long bone or joint immobilization, bleeding control and shock management, cardiac arrest management with AED, oxygen by non-rebreather mask, epinephrine auto-injector and naloxone. Built around Emergency Care and Transportation of the Sick and Injured, the AHA BLS Provider Manual and Brady Emergency Care, with DCAP-BTLS, OPQRST and SAMPLE drills, vital-sign and glucose labs, rhythm recognition, START triage sorting and scenario decisions. Always follow the scenario you are given and your local protocols.',
  units: [
    {title: 'Unit 1 · EMS foundations and patient assessment', summary: 'Test plan: patient assessment 20%, special situations. Skills I and II.', lessons: [E1, E2, E3]},
    {title: 'Unit 2 · Airway and resuscitation', summary: 'Test plan: basic life support 20%. Skills III, VI and VII.', lessons: [E4, E5]},
    {title: 'Unit 3 · Trauma', summary: 'Test plan: trauma 16%. Skills IV and V.', lessons: [E6, E7]},
    {title: 'Unit 4 · Medical, pediatric, environmental and special situations', summary: 'Test plan: medical 14%, pediatrics and childbirth 16%, environmental 10%, special situations 4%. Skills VIII and IX.', lessons: [E8, E9, E10]},
  ],
});
