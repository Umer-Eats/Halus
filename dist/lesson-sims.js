// Simulations used inside lessons. Every model is a simplified teaching model with invented
// values: it shows relationships, never patient-specific numbers.
const e = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const fmt = (v, d = 1) => Number.isFinite(v) ? Number(v.toFixed(d)).toLocaleString() : '—';
const reduced = () => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
const NOTE = '<p class="lw-note">Simplified teaching model with invented values. It shows relationships, not clinical doses or real patient numbers.</p>';

/* ---------- small SVG line chart ---------- */
function chart(o) {
  const W = o.w || 640, H = o.h || 270, pl = 54, pr = 14, pt = 14, pb = 42;
  const lx = v => Math.log10(v);
  const sx = x => pl + (o.logx ? (lx(x) - lx(o.x[0])) / (lx(o.x[1]) - lx(o.x[0])) : (x - o.x[0]) / (o.x[1] - o.x[0])) * (W - pl - pr);
  const sy = y => H - pb - (clamp(y, o.y[0], o.y[1]) - o.y[0]) / (o.y[1] - o.y[0]) * (H - pt - pb);
  const bands = (o.bands || []).map(b => `<rect class="${b.cls || 'band'}" x="${pl}" width="${W - pl - pr}" y="${sy(b.to)}" height="${Math.max(0, sy(b.from) - sy(b.to))}"/>${b.label ? `<text class="band-label" x="${W - pr - 4}" y="${sy(b.to) + 12}" text-anchor="end">${e(b.label)}</text>` : ''}`).join('');
  const lines = (o.hlines || []).map(h => `<line class="${h.cls || 'hline'}" x1="${pl}" x2="${W - pr}" y1="${sy(h.y)}" y2="${sy(h.y)}"/>${h.label ? `<text class="band-label" x="${pl + 4}" y="${sy(h.y) - 4}">${e(h.label)}</text>` : ''}`).join('');
  const vlines = (o.vlines || []).map(v => `<line class="${v.cls || 'vline'}" y1="${pt}" y2="${H - pb}" x1="${sx(v.x)}" x2="${sx(v.x)}"/>${v.label ? `<text class="band-label" x="${sx(v.x) + 3}" y="${pt + 11}">${e(v.label)}</text>` : ''}`).join('');
  const xt = (o.xticks || []).map(x => `<line class="tick" x1="${sx(x)}" x2="${sx(x)}" y1="${H - pb}" y2="${H - pb + 4}"/><text x="${sx(x)}" y="${H - pb + 17}" text-anchor="middle">${e(o.xfmt ? o.xfmt(x) : x)}</text>`).join('');
  const yt = (o.yticks || []).map(y => `<line class="grid" x1="${pl}" x2="${W - pr}" y1="${sy(y)}" y2="${sy(y)}"/><text x="${pl - 7}" y="${sy(y) + 4}" text-anchor="end">${e(y)}</text>`).join('');
  const series = (o.series || []).map(s => s.points.length ? `<path class="${s.cls || 'line'}" d="${s.points.map(([x, y], i) => (i ? 'L' : 'M') + sx(x).toFixed(1) + ' ' + sy(y).toFixed(1)).join('')}"/>` : '').join('');
  const dots = (o.dots || []).map(d => `<circle class="${d.cls || 'dot'}" cx="${sx(d.x)}" cy="${sy(d.y)}" r="${d.r || 4}"/>`).join('');
  return `<svg class="lw-chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${e(o.label || 'Chart')}">${yt}${bands}${lines}${vlines}<line class="axis" x1="${pl}" x2="${W - pr}" y1="${H - pb}" y2="${H - pb}"/><line class="axis" x1="${pl}" x2="${pl}" y1="${pt}" y2="${H - pb}"/>${xt}${series}${dots}<text class="axis-label" x="${(W + pl) / 2}" y="${H - 6}" text-anchor="middle">${e(o.xlabel || '')}</text><text class="axis-label" transform="translate(13 ${(H - pb + pt) / 2}) rotate(-90)" text-anchor="middle">${e(o.ylabel || '')}</text></svg>`;
}
const slider = (name, labelText, min, max, step, value, unit = '') => `<label class="lw-slider"><span>${e(labelText)} <output data-out="${name}">${value}${unit}</output></span><input type="range" name="${name}" min="${min}" max="${max}" step="${step}" value="${value}" data-unit="${e(unit)}"></label>`;
const read = node => { const v = {}; node.querySelectorAll('input[type=range],select,input[type=number]').forEach(i => { v[i.name] = i.type === 'range' || i.type === 'number' ? Number(i.value) : i.value; }); node.querySelectorAll('input[type=checkbox]').forEach(i => { v[i.name] = i.checked; }); node.querySelectorAll('[data-out]').forEach(o => { const i = node.querySelector(`[name="${o.dataset.out}"]`); if (i) o.textContent = i.value + (i.dataset.unit || ''); }); return v; };
const live = (node, draw) => { node.addEventListener('input', draw); node.addEventListener('change', draw); draw(); };

/* ---------- pharmacokinetics: repeated dosing ---------- */
const pk = {
  label: 'Pharmacokinetics simulator',
  render: () => `<div class="lw-sim"><div class="lw-controls">${slider('dose', 'Dose', 100, 1000, 50, 400, ' mg')}${slider('tau', 'Dosing interval', 4, 24, 2, 8, ' h')}${slider('half', 'Half-life', 2, 24, 1, 6, ' h')}<label class="lw-select">Route<select name="route"><option value="iv">IV bolus (bioavailability 100%)</option><option value="oral">Oral tablet (bioavailability 70%)</option></select></label><label class="lw-check"><input type="checkbox" name="load"> Give a loading dose (first dose doubled)</label><label class="lw-check"><input type="checkbox" name="renal"> Kidney function falls by half (clearance halves)</label></div><div class="lw-out"><div data-chart></div><div class="lw-stats" data-stats></div><p class="lw-explain" data-explain aria-live="polite"></p></div></div>${NOTE}`,
  mount(node) {
    const Vd = 50, MEC = 5, MTC = 15, ka = 1.1, H = 96;
    live(node, () => {
      const v = read(node), half = v.renal ? v.half * 2 : v.half, k = Math.LN2 / half, F = v.route === 'iv' ? 1 : 0.7;
      const doses = []; for (let t = 0; t < H; t += v.tau) doses.push([t, t === 0 && v.load ? v.dose * 2 : v.dose]);
      const C = t => doses.reduce((s, [td, d]) => { if (t < td) return s; const dt = t - td; return s + (v.route === 'iv' ? F * d / Vd * Math.exp(-k * dt) : F * d * ka / (Vd * (ka - k)) * (Math.exp(-k * dt) - Math.exp(-ka * dt))); }, 0);
      const pts = []; for (let t = 0; t <= H; t += 0.25) pts.push([t, C(t)]);
      const last = pts.filter(([t]) => t >= H - v.tau), peak = Math.max(...last.map(p => p[1])), trough = Math.min(...last.map(p => p[1]));
      const inWindow = pts.filter(([t, c]) => t >= 24 && c >= MEC && c <= MTC).length / pts.filter(([t]) => t >= 24).length;
      const ymax = Math.max(25, Math.ceil(Math.max(...pts.map(p => p[1])) / 5) * 5);
      node.querySelector('[data-chart]').innerHTML = chart({ x: [0, H], y: [0, ymax], xticks: [0, 12, 24, 36, 48, 60, 72, 84, 96], yticks: [0, 5, 10, 15, 20, 25, 30, 35, 40].filter(y => y <= ymax), xlabel: 'Hours after the first dose', ylabel: 'Plasma concentration (mg/L)', label: 'Plasma concentration over time', bands: [{ from: MEC, to: MTC, label: 'Therapeutic window' }], hlines: [{ y: MTC, cls: 'hline danger', label: 'Minimum toxic concentration' }, { y: MEC, cls: 'hline', label: 'Minimum effective concentration' }], vlines: [{ x: Math.min(H, 4.5 * half), label: '≈ steady state' }], series: [{ points: pts, cls: 'line' }] });
      const R = 1 / (1 - Math.exp(-k * v.tau));
      node.querySelector('[data-stats]').innerHTML = `<span><strong>${fmt(half)} h</strong>half-life</span><span><strong>${fmt(4.5 * half, 0)} h</strong>to ~steady state</span><span><strong>${fmt(peak)}</strong>peak mg/L</span><span><strong>${fmt(trough)}</strong>trough mg/L</span><span><strong>×${fmt(R, 2)}</strong>accumulation</span><span><strong>${Math.round(inWindow * 100)}%</strong>time in window after 24 h</span>`;
      const notes = [];
      if (peak > MTC) notes.push('Peaks rise above the toxic line: lower the dose or lengthen the interval.');
      if (trough < MEC) notes.push('Troughs fall below the effective line, so the effect can wear off before the next dose: shorten the interval or raise the dose.');
      if (peak <= MTC && trough >= MEC) notes.push('At steady state the whole dosing interval stays inside the therapeutic window.');
      if (v.load) notes.push('The loading dose reaches the window quickly instead of waiting about four to five half-lives.');
      if (v.renal) notes.push('With clearance halved, the half-life doubles and the drug accumulates: the same regimen now produces higher concentrations.');
      if (v.route === 'oral') notes.push('Oral absorption delays and blunts the peak, and only 70% of each dose reaches circulation.');
      node.querySelector('[data-explain]').textContent = notes.join(' ');
    });
  },
};

