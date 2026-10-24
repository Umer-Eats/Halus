// In-depth Biomedical Debate course mapped to the HOSA 2026–27 resolution, references and rating sheet.
import {course} from './build.js';
import {BD1, BD2, BD3, BD4, BD5} from './bd-a.js';
import {BD6, BD7, BD8, BD9, BD10} from './bd-b.js';

export default course('Biomedical Debate', {
  intro: 'Ten in-depth lessons for the HOSA Biomedical Debate team event and its 2026–27 resolution: “Limited healthcare resources should be allocated to patients with the greatest likelihood of long-term survival.” Covers scarcity and micro, meso and macro allocation, ethical theories of rationing, allocation criteria and frameworks, real cases from organ transplantation to COVID-19 triage, full affirmative and negative cases using the official references (Levy’s Breaking the Age Code, Bognar and Hirose, the Lancet framework and GESDA longevity science), the six-speech debate format, refutation and weighing, delivery and decorum and preparation for the qualifying test. Includes theory sorting, refutation sequencing, evidence-reading labs and debate scenarios.',
  units: [
    {title: 'Unit 1 · The event and the problem of scarcity', summary: 'The resolution, the format and levels of allocation.', lessons: [BD1, BD2]},
    {title: 'Unit 2 · Ethics and evidence', summary: 'Ethical theories, allocation criteria and real-world cases.', lessons: [BD3, BD4, BD5]},
    {title: 'Unit 3 · Building both cases', summary: 'The affirmative and negative cases.', lessons: [BD6, BD7]},
    {title: 'Unit 4 · Debating to win', summary: 'Format and roles, refutation and weighing, delivery, decorum and the test.', lessons: [BD8, BD9, BD10]},
  ],
});
