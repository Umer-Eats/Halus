// In-depth Surgical Technologist course mapped to the HOSA 2026–27 test plan and all six Round Two skills.
import {course} from './build.js';
import {G1, G2, G3, G4, G5} from './st-a.js';
import {G6, G7, G8, G9, G10} from './st-b.js';

export default course('Surgical Technologist', {
  intro: 'Ten in-depth lessons following the HOSA Surgical Technologist 2026–27 test plan (instrumentation 30%, asepsis and sterility 20%, surgical anatomy 20%, profession, environment and hemostasis/wound closure 10% each) and all six Round Two skills: instrument identification, surgical scrub, open gloving, gowning and closed gloving, passing instruments and loading and passing sutures. Built around the AST’s Surgical Technology for the Surgical Technologist and Nemitz’s Surgical Instrumentation, with instrument matching and spelling drills, sterile-field rules, sterilization indicators, suture and needle sorting, labeled anatomy diagrams and step-ordering for every rating sheet. Always follow the scenario and rating sheets you are given.',
  units: [
    {title: 'Unit 1 · The profession and the OR environment', summary: 'Test plan: profession 10%, physical environment and safety 10%.', lessons: [G1, G2]},
    {title: 'Unit 2 · Asepsis, sterilization and sterile attire', summary: 'Test plan: surgical asepsis and sterility 20%. Skills II, III and IV.', lessons: [G3, G4, G5]},
    {title: 'Unit 3 · Instruments and wound closure', summary: 'Test plan: instrumentation 30%, hemostasis and wound closure 10%. Skills I, V and VI.', lessons: [G6, G7, G8]},
    {title: 'Unit 4 · Surgical anatomy and patient care', summary: 'Test plan: surgical anatomy and physiology 20%.', lessons: [G9, G10]},
  ],
});