/* ---------- dose-response: potency, efficacy and antagonists ---------- */
const doseresponse = {
  label: 'Dose-response model',
  render: () => `<div class="lw-sim"><div class="lw-controls">${slider('ec50', 'Drug A potency (EC50)', -1, 2, 0.1, 0, '')}${slider('emax', 'Drug A efficacy (maximum effect)', 20, 100, 5, 100, '%')}<label class="lw-select">Add an antagonist to Drug A<select name="ant"><option value="none">None</option><option value="comp">Competitive (reversible)</option><option value="non">Noncompetitive</option></select></label>${slider('anti', 'Antagonist amount', 0, 30, 1, 0, '×Ki')}</div><div class="lw-out"><div data-chart></div><div class="lw-stats" data-stats></div><p class="lw-explain" data-explain aria-live="polite"></p></div></div>${NOTE}`,
  mount(node) {
    live(node, () => {
      const v = read(node), ec = 10 ** v.ec50;
      node.querySelector('[data-out="ec50"]').textContent = fmt(ec, ec < 1 ? 2 : 1) + ' mg/L';
      let ecA = ec, emA = v.emax;
      if (v.ant === 'comp') ecA = ec * (1 + v.anti); if (v.ant === 'non') emA = v.emax / (1 + v.anti * 0.25);
      const curve = (EC, EM) => { const p = []; for (let l = -2; l <= 3.001; l += 0.05) { const c = 10 ** l; p.push([c, EM * c / (EC + c)]); } return p; };
      node.querySelector('[data-chart]').innerHTML = chart({ logx: true, x: [0.01, 1000], y: [0, 100], xticks: [0.01, 0.1, 1, 10, 100, 1000], yticks: [0, 25, 50, 75, 100], xlabel: 'Drug concentration (log scale, mg/L)', ylabel: 'Effect (% of maximum)', label: 'Dose-response curves', series: [{ points: curve(10, 100), cls: 'line ref' }, { points: curve(ec, v.emax), cls: 'line ghost' }, { points: curve(ecA, emA), cls: 'line' }], dots: [{ x: ecA, y: emA / 2 }] });
      node.querySelector('[data-stats]').innerHTML = `<span><strong>${fmt(ecA, ecA < 1 ? 2 : 1)}</strong>Drug A EC50 (mg/L)</span><span><strong>${fmt(emA, 0)}%</strong>Drug A max effect</span><span><strong>10</strong>Drug B EC50 (dashed)</span><span><strong>100%</strong>Drug B max effect</span>`;
      const n = [];
      n.push(ecA < 10 ? 'Drug A is more potent than Drug B: it reaches half its maximum effect at a lower concentration.' : ecA > 10 ? 'Drug A is less potent than Drug B: it needs a higher concentration for the same effect.' : 'Drug A and Drug B are equally potent.');
      n.push(emA < 99 ? `Drug A cannot reach 100% effect at any dose: it behaves like a ${v.ant === 'non' && v.anti ? 'drug facing a noncompetitive antagonist' : 'partial agonist'} with lower efficacy.` : 'Drug A is a full agonist: high enough concentrations produce the maximum effect.');
      if (v.ant === 'comp' && v.anti) n.push('The competitive antagonist shifts the curve to the right without lowering the top: more agonist can overcome it.');
      if (v.ant === 'non' && v.anti) n.push('The noncompetitive antagonist lowers the maximum: adding more agonist cannot fully restore the effect.');
      node.querySelector('[data-explain]').textContent = n.join(' ');
    });
  },
};

/* ---------- dosage calculation practice ---------- */
const pick = a => a[Math.floor(Math.random() * a.length)];
const GEN = {
  tablets() { const s = pick([5, 10, 12.5, 25, 50, 100, 250, 500]), m = pick([0.5, 1, 1.5, 2, 3]), unit = s >= 250 && Math.random() < 0.5 ? 'g' : 'mg', order = s * m;
    const shown = unit === 'g' ? order / 1000 + ' g' : order + ' mg';
    return { q: `Order: ${shown} by mouth. On hand: ${s} mg tablets. How many tablets will you give?`, unit: 'tablets', a: m, round: 0.5, steps: [unit === 'g' ? `Convert: ${order / 1000} g × 1,000 mg/g = ${order} mg.` : `Units already match (mg).`, `Desired ÷ have × quantity = ${order} mg ÷ ${s} mg × 1 tablet = ${m} tablets.`, `Check: ${m < 1 ? 'less than one tablet makes sense because the order is smaller than one tablet.' : 'the order is ' + m + ' times the tablet strength.'}`] }; },
  liquid() { const per = pick([5, 10, 25, 50, 125, 250]), vol = pick([1, 2, 5]), m = pick([0.4, 0.6, 1.2, 1.5, 2, 2.5, 3]), order = per * m;
    return { q: `Order: ${order} mg. Available: ${per} mg per ${vol} mL. How many mL? Round to the nearest tenth.`, unit: 'mL', a: +(order / per * vol).toFixed(1), round: 0.1, steps: [`Set up dimensional analysis: ${order} mg × ${vol} mL / ${per} mg.`, `= ${(order / per * vol).toFixed(2)} mL → ${(order / per * vol).toFixed(1)} mL.`, `Check: ${order} mg is ${m} times ${per} mg, so the volume is ${m} × ${vol} mL.`] }; },
  weight() { const lb = pick([22, 33, 44, 55, 66, 88]), kg = lb / 2.2, perKg = pick([5, 10, 15, 20, 25]), times = pick([2, 3, 4]);
    const daily = perKg * kg, each = daily / times;
    return { q: `A child weighs ${lb} lb. The order is ${perKg} mg/kg/day divided into ${times} equal doses. How many mg per dose? Follow the HOSA pediatric rule: round down to a whole number.`, unit: 'mg', a: Math.floor(each + 1e-9), round: 1, steps: [`Weight: ${lb} lb ÷ 2.2 lb/kg = ${kg.toFixed(2)} kg (keep every digit; round only at the end).`, `Daily dose: ${perKg} mg/kg × ${kg.toFixed(2)} kg = ${daily.toFixed(2)} mg/day.`, `Per dose: ${daily.toFixed(2)} ÷ ${times} = ${each.toFixed(2)} mg → round DOWN to ${Math.floor(each + 1e-9)} mg, because pediatric doses are never rounded up.`] }; },
  ivrate() { const vol = pick([250, 500, 750, 1000, 1200]), h = pick([2, 4, 6, 8, 10, 12]), r = vol / h;
    return { q: `Infuse ${vol} mL over ${h} hours on an infusion pump. What rate in mL/h? Round to the nearest whole number.`, unit: 'mL/h', a: Math.round(r), round: 1, steps: [`Rate = volume ÷ time = ${vol} mL ÷ ${h} h.`, `= ${r.toFixed(2)} mL/h → ${Math.round(r)} mL/h.`] }; },
  drip() { const vol = pick([100, 250, 500, 1000]), min = pick([30, 60, 120, 240, 480]), df = pick([10, 15, 20, 60]), r = vol * df / min;
    return { q: `Infuse ${vol} mL over ${min >= 60 ? min / 60 + ' hour' + (min > 60 ? 's' : '') : min + ' minutes'} by gravity. Drop factor: ${df} gtt/mL. How many drops per minute? Round to the nearest whole drop.`, unit: 'gtt/min', a: Math.round(r), round: 1, steps: [`Time in minutes: ${min} min.`, `gtt/min = volume (mL) × drop factor (gtt/mL) ÷ time (min) = ${vol} × ${df} ÷ ${min}.`, `= ${r.toFixed(2)} → ${Math.round(r)} gtt/min (drops cannot be split).`] }; },
  convert() { const kind = pick(['mcg', 'g', 'tsp', 'oz', 'kg', 'temp']);
    if (kind === 'mcg') { const mg = pick([0.125, 0.25, 0.5, 1.5]); return { q: `Convert ${mg} mg to micrograms (mcg).`, unit: 'mcg', a: mg * 1000, round: 1, steps: ['1 mg = 1,000 mcg, so multiply by 1,000.', `${mg} × 1,000 = ${mg * 1000} mcg.`] }; }
    if (kind === 'g') { const mg = pick([250, 500, 750, 1500]); return { q: `Convert ${mg} mg to grams.`, unit: 'g', a: mg / 1000, round: 0.01, steps: ['1 g = 1,000 mg, so divide by 1,000.', `${mg} ÷ 1,000 = ${mg / 1000} g.`] }; }
    if (kind === 'tsp') { const t = pick([1, 2, 3]); return { q: `How many mL are in ${t} tablespoon${t > 1 ? 's' : ''}?`, unit: 'mL', a: t * 15, round: 1, steps: ['1 tablespoon = 15 mL (3 teaspoons of 5 mL).', `${t} × 15 = ${t * 15} mL.`] }; }
    if (kind === 'oz') { const o = pick([2, 4, 6, 8]); return { q: `How many mL are in ${o} fluid ounces?`, unit: 'mL', a: o * 30, round: 1, steps: ['1 fluid ounce ≈ 30 mL in medication calculations.', `${o} × 30 = ${o * 30} mL.`] }; }
    if (kind === 'kg') { const lb = pick([110, 132, 154, 176, 198]); return { q: `Convert ${lb} lb to kilograms.`, unit: 'kg', a: lb / 2.2, round: 0.1, steps: ['1 kg = 2.2 lb, so divide pounds by 2.2.', `${lb} ÷ 2.2 = ${(lb / 2.2).toFixed(1)} kg.`] }; }
    const f = pick([98.6, 100.4, 102.2, 96.8]); return { q: `Convert ${f} °F to °C. Round to the nearest tenth.`, unit: '°C', a: +((f - 32) * 5 / 9).toFixed(1), round: 0.1, steps: ['°C = (°F − 32) × 5/9.', `(${f} − 32) × 5/9 = ${((f - 32) * 5 / 9).toFixed(2)} → ${((f - 32) * 5 / 9).toFixed(1)} °C.`] };
  },
};
const dosecalc = {
  label: 'Calculation practice',
  render: w => `<div class="lw-calc"><div class="lw-modes" role="group" aria-label="Problem type">${(w.types || Object.keys(GEN)).map((t, i) => `<button type="button" class="chip ${i ? '' : 'on'}" data-type="${t}">${{ tablets: 'Tablets', liquid: 'Liquids', weight: 'Weight-based', ivrate: 'IV pump rate', drip: 'Drip rate', convert: 'Conversions' }[t]}</button>`).join('')}</div><p class="lw-problem" data-q></p><form class="lw-answer" data-form><label>Your answer <input name="ans" inputmode="decimal" autocomplete="off" required></label><span data-unit></span><button class="button" type="submit">Check</button><button class="text-button" type="button" data-new>New problem</button></form><div class="lw-msg" aria-live="polite"></div><ol class="lw-solution" hidden></ol><p class="lw-score" data-score></p></div>${NOTE}`,
  mount(node, w) {
    let type = (w.types || Object.keys(GEN))[0], p, right = 0, tried = 0;
    const fresh = () => { p = GEN[type](); node.querySelector('[data-q]').textContent = p.q; node.querySelector('[data-unit]').textContent = p.unit; node.querySelector('[name=ans]').value = ''; node.querySelector('.lw-msg').textContent = ''; node.querySelector('.lw-solution').hidden = true; };
    node.addEventListener('click', ev => { const t = ev.target.closest('[data-type]'); if (t) { type = t.dataset.type; node.querySelectorAll('[data-type]').forEach(b => b.classList.toggle('on', b === t)); fresh(); } if (ev.target.closest('[data-new]')) fresh(); });
    node.querySelector('[data-form]').addEventListener('submit', ev => {
      ev.preventDefault(); ev.stopPropagation();
      const val = Number(String(node.querySelector('[name=ans]').value).replace(/[^0-9.\-]/g, ''));
      const ok = Number.isFinite(val) && Math.abs(val - p.a) <= p.round / 2 + 1e-9; tried++; if (ok) right++;
      const msg = node.querySelector('.lw-msg'); msg.textContent = ok ? `Correct: ${p.a} ${p.unit}.` : `Not quite. The answer is ${p.a} ${p.unit}. Review the setup below.`; msg.dataset.state = ok ? 'good' : 'bad';
      const sol = node.querySelector('.lw-solution'); sol.innerHTML = p.steps.map(s => `<li>${e(s)}</li>`).join(''); sol.hidden = false;
      node.querySelector('[data-score]').textContent = `${right} of ${tried} correct this session.`;
    });
    fresh();
  },
};

