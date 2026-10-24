// In-depth Job Seeking Skills course mapped to the HOSA 2026–27 guidelines and rating sheets.
import {course} from './build.js';
import {JS1, JS2, JS3, JS4, JS5} from './js-a.js';
import {JS6, JS7, JS8, JS9, JS10} from './js-b.js';

export default course('Job Seeking Skills', {
  intro: 'Ten in-depth lessons for the HOSA Job Seeking Skills solo event (secondary and postsecondary), following the 2026–27 guidelines and rating sheets: choosing and researching a real health-related opportunity, planning and writing a two-page personal statement, building and designing a one-page resume, uploading one combined PDF (105 points) and the five-minute interview (80 points)—first impressions, the two guaranteed questions, STAR answers, the four answer criteria and a strong closing. Includes bullet-writing, formatting, STAR and body-language drills and practice scenarios.',
  units: [
    {title: 'Unit 1 · The event and the opportunity', summary: 'Event rules, scoring and researching the position and yourself.', lessons: [JS1, JS2]},
    {title: 'Unit 2 · Personal statement and resume', summary: 'Planning and writing the statement and building resume content.', lessons: [JS3, JS4, JS5]},
    {title: 'Unit 3 · Polishing and interview preparation', summary: 'Resume design and accuracy, interview preparation and first impressions.', lessons: [JS6, JS7, JS8]},
    {title: 'Unit 4 · The interview', summary: 'Answering professionally, closing and final preparation.', lessons: [JS9, JS10]},
  ],
});
