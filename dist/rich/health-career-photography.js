// In-depth Health Career Photography course mapped to the HOSA 2026–27 guidelines and rating sheets.
import {course} from './build.js';
import {HP1, HP2, HP3, HP4, HP5} from './hcp-a.js';
import {HP6, HP7, HP8, HP9, HP10} from './hcp-b.js';

export default course('Health Career Photography', {
  intro: 'Ten in-depth lessons for the HOSA Health Career Photography solo event, following the 2026–27 guidelines: choosing three health professionals in three different fields, obtaining facility and subject permissions and protecting privacy, camera exposure, focus and color, composition and storytelling, shooting safely in health care settings, ethical editing and 8″ × 10″ printing, writing one-page narratives, assembling the 13-page portfolio and PDF (165 points), the required display time and the five-minute Round Two presentation (110 points). Includes composition, exposure, editing-rule and timing drills and practice scenarios.',
  units: [
    {title: 'Unit 1 · The event and the subjects', summary: 'Event rules, scoring and choosing three professionals.', lessons: [HP1, HP2]},
    {title: 'Unit 2 · Ethics and camera craft', summary: 'Permissions and privacy, exposure and composition.', lessons: [HP3, HP4, HP5]},
    {title: 'Unit 3 · Shooting, editing and writing', summary: 'Health care settings, editing and printing, narratives.', lessons: [HP6, HP7, HP8]},
    {title: 'Unit 4 · Portfolio and presentation', summary: 'Portfolio, PDF, display time and Round Two.', lessons: [HP9, HP10]},
  ],
});