/* ---------- circuits and electrical shock ---------- */
const OHMS = [100, 220, 470, 1000, 2200, 4700, 10000];
const ohmLabel = r => r >= 1000 ? r / 1000 + ' kΩ' : r + ' Ω';
const SHOCK = [[0.001, 'Below perception for most people.'], [1, 'Threshold of sensation: a faint tingle.'], [5, 'Clearly felt and painful but most people can still let go. Ground-fault interrupters trip at about 4–6 mA.'], [10, 'Let-go threshold: muscles may clamp onto the source.'], [30, 'Severe pain and breathing muscle paralysis are possible.'], [100, 'Ventricular fibrillation is likely: a lethal heart rhythm.'], [2000, 'Sustained muscle contraction, burns and tissue damage.']];
const ohm = {
  label: 'Circuit and shock simulator',
  render: () => `<div class="lw-sim"><div class="lw-modes" role="group" aria-label="View"><button type="button" class="chip on" data-view="circuit">Ohm’s law circuit</button><button type="button" class="chip" data-view="shock">Shock hazard</button></div><div data-panel="circuit"><div class="lw-controls">${slider('volts', 'Source voltage', 1, 24, 0.5, 12, ' V')}${slider('r1', 'R1', 0, 6, 1, 3, '')}${slider('r2', 'R2', 0, 6, 1, 5, '')}<label class="lw-select">Wiring<select name="cfg"><option value="single">R1 only</option><option value="series" selected>Series (R1 then R2)</option><option value="parallel">Parallel (R1 beside R2)</option></select></label></div><div class="lw-out"><div data-circuit></div><div class="lw-stats" data-cstats></div><p class="lw-explain" data-cexplain></p></div></div><div data-panel="shock" hidden><div class="lw-controls"><label class="lw-select">Voltage touched<select name="sv"><option value="12">12 V battery</option><option value="120" selected>120 V wall outlet</option><option value="240">240 V appliance circuit</option><option value="480">480 V equipment feed</option></select></label><label class="lw-select">Body resistance<select name="body"><option value="100000">Dry intact skin (~100 kΩ)</option><option value="1000">Wet skin (~1 kΩ)</option><option value="500">Inside the body / broken skin (~500 Ω)</option></select></label><label class="lw-check"><input type="checkbox" name="gfci"> Protected by a GFCI</label></div><div class="lw-out"><div class="lw-meter" data-meter></div><p class="lw-explain" data-sexplain></p></div></div></div><p class="lw-note">Hand-to-hand current values are approximate textbook thresholds. Never test them. Real shocks depend on path, duration and frequency.</p>`,
  mount(node) {
    node.addEventListener('click', ev => { const b = ev.target.closest('[data-view]'); if (!b) return; node.querySelectorAll('[data-view]').forEach(x => x.classList.toggle('on', x === b)); node.querySelectorAll('[data-panel]').forEach(p => p.hidden = p.dataset.panel !== b.dataset.view); });
    live(node, () => {
      const v = read(node), R1 = OHMS[v.r1], R2 = OHMS[v.r2];
      node.querySelector('[data-out="r1"]').textContent = ohmLabel(R1); node.querySelector('[data-out="r2"]').textContent = ohmLabel(R2);
      const Rt = v.cfg === 'single' ? R1 : v.cfg === 'series' ? R1 + R2 : R1 * R2 / (R1 + R2), I = v.volts / Rt, P = v.volts * I;
      const res = (x, y, lab, val, vert) => vert ? `<g transform="translate(${x} ${y})"><path class="wire" d="M0 0v18l-8 5 16 8-16 8 16 8-16 8 8 5v18"/><text x="14" y="44">${lab} ${val}</text></g>` : `<g transform="translate(${x} ${y})"><path class="wire" d="M0 0h18l5-8 8 16 8-16 8 16 8-16 8 16 5-8h18"/><text x="40" y="-14" text-anchor="middle">${lab} ${val}</text></g>`;
      const parts = v.cfg === 'single' ? res(150, 40, 'R1', ohmLabel(R1)) + '<path class="wire" d="M232 40h108v120"/>' : v.cfg === 'series' ? res(120, 40, 'R1', ohmLabel(R1)) + '<path class="wire" d="M202 40h18"/>' + res(220, 40, 'R2', ohmLabel(R2)) + '<path class="wire" d="M302 40h38v120"/>' : '<path class="wire" d="M120 40h220M200 40v10M300 40v10M200 132v28M300 132v28"/>' + res(200, 50, 'R1', '', true) + res(300, 50, 'R2', '', true) + `<text x="214" y="150">${ohmLabel(R1)}</text><text x="314" y="150">${ohmLabel(R2)}</text><path class="wire" d="M340 160h0"/>`;
      node.querySelector('[data-circuit]').innerHTML = `<svg class="lw-schematic" viewBox="0 0 400 200" role="img" aria-label="Circuit schematic"><path class="wire" d="M60 40h60M60 40v45M60 115v45h280"/><path class="wire" d="M44 85h32M52 95h16M44 105h32M52 115h16"/><text x="20" y="104">${v.volts} V</text>${v.cfg === 'single' ? '<path class="wire" d="M120 40h30"/>' : ''}${parts}${v.cfg === 'parallel' ? '<path class="wire" d="M340 40v120"/>' : ''}<circle class="flow" r="4"><animateMotion dur="${reduced() ? 0 : clamp(0.02 / I, 0.6, 12)}s" repeatCount="indefinite" path="M60 40h280v120h-280z"/></circle></svg>`;
      let stats = `<span><strong>${ohmLabel(Math.round(Rt))}</strong>total resistance</span><span><strong>${fmt(I * 1000, 2)} mA</strong>current</span><span><strong>${P >= 1 ? fmt(P, 2) + ' W' : fmt(P * 1000, 1) + ' mW'}</strong>power</span>`;
      if (v.cfg === 'series') stats += `<span><strong>${fmt(I * R1, 2)} V</strong>across R1</span><span><strong>${fmt(I * R2, 2)} V</strong>across R2</span>`;
      if (v.cfg === 'parallel') stats += `<span><strong>${fmt(v.volts / R1 * 1000, 2)} mA</strong>through R1</span><span><strong>${fmt(v.volts / R2 * 1000, 2)} mA</strong>through R2</span>`;
      node.querySelector('[data-cstats]').innerHTML = stats;
      node.querySelector('[data-cexplain]').textContent = v.cfg === 'series' ? 'In series the same current flows through every resistor, resistances add, and the source voltage divides in proportion to each resistance (Kirchhoff’s voltage law).' : v.cfg === 'parallel' ? 'In parallel every branch sees the full voltage, branch currents add to the total (Kirchhoff’s current law), and total resistance is lower than the smallest branch.' : 'Ohm’s law: current equals voltage divided by resistance (I = V/R). Power is P = V × I.';
      const mA = v.sv / Number(v.body) * 1000, tripped = v.gfci && mA > 5;
      const level = [...SHOCK].reverse().find(([t]) => mA >= t) || SHOCK[0];
      node.querySelector('[data-meter]').innerHTML = `<div class="lw-stats"><span><strong>${fmt(mA, mA < 10 ? 2 : 0)} mA</strong>possible body current</span><span><strong>${tripped ? 'Tripped' : v.gfci ? 'Not tripped' : 'None'}</strong>GFCI</span></div><div class="lw-scale">${SHOCK.slice(1).map(([t, txt]) => `<div class="${mA >= t ? 'hit' : ''}"><b>${t >= 1000 ? t / 1000 + ' A' : t + ' mA'}</b>${e(txt)}</div>`).join('')}</div>`;
      node.querySelector('[data-sexplain]').textContent = tripped ? `A GFCI compares current leaving on the hot wire with current returning on the neutral. A ${fmt(mA, 0)} mA leak through the body creates an imbalance, so it opens the circuit in a fraction of a second, before most harm occurs.` : `${level[1]} Lower resistance (wet skin, broken skin or a catheter into the heart) lets far more current flow at the same voltage. Microshock: as little as about 0.1 mA delivered directly to the heart can trigger fibrillation, which is why patient-connected equipment has very low leakage limits.`;
    });
  },
};

