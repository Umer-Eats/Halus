// Live-rendered stream of red blood cells for the landing hero.
// Each erythrocyte is shaded analytically from the Evans–Fung biconcave profile, tumbles as it
// travels, and is rendered with depth of field: a sharp focal plane, hazy far cells and large
// out-of-focus foreground cells. Flow is laminar (faster in the centre of the vessel) and
// yields to the pointer's path with a brief, fluid-like wake.

const BG_FRAG = `
precision mediump float;
uniform vec2 uRes; uniform float uTime; uniform float uDark; uniform vec3 uPath;
float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
void main(){
  vec2 f = gl_FragCoord.xy / uRes; f.y = 1. - f.y;
  vec3 hi = mix(vec3(.957,.957,.95), vec3(.062,.066,.076), uDark);
  vec3 lo = mix(vec3(.9,.905,.91), vec3(.034,.037,.044), uDark);
  vec3 col = mix(hi, lo, pow(f.y, 1.4));
  float yc = uPath.x + uPath.y * f.x + .05 * sin(f.x * 4.2 + uTime * .25);
  float d = (f.y - yc) / uPath.z;
  col += vec3(.85, .1, .16) * exp(-d*d*1.6) * mix(.045, .09, uDark);
  col = mix(col, mix(vec3(1.), vec3(.16,.05,.07), uDark), exp(-d*d*3.) * mix(.22, .25, uDark));
  col += (hash(gl_FragCoord.xy + fract(uTime)) - .5) * .014;
  gl_FragColor = vec4(col, 1.);
}`;

const CELL_VERT = `
attribute vec2 aPos; attribute vec2 aUv; attribute vec3 aAxis; attribute vec2 aP;
uniform vec2 uRes;
varying vec2 vUv; varying vec3 vAxis; varying vec2 vP;
void main(){ vUv = aUv; vAxis = aAxis; vP = aP; vec2 c = aPos / uRes * 2. - 1.; gl_Position = vec4(c.x, -c.y, 0., 1.); }`;

const CELL_FRAG = `
precision highp float;
varying vec2 vUv; varying vec3 vAxis; varying vec2 vP; // vP: blur, fog
uniform float uDark;
vec3 AX;
float smin(float a, float b, float k){ float h = clamp(.5 + .5*(b - a)/k, 0., 1.); return mix(b, a, h) - k*h*(1. - h); }
// Biconcave erythrocyte: a plump torus rim smoothly welded to a thin central membrane.
float sdCell(vec3 p){
  float y = dot(p, AX);
  float r = length(p - AX*y);
  float rim = length(vec2(r - .64, y)) - .34;
  float web = length(vec2(max(r - .64, 0.), y)) - .15;
  return smin(rim, web, .3);
}
vec3 nrm(vec3 p){
  const vec2 k = vec2(1., -1.); const float e = .002;
  return normalize(k.xyy*sdCell(p + k.xyy*e) + k.yyx*sdCell(p + k.yyx*e) + k.yxy*sdCell(p + k.yxy*e) + k.xxx*sdCell(p + k.xxx*e));
}
void main(){
  AX = normalize(vAxis);
  float blur = vP.x, fog = vP.y;
  vec3 ro = vec3(vUv.x, -vUv.y, 2.), rd = vec3(0., 0., -1.);
  float t = 0., minD = 1e3; bool hit = false;
  for (int i = 0; i < 40; i++) {
    float d = sdCell(ro + rd*t);
    minD = min(minD, d);
    if (d < .0015) { hit = true; break; }
    t += d;
    if (t > 4.) break;
  }
  float aa = .015 + blur * .5;
  float a = hit ? 1. : 1. - smoothstep(0., aa, minD);
  if (a < .004) discard;

  vec3 col;
  if (hit) {
    vec3 p = ro + rd*t;
    vec3 n = nrm(p);
    vec3 V = vec3(0., 0., 1.);
    vec3 L = normalize(vec3(-.5, .72, .62));
    // thickness along the view ray: thin centre glows, plump rim is deep red
    float th = 0.; vec3 q = p - n*.01;
    for (int i = 0; i < 12; i++) { float d = -sdCell(q); if (d < .002) break; float s = max(d, .02); q += rd*s; th += s; }
    float ao = .5 + .5*clamp(sdCell(p + n*.22) / .22, 0., 1.);
    float diff = clamp(dot(n, L)*.6 + .4, 0., 1.);
    float ndv = max(dot(n, V), 0.);
    float fres = pow(1. - ndv, 3.);
    vec3 H = normalize(L + V);
    float spec = pow(max(dot(n, H), 0.), 48.)*.75 + pow(max(dot(n, H), 0.), 8.)*.12;
    vec3 deep = vec3(.4, .015, .045), lite = vec3(.98, .34, .37);
    col = mix(lite, deep, 1. - exp(-th*1.5));
    col *= diff * ao;
    col += vec3(1., .26, .32) * fres * .35;
    col += vec3(1., .88, .88) * spec * (1. - blur*.8);
    col += vec3(.9, .1, .15) * pow(max(dot(-n, L), 0.), 2.) * .12;
  } else {
    col = vec3(.78, .1, .15);
  }
  col = mix(col, vec3(.78, .12, .17), clamp(blur*1.15, 0., 1.)*.85);
  vec3 bg = mix(vec3(.95, .95, .945), vec3(.05, .055, .066), uDark);
  col = mix(col, bg, fog);
  a *= mix(1., .5, clamp(blur, 0., 1.));
  gl_FragColor = vec4(col*a, a);
}`;

