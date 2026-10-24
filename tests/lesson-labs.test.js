import test from 'node:test';
import assert from 'node:assert/strict';
import {macroEnergy,compareRates,SUBJECT_LABS} from '../dist/lesson-labs.js';
import {widgetKinds,renderWidget} from '../dist/lesson-widgets.js';
import {loadAllCourses,courseLessons} from '../dist/courses.js';
import {addSubjectVisuals} from '../dist/rich/subject-visuals.js';

test('food energy accounts for grams, energy density and serving count',()=>{
 assert.deepEqual(macroEnergy(30,10,10),{parts:[120,40,90],total:250});
 assert.equal(macroEnergy(30,10,10,2).total,500);
 assert.deepEqual(macroEnergy(0,0,0),{parts:[0,0,0],total:0});
 assert.equal(macroEnergy(0,0,10,0.5).total,45);
});
test('quality rates compare denominators and distinguish absolute from relative change',()=>{
 const r=compareRates(20,100,15,150);
 assert.deepEqual(r,{before:20,after:10,absolute:10,relative:50});
 assert.equal(compareRates(0,100,2,100).relative,null);
 assert.ok(compareRates(5,100,10,100).relative<0);
});
test('subject laboratories register and render controls with reset options',()=>{
 for(const kind of Object.keys(SUBJECT_LABS)){
  assert.ok(widgetKinds().includes(kind));
  const html=renderWidget({kind,title:'Teaching model'});
  assert.match(html,/data-lab-reset/);assert.match(html,/aria-live="polite"/);assert.doesNotMatch(html,/undefined|NaN/);
 }
});
test('the original five rich courses also receive new relevant models',async()=>{
 await loadAllCourses({view:false});
 for(const name of ['Pharmacology','Pathophysiology','Behavioral Health','Biomedical Equipment Technician','Dental Terminology']){
  const widgets=courseLessons(name).flatMap(l=>l.sections.flatMap(s=>s.blocks)).filter(b=>b.t==='w');
  assert.ok(widgets.some(w=>w.kind in SUBJECT_LABS),name);
 }
});

test('the five expanded courses retain complete lessons and do not duplicate supplemental visuals',async()=>{
 await loadAllCourses({view:false});
 for(const name of ['Nutrition','Medical Terminology','Health Informatics','Healthcare Administration','Human Growth & Development']){
  const lessons=courseLessons(name);
  assert.equal(lessons.length,10,name);
  for(const lesson of lessons){
   assert.equal(lesson.rich,true,name+' '+lesson.title);
   assert.equal(lesson.mcqs.length,8,lesson.title);
   assert.ok(lesson.sections.flatMap(s=>s.blocks).filter(b=>b.t==='w').length>=2,lesson.title);
  }
  const before=JSON.stringify(lessons);
  addSubjectVisuals(name,lessons);
  assert.equal(JSON.stringify(lessons),before,name+' visuals must be idempotent');
 }
});

test('science labs calculate dimensional analysis, rates and spelling differences', async () => {
 const {calculateMath, compareGroups, spellingDiff, SCIENCE_LABS} = await import('../dist/lesson-science-labs.js');
 assert.equal(calculateMath('concentration', 50, 5, 100).answer, 2.5);
 assert.equal(calculateMath('flow', 240, 4).answer, 60);
 assert.equal(calculateMath('conversion', 0.5).answer, 500);
 assert.equal(calculateMath('drip', 500, 240, 15).answer, 31.25);
 assert.equal(calculateMath('dilution', 50, 10, 200).answer, 40);
 assert.ok(Number.isNaN(calculateMath('dilution', 10, 15, 200).answer), 'dilution cannot raise concentration');
 assert.deepEqual(compareGroups(40, 200, 30, 300), {a: 20, b: 10, gap: 10, ratio: 2});
 assert.equal(compareGroups(1, 100, 0, 100).ratio, null);
 assert.deepEqual(spellingDiff('ilium', 'ileum').map(x => x.correct), [true, true, false, true, true]);
 for (const kind of Object.keys(SCIENCE_LABS)) {
  assert.ok(widgetKinds().includes(kind), kind);
  const html = renderWidget({kind, title: 'Teaching model'});
  assert.match(html, /data-lab-reset/); assert.match(html, /aria-live="polite"/); assert.doesNotMatch(html, /="undefined"|>undefined<|NaN/);
 }
});

