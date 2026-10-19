import test from 'node:test';
import assert from 'node:assert/strict';
import {EVENTS,GROUPS,LESSONS} from '../dist/model.js';
test('every secondary event is listed once, under its category',()=>{const names=EVENTS.map(e=>e.name);assert.equal(new Set(names).size,names.length);assert.equal(names.length,Object.values(GROUPS).flat().length);});
test('lesson ids are unique and every answer points at a real option',()=>{assert.equal(new Set(LESSONS.map(l=>l.id)).size,LESSONS.length);for(const l of LESSONS)assert.ok(l.options[l.answer],l.id);});
