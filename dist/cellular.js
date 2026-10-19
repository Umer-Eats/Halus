// Original illustrative geometry, informed by the cited Allen Institute microscopy.
// No measured coordinates, physical dimensions, or experimental time are implied.
const specimens = {
  cell: {title:'A world within a cell.', name:'Cell architecture', caption:'A membrane. A nucleus. Thousands of connections. Explore the intricate structures that make a single cell a living system.', labels:['Cell membrane','Nucleus','Internal structures']},
  mitosis: {title:'One becomes two.', name:'Cell division', caption:'Watch spindle-like fibres organise and the chromosome groups separate. A small change, with the possibility of something entirely new.', labels:['Cell membrane','Chromosomes','Spindle fibres']},
  network: {title:'Life is connected.', name:'Mitochondrial network', caption:'Mitochondria form branching tubules and smaller, separate structures. Their living networks continually move and reorganise within the cell.', labels:['Cell boundary','Nucleus','Mitochondrial tubules']}
};

export function cellularAtlas() {
  return `<section class="cellular-atlas" id="living-world" aria-labelledby="atlas-heading">
    <div class="atlas-intro"><div><span class="eyebrow">Welcome to the invisible.</span><h2 id="atlas-heading">Small things.<br><span>Infinite wonder.</span></h2></div><p>A living world, hiding in plain sight.<br>Choose a structure. Turn it around. Look within.</p></div>
    <div class="atlas-shell">
      <div class="specimen-tabs" role="group" aria-label="Choose a biological structure">${Object.entries(specimens).map(([key,s],i)=>`<button data-specimen="${key}" aria-pressed="${i===0}"><span>0${i+1}</span>${s.name}</button>`).join('')}</div>
      <div class="atlas-view"><div class="specimen-stage"><canvas class="specimen-canvas" role="img" aria-label="Animated illustrative 3D cell with membrane, nucleus and internal structures"></canvas><span class="specimen-badge"><i></i>Living structures</span><span class="specimen-axis" aria-hidden="true">Y<br>└── X<br>╱ Z</span><span class="specimen-kind">3D illustration · Microscopy inspired</span></div>
      <div class="specimen-info"><span class="eyebrow">Inside the invisible</span><h3 data-specimen-title>${specimens.cell.title}</h3><p data-specimen-caption>${specimens.cell.caption}</p><ul class="specimen-legend">${specimens.cell.labels.map((l,i)=>`<li><i class="channel-${i}"></i><span>${l}</span></li>`).join('')}</ul><div class="specimen-controls"><button class="specimen-play" aria-pressed="false">Pause animation <span aria-hidden="true">Ⅱ</span></button><label>Rotate the view<input type="range" min="-180" max="180" value="0" data-rotation aria-label="Rotate the specimen"></label><label>Explore the depth<input type="range" min="0" max="100" value="100" data-depth aria-label="Specimen depth cutaway"></label></div><span class="specimen-disclaimer">An artistic interpretation, not a measured scan. Colours distinguish structures.</span></div></div>
      <details class="microscopy-sources"><summary>Inspired by real microscopy <span>View the research ↗</span></summary><div class="source-grid"><a href="https://www.allencell.org/allen-integrated-cell.html" target="_blank" rel="noreferrer"><img src="assets/references/allen-3d-cell.png" loading="lazy" width="534" height="462" alt="Allen Institute 3D cell model showing the nucleus and surrounding cellular structures"><strong>Cell architecture in 3D ↗</strong><span>Allen Integrated Cell · Allen Institute</span></a><a href="https://www.allencell.org/hips-cells-during-mitosis.html" target="_blank" rel="noreferrer"><img src="assets/references/allen-mitosis.png" loading="lazy" width="863" height="800" alt="Allen Institute confocal microscopy comparison of interphase and seven stages of mitosis"><strong>Cell division, through time ↗</strong><span>Confocal microscopy & time series · Allen Institute</span></a><div class="source-notes"><h4>From observation to imagination.</h4><p>The cell model and microscopy figures inform the shapes here. The animations are original illustrations; they do not reproduce a scientific dataset.</p><a href="https://www.allencell.org/cell-observations/mitochondria-visualized-via-tom20" target="_blank" rel="noreferrer">See mitochondrial z-stacks & 3D time-lapse ↗</a><p>Reference images: Allen Institute for Cell Science. Original colours retained. 4D microscopy means three spatial dimensions observed over time.</p></div></div></details>
    </div></section>`;
}

