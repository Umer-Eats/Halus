// In-depth Creative Problem Solving course mapped to the HOSA 2026–27 test plan and presentation rubric.
import {course} from './build.js';
import {CP1, CP2, CP3, CP4, CP5} from './cps-a.js';
import {CP6, CP7, CP8, CP9, CP10} from './cps-b.js';

export default course('Creative Problem Solving', {
  intro: 'Ten in-depth lessons for the HOSA Creative Problem Solving team event, following the 2026–27 test plan (critical and effective thinking 26%, problem-solving strategies and skills 24%, examining constraints and developing alternatives 20%, components of logic 20%, clarification of problems and generating ideas 10%) and the Round Two secret problem: 15 minutes of preparation with two flip charts and a 10-minute presentation scored out of 100. Built around McShane and Von Glinow’s Organizational Behavior, Adair’s Decision Making and Problem Solving, Sternad’s Solve It! and critical thinking and logic resources, with bias and fallacy sorting, logic forms, 5 Whys and fishbone drills, SCAMPER, weighted decision matrices, budget examples, team charters and timed prep routines.',
  units: [
    {title: 'Unit 1 · Thinking foundations', summary: 'Test plan: critical and effective thinking 26%, components of logic 20%.', lessons: [CP1, CP2, CP3]},
    {title: 'Unit 2 · Clarifying and generating', summary: 'Test plan: clarification of problems and generating ideas 10%.', lessons: [CP4, CP5]},
    {title: 'Unit 3 · Deciding and teaming', summary: 'Test plan: problem-solving strategies 24%, constraints and alternatives 20%; team dynamics.', lessons: [CP6, CP7, CP8]},
    {title: 'Unit 4 · Round Two', summary: 'The 15-minute preparation and the 10-minute presentation.', lessons: [CP9, CP10]},
  ],
});
