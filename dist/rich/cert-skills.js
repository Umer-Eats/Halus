// In-depth CERT Skills course mapped to the HOSA 2026–27 test plan and all Round Two skills.
import {course} from './build.js';
import {K1, K2, K3, K4, K5} from './cert-a.js';
import {K6, K7, K8, K9, K10} from './cert-b.js';

export default course('CERT Skills', {
  intro: 'Ten in-depth lessons for the two-person HOSA CERT Skills event, following the 2026–27 test plan (life-threatening interventions and SALT triage 30%, medical operations 20%, disaster preparedness 15%, light search and rescue 15%, CERT organization, disaster psychology, fire safety and terrorism 5% each) and every Round Two skill: SALT triage, opening the airway, controlling bleeding with a tourniquet and treating shock, head-to-toe assessment, lifts and carries and splinting a closed fracture. Built around FEMA IS-317, the CERT Basic Training Participant Manual, Red Cross FAST and SALT triage, with triage sorting, DCAP-BTLS drills, search-marking practice, PASS and size-up sequences and scenario decisions. Always follow the scenario you are given.',
  units: [
    {title: 'Unit 1 · CERT and preparedness', summary: 'Test plan: CERT organization 5%, disaster preparedness 15%, fire safety 5%.', lessons: [K1, K2, K3]},
    {title: 'Unit 2 · Life-threatening conditions and triage', summary: 'Test plan: life-threatening interventions and SALT triage 30%. Skills I, II-A and II-B.', lessons: [K4, K5, K6]},
    {title: 'Unit 3 · Medical operations', summary: 'Test plan: medical operations 20%. Skills III and V.', lessons: [K7, K8]},
    {title: 'Unit 4 · Search, rescue, psychology and terrorism', summary: 'Test plan: light search and rescue 15%, disaster psychology 5%, terrorism 5%. Skill IV.', lessons: [K9, K10]},
  ],
});
