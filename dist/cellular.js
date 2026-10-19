// Original illustrative geometry, informed by Allen Institute microscopy (allencell.org).
// No measured coordinates, physical dimensions, or experimental time are implied.
const KINDS = ['cell', 'mitosis', 'network'];

export function cellularAtlas() {
  return `<section class="cellular-atlas" id="living-world" aria-labelledby="atlas-heading">
    <div class="atlas-intro"><div><span class="eyebrow">Welcome to the invisible.</span><h2 id="atlas-heading">Small things.<br><span>Infinite wonder.</span></h2></div></div>
    <div class="atlas-shell"><div class="atlas-view"><div class="specimen-stage"><canvas class="specimen-canvas" role="img" aria-label="Rotating illustration of a cell that slowly changes between cell architecture, cell division and a mitochondrial network"></canvas></div></div></div>
    </section>`;
}

// Seeded geometry keeps every specimen stable from visit to visit.
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

// Every specimen shares one set of slots so any shape can melt into any other. The membrane
// comes first in each set, so it holds steady while the interior reorganises. Shorter sets
// are padded with invisible points that sit inside their structure and fade in or out.
function buildSlots() {
  const sets = KINDS.map(makeSpecimen), count = Math.max(...sets.map(s => s.length));
  let seed = 97;
  const random = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  return sets.map(set => {
    const inner = set.filter(p => p.channel);
    return Array.from({length: count}, (_, i) => set[i] ? {...set[i], alpha: 1} : {...inner[Math.floor(random() * inner.length)], alpha: 0});
  });
}

const COLORS = [[242,65,91],[255,226,223],[255,125,139]], ALPHA = [.24,.48,.7];
const HOLD = [7, 12], MORPH = 3.2;

export function mountSpecimen(canvas) {
  const context=canvas.getContext('2d');
  if(!context) return {destroy(){}};
  const motion=matchMedia('(prefers-reduced-motion: reduce)');
  const slots=buildSlots();
  const pick=(not)=>{const options=KINDS.map((_,i)=>i).filter(i=>i!==not);return options[Math.floor(Math.random()*options.length)];};
  let from=Math.floor(Math.random()*KINDS.length), to=from, blend=1, hold=HOLD[0]+Math.random()*(HOLD[1]-HOLD[0]);
  let width=1,height=1,frame=0,time=0,last=0,visible=false,disposed=false;

  const place=(p,kind,out)=>{
    let {x,y,z}=p;
    if(kind==='mitosis') {
      const division=(1-Math.cos(time*.38))*.27;
      if(p.group) x+=p.group*(.08+division);
      if(p.channel===0) {x*=1+division*.35;y*=1-division*.25*Math.exp(-x*x*6);}
    } else if(p.channel===2) {x+=Math.sin(time*.55+p.phase)*.012;y+=Math.cos(time*.4+p.phase)*.012;}
    out[0]=x;out[1]=y;out[2]=z;
  };
  const a=[0,0,0], b=[0,0,0], projected=[];
  const render=()=>{
    context.clearRect(0,0,width,height);
    const scale=Math.min(width/3.5,height/2.9), turn=time*.22;
    const ca=Math.cos(turn),sa=Math.sin(turn),tilt=-.25+Math.sin(time*.13)*.12,ct=Math.cos(tilt),st=Math.sin(tilt);
    const t=blend*blend*(3-2*blend), A=slots[from], B=slots[to], kindA=KINDS[from], kindB=KINDS[to];
    projected.length=0;
    for(let i=0;i<A.length;i++) {
      const p=A[i], q=B[i];
      const alpha=p.alpha+(q.alpha-p.alpha)*t;
      if(alpha<.01) continue;
      place(p,kindA,a); place(q,kindB,b);
      const x=a[0]+(b[0]-a[0])*t, y=a[1]+(b[1]-a[1])*t, z=a[2]+(b[2]-a[2])*t;
      const xx=x*ca+z*sa,zz=z*ca-x*sa, yy=y*ct-zz*st,depth=zz*ct+y*st;
      const perspective=3.8/(3.8-depth), cp=COLORS[p.channel], cq=COLORS[q.channel];
      projected.push({
        x:width/2+xx*scale*perspective, y:height/2+yy*scale*perspective, z:depth,
        r:(p.size+(q.size-p.size)*t)*perspective,
        rgb:`${Math.round(cp[0]+(cq[0]-cp[0])*t)},${Math.round(cp[1]+(cq[1]-cp[1])*t)},${Math.round(cp[2]+(cq[2]-cp[2])*t)}`,
        a:alpha*(ALPHA[p.channel]+(ALPHA[q.channel]-ALPHA[p.channel])*t)*Math.max(.22,(depth+1.4)/2.5)
      });
    }
    projected.sort((m,n)=>m.z-n.z);
    context.globalCompositeOperation='lighter';
    for(const p of projected) {
      context.fillStyle=`rgba(${p.rgb},${p.a})`;
      context.beginPath();context.arc(p.x,p.y,Math.max(.35,p.r),0,Math.PI*2);context.fill();
    }
    context.globalCompositeOperation='source-over';
  };
  const advance=dt=>{
    time+=dt;
    if(blend<1) { blend=Math.min(1,blend+dt/MORPH); if(blend===1) { from=to; hold=HOLD[0]+Math.random()*(HOLD[1]-HOLD[0]); } }
    else if((hold-=dt)<=0) { to=pick(from); blend=0; }
  };
  const loop=now=>{
    frame=0;
    if(disposed||!visible||document.hidden||motion.matches) return;
    advance(last?Math.min((now-last)/1000,.05):0);last=now;
    render();frame=requestAnimationFrame(loop);
  };
  const schedule=()=>{cancelAnimationFrame(frame);frame=0;last=0;render();if(!motion.matches&&visible&&!document.hidden)frame=requestAnimationFrame(loop);};
  const resize=()=>{const r=canvas.getBoundingClientRect();width=r.width;height=r.height;const dpr=Math.min(devicePixelRatio||1,1.5);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);context.setTransform(dpr,0,0,dpr,0,0);render();};
  const ro=new ResizeObserver(resize);ro.observe(canvas);
  const io=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;schedule();});io.observe(canvas);
  document.addEventListener('visibilitychange',schedule);
  motion.addEventListener('change',schedule);
  resize();
  return {destroy(){disposed=true;cancelAnimationFrame(frame);ro.disconnect();io.disconnect();document.removeEventListener('visibilitychange',schedule);motion.removeEventListener('change',schedule);}};
}

export function mountCellularAtlas(root) {
  const view=mountSpecimen(root.querySelector('canvas'));
  return view.destroy;
}
