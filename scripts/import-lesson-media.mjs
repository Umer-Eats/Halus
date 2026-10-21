import fs from 'node:fs/promises';
const A='anatomy-and-physiology', S='introductory-statistics', P='psychology', B='biology';
const pages={
 'Behavioral Health':[[P,'3-2-cells-of-the-nervous-system'],[P,'8-1-how-memory-functions']],
 'Biomedical Equipment Technician':[[A,'19-2-cardiac-muscle-and-electrical-activity'],[A,'22-3-the-process-of-breathing']],
 'Dental Terminology':[[A,'23-3-the-mouth-pharynx-and-esophagus']],
 'Health Informatics':[[S,'1-2-data-sampling-and-variation-in-data-and-sampling'],[S,'2-2-histograms-frequency-polygons-and-time-series-graphs']],
 'Healthcare Administration':[[S,'2-1-stem-and-leaf-graphs-stemplots-line-graphs-and-bar-graphs']],
 'Human Growth & Development':[[A,'28-2-embryonic-development'],[A,'28-3-fetal-development']],
 'Medical Law & Ethics':[[P,'2-4-ethics']],
 'Medical Math':[[S,'2-2-histograms-frequency-polygons-and-time-series-graphs']],
 'Medical Reading':[[S,'1-2-data-sampling-and-variation-in-data-and-sampling']],
 'Medical Spelling':[[A,'1-6-anatomical-terminology'],[A,'1-2-structural-organization-of-the-human-body']],
 'Medical Terminology':[[A,'1-6-anatomical-terminology'],[A,'1-2-structural-organization-of-the-human-body']],
 'Nutrition':[[A,'24-1-overview-of-metabolic-reactions'],[A,'23-2-digestive-system-processes-and-regulation']],
 'Pathophysiology':[[A,'21-2-barrier-defenses-and-the-innate-immune-response'],[A,'1-5-homeostasis']],
 'Pharmacology':[[A,'3-1-the-cell-membrane'],[A,'17-2-hormones']],
 'World Health & Disparities':[[S,'1-2-data-sampling-and-variation-in-data-and-sampling'],[A,'21-1-anatomy-of-the-lymphatic-and-immune-systems']],
 'Biotechnology':[[A,'3-3-the-nucleus-and-dna-replication'],[A,'3-4-protein-synthesis']],
 'Clinical Lab Science (Medical Lab Scientist)':[[A,'18-1-an-overview-of-blood'],[A,'18-3-erythrocytes']],
 'Clinical Nursing':[[A,'20-2-blood-flow-blood-pressure-and-resistance'],[A,'22-3-the-process-of-breathing']],
 'Clinical Specialty':[[A,'1-3-functions-of-human-life'],[A,'1-5-homeostasis']],
 'Dental Science':[[A,'23-3-the-mouth-pharynx-and-esophagus']]
};
const clean=s=>s.replace(/<[^>]*>/g,' ').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#x27;|&#39;/g,"'").replace(/\s+/g,' ').trim();
const cache=new Map();
async function getFigures(book,page){
 const source=`https://openstax.org/books/${book}/pages/${page}`;
 if(cache.has(source))return cache.get(source);
 let response;
 for(let attempt=0;attempt<3;attempt++){response=await fetch(source,{signal:AbortSignal.timeout(20000)}).catch(()=>null);if(response?.ok)break;}
 if(!response?.ok){console.log('Unavailable source',source);return [];}
 const html=await response.text();
 if(!html.includes('creativecommons.org/licenses/by/4.0/')){console.log('Non-BY source skipped',source);return [];}
 const figures=[];
 for(const match of html.matchAll(/<figure[\s\S]*?<\/figure>/g)){
  const markup=match[0],img=markup.match(/<img[^>]*data-media-type[^>]*>/)?.[0];
  if(!img)continue;
  const src=img.match(/data-original-src="([^"]+)"/)?.[1]||img.match(/src="([^"]+)"/)?.[1];
  const caption=clean(markup.match(/<figcaption[\s\S]*?<\/figcaption>/)?.[0]||'');
  const title=clean(markup.match(/class="os-title"[^>]*>([\s\S]*?)<\/span>/)?.[1]||page.replace(/^\d+-\d+-/,'').replaceAll('-',' '));
  const alt=clean(img.match(/alt="([^"]*)"/)?.[1]||title);
  if(!src)continue;
  const url=new URL(src,'https://openstax.org').href;
  const check=await fetch(url,{method:'HEAD',signal:AbortSignal.timeout(15000)}).catch(()=>null);
  if(!check?.ok||!check.headers.get('content-type')?.startsWith('image/'))continue;
  figures.push({url,title,source,credit:'OpenStax / Rice University. '+caption,license:'CC BY 4.0',licenseUrl:'https://creativecommons.org/licenses/by/4.0/',alt,caption});
  if(figures.length>=3)break;
 }
 cache.set(source,figures);return figures;
}
const result={};
for(const [event,sections] of Object.entries(pages)){
 result[event]=(await Promise.all(sections.map(([b,p])=>getFigures(b,p)))).flat();
 console.log(event,result[event].length);
 await fs.writeFile(new URL('../dist/lesson-media.js',import.meta.url),'// Verified OpenStax first-edition educational figures, retained under CC BY 4.0.\nexport const LESSON_MEDIA = '+JSON.stringify(result,null,2)+';\n');
}
await fs.writeFile(new URL('../dist/lesson-media.js',import.meta.url),'// Verified OpenStax first-edition educational figures, retained under CC BY 4.0.\nexport const LESSON_MEDIA = '+JSON.stringify(result,null,2)+';\n');
