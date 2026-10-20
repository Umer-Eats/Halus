// Local browser QA with an isolated in-memory session, never production accounts.
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import assert from 'node:assert/strict';
const {chromium}=await import(pathToFileURL(process.env.PLAYWRIGHT_ENTRY).href);
const sessionSource=`
const profile={uid:'qa-student',role:'student',event:null,displayName:'Maya Patel',community:{name:'Valus Test Chapter'}};
export const session={ready:true,enrolled:true,user:{uid:'qa-student',email:'qa@example.com'},profile};
const listeners=[];
export const onSession=fn=>listeners.push(fn);
export const setProfile=p=>{session.profile=p;listeners.forEach(fn=>fn());};
export const startSession=()=>{};
export async function api(method,url,body){
 if(url==='/me/event'){if(window.failSave)throw Error('Could not save. Try again.');profile.event=body.event;return {profile:{...profile}};}
 if(url==='/me')return {profile:session.profile};
 if(url==='/rankings')return {students:profile.event?[{displayName:'Maya Patel',event:profile.event,isYou:true}]:[]};
 if(url==='/students')return {students:[{uid:'qa-student',displayName:'Maya Patel',email:'qa@example.com',event:profile.event,progress:0,lastQuizScore:null}]};
 if(url==='/assignments')return {assignments:[]};
 if(url==='/posts')return {posts:[]};
 return {completed:[],progress:0,quizHistory:[]};
}
export const googleSignIn=()=>{},emailSignIn=()=>{},resetPassword=()=>{},createAccount=()=>{},enroll=()=>{},signOut=()=>{};
window.becomeTeacher=()=>{setProfile({...session.profile,role:'instructor'});};
`;
const root=path.resolve('dist');
const server=http.createServer(async(req,res)=>{
  const pathname=new URL(req.url,'http://localhost').pathname;
  if(pathname==='/session.js'){res.setHeader('Content-Type','text/javascript');res.end(sessionSource);return;}
  const target=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));
  if(!target.startsWith(root+path.sep)){res.writeHead(403).end();return;}
  try{const data=await fs.readFile(target);res.setHeader('Content-Type',({'.js':'text/javascript','.css':'text/css','.html':'text/html','.svg':'image/svg+xml','.ttf':'font/ttf'})[path.extname(target)]||'application/octet-stream');res.end(data);}
  catch{res.writeHead(404).end();}
});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
let browser;
try{
 browser=await chromium.launch({headless:true,channel:'msedge'});
 const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(`http://127.0.0.1:${server.address().port}/#/my-event`);
 await page.locator('.focus-card').first().waitFor();
 assert.equal(await page.locator('.focus-card').count(),64);
 await page.locator('[data-event-pick="CPR/First Aid"]').check();
 await page.waitForFunction(()=>document.querySelector('.focus-card input')?.dataset.eventPick==='CPR/First Aid');
 await page.screenshot({path:'outputs/my-events-desktop.png',fullPage:false});
 await page.locator('.focus-card').first().locator('.event-card-link').click();
 await page.locator('.event-tools').waitFor();
 assert.equal(await page.locator('.sidebar').count(),0);
 assert.equal(await page.locator('.event-tools a').count(),5);
 await page.getByRole('link',{name:/Practice Tests/}).click();
 await page.getByRole('heading',{name:'Practice Tests',exact:true}).waitFor();
 await page.screenshot({path:'outputs/event-tools-desktop.png',fullPage:true});
 await page.reload();
 await page.getByRole('heading',{name:'Practice Tests',exact:true}).waitFor();
 await page.locator('html').evaluate(el=>el.dataset.theme='dark');
 await page.screenshot({path:'outputs/event-tools-dark.png',fullPage:true});
 await page.setViewportSize({width:390,height:844});
 await page.screenshot({path:'outputs/event-tools-mobile.png',fullPage:true});
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'mobile layout fits');
 await page.getByRole('link',{name:'All my events'}).click();
 await page.locator('#event-search').fill('Healthy Living');
 assert.equal(await page.locator('.focus-card').count(),1);
 await page.locator('[data-event-pick="Healthy Living"]').check();
 await page.waitForFunction(()=>document.querySelector('.selected-label')?.textContent==='My event');
 await page.evaluate(()=>window.failSave=true);
 await page.locator('[data-event-pick="Healthy Living"]').click();
 await page.waitForFunction(()=>document.querySelector('#toast').textContent.includes('Could not save'));
 assert.ok(await page.locator('[data-event-pick="Healthy Living"]').isChecked(),'failed save restores selection');
 await page.evaluate(()=>window.failSave=false);
 await page.locator('#event-search').fill('');
 await page.locator('#event-type').selectOption('Online submission');
 assert.equal(await page.locator('[data-event-pick="Healthy Living"]').count(),0);
 await page.locator('#event-type').selectOption('All');
 await page.screenshot({path:'outputs/my-events-mobile.png',fullPage:false});
 await page.evaluate(()=>location.hash='/rankings');
 await page.getByRole('heading',{name:'Students & events'}).waitFor();
 assert.match(await page.locator('.rank-directory').innerText(),/Healthy Living/);
 await page.evaluate(()=>{window.becomeTeacher();location.hash='/students';});
 await page.getByRole('link',{name:'Healthy Living ↗'}).waitFor();
 await page.setViewportSize({width:1440,height:1000});
 await page.getByRole('link',{name:'Healthy Living ↗'}).click();
 await page.locator('.event-tools').waitFor();
 assert.match(await page.locator('.event-focus-intro').innerText(),/Teacher preview/);
 assert.equal(await page.getByRole('link',{name:/Online Upload Grader/}).count(),0);
 assert.deepEqual(errors,[]);
 console.log('Browser QA passed: 64 cards, selection, failure recovery, filtering, tool navigation, reload, teacher access, rankings, desktop/mobile, dark mode.');
}finally{await browser?.close();await new Promise(r=>server.close(r));}
