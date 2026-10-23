// In-depth Pharmacy Science course mapped to the HOSA 2026–27 test plan and all seven Round Two skills.
import {course} from './build.js';
import {R1, R2, R3, R4, R5} from './rx-a.js';
import {R6, R7, R8, R9, R10} from './rx-b.js';

export default course('Pharmacy Science', {
  intro: 'Ten in-depth lessons following the HOSA Pharmacy Science 2026–27 test plan (disorders and treatments 46%; law, ethics, safety and infection control 10%; terminology and abbreviations 10%; dosage forms and routes 10%; compounding 10%; concentrations and dilutions 10%; history and settings 4%) and all seven Round Two skills, built around the ASHP Manual for Pharmacy Technicians and the Drugs.com abbreviation reference. Includes DEA checksum practice, prescription decoding, dose and dilution labs, a pharmacokinetics simulator, compounding and aseptic-technique ordering drills and drug-class sorting. Always follow the scenario and rating sheets you are given.',
  units: [
    {title: 'Unit 1 · Pharmacy practice and law', summary: 'Test plan: history and settings 4%; law, ethics, safety and infection control 10%. Skills II and V.', lessons: [R1, R2]},
    {title: 'Unit 2 · Prescriptions, dosage forms and calculations', summary: 'Test plan: terminology 10%, dosage forms and routes 10%, concentrations and dilutions 10%. Skill VI.', lessons: [R3, R4, R5]},
    {title: 'Unit 3 · Compounding', summary: 'Test plan: sterile and non-sterile compounding 10%. Skills I, III, IV and VII.', lessons: [R6, R7]},
    {title: 'Unit 4 · Disorders and treatments', summary: 'Test plan: disorders and treatments 46%.', lessons: [R8, R9, R10]},
  ],
});
