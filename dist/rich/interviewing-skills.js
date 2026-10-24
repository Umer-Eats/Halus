// In-depth Interviewing Skills course (event for HOSA members classified under IDEA) mapped to the 2026–27 guidelines.
import {course} from './build.js';
import {IS1, IS2, IS3, IS4, IS5} from './is-a.js';
import {IS6, IS7, IS8, IS9, IS10} from './is-b.js';

export default course('Interviewing Skills', {
  intro: 'Ten step-by-step lessons for the HOSA Interviewing Skills solo event, designed for secondary members classified under IDEA, following the 2026–27 guidelines: eligibility and the IEP Verification and Accommodation Form, choosing a job you are trained for, telling your story with a story organizer, writing and formatting the personal statement, building a one-page resume, uploading one PDF (105 points) and the five-minute interview (80 points)—the two guaranteed questions, first impressions, the answer-example-connect plan, staying calm and ending strong. Written in clear, simple language with checklists, organizers and practice scenarios.',
  units: [
    {title: 'Unit 1 · Getting started', summary: 'Eligibility, accommodations and choosing your job.', lessons: [IS1, IS2]},
    {title: 'Unit 2 · Your story and resume', summary: 'Planning and writing your statement and building a resume.', lessons: [IS3, IS4, IS5]},
    {title: 'Unit 3 · Ready for the interview', summary: 'Checking and uploading, the first two questions and first impressions.', lessons: [IS6, IS7, IS8]},
    {title: 'Unit 4 · The interview', summary: 'Answering new questions, staying calm and ending strong.', lessons: [IS9, IS10]},
  ],
});
