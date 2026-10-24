// In-depth Epidemiology course mapped to the HOSA 2026–27 test plan.
import {course} from './build.js';
import {D1, D2, D3, D4, D5} from './epi-a.js';
import {D6, D7, D8, D9, D10} from './epi-b.js';

export default course('Epidemiology', {
  intro: 'Ten in-depth lessons for the HOSA Epidemiology test, following the 2026–27 test plan (Introduction to Epidemiology 30%, World and Government Response to Infectious Diseases 20%, CDC Morbidity and Mortality Weekly Report 50%) and the tiebreaker essay. Built around CDC’s Public Health 101 Series and Principles of Epidemiology, WHO fact sheets and the MMWR, with worked rate, risk-ratio, odds-ratio and screening calculations, rate-comparison and evidence-reading labs, design and surveillance sorting and outbreak scenarios. All practice data are invented. Read the MMWR reports posted for the current competition year alongside this course.',
  units: [
    {title: 'Unit 1 · Foundations and measurement', summary: 'Test plan: Introduction to Epidemiology—basic concepts, types of studies, measuring health and disease.', lessons: [D1, D2, D3]},
    {title: 'Unit 2 · Causation and surveillance', summary: 'Test plan: Introduction to Epidemiology—causation and surveillance.', lessons: [D4, D5]},
    {title: 'Unit 3 · World and government response', summary: 'Test plan: World and Government Response to Infectious Diseases 20%.', lessons: [D6, D7]},
    {title: 'Unit 4 · The MMWR', summary: 'Test plan: CDC MMWR 50%—case studies, investigations, surveillance summaries and recommendations.', lessons: [D8, D9, D10]},
  ],
});
