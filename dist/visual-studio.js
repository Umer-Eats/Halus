// Shared tools for the existing teaching models. No clinical calculations are changed.
const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const formatted = value => escape(value).replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/\*(.+?)\*/g,'<em>$1</em>');

export function conceptMap(lesson) {
  const sections = lesson.sections || [];
  return {kind:'conceptmap', title:`Learning map · ${lesson.title}`, prompt:'Explore the lesson by topic, connect key terms, then explain the ideas in your own words.',
    nodes:sections.map((section, index) => ({title:section.title, index,
      details:section.blocks.flatMap(b => typeof b === 'string' ? [b] : b.t === 'callout' ? [b.text] : b.t === 'list' ? b.items : []).filter(Boolean).slice(0, 4)})),
    terms:lesson.terms || [], objectives:lesson.objectives || []};
}

export const CONCEPT_MAP = {
  label:'Interactive lesson atlas',
  render(w) {
    return `<div class="atlas"><p class="lw-help">Connections show the lesson’s topic structure, not a biological pathway or a required procedure.</p><div class="atlas-layout"><nav class="atlas-nodes" aria-label="Lesson topics">${w.nodes.map((n,i)=>`<button type="button" data-atlas-node="${i}" aria-pressed="${i===0}"><span>${String(i+1).padStart(2,'0')}</span><strong>${escape(n.title)}</strong></button>`).join('')}</nav><div class="atlas-detail" aria-live="polite"></div></div><details class="atlas-terms"><summary>Connect the vocabulary · ${w.terms.length} key terms</summary><dl>${w.terms.map(([term,definition])=>`<div><dt>${escape(term)}</dt><dd>${escape(definition)}</dd></div>`).join('')}</dl></details><details><summary>Practice explaining the connections</summary><ul>${w.objectives.map(o=>`<li>${escape(o)}</li>`).join('')}</ul><p>Choose two topics above. Explain how one helps you understand the other, using a key term and an example from the lesson.</p></details></div>`;
  },
  mount(node,w) {
    const detail=node.querySelector('.atlas-detail');
    const show=i=>{
      const n=w.nodes[i]; if(!n)return;
      node.querySelectorAll('[data-atlas-node]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.atlasNode)===i)));
      detail.innerHTML=`<span class="eyebrow">Topic ${i+1} of ${w.nodes.length}</span><h5>${escape(n.title)}</h5>${n.details.map(p=>`<p>${formatted(p)}</p>`).join('') || '<p>Open this section to work through its activities and examples.</p>'}<button type="button" class="button secondary" data-atlas-open="${n.index}">Study this section →</button>`;
      if(!matchMedia('(prefers-reduced-motion: reduce)').matches) detail.animate([{opacity:.35,transform:'translateY(6px)'},{opacity:1,transform:'translateY(0)'}],{duration:220});
    };
    node.addEventListener('click',event=>{
      const choice=event.target.closest('[data-atlas-node]');if(choice)show(Number(choice.dataset.atlasNode));
      const jump=event.target.closest('[data-atlas-open]');if(jump){const section=node.closest('.course-lesson,main')?.querySelector(`[data-section="${jump.dataset.atlasOpen}"]`);if(section){section.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});section.tabIndex=-1;section.focus({preventScroll:true});}}
    });
    show(0);
  }
};

