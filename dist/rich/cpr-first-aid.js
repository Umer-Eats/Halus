// In-depth CPR/First Aid course mapped to the HOSA 2026–27 test plan and all Round Two skills.
import {course} from './build.js';
import {F1, F2, F3, F4, F5} from './fa-a.js';
import {F6, F7, F8, F9, F10} from './fa-b.js';

export default course('CPR/First Aid', {
  intro: 'Ten in-depth lessons for the two-person HOSA CPR/First Aid event, following the 2026–27 test plan (Basic Life Support 40%, First Aid 60%) and every Round Two skill: adult CPR, adult CPR with an AED and infant CPR for Rescuer 1, and severe bleeding and shock, choking, open fractures, severe burns, heat emergencies, epinephrine auto-injectors and naloxone for Rescuer 2. Built around the AHA and American Red Cross guidelines with chain-of-survival sequencing, AED and tourniquet steps, burn and glucose labs, heat-illness sorting and scenario decisions. Always follow the scenario you are given and state whether your team follows AHA or ARC.',
  units: [
    {title: 'Unit 1 · Foundations and adult BLS', summary: 'Test plan: BLS general concepts, adult CPR and AED. Skills I and II.', lessons: [F1, F2, F3]},
    {title: 'Unit 2 · Pediatric BLS and choking', summary: 'Test plan: child and infant CPR, choking. Skills III and V.', lessons: [F4, F5]},
    {title: 'Unit 3 · Injury emergencies', summary: 'Test plan: First Aid—injury emergencies. Skills IV, VI and VII.', lessons: [F6, F7, F8]},
    {title: 'Unit 4 · Environmental and medical emergencies', summary: 'Test plan: First Aid—environmental and medical emergencies. Skills VIII, IX and X.', lessons: [F9, F10]},
  ],
});
