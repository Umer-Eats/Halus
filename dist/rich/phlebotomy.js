// In-depth Phlebotomy course mapped to the HOSA 2026–27 test plan and all nine Round Two skills.
import {course} from './build.js';
import {H1, H2, H3, H4, H5} from './phl-a.js';
import {H6, H7, H8, H9, H10} from './phl-b.js';

export default course('Phlebotomy', {
  intro: 'Ten in-depth lessons following the HOSA Phlebotomy 2026–27 test plan (obtaining blood samples 42%, specimen collection and processing 16%, safety 10%, time management 8%, legal and ethical 8%, terminology and anatomy 8%, communication 4%, clerical 4%) and all nine Round Two skills, built around McCall’s Phlebotomy Essentials, Booth and Mundt and AMT resources. Includes vein-selection and order-of-draw drills, tube-to-test matching, step-ordering for every rating sheet, complication scenarios and specimen-handling sorts. Always follow the scenario and rating sheets you are given.',
  units: [
    {title: 'Unit 1 · The profession, safety and the body', summary: 'Test plan: communication, clerical, legal 16%; safety 10%; anatomy 8%. Skills I and VI.', lessons: [H1, H2, H3]},
    {title: 'Unit 2 · Venipuncture', summary: 'Test plan: obtaining blood samples 42%. Skills II, III-A and III-B.', lessons: [H4, H5, H6]},
    {title: 'Unit 3 · Complications and capillary puncture', summary: 'Skills IV, V and VII.', lessons: [H7, H8]},
    {title: 'Unit 4 · Specimen processing and special collections', summary: 'Test plan: specimen collection and processing 16%. Skill VIII.', lessons: [H9, H10]},
  ],
});