// Seeded geometry makes switching specimens stable and avoids per-frame randomness.
export function makeSpecimen(kind) {
  let seed = 613;
  const random = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  const points = [];
  const point = (x,y,z,channel,size=1,group=0) => points.push({x,y,z,channel,size,group,phase:random()*Math.PI*2});
  const sphere = (n,rx,ry,rz,channel,rough=0,group=0) => {
    for(let i=0;i<n;i++) {
      const y=1-2*(i+.5)/n, r=Math.sqrt(1-y*y), a=i*2.399963229728653;
      const ripple=1+rough*(Math.sin(a*5)*Math.sin(y*11)+.35*Math.cos(a*9));
      point(Math.cos(a)*r*rx*ripple,y*ry*ripple,Math.sin(a)*r*rz*ripple,channel,.7+random()*.8,group);
    }
  };
  sphere(2100,1.3,1, .85,0,.065);
  if(kind==='mitosis') {
    for(let group of [-1,1]) {
      for(let i=0;i<480;i++) {
        const a=random()*Math.PI*2,r=Math.sqrt(random())*.45;
        point((random()-.5)*.16,Math.cos(a)*r,Math.sin(a)*r,1,1.4+random(),group);
      }
      for(let f=0;f<48;f++) {
        const a=f/48*Math.PI*2, r=.25+random()*.24;
        for(let j=0;j<55;j++) {
          const u=j/54, bulge=Math.sin(u*Math.PI)*.18;
          point(group*u*1.12,Math.cos(a)*(r*(1-u)+bulge),Math.sin(a)*(r*(1-u)+bulge),2,.6+random()*.6);
        }
      }
    }
  } else {
    sphere(1000,.48,.58,.43,1,.08);
    // Tortuous tubules wrap around a nucleus-free cytoplasmic region.
    for(let branch=0;branch<(kind==='network'?64:38);branch++) {
      const a=random()*Math.PI*2, b=random()*Math.PI, length=.55+random()*1.2, phase=random()*6;
      for(let j=0;j<70;j++) {
        const t=j/69, theta=a+t*length, phi=b+Math.sin(t*5+phase)*.25;
        const rad=.7+.18*Math.sin(t*8+phase);
        const x=Math.cos(theta)*Math.sin(phi)*rad*1.45,y=Math.cos(phi)*rad,z=Math.sin(theta)*Math.sin(phi)*rad;
        point(x,y,z,2,1.1+random()*.7);
        if(j%2===0) point(x+.018,y+.018,z+.018,2,.8);
      }
    }
    if(kind==='cell') {
      for(let f=0;f<24;f++) {
        const a=random()*Math.PI*2;
        for(let j=0;j<55;j++) {
          const t=j/54*Math.PI;
          point(Math.cos(t)*1.16,Math.sin(t)*Math.cos(a)*.85,Math.sin(t)*Math.sin(a)*.8,0,.65);
        }
      }
    }
  }
  return points;
}

