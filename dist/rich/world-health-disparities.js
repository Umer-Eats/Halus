// In-depth World Health & Disparities course mapped to the HOSA 2026–27 test plan.
import {course} from './build.js';
import {W1, W2, W3, W4, W5} from './world-health-a.js';
import {W6, W7, W8, W9, W10} from './world-health-b.js';

export default course('World Health & Disparities', {
  intro: 'Ten in-depth lessons following the HOSA World Health & Disparities 2026–27 test plan, built on the event’s official web references: WHO Health Equity, NIMHD, KFF and Our World in Data. Statistics are quoted with their source and year so you can verify them; invented teaching datasets are labeled as invented. Lessons include population-rate laboratories, evidence benches, case simulations and sorting activities. Read the assigned Barr text alongside this course.',
  units: [
    {title: 'Unit 1 · What is health', summary: 'Test plan: 20%. Defining health and equity, the determinants of health and how population health is measured.', lessons: [W1, W2]},
    {title: 'Unit 2 · Health disparities and diversity', summary: 'Test plan: 40%, the largest domain. Race and ethnicity, income and insurance, geography and global inequity, and diversity across identities.', lessons: [W3, W4, W5, W6]},
    {title: 'Unit 3 · Disparities in treatment and medical decisions', summary: 'Test plan: 20%. Bias, communication, research inclusion and clinical tools.', lessons: [W7, W8]},
    {title: 'Unit 4 · Reducing health disparities', summary: 'Test plan: 20%. Policies, programs and community-centered interventions, and how to evaluate them.', lessons: [W9, W10]},
  ],
});
