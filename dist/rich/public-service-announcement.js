// In-depth Public Service Announcement course mapped to the HOSA 2026–27 guidelines, topic and rating sheets.
import {course} from './build.js';
import {PS1, PS2, PS3, PS4, PS5} from './psa-a.js';
import {PS6, PS7, PS8, PS9, PS10} from './psa-b.js';

export default course('Public Service Announcement', {
  intro: 'Ten in-depth lessons for the HOSA Public Service Announcement team event (2–6 secondary or postsecondary members), built around the 2026–27 topic “Maintain My Brain: Practicing the Pillars of Brain Health”: the science of brain health and dementia risk, the pillars of brain health, audience, message and tone, writing a 30-second script and storyboard, filming, audio and editing, copyright and credits, airing and measuring impact, the Round One upload (115 points) and the five-minute Round Two presentation (85 points). Includes timing math, survey analysis, copyright decisions and practice scenarios.',
  units: [
    {title: 'Unit 1 · The event and the science', summary: 'Event rules, the 2026–27 topic and why brain health matters.', lessons: [PS1, PS2]},
    {title: 'Unit 2 · Message and script', summary: 'Pillars of brain health, audience and tone, script and storyboard.', lessons: [PS3, PS4, PS5]},
    {title: 'Unit 3 · Production', summary: 'Filming, audio, editing, music and copyright.', lessons: [PS6, PS7, PS8]},
    {title: 'Unit 4 · Impact and presentation', summary: 'Airing, measuring impact, the upload and Round Two.', lessons: [PS9, PS10]},
  ],
});