export function mountVisualStudio(node,w) {
  // Inline SVG definitions must be unique when several diagrams share a lesson.
  const ids=new Map();
  node.querySelectorAll('svg [id]').forEach(el=>{const old=el.id;const next=`${node.dataset.wid}-${old}`;ids.set(old,next);el.id=next;});
  node.querySelectorAll('svg *').forEach(el=>{for(const attribute of [...el.attributes]){let value=attribute.value;for(const [old,next] of ids){value=value.replaceAll(`url(#${old})`,`url(#${next})`);if((attribute.name==='href'||attribute.name==='xlink:href')&&value===`#${old}`)value=`#${next}`;}if(value!==attribute.value)el.setAttribute(attribute.name,value);}});

  node.querySelectorAll('.lw-figure').forEach(figure=>{
    const svg=figure.querySelector('svg');if(!svg)return;
    const viewport=document.createElement('div');viewport.className='visual-viewport';viewport.tabIndex=0;viewport.setAttribute('role','region');viewport.setAttribute('aria-label','Model viewport; scroll to inspect when zoomed');svg.before(viewport);viewport.append(svg);
    const toolbar=document.createElement('div');toolbar.className='visual-tools';toolbar.innerHTML='<span>Inspect model</span><button type="button" class="chip" data-zoom-out aria-label="Zoom out">−</button><output aria-live="polite">100%</output><button type="button" class="chip" data-zoom-in aria-label="Zoom in">+</button><button type="button" class="chip" data-zoom-fit>Fit</button>';
    figure.append(toolbar);let zoom=1;
    const update=()=>{svg.style.width=`${zoom*100}%`;svg.style.maxWidth='none';toolbar.querySelector('output').textContent=`${Math.round(zoom*100)}%`;toolbar.querySelector('[data-zoom-out]').disabled=zoom===1;toolbar.querySelector('[data-zoom-in]').disabled=zoom===2.5;};
    toolbar.addEventListener('click',ev=>{if(ev.target.closest('[data-zoom-in]'))zoom=Math.min(2.5,zoom+.25);if(ev.target.closest('[data-zoom-out]'))zoom=Math.max(1,zoom-.25);if(ev.target.closest('[data-zoom-fit]'))zoom=1;update();});update();
  });

  if(w.kind==='label' && w.parts?.length){
    const panel=document.createElement('div');panel.className='model-tour';
    panel.innerHTML=`<div class="visual-tools"><button type="button" class="chip" data-tour-prev aria-label="Previous model part">←</button><button type="button" class="chip" data-tour-play aria-pressed="false">Play guided tour</button><button type="button" class="chip" data-tour-next aria-label="Next model part">→</button><label>Reading pace <select data-tour-speed><option value="6000">6 seconds</option><option value="10000" selected>10 seconds</option><option value="15000">15 seconds</option></select></label></div><p class="lw-help" data-tour-status aria-live="polite">Explore ${w.parts.length} parts at your own pace. The tour follows the label order.</p><progress max="${w.parts.length}" value="0" aria-label="Parts explored"></progress><details><summary>Model reference · all ${w.parts.length} parts</summary><dl>${w.parts.map(([,name,detail])=>`<div><dt>${escape(name)}</dt><dd>${escape(detail)}</dd></div>`).join('')}</dl></details>`;
    node.append(panel);let index=-1,timer=null,playing=false;const visited=new Set();
    const play=panel.querySelector('[data-tour-play]');
    const stop=()=>{clearTimeout(timer);timer=null;playing=false;play.textContent='Play guided tour';play.setAttribute('aria-pressed','false');};
    const schedule=()=>{clearTimeout(timer);timer=setTimeout(()=>{if(!node.isConnected||document.hidden){stop();return;}advance(1);if(index===w.parts.length-1)stop();else schedule();},Number(panel.querySelector('select').value));};
    const advance=delta=>{node.querySelector('[data-mode="explore"]')?.click();index=(index+delta+w.parts.length)%w.parts.length;node.querySelectorAll('[data-pick]')[index]?.click();};
    node.addEventListener('click',ev=>{
      const part=ev.target.closest('[data-pick],[data-part]');
      if(part){const id=part.dataset.pick||part.dataset.part;const found=w.parts.findIndex(p=>p[0]===id);if(found>=0){index=found;visited.add(id);panel.querySelector('progress').value=visited.size;panel.querySelector('[data-tour-status]').textContent=`Part ${index+1} of ${w.parts.length} · ${w.parts[index][1]} · ${visited.size} explored`;node.querySelectorAll('[data-pick]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.pick===id)));}}
      if(ev.target.closest('[data-mode="quiz"]'))stop();
    });
    panel.addEventListener('click',ev=>{if(ev.target.closest('[data-tour-play]')){if(playing)stop();else{playing=true;play.textContent='Pause tour';play.setAttribute('aria-pressed','true');if(index<0||index===w.parts.length-1)index=-1;advance(1);schedule();}}if(ev.target.closest('[data-tour-next]')){stop();advance(1);}if(ev.target.closest('[data-tour-prev]')){stop();advance(index<0?1:-1);}});
    panel.querySelector('select').addEventListener('change',()=>{if(playing)schedule();});
  }

  const practiceKinds=new Set(['label','conceptmap','match','sort','order','flip','case','wordbuild','stepper']);
  if((w.kind==='label'||w.kind==='stepper'||!practiceKinds.has(w.kind))&&w.studyNotes?.paragraphs?.length){
    const context=document.createElement('details');context.className='model-context';context.innerHTML=`<summary>Understand the model in context</summary><h5>${escape(w.studyNotes.title)}</h5>${w.studyNotes.paragraphs.map(p=>`<p>${formatted(p)}</p>`).join('')}<p class="lw-help">Use the lesson’s sources and worked examples to check your explanation.</p>`;node.append(context);
  }
  if(!practiceKinds.has(w.kind))mountNotebook(node);
}

function mountNotebook(node){
  const notebook=document.createElement('details');notebook.className='lab-notebook';notebook.innerHTML='<summary>Experiment notebook · compare your trials</summary><p class="lw-help">Predict a result, adjust one control, and record what changed. Notes last while this lesson stays open.</p><label>Your prediction<textarea rows="2" maxlength="1500" data-prediction placeholder="If I change… I expect… because…"></textarea></label><label>What did you observe?<textarea rows="2" maxlength="1500" data-observation placeholder="Record the result and explain the difference."></textarea></label><div class="visual-tools"><button type="button" class="chip" data-record-trial>Record trial</button><button type="button" class="chip" data-clear-trials>Clear trials</button></div><p data-trial-status role="status"></p><ol class="trial-list"></ol>';
  node.append(notebook);let trials=0;
  notebook.addEventListener('click',ev=>{
    if(ev.target.closest('[data-clear-trials]')){notebook.querySelector('ol').replaceChildren();trials=0;notebook.querySelector('[data-trial-status]').textContent='Trials cleared.';return;}
    if(!ev.target.closest('[data-record-trial]'))return;
    const status=notebook.querySelector('[data-trial-status]');if(trials>=8){status.textContent='Eight trials recorded. Clear trials to start a new experiment.';return;}
    const prediction=notebook.querySelector('[data-prediction]').value.trim(),observation=notebook.querySelector('[data-observation]').value.trim();if(!observation){status.textContent='Add an observation before recording a trial.';return;}
    const controls=[...node.querySelectorAll('input,select')].filter(el=>!notebook.contains(el)&&el.type!=='hidden'&&(!['radio','checkbox'].includes(el.type)||el.checked)).map((el,i)=>{const label=el.getAttribute('aria-label')||el.labels?.[0]?.textContent.trim()||el.dataset.input||el.name||`Control ${i+1}`;return `${label.replace(/\s+/g,' ').slice(0,90)}: ${el.tagName==='SELECT'?el.selectedOptions[0]?.textContent:el.value}`;});
    const readouts=[...new Set([...node.querySelectorAll('output,.lab-answer,[data-rate-stats],.lab-result,.lab-results,[data-result]')].filter(el=>!notebook.contains(el)&&el.checkVisibility()).map(el=>el.innerText.trim()).filter(Boolean))].join(' · ').slice(0,1000);
    const item=document.createElement('li');item.innerHTML=`<strong>Trial ${++trials}</strong>${controls.length?`<p class="trial-controls">${controls.map(escape).join(' · ')}</p>`:''}${readouts?`<p><b>Model readout:</b> ${escape(readouts)}</p>`:''}<p><b>Prediction:</b> ${escape(prediction||'Not recorded')}</p><p><b>Observation:</b> ${escape(observation)}</p>`;notebook.querySelector('ol').append(item);status.textContent=`Trial ${trials} recorded. Change one input to compare another trial.`;
  });
}
