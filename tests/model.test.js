import test from 'node:test';
import assert from 'node:assert/strict';
import {seed,selectEvent,completeLesson,createAssignment,assignmentsFor,postsFor,addPost,progress} from '../dist/model.js';
test('annual event cannot be silently replaced',()=>{assert.throws(()=>selectEvent(seed(),'Medical Terminology'),/already selected/);assert.equal(selectEvent({...seed(),event:null},'Medical Terminology').event,'Medical Terminology');});
test('completing a lesson twice does not inflate progress',()=>{const s=completeLesson(seed(),'guidelines');assert.deepEqual(completeLesson(s,'guidelines').completed,['guidelines']);assert.equal(progress(s),33);});
test('assignment appears only in the matching school and event',()=>{const s=createAssignment(seed(),{title:'Practice',event:'Medical Terminology',due:'2026-11-01',type:'Lesson'});assert.equal(assignmentsFor(s).length,2);assert.equal(assignmentsFor(s,'teacher').length,3);assert.equal(assignmentsFor({...s,school:'northview'},'teacher').length,0);});
test('school feed excludes other chapter content',()=>{const s=addPost({...seed(),school:'northview'},'Hello');assert.equal(postsFor(s).length,1);assert.equal(postsFor({...s,school:'westbridge'}).length,2);});
test('blank content rejected',()=>{assert.throws(()=>addPost(seed(),'  '));assert.throws(()=>createAssignment(seed(),{title:' ',event:'Nursing Assisting',due:'2026-11-01'}));});
