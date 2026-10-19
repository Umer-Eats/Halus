// Hal, drawn as a single cranberry pixel silhouette around a small silver medical staff.
import {halPose} from './hal-motion.js';

const OUTLINE = '#22080f';
const SKIN = {
  calm: {body: '#e0213f', light: '#ff4a62', shade: '#a3132c'},
  angry: {body: '#b70f2c', light: '#e2344d', shade: '#760a1d'},
};
const r = n => Math.round(n * 100) / 100;
const rects = (list, fill, extra = '') => `<path fill="${fill}"${extra} d="${list.map(([x, y, w, h]) => `M${r(x)} ${r(y)}h${w}v${h}h-${w}z`).join('')}"/>`;
const shift = (list, dx) => list.map(([x, y, w, h]) => [x + dx, y, w, h]);

// A rounded pixel band: the building block for every coil, the neck, the head and the tail.
function band(x, y, w, h) {
  x = r(x); y = r(y);
  // Bigger shapes get softer stair-stepped corners, so the head reads round like the original.
  const c = w >= 12 && h >= 11 ? 3 : h >= 6 && w >= 4 ? 2 : 1;
  return `M${x + c} ${y}h${w - 2 * c}${'v1h1'.repeat(c)}v${h - 2 * c}${'h-1v1'.repeat(c)}h-${w - 2 * c}${'v-1h-1'.repeat(c)}v-${h - 2 * c}${'h1v-1'.repeat(c)}z`;
}
function coil(x, y, w, h, skin) {
  let out = `<path fill="${OUTLINE}" d="${band(x, y, w, h)}"/><path fill="${skin.body}" d="${band(x + 1, y + 1, w - 2, h - 2)}"/>`;
  if (w >= 7) out += rects([[x + 3, y + 1, w - 6, 1]], skin.light) + rects([[x + 3, y + h - 2, w - 6, 1]], skin.shade);
  return out;
}

const EYES = {
  open: {whites: [[23, 10, 4, 5]], pupils: [[25, 11, 2, 4]], shine: [[25, 11, 1, 1]]},
  up: {whites: [[23, 10, 4, 5]], pupils: [[25, 10, 2, 3]], shine: [[25, 10, 1, 1]]},
  small: {whites: [[23, 10, 4, 5]], pupils: [[24, 12, 2, 2]], shine: []},
};
const both = list => [...list, ...shift(list, 8)];