test('the five Health Science courses completed after Codex keep the same lesson standard', async () => {
 await loadAllCourses({view: false});
 for (const name of ['Medical Law & Ethics', 'Medical Math', 'Medical Reading', 'Medical Spelling', 'World Health & Disparities']) {
  const lessons = courseLessons(name);
  assert.equal(lessons.length, 10, name);
  for (const lesson of lessons) {
   assert.equal(lesson.rich, true, name + ' ' + lesson.title);
   assert.equal(lesson.mcqs.length, 8, lesson.title);
   assert.ok(lesson.frq.rubric.length >= 3, lesson.title);
   assert.ok(lesson.sections.flatMap(s => s.blocks).filter(b => b.t === 'w').length >= 2, lesson.title);
  }
 }
 // Medical Reading must never present invented passages as book content.
 for (const lesson of courseLessons('Medical Reading')) {
  const first = lesson.sections[0].blocks;
  assert.ok(first.some(b => b.t === 'callout' && /fictional, not an excerpt/.test(b.text)), lesson.title + ' labels its practice passage');
 }
});

test('skill labs calculate crosses, chi-square, typing, efficiency, gels, vitals, I&O, codons and Hardy-Weinberg', async () => {
 const L = await import('../dist/lesson-skill-labs.js');
 const mono = L.punnettCross('Pp', 'Pp', 'mono');
 assert.equal(mono.total, 4);
 assert.equal(mono.geno.PP, 1); assert.equal(mono.geno.Pp, 2); assert.equal(mono.geno.pp, 1);
 const di = L.punnettCross('YyRr', 'YyRr', 'dihybrid');
 assert.equal(di.total, 16);
 assert.deepEqual(Object.values(di.pheno).sort((a, b) => b - a), [9, 3, 3, 1]);
 const chi = L.chiSquare([290, 110], [3, 1]);
 assert.deepEqual(chi.expected, [300, 100]);
 assert.ok(Math.abs(chi.chi - 1.333) < 0.01);
 assert.equal(chi.df, 1); assert.equal(chi.critical, 3.84); assert.equal(chi.reject, false);
 assert.equal(L.aboType(true, true, true), 'AB+');
 assert.equal(L.aboType(false, false, false), 'O−');
 assert.equal(L.aboType(true, false, true), 'A+');
 const eff = L.transformationEfficiency(100, 0.8, 100, 250);
 assert.ok(Math.abs(eff.spreadDna - 0.32) < 1e-9);
 assert.ok(Math.abs(eff.efficiency - 312.5) < 1e-6);
 assert.ok(L.bandPosition(500) > L.bandPosition(5000), 'smaller fragments travel farther from the wells');
 assert.equal(L.vitalInRange('pulse', 112), false);
 assert.equal(L.vitalInRange('resp', 16), true);
 assert.equal(L.intakeMl(8, 'oz', 1), 240);
 assert.equal(L.intakeMl(4, 'oz', 0.5), 60);
 assert.equal(L.roundUp25(340), 350);
 assert.equal(L.roundUp25(350), 350);
 assert.equal(L.transcribe('TACGGATTCACT'), 'AUGCCUAAGUGA');
 assert.deepEqual(L.translate('AUGCCUAAGUGA'), ['Met', 'Pro', 'Lys', 'Stop']);
 assert.equal(L.mutationType('TACGGATTCACT', 'TACGGGTTCACT'), 'silent');
 assert.equal(L.mutationType('TACAAACCGATT', 'TACATACCGATT'), 'missense');
 assert.equal(L.mutationType('TACCTTGGAACT', 'TACATTGGAACT'), 'nonsense');
 assert.equal(L.mutationType('TACGCATGGATC', 'TACGCTGGATC'), 'frameshift-deletion');
 assert.equal(L.mutationType('TACTTCGGCATT', 'TACTTCAGGCATT'), 'frameshift-insertion');
 const hw = L.hardyWeinberg(0.09);
 assert.ok(Math.abs(hw.q - 0.3) < 1e-9 && Math.abs(hw.p - 0.7) < 1e-9 && Math.abs(hw.twopq - 0.42) < 1e-9);
 assert.ok(Math.abs(hw.p2 + hw.twopq + hw.q2 - 1) < 1e-9);
 for (const kind of ['punnett', 'chisquare', 'gel', 'abotype', 'transformation', 'vitalsreport', 'iolab', 'codonlab', 'hwlab']) assert.ok(widgetKinds().includes(kind), kind);
});

