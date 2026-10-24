// In-depth Forensic Science course mapped to the HOSA 2026–27 test plan and case study rubric.
import {course} from './build.js';
import {FS1, FS2, FS3, FS4, FS5} from './fs-a.js';
import {FS6, FS7, FS8, FS9, FS10} from './fs-b.js';

export default course('Forensic Science', {
  intro: 'Ten in-depth lessons for the two-person HOSA Forensic Science event, following the 2026–27 test plan (crime scene and death investigation 20%, toxicology and pharmacology 20%, and 10% each for history and careers, anthropology, entomology, blood and biological fluids, DNA analysis and forensic psychology) and the 40-minute Round Two case analysis with its written conclusion: time of death range, immediate cause, manner, contributing conditions and evidence. Built around Bertino’s Forensic Science Fundamentals and Bell’s Forensic Science, with search-pattern and evidence sorting, time-of-death, degree-day and angle-of-impact calculations, toxicology and DNA sequencing drills and case scenarios. Descriptions are kept non-graphic; actual case materials may be graphic, so follow your advisor’s guidance.',
  units: [
    {title: 'Unit 1 · History, careers and the scene', summary: 'Test plan: history and careers 10%; crime scene investigation.', lessons: [FS1, FS2]},
    {title: 'Unit 2 · Death investigation and toxicology', summary: 'Test plan: death investigation 20%; toxicology and pharmacology 20%.', lessons: [FS3, FS4, FS5]},
    {title: 'Unit 3 · Remains and insects', summary: 'Test plan: forensic anthropology 10%; forensic entomology 10%.', lessons: [FS6, FS7]},
    {title: 'Unit 4 · Laboratory evidence, psychology and the case', summary: 'Test plan: blood and fluids 10%; DNA 10%; psychology 10%. Round Two conclusion.', lessons: [FS8, FS9, FS10]},
  ],
});
