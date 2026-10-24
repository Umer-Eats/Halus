// In-depth Parliamentary Procedure course mapped to the HOSA 2026–27 test plan and meeting rubric.
import {course} from './build.js';
import {PP1, PP2, PP3, PP4, PP5} from './pp-a.js';
import {PP6, PP7, PP8, PP9, PP10} from './pp-b.js';

export default course('Parliamentary Procedure', {
  intro: 'Ten in-depth lessons for the HOSA Parliamentary Procedure team event (5–8 secondary or postsecondary members), following the 2026–27 guidelines and the National Association of Parliamentarians test plan from Robert’s Rules of Order Newly Revised In Brief: why have rules, meetings, handling motions, debate, amendments, postponing and referring, changing the group’s mind, voting and elections, bylaws and other rules, enforcing and suspending rules and officers and committees. Also covers writing previous minutes and reports, the 15-minute preparation and the 10-minute secret-topic meeting judged on a 162-point rubric. Includes precedence, table-of-rules, vote-threshold and scripting drills.',
  units: [
    {title: 'Unit 1 · The event and meetings', summary: 'Event structure, why rules and how meetings work.', lessons: [PP1, PP2]},
    {title: 'Unit 2 · Motions, debate and amendments', summary: 'Handling motions, precedence, debate and amendments.', lessons: [PP3, PP4, PP5]},
    {title: 'Unit 3 · More motions, votes and elections', summary: 'Delay motions, privileged and incidental motions, changing decisions and voting.', lessons: [PP6, PP7, PP8]},
    {title: 'Unit 4 · Rules, officers and the meeting', summary: 'Bylaws, officers, committees and running the Round Two meeting.', lessons: [PP9, PP10]},
  ],
});
