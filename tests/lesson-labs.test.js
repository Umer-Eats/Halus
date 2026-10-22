import test from 'node:test';
import assert from 'node:assert/strict';
import {macroEnergy,compareRates,SUBJECT_LABS} from '../dist/lesson-labs.js';
import {widgetKinds,renderWidget} from '../dist/lesson-widgets.js';
import {loadAllCourses,courseLessons} from '../dist/courses.js';

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
