// In-depth MRC Partnership course mapped to the HOSA 2026–27 guidelines and both rating sheets.
import {course} from './build.js';
import {MR1, MR2, MR3, MR4, MR5} from './mrc-a.js';
import {MR6, MR7, MR8, MR9, MR10} from './mrc-b.js';

export default course('MRC Partnership', {
  intro: 'Ten in-depth lessons for the HOSA MRC Partnership team event, following the 2026–27 guidelines: a year-long partnership with a local Medical Reserve Corps unit (July 1–May 15), a pre-judged portfolio of up to 16 pages (60 points) and a five-minute presentation (70 points). Built around the MRC program at ASPR, the National Health Security Strategy, disaster risk reduction and youth preparedness, with impact-category matching, form and portfolio checklists, metric calculations, planning timelines and partnership scenarios. All activities must be done with your MRC partner, and every social media post must be approved by the MRC before posting.',
  units: [
    {title: 'Unit 1 · The MRC and preparedness', summary: 'The event, the Medical Reserve Corps and community resilience.', lessons: [MR1, MR2]},
    {title: 'Unit 2 · Building the partnership', summary: 'Finding a unit, Path A or B and the required forms.', lessons: [MR3, MR4]},
    {title: 'Unit 3 · Activities and impact', summary: 'Impact categories, planning and running activities and measuring results.', lessons: [MR5, MR6, MR7]},
    {title: 'Unit 4 · Portfolio and presentation', summary: 'Round One portfolio, Round Two presentation and sustaining the partnership.', lessons: [MR8, MR9, MR10]},
  ],
});
