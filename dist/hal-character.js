// Hal's sprite is generated on one shared 48px grid with a fixed ground line.
// The palette and silhouette stay consistent across every animation frame.
import {HAL_CLIPS, halPose} from './hal-motion.js';

const W = 48, H = 48;
const COLOR = {outline: '#291019', body: '#cc2845', light: '#ef5268', shade: '#98203a', white: '#fff8f3', pupil: '#24131b', blush: '#f77e8d', tear: '#91d3ef', gold: '#ffd58a'};
const index = (x, y) => y * W + x;
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

function dot(mask, cx, cy, radius) {
  for (let y = Math.max(0, Math.floor(cy - radius)); y <= Math.min(H - 1, Math.ceil(cy + radius)); y++)
    for (let x = Math.max(0, Math.floor(cx - radius)); x <= Math.min(W - 1, Math.ceil(cx + radius)); x++)
      if ((x - cx) ** 2 + (y - cy) ** 2 <= radius ** 2) mask[index(x, y)] = 1;
}
function curve(mask, points, radius) {
  // Samples a cubic spine, then stamps overlapping disks into one connected body.
  for (let j = 0; j + 3 < points.length; j += 3) {
    const [a, b, c, d] = points.slice(j, j + 4);
    for (let i = 0; i <= 80; i++) {
      const t = i / 80, u = 1 - t;
      const x = u ** 3 * a[0] + 3 * u ** 2 * t * b[0] + 3 * u * t ** 2 * c[0] + t ** 3 * d[0];
      const y = u ** 3 * a[1] + 3 * u ** 2 * t * b[1] + 3 * u * t ** 2 * c[1] + t ** 3 * d[1];
      dot(mask, Math.round(x), Math.round(y), radius);
    }
  }
}
function fill(mask, x0, y0, x1, y1) {
  for (let y = clamp(y0, 0, H - 1); y <= clamp(y1, 0, H - 1); y++)
    for (let x = clamp(x0, 0, W - 1); x <= clamp(x1, 0, W - 1); x++) mask[index(x, y)] = 1;
}
function runs(pixels, color) {
  let d = '';
  for (let y = 0; y < H; y++) for (let x = 0; x < W;) {
    if (pixels[index(x, y)] !== color) { x++; continue; }
    const start = x;
    while (x < W && pixels[index(x, y)] === color) x++;
    d += `M${start} ${y}h${x - start}v1H${start}z`;
  }
  return d ? `<path fill="${COLOR[color]}" d="${d}"/>` : '';
}
function paint(pixels, x, y, w, h, color) {
  for (let yy = y; yy < y + h; yy++) for (let xx = x; xx < x + w; xx++)
    if (xx >= 0 && xx < W && yy >= 0 && yy < H) pixels[index(xx, yy)] = color;
}

