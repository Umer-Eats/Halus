// In-depth Community Awareness course mapped to the HOSA 2026–27 guidelines and rating sheets.
import {course} from './build.js';
import {CA1, CA2, CA3, CA4, CA5} from './ca-a.js';
import {CA6, CA7, CA8, CA9, CA10} from './ca-b.js';

export default course('Community Awareness', {
  intro: 'Ten in-depth lessons for the HOSA Community Awareness team event: a local health or safety campaign (July 1, 2026 – May 15, 2027) documented in a pre-judged portfolio of up to 12 pages (80 points) and presented to judges in five minutes with notecards only. Covers choosing a topic in physical, mental, environmental or societal health, research and needs assessment, SMART goals and logic models, community partnerships, campaign activities and original items, publicity, measuring impact, the portfolio, the presentation and sustaining the campaign. Includes domain sorting, planning drills, calculation examples, rubric checklists and campaign scenarios.',
  units: [
    {title: 'Unit 1 · Choosing and researching the issue', summary: 'The event, health domains and research.', lessons: [CA1, CA2]},
    {title: 'Unit 2 · Planning and partnerships', summary: 'Goals, objectives, logic models and community partners.', lessons: [CA3, CA4]},
    {title: 'Unit 3 · Running the campaign', summary: 'Activities and original items, publicity and measuring impact.', lessons: [CA5, CA6, CA7]},
    {title: 'Unit 4 · Portfolio and presentation', summary: 'Round One portfolio, Round Two presentation, delivery and sustainability.', lessons: [CA8, CA9, CA10]},
  ],
});