/* ---------- ECG rhythms and artifacts ---------- */
const RHYTHMS = {
  nsr: ['Normal sinus rhythm', 72, 'Regular rhythm, rate 60–100 bpm, an upright P wave before every narrow QRS.'],
  brady: ['Sinus bradycardia', 45, 'Sinus pattern but slower than 60 bpm. Normal in many athletes; with dizziness or low blood pressure it needs attention.'],
  tachy: ['Sinus tachycardia', 130, 'Sinus pattern faster than 100 bpm, often from fever, pain, blood loss, anxiety or exercise.'],
  afib: ['Atrial fibrillation', 0, 'Irregularly irregular rhythm with no distinct P waves and a wavy baseline. Raises stroke risk because blood pools in the atria.'],
  vt: ['Ventricular tachycardia', 180, 'Fast, wide, bizarre QRS complexes from the ventricles. May have a pulse or be pulseless; a medical emergency.'],
  vf: ['Ventricular fibrillation', 0, 'Chaotic quivering with no organized complexes and no cardiac output. Requires immediate CPR and defibrillation.'],
  asys: ['Asystole', 0, 'Nearly flat line with no electrical activity. Confirm in more than one lead and check that leads are attached.'],
};
const ARTIFACTS = {
  none: ['No artifact', ''],
  ac: ['60 Hz interference', 'A thick, fuzzy, regular baseline from nearby power lines or poorly grounded equipment. Fix: check grounding, move power cords away from lead wires, unplug nonessential devices and keep the notch filter on.'],
  tremor: ['Muscle tremor', 'Irregular, jagged noise from skeletal muscle (shivering, tension, tremors). Fix: keep the patient warm and relaxed, support the limbs and place electrodes over flatter, less muscular areas.'],
  wander: ['Wandering baseline', 'The whole tracing drifts up and down, often with breathing or patient movement. Fix: prepare the skin, use fresh electrodes with moist gel and secure the lead wires.'],
  lead: ['Loose lead', 'Flat or erratic segments and sudden spikes when an electrode loses contact. Fix: check that every electrode is attached, replace dried electrodes and inspect cables for damage before assuming a rhythm change.'],
};
function rand(seed) { return () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }; }
const gauss = (t, c, w, a) => a * Math.exp(-((t - c) ** 2) / (2 * w * w));
const ecg = {
  label: 'ECG monitor',
  render: () => `<div class="lw-sim"><div class="lw-controls"><label class="lw-select">Rhythm<select name="rhythm">${Object.entries(RHYTHMS).map(([k, [n]]) => `<option value="${k}">${e(n)}</option>`).join('')}</select></label><label class="lw-select">Artifact<select name="artifact">${Object.entries(ARTIFACTS).map(([k, [n]]) => `<option value="${k}">${e(n)}</option>`).join('')}</select></label><button type="button" class="text-button" data-pause>Pause</button></div><div class="lw-ecg"><svg viewBox="0 0 600 200" preserveAspectRatio="none" role="img" aria-label="Simulated ECG tracing"><defs><pattern id="ecg-small" width="6" height="6" patternUnits="userSpaceOnUse"><path d="M6 0H0V6" class="ecg-grid"/></pattern><pattern id="ecg-big" width="30" height="30" patternUnits="userSpaceOnUse"><rect width="30" height="30" fill="url(#ecg-small)"/><path d="M30 0H0V30" class="ecg-grid big"/></pattern></defs><rect width="600" height="200" fill="url(#ecg-big)"/><polyline class="ecg-line" points=""/></svg><div class="ecg-hr"><strong data-hr>—</strong><span>bpm</span></div></div><p class="lw-explain" data-explain aria-live="polite"></p></div><p class="lw-note">Simulated tracing at 25 mm/s: each large square is 0.2 s and each small square 0.04 s.</p>`,
  mount(node) {
    const line = node.querySelector('.ecg-line'), R = rand(42), beats = []; let t = 0; while (t < 4000) { beats.push(t); t += 0.45 + R() * 0.55; }
    let v = read(node), paused = reduced(), t0 = 0, last = performance.now(), visible = true;
    const value = time => {
      const r = v.rhythm, n = rand(Math.floor(time * 500) + 7)();
      let y = 0;
      const beat = (dt, scale = 1) => gauss(dt, 0.10 * scale, 0.025, 0.15) + gauss(dt, 0.20 * scale, 0.009, -0.12) + gauss(dt, 0.225 * scale, 0.010, 1.05) + gauss(dt, 0.25 * scale, 0.010, -0.28) + gauss(dt, 0.42 * scale, 0.045, 0.3);
      if (r === 'nsr' || r === 'brady' || r === 'tachy') { const rr = 60 / RHYTHMS[r][1]; y = beat(time % rr, clamp(Math.sqrt(rr / 0.83), 0.75, 1.15)); }
      else if (r === 'afib') { let lo = 0, hi = beats.length - 1; while (lo < hi) { const m = (lo + hi + 1) >> 1; if (beats[m] <= time) lo = m; else hi = m - 1; } const dt = time - beats[lo]; y = beat(dt, 0.95) - gauss(dt, 0.095, 0.025, 0.15) + 0.05 * Math.sin(2 * Math.PI * 6.3 * time) + 0.035 * Math.sin(2 * Math.PI * 8.7 * time + 1); }
      else if (r === 'vt') { const ph = (time % (60 / 180)) / (60 / 180); y = 1.1 * Math.sin(2 * Math.PI * ph) + 0.25 * Math.sin(4 * Math.PI * ph + 0.6); }
      else if (r === 'vf') y = 0.35 * Math.sin(2 * Math.PI * 5.1 * time) + 0.25 * Math.sin(2 * Math.PI * 6.7 * time + 2) + 0.2 * Math.sin(2 * Math.PI * 3.3 * time + 1) * Math.sin(0.7 * time);
      else y = (n - 0.5) * 0.02;
      if (v.artifact === 'ac') y += 0.08 * Math.sin(2 * Math.PI * 60 * time);
      if (v.artifact === 'tremor') y += (n - 0.5) * 0.28 * (0.6 + 0.4 * Math.sin(3 * time));
      if (v.artifact === 'wander') y += 0.45 * Math.sin(2 * Math.PI * 0.25 * time);
      if (v.artifact === 'lead') { const c = time % 3.2; if (c > 2.2 && c < 2.9) y = 0.02 * (n - 0.5) + (c < 2.25 ? 1.4 : 0); }
      return y;
    };
    const hr = () => v.rhythm === 'afib' ? 60 / 0.725 : v.rhythm === 'vf' || v.rhythm === 'asys' ? 0 : RHYTHMS[v.rhythm][1];
    const draw = () => { const pts = []; for (let i = 0; i <= 600; i += 1) { const time = t0 + i / 150; pts.push(i + ',' + (110 - value(time) * 70).toFixed(1)); } line.setAttribute('points', pts.join(' ')); };
    const frame = now => { if (!node.isConnected) return; if (!paused && visible) { t0 += (now - last) / 1000; draw(); } last = now; requestAnimationFrame(frame); };
    const describe = () => { node.querySelector('[data-hr]').textContent = v.rhythm === 'vf' || v.rhythm === 'asys' ? '—' : Math.round(hr()); node.querySelector('[data-explain]').innerHTML = `<strong>${e(RHYTHMS[v.rhythm][0])}.</strong> ${e(RHYTHMS[v.rhythm][2])}${v.artifact !== 'none' ? ` <br><strong>${e(ARTIFACTS[v.artifact][0])}.</strong> ${e(ARTIFACTS[v.artifact][1])}` : ''}`; };
    node.addEventListener('change', () => { v = read(node); describe(); draw(); });
    node.querySelector('[data-pause]').addEventListener('click', ev => { paused = !paused; ev.target.textContent = paused ? 'Play' : 'Pause'; });
    if (paused) node.querySelector('[data-pause]').textContent = 'Play';
    if ('IntersectionObserver' in window) new IntersectionObserver(([en]) => { visible = en.isIntersecting; }).observe(node);
    describe(); draw(); requestAnimationFrame(frame);
  },
};

