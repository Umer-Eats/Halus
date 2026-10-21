import fs from 'node:fs/promises';
import {EVENT_DETAILS} from '../dist/event-details.js';
// Re-run to refresh official copies; extracted text is retained from the reviewed research archive.
await fs.mkdir(new URL('../dist/rules/',import.meta.url),{recursive:true});
const records = {};
const entries = Object.entries(EVENT_DETAILS);
let cursor = 0;
await Promise.all(Array.from({length:6},async()=>{
  while(cursor<entries.length){
    const [name,detail]=entries[cursor++];
    const file=decodeURIComponent(new URL(detail.source).pathname.split('/').pop());
    const record={url:detail.source,textUrl:`./rules/${file}.txt`,reviewed:detail.reviewed,season:'2026–27',summary:detail.summary};
    await fs.copyFile(new URL(`../outputs/hosa-research/${file}.txt`,import.meta.url),new URL(`../dist/rules/${file}.txt`,import.meta.url));
    try {
      const target=new URL(`../dist/rules/${file}`,import.meta.url);
      let bytes=await fs.readFile(target).catch(()=>null);
      if(!bytes){const response=await fetch(detail.source,{signal:AbortSignal.timeout(45000)});if(!response.ok)throw Error(`HTTP ${response.status}`);bytes=Buffer.from(await response.arrayBuffer());}
      if(bytes.subarray(0,5).toString()!=='%PDF-')throw Error('Invalid PDF signature');
      await fs.writeFile(target,bytes);
      record.localPdf=`./rules/${file}`;
    }catch(error){console.error(`${name}: ${error.message}`);}
    records[name]=record;
  }
}));
const ordered=Object.fromEntries(entries.map(([name])=>[name,records[name]]));
await fs.writeFile(new URL('../dist/event-rules.js',import.meta.url),`// Official HOSA documents; extracted text imported for accessible in-app reading.\nexport const EVENT_RULES = ${JSON.stringify(ordered,null,2)};\n`);
console.log(`Imported ${Object.keys(ordered).length} rule texts and ${Object.values(ordered).filter(r=>r.localPdf).length} verified PDFs.`);
