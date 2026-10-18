// Glass-render illustrations for the landing carousel. Pure SVG so they stay crisp and theme-aware.
const glow = id => `<filter id="${id}-glow" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="14" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter><filter id="${id}-soft"><feGaussianBlur stdDeviation="3"/></filter>`;
const redGlass = id => `<radialGradient id="${id}-red" cx="38%" cy="32%" r="75%"><stop offset="0" stop-color="#ffb3c0"/><stop offset=".22" stop-color="#ff4865"/><stop offset=".62" stop-color="#c8173a"/><stop offset="1" stop-color="#5e0718"/></radialGradient>`;
const chrome = id => `<linearGradient id="${id}-chrome" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fdfdfd"/><stop offset=".35" stop-color="#9ea3ab"/><stop offset=".55" stop-color="#ffffff"/><stop offset=".8" stop-color="#6f747c"/><stop offset="1" stop-color="#d8dbe0"/></linearGradient>`;
const clear = id => `<linearGradient id="${id}-clear" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".85"/><stop offset=".5" stop-color="#fff" stop-opacity=".18"/><stop offset="1" stop-color="#fff" stop-opacity=".55"/></linearGradient>`;
const shine = (d, o = .9) => `<path d="${d}" fill="#fff" opacity="${o}" filter="url(#__-soft)"/>`;

const ART = {
  stethoscope: id => `
    <path d="M70 40 C40 120 60 190 130 205 C200 220 230 160 215 90" fill="none" stroke="url(#${id}-chrome)" stroke-width="11" stroke-linecap="round"/>
    <path d="M215 90 C205 40 250 25 262 60" fill="none" stroke="url(#${id}-chrome)" stroke-width="9" stroke-linecap="round"/>
    <circle cx="70" cy="40" r="10" fill="url(#${id}-chrome)"/><circle cx="262" cy="60" r="9" fill="url(#${id}-chrome)"/>
    <path d="M130 205 C150 250 210 262 245 238" fill="none" stroke="#1d1e22" stroke-width="14" stroke-linecap="round"/>
    <path d="M130 205 C150 250 210 262 245 238" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="3" stroke-linecap="round" transform="translate(-2 -4)"/>
    <g filter="url(#${id}-glow)"><circle cx="268" cy="228" r="46" fill="url(#${id}-chrome)"/><circle cx="268" cy="228" r="34" fill="url(#${id}-red)"/></g>
    <ellipse cx="256" cy="214" rx="16" ry="9" fill="#fff" opacity=".85" transform="rotate(-30 256 214)" filter="url(#${id}-soft)"/>
    <circle cx="268" cy="228" r="34" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="1.5"/>`,
  heart: id => `
    <g filter="url(#${id}-glow)">
      <path d="M150 70 C150 40 175 22 200 30 L200 75 Z" fill="url(#${id}-red)" opacity=".9"/>
      <path d="M205 62 C210 30 240 22 258 38 C250 52 232 60 222 78 Z" fill="url(#${id}-red)" opacity=".75"/>
      <path d="M180 250 C110 215 60 170 70 115 C78 72 128 60 160 92 C190 58 248 66 262 112 C276 170 230 220 180 250 Z" fill="url(#${id}-red)"/>
    </g>
    <path d="M180 250 C110 215 60 170 70 115 C78 72 128 60 160 92 C190 58 248 66 262 112 C276 170 230 220 180 250 Z" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="1.5"/>
    <path d="M118 150 C130 170 150 190 178 208 M200 120 C214 150 214 180 200 205 M150 110 C160 130 166 150 162 175" fill="none" stroke="#ffd0d8" stroke-opacity=".55" stroke-width="2.5" stroke-linecap="round"/>
    <ellipse cx="112" cy="112" rx="26" ry="13" fill="#fff" opacity=".9" transform="rotate(-35 112 112)" filter="url(#${id}-soft)"/>
    <ellipse cx="236" cy="104" rx="10" ry="5" fill="#fff" opacity=".7" transform="rotate(30 236 104)" filter="url(#${id}-soft)"/>`,
  capsule: id => `
    <g transform="rotate(-38 180 150)" filter="url(#${id}-glow)">
      <path d="M110 110 h70 v80 h-70 a40 40 0 0 1 0 -80 z" fill="url(#${id}-red)"/>
      <path d="M180 110 h70 a40 40 0 0 1 0 80 h-70 z" fill="url(#${id}-clear)" stroke="#fff" stroke-opacity=".7" stroke-width="1.5"/>
      ${[[200,140],[214,165],[228,132],[240,160],[222,150],[205,170]].map(([x,y],i)=>`<circle cx="${x}" cy="${y}" r="${4+i%3}" fill="#ff5c78" opacity=".85"/>`).join('')}
      <rect x="84" y="122" width="150" height="10" rx="5" fill="#fff" opacity=".75" filter="url(#${id}-soft)"/>
    </g>`,
  dna: id => {
    let s = '';
    for (let i = 0; i <= 12; i++) {
      const y = 30 + i * 20, x1 = 180 + Math.sin(i * .6) * 70, x2 = 180 - Math.sin(i * .6) * 70, front = Math.cos(i * .6) > 0;
      s += `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="#fff" stroke-opacity=".5" stroke-width="2"/>`;
      s += `<circle cx="${x1}" cy="${y}" r="${front ? 11 : 8}" fill="url(#${id}-red)" opacity="${front ? 1 : .7}"/><circle cx="${x2}" cy="${y}" r="${front ? 8 : 11}" fill="url(#${id}-chrome)" opacity="${front ? .8 : 1}"/>`;
    }
    return `<g filter="url(#${id}-glow)" transform="rotate(-18 180 150)">${s}</g>`;
  },
  drop: id => `
    <g filter="url(#${id}-glow)"><path d="M180 40 C180 40 100 140 100 190 a80 80 0 0 0 160 0 C260 140 180 40 180 40 Z" fill="url(#${id}-red)"/></g>
    <path d="M180 40 C180 40 100 140 100 190 a80 80 0 0 0 160 0 C260 140 180 40 180 40 Z" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="1.5"/>
    <ellipse cx="140" cy="170" rx="13" ry="34" fill="#fff" opacity=".85" transform="rotate(20 140 170)" filter="url(#${id}-soft)"/>
    <ellipse cx="205" cy="232" rx="30" ry="8" fill="#fff" opacity=".35" filter="url(#${id}-soft)"/>`,
  cross: id => `
    <g filter="url(#${id}-glow)"><path d="M150 50 h60 v70 h70 v60 h-70 v70 h-60 v-70 h-70 v-60 h70 z" fill="url(#${id}-clear)" stroke="#fff" stroke-opacity=".8" stroke-width="1.5"/></g>
    <path class="ecg" d="M40 150 h90 l14 -36 l20 74 l18 -60 l12 22 h126" fill="none" stroke="#ff3c5c" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" filter="url(#${id}-glow)"/>
    <rect x="160" y="60" width="10" height="70" rx="5" fill="#fff" opacity=".8" filter="url(#${id}-soft)"/>`
};

export function glassArt(kind) {
  const id = 'art-' + kind;
  const body = ART[kind](id).replaceAll('__-soft', id + '-soft');
  return `<svg class="glass-art art-${kind}" viewBox="0 0 360 290" aria-hidden="true"><defs>${glow(id)}${redGlass(id)}${chrome(id)}${clear(id)}</defs>${body}</svg>`;
}