/* ---------- tooth numbering chart ---------- */
const PERM = ['central incisor', 'lateral incisor', 'canine', 'first premolar', 'second premolar', 'first molar', 'second molar', 'third molar'];
const PRIM = ['central incisor', 'lateral incisor', 'canine', 'first molar', 'second molar'];
const ROOTS = { max: [1, 1, 1, 2, 1, 3, 3, 'variable, often fused'], mand: [1, 1, 1, 1, 1, 2, 2, 'variable, often fused'], pmax: [1, 1, 1, 3, 3], pmand: [1, 1, 1, 2, 2] };
function teeth(primary) {
  const n = primary ? 5 : 8, list = [];
  for (const upper of [true, false]) for (let i = 0; i < n * 2; i++) {
    const right = i < n, pos = right ? n - i : i - n + 1, name = (primary ? PRIM : PERM)[pos - 1];
    const quad = upper ? (right ? 1 : 2) : (right ? 4 : 3);
    const universal = primary ? (upper ? 'ABCDEFGHIJ'[i] : 'TSRQPONMLK'[i]) : String(upper ? i + 1 : 32 - i);
    const fdi = String(primary ? quad + 4 : quad) + pos, sym = primary ? 'ABCDE'[pos - 1] : pos;
    const palmer = quad === 1 ? `${sym}┘` : quad === 2 ? `└${sym}` : quad === 4 ? `${sym}┐` : `┌${sym}`;
    const roots = (primary ? (upper ? ROOTS.pmax : ROOTS.pmand) : (upper ? ROOTS.max : ROOTS.mand))[pos - 1];
    const width = primary ? [0.8, 0.7, 0.8, 1, 1.15][pos - 1] : [0.9, 0.75, 0.85, 0.85, 0.85, 1.2, 1.12, 1.02][pos - 1];
    list.push({ upper, i, right, pos, name, universal, fdi, palmer, roots, width, full: `${upper ? 'Maxillary' : 'Mandibular'} ${right ? 'right' : 'left'} ${primary ? 'primary ' : ''}${name}` });
  }
  return list;
}
function archSvg(list, system) {
  const W = 560, cx = W / 2, rx = 232, ry = 168, cyU = 206, cyL = 246, out = [];
  for (const upper of [true, false]) {
    const row = list.filter(t => t.upper === upper), total = row.reduce((s, t) => s + t.width, 0); let acc = 0;
    for (const t of row) {
      const s = (acc + t.width / 2) / total; acc += t.width;
      const a = Math.PI * (1 - s), x = cx + rx * Math.cos(a), y = upper ? cyU - ry * Math.sin(a) : cyL + ry * Math.sin(a);
      const rot = (upper ? -1 : 1) * (90 - a * 180 / Math.PI) * -1, w = 33 * t.width, h = 38;
      const label = system === 'fdi' ? t.fdi : system === 'palmer' ? t.palmer : t.universal;
      out.push(`<g class="tooth" data-tooth="${e(t.universal)}" tabindex="0" role="button" aria-label="${e(t.full)}" transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rot.toFixed(1)})"><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="${w / 2.6}"/><text y="4" text-anchor="middle" transform="rotate(${(-rot).toFixed(1)})">${e(label)}</text></g>`);
    }
  }
  return `<svg class="lw-teeth" viewBox="0 0 ${W} 452" role="img" aria-label="Dental chart"><text x="${cx}" y="18" text-anchor="middle" class="axis-label">MAXILLARY (upper)</text><text x="${cx}" y="446" text-anchor="middle" class="axis-label">MANDIBULAR (lower)</text><text x="8" y="230" class="axis-label">Patient’s RIGHT</text><text x="${W - 8}" y="230" text-anchor="end" class="axis-label">Patient’s LEFT</text>${out.join('')}</svg>`;
}
const toothchart = {
  label: 'Interactive dental chart',
  render: () => `<div class="lw-sim"><div class="lw-controls"><label class="lw-select">Dentition<select name="dent"><option value="perm">Permanent (32 teeth)</option><option value="prim">Primary (20 teeth)</option></select></label><label class="lw-select">Numbering system<select name="sys"><option value="universal">Universal (ADA)</option><option value="fdi">FDI / ISO 3950</option><option value="palmer">Palmer notation</option></select></label><button type="button" class="chip" data-quiz>Quiz me</button></div><div class="lw-label"><div class="lw-figure" data-chart></div><div class="lw-detail" aria-live="polite"><p class="subtle">Select a tooth. The chart is drawn as you face the patient, so the patient’s right is on your left.</p></div></div></div>`,
  mount(node) {
    let v, list, quiz = null;
    const sysName = { universal: 'Universal', fdi: 'FDI', palmer: 'Palmer' };
    const label = t => v.sys === 'fdi' ? t.fdi : v.sys === 'palmer' ? t.palmer : (v.dent === 'perm' ? '#' : '') + t.universal;
    const draw = () => { v = read(node); list = teeth(v.dent === 'prim'); node.querySelector('[data-chart]').innerHTML = archSvg(list, v.sys); quiz = null; node.querySelector('.lw-detail').innerHTML = '<p class="subtle">Select a tooth. The chart is drawn as you face the patient, so the patient’s right is on your left.</p>'; };
    const ask = () => { quiz.target = list[Math.floor(Math.random() * list.length)]; node.querySelector('.lw-detail').innerHTML = `<h5>Find tooth ${e(label(quiz.target))}</h5><p class="subtle">${sysName[v.sys]} system · ${quiz.score} of ${quiz.n} correct</p><p class="lw-msg" aria-live="polite"></p>`; };
    const choose = id => {
      const t = list.find(x => x.universal === id); if (!t) return;
      node.querySelectorAll('.tooth').forEach(g => g.classList.toggle('hl', g.dataset.tooth === id));
      if (quiz) { const ok = t === quiz.target; quiz.n++; if (ok) quiz.score++; const msg = node.querySelector('.lw-msg'); msg.textContent = ok ? 'Correct.' : `That is ${label(t)}, the ${t.full.toLowerCase()}.`; msg.dataset.state = ok ? 'good' : 'bad'; setTimeout(ask, ok ? 700 : 1600); return; }
      node.querySelector('.lw-detail').innerHTML = `<h5>${e(t.full)}</h5><table class="lw-mini"><tr><th>Universal</th><td>${e(t.universal)}</td></tr><tr><th>FDI</th><td>${e(t.fdi)}</td></tr><tr><th>Palmer</th><td>${e(t.palmer)}</td></tr><tr><th>Arch</th><td>${t.upper ? 'Maxillary' : 'Mandibular'}</td></tr><tr><th>Quadrant</th><td>${t.upper ? 'Upper' : 'Lower'} ${t.right ? 'right' : 'left'}</td></tr><tr><th>Type</th><td>${t.pos <= 2 ? 'Anterior · incisor' : t.pos === 3 ? 'Anterior · canine (cuspid)' : v.dent === 'prim' ? 'Posterior · primary molar' : t.pos <= 5 ? 'Posterior · premolar (bicuspid)' : 'Posterior · molar'}</td></tr><tr><th>Typical roots</th><td>${e(t.roots)}</td></tr></table>`;
    };
    node.addEventListener('change', draw);
    node.addEventListener('click', ev => { if (ev.target.closest('[data-quiz]')) { quiz = { score: 0, n: 0 }; return ask(); } const g = ev.target.closest('.tooth'); if (g) choose(g.dataset.tooth); });
    node.addEventListener('keydown', ev => { const g = ev.target.closest?.('.tooth'); if (g && (ev.key === 'Enter' || ev.key === ' ')) { ev.preventDefault(); choose(g.dataset.tooth); } });
    draw();
  },
};

/* ---------- blood glucose feedback loop ---------- */
const glucose = {
  label: 'Feedback loop simulator',
  render: () => `<div class="lw-sim"><div class="lw-controls"><label class="lw-select">Body<select name="cond"><option value="healthy">Healthy regulation</option><option value="t1">Type 1 diabetes (no insulin made)</option><option value="t2">Type 2 diabetes (insulin resistance)</option></select></label><div class="lw-buttons"><button type="button" class="chip" data-act="meal">Eat a carbohydrate meal</button><button type="button" class="chip" data-act="exercise">Exercise 45 min</button><button type="button" class="chip" data-act="insulin">Inject rapid insulin</button><button type="button" class="text-button" data-act="reset">Restart</button></div></div><div class="lw-out"><div data-chart></div><div class="lw-stats" data-stats></div><p class="lw-explain" data-explain aria-live="polite">The clock runs six simulated hours. Add a meal or exercise and watch insulin respond.</p></div></div>${NOTE}`,
  mount(node) {
    let s, hist, timer, events;
    const reset = () => { s = { t: 0, G: 90, I: 10, gut: 0, ex: 0, shot: 0 }; hist = []; events = []; };
    const step = cond => {
      const S = cond === 't2' ? 0.35 : 1, secretion = cond === 't1' ? 0 : (cond === 't2' ? 1.4 : 1) * Math.max(0, 1 + 0.08 * (s.G - 90));
      const absorb = 0.03 * s.gut; s.gut -= absorb;
      const I = s.I + s.shot, hepatic = clamp(1 + 0.04 * (90 - s.G) - 0.02 * S * (I - 10), 0, 3.5);
      const uptake = 0.88 * (s.G / 90) + 0.012 * S * I * (s.G / 90) * (s.ex > 0 ? 1.8 : 1) + (s.ex > 0 ? 0.35 : 0);
      s.G = clamp(s.G + absorb + hepatic - uptake, 25, 450); s.I = Math.max(0, s.I + secretion - 0.1 * s.I); s.shot *= 0.985; if (s.ex > 0) s.ex--; s.t++;
      hist.push([s.t / 60, s.G, I]);
    };
    const draw = () => {
      const cond = node.querySelector('[name=cond]').value;
      node.querySelector('[data-chart]').innerHTML = chart({ x: [0, 6], y: [0, 300], xticks: [0, 1, 2, 3, 4, 5, 6], yticks: [0, 70, 100, 140, 200, 300], xlabel: 'Hours', ylabel: 'Blood glucose (mg/dL)', label: 'Blood glucose over time', bands: [{ from: 70, to: 100, label: 'Normal fasting range' }], hlines: [{ y: 140, cls: 'hline danger', label: '140 mg/dL' }], series: [{ points: hist.map(([t, g]) => [t, g]), cls: 'line' }, { points: hist.map(([t, , i]) => [t, Math.min(300, i * 3)]), cls: 'line ref' }], vlines: events.map(([t, l]) => ({ x: t, label: l })) });
      const g = s.G;
      node.querySelector('[data-stats]').innerHTML = `<span><strong>${fmt(g, 0)}</strong>glucose mg/dL</span><span><strong>${fmt(s.I + s.shot, 0)}</strong>insulin (dashed, relative)</span><span><strong>${fmt(s.t / 60, 1)} h</strong>elapsed</span>`;
      const notes = { healthy: 'Negative feedback: rising glucose triggers beta cells to release insulin, which moves glucose into cells and tells the liver to store it. When glucose falls, insulin drops and glucagon makes the liver release glucose.', t1: 'With no insulin, glucose keeps climbing after meals and the liver keeps releasing glucose. Injected insulin is the replacement signal; too much can push glucose dangerously low.', t2: 'Cells respond weakly to insulin, so the pancreas releases more, yet glucose stays high for longer. Exercise helps because working muscle takes up glucose with less insulin.' };
      node.querySelector('[data-explain]').textContent = notes[cond] + (g < 70 ? ' Glucose is below 70 mg/dL: hypoglycemia.' : g > 180 ? ' Glucose is above 180 mg/dL: hyperglycemia.' : '');
    };
    const run = () => { clearInterval(timer); timer = setInterval(() => { if (!node.isConnected || s.t >= 360) return clearInterval(timer); const cond = node.querySelector('[name=cond]').value; for (let i = 0; i < 3; i++) step(cond); draw(); }, reduced() ? 30 : 60); };
    node.addEventListener('click', ev => { const b = ev.target.closest('[data-act]'); if (!b) return; const a = b.dataset.act; if (a === 'reset') { reset(); run(); return draw(); } if (s.t >= 360) { reset(); } if (a === 'meal') s.gut += 120; if (a === 'exercise') s.ex = 45; if (a === 'insulin') s.shot += 45; events.push([s.t / 60, { meal: 'Meal', exercise: 'Exercise', insulin: 'Insulin' }[a]]); run(); });
    node.querySelector('[name=cond]').addEventListener('change', () => { reset(); run(); draw(); });
    reset(); run(); draw();
  },
};