/** Returns Hal's SVG markup for one moment of an action. Facing < 0 mirrors him to look left. */
export function halSVG({action = 'idle', seconds = 0, facing = 1} = {}) {
  const {frame: f, bounce, stride, sway, drift, thoughts} = halPose(action, seconds);
  const angry = action === 'angry', joy = action === 'happy', sad = action === 'sad';
  const sleep = action === 'sleep', eat = action === 'eat', think = action === 'thinking';
  const surprised = action === 'surprised', moving = action === 'walk' || action === 'run';
  const skin = angry ? SKIN.angry : SKIN.calm;
  const head = stride * 0.6, droop = sleep ? 3 : sad ? 2 : 0;
  let snake = '';

  // Back to front: tail, bottom coil, neck, middle coil, head.
  const tail = action === 'wave' || joy
    ? `<g transform="translate(${r(sway * 2 - 1)} ${r(sway * 2)})">${coil(38, 18, 6, 18, skin)}</g>`
    : coil(35 + stride, 34, 10, 6, skin) + `<g transform="translate(0 ${r(-sway)})">${coil(41 + stride, 29, 4, 7, skin)}</g>`;
  snake += coil(5 + stride, 35, 36, 9, skin) + tail;
  snake += `<g transform="translate(${r(head)} ${r(bounce * 0.5)})">${coil(13, 18, 10, 15, skin)}</g>`;
  snake += coil(9 - stride, 28, 28, 8, skin);

  let face = coil(16, 7, 24, 13, skin), eyes = '';
  const blink = sleep || (action === 'idle' && f === 6);
  if (blink) eyes += rects(both([[22, 13, 6, 1]]), OUTLINE);
  else if (joy) eyes += rects(both([[22, 14, 1, 2], [23, 13, 1, 1], [24, 12, 2, 1], [26, 13, 1, 1], [27, 14, 1, 2]]), OUTLINE);
  else {
    const eye = think ? EYES.up : surprised ? EYES.small : EYES.open;
    eyes += rects(both([[22, 9, 6, 7]]), OUTLINE) + rects(both(eye.whites), '#fff') + rects(both(eye.pupils), OUTLINE) + rects(both(eye.shine), '#fff');
  }
  if (angry) eyes += rects([[22, 8, 2, 1], [24, 9, 2, 1], [26, 10, 2, 1], [30, 10, 2, 1], [32, 9, 2, 1], [34, 8, 2, 1]], OUTLINE);
  if (sad) eyes += rects([[22, 10, 2, 1], [24, 9, 2, 1], [26, 8, 2, 1], [30, 8, 2, 1], [32, 9, 2, 1], [34, 10, 2, 1]], OUTLINE)
    + rects([[35, 16 + drift, 1, 2]], '#63c6ee');
  // Eyes sit forward on the head, toward the snout, like the original art.
  face += `<g transform="translate(2 0)">${eyes}</g>` + rects([[39, 13, 1, 1]], OUTLINE);
  if ((eat && f % 2) || surprised) face += rects([[33, 16, 4, 3]], OUTLINE) + rects([[34, 17, 2, 1]], '#7a0a1c');
  else if (sad) face += rects([[32, 18, 1, 1], [33, 17, 4, 1], [37, 18, 1, 1]], OUTLINE);
  else face += rects([[32, 17, 1, 1], [33, 18, 4, 1], [37, 17, 1, 1]], OUTLINE);
  // A forked tongue flick while idling or slithering.
  if (!eat && !sleep && !sad && ((action === 'idle' && (f === 2 || f === 3)) || (moving && f % 4 < 2)))
    face += rects([[40, 16, 3, 1], [43, 15, 1, 1], [43, 17, 1, 1]], '#ff6f8a');
  if (eat) face += `<g transform="translate(0 ${r(sway)})">${rects([[40, 16, 6, 5]], OUTLINE)}${rects([[41, 17, 4, 3]], '#7cc35a')}${rects([[41, 17, 1, 1]], '#c8f0a8')}${rects([[43, 14, 1, 2]], '#6b3a1f')}${rects([[44, 14, 2, 1]], '#3f9a3a')}</g>`;
  snake += `<g transform="translate(${r(head)} ${r(bounce + droop)})">${face}</g>`;

  const flip = facing < 0 ? ' transform="translate(48 0) scale(-1 1)"' : '';
  const shake = angry ? ` transform="translate(${r(sway - 0.5)} 0)"` : '';
  let fx = '';
  if (joy) fx += `<g fill="${f % 2 ? '#ffe79c' : '#f6b84e'}"><path d="M5 4h2v3h3v2H7v3H5V9H2V7h3zM43 22h2v3h3v2h-3v3h-2v-3h-3v-2h3z"/><path d="M${r(34 + drift)} 2h2v2h-2zM6 22h2v2H6z"/></g>`;
  if (think) fx += thoughts.map((o, i) => `<rect fill="#c81d3a" x="${18 + i * 5}" y="1" width="3" height="3" opacity="${r(o)}"/>`).join('');
  if (angry) fx += '<path fill="#f16f7d" d="M41 1h2v3h3v2h-5zM44 8h2v4h-4v-2h2z"/>';
  if (sleep) fx += `<path transform="translate(0 ${r(-drift)})" fill="#8f97a3" d="M38 0h7v2h-2v2h-2v2h4v2h-7V6h2V4h2V2h-4z"/>`;
  if (surprised) fx += '<path fill="#f6b84e" d="M43 0h2v5h-2zM43 6h2v2h-2z"/>';

  return `<svg class="hal-rig" viewBox="0 0 48 48" width="96" height="96" shape-rendering="crispEdges" aria-hidden="true" focusable="false" data-action="${action}" data-frame="${f}">`
    + '<path fill="#22080f" opacity=".16" d="M8 44h32v2H8z"/>'
    + '<path fill="#707985" d="M10 5h2v34h-2zM8 5h6v2H8zM8 39h6v2H8z"/><path fill="#d8dfe5" d="M10 6h1v32h-1z"/>'
    + `<g${shake}><g${flip}>${snake}</g></g>${fx}</svg>`;
}