const VERT = 'attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}';

export function mountBloodstream(canvas) {
  const gl = canvas.getContext('webgl', {antialias: true, alpha: false, premultipliedAlpha: false, powerPreference: 'high-performance'});
  if (!gl) { canvas.closest('.hero')?.classList.add('no-webgl'); return () => {}; }
  const program = (vs, fs) => {
    const p = gl.createProgram();
    for (const [type, src] of [[gl.VERTEX_SHADER, vs], [gl.FRAGMENT_SHADER, fs]]) {
      const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
      gl.attachShader(p, s);
    }
    gl.linkProgram(p); return p;
  };
  let bgProg, cellProg;
  try { bgProg = program(VERT, BG_FRAG); cellProg = program(CELL_VERT, CELL_FRAG); }
  catch (err) { console.warn('Halus bloodstream disabled:', err.message); canvas.closest('.hero')?.classList.add('no-webgl'); return () => {}; }

  const triBuf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, triBuf); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const cellBuf = gl.createBuffer();
  const bgU = n => gl.getUniformLocation(bgProg, n), cU = n => gl.getUniformLocation(cellProg, n);
  const loc = {bgA: gl.getAttribLocation(bgProg, 'a'), pos: gl.getAttribLocation(cellProg, 'aPos'), uv: gl.getAttribLocation(cellProg, 'aUv'), axis: gl.getAttribLocation(cellProg, 'aAxis'), p: gl.getAttribLocation(cellProg, 'aP')};

  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const rand = (a, b) => a + Math.random() * (b - a);
  let W = 1, H = 1, dpr = 1, maxDpr = Math.min(devicePixelRatio || 1, 1.75), slow = 0, wide = true, frame = 0, last = performance.now(), clock = 0, visible = true;
  const mouse = {x: -9999, y: -9999, lastMove: 0};

  const spawn = (cell, anywhere) => {
    const fore = Math.random() < .07;
    cell.z = fore ? rand(1.15, 1.75) : rand(-1, 1);
    cell.lane = rand(-1, 1) * (fore ? 1.4 : 1);
    cell.s = anywhere ? rand(-.1, 1.1) : rand(-.2, -.1);
    cell.speed = rand(.8, 1.2);
    cell.phase = rand(0, Math.PI * 2); cell.spin = rand(.2, .7) * (Math.random() < .5 ? -1 : 1);
    cell.rot = rand(0, Math.PI); cell.drift = rand(-.15, .15);
    cell.ox = 0; cell.oy = 0; cell.vx = 0; cell.vy = 0;
    return cell;
  };
  let cells = [];
  const populate = () => { const n = wide ? 84 : 46; cells = Array.from({length: n}, () => spawn({}, true)); };

  const path = () => wide ? [.25, .2, .14] : [.27, .05, .11];
  const size = () => {
    dpr = maxDpr;
    W = canvas.clientWidth; H = canvas.clientHeight;
    canvas.width = Math.max(1, Math.round(W * dpr)); canvas.height = Math.max(1, Math.round(H * dpr));
    gl.viewport(0, 0, canvas.width, canvas.height);
    const nowWide = W / H > 1.1; if (nowWide !== wide || !cells.length) { wide = nowWide; populate(); }
  };

  const STRIDE = 9;
  const verts = new Float32Array(160 * 6 * STRIDE);
  const cellPosition = (c, base, slope, half) => {
    const persp = 1 / (1.25 - c.z * .5);
    const xf = c.s * 1.3 - .15;
    const yc = base + slope * xf + .05 * Math.sin(xf * 4.2 + clock * .25);
    return [xf * W, (yc + c.lane * half * Math.min(persp, 1.15)) * H];
  };
  const step = dt => {
    const [base, slope, half] = path();
    for (const c of cells) {
      const persp = 1 / (1.25 - c.z * .5);
      c.s += (.035 * c.speed * (1 - .55 * Math.min(c.lane * c.lane, 1)) * persp) * dt;
      c.phase += c.spin * dt; c.rot += c.drift * dt;
      if (c.s > 1.18) spawn(c, false);
    }
    cells.sort((a, b) => a.z - b.z);
    let i = 0;
    for (const c of cells) {
      const persp = 1 / (1.25 - c.z * .5);
      let [x, y] = cellPosition(c, base, slope, half);
      if (dt > 0) {
        // Cells keep their momentum after a stroke, then ease back into their flow lane.
        c.vx -= c.ox * 15 * dt; c.vy -= c.oy * 15 * dt;
        const drag = Math.exp(-dt * 4.5);
        c.vx *= drag; c.vy *= drag;
        c.ox += c.vx * dt; c.oy += c.vy * dt;
      }
      x += c.ox; y += c.oy;
      const rad = (wide ? .03 : .021) * H * persp, ext = rad * 1.35;
      const blur = Math.min(Math.abs(c.z - .12) * .5 + (c.z > 1.1 ? .35 : 0), 1);
      const fog = Math.max(0, Math.min((-c.z - .1) * .55, .6));
      const st = Math.sin(c.phase), ax = st * Math.cos(c.rot), ay = st * Math.sin(c.rot), az = Math.cos(c.phase);
      const corners = [[-1, -1], [1, -1], [1, 1], [-1, -1], [1, 1], [-1, 1]];
      for (const [u, v] of corners) {
        verts.set([(x + u * ext) * dpr, (y + v * ext) * dpr, u * 1.35, v * 1.35, ax, ay, az, blur, fog], i); i += STRIDE;
      }
    }
    return i / STRIDE;
  };

  const draw = () => {
    const dark = document.documentElement.dataset.theme === 'dark' ? 1 : 0;
    gl.disable(gl.BLEND);
    gl.useProgram(bgProg);
    gl.bindBuffer(gl.ARRAY_BUFFER, triBuf);
    gl.enableVertexAttribArray(loc.bgA); gl.vertexAttribPointer(loc.bgA, 2, gl.FLOAT, false, 0, 0);
    gl.uniform2f(bgU('uRes'), canvas.width, canvas.height); gl.uniform1f(bgU('uTime'), clock); gl.uniform1f(bgU('uDark'), dark);
    gl.uniform3f(bgU('uPath'), ...path());
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    gl.disableVertexAttribArray(loc.bgA);

    const count = step(0);
    gl.useProgram(cellProg);
    gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.bindBuffer(gl.ARRAY_BUFFER, cellBuf); gl.bufferData(gl.ARRAY_BUFFER, verts.subarray(0, count * STRIDE), gl.DYNAMIC_DRAW);
    const F = 4;
    gl.enableVertexAttribArray(loc.pos); gl.vertexAttribPointer(loc.pos, 2, gl.FLOAT, false, STRIDE * F, 0);
    gl.enableVertexAttribArray(loc.uv); gl.vertexAttribPointer(loc.uv, 2, gl.FLOAT, false, STRIDE * F, 2 * F);
    gl.enableVertexAttribArray(loc.axis); gl.vertexAttribPointer(loc.axis, 3, gl.FLOAT, false, STRIDE * F, 4 * F);
    gl.enableVertexAttribArray(loc.p); gl.vertexAttribPointer(loc.p, 2, gl.FLOAT, false, STRIDE * F, 7 * F);
    gl.uniform2f(cU('uRes'), canvas.width, canvas.height); gl.uniform1f(cU('uDark'), dark);
    gl.drawArrays(gl.TRIANGLES, 0, count);
    for (const l of [loc.pos, loc.uv, loc.axis, loc.p]) gl.disableVertexAttribArray(l);
  };

  const loop = now => {
    frame = requestAnimationFrame(loop);
    const dt = Math.min(now - last, 60) / 1000; last = now;
    if (!visible || document.hidden) return;
    if (!still) {
      clock += dt;
      step(dt);
    }
    draw();
    if (clock > 2 && dt > .028) { if (++slow > 45 && maxDpr > .75) { maxDpr = Math.max(.75, maxDpr - .25); size(); slow = 0; } } else slow = Math.max(0, slow - 1);
  };
  const hero = canvas.closest('.hero') || canvas;
  const onMove = e => {
    const r = canvas.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top, now = performance.now();
    if (!still && mouse.lastMove && now - mouse.lastMove < 100) {
      const dx = x - mouse.x, dy = y - mouse.y, distance = Math.hypot(dx, dy);
      if (distance > 1) {
        const ux = dx / distance, uy = dy / distance;
        const reach = Math.min(135, H * .23), stroke = Math.min(distance, 45);
        const [base, slope, half] = path();
        for (const c of cells) {
          const [cx, cy] = cellPosition(c, base, slope, half);
          const px = cx + c.ox - mouse.x, py = cy + c.oy - mouse.y;
          const along = Math.max(0, Math.min(distance, px * ux + py * uy));
          const sideX = px - along * ux, sideY = py - along * uy;
          const separation = Math.hypot(sideX, sideY);
          if (separation >= reach) continue;
          // A moving pointer opens a wake on both sides of its path. It never
          // attracts cells to an orbit or keeps pushing once it stops.
          const side = ux * sideY - uy * sideX < 0 ? -1 : 1;
          const falloff = Math.pow(1 - separation / reach, 2);
          const depth = 1 / (1 + Math.abs(c.z) * .5);
          const impulse = stroke * 18 * falloff * depth;
          c.vx = Math.max(-480, Math.min(480, c.vx + (-uy * side + ux * .22) * impulse));
          c.vy = Math.max(-480, Math.min(480, c.vy + (ux * side + uy * .22) * impulse));
        }
      }
    }
    mouse.x = x; mouse.y = y; mouse.lastMove = now;
  };
  const onLeave = () => { mouse.x = mouse.y = -9999; mouse.lastMove = 0; };
  hero.addEventListener('pointermove', onMove, {passive: true}); hero.addEventListener('pointerleave', onLeave);
  const ro = new ResizeObserver(() => { size(); draw(); }); ro.observe(canvas);
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }); io.observe(canvas);
  size(); draw(); frame = requestAnimationFrame(loop);
  requestAnimationFrame(() => canvas.classList.add('ready'));

  return () => {
    cancelAnimationFrame(frame); ro.disconnect(); io.disconnect();
    hero.removeEventListener('pointermove', onMove); hero.removeEventListener('pointerleave', onLeave);
    gl.getExtension('WEBGL_lose_context')?.loseContext();
  };
}
