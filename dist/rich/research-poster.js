// In-depth Research Poster course mapped to the HOSA 2026–27 guidelines and rating sheets.
import {course} from './build.js';
import {RP1, RP2, RP3, RP4, RP5} from './rp-a.js';
import {RP6, RP7, RP8, RP9, RP10} from './rp-b.js';

export default course('Research Poster', {
  intro: 'Ten in-depth lessons for the HOSA Research Poster team event (2–4 secondary or postsecondary members, new to the Teamwork category in 2026–27), following the guidelines and rating sheets: choosing a local, health-related research question, background research, research design and methods, ethics and informed consent, analyzing quantitative and qualitative data, writing each poster section, designing a 48″ × 36″ landscape poster, uploading, printing and the required display time, and the five-minute Round Two presentation. Includes FINER, sampling, bias, statistics and design drills and practice scenarios.',
  units: [
    {title: 'Unit 1 · The event and the question', summary: 'Event structure, scoring and choosing a research question.', lessons: [RP1, RP2]},
    {title: 'Unit 2 · Planning the research', summary: 'Background research, methods and research ethics.', lessons: [RP3, RP4, RP5]},
    {title: 'Unit 3 · Analysis and the poster', summary: 'Analyzing data, writing sections and poster design.', lessons: [RP6, RP7, RP8]},
    {title: 'Unit 4 · Display and presentation', summary: 'Upload, printing, display time and Round Two.', lessons: [RP9, RP10]},
  ],
});
