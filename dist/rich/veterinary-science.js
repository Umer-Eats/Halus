// In-depth Veterinary Science course mapped to the HOSA 2026–27 test plan and all seven Round Two skills.
import {course} from './build.js';
import {V1, V2, V3, V4, V5} from './vs-a.js';
import {V6, V7, V8, V9, V10} from './vs-b.js';

export default course('Veterinary Science', {
  intro: 'Ten in-depth lessons following the HOSA Veterinary Science 2026–27 test plan for large and small animals (anatomy and physiology 24%, diseases 14%, emergency care 12%, surgery 12%, nutrients 10%, clinical practice 10%, behavior, zoonoses and ethics 6% each) and all seven Round Two skills: instrument and breed identification, operative site preparation, fecal flotation, lifting and restraining a dog, wrapping a surgical pack and cat-friendly handling. Built around Lawhead and Baker’s Introduction to Veterinary Science, the Red Cross Pet First Aid app and AKC and CFA breed standards, with vital-sign tables, species-term matching, parasite and toxin sorting, breed and instrument drills and step-ordering for every rating sheet. Round Two uses stuffed animals; always follow the scenario you are given.',
  units: [
    {title: 'Unit 1 · The profession and the animal body', summary: 'Test plan: ethics, legal and safety 6%; anatomy and physiology 24%.', lessons: [V1, V2, V3]},
    {title: 'Unit 2 · Nutrition, behavior and disease', summary: 'Test plan: nutrients 10%, behavior 6%, diseases 14%, zoonoses 6%.', lessons: [V4, V5]},
    {title: 'Unit 3 · Clinical practice, lab and emergencies', summary: 'Test plan: clinical practice 10%, emergency care 12%. Skills IV, V and VII.', lessons: [V6, V7, V8]},
    {title: 'Unit 4 · Surgery and identification', summary: 'Test plan: principles of surgery 12%. Skills I, II, III and VI.', lessons: [V9, V10]},
  ],
});