/** A complete pixel frame. Every state uses the same centered 48px canvas and y=44 baseline. */
function renderFrame(action, seconds, facing) {
  const pose = halPose(action, seconds);
  const moving = action === 'slither' || action === 'dash';
  const mask = new Uint8Array(W * H);
  const wave = moving ? Math.round(pose.stride * 1.4) : 0;
  const bob = action === 'happy' ? Math.round(pose.bounce)
    : action === 'wave' ? Math.round(pose.bounce * .7)
    : action === 'sad' ? 2 + (pose.frame % 3 === 2 ? 1 : 0)
    : action === 'angry' ? (pose.frame % 2 ? -1 : 0)
    : action === 'surprised' ? (pose.frame % 2 ? -2 : -1) : 0;
  if (moving) curve(mask, [[7, 38], [13 + wave, 41], [29 - wave, 42], [27, 34],
    [25, 27], [13 + wave, 31], [16, 23], [18, 16], [27 - wave, 17], [32, 18]], 4.5);
  else curve(mask, [[37, 36], [34, 41], [9, 41], [9, 30], [9, 20], [32, 20], [33, 30],
    [34, 36], [18, 36], [18, 28], [18, 20], [23, 17], [32, 18]], 3.4);
  // The head overlaps the neck mask, so it remains one silhouette.
  fill(mask, 25, 11 + bob, 39, 22 + bob);
  fill(mask, 23, 13 + bob, 42, 20 + bob);
  fill(mask, 28, 9 + bob, 38, 23 + bob);
  const pixels = Array(W * H).fill('');
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const i = index(x, y);
    if (mask[i]) pixels[i] = 'body';
    else if ([-1, 0, 1].some(dy => [-1, 0, 1].some(dx => dx || dy ? mask[index(clamp(x + dx, 0, W - 1), clamp(y + dy, 0, H - 1))] : false))) pixels[i] = 'outline';
  }
  // One palette for all frames; highlights follow the upper edge of the same body mask.
  for (let y = 2; y < 43; y++) for (let x = 2; x < 46; x++) {
    const i = index(x, y);
    if (pixels[i] !== 'body') continue;
    if (!mask[index(x, y - 1)] && x % 3 !== 0) pixels[i] = 'light';
    else if (!mask[index(x, y + 1)] && x % 4 !== 0) pixels[i] = 'shade';
  }
  if (action === 'angry') {
    for (let i = 0; i < pixels.length; i++) if (pixels[i] === 'body') pixels[i] = 'shade';
  }
  const eyeY = 12 + bob;
  const blink = action === 'sleep' || action === 'idle' && pose.frame === 6;
  if (blink) { paint(pixels, 28, eyeY + 3, 4, 1, 'outline'); paint(pixels, 36, eyeY + 3, 4, 1, 'outline'); }
  else if (action === 'happy') {
    paint(pixels, 28, eyeY + 3, 1, 2, 'outline'); paint(pixels, 29, eyeY + 2, 2, 1, 'outline'); paint(pixels, 31, eyeY + 3, 1, 2, 'outline');
    paint(pixels, 36, eyeY + 3, 1, 2, 'outline'); paint(pixels, 37, eyeY + 2, 2, 1, 'outline'); paint(pixels, 39, eyeY + 3, 1, 2, 'outline');
  } else {
    paint(pixels, 27, eyeY, 5, 6, 'white'); paint(pixels, 35, eyeY, 5, 6, 'white');
    paint(pixels, action === 'thinking' ? 28 : 30, eyeY + 2, 2, 3, 'pupil');
    paint(pixels, action === 'thinking' ? 36 : 38, eyeY + 2, 2, 3, 'pupil');
  }
  if (action === 'angry') { paint(pixels, 27, eyeY - 1, 3, 1, 'outline'); paint(pixels, 37, eyeY - 1, 3, 1, 'outline'); }
  if (action === 'sad') paint(pixels, 40, eyeY + 6 + Math.round(pose.drift / 2), 2, 2, 'tear');
  if (action === 'surprised' || action === 'eat' && pose.frame % 2) paint(pixels, 37, 20 + bob, 3, 3, 'pupil');
  else if (action === 'sad') paint(pixels, 36, 21 + bob, 4, 1, 'outline');
  else { paint(pixels, 36, 21 + bob, 4, 1, 'outline'); paint(pixels, 36, 20 + bob, 1, 1, 'outline'); }
  if (action === 'wave' || action === 'happy') paint(pixels, 41, 17 + bob, 2 + Math.round(pose.sway), 1, 'blush');
  const order = ['outline', 'shade', 'body', 'light', 'white', 'pupil', 'blush', 'tear'];
  const flip = facing < 0 ? ' transform="translate(48 0) scale(-1 1)"' : '';
  const effects = action === 'thinking' ? pose.thoughts.map((v, i) => `<rect x="${12 + i * 5}" y="${8 - i * 2}" width="3" height="3" fill="${COLOR.blush}" opacity="${Math.round(v * 100) / 100}"/>`).join('')
    : action === 'happy' ? `<path fill="${COLOR.gold}" d="M5 6h2v3h3v2H7v3H5v-3H2V9h3z"/>`
    : action === 'sleep' ? `<path fill="${COLOR.white}" opacity="${Math.round((.55 + pose.drift * .2) * 100) / 100}" d="M40 ${2 - Math.round(pose.drift / 2)}h6v2h-3v2h3v2h-6V6h3V4h-3z"/>`
    : action === 'surprised' ? `<path fill="${COLOR.gold}" d="M18 3h2v6h-2zm0 8h2v2h-2z"/>` : '';
  return `<svg class="hal-rig" viewBox="0 0 48 48" width="96" height="96" shape-rendering="crispEdges" aria-hidden="true" focusable="false" data-action="${action}" data-frame="${pose.frame}"><g${flip}>${order.map(c => runs(pixels, c)).join('')}${effects}</g></svg>`;
}

const frameCache = new Map();
export function halSVG({action = 'idle', seconds = 0, facing = 1} = {}) {
  const clip = HAL_CLIPS[action] ?? HAL_CLIPS.idle;
  const frame = Math.floor(Math.max(0, seconds) * clip.fps) % clip.frames;
  const direction = facing < 0 ? -1 : 1;
  const key = `${action}:${frame}:${direction}`;
  if (!frameCache.has(key)) frameCache.set(key, renderFrame(action, frame / clip.fps, direction));
  return frameCache.get(key);
}
