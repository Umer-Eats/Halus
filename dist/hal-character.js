// Mr. DNA: an integer-grid pixel rig. Legacy export keeps existing page integrations working.
import {HAL_CLIPS} from './hal-motion.js';
const C = {ink:'#3b1520', red:'#cf2543', light:'#ff647b', dark:'#921c35', white:'#fff8f3', silver:'#dacbd0', pink:'#ef9bad'};
const box = (x,y,w,h,c) => `<rect x="${Math.round(x)}" y="${Math.round(y)}" width="${w}" height="${h}" fill="${c}"/>`;
function line(x,y,xx,yy,color,width=2) {
  const steps=Math.max(Math.abs(xx-x),Math.abs(yy-y),1); let out='';
  for(let i=0;i<=steps;i++) out+=box(x+(xx-x)*i/steps,y+(yy-y)*i/steps,width,width,color);
  return out;
}
function glove(x,y) { return box(x-1,y,7,5,C.ink)+box(x,y-1,4,7,C.ink)+box(x,y,5,4,C.white)+box(x+1,y-1,2,6,C.white); }
export function halSVG({action='idle',seconds=0,facing=1}={}) {
  const clip=HAL_CLIPS[action]??HAL_CLIPS.idle, f=Math.floor(Math.max(0,seconds)*clip.fps)%clip.frames;
  const phase=f/clip.frames*Math.PI*2, moving=['walk','run'].includes(action), happy=action==='happy', excited=action==='excited', sad=action==='sad', angry=action==='angry', thinking=action==='thinking', sleep=action==='sleep';
  const hop=excited?[0,1,2,0,-2,-3,-4,-3,-2,0,2,0][f%12]:happy?[0,0,-1,-3,-2,0][f%6]:moving?Math.round(Math.sin(phase)*1):0;
  const stride=moving?Math.round(Math.sin(phase)*4):0;
  const tilt=sad?2:sleep?1:Math.round(Math.sin(phase));
  let art='';
  // Shoes and independent opposing legs.
  for(const [x,dx] of [[19,stride],[28,-stride]]) {
    art+=line(x,35,x+dx,40,C.ink,3)+line(x+1,35,x+dx+1,40,C.red,1);
    art+=box(x+dx-3,40,9,4,C.ink)+box(x+dx-2,40,7,2,C.white)+box(x+dx-2,42,7,1,C.pink);
  }
  const hands=excited||happy?[[9,14],[36,12]]:action==='wave'?[[10,29],[36,10+(f%3)]]:thinking?[[10,29],[29,17]]:angry?[[11,25],[34,25]]:sad||sleep?[[12,33],[33,33]]:[[9,27-stride],[36,27+stride]];
  hands.forEach(([x,y],i)=>{art+=line(i?30:17,24,x+2,y+1,C.ink,3)+line(i?31:18,24,x+3,y+1,C.red,1)+glove(x,y);});
  // Base pairs sit between two continuous intertwined rails.
  for(let y=20;y<37;y+=4) art+=box(18,y,13,3,C.ink)+box(19,y,6,1,C.pink)+box(25,y,5,1,C.white);
  for(let y=17;y<37;y++) {
    const a=Math.round(24+8*Math.sin((y-17)/19*Math.PI*2));
    const b=48-a;
    art+=box(a-2,y,5,2,C.ink)+box(b-2,y,5,2,C.ink);
    art+=box(a-1,y,3,1,C.red)+box(b-1,y,3,1,C.white);
    art+=box(a-1,y,1,1,C.light);
  }
  // Pixel-cut upper helix loop doubles as his face.
  let face=box(17,5,15,15,C.ink)+box(14,8,21,9,C.ink)+box(16,7,17,11,C.red)+box(18,6,12,13,C.red);
  face+=box(16,8,5,8,C.white)+box(18,6,4,3,C.white)+box(15,10,3,5,C.silver)+box(29,7,2,3,C.light);
  const blink=sleep||(action==='idle'&&f===6);
  if(blink) face+=box(19,12,5,1,C.ink)+box(27,12,5,1,C.ink);
  else if(happy) face+=line(19,12,21,10,C.ink,1)+line(21,10,23,12,C.ink,1)+line(27,12,29,10,C.ink,1)+line(29,10,31,12,C.ink,1);
  else {
    for(const x of [19,27]) face+=box(x,8,5,7,C.ink)+box(x,8,4,6,C.white)+box(x+(thinking?1:2),10,2,4,C.ink)+box(x+2,10,1,1,C.white);
  }
  if(angry) face+=line(18,7,23,9,C.ink,2)+line(27,9,32,7,C.ink,2);
  if(sad) face+=line(18,8,23,6,C.ink,1)+line(27,6,32,8,C.ink,1);
  if(sad||angry) face+=box(24,16,5,1,C.ink)+box(23,17,1,1,C.ink)+box(29,17,1,1,C.ink);
  else if(excited||happy||action==='surprised'||action==='eat') face+=box(23,15,7,4,C.ink)+box(24,15,5,1,C.white)+box(25,18,3,1,C.pink);
  else face+=box(23,16,1,1,C.ink)+box(24,17,5,1,C.ink)+box(29,16,1,1,C.ink);
  art+=`<g transform="translate(${tilt} ${sad?2:0})">${face}</g>`;
  if(thinking) for(let i=0;i<3;i++) art+=box(20+i*5,1,2,2,i===f%3?C.red:C.silver);
  if(excited) art+=box(8,6,2,4,C.red)+box(5,9,3,2,C.pink)+box(38,4,2,4,C.red);
  if(sleep) art+='<path fill="'+C.pink+'" d="M36 2h7v2h-2v2h-2v2h4v2h-7V8h2V6h2V4h-4z"/>';
  const flip=facing<0?'translate(48 0) scale(-1 1)':'';
  return `<svg class="hal-rig" viewBox="0 0 48 48" width="96" height="96" shape-rendering="crispEdges" aria-hidden="true" focusable="false" data-action="${action}" data-frame="${f}">${box(13,45,24,1,C.silver)}<g transform="${flip}"><g transform="translate(${angry?f%2:0} ${hop})">${art}</g></g></svg>`;
}

