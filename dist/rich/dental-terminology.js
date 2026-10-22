// In-depth Dental Terminology course mapped to the HOSA test plan.
import {course} from './build.js';
import {D1, D2, D3, D4, D5} from './dt-a.js';
import {D6, D7, D8, D9, D10, D11} from './dt-b.js';

D3.sections[1][1].push({t:'w',kind:'termlab',title:'Decode terms in the dental record',words:[{word:'gingivitis',parts:['','gingiv','-itis'],meanings:['no prefix','gingiva / gums','inflammation'],meaning:'Inflammation of the gingiva. The word does not by itself establish periodontal attachment loss.'},{word:'periodontitis',parts:['peri-','odont','-itis'],meanings:['around','tooth','inflammation'],meaning:'Inflammatory disease affecting supporting tissues around teeth. Its accepted clinical meaning includes attachment loss; literal word-part translation is not enough.'},{word:'glossitis',parts:['','gloss','-itis'],meanings:['no prefix','tongue','inflammation'],meaning:'Inflammation of the tongue. The term describes a finding rather than specifying a single cause.'}]});

export default course('Dental Terminology', {
  intro: 'Eleven in-depth lessons following the HOSA Dental Terminology test plan, with labeled skull, tooth, cavity and radiograph models, an interactive tooth chart, a nerve-block simulator, emergency cases and spelling drills for the tiebreaker.',
  units: [
    {title: 'Unit 1 · Head, neck and tooth anatomy', summary: 'Skull, muscles of mastication, the oral cavity, tooth tissues, surfaces and numbering systems.', lessons: [D1, D2]},
    {title: 'Unit 2 · Comprehensive care and specialties', summary: 'Test plan: 30%, the largest domain. General dentistry, examination and every recognized specialty.', lessons: [D3, D4, D5]},
    {title: 'Unit 3 · Instruments and restorations', summary: 'Instrument families, tray order, cavity preparation and direct and indirect restorations.', lessons: [D6, D7]},
    {title: 'Unit 4 · Laboratory and radiography', summary: 'Impression materials, gypsum, waxes and lab procedures; X-ray production, interpretation, technique errors and safety.', lessons: [D8, D9]},
    {title: 'Unit 5 · Pharmacology, pain management and emergencies', summary: 'Local anesthetics, injections, sedation and dental drugs; medical and dental emergencies.', lessons: [D10, D11]},
  ],
});
