// In-depth Medical Spelling course mapped to the HOSA 2026–27 guidelines.
import {course} from './build.js';
import {S1, S2, S3, S4, S5} from './medical-spelling-a.js';
import {S6, S7, S8, S9, S10} from './medical-spelling-b.js';

export default course('Medical Spelling', {
  intro: 'Ten in-depth lessons for both rounds of HOSA Medical Spelling: the 50-item multiple-choice test and the oral spelldown. Lessons teach the word-part rules, letter patterns, plurals and sound-alikes behind thousands of terms, with a spelling studio that marks each letter, word builders, drills and spelldown simulations. Spellings follow standard U.S. usage; the official references are Taber’s Cyclopedic Medical Dictionary and Taber’s Audio Glossary, which you should use for pronunciation practice.',
  units: [
    {title: 'Unit 1 · The event and the building blocks', summary: 'Round One and Round Two rules, study methods, and the rules that join roots, prefixes and suffixes.', lessons: [S1, S2, S3]},
    {title: 'Unit 2 · Spelling patterns and traps', summary: 'Greek letter patterns, silent letters, doubled letters, vowel order, plurals and adjective forms.', lessons: [S4, S5, S6]},
    {title: 'Unit 3 · Meaning and body-system vocabulary', summary: 'Sound-alikes and look-alikes, then high-frequency terms from every body system.', lessons: [S7, S8, S9]},
    {title: 'Unit 4 · Advanced terms and the spelldown', summary: 'Eponyms, multiword and complicated terms, and competition performance.', lessons: [S10]},
  ],
});
