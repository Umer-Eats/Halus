import test from 'node:test';
import assert from 'node:assert/strict';
import {loadAllCourses,courseNames,courseLessons} from '../dist/courses.js';
import {conceptMap,CONCEPT_MAP} from '../dist/visual-studio.js';

test('every event gets lesson-specific maps without changing the authored content',async()=>{
 await loadAllCourses({view:false});let count=0;
 for(const name of courseNames())for(const lesson of courseLessons(name)){
  const original=JSON.stringify(lesson);const map=conceptMap(lesson);
  assert.equal(map.nodes.length,lesson.sections.length,name+' '+lesson.title);
  assert.ok(map.nodes.length>0);assert.equal(map.terms,lesson.terms);
  map.nodes.forEach((node,i)=>{assert.equal(node.index,i);assert.equal(node.title,lesson.sections[i].title);assert.ok(node.details.every(p=>typeof p==='string'));});
  assert.equal(JSON.stringify(lesson),original);count++;
 }
 assert.equal(count,650);
});
test('concept labels and definitions are escaped before rendering',()=>{
 const html=CONCEPT_MAP.render({nodes:[{title:'<img onerror=alert(1)>',details:[]}],terms:[['<script>','A & B']],objectives:['<unsafe>']});
 assert.doesNotMatch(html,/<img|<script>|<unsafe>/);assert.match(html,/&lt;img/);assert.match(html,/A &amp; B/);
});