/* ---------- classical conditioning ---------- */
const conditioning = {
  label: 'Conditioning lab',
  render: () => `<div class="lw-sim"><div class="lw-buttons"><button type="button" class="chip" data-act="pair">Tone + food</button><button type="button" class="chip" data-act="tone">Tone alone</button><button type="button" class="chip" data-act="rest">Wait 24 hours</button><button type="button" class="chip" data-act="other">Similar buzzer alone</button><button type="button" class="text-button" data-act="reset">Reset</button></div><div class="lw-out"><div data-chart></div><div class="lw-stats" data-stats></div><p class="lw-explain" data-explain aria-live="polite">Start by pairing the tone with food several times.</p></div></div>`,
  mount(node) {
    let V, trials, peak, extinguished;
    const reset = () => { V = 0; trials = []; peak = 0; extinguished = false; };
    const draw = msg => {
      node.querySelector('[data-chart]').innerHTML = chart({ x: [0, Math.max(20, trials.length + 1)], y: [0, 100], xticks: Array.from({ length: Math.floor(Math.max(20, trials.length + 1) / 5) + 1 }, (_, i) => i * 5), yticks: [0, 25, 50, 75, 100], xlabel: 'Trial', ylabel: 'Salivation to the tone (%)', label: 'Conditioned response strength', series: [{ points: trials.map((t, i) => [i + 1, t.v]), cls: 'line' }], dots: trials.map((t, i) => ({ x: i + 1, y: t.v, cls: 'dot ' + t.kind })) });
      const stage = V < 5 ? 'Neutral stimulus: the tone alone causes no salivation yet.' : extinguished ? 'Extinction in progress: the conditioned response weakens when the tone no longer predicts food.' : 'The tone is now a conditioned stimulus that produces a conditioned response.';
      node.querySelector('[data-stats]').innerHTML = `<span><strong>${Math.round(V)}%</strong>response to tone</span><span><strong>${trials.length}</strong>trials</span>`;
      node.querySelector('[data-explain]').textContent = (msg ? msg + ' ' : '') + stage;
    };
    node.addEventListener('click', ev => {
      const a = ev.target.closest('[data-act]')?.dataset.act; if (!a) return;
      let msg = '';
      if (a === 'reset') { reset(); return draw('Reset.'); }
      if (a === 'pair') { V += 0.3 * (100 - V); peak = Math.max(peak, V); extinguished = false; trials.push({ v: V, kind: 'pair' }); msg = 'Acquisition: food (unconditioned stimulus) produces salivation (unconditioned response); pairing teaches the tone to predict food.'; }
      if (a === 'tone') { trials.push({ v: V, kind: 'tone' }); if (V > 5) extinguished = true; V += 0.25 * (0 - V); msg = 'The tone was presented without food.'; }
      if (a === 'rest') { if (extinguished && peak > 20) { V = V + 0.45 * (peak - V); msg = 'Spontaneous recovery: after a rest the extinguished response partly returns, showing extinction suppresses rather than erases learning.'; } else msg = 'Time passes. Without prior extinction, nothing changes.'; }
      if (a === 'other') { trials.push({ v: V * 0.6, kind: 'gen' }); msg = `Stimulus generalization: a similar buzzer produces a weaker response (${Math.round(V * 0.6)}%). With training, the dog could learn discrimination between the two sounds.`; }
      draw(msg);
    });
    reset(); draw();
  },
};

/* ---------- serial position memory experiment ---------- */
const WORDS = ['anchor', 'basket', 'candle', 'dolphin', 'feather', 'garden', 'helmet', 'island', 'jacket', 'kettle', 'lemon', 'mirror', 'needle', 'orchard', 'pencil', 'quilt', 'rocket', 'saddle', 'tunnel', 'violin', 'wallet', 'zebra', 'blanket', 'compass', 'ladder', 'marble', 'pillow', 'ribbon', 'spoon', 'window'];
const memory = {
  label: 'Memory experiment',
  render: () => `<div class="lw-sim"><p>You will see 12 words, one at a time. Then write every word you remember, in any order.</p><div class="lw-controls"><label class="lw-check"><input type="checkbox" name="delay"> Add a 20-second distraction task before recall</label><button type="button" class="button" data-start>Start the list</button></div><div class="lw-stage" data-stage aria-live="polite"></div><div class="lw-out" data-result></div></div>`,
  mount(node) {
    const stage = node.querySelector('[data-stage]'), result = node.querySelector('[data-result]');
    let list = [], runs = [];
    node.querySelector('[data-start]').addEventListener('click', async ev => {
      ev.target.disabled = true; result.innerHTML = '';
      list = [...WORDS].sort(() => Math.random() - 0.5).slice(0, 12);
      for (const w of list) { stage.innerHTML = `<p class="lw-flash">${w}</p>`; await new Promise(r => setTimeout(r, 1300)); stage.innerHTML = '<p class="lw-flash">&nbsp;</p>'; await new Promise(r => setTimeout(r, 200)); }
      if (node.querySelector('[name=delay]').checked) { const a = 300 + Math.floor(Math.random() * 600); for (let s = 20; s > 0; s--) { stage.innerHTML = `<p>Count backward by 3s from <strong>${a}</strong> out loud. ${s} s</p>`; await new Promise(r => setTimeout(r, 1000)); } }
      stage.innerHTML = `<form data-recall><label class="field">Words you remember<textarea name="words" rows="4" placeholder="Separate words with spaces or commas"></textarea></label><button class="button" type="submit">Score my recall</button></form>`;
      stage.querySelector('[data-recall]').addEventListener('submit', sub => {
        sub.preventDefault(); sub.stopPropagation();
        const said = new Set(sub.target.words.value.toLowerCase().split(/[^a-z]+/).filter(Boolean));
        const hits = list.map(w => said.has(w) ? 1 : 0); runs.push({ hits, delay: node.querySelector('[name=delay]').checked });
        const avg = list.map((_, i) => runs.reduce((s, r) => s + r.hits[i], 0) / runs.length * 100);
        result.innerHTML = chart({ x: [0.5, 12.5], y: [0, 100], xticks: [1, 3, 6, 9, 12], yticks: [0, 50, 100], xlabel: 'Position of the word in the list', ylabel: '% recalled', label: 'Recall by list position', series: [{ points: [[1, 72], [2, 60], [3, 50], [4, 42], [5, 38], [6, 35], [7, 34], [8, 36], [9, 42], [10, 55], [11, 70], [12, 82]], cls: 'line ref' }, { points: avg.map((p, i) => [i + 1, p]), cls: 'line' }], dots: avg.map((p, i) => ({ x: i + 1, y: p })) }) + `<p class="lw-explain">You recalled ${hits.reduce((a, b) => a + b, 0)} of 12. The dashed line is the typical serial position curve. Early words are remembered well (<strong>primacy effect</strong>) because there was time to rehearse them into long-term memory. The last words are remembered well (<strong>recency effect</strong>) because they are still in short-term memory, unless a distraction task pushes them out, which is why the delay option flattens the end of the curve.</p>`;
        stage.innerHTML = `<p>The list was: ${list.join(', ')}.</p>`; ev.target.disabled = false; ev.target.textContent = 'Run another list';
      });
    });
  },
};

/* ---------- hemorrhage and compensation ---------- */
const vitals = {
  label: 'Shock compensation model',
  render: () => `<div class="lw-sim"><div class="lw-controls">${slider('loss', 'Blood volume lost', 0, 50, 1, 10, '%')}</div><div class="lw-out"><div class="lw-stats" data-stats></div><p class="lw-explain" data-explain aria-live="polite"></p></div></div><p class="lw-note">Ranges follow the classic four-class description of hemorrhage in a 70 kg adult with about 5 L of blood. Real patients vary: children, older adults and people on beta-blockers may not show the typical rise in heart rate.</p>`,
  mount(node) {
    live(node, () => {
      const { loss } = read(node), ml = Math.round(loss / 100 * 4900);
      const cls = loss < 15 ? 1 : loss < 30 ? 2 : loss < 40 ? 3 : 4, f = (a, b, lo, hi) => Math.round(a + (b - a) * clamp((loss - lo) / (hi - lo), 0, 1));
      const hr = cls === 1 ? f(75, 99, 0, 15) : cls === 2 ? f(100, 120, 15, 30) : cls === 3 ? f(121, 140, 30, 40) : f(141, 160, 40, 50);
      const sbp = cls <= 2 ? f(120, 116, 0, 30) : cls === 3 ? f(112, 90, 30, 40) : f(88, 62, 40, 50);
      const rr = cls === 1 ? f(14, 20, 0, 15) : cls === 2 ? f(21, 30, 15, 30) : cls === 3 ? f(31, 40, 30, 40) : f(36, 44, 40, 50);
      const uo = ['more than 30 mL/h', '20–30 mL/h', '5–15 mL/h', 'negligible'][cls - 1], mind = ['slightly anxious', 'mildly anxious', 'anxious and confused', 'confused, lethargic'][cls - 1];
      node.querySelector('[data-stats]').innerHTML = `<span><strong>${ml.toLocaleString()} mL</strong>blood lost</span><span><strong>Class ${'I II III IV'.split(' ')[cls - 1]}</strong>hemorrhage</span><span><strong>${hr}</strong>heart rate</span><span><strong>${sbp}</strong>systolic BP</span><span><strong>${rr}</strong>breaths/min</span><span><strong>${fmt(hr / sbp, 2)}</strong>shock index</span><span><strong>${uo}</strong>urine output</span><span><strong>${mind}</strong>mental status</span>`;
      node.querySelector('[data-explain]').textContent = ['Compensation is easy: the sympathetic nervous system tightens veins and the heart rate barely rises.', 'Compensated shock: the heart speeds up and arterioles constrict, so blood pressure stays near normal even though volume is falling. A normal blood pressure here is falsely reassuring.', 'Decompensation begins: blood pressure falls because compensation can no longer keep up. Kidneys cut urine output and the brain receives less oxygen.', 'Life-threatening: organs are poorly perfused and the patient can arrest without rapid control of bleeding and replacement of blood.'][cls - 1] + (hr / sbp > 0.9 ? ' A shock index above about 0.9 signals significant blood loss.' : '');
    });
  },
};

