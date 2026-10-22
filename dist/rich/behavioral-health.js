// In-depth Behavioral Health course mapped to the 2026–27 HOSA test plan.
import {course} from './build.js';
import {B1, B2, B3, B4, B5} from './bh-a.js';
import {B6, B7, B8, B9, B10} from './bh-b.js';
import {B11, B12, B13, B14} from './bh-c.js';

B13.sections[0][1].push({t:'w',kind:'lifespan',title:'Understand stress in a developmental context',prompt:'Explore changing demands and support needs. A life period does not determine someone’s coping ability or mental health.'});

export default course('Behavioral Health', {
  intro: 'Fourteen in-depth lessons following the HOSA Behavioral Health test plan: the mind, disorders and treatments, substance use and mental illness, wellness, and careers, laws and history.',
  units: [
    {title: 'Unit 1 · The mind', summary: 'Test plan: 25%. Biological bases, sensation, perception, consciousness, motivation, emotion, learning and memory.', lessons: [B1, B2, B3, B4, B5]},
    {title: 'Unit 2 · Disorders, treatments, therapies and services', summary: 'Test plan: 25%. Autism, ADHD, schizophrenia, mood, anxiety, OCD, PTSD, personality, dissociative and eating disorders.', lessons: [B6, B7, B8, B9, B10]},
    {title: 'Unit 3 · Substance use and mental illness: prevention to recovery', summary: 'Test plan: 25%. Identification, treatment, prevention and recovery.', lessons: [B11, B12]},
    {title: 'Unit 4 · Wellness, stress and coping', summary: 'Test plan: 15%.', lessons: [B13]},
    {title: 'Unit 5 · Workforce, laws, history and systems', summary: 'Test plan: workforce, careers, laws and guidelines 5%; history and health systems integration 5%.', lessons: [B14]},
  ],
});
