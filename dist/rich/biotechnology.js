// In-depth Biotechnology course mapped to the HOSA 2026–27 test plan and Round Two skills.
import {course} from './build.js';
import {B1, B2, B3, B4, B5} from './biotech-a.js';
import {B6, B7, B8, B9, B10} from './biotech-b.js';

export default course('Biotechnology', {
  intro: 'Ten in-depth lessons following the HOSA Biotechnology 2026–27 test plan and all eight Round Two skills, taught in the order the rating sheets score them. Includes a gel electrophoresis simulator, a transformation-efficiency calculator, solution and dilution labs, case troubleshooting and sequencing activities. Protocol values come from the HOSA scenario and the Bio-Rad reference; always follow the scenario you are given.',
  units: [
    {title: 'Unit 1 · Industry, safety and laboratory skills', summary: 'Test plan: industry and careers 4%, health 4%, regulation 4%, basic laboratory skills 14%. Skill I.', lessons: [B1, B2, B3]},
    {title: 'Unit 2 · Microbes, DNA and electrophoresis', summary: 'Test plan: microbiology and cell culture 12%, DNA structure and analysis 14%. Skills II–IV.', lessons: [B4, B5, B6]},
    {title: 'Unit 3 · Transformation and PCR', summary: 'Test plan: bacterial transformation 10%, PCR 14%. Skills VI–VII.', lessons: [B7, B8]},
    {title: 'Unit 4 · Proteins and immunology', summary: 'Test plan: protein structure, function and analysis 14%, immunological applications 10%. Skills V and VIII.', lessons: [B9, B10]},
  ],
});
