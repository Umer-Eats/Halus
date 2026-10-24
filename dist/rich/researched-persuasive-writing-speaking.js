// In-depth Researched Persuasive Writing & Speaking course mapped to the HOSA 2026–27 topic and rating sheets.
import {course} from './build.js';
import {RW1, RW2, RW3, RW4, RW5} from './rw-a.js';
import {RW6, RW7, RW8, RW9, RW10} from './rw-b.js';

export default course('Researched Persuasive Writing & Speaking', {
  intro: 'Ten in-depth lessons for the HOSA Researched Persuasive Writing & Speaking solo event (secondary and postsecondary), built around the 2026–27 topic “Should Pharmaceutical Companies Advertise?”: how direct-to-consumer drug advertising works and is regulated by the FDA, weighing arguments and choosing a stance, researching and evaluating evidence, writing a thesis and persuasive structure, drafting and formatting the two-page paper with APA references (90 points), turning it into a five-minute speech (80 points), persuasive delivery and rehearsal. Includes ad-type sorting, fallacy spotting, mechanics drills and practice scenarios.',
  units: [
    {title: 'Unit 1 · The event and the topic', summary: 'Rules, rubrics and pharmaceutical advertising basics.', lessons: [RW1, RW2]},
    {title: 'Unit 2 · Building the argument', summary: 'Weighing arguments, research and persuasive strategy.', lessons: [RW3, RW4, RW5]},
    {title: 'Unit 3 · The paper and the speech', summary: 'Drafting, mechanics, upload and adapting into a speech.', lessons: [RW6, RW7, RW8]},
    {title: 'Unit 4 · Delivery and competition', summary: 'Persuasive delivery, rehearsal and competition day.', lessons: [RW9, RW10]},
  ],
});
