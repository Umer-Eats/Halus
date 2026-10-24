// In-depth Public Health course mapped to the HOSA 2026–27 topic, guidelines and rating sheets.
import {course} from './build.js';
import {PH1, PH2, PH3, PH4, PH5} from './ph-a.js';
import {PH6, PH7, PH8, PH9, PH10} from './ph-b.js';

export default course('Public Health', {
  intro: 'Ten in-depth lessons for the HOSA Public Health team event and its 2026–27 topic, “Fact-Check Your Feed: Taking Down Health Myths Before They Spread.” Covers public health and the 10 Essential Services, health misinformation and the infodemic, why myths spread, fact-checking with SIFT and lateral reading, debunking and prebunking, planning the live community presentation, the three-minute Round One trailer (90 points), the Required Display Time and the ten-minute Round Two presentation (115 points). Built around the Surgeon General’s advisory on health misinformation, WHO, HHS and peer-reviewed research, with evidence-reading labs, bias and red-flag sorting, SIFT and truth-sandwich sequencing and scenario practice. All example posts are invented for practice.',
  units: [
    {title: 'Unit 1 · Public health and the misinformation problem', summary: 'The event, public health, the infodemic and its harms.', lessons: [PH1, PH2]},
    {title: 'Unit 2 · Understanding and fighting myths', summary: 'Why misinformation spreads, fact-checking and debunking.', lessons: [PH3, PH4, PH5]},
    {title: 'Unit 3 · The community presentation', summary: 'Audience, partners, objectives and a captivating ten-minute design.', lessons: [PH6, PH7]},
    {title: 'Unit 4 · Trailer, Round Two and beyond', summary: 'Round One trailer and display time, Round Two rules and scoring, delivery, ethics and careers.', lessons: [PH8, PH9, PH10]},
  ],
});
