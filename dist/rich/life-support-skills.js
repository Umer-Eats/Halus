// In-depth Life Support Skills course mapped to every HOSA 2026–27 skill, written in plain step-by-step language.
import {course} from './build.js';
import {LS1, LS2, LS3, LS4, LS5} from './lss-a.js';
import {LS6, LS7, LS8, LS9, LS10} from './lss-b.js';

export default course('Life Support Skills', {
  intro: 'Ten step-by-step lessons for the solo HOSA Life Support Skills event, written in clear, plain language. You will be judged on one CPR skill (adult CPR, adult CPR with an AED or infant CPR) and one first aid skill (EpiPen, severe bleeding, choking, open fracture and splint, heat emergency, severe burn or naloxone). Each lesson follows the 2026–27 rating sheet in order, with practice tips, step-ordering drills, sorting games and short scenarios. Built around the American Heart Association and American Red Cross guidelines. Tell the judge which one you follow before you start.',
  units: [
    {title: 'Unit 1 · Getting ready and adult CPR', summary: 'Shared steps for every skill, Skill I (adult CPR) and Skill II (adult CPR with AED).', lessons: [LS1, LS2, LS3]},
    {title: 'Unit 2 · Infant CPR and choking', summary: 'Skill III (infant CPR) and Skill VI (choking).', lessons: [LS4, LS5]},
    {title: 'Unit 3 · Injuries', summary: 'Skill V (severe bleeding and shock), Skill VII (open fracture and splint) and Skill IX (severe burn).', lessons: [LS6, LS7, LS8]},
    {title: 'Unit 4 · Heat, allergies and overdose', summary: 'Skill VIII (heat emergency), Skill IV (EpiPen) and Skill X (naloxone).', lessons: [LS9, LS10]},
  ],
});
