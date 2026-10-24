// In-depth Medical Innovation course mapped to the HOSA 2026–27 guidelines and rating sheets.
import {course} from './build.js';
import {MI1, MI2, MI3, MI4, MI5} from './mi-a.js';
import {MI6, MI7, MI8, MI9, MI10} from './mi-b.js';

export default course('Medical Innovation', {
  intro: 'Ten in-depth lessons for the HOSA Medical Innovation team event (2–4 secondary or postsecondary members), following the 2026–27 guidelines: finding a real health care need, checking originality against prior art and patents, designing and prototyping an original innovation, explaining its impact on health care delivery, quality of life and costs, describing training, careers and regulation, building the 13-slide Round One outline (110 points) and a compliant stand-alone exhibit, and delivering the five-minute Round Two presentation and demonstration (130 points). Includes design-thinking, decision-matrix, cost and break-even drills and practice scenarios.',
  units: [
    {title: 'Unit 1 · The event and the need', summary: 'Event structure, scoring and finding a need worth solving.', lessons: [MI1, MI2]},
    {title: 'Unit 2 · Inventing the innovation', summary: 'Originality and patents, design, prototyping and testing.', lessons: [MI3, MI4, MI5]},
    {title: 'Unit 3 · Making the case', summary: 'Impact on delivery and quality of life, costs and implementation.', lessons: [MI6, MI7, MI8]},
    {title: 'Unit 4 · Outline, exhibit and presentation', summary: 'The 13-slide outline, the exhibit and the Round Two presentation.', lessons: [MI9, MI10]},
  ],
});
