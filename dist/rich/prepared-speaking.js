// In-depth Prepared Speaking course mapped to the HOSA 2026–27 topic and rating sheet.
import {course} from './build.js';
import {PSP1, PSP2, PSP3, PSP4, PSP5} from './psp-a.js';
import {PSP6, PSP7, PSP8, PSP9, PSP10} from './psp-b.js';

export default course('Prepared Speaking', {
  intro: 'Ten in-depth lessons for the HOSA Prepared Speaking solo event (middle school, secondary and postsecondary), built around the 2026–27 topic “Redefine the Standard” and the 105-point rating sheet (content 60, organization 30, delivery 15): interpreting the theme, choosing a point of view, gathering credible support, writing a powerful opening, a cohesive body and an impactful closing, writing for the ear, delivering a five-minute speech without a microphone and rehearsing with rubric-based feedback. Includes pattern, transition, timing and filler-reduction drills and practice scenarios.',
  units: [
    {title: 'Unit 1 · The event and the theme', summary: 'Rules, rubric and interpreting “Redefine the Standard.”', lessons: [PSP1, PSP2]},
    {title: 'Unit 2 · Message and opening', summary: 'Point of view, supporting material and the opening.', lessons: [PSP3, PSP4, PSP5]},
    {title: 'Unit 3 · Body, closing and language', summary: 'Cohesive body, impactful closing and oral style.', lessons: [PSP6, PSP7, PSP8]},
    {title: 'Unit 4 · Delivery and rehearsal', summary: 'Delivery without a microphone and competition preparation.', lessons: [PSP9, PSP10]},
  ],
});
