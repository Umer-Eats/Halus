// In-depth Health Career Display course mapped to the HOSA 2026–27 guidelines and rating sheets.
import {course} from './build.js';
import {HC1, HC2, HC3, HC4, HC5} from './hcd-a.js';
import {HC6, HC7, HC8, HC9, HC10} from './hcd-b.js';

export default course('Health Career Display', {
  intro: 'Ten in-depth lessons for the two-person HOSA Health Career Display event, following the 2026–27 guidelines: choosing and researching one health career, describing its responsibilities, education, entry-level salary at local, national and global levels, benefits and challenges, designing a compliant 36″ × 48″ tri-fold display, building the 16-slide Round One digital outline (110 points), the Required Project Display Time and the five-minute Round Two presentation (115 points). Includes career-sorting, design and compliance drills, timing plans and practice scenarios.',
  units: [
    {title: 'Unit 1 · The event and the career', summary: 'Event structure, health career eligibility and research methods.', lessons: [HC1, HC2]},
    {title: 'Unit 2 · Career content', summary: 'Responsibilities, education and credentials, salary, outlook, benefits and challenges.', lessons: [HC3, HC4, HC5]},
    {title: 'Unit 3 · The display and outline', summary: 'Design principles, display rules and safety, and the Round One digital outline.', lessons: [HC6, HC7, HC8]},
    {title: 'Unit 4 · Presenting the career', summary: 'Display time, presentation content, delivery and teamwork.', lessons: [HC9, HC10]},
  ],
});