test('the ten Health Professions courses added after Codex keep the same lesson standard', async () => {
 await loadAllCourses({view: false});
 const names = ['Biotechnology', 'Clinical Lab Science (Medical Lab Scientist)', 'Clinical Nursing', 'Clinical Specialty', 'Dental Science', 'Family Medicine Physician', 'Home Health Aide', 'Genetics', 'Medical Assisting', 'Nursing Assisting'];
 for (const name of names) {
  const lessons = courseLessons(name);
  assert.equal(lessons.length, 10, name);
  for (const lesson of lessons) {
   assert.equal(lesson.rich, true, name + ' ' + lesson.title);
   assert.equal(lesson.mcqs.length, 8, lesson.title);
   assert.ok(lesson.sections.length >= 5, lesson.title);
   assert.ok(lesson.frq.rubric.length >= 3 && lesson.frq.modelAnswer.length > 200, lesson.title);
   assert.ok(lesson.sources.filter(s => /^https:\/\//.test(s.url || s[1] || '')).length >= 2, lesson.title);
   assert.ok(lesson.sections.flatMap(s => s.blocks).filter(b => b.t === 'w').length >= 3, lesson.title);
   assert.equal(lesson.terms.length, 3, lesson.title);
   assert.equal(lesson.takeaways.length, 3, lesson.title);
  }
 }
});

test('the third ten courses (Health Professions, Emergency Preparedness and Leadership) keep the same lesson standard', async () => {
 await loadAllCourses({view: false});
 const names = ['Veterinary Science', 'CERT Skills', 'CPR/First Aid', 'Emergency Medical Technician', 'Epidemiology', 'Life Support Skills', 'Mental Health Promotion', 'MRC Partnership', 'Public Health', 'Extemporaneous Writing - Health Policy'];
 for (const name of names) {
  const lessons = courseLessons(name);
  assert.equal(lessons.length, 10, name);
  for (const lesson of lessons) {
   assert.equal(lesson.rich, true, name + ' ' + lesson.title);
   assert.equal(lesson.mcqs.length, 8, lesson.title);
   assert.ok(lesson.sections.length >= 5 && lesson.sections.length <= 7, lesson.title);
   assert.ok(lesson.frq.rubric.length >= 3 && lesson.frq.modelAnswer.length > 200, lesson.title);
   assert.ok(lesson.sources.filter(s => /^https:\/\//.test(s.url || s[1] || '')).length >= 2, lesson.title);
   assert.ok(lesson.sections.flatMap(s => s.blocks).filter(b => b.t === 'w').length >= 3, lesson.title);
   assert.equal(lesson.terms.length, 3, lesson.title);
   assert.equal(lesson.takeaways.length, 3, lesson.title);
  }
 }
});

test('the next ten Health Professions courses keep the same lesson standard', async () => {
 await loadAllCourses({view: false});
 const names = ['Occupational Therapy', 'Patient Care Technician', 'Personal Care', 'Pharmacy Science', 'Phlebotomy', 'Physical Therapy', 'Physician Assistant - Medical Case Challenge', 'Respiratory Therapy', 'Sports Medicine', 'Surgical Technologist'];
 for (const name of names) {
  const lessons = courseLessons(name);
  assert.equal(lessons.length, 10, name);
  for (const lesson of lessons) {
   assert.equal(lesson.rich, true, name + ' ' + lesson.title);
   assert.equal(lesson.mcqs.length, 8, lesson.title);
   assert.ok(lesson.sections.length >= 5, lesson.title);
   assert.ok(lesson.frq.rubric.length >= 3 && lesson.frq.modelAnswer.length > 200, lesson.title);
   assert.ok(lesson.sources.filter(s => /^https:\/\//.test(s.url || s[1] || '')).length >= 2, lesson.title);
   assert.ok(lesson.sections.flatMap(s => s.blocks).filter(b => b.t === 'w').length >= 3, lesson.title);
   assert.equal(lesson.terms.length, 3, lesson.title);
   assert.equal(lesson.takeaways.length, 3, lesson.title);
  }
 }
});
