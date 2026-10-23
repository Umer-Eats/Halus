// In-depth Dental Science course mapped to the HOSA 2026–27 test plan and eight Round Two skills.
import {course} from './build.js';
import {D1, D2, D3, D4, D5} from './ds-a.js';
import {D6, D7, D8, D9, D10} from './ds-b.js';

export default course('Dental Science', {
  intro: 'Ten in-depth lessons following the HOSA Dental Science 2026–27 test plan and all eight Round Two skills, built from the official references (Boyd, Robinson and DHO). Includes labeled skull, tooth, periodontal and bitewing diagrams, an interactive dental chart, instrument spelling practice, skill step-ordering drills and emergency cases. Always follow the scenario and the rating sheets you are given.',
  units: [
    {title: 'Unit 1 · The profession and oral anatomy', summary: 'Test plan: team, specialties and history 10%; dental anatomy and physiology 10%; tooth morphology 10%.', lessons: [D1, D2, D3]},
    {title: 'Unit 2 · Pathology, prevention and infection control', summary: 'Test plan: dental pathology 10%; infection control and occupational safety 10%. Skills IV, V, VII and VIII.', lessons: [D4, D5]},
    {title: 'Unit 3 · Chairside assisting and instruments', summary: 'Test plan: chairside assisting and instruments 30%. Skills I, II and III.', lessons: [D6, D7, D8]},
    {title: 'Unit 4 · Materials, radiology and emergencies', summary: 'Test plan: restorative and laboratory materials (within the 30%), radiology 10%, medical emergencies 10%. Skill VI.', lessons: [D9, D10]},
  ],
});
