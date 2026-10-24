// In-depth Speaking Skills course (event for HOSA members classified under IDEA) mapped to the 2026–27 topic and rating sheet.
import {course} from './build.js';
import {SK1, SK2, SK3, SK4, SK5} from './sk-a.js';
import {SK6, SK7, SK8, SK9, SK10} from './sk-b.js';

export default course('Speaking Skills', {
  intro: 'Ten step-by-step lessons for the HOSA Speaking Skills solo event, designed for middle school and secondary members classified under IDEA, built around the 2026–27 topic “Redefine the Standard” and the 105-point rating sheet: eligibility and the IEP Verification and Accommodation Form, understanding the topic with a topic web, choosing one main idea, finding stories and examples, building a speech map, writing openings and closings, notecards and memory helpers, using your voice without a microphone, body language and eye contact and practice, calming strategies and competition day. Written in clear, simple language with templates, checklists and practice scenarios.',
  units: [
    {title: 'Unit 1 · Getting started', summary: 'Eligibility, accommodations and understanding the topic.', lessons: [SK1, SK2]},
    {title: 'Unit 2 · Building your speech', summary: 'Main idea, stories and examples and the speech map.', lessons: [SK3, SK4, SK5]},
    {title: 'Unit 3 · Making it strong', summary: 'Openings and closings, notecards and your voice.', lessons: [SK6, SK7, SK8]},
    {title: 'Unit 4 · Speech day', summary: 'Body language, practice and staying calm.', lessons: [SK9, SK10]},
  ],
});
