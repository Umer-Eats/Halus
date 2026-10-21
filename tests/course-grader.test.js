import test from 'node:test';
import assert from 'node:assert/strict';
import {gradeCourseFRQ} from '../server/course-grader.js';
const lesson={title:'Simulation',sections:[{title:'Reasoning',paragraphs:['An educational example.']}],frq:{prompt:'Explain the calculation',rubric:[{label:'Units'},{label:'Reasoning'},{label:'Result'}],modelAnswer:'Use units and show the calculation.'}};
const response='This response shows the calculation and explains the units and reasoning behind the result.';
const provider=(scores,extra={})=>async()=>new Response(JSON.stringify({candidates:[{finishReason:'STOP',content:{parts:[{text:JSON.stringify({criteria:scores.map(score=>({score,feedback:'Specific feedback.'})),feedback:'Review your reasoning.',safetyConcern:false,...extra})}]}}]}));
test('Gemini grades each rubric criterion and server computes pass threshold',async()=>{
 let request;
 const fetcher=async(url,init)=>{request={url,init};return provider([2,2,1])();};
 const grade=await gradeCourseFRQ(lesson,response,{apiKey:'private-key',model:'gemini-test',fetcher});
 assert.equal(grade.score,83);assert.equal(grade.passed,true);
 assert.equal(request.init.headers['x-goog-api-key'],'private-key');assert.ok(!request.url.includes('private-key'));
 const body=JSON.parse(request.init.body),payload=JSON.parse(body.contents[0].parts[0].text);
 assert.equal(payload.studentResponse,response);assert.deepEqual(payload.rubric,['Units','Reasoning','Result']);
 assert.match(body.systemInstruction.parts[0].text,/untrusted DATA/);
 assert.equal((await gradeCourseFRQ(lesson,response,{apiKey:'k',model:'gemini-test',fetcher:provider([2,1,1])})).passed,false);
 assert.equal((await gradeCourseFRQ(lesson,response,{apiKey:'k',model:'gemini-test',fetcher:provider([2,2,2],{safetyConcern:true})})).passed,false);
});
test('missing key, provider error and malformed rubric do not pass students',async()=>{
 await assert.rejects(gradeCourseFRQ(lesson,response,{}),/not connected/);
 for(const fetcher of [provider([2]),provider([3,2,2]),async()=>new Response('{}',{status:429}),async()=>new Response(JSON.stringify({candidates:[{finishReason:'MAX_TOKENS'}]}))]){
  await assert.rejects(gradeCourseFRQ(lesson,response,{apiKey:'k',model:'gemini-test',fetcher}),/could not grade/);
 }
});
