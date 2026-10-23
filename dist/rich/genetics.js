// In-depth Genetics course mapped to the new HOSA 2026–27 Genetics test plan and Round Two skills.
import {course} from './build.js';
import {G1, G2, G3, G4, G5} from './gen-a.js';
import {G6, G7, G8, G9, G10} from './gen-b.js';

export default course('Genetics', {
  intro: 'Ten in-depth lessons for HOSA’s new Genetics event, following the 2026–27 test plan and every Round Two skill: DNA extraction, bacterial conjugation and transduction, Drosophila and Wisconsin Fast Plants crosses, cross interpretation and the chi-square test. Includes Punnett square, chi-square, DNA-to-protein, Hardy-Weinberg, gel and transformation labs. The official reference is Carolina’s guidebook for the HOSA Genetics test; always follow the scenario and rating sheets you are given.',
  units: [
    {title: 'Unit 1 · Cell division and reproduction', summary: 'Test plan: reproduction, mitosis and meiosis 20%.', lessons: [G1, G2]},
    {title: 'Unit 2 · Classical and chromosomal inheritance', summary: 'Test plan: classical genetics 20%, chromosomal inheritance 10%. Skill IV.', lessons: [G3, G4, G5]},
    {title: 'Unit 3 · Molecular genetics and the laboratory', summary: 'Test plan: molecular genetics 15%, experimental design and model organisms 15%. Skills I and II.', lessons: [G6, G7, G8]},
    {title: 'Unit 4 · Crosses, statistics, populations and careers', summary: 'Test plan: population genetics 10%, modern applications and careers 10%. Skills III and V.', lessons: [G9, G10]},
  ],
});
