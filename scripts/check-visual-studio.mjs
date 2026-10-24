// Isolated visual QA, using course data only; no authentication or external API calls.
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import assert from 'node:assert/strict';
const {chromium}=await import(pathToFileURL(process.env.PLAYWRIGHT_ENTRY).href);
const root=path.resolve('dist');
const html=`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">${['styles','courses','lessons','lesson-labs','lesson-science-labs','lesson-skill-labs','visual-studio'].map(s=>`<link rel="stylesheet" href="/${s}.css">`).join('')}</head><body><main style="max-width:1040px;padding:20px;margin:auto"></main><script type="module">
import {loadAllCourses,courseNames,courseLessons} from '/courses.js';
import {renderWidget,mountWidgets} from '/lesson-widgets.js';
import {conceptMap} from '/visual-studio.js';
await loadAllCourses({view:false});
const main=document.querySelector('main');
window.names=courseNames();
window.renderEvent=name=>{const lessons=courseLessons(name);const widgets=lessons.flatMap(l=>[conceptMap(l),...l.sections.flatMap(s=>s.blocks.filter(b=>b.t==='w'))]);main.innerHTML=widgets.map(renderWidget).join('');mountWidgets(main);return {lessons:lessons.length,widgets:widgets.length};};
window.renderSample=()=>{const lesson=courseLessons('Pharmacology')[0];const labels=courseNames().flatMap(name=>courseLessons(name).flatMap(l=>l.sections.flatMap(s=>s.blocks))).filter(b=>b.kind==='label');main.innerHTML=[labels[0],{kind:'nutritionlab',title:'Food energy · compare your experiments'},conceptMap(lesson)].map(renderWidget).join('')+lesson.sections.map((s,i)=>'<section data-section="'+i+'"><h3>'+s.title+'</h3></section>').join('');mountWidgets(main);};
window.ready=true;
</script></body></html>`;
const server=http.createServer(async(req,res)=>{const pathname=new URL(req.url,'http://localhost').pathname;if(pathname==='/'){res.setHeader('Content-Type','text/html');res.end(html);return;}const file=path.resolve(root,'.'+decodeURIComponent(pathname));if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}try{res.setHeader('Content-Type',({'.js':'text/javascript','.css':'text/css','.ttf':'font/ttf'})[path.extname(file)]||'application/octet-stream');res.end(await fs.readFile(file));}catch{res.writeHead(404).end();}});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
let browser;
try{
 browser=await chromium.launch({channel:'msedge',headless:true});const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'&&m.text().includes('Lesson activity failed'))errors.push(m.text());});
 await page.goto(`http://127.0.0.1:${server.address().port}/`);await page.waitForFunction(()=>window.ready);
 const names=await page.evaluate(()=>window.names);let totals={lessons:0,widgets:0};const overflow=[];
 for(const name of names){const counts=await page.evaluate(n=>window.renderEvent(n),name);totals.lessons+=counts.lessons;totals.widgets+=counts.widgets;for(const theme of ['light','dark']){await page.evaluate(t=>document.documentElement.dataset.theme=t,theme);const tooWide=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);if(tooWide)overflow.push(name+' '+theme);}}
 assert.deepEqual(errors,[],'all event widgets mount');assert.deepEqual(overflow,[],'all events fit mobile in both themes');
 await page.evaluate(()=>{document.documentElement.dataset.theme='light';window.renderSample();});
 const model=page.locator('.lwk-label');await model.locator('[data-tour-next]').click();assert.match(await model.locator('[data-tour-status]').innerText(),/Part 1/);await model.locator('[data-tour-next]').click();assert.match(await model.locator('[data-tour-status]').innerText(),/Part 2/);
 await model.locator('[data-zoom-in]').click();assert.equal(await model.locator('.visual-tools output').textContent(),'125%');await model.locator('[data-zoom-fit]').click();assert.equal(await model.locator('.visual-tools output').textContent(),'100%');
 await model.locator('[data-tour-play]').click();assert.equal(await model.locator('[data-tour-play]').getAttribute('aria-pressed'),'true');await model.locator('[data-mode="quiz"]').click();assert.equal(await model.locator('[data-tour-play]').getAttribute('aria-pressed'),'false');await model.locator('[data-mode="explore"]').click();
 await model.locator('[data-pick]').first().focus();await page.keyboard.press('Enter');assert.equal(await model.locator('[data-pick]').first().getAttribute('aria-pressed'),'true');
 const lab=page.locator('.lwk-nutritionlab');await lab.locator('summary').click();await lab.locator('[data-prediction]').fill('Two servings will double the energy.');await lab.locator('[data-observation]').fill('One serving contains 250 kcal.');await lab.locator('[data-record-trial]').click();await lab.locator('[data-input="servings"]').fill('2');await lab.locator('[data-observation]').fill('Two servings contain 500 kcal.');await lab.locator('[data-record-trial]').click();assert.equal(await lab.locator('.trial-list li').count(),2);assert.match(await lab.locator('.trial-list li').nth(1).textContent(),/500 kcal/);await lab.locator('[data-lab-reset]').click();assert.equal(await lab.locator('[data-input="servings"]').inputValue(),'1');assert.equal(await lab.locator('.trial-list li').count(),2);
 const atlas=page.locator('.lwk-conceptmap');await atlas.locator('[data-atlas-node="1"]').click();assert.equal(await atlas.locator('[data-atlas-node="1"]').getAttribute('aria-pressed'),'true');await atlas.locator('[data-atlas-open]').click();assert.equal(await page.evaluate(()=>document.activeElement.dataset.section),'1');
 await page.setViewportSize({width:1440,height:1000});await page.emulateMedia({reducedMotion:'no-preference'});await model.scrollIntoViewIfNeeded();await page.screenshot({path:'outputs/visual-studio-desktop.png'});
 await page.setViewportSize({width:390,height:844});await model.scrollIntoViewIfNeeded();await page.screenshot({path:'outputs/visual-studio-mobile.png'});
 await page.evaluate(()=>document.documentElement.dataset.theme='dark');await atlas.scrollIntoViewIfNeeded();await page.waitForTimeout(350);await page.screenshot({path:'outputs/visual-atlas-dark.png'});
 assert.deepEqual(errors,[]);console.log(JSON.stringify({events:names.length,...totals,checks:'All widgets mount; mobile light/dark; zoom, tour, quiz, keyboard, notebook, reset, atlas navigation; desktop and mobile screenshots.'}));
}finally{await browser?.close();await new Promise(r=>server.close(r));}

