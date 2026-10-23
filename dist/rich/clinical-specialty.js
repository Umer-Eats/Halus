// In-depth Clinical Specialty course mapped to the HOSA 2026–27 portfolio and presentation rating sheets.
import {course} from './build.js';
import {S1, S2, S3, S4, S5} from './cspec-a.js';
import {S6, S7, S8, S9, S10} from './cspec-b.js';

export default course('Clinical Specialty', {
  intro: 'Ten in-depth lessons that walk through every Clinical Specialty product in the order you will build it: choosing an eligible health career and skill, researching the career, interviewing a professional, job shadowing, writing the skill checklist, formatting the portfolio, recording the skill video and delivering the five-minute presentation. Each lesson maps directly to the 155-point rating sheets. Always follow the current HOSA guidelines.',
  units: [
    {title: 'Unit 1 · The event, the career and the skill', summary: 'Scoring, deadlines, career eligibility and the non-duplication rule.', lessons: [S1, S2, S3]},
    {title: 'Unit 2 · Research and the professional interview', summary: 'Portfolio items 3–5: career summary, education and data, interview summary.', lessons: [S4, S5]},
    {title: 'Unit 3 · Shadowing and the skill checklist', summary: 'Portfolio items 2, 6 and 7: Work-based Learning Form, learning outcomes and checklist.', lessons: [S6, S7]},
    {title: 'Unit 4 · Portfolio, video and presentation', summary: 'Formatting items 1 and 8–11, the 15-point video and Round Two delivery.', lessons: [S8, S9, S10]},
  ],
});
