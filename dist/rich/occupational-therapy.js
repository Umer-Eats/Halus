// In-depth Occupational Therapy course mapped to the HOSA 2026–27 test plan and eight Round Two skills.
import {course} from './build.js';
import {O1, O2, O3, O4, O5} from './ot-a.js';
import {O6, O7, O8, O9, O10} from './ot-b.js';

export default course('Occupational Therapy', {
  intro: 'Ten in-depth lessons following the HOSA Occupational Therapy 2026–27 test plan and all eight Round Two instruction skills, built from the official references (O’Brien and Conners, Atchison and Dirette, and the OT Toolkit for skills). Includes models of practice, activity analysis, adaptive dressing and floor-transfer drills, heart-rate monitoring, body mechanics, posture and stretch-break sequences, plus cases across the lifespan. Always follow the scenario and rating sheets you are given.',
  units: [
    {title: 'Unit 1 · The profession and how OT thinks', summary: 'Test plan: profession of OT 10%, models of practice 10%, activity analysis 10%. Skills VII and VIII.', lessons: [O1, O2, O3]},
    {title: 'Unit 2 · OT for physical conditions', summary: 'Test plan: physical conditions 20%. Skills I–V.', lessons: [O4, O5]},
    {title: 'Unit 3 · Mental health and the lifespan', summary: 'Test plan: wellness and mental health 20%; children, adults and older adults 20%.', lessons: [O6, O7, O8]},
    {title: 'Unit 4 · Ethics, safety, wellness and work', summary: 'Test plan: ethics and safety 10%; wellness. Skill VI.', lessons: [O9, O10]},
  ],
});
