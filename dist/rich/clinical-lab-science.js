// In-depth Clinical Lab Science (Medical Lab Scientist) course mapped to the HOSA 2026–27 test plan and skills.
import {course} from './build.js';
import {C1, C2, C3, C4, C5} from './cls-a.js';
import {C6, C7, C8, C9, C10} from './cls-b.js';

export default course('Clinical Lab Science (Medical Lab Scientist)', {
  intro: 'Ten in-depth lessons following the HOSA Clinical Lab Science (Medical Lab Scientist) 2026–27 test plan and all seven Round Two skills, taught step by step from the rating sheets. Includes a blood-typing simulator, instrument identification drills, dilution practice, labeled urinary anatomy, troubleshooting cases and procedure sequencing. Reference ranges are typical teaching values; laboratories set their own.',
  units: [
    {title: 'Unit 1 · The laboratory, safety and measurement', summary: 'Test plan: clinical lab professions 8%, biological safety 12%, laboratory math 6%. Skills I–III.', lessons: [C1, C2, C3]},
    {title: 'Unit 2 · Hematology, hemostasis and immunology', summary: 'Test plan: hematology and hemostasis 14%, immunology 16%. Skills IV and V.', lessons: [C4, C5, C6]},
    {title: 'Unit 3 · Urinalysis and clinical chemistry', summary: 'Test plan: urinalysis 8%, clinical chemistry 14%. Skill VI.', lessons: [C7, C8]},
    {title: 'Unit 4 · Microbiology and parasitology', summary: 'Test plan: clinical microbiology 14%, parasitology 8%. Skill VII.', lessons: [C9, C10]},
  ],
});
