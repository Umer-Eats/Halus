// Isolated local browser QA: synthetic account, no production credentials or grading requests.
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import assert from 'node:assert/strict';
const {chromium}=await import(pathToFileURL(process.env.PLAYWRIGHT_ENTRY).href);
const root=path.resolve('dist');
const sessionSource=`
const profile={uid:'rich-qa',role:'student',event:'Nutrition',displayName:'Practice Student',community:{name:'Local QA'}};
export const session={ready:true,enrolled:true,user:{uid:'rich-qa'},profile};const listeners=[];
export const onSession=fn=>listeners.push(fn);export const setProfile=p=>{session.profile=p;listeners.forEach(fn=>fn());};export const startSession=()=>{};
export async function api(method,url,body){if(url==='/me')return {profile:session.profile};if(url==='/assignments')return {assignments:[]};if(url==='/posts')return {posts:[]};if(url==='/rankings'||url==='/students')return {students:[]};return {completed:[],accuracy:{},progress:0,quizHistory:[]};}
export const googleSignIn=()=>{},emailSignIn=()=>{},resetPassword=()=>{},createAccount=()=>{},enroll=()=>{},signOut=()=>{};
`;
const harness=`<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1">${['styles','biology','courses','lessons','lesson-labs'].map(s=>'<link rel="stylesheet" href="/'+s+'.css">').join('')}</head><body class="in-workspace"><main style="max-width:900px;margin:auto;padding:24px" id="main"></main><script type="module">
import {renderWidget,mountWidgets} from '/lesson-widgets.js';
const widgets=['nutritionlab','informaticsflow','qualitylab','lifespan','termlab'].map(kind=>({kind,title:kind}));
widgets.push({kind:'stepper',title:'Follow an improvement cycle',diagram:'quality-cycle',steps:[['Plan','Define a prediction and measures.',['plan']],['Do','Try a small change.',['do']],['Study','Compare with the prediction.',['study']],['Act','Adapt the next cycle.',['act']]]},{kind:'label',title:'Decode the model',diagram:'word-map',parts:[['prefix','Prefix','Modifies the meaning.'],['root','Root','Identifies the core concept.'],['suffix','Suffix','Describes the process or condition.'],['combining','Combining vowels','Connect parts according to spelling rules.'],['meaning','Meaning','Confirm the accepted complete definition.']]},{kind:'sort',title:'Sort practice',buckets:['Structure','Meaning'],items:[['Fields',0],['Units',1]]},{kind:'match',title:'Match practice',pairs:[['Root','Core meaning'],['Suffix','Ending']]},{kind:'order',title:'Sequence practice',steps:['First','Second','Third']});
document.querySelector('main').innerHTML=widgets.map(renderWidget).join('');mountWidgets(document.querySelector('main'));
</script></body></html>`;
const server=http.createServer(async(req,res)=>{const url=new URL(req.url,'http://localhost');if(url.pathname==='/session.js'){res.setHeader('Content-Type','text/javascript');return res.end(sessionSource);}if(url.pathname==='/qa-labs'){res.setHeader('Content-Type','text/html');return res.end(harness);}const file=path.resolve(root,'.'+(url.pathname==='/'?'/index.html':decodeURIComponent(url.pathname)));if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}try{const body=await fs.readFile(file);res.setHeader('Content-Type',({'.js':'text/javascript','.css':'text/css','.html':'text/html','.svg':'image/svg+xml','.ttf':'font/ttf','.png':'image/png','.pdf':'application/pdf'})[path.extname(file)]||'application/octet-stream');res.end(body);}catch{res.writeHead(404).end();}});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
let browser;
try{
 browser=await chromium.launch({channel:'msedge',headless:true});
 const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];
 page.on('pageerror',err=>errors.push(err.message));
 const base=`http://127.0.0.1:${server.address().port}`;
 await page.goto(base+'/qa-labs');await page.locator('.lwk-nutritionlab [data-reveal]').waitFor();
 const nutrition=page.locator('.lwk-nutritionlab');await nutrition.locator('[data-estimate]').fill('250');await nutrition.locator('[data-reveal]').click();await assert.equal(await nutrition.locator('.lw-msg').getAttribute('data-state'),'good');
 await nutrition.locator('[data-input="servings"]').fill('2');assert.equal(await nutrition.locator('.lab-answer').isHidden(),true);await nutrition.locator('[data-estimate]').fill('500');await nutrition.locator('[data-reveal]').click();assert.match(await nutrition.locator('[data-formula]').textContent(),/500 kcal/);
 await nutrition.locator('[data-lab-reset]').click();assert.equal(await nutrition.locator('[data-input="servings"]').inputValue(),'1');
 const flow=page.locator('.lwk-informaticsflow');await flow.locator('[data-fault]').selectOption('2');for(let i=0;i<3;i++)await flow.locator('[data-flow-next]').click();assert.equal(await flow.locator('[data-flow-next]').isDisabled(),true);assert.match(await flow.locator('.lab-step-summary').textContent(),/Stop and resolve/);await flow.locator('[data-lab-reset]').click();for(let i=0;i<5;i++)await flow.locator('[data-flow-next]').click();assert.match(await flow.locator('.lab-step-summary').textContent(),/acknowledged/);
 const quality=page.locator('.lwk-qualitylab');await quality.locator('[data-infer="observe"]').click();assert.equal(await quality.locator('.lw-msg').getAttribute('data-state'),'good');assert.match(await quality.locator('[data-rate-stats]').textContent(),/50%/);
 const life=page.locator('.lwk-lifespan');await life.locator('[data-stage="6"]').click();assert.match(await life.locator('.life-detail').textContent(),/Later adulthood/);await life.locator('[data-compare]').click();assert.match(await life.locator('.life-comparison').textContent(),/Middle adulthood/);
 const steps=page.locator('.lwk-stepper');await steps.locator('[data-play]').click();await page.waitForFunction(()=>document.querySelector('.lwk-stepper [data-go="1"]')?.classList.contains('on'));await steps.locator('[data-play]').click();assert.equal(await steps.locator('[data-play]').getAttribute('aria-pressed'),'false');await steps.locator('[data-next]').click();assert.equal(await steps.locator('[data-go="2"]').getAttribute('class'),'on');
 const term=page.locator('.lwk-termlab');await term.locator('[data-piece="2"]').click();assert.equal(await term.locator('[data-piece="2"]').getAttribute('aria-pressed'),'true');await term.locator('[data-word]').selectOption('2');await term.locator('[data-interpret]').click();assert.match(await term.locator('.term-interpretation').textContent(),/stomach/);
 // Pointer tap selection and keyboard destination are equally usable.
 const sort=page.locator('.lwk-sort');await sort.locator('[data-item="0"]').click();await sort.locator('[data-bucket="0"]').click();await sort.locator('[data-item="1"]').focus();await page.keyboard.press('Enter');await sort.locator('[data-bucket="1"]').focus();await page.keyboard.press('Enter');await sort.locator('[data-check]').click();assert.match(await sort.locator('.lw-msg').textContent(),/All 2 correct/);
 // Real pointer dragging: return one chip to bank, then drag it back into its bucket.
 await sort.locator('[data-item="0"]').click();await sort.locator('[data-pool]').click();await sort.scrollIntoViewIfNeeded();await sort.evaluate(async el=>{await Promise.all(el.getAnimations({subtree:true}).map(a=>a.finished.catch(()=>{})));});const from=await sort.locator('[data-item="0"]').boundingBox(),to=await sort.locator('[data-bucket="0"]').boundingBox();await page.mouse.move(from.x+from.width/2,from.y+from.height/2);await page.mouse.down();await page.mouse.move(to.x+to.width/2,to.y+to.height/2,{steps:12});await page.mouse.up();await sort.locator('[data-check]').click();assert.match(await sort.locator('.lw-msg').textContent(),/All 2 correct/);
 const match=page.locator('.lwk-match');for(let i=0;i<2;i++){await match.locator(`[data-item="${i}"]`).click();await match.locator(`.lw-drop[data-zone="${i}"]`).click();}await match.locator('[data-check]').click();assert.equal(await match.locator('.lw-msg').getAttribute('data-state'),'good');
 await page.screenshot({path:'outputs/lesson-labs-desktop.png',fullPage:true});
 await page.setViewportSize({width:390,height:844});await page.emulateMedia({reducedMotion:'reduce'});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await page.locator('.lwk-nutritionlab').scrollIntoViewIfNeeded();await page.screenshot({path:'outputs/lesson-labs-mobile.png'});
 if(!process.argv.includes('--labs-only')){
  const names=process.argv.includes('--ready-only')?['Medical Terminology','Human Growth & Development']:['Nutrition','Medical Terminology','Health Informatics','Healthcare Administration','Human Growth & Development'];
  for(const name of names){
   await page.goto(base+'/#/event/'+encodeURIComponent(name)+'/lessons');await page.locator('.course-cover').waitFor();
   const links=await page.locator('.course-lesson-list a').evaluateAll(elements=>elements.map(a=>a.href));
   assert.ok(links.length>=10,name);
   for(const link of links){
    await page.goto(link);await page.locator('[data-lesson-id="'+decodeURIComponent(link.split('/').pop())+'"] .lesson-prose.rich').waitFor();
    assert.ok(await page.locator('.lw').count()>=2,name+' '+link);
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),name+' mobile overflow: '+link);
   }
  }
  await page.setViewportSize({width:1440,height:1000});await page.goto(base+'/#/event/'+encodeURIComponent(names[0])+'/lessons');await page.locator('.course-cover').waitFor();await page.screenshot({path:'outputs/nutrition-course-desktop.png'});
  await page.locator('.course-lesson-list a').first().click();await page.locator('.lesson-prose.rich').waitFor();
  await page.locator('.lw').first().scrollIntoViewIfNeeded();await page.screenshot({path:'outputs/nutrition-lesson-desktop.png'});
 }
 assert.deepEqual(errors,[]);console.log('Rich lesson browser QA passed: models, reset, predictions, failure paths, tap, keyboard, pointer drag, responsive layout and reduced motion.');
}finally{await browser?.close();await new Promise(r=>server.close(r));}