/* ---------- burns: rule of nines ---------- */
const REGIONS = [['head-f', 'Head and neck (front)', 4.5, 'M88 18a22 22 0 1 1 0.1 0zM80 62h16v10H80z'], ['arm-rf', 'Right arm (front)', 4.5, 'M52 74h18l-6 86H48z'], ['arm-lf', 'Left arm (front)', 4.5, 'M106 74h18l4 86h-16z'], ['trunk-f', 'Chest and abdomen', 18, 'M70 72h36l4 92H66z'], ['groin', 'Perineum', 1, 'M80 164h16v12H80z'], ['leg-rf', 'Right leg (front)', 9, 'M66 164h14v4l-2 120H64z'], ['leg-lf', 'Left leg (front)', 9, 'M96 168v-4h14l2 124H98z']];
const BACK = REGIONS.filter(r => r[0] !== 'groin').map(([id, name, pct, d]) => [id.replace('-f', '-b').replace('rf', 'rb').replace('lf', 'lb'), name.replace('(front)', '(back)').replace('Chest and abdomen', 'Back and buttocks'), pct, d]);
const burns = {
  label: 'Burn area estimator',
  render: () => `<div class="lw-sim"><div class="lw-label"><div class="lw-figure"><svg class="lw-body" viewBox="0 0 380 300" role="img" aria-label="Body regions, front and back"><text x="88" y="296" text-anchor="middle" class="axis-label">FRONT</text><text x="278" y="296" text-anchor="middle" class="axis-label">BACK</text>${REGIONS.map(([id, n, p, d]) => `<path data-region="${id}" data-pct="${p}" d="${d}"><title>${n} ${p}%</title></path>`).join('')}<g transform="translate(190 0)">${BACK.map(([id, n, p, d]) => `<path data-region="${id}" data-pct="${p}" d="${d}"><title>${n} ${p}%</title></path>`).join('')}</g></svg></div><div class="lw-side"><p class="subtle">Select each region with a partial- or full-thickness burn. Superficial (first-degree) burns are not counted.</p>${slider('kg', 'Weight', 20, 120, 1, 70, ' kg')}<div class="lw-stats" data-stats></div><p class="lw-explain" data-explain aria-live="polite"></p><button type="button" class="text-button" data-clear>Clear</button></div></div></div><p class="lw-note">Adult rule of nines. Children have proportionally larger heads, so clinicians use the Lund-Browder chart for them. Fluid formulas guide initial planning; clinicians adjust to urine output.</p>`,
  mount(node) {
    const on = new Set();
    const draw = () => {
      const { kg } = read(node); let pct = 0; node.querySelectorAll('[data-region]').forEach(p => { const sel = on.has(p.dataset.region); p.classList.toggle('hl', sel); if (sel) pct += Number(p.dataset.pct); });
      const total = 4 * kg * pct;
      node.querySelector('[data-stats]').innerHTML = `<span><strong>${pct}%</strong>total body surface area</span><span><strong>${Math.round(total).toLocaleString()} mL</strong>Parkland fluid, first 24 h</span><span><strong>${Math.round(total / 2).toLocaleString()} mL</strong>in the first 8 h</span>`;
      node.querySelector('[data-explain]').textContent = pct ? `Parkland formula: 4 mL × ${kg} kg × ${pct}% = ${Math.round(total).toLocaleString()} mL of lactated Ringer’s over 24 hours, half in the first 8 hours from the time of the burn and half over the next 16. ${pct >= 20 ? 'Burns over about 20% TBSA in adults typically need formal fluid resuscitation and burn-center referral.' : ''}` : 'Select regions to total the burned area.';
    };
    node.addEventListener('click', ev => { const p = ev.target.closest('[data-region]'); if (p) { on.has(p.dataset.region) ? on.delete(p.dataset.region) : on.add(p.dataset.region); draw(); } if (ev.target.closest('[data-clear]')) { on.clear(); draw(); } });
    node.addEventListener('input', draw);
    draw();
  },
};

/* ---------- Glasgow Coma Scale ---------- */
const GCS = [['Eye opening', [[4, 'Opens eyes spontaneously'], [3, 'Opens eyes to voice'], [2, 'Opens eyes to pressure/pain'], [1, 'No eye opening']]], ['Verbal response', [[5, 'Oriented'], [4, 'Confused conversation'], [3, 'Inappropriate words'], [2, 'Incomprehensible sounds'], [1, 'No verbal response']]], ['Motor response', [[6, 'Obeys commands'], [5, 'Localizes to pain'], [4, 'Withdraws from pain'], [3, 'Abnormal flexion (decorticate)'], [2, 'Extension (decerebrate)'], [1, 'No motor response']]]];
const gcs = {
  label: 'Glasgow Coma Scale',
  render: () => `<div class="lw-sim"><div class="lw-controls">${GCS.map(([n, opts], i) => `<label class="lw-select">${n}<select name="g${i}">${opts.map(([s, t]) => `<option value="${s}">${s} · ${e(t)}</option>`).join('')}</select></label>`).join('')}</div><div class="lw-stats" data-stats></div><p class="lw-explain" data-explain aria-live="polite"></p></div>`,
  mount(node) { live(node, () => { const v = read(node), total = Number(v.g0) + Number(v.g1) + Number(v.g2); node.querySelector('[data-stats]').innerHTML = `<span><strong>${total} / 15</strong>GCS total</span><span><strong>E${v.g0} V${v.g1} M${v.g2}</strong>component score</span>`; node.querySelector('[data-explain]').textContent = (total >= 13 ? 'Mild brain injury range (13–15).' : total >= 9 ? 'Moderate brain injury range (9–12).' : 'Severe range (8 or less). A common teaching rule is “8 or less, intubate,” because the airway may not be protected.') + ' The lowest possible score is 3, not 0. Trends over time matter more than one number.'; }); },
};

/* ---------- action potential ---------- */
const ap = {
  label: 'Action potential lab',
  render: () => `<div class="lw-sim"><div class="lw-controls">${slider('stim', 'Stimulus strength (depolarization)', 2, 30, 1, 20, ' mV')}<label class="lw-check"><input type="checkbox" name="block"> Apply a local anesthetic (blocks voltage-gated Na⁺ channels)</label><label class="lw-check"><input type="checkbox" name="second"> Deliver a second stimulus</label>${slider('gap', 'Second stimulus delay', 1, 9, 0.5, 6, ' ms')}</div><div class="lw-out"><div data-chart></div><p class="lw-explain" data-explain aria-live="polite"></p></div></div>`,
  mount(node) {
    live(node, () => {
      const v = read(node), rest = -70, thr = -55;
      const fires = (amp, refractoryExtra = 0) => !v.block && rest + amp >= thr + refractoryExtra;
      const spike = t => t < 0 ? 0 : t < 0.6 ? 0 : t < 1.2 ? (t - 0.6) / 0.6 * 100 : t < 2.6 ? 100 - (t - 1.2) / 1.4 * 112 : t < 6 ? -12 + (t - 2.6) / 3.4 * 12 : 0;
      const passive = (t, amp) => t < 0 ? 0 : amp * Math.exp(-t / 1.2) * Math.min(1, t / 0.3);
      const t2 = 1 + v.gap, firstFires = fires(v.stim);
      let secondFires = false, why = '';
      if (v.second) { const since = t2 - 1; if (firstFires && since < 2.6) why = 'The second stimulus landed in the absolute refractory period: Na⁺ channels are inactivated, so no stimulus of any size can fire a new action potential.'; else if (firstFires && since < 6) { secondFires = fires(v.stim, 12); why = secondFires ? 'Relative refractory period: the membrane is hyperpolarized, so only a stronger-than-normal stimulus fires a second action potential, which it did.' : 'Relative refractory period: the membrane is still hyperpolarized, so this stimulus was too weak to reach threshold a second time.'; } else { secondFires = fires(v.stim); } }
      const pts = []; for (let t = 0; t <= 12; t += 0.05) { let m = rest; m += firstFires ? spike(t - 1 + 0.6 - 0.6) : passive(t - 1, v.stim); if (v.second) m += secondFires ? spike(t - t2) : passive(t - t2, v.stim) * (firstFires && t2 - 1 < 2.6 ? 0.2 : 1); pts.push([t, clamp(m, -90, 45)]); }
      node.querySelector('[data-chart]').innerHTML = chart({ x: [0, 12], y: [-90, 45], xticks: [0, 2, 4, 6, 8, 10, 12], yticks: [-90, -70, -55, 0, 30], xlabel: 'Time (ms)', ylabel: 'Membrane potential (mV)', label: 'Membrane potential over time', hlines: [{ y: thr, cls: 'hline danger', label: 'Threshold −55 mV' }, { y: rest, cls: 'hline', label: 'Resting −70 mV' }], vlines: [{ x: 1, label: 'Stimulus' }, ...(v.second ? [{ x: t2, label: '2nd' }] : [])], series: [{ points: pts }] });
      node.querySelector('[data-explain]').textContent = (v.block ? 'With Na⁺ channels blocked, depolarization stays local and fades: no action potential travels, so pain signals never reach the brain. This is how local anesthetics such as lidocaine work.' : firstFires ? 'All-or-none: once threshold is reached, voltage-gated Na⁺ channels open and Na⁺ rushes in (depolarization to about +30 mV). Na⁺ channels then inactivate and K⁺ flows out (repolarization), briefly overshooting below rest (hyperpolarization).' : 'Below threshold: a graded, local depolarization fades without triggering an action potential. Raise the stimulus until the membrane reaches −55 mV.') + (why ? ' ' + why : '');
    });
  },
};