export function mountSpecimen(canvas, {kind='cell'}={}) {
  const context=canvas.getContext('2d');
  if(!context) { canvas.replaceWith(Object.assign(document.createElement('p'),{textContent:'Explore the microscopy references below to see these cellular structures.'})); return {set(){},destroy(){}}; }
  const motion=matchMedia('(prefers-reduced-motion: reduce)');
  let state={kind, paused:motion.matches, rotation:0, depth:100}, points=makeSpecimen(kind);
  let width=1,height=1,frame=0,time=0,last=0,visible=false,disposed=false;
  const render=()=>{
    context.clearRect(0,0,width,height);
    const scale=Math.min(width/3.5,height/2.9), a=state.rotation*Math.PI/180+time*.065;
    const ca=Math.cos(a),sa=Math.sin(a),tilt=-.25,ct=Math.cos(tilt),st=Math.sin(tilt);
    const division=(1-Math.cos(time*.38))*.27;
    const transformed=[];
    for(const p of points) {
      let {x,y,z}=p;
      if(state.kind==='mitosis') {
        if(p.group) x+=p.group*(.08+division);
        if(p.channel===0) {x*=1+division*.35;y*=1-division*.25*Math.exp(-x*x*6);}
      } else if(p.channel===2) {x+=Math.sin(time*.55+p.phase)*.012;y+=Math.cos(time*.4+p.phase)*.012;}
      if(z>(state.depth/100*2-1)*.95) continue;
      const xx=x*ca+z*sa,zz=z*ca-x*sa, yy=y*ct-zz*st,depth=zz*ct+y*st;
      const perspective=3.8/(3.8-depth);
      transformed.push({x:width/2+xx*scale*perspective,y:height/2+yy*scale*perspective,z:depth,r:p.size*perspective,c:p.channel});
    }
    transformed.sort((a,b)=>a.z-b.z);
    context.globalCompositeOperation='lighter';
    const colors=['242,65,91','255,226,223','255,125,139'];
    for(const p of transformed) {
      const alpha=(p.c===0?.24:p.c===1?.48:.7)*Math.max(.22,(p.z+1.4)/2.5);
      context.fillStyle=`rgba(${colors[p.c]},${alpha})`;
      context.beginPath();context.arc(p.x,p.y,Math.max(.35,p.r),0,Math.PI*2);context.fill();
    }
    context.globalCompositeOperation='source-over';
  };
  const loop=now=>{
    frame=0;
    if(disposed||!visible||document.hidden||state.paused) return;
    time+=last?Math.min((now-last)/1000,.05):0;last=now;
    render();frame=requestAnimationFrame(loop);
  };
  const schedule=()=>{cancelAnimationFrame(frame);frame=0;last=0;render();if(!state.paused&&visible&&!document.hidden)frame=requestAnimationFrame(loop);};
  const resize=()=>{const r=canvas.getBoundingClientRect();width=r.width;height=r.height;const dpr=Math.min(devicePixelRatio||1,1.5);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);context.setTransform(dpr,0,0,dpr,0,0);render();};
  const ro=new ResizeObserver(resize);ro.observe(canvas);
  const io=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;schedule();});io.observe(canvas);
  const visibility=()=>schedule();document.addEventListener('visibilitychange',visibility);
  const reduced=()=>{state.paused=motion.matches;schedule();canvas.dispatchEvent(new CustomEvent('specimen-motion',{detail:state.paused}));};motion.addEventListener('change',reduced);
  resize();
  return {
    set(update){if(update.kind&&update.kind!==state.kind){points=makeSpecimen(update.kind);time=0;}state={...state,...update};schedule();},
    destroy(){disposed=true;cancelAnimationFrame(frame);ro.disconnect();io.disconnect();document.removeEventListener('visibilitychange',visibility);motion.removeEventListener('change',reduced);}
  };
}

export function mountCellularAtlas(root) {
  const canvas=root.querySelector('canvas'), view=mountSpecimen(canvas), cleanups=[];
  const on=(el,type,fn)=>{el.addEventListener(type,fn);cleanups.push(()=>el.removeEventListener(type,fn));};
  const play=root.querySelector('.specimen-play');let paused=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const showPause=()=>{play.setAttribute('aria-pressed',String(paused));play.innerHTML=paused?'Play animation <span aria-hidden="true">▷</span>':'Pause animation <span aria-hidden="true">Ⅱ</span>';};showPause();
  on(play,'click',()=>{paused=!paused;view.set({paused});showPause();});
  on(canvas,'specimen-motion',e=>{paused=e.detail;showPause();});
  for(const button of root.querySelectorAll('[data-specimen]')) on(button,'click',()=>{
    const key=button.dataset.specimen,s=specimens[key];
    root.querySelectorAll('[data-specimen]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    root.querySelector('[data-specimen-title]').textContent=s.title;
    root.querySelector('[data-specimen-caption]').textContent=s.caption;
    root.querySelectorAll('.specimen-legend li span').forEach((el,i)=>el.textContent=s.labels[i]);
    canvas.setAttribute('aria-label',`Illustrative 3D ${s.name.toLowerCase()}: ${s.labels.join(', ')}`);
    root.querySelector('[data-rotation]').value=0;root.querySelector('[data-depth]').value=100;
    view.set({kind:key,rotation:0,depth:100});
  });
  on(root.querySelector('[data-rotation]'),'input',e=>view.set({rotation:Number(e.target.value)}));
  on(root.querySelector('[data-depth]'),'input',e=>view.set({depth:Number(e.target.value)}));
  return ()=>{cleanups.forEach(f=>f());view.destroy();};
}
