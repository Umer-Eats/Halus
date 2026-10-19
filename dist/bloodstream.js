// Live-rendered stream of red blood cells for the landing hero.
// Each erythrocyte is shaded analytically from the Evans–Fung biconcave profile, tumbles as it
// travels, and is rendered with depth of field: a sharp focal plane, hazy far cells and large
// out-of-focus foreground cells. Flow is laminar (faster in the centre of the vessel) and
// parts gently around the pointer.

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
attribute vec2 aPos; attribute vec2 aUv; attribute vec4 aP;
uniform vec2 uRes;
varying vec2 vUv; varying vec4 vP;
void main(){ vUv = aUv; vP = aP; vec2 c = aPos / uRes * 2. - 1.; gl_Position = vec4(c.x, -c.y, 0., 1.); }`;

const CELL_FRAG = `
precision mediump float;
varying vec2 vUv; varying vec4 vP; // angle, squash, blur, fog
uniform float uDark;
float prof(float r){ float r2 = r*r; return sqrt(max(1. - r2, 0.)) * (.207 + 2.003*r2 - 1.123*r2*r2); }
void main(){
  float c = cos(vP.x), s = sin(vP.x);
  vec2 q = mat2(c, -s, s, c) * vUv;
  float sq = vP.y, blur = vP.z;
  vec2 p = vec2(q.x, q.y / sq);
  float r = length(p);
  float edge = .025 + blur * .55;
  float a = 1. - smoothstep(1. - edge * .4, 1. + edge, r);
  if (a < .004) discard;
  float rr = min(r, .999);
  float h = prof(rr) / .57;
  float dh = (prof(min(rr + .01, .999)) - prof(rr)) / .01;
  vec2 dir = r > .001 ? p / r : vec2(0.);
  vec3 n = normalize(vec3(-dir.x * dh * .45, -dir.y * dh * .45 * sq - (1. - sq) * .9, 1.));
  vec3 L = normalize(vec3(-.45, -.6, .65));
  float diff = clamp(dot(n, L), 0., 1.);
  float spec = pow(max(dot(reflect(-L, n), vec3(0., 0., 1.)), 0.), 22.);
  vec3 deep = vec3(.46, .025, .06), lite = vec3(.95, .3, .34);
  vec3 col = mix(deep, lite, clamp((1. - h) * .7 + diff * .38, 0., 1.));
  col *= .78 + .22 * sq;
  col += vec3(1., .62, .62) * spec * .5 * (1. - blur);
  col += vec3(1., .35, .4) * smoothstep(.7, 1., rr) * .1;
  col = mix(col, vec3(.8, .13, .18), clamp(blur * 1.25, 0., 1.));
  vec3 bg = mix(vec3(.95, .95, .945), vec3(.05, .055, .066), uDark);
  col = mix(col, bg, vP.w);
  a *= mix(1., .5, clamp(blur, 0., 1.));
  gl_FragColor = vec4(col * a, a);
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
  const loc = {bgA: gl.getAttribLocation(bgProg, 'a'), pos: gl.getAttribLocation(cellProg, 'aPos'), uv: gl.getAttribLocation(cellProg, 'aUv'), p: gl.getAttribLocation(cellProg, 'aP')};

  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const rand = (a, b) => a + Math.random() * (b - a);
  let W = 1, H = 1, dpr = 1, wide = true, frame = 0, last = performance.now(), clock = 0, visible = true;
  const mouse = {x: -9999, y: -9999};

  const spawn = (cell, anywhere) => {
    const fore = Math.random() < .07;
    cell.z = fore ? rand(1.15, 1.75) : rand(-1, 1);
    cell.lane = rand(-1, 1) * (fore ? 1.4 : 1);
    cell.s = anywhere ? rand(-.1, 1.1) : rand(-.2, -.1);
    cell.speed = rand(.8, 1.2);
    cell.phase = rand(0, Math.PI * 2); cell.spin = rand(.25, .9) * (Math.random() < .5 ? -1 : 1);
    cell.rot = rand(0, Math.PI); cell.drift = rand(-.15, .15);
    cell.ox = 0; cell.oy = 0;
    return cell;
  };
  let cells = [];
  const populate = () => { const n = wide ? 84 : 46; cells = Array.from({length: n}, () => spawn({}, true)); };

  const path = () => wide ? [.25, .2, .14] : [.27, .05, .11];
  const size = () => {
    dpr = Math.min(devicePixelRatio || 1, 1.75);
    W = canvas.clientWidth; H = canvas.clientHeight;
    canvas.width = Math.max(1, Math.round(W * dpr)); canvas.height = Math.max(1, Math.round(H * dpr));
    gl.viewport(0, 0, canvas.width, canvas.height);
    const nowWide = W / H > 1.1; if (nowWide !== wide || !cells.length) { wide = nowWide; populate(); }
  };

  const verts = new Float32Array(160 * 6 * 8);
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
      const xf = c.s * 1.3 - .15;
      const yc = base + slope * xf + .05 * Math.sin(xf * 4.2 + clock * .25);
      let x = xf * W, y = (yc + c.lane * half * Math.min(persp, 1.15)) * H;
      const dx = x - mouse.x, dy = y - mouse.y, dist = Math.hypot(dx, dy), R = 170;
      const push = dist < R ? Math.pow(1 - dist / R, 2) * 46 : 0;
      c.ox += ((dist ? dx / dist : 0) * push - c.ox) * .08; c.oy += ((dist ? dy / dist : 0) * push - c.oy) * .08;
      x += c.ox; y += c.oy;
      const rad = (wide ? .03 : .021) * H * persp, ext = rad * 1.35;
      const blur = Math.min(Math.abs(c.z - .12) * .5 + (c.z > 1.1 ? .35 : 0), 1);
      const fog = Math.max(0, Math.min((-c.z - .1) * .55, .6));
      const squash = .16 + .84 * Math.abs(Math.cos(c.phase));
      const corners = [[-1, -1], [1, -1], [1, 1], [-1, -1], [1, 1], [-1, 1]];
      for (const [u, v] of corners) {
        verts.set([(x + u * ext) * dpr, (y + v * ext) * dpr, u * 1.35, v * 1.35, c.rot, squash, blur, fog], i); i += 8;
      }
    }
    return i / 8;
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
    gl.bindBuffer(gl.ARRAY_BUFFER, cellBuf); gl.bufferData(gl.ARRAY_BUFFER, verts.subarray(0, count * 8), gl.DYNAMIC_DRAW);
    const F = 4;
    gl.enableVertexAttribArray(loc.pos); gl.vertexAttribPointer(loc.pos, 2, gl.FLOAT, false, 8 * F, 0);
    gl.enableVertexAttribArray(loc.uv); gl.vertexAttribPointer(loc.uv, 2, gl.FLOAT, false, 8 * F, 2 * F);
    gl.enableVertexAttribArray(loc.p); gl.vertexAttribPointer(loc.p, 4, gl.FLOAT, false, 8 * F, 4 * F);
    gl.uniform2f(cU('uRes'), canvas.width, canvas.height); gl.uniform1f(cU('uDark'), dark);
    gl.drawArrays(gl.TRIANGLES, 0, count);
    for (const l of [loc.pos, loc.uv, loc.p]) gl.disableVertexAttribArray(l);
  };

  const loop = now => {
    frame = requestAnimationFrame(loop);
    const dt = Math.min(now - last, 60) / 1000; last = now;
    if (!visible || document.hidden) return;
    if (!still) { clock += dt; step(dt); }
    draw();
  };
  const hero = canvas.closest('.hero') || canvas;
  const onMove = e => { const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; };
  const onLeave = () => { mouse.x = mouse.y = -9999; };
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