/* ---------- sleep hypnogram ---------- */
const NIGHT = [[0, 'W'], [10, 'N1'], [17, 'N2'], [35, 'N3'], [70, 'N2'], [80, 'REM'], [90, 'N2'], [110, 'N3'], [150, 'N2'], [165, 'REM'], [182, 'N2'], [205, 'N3'], [225, 'N2'], [255, 'REM'], [285, 'N1'], [290, 'N2'], [330, 'REM'], [365, 'N2'], [400, 'W'], [403, 'N2'], [425, 'REM'], [470, 'W'], [480, 'W']];
const STAGE = { W: [4, 'Awake', 'Beta and alpha waves: fast, low-amplitude activity. Alpha (8–12 Hz) appears when relaxed with eyes closed.', 0.25, 14], REM: [3, 'REM sleep', 'Rapid eye movements, vivid dreaming, fast desynchronized EEG resembling wakefulness, and near-paralysis of skeletal muscles (atonia). REM periods lengthen toward morning.', 0.3, 11], N1: [2, 'Stage N1', 'Light transition into sleep with theta waves (4–7 Hz). Easy to wake; hypnic jerks may occur.', 0.4, 6], N2: [1, 'Stage N2', 'True sleep marked by sleep spindles (bursts of 12–14 Hz) and K-complexes. About half of adult sleep time.', 0.45, 5], N3: [0, 'Stage N3 (slow-wave sleep)', 'Deep sleep with large, slow delta waves (under 4 Hz). Hardest to wake from; growth hormone release and physical restoration. Dominates the first half of the night.', 1, 1.5] };
const sleep = {
  label: 'Sleep cycle explorer',
  render: () => `<div class="lw-sim"><div class="lw-controls">${slider('min', 'Time of night', 0, 479, 1, 50, '')}</div><div class="lw-out"><div data-chart></div><div data-eeg></div><p class="lw-explain" data-explain aria-live="polite"></p><div class="lw-stats" data-stats></div></div></div>`,
  mount(node) {
    const stageAt = m => [...NIGHT].reverse().find(([s]) => m >= s)[1];
    const steps = []; NIGHT.forEach(([m, s], i) => { const y = STAGE[s][0]; if (i) steps.push([m, STAGE[NIGHT[i - 1][1]][0]]); steps.push([m, y]); });
    const totals = {}; for (let m = 0; m < 480; m++) totals[stageAt(m)] = (totals[stageAt(m)] || 0) + 1;
    live(node, () => {
      const { min } = read(node), st = stageAt(min), [, name, text, amp, hz] = STAGE[st];
      node.querySelector('[data-out="min"]').textContent = `${Math.floor(min / 60)} h ${min % 60} min after lights out`;
      node.querySelector('[data-chart]').innerHTML = chart({ x: [0, 480], y: [-0.5, 4.5], h: 220, xticks: [0, 60, 120, 180, 240, 300, 360, 420, 480], xfmt: x => x / 60 + 'h', yticks: [], xlabel: 'Hours of sleep', ylabel: 'Stage', label: 'Hypnogram', series: [{ points: steps }], vlines: [{ x: min, label: name }] }).replace('</svg>', ['N3', 'N2', 'N1', 'REM', 'Wake'].map((s, i) => `<text x="48" y="${220 - 42 - (i + 0.5) / 5 * 164 + 4}" text-anchor="end" class="band-label">${s}</text>`).join('') + '</svg>');
      const pts = []; for (let x = 0; x <= 600; x += 2) { const t = x / 600 * 2; let y = amp * Math.sin(2 * Math.PI * hz * t) + amp * 0.35 * Math.sin(2 * Math.PI * hz * 2.3 * t + 1); if (st === 'N2' && t > 0.8 && t < 1.1) y += 0.35 * Math.sin(2 * Math.PI * 13 * t); if (st === 'N2' && t > 1.4 && t < 1.6) y += -1.2 * Math.sin(Math.PI * (t - 1.4) / 0.2); pts.push(x + ',' + (40 - y * 28).toFixed(1)); }
      node.querySelector('[data-eeg]').innerHTML = `<svg class="lw-eeg" viewBox="0 0 600 80" preserveAspectRatio="none" role="img" aria-label="Sample EEG for ${e(name)}"><polyline points="${pts.join(' ')}"/></svg>`;
      node.querySelector('[data-explain]').innerHTML = `<strong>${e(name)}.</strong> ${e(text)}`;
      node.querySelector('[data-stats]').innerHTML = Object.entries(totals).map(([s, m]) => `<span><strong>${Math.round(m / 4.8)}%</strong>${STAGE[s][1]}</span>`).join('');
    });
  },
};

/* ---------- resistor color code ---------- */
const BANDS = [['Black', '#111'], ['Brown', '#7a4a1e'], ['Red', '#d62828'], ['Orange', '#f77f00'], ['Yellow', '#f4d000'], ['Green', '#2a9d3f'], ['Blue', '#1e5bd6'], ['Violet', '#8a3fd1'], ['Gray', '#8a8a8a'], ['White', '#f2f2f2']];
const MULT = [...BANDS.map(([n, c], i) => [n, c, 10 ** i]), ['Gold', '#c9a227', 0.1], ['Silver', '#b8bec6', 0.01]];
const TOL = [['Gold', '#c9a227', '±5%'], ['Silver', '#b8bec6', '±10%'], ['Brown', '#7a4a1e', '±1%'], ['Red', '#d62828', '±2%']];
const ohmText = v => v >= 1e6 ? fmt(v / 1e6, 2) + ' MΩ' : v >= 1e3 ? fmt(v / 1e3, 2) + ' kΩ' : fmt(v, 2) + ' Ω';
const resistor = {
  label: 'Resistor color code',
  render: () => `<div class="lw-sim"><div class="lw-modes" role="group" aria-label="Mode"><button type="button" class="chip on" data-mode="build">Build a resistor</button><button type="button" class="chip" data-mode="quiz">Read a random resistor</button></div><div class="lw-controls" data-builder><label class="lw-select">1st band (digit)<select name="b1">${BANDS.map(([n], i) => `<option value="${i}" ${i === 4 ? 'selected' : ''}>${n} = ${i}</option>`).join('')}</select></label><label class="lw-select">2nd band (digit)<select name="b2">${BANDS.map(([n], i) => `<option value="${i}" ${i === 7 ? 'selected' : ''}>${n} = ${i}</option>`).join('')}</select></label><label class="lw-select">3rd band (multiplier)<select name="m">${MULT.map(([n, , x], i) => `<option value="${i}" ${i === 2 ? 'selected' : ''}>${n} = ×${x}</option>`).join('')}</select></label><label class="lw-select">4th band (tolerance)<select name="t">${TOL.map(([n, , t], i) => `<option value="${i}">${n} = ${t}</option>`).join('')}</select></label></div><div data-svg></div><div class="lw-stats" data-stats></div><form class="lw-answer" data-quizform hidden><label>Value in ohms <input name="ans" inputmode="decimal" autocomplete="off"></label><button class="button" type="submit">Check</button><button class="text-button" type="button" data-new>New resistor</button></form><p class="lw-msg" aria-live="polite"></p><p class="lw-note">Mnemonic for 0–9: Black, Brown, Red, Orange, Yellow, Green, Blue, Violet, Gray, White (“Bad Beer Rots Our Young Guts But Vodka Goes Well”). Read from the end opposite the gold or silver tolerance band.</p></div>`,
  mount(node) {
    let mode = 'build', q = null;
    const draw = (b1, b2, m, t) => {
      const value = (b1 * 10 + b2) * MULT[m][2], cols = [BANDS[b1][1], BANDS[b2][1], MULT[m][1], TOL[t][1]], xs = [150, 190, 230, 300];
      node.querySelector('[data-svg]').innerHTML = `<svg class="lw-schematic" viewBox="0 0 460 120" role="img" aria-label="Resistor with ${BANDS[b1][0]}, ${BANDS[b2][0]}, ${MULT[m][0]} and ${TOL[t][0]} bands"><path class="wire" d="M20 60H110M350 60H440"/><rect x="110" y="32" width="240" height="56" rx="26" fill="#e8d6b0" stroke="#a88a5e"/>${cols.map((c, i) => `<rect x="${xs[i]}" y="32" width="16" height="56" fill="${c}" stroke="rgba(0,0,0,.25)"/>`).join('')}</svg>`;
      return value;
    };
    const build = () => { const v = read(node), value = draw(+v.b1, +v.b2, +v.m, +v.t); node.querySelector('[data-stats]').innerHTML = `<span><strong>${ohmText(value)}</strong>resistance</span><span><strong>${TOL[+v.t][2]}</strong>tolerance</span><span><strong>${ohmText(value * (1 - parseFloat(TOL[+v.t][2].slice(1)) / 100))} – ${ohmText(value * (1 + parseFloat(TOL[+v.t][2].slice(1)) / 100))}</strong>acceptable range</span>`; };
    const fresh = () => { q = { b1: 1 + Math.floor(Math.random() * 9), b2: Math.floor(Math.random() * 10), m: Math.floor(Math.random() * 6), t: Math.floor(Math.random() * 2) }; q.value = draw(q.b1, q.b2, q.m, q.t); node.querySelector('[data-stats]').innerHTML = ''; node.querySelector('[name=ans]').value = ''; node.querySelector('.lw-msg').textContent = 'What is this resistor’s value in ohms?'; node.querySelector('.lw-msg').dataset.state = ''; };
    node.addEventListener('click', ev => {
      const b = ev.target.closest('[data-mode]');
      if (b) { mode = b.dataset.mode; node.querySelectorAll('[data-mode]').forEach(x => x.classList.toggle('on', x === b)); node.querySelector('[data-builder]').hidden = mode !== 'build'; node.querySelector('[data-quizform]').hidden = mode !== 'quiz'; node.querySelector('.lw-msg').textContent = ''; if (mode === 'quiz') fresh(); else build(); }
      if (ev.target.closest('[data-new]')) fresh();
    });
    node.querySelector('[data-quizform]').addEventListener('submit', ev => { ev.preventDefault(); ev.stopPropagation(); const raw = String(node.querySelector('[name=ans]').value).trim().toLowerCase(); const mult = /m/.test(raw) ? 1e6 : /k/.test(raw) ? 1e3 : 1; const val = parseFloat(raw.replace(/[^0-9.]/g, '')) * mult; const ok = Math.abs(val - q.value) < q.value * 0.001 + 1e-9; const msg = node.querySelector('.lw-msg'); msg.textContent = ok ? `Correct: ${ohmText(q.value)} (${BANDS[q.b1][0]} ${q.b1}, ${BANDS[q.b2][0]} ${q.b2}, ×${MULT[q.m][2]}).` : `Not quite. ${BANDS[q.b1][0]} = ${q.b1}, ${BANDS[q.b2][0]} = ${q.b2}, ${MULT[q.m][0]} = ×${MULT[q.m][2]}, so ${q.b1}${q.b2} × ${MULT[q.m][2]} = ${ohmText(q.value)}.`; msg.dataset.state = ok ? 'good' : 'bad'; });
    node.addEventListener('change', () => { if (mode === 'build') build(); });
    build();
  },
};

export const SIMS = { pk, doseresponse, dosecalc, ohm, ecg, toothchart, glucose, conditioning, memory, vitals, burns, gcs, ap, sleep, resistor };
