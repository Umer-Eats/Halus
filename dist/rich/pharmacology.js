// In-depth Pharmacology course mapped to the 2026–27 HOSA test plan.
import {course} from './build.js';
import {L1, L2, L3, L4} from './pharm-a.js';
import {L5, L6, L7, L8, L9} from './pharm-b.js';
import {L10, L11, L12} from './pharm-c.js';

export default course('Pharmacology', {
  intro: 'Twelve in-depth lessons mapped to the HOSA Pharmacology test plan, with simulations, practice calculations and HOSA-style checkpoints.',
  units: [
    {title: 'Unit 1 · Basic concepts in pharmacology', summary: 'Test plan: basic concepts 15%. Names, sources, approval, pharmacokinetics and pharmacodynamics.', lessons: [L1, L2, L3]},
    {title: 'Unit 2 · Ethical and legal responsibilities', summary: 'Test plan: 10%. Drug laws, controlled substances, ethics and error reporting.', lessons: [L4]},
    {title: 'Unit 3 · Drug classifications, actions and interactions', summary: 'Test plan: 30%, the largest domain. Autonomic, pain, CNS, cardiovascular, anti-infective, endocrine, respiratory and GI drugs.', lessons: [L5, L6, L7, L8, L9]},
    {title: 'Unit 4 · Drug administration', summary: 'Test plan: 20%. Dosage forms, routes, injections, rights of administration and safe abbreviations.', lessons: [L10]},
    {title: 'Unit 5 · Measurement, dosage and conversions', summary: 'Test plan: 10%. Conversions, dosage and IV calculations using HOSA rounding rules.', lessons: [L11]},
    {title: 'Unit 6 · Lifespan adaptations and technology', summary: 'Test plan: pediatrics and geriatrics 10%, technologies 5%.', lessons: [L12]},
  ],
});
