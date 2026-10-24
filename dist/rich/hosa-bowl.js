// In-depth HOSA Bowl course mapped to the HOSA 2026–27 test plan and buzzer rules.
import {course} from './build.js';
import {HB1, HB2, HB3, HB4, HB5} from './hb-a.js';
import {HB6, HB7, HB8, HB9, HB10} from './hb-b.js';

export default course('HOSA Bowl', {
  intro: 'Ten in-depth lessons for the four-member HOSA Bowl team event, following the 2026–27 test plan (HOSA-related knowledge, parliamentary procedure, anatomy and physiology, medical terminology and current health topics at 12% each, plus 40% across history of medicine, healthcare systems, health careers, legal and ethical practices, nutrition, safety, infection control and math conversions) and the buzzer-round rules. Includes buzzer-format drills, motion and voting tables, body-system facts, word-part builders, history timelines, conversion practice and match-day strategy.',
  units: [
    {title: 'Unit 1 · The event and HOSA', summary: 'Rules, buzzer strategy and HOSA-related knowledge (12%).', lessons: [HB1, HB2]},
    {title: 'Unit 2 · Core 12% categories', summary: 'Parliamentary procedure, anatomy and physiology and medical terminology.', lessons: [HB3, HB4, HB5]},
    {title: 'Unit 3 · Current topics and history', summary: 'Current health topics (12%) and history of medicine.', lessons: [HB6, HB7]},
    {title: 'Unit 4 · The 40% mixed category and match day', summary: 'Systems, careers, ethics, nutrition, safety, infection control, conversions and strategy.', lessons: [HB8, HB9, HB10]},
  ],
});
