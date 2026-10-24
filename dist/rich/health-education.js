// In-depth Health Education course mapped to the HOSA 2026–27 guidelines and rating sheets.
import {course} from './build.js';
import {HE1, HE2, HE3, HE4, HE5} from './he-a.js';
import {HE6, HE7, HE8, HE9, HE10} from './he-b.js';

export default course('Health Education', {
  intro: 'Ten in-depth lessons for the HOSA Health Education team event (2–6 members), following the 2026–27 guidelines: choosing a physical, mental, environmental or societal health topic, analyzing a real audience, writing measurable objectives, researching accurate content, designing a timed lesson with engaging materials and media, teaching a real audience, evaluating learning, building the 20-page Round One portfolio (65 points) and delivering the five-minute Round Two presentation (90 points). Includes objective-writing, alignment, evaluation-math and portfolio-format drills and practice scenarios.',
  units: [
    {title: 'Unit 1 · Topic and audience', summary: 'Event structure, health dimensions, topic choice and audience analysis.', lessons: [HE1, HE2]},
    {title: 'Unit 2 · Planning the lesson', summary: 'Goals and objectives, accurate research and timed lesson design.', lessons: [HE3, HE4, HE5]},
    {title: 'Unit 3 · Teaching and evaluating', summary: 'Materials and media, teaching a real audience and evaluating impact.', lessons: [HE6, HE7, HE8]},
    {title: 'Unit 4 · Portfolio and presentation', summary: 'Round One portfolio format and the Round Two presentation.', lessons: [HE9, HE10]},
  ],
});
