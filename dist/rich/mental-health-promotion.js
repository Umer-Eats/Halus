// In-depth Mental Health Promotion course mapped to the HOSA 2026–27 guidelines and both rating sheets.
import {course} from './build.js';
import {MH1, MH2, MH3, MH4, MH5} from './mhp-a.js';
import {MH6, MH7, MH8, MH9, MH10} from './mhp-b.js';

export default course('Mental Health Promotion', {
  intro: 'Ten in-depth lessons for the HOSA Mental Health Promotion team event, following the 2026–27 guidelines: a pre-judged peer social media campaign built on youth risk and protective factors with a Mental Health Consultant (115 points) and a five-minute verbal presentation (105 points). Built around the Surgeon General’s advisory on youth mental health, SAMHSA, the Jed Foundation, Be There and the 988 Lifeline, with risk-and-protective-factor sorting, safe-messaging checks, post-building and timeline drills, upload checklists and presentation scenarios. This course teaches prevention and help-seeking; it is not a substitute for professional care. If you or someone you know is struggling, call or text 988.',
  units: [
    {title: 'Unit 1 · Mental health is health', summary: 'The event, the continuum and risk and protective factors.', lessons: [MH1, MH2]},
    {title: 'Unit 2 · Understanding and supporting peers', summary: 'Common youth concerns, warning signs, Be There and resources.', lessons: [MH3, MH4]},
    {title: 'Unit 3 · Planning and building the campaign', summary: 'Round One: consultant and needs assessment, safe messaging, content design and the digital upload.', lessons: [MH5, MH6, MH7, MH8]},
    {title: 'Unit 4 · Presenting and sustaining the work', summary: 'Round Two: presentation structure, delivery and next steps.', lessons: [MH9, MH10]},
  ],
});
