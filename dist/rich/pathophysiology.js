// In-depth Pathophysiology course mapped to the 2026–27 HOSA test plan.
import {course} from './build.js';
import {P1, P2, P3} from './patho-a.js';
import {P4, P5, P6, P7, P8} from './patho-b.js';
import {P9, P10, P11, P12, P13} from './patho-c.js';

P1.sections[0][1].push({t:'w',kind:'termlab',title:'Decode the language of disease',prompt:'Separate what a word means from what it can establish about a person’s diagnosis.'});

export default course('Pathophysiology', {
  intro: 'Thirteen in-depth lessons following the HOSA Pathophysiology test plan: the disease process and cancer, then every body system and mental disorders.',
  units: [
    {title: 'Unit 1 · Disease process and terminology', summary: 'Test plan: 12%, including cancer and neoplasms.', lessons: [P1, P2, P3]},
    {title: 'Unit 2 · Skin, bones and muscles', summary: 'Test plan: integumentary 8%, musculoskeletal 10%.', lessons: [P4, P5]},
    {title: 'Unit 3 · Circulation, blood and breathing', summary: 'Test plan: circulatory and lymphatic 12%, respiratory 8%.', lessons: [P6, P7, P8]},
    {title: 'Unit 4 · Digestion and hormones', summary: 'Test plan: digestive 12%, endocrine 8%.', lessons: [P9, P10]},
    {title: 'Unit 5 · Nervous system, senses, urinary and reproductive', summary: 'Test plan: nervous and senses 10%, urinary 6%, reproductive 6%.', lessons: [P11, P12]},
    {title: 'Unit 6 · Mental disorders', summary: 'Test plan: 8%.', lessons: [P13]},
  ],
});
