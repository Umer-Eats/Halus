// In-depth Extemporaneous Writing – Health Policy course mapped to the HOSA 2026–27 guidelines and rating sheet.
import {course} from './build.js';
import {EW1, EW2, EW3, EW4, EW5} from './ewhp-a.js';
import {EW6, EW7, EW8, EW9, EW10} from './ewhp-b.js';

export default course('Extemporaneous Writing - Health Policy', {
  intro: 'Ten in-depth lessons for the solo HOSA Extemporaneous Writing – Health Policy event: a 60-minute letter to a policymaker supporting or opposing a secret health policy topic, scored on a 120-point rubric (format 20, content 75, conclusion 15, mechanics 10). Covers the eight required letter items, how health policy is made, major policy debates, analyzing the topic and choosing a position, the statement of position, evidence-based supporting points, the personal story, the conclusion and request for response, grammar and spelling and a test-day plan with a complete model letter for the HOSA sample topic. Includes letter-order drills, evidence and tone sorting, spelling practice and timed scenarios. No internet research is allowed at the event, so the course builds the knowledge and template you will carry in memory.',
  units: [
    {title: 'Unit 1 · The event and health policy', summary: 'Required letter items, the rubric and how health policy is made.', lessons: [EW1, EW2]},
    {title: 'Unit 2 · Knowing the issues and taking a position', summary: 'Major health policy debates, analyzing the secret topic and choosing a side.', lessons: [EW3, EW4]},
    {title: 'Unit 3 · Writing the letter', summary: 'Statement of position, supporting points and the personal story.', lessons: [EW5, EW6, EW7]},
    {title: 'Unit 4 · Finishing strong', summary: 'Conclusion and request, mechanics and tone, and test-day strategy.', lessons: [EW8, EW9, EW10]},
  ],
});
