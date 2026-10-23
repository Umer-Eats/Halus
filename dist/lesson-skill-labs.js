// Skill laboratories for the Health Professions courses: genetics crosses and chi-square,
// gel electrophoresis, ABO/Rh typing, transformation efficiency, a vital-signs reporting drill and intake/output.
// Every dataset is invented for practice. Reference ranges are teaching ranges, not orders.
const e = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const reset = '<button type="button" class="text-button" data-lab-reset>Reset activity</button>';
const msg = '<p class="lw-msg" role="status" aria-live="polite"></p>';
const note = t => `<p class="lw-note">${t}</p>`;
const fmt = (v, d = 2) => Number.isFinite(v) ? Number(v.toFixed(d)).toLocaleString() : '—';
const say = (r, text, ok) => { const m = r.querySelector('.lw-msg'); m.textContent = text; m.dataset.state = ok === undefined ? '' : ok ? 'good' : 'bad'; };
const still = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Punnett squares ---------- */
const sortGene = pair => pair.sort((x, y) => (x === x.toUpperCase() ? 0 : 1) - (y === y.toUpperCase() ? 0 : 1)).join('');
export function gametes(genotype, mode) {
  if (mode === 'xlinked') return genotype.match(/X[A-Za-z]|Y/g);
  if (mode === 'dihybrid') { const [a1, a2, b1, b2] = genotype; return [...new Set([a1 + b1, a1 + b2, a2 + b1, a2 + b2])].length === 4 ? [a1 + b1, a1 + b2, a2 + b1, a2 + b2] : [a1 + b1, a1 + b2, a2 + b1, a2 + b2]; }
  return [genotype[0], genotype[1]];
}
function combine(g1, g2, mode) {
  if (mode === 'xlinked') { const parts = [g1, g2].sort((x, y) => (x === 'Y') - (y === 'Y')); const xs = parts.filter(p => p !== 'Y').sort((x, y) => (x[1] === x[1].toUpperCase() ? 0 : 1) - (y[1] === y[1].toUpperCase() ? 0 : 1)); return xs.join('') + (parts.includes('Y') ? 'Y' : ''); }
  if (mode === 'dihybrid') return sortGene([g1[0], g2[0]]) + sortGene([g1[1], g2[1]]);
  return sortGene([g1, g2]);
}
function phenotype(genotype, mode) {
  // Works for any allele letters: an uppercase allele marks the dominant phenotype for its gene.
  const show = pair => { const L = pair[0].toUpperCase(); return /[A-Z]/.test(pair) ? L + '_' : L.toLowerCase() + L.toLowerCase(); };
  if (mode === 'xlinked') { const male = genotype.endsWith('Y'); const dom = /X[A-Z]/.test(genotype); return (male ? 'Male' : 'Female') + ', ' + (dom ? 'dominant trait' : 'recessive trait'); }
  if (mode === 'dihybrid') return show(genotype.slice(0, 2)) + ' ' + show(genotype.slice(2, 4));
  return /[A-Z]/.test(genotype) ? 'Dominant' : 'Recessive';
}
/** Full cross: grid, genotype counts and phenotype counts. */
export function punnettCross(p1, p2, mode = 'mono') {
  const rows = gametes(p1, mode), cols = gametes(p2, mode);
  const grid = rows.map(r => cols.map(c => combine(r, c, mode)));
  const geno = {}, pheno = {};
  grid.flat().forEach(g => { geno[g] = (geno[g] || 0) + 1; const p = phenotype(g, mode); pheno[p] = (pheno[p] || 0) + 1; });
  return {rows, cols, grid, geno, pheno, total: rows.length * cols.length};
}
const PARENTS = {
  mono: [['AA', 'Aa', 'aa'], ['AA', 'Aa', 'aa']],
  dihybrid: [['AaBb', 'AABB', 'aabb', 'AaBB', 'Aabb'], ['AaBb', 'AABB', 'aabb', 'aaBb', 'Aabb']],
  xlinked: [['XAXA', 'XAXa', 'XaXa'], ['XAY', 'XaY']],
};
const punnett = {
  label: 'Punnett square laboratory',
  render: w => `<div class="subject-lab skill-lab"><p>Choose a cross, predict the share of offspring with the dominant trait, then build the square.</p><div class="lab-controls"><label class="lab-control">Type of cross<select data-mode><option value="mono"${w.mode === 'mono' || !w.mode ? ' selected' : ''}>One gene (monohybrid)</option><option value="dihybrid"${w.mode === 'dihybrid' ? ' selected' : ''}>Two genes (dihybrid)</option><option value="xlinked"${w.mode === 'xlinked' ? ' selected' : ''}>X-linked</option></select></label><span></span><label class="lab-control">Parent 1<select data-p1></select></label><label class="lab-control">Parent 2<select data-p2></select></label></div><label class="lab-prediction">Predicted % with the dominant trait (for two genes: % showing both dominant traits)<input type="number" min="0" max="100" step="any" data-predict></label><div class="lw-actions"><button type="button" class="button" data-build>Build the square</button>${reset}</div><div class="punnett-out" data-out aria-live="polite"></div>${msg}${note('Teaching crosses assume complete dominance and independent assortment. Real traits can involve incomplete dominance, linkage and many genes.')}</div>`,
  mount(r, w) {
    const mode = r.querySelector('[data-mode]'), p1 = r.querySelector('[data-p1]'), p2 = r.querySelector('[data-p2]'), out = r.querySelector('[data-out]');
    const fill = () => { const [a, b] = PARENTS[mode.value]; p1.innerHTML = a.map(g => `<option>${g}</option>`).join(''); p2.innerHTML = b.map(g => `<option>${g}</option>`).join(''); if (mode.value === 'mono') { p1.value = 'Aa'; p2.value = 'Aa'; } out.innerHTML = ''; say(r, ''); };
    const label = g => g.replace(/X([A-Za-z])/g, 'X<sup>$1</sup>');
    const build = () => {
      const c = punnettCross(p1.value, p2.value, mode.value);
      const domShare = mode.value === 'dihybrid' ? c.grid.flat().filter(g => /A/.test(g) && /B/.test(g)).length / c.total : mode.value === 'xlinked' ? c.grid.flat().filter(g => /XA/.test(g)).length / c.total : c.grid.flat().filter(g => /A/.test(g)).length / c.total;
      out.innerHTML = `<table class="punnett-grid"><thead><tr><th></th>${c.cols.map(g => `<th scope="col">${label(g)}</th>`).join('')}</tr></thead><tbody>${c.rows.map((g, i) => `<tr><th scope="row">${label(g)}</th>${c.grid[i].map((x, j) => `<td style="--d:${(i * c.cols.length + j) * 40}ms" class="${/A/.test(x) ? 'dom' : 'rec'}">${label(x)}</td>`).join('')}</tr>`).join('')}</tbody></table><div class="punnett-ratios"><p><strong>Genotypes:</strong> ${Object.entries(c.geno).map(([g, n]) => `${label(g)} ${n}/${c.total}`).join(' · ')}</p><p><strong>Phenotypes:</strong> ${Object.entries(c.pheno).map(([p, n]) => `${e(p)} ${n}/${c.total}`).join(' · ')}</p></div>`;
      const guess = r.querySelector('[data-predict]').value;
      if (guess !== '') { const ok = Math.abs(Number(guess) - domShare * 100) < 0.6; say(r, ok ? `Correct: ${fmt(domShare * 100, 1)}%.` : `The square gives ${fmt(domShare * 100, 1)}%. Compare each box with your prediction.`, ok); }
      else say(r, `Dominant share: ${fmt(domShare * 100, 1)}%. Next time, predict first.`);
      return domShare;
    };
    mode.addEventListener('change', fill);
    r.querySelector('[data-build]').addEventListener('click', build);
    r.querySelector('[data-lab-reset]').addEventListener('click', () => { mode.value = w.mode || 'mono'; r.querySelector('[data-predict]').value = ''; fill(); });
    fill();
  },
};

/* ---------- chi-square goodness of fit ---------- */
const CRITICAL = {1: 3.84, 2: 5.99, 3: 7.81};
/** Chi-square test against an expected ratio; returns expected counts, statistic, df and decision at p = 0.05. */
export function chiSquare(observed, ratio) {
  const n = observed.reduce((a, b) => a + b, 0), parts = ratio.reduce((a, b) => a + b, 0);
  const expected = ratio.map(x => n * x / parts);
  const terms = observed.map((o, i) => (o - expected[i]) ** 2 / expected[i]);
  const chi = terms.reduce((a, b) => a + b, 0), df = observed.length - 1;
  return {n, expected, terms, chi, df, critical: CRITICAL[df], reject: chi > CRITICAL[df]};
}
const RATIOS = {'3:1': [3, 1], '1:1': [1, 1], '1:2:1': [1, 2, 1], '9:3:3:1': [9, 3, 3, 1]};
const DEFAULT_OBS = {'3:1': [290, 110], '1:1': [52, 48], '1:2:1': [26, 54, 20], '9:3:3:1': [315, 108, 101, 32]};
const chisquare = {
  label: 'Chi-square laboratory',
  render: w => `<div class="subject-lab skill-lab"><p>Enter observed offspring counts from an invented cross, choose the ratio your hypothesis predicts, and test whether the difference could be due to chance.</p><label class="lab-control">Hypothesized ratio<select data-ratio>${Object.keys(RATIOS).map(k => `<option${k === (w.ratio || '3:1') ? ' selected' : ''}>${k}</option>`).join('')}</select></label><div class="chi-inputs" data-obs></div><div class="lw-actions"><button type="button" class="button" data-run>Calculate χ²</button>${reset}</div><div data-table aria-live="polite"></div><div class="science-choices" data-decide hidden><button type="button" class="chip" data-call="fit">The data fit the hypothesis</button><button type="button" class="chip" data-call="reject">Reject the hypothesis</button></div>${msg}${note('Critical values at p = 0.05: df 1 = 3.84, df 2 = 5.99, df 3 = 7.81. Failing to reject a hypothesis does not prove it true.')}</div>`,
  mount(r, w) {
    const sel = r.querySelector('[data-ratio]'), box = r.querySelector('[data-obs]'), table = r.querySelector('[data-table]'), decide = r.querySelector('[data-decide]');
    let result = null;
    const fields = () => { const obs = DEFAULT_OBS[sel.value]; box.innerHTML = obs.map((o, i) => `<label class="lab-control">Class ${i + 1} observed<input type="number" min="0" step="1" value="${o}" data-o="${i}"></label>`).join(''); table.innerHTML = ''; decide.hidden = true; say(r, ''); };
    r.querySelector('[data-run]').addEventListener('click', () => {
      const obs = [...box.querySelectorAll('[data-o]')].map(i => Number(i.value));
      if (obs.some(v => !Number.isFinite(v) || v < 0) || obs.reduce((a, b) => a + b, 0) === 0) return say(r, 'Enter whole-number counts for every class.', false);
      result = chiSquare(obs, RATIOS[sel.value]);
      table.innerHTML = `<table class="chi-table"><thead><tr><th>Class</th><th>Observed (O)</th><th>Expected (E)</th><th>(O − E)² ÷ E</th></tr></thead><tbody>${obs.map((o, i) => `<tr><th scope="row">${i + 1}</th><td>${o}</td><td>${fmt(result.expected[i])}</td><td>${fmt(result.terms[i], 3)}</td></tr>`).join('')}</tbody></table><p><strong>χ² = ${fmt(result.chi, 3)}</strong> with ${result.df} degree${result.df > 1 ? 's' : ''} of freedom. Critical value at p = 0.05: ${result.critical}.</p>`;
      decide.hidden = false; say(r, 'Now decide: do the data fit the hypothesis?');
    });
    decide.addEventListener('click', ev => { const b = ev.target.closest('[data-call]'); if (!b || !result) return; const ok = (b.dataset.call === 'reject') === result.reject; say(r, ok ? (result.reject ? 'Correct. χ² exceeds the critical value, so the difference is unlikely to be chance alone.' : 'Correct. χ² is below the critical value, so chance can explain the difference; the hypothesis is not rejected.') : 'Compare χ² with the critical value for these degrees of freedom and try again.', ok); });
    sel.addEventListener('change', fields);
    r.querySelector('[data-lab-reset]').addEventListener('click', () => { sel.value = w.ratio || '3:1'; fields(); });
    fields();
  },
};

/* ---------- gel electrophoresis ---------- */
/** Fraction of the gel length a fragment travels: smaller fragments travel farther (log scale). */
export function bandPosition(bp, min = 100, max = 10000) {
  const t = (Math.log10(max) - Math.log10(Math.min(max, Math.max(min, bp)))) / (Math.log10(max) - Math.log10(min));
  return 0.08 + t * 0.84;
}
const GELS = {
  fingerprint: {title: 'Which suspect matches the crime-scene sample?', lanes: [['Ladder', [5000, 3000, 2000, 1000, 500, 250]], ['Crime scene', [4200, 1800, 700]], ['Suspect 1', [4200, 2600, 900]], ['Suspect 2', [4200, 1800, 700]], ['Suspect 3', [3500, 1800, 400]]], answer: 3, why: 'Suspect 2 has every band at the same positions as the crime-scene sample.'},
  digest: {title: 'Which lane shows a plasmid cut once by a restriction enzyme?', lanes: [['Ladder', [5000, 3000, 2000, 1000, 500, 250]], ['Uncut plasmid', [3800, 2400]], ['Cut once', [4500]], ['Cut twice', [3000, 1500]]], answer: 2, why: 'A circular plasmid cut at one site becomes one linear fragment (one band). Uncut plasmid often shows extra bands from supercoiled and nicked forms.'},
  sizing: {title: 'About how large is the unknown fragment in lane 2?', lanes: [['Ladder', [5000, 3000, 2000, 1000, 500, 250]], ['Unknown', [750]]], answer: null, choices: ['About 750 bp', 'About 2,500 bp', 'About 4,000 bp', 'About 150 bp'], correct: 0, why: 'The band runs between the 1,000 and 500 bp ladder bands, closer to the middle, so about 750 bp.'},
};
const gel = {
  label: 'Gel electrophoresis simulator',
  render: w => `<div class="subject-lab skill-lab"><label class="lab-control">Experiment<select data-gel>${Object.entries(GELS).map(([k, g]) => `<option value="${k}"${k === (w.gel || 'fingerprint') ? ' selected' : ''}>${e(g.title)}</option>`).join('')}</select></label><div class="gel-rig"><span class="gel-pole neg">− (black)</span><div class="gel" data-lanes></div><span class="gel-pole pos">+ (red)</span></div><div class="lw-actions"><button type="button" class="button" data-run>Run the gel</button>${reset}</div><div class="science-choices" data-answers hidden></div>${msg}${note('DNA is negatively charged, so it migrates toward the positive (red) electrode. Smaller fragments move farther through the agarose. Simulated results.')}</div>`,
  mount(r, w) {
    const sel = r.querySelector('[data-gel]'), lanes = r.querySelector('[data-lanes]'), ans = r.querySelector('[data-answers]');
    const draw = () => {
      const g = GELS[sel.value];
      lanes.innerHTML = g.lanes.map(([name, bands], i) => `<div class="gel-lane"><span class="well"></span>${bands.map(bp => `<i class="band" data-y="${bandPosition(bp)}" title="${bp.toLocaleString()} bp"></i>`).join('')}<small>${i + 1}. ${e(name)}</small></div>`).join('');
      lanes.querySelectorAll('.band').forEach(b => b.style.top = '4%');
      ans.hidden = true; say(r, '');
    };
    r.querySelector('[data-run]').addEventListener('click', () => {
      const g = GELS[sel.value];
      lanes.querySelectorAll('.band').forEach(b => { b.classList.toggle('instant', still()); requestAnimationFrame(() => { b.style.top = (Number(b.dataset.y) * 100) + '%'; }); });
      const opts = g.choices ? g.choices.map((c, i) => [c, i]) : g.lanes.slice(1).map(([n], i) => [`Lane ${i + 2}: ${n}`, i + 1]);
      ans.innerHTML = opts.map(([t, v]) => `<button type="button" class="chip" data-pick="${v}">${e(t)}</button>`).join(''); ans.hidden = false;
      say(r, 'Bands are separating. ' + g.title);
    });
    ans.addEventListener('click', ev => { const b = ev.target.closest('[data-pick]'); if (!b) return; const g = GELS[sel.value]; const ok = Number(b.dataset.pick) === (g.choices ? g.correct : g.answer); say(r, (ok ? 'Correct. ' : 'Not quite. ') + g.why, ok); });
    sel.addEventListener('change', draw);
    r.querySelector('[data-lab-reset]').addEventListener('click', () => { sel.value = w.gel || 'fingerprint'; draw(); });
    draw();
  },
};

/* ---------- ABO/Rh forward typing ---------- */
/** Blood type from forward typing: agglutination with anti-A, anti-B and anti-D reagents. */
export function aboType(antiA, antiB, antiD) {
  const abo = antiA && antiB ? 'AB' : antiA ? 'A' : antiB ? 'B' : 'O';
  return abo + (antiD ? '+' : '−');
}
const TYPES = ['A+', 'A−', 'B+', 'B−', 'AB+', 'AB−', 'O+', 'O−'];
const abotype = {
  label: 'Blood typing simulator',
  render: () => `<div class="subject-lab skill-lab"><p>A simulated slide test has been run with three reagents. Clumping (agglutination) means the antigen is present on the red cells.</p><div class="abo-wells" data-wells></div><p>What is the blood type?</p><div class="science-choices" data-types>${TYPES.map(t => `<button type="button" class="chip" data-type="${t}">${t}</button>`).join('')}</div><div class="lw-actions"><button type="button" class="button secondary" data-next>New sample →</button>${reset}</div>${msg}${note('Simulated forward (cell) typing. Laboratories confirm ABO with reverse (serum) typing and follow their own procedures.')}</div>`,
  mount(r) {
    let current, count = 0;
    const draw = (seed) => {
      const t = seed || TYPES[Math.floor(Math.random() * TYPES.length)];
      current = {a: /A/.test(t), b: /B/.test(t), d: t.endsWith('+'), type: t};
      r.querySelector('[data-wells]').innerHTML = [['Anti-A', current.a], ['Anti-B', current.b], ['Anti-D (Rh)', current.d]].map(([n, pos]) => `<div class="abo-well ${pos ? 'clump' : 'smooth'}"><span class="drop">${pos ? '<i></i><i></i><i></i><i></i><i></i><i></i>' : ''}</span><small>${n}</small><em>${pos ? 'Agglutination' : 'No agglutination'}</em></div>`).join('');
      say(r, '');
    };
    r.querySelector('[data-types]').addEventListener('click', ev => { const b = ev.target.closest('[data-type]'); if (!b) return; const ok = b.dataset.type === current.type; if (ok) count++; say(r, ok ? `Correct: ${current.type}. ${count} correct so far.` : `Not quite. Read each well: anti-A ${current.a ? 'clumped' : 'did not clump'}, anti-B ${current.b ? 'clumped' : 'did not clump'}, anti-D ${current.d ? 'clumped' : 'did not clump'}.`, ok); });
    r.querySelector('[data-next]').addEventListener('click', () => draw());
    r.querySelector('[data-lab-reset]').addEventListener('click', () => { count = 0; draw('A+'); });
    draw('A+');
  },
};

/* ---------- transformation efficiency ---------- */
/** Transformants per microgram of DNA: colonies ÷ (µg DNA × fraction of the cell suspension spread). */
export function transformationEfficiency(colonies, ugDna, spreadUl, totalUl) {
  const spreadDna = ugDna * (spreadUl / totalUl);
  return {spreadDna, efficiency: colonies / spreadDna};
}
const transformation = {
  label: 'Transformation efficiency calculator',
  render: () => `<div class="subject-lab skill-lab"><p>Use invented results from a bacterial transformation. Predict the efficiency in transformants per microgram, then check your work.</p><div class="lab-controls"><label class="lab-control">Colonies on the plate<input type="number" min="0" step="1" value="120" data-c></label><label class="lab-control">Total DNA used (µg)<input type="number" min="0" step="any" value="0.8" data-dna></label><label class="lab-control">Volume spread on plate (µL)<input type="number" min="0" step="any" value="100" data-spread></label><label class="lab-control">Total volume of cell suspension (µL)<input type="number" min="0" step="any" value="510" data-total></label></div><label class="lab-prediction">Your efficiency (transformants/µg)<input type="number" min="0" step="any" data-predict></label><div class="lw-actions"><button type="button" class="button" data-check>Check calculation</button>${reset}</div><div class="lab-steps" data-steps hidden></div>${msg}${note('Invented values. Use the volumes and DNA amounts stated in your own protocol or scenario.')}</div>`,
  mount(r) {
    const v = k => Number(r.querySelector(`[data-${k}]`).value);
    r.querySelector('[data-check]').addEventListener('click', () => {
      if (v('dna') <= 0 || v('spread') <= 0 || v('total') <= 0) return say(r, 'Enter positive values for DNA and volumes.', false);
      const res = transformationEfficiency(v('c'), v('dna'), v('spread'), v('total'));
      const box = r.querySelector('[data-steps]'); box.hidden = false;
      box.innerHTML = `<ol><li>Fraction spread = ${v('spread')} µL ÷ ${v('total')} µL = ${fmt(v('spread') / v('total'), 4)}</li><li>DNA spread = ${v('dna')} µg × ${fmt(v('spread') / v('total'), 4)} = ${fmt(res.spreadDna, 4)} µg</li><li>Efficiency = ${v('c')} colonies ÷ ${fmt(res.spreadDna, 4)} µg = <strong>${fmt(res.efficiency, 0)} transformants/µg</strong></li></ol>`;
      const g = r.querySelector('[data-predict]').value;
      if (g === '') return say(r, 'Steps shown. Next time, predict first.');
      const ok = Math.abs(Number(g) - res.efficiency) / res.efficiency < 0.02;
      say(r, ok ? 'Correct within rounding.' : 'Compare your steps with the worked solution; the most common error is using all the DNA instead of the fraction spread.', ok);
    });
    r.querySelector('[data-lab-reset]').addEventListener('click', () => { r.querySelectorAll('input').forEach(i => i.value = i.defaultValue); r.querySelector('[data-steps]').hidden = true; say(r, ''); });
  },
};

/* ---------- vital signs reporting drill ---------- */
const RANGES = {temp: [97.0, 99.5], pulse: [60, 100], resp: [12, 20], sys: [90, 139], dia: [60, 89], spo2: [95, 100]};
/** Is an adult reading inside the teaching range used in this drill? */
export function vitalInRange(kind, value) { const [lo, hi] = RANGES[kind]; return value >= lo && value <= hi; }
const pick = (lo, hi, step = 1) => Math.round((lo + Math.random() * (hi - lo)) / step) * step;
function sampleVitals() {
  const odd = () => Math.random() < 0.35;
  return {temp: Number((odd() ? pick(100.2, 102.4, 0.1) : pick(97.2, 99.2, 0.1)).toFixed(1)), pulse: odd() ? pick(105, 128) : pick(62, 96), resp: odd() ? pick(22, 28) : pick(13, 19), sys: odd() ? pick(150, 172) : pick(104, 132), dia: odd() ? pick(92, 102) : pick(64, 84), spo2: odd() ? pick(88, 93) : pick(96, 99)};
}
const VLABEL = {temp: ['Temperature (oral)', '°F'], pulse: ['Pulse', 'beats/min'], resp: ['Respirations', 'breaths/min'], bp: ['Blood pressure', 'mm Hg'], spo2: ['Oxygen saturation', '%']};
const vitalsreport = {
  label: 'Vital signs reporting drill',
  render: w => `<div class="subject-lab skill-lab"><p>An adult ${e(w?.person || 'resident')}’s vital signs have just been measured. Decide which readings are within the usual adult range and which you would report to the ${e(w?.reportTo || 'nurse')} right away.</p><div class="vitals-grid" data-grid></div><div class="lw-actions"><button type="button" class="button" data-check>Check my report</button><button type="button" class="button secondary" data-next>New ${e(w?.person || 'resident')} →</button>${reset}</div>${msg}${note('Teaching ranges: temperature 97.0–99.5 °F oral, pulse 60–100, respirations 12–20, blood pressure 90–139 / 60–89, SpO₂ 95–100%. Ranges differ by textbook and facility; always follow the care plan and report any change from the person’s baseline.')}</div>`,
  mount(r) {
    let v;
    const draw = s => {
      v = s || sampleVitals();
      const rows = [['temp', v.temp], ['pulse', v.pulse], ['resp', v.resp], ['bp', `${v.sys}/${v.dia}`], ['spo2', v.spo2]];
      r.querySelector('[data-grid]').innerHTML = rows.map(([k, val]) => `<fieldset class="vital-row" data-k="${k}"><legend>${VLABEL[k][0]}: <strong>${val}</strong> ${VLABEL[k][1]}</legend><label><input type="radio" name="v-${k}" value="ok"> Within range</label><label><input type="radio" name="v-${k}" value="report"> Report</label><span class="vital-mark" aria-live="polite"></span></fieldset>`).join('');
      say(r, '');
    };
    const truth = k => k === 'bp' ? !(vitalInRange('sys', v.sys) && vitalInRange('dia', v.dia)) : !vitalInRange(k, v[k]);
    r.querySelector('[data-check]').addEventListener('click', () => {
      let right = 0, blank = 0;
      r.querySelectorAll('.vital-row').forEach(row => { const k = row.dataset.k, c = row.querySelector('input:checked'), mark = row.querySelector('.vital-mark'); if (!c) { blank++; mark.textContent = ''; row.dataset.state = ''; return; } const ok = (c.value === 'report') === truth(k); row.dataset.state = ok ? 'good' : 'bad'; mark.textContent = ok ? '✓' : truth(k) ? 'Outside the range: report' : 'Within the range'; if (ok) right++; });
      say(r, blank ? `Choose an answer for every reading (${blank} left).` : right === 5 ? 'All five correct. Record the values and report abnormal ones promptly.' : `${right} of 5 correct. Review the ranges in the note below.`, !blank && right === 5);
    });
    r.querySelector('[data-next]').addEventListener('click', () => draw());
    r.querySelector('[data-lab-reset]').addEventListener('click', () => draw({temp: 98.4, pulse: 112, resp: 18, sys: 128, dia: 82, spo2: 97}));
    draw({temp: 98.4, pulse: 112, resp: 18, sys: 128, dia: 82, spo2: 97});
  },
};

/* ---------- intake and output ---------- */
/** Convert a container in ounces (or mL) and the fraction consumed to whole millilitres (1 oz = 30 mL). */
export function intakeMl(size, unit, fraction) { return Math.round((unit === 'oz' ? size * 30 : size) * fraction); }
/** Round an output reading that falls between graduate lines up to the next 25 mL. */
export function roundUp25(ml) { return Math.ceil(ml / 25) * 25; }
const FRACTION = {1: 'all', 0.75: 'three-quarters', 0.5: 'half', 0.25: 'one-quarter'};
const IO_CASES = [
  {intake: [['Coffee cup', 8, 'oz', 1], ['Orange juice glass', 4, 'oz', 0.5], ['Water glass', 240, 'mL', 0.75]], output: [['Urinal', 340], ['Urinary drainage bag', 410]]},
  {intake: [['Milk carton', 8, 'oz', 0.75], ['Bowl of broth', 6, 'oz', 1], ['Gelatin cup', 4, 'oz', 0.5]], output: [['Bedpan (urine)', 280], ['Emesis basin', 110]]},
  {intake: [['Water bottle', 16, 'oz', 0.5], ['Cup of tea', 6, 'oz', 0.5], ['Ice pop', 3, 'oz', 1]], output: [['Urinary drainage bag', 515]]},
];
const iolab = {
  label: 'Intake and output calculator',
  render: () => `<div class="subject-lab skill-lab"><p>Total this shift’s fluid intake and output in millilitres. Convert ounces using 1 oz = 30 mL, and if an output reading falls between graduate lines, round up to the nearest 25 mL.</p><div class="io-grid"><div><h5>Intake</h5><ul data-in></ul></div><div><h5>Output (graduate readings)</h5><ul data-out></ul></div></div><div class="io-answers"><label class="lab-prediction">Total intake (mL)<input type="number" min="0" step="1" data-tin></label><label class="lab-prediction">Total output (mL)<input type="number" min="0" step="1" data-tout></label></div><div class="lw-actions"><button type="button" class="button" data-check>Check totals</button><button type="button" class="button secondary" data-next>Next shift →</button>${reset}</div>${msg}<div class="io-work" data-work hidden></div>${note('Practice values are invented. Follow your agency’s conversion and rounding rules and report a client who has not voided for 8 hours.')}</div>`,
  mount(r) {
    let at = 0;
    const draw = () => {
      const c = IO_CASES[at];
      r.querySelector('[data-in]').innerHTML = c.intake.map(([l, size, unit, f]) => `<li>${e(l)}: ${size} ${unit}, drank ${FRACTION[f]}</li>`).join('');
      r.querySelector('[data-out]').innerHTML = c.output.map(([l, ml]) => `<li>${e(l)}: reading between lines at ${ml} mL</li>`).join('');
      r.querySelectorAll('input').forEach(i => { i.value = ''; });
      r.querySelector('[data-work]').hidden = true; say(r, '');
    };
    r.querySelector('[data-check]').addEventListener('click', () => {
      const c = IO_CASES[at], tin = r.querySelector('[data-tin]'), tout = r.querySelector('[data-tout]');
      if (tin.value === '' || tout.value === '') { (tin.value === '' ? tin : tout).reportValidity(); say(r, 'Enter both totals first.'); return; }
      const ins = c.intake.map(([l, size, unit, f]) => [l, intakeMl(size, unit, f), size, unit, f]), outs = c.output.map(([l, ml]) => [l, roundUp25(ml), ml]);
      const ti = ins.reduce((n, x) => n + x[1], 0), to = outs.reduce((n, x) => n + x[1], 0);
      const okI = Number(tin.value) === ti, okO = Number(tout.value) === to;
      const w = r.querySelector('[data-work]'); w.hidden = false;
      w.innerHTML = `<p><strong>Intake:</strong> ${ins.map(([l, v, size, unit, f]) => `${e(l)} ${unit === 'oz' ? `${size} oz × 30` : `${size} mL`} × ${f} = ${v} mL`).join('; ')} → <strong>${ti} mL</strong></p><p><strong>Output:</strong> ${outs.map(([l, v, raw]) => `${e(l)} ${raw} mL rounds up to ${v} mL`).join('; ')} → <strong>${to} mL</strong></p>`;
      say(r, okI && okO ? 'Both totals are correct. Record them in mL on the I&O form with the time.' : `${okI ? 'Intake is correct.' : 'Check the intake.'} ${okO ? 'Output is correct.' : 'Check the output.'} Compare with the worked steps.`, okI && okO);
    });
    r.querySelector('[data-next]').addEventListener('click', () => { at = (at + 1) % IO_CASES.length; draw(); });
    r.querySelector('[data-lab-reset]').addEventListener('click', () => { at = 0; draw(); });
    draw();
  },
};

/* ---------- transcription, translation and mutations ---------- */
const BASES = 'UCAG', CODE = 'FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG';
const AA3 = {F: 'Phe', L: 'Leu', S: 'Ser', Y: 'Tyr', '*': 'Stop', C: 'Cys', W: 'Trp', P: 'Pro', H: 'His', Q: 'Gln', R: 'Arg', I: 'Ile', M: 'Met', T: 'Thr', N: 'Asn', K: 'Lys', V: 'Val', A: 'Ala', D: 'Asp', E: 'Glu', G: 'Gly'};
/** mRNA complementary to a DNA template strand (read 3′→5′), written 5′→3′. */
export function transcribe(template) { return template.toUpperCase().replace(/[^ATCG]/g, '').split('').map(b => ({A: 'U', T: 'A', C: 'G', G: 'C'})[b]).join(''); }
/** Translate mRNA codon by codon, stopping after the first stop codon. */
export function translate(mrna) {
  const out = [];
  for (let i = 0; i + 3 <= mrna.length; i += 3) {
    const c = mrna.slice(i, i + 3), idx = 16 * BASES.indexOf(c[0]) + 4 * BASES.indexOf(c[1]) + BASES.indexOf(c[2]);
    const aa = AA3[CODE[idx]]; out.push(aa); if (aa === 'Stop') break;
  }
  return out;
}
/** Classify a mutation by comparing an original and a mutated template strand. */
export function mutationType(orig, mut) {
  if (orig.length !== mut.length) return mut.length > orig.length ? 'frameshift-insertion' : 'frameshift-deletion';
  const a = translate(transcribe(orig)), b = translate(transcribe(mut));
  if (a.join('-') === b.join('-')) return 'silent';
  const stopA = a.indexOf('Stop'), stopB = b.indexOf('Stop');
  return stopB !== -1 && (stopA === -1 || stopB < stopA) ? 'nonsense' : 'missense';
}
const DNA_CASES = [
  {t: 'TACGGATTCACT', m: 'TACGGGTTCACT'},
  {t: 'TACAAACCGATT', m: 'TACATACCGATT'},
  {t: 'TACCTTGGAACT', m: 'TACATTGGAACT'},
  {t: 'TACGCATGGATC', m: 'TACGCTGGATC'},
  {t: 'TACTTCGGCATT', m: 'TACTTCAGGCATT'},
];
const MUT_LABEL = {silent: 'Silent substitution', missense: 'Missense substitution', nonsense: 'Nonsense substitution', 'frameshift-insertion': 'Frameshift (insertion)', 'frameshift-deletion': 'Frameshift (deletion)'};
const triplets = x => x.match(/.{1,3}/g).join(' ');
const codonlab = {
  label: 'DNA to protein lab',
  render: () => `<div class="subject-lab skill-lab"><p>Transcribe the DNA template strand into mRNA, check the protein it codes for, then classify a mutation.</p><p class="dna-strand">Template DNA (3′→5′): <code data-tmpl></code></p><label class="lab-prediction">mRNA (5′→3′)<input type="text" data-mrna autocomplete="off" autocapitalize="characters" spellcheck="false"></label><div class="lw-actions"><button type="button" class="button" data-check>Check mRNA</button></div><div data-protein aria-live="polite"></div><fieldset class="dna-mut" data-mutbox hidden aria-label="Classify the mutation"><p class="dna-strand">Mutated template (3′→5′): <code data-mut></code></p><div data-mutprot></div><div class="dna-choices">${Object.entries(MUT_LABEL).map(([k, l]) => `<label><input type="radio" name="mut" value="${k}"> ${l}</label>`).join('')}</div><button type="button" class="button" data-classify>Check mutation type</button></fieldset><div class="lw-actions"><button type="button" class="button secondary" data-next>Next sequence →</button>${reset}</div>${msg}${note('Sequences are invented short practice strands. Template bases pair with RNA bases A–U, T–A, C–G and G–C during transcription.')}</div>`,
  mount(r) {
    let at = 0;
    const show = (el, aas) => { el.innerHTML = `<p>Codons → amino acids: ${aas.map(a => `<span class="aa">${a}</span>`).join(' – ')}</p>`; };
    const draw = () => {
      const c = DNA_CASES[at];
      r.querySelector('[data-tmpl]').textContent = triplets(c.t);
      r.querySelector('[data-mrna]').value = ''; r.querySelector('[data-protein]').innerHTML = '';
      r.querySelector('[data-mutbox]').hidden = true; r.querySelectorAll('[name=mut]').forEach(x => { x.checked = false; }); say(r, '');
    };
    r.querySelector('[data-check]').addEventListener('click', () => {
      const c = DNA_CASES[at], want = transcribe(c.t), got = r.querySelector('[data-mrna]').value.toUpperCase().replace(/[^AUCGT]/g, '');
      if (!got) { say(r, 'Type the mRNA sequence first.'); return; }
      if (got.includes('T')) { say(r, 'RNA uses uracil (U) instead of thymine (T). Try again.', false); return; }
      if (got !== want) say(r, `Not quite. Pair each template base: A→U, T→A, C→G, G→C. The correct mRNA is ${triplets(want)}.`, false);
      else say(r, 'Correct mRNA. Now classify the mutation below.', true);
      show(r.querySelector('[data-protein]'), translate(want));
      r.querySelector('[data-mutbox]').hidden = false;
      r.querySelector('[data-mut]').textContent = triplets(c.m);
      show(r.querySelector('[data-mutprot]'), translate(transcribe(c.m)));
    });
    r.querySelector('[data-classify]').addEventListener('click', () => {
      const c = DNA_CASES[at], pick = r.querySelector('[name=mut]:checked');
      if (!pick) { say(r, 'Choose a mutation type.'); return; }
      const t = mutationType(c.t, c.m);
      say(r, pick.value === t ? `Correct: ${MUT_LABEL[t]}.` : `This is a ${MUT_LABEL[t].toLowerCase()}. Compare the strand lengths and the amino acids produced.`, pick.value === t);
    });
    r.querySelector('[data-next]').addEventListener('click', () => { at = (at + 1) % DNA_CASES.length; draw(); });
    r.querySelector('[data-lab-reset]').addEventListener('click', () => { at = 0; draw(); });
    draw();
  },
};

/* ---------- Hardy-Weinberg ---------- */
/** Allele and genotype frequencies from the frequency of the recessive phenotype (q²). */
export function hardyWeinberg(qsq) { const q = Math.sqrt(qsq), p = 1 - q; return {q, p, p2: p * p, twopq: 2 * p * q, q2: qsq}; }
const HW_CASES = [[36, 400, 'beetles with white wing covers'], [16, 100, 'plants with yellow seeds'], [9, 100, 'flies with vestigial wings'], [1, 2500, 'newborns with a rare recessive condition']];
const hwlab = {
  label: 'Hardy-Weinberg calculator',
  render: () => `<div class="subject-lab skill-lab"><p data-hwq></p><div class="io-answers"><label class="lab-prediction">Recessive allele frequency (q)<input type="number" step="0.001" min="0" max="1" data-q></label><label class="lab-prediction">Carrier frequency (2pq)<input type="number" step="0.001" min="0" max="1" data-c></label></div><div class="lw-actions"><button type="button" class="button" data-check>Check</button><button type="button" class="button secondary" data-next>Next population →</button>${reset}</div>${msg}<div class="io-work" data-work hidden></div>${note('Populations are invented. Hardy-Weinberg assumes no mutation, random mating, no selection, a very large population and no gene flow.')}</div>`,
  mount(r) {
    let at = 0;
    const draw = () => { const [n, t, what] = HW_CASES[at]; r.querySelector('[data-hwq]').innerHTML = `In a population at Hardy-Weinberg equilibrium, <strong>${n} of ${t.toLocaleString()}</strong> are ${e(what)}, the homozygous recessive phenotype. Estimate q and the carrier frequency.`; r.querySelectorAll('input').forEach(i => { i.value = ''; }); r.querySelector('[data-work]').hidden = true; say(r, ''); };
    r.querySelector('[data-check]').addEventListener('click', () => {
      const [n, t] = HW_CASES[at], h = hardyWeinberg(n / t), qi = r.querySelector('[data-q]'), ci = r.querySelector('[data-c]');
      if (qi.value === '' || ci.value === '') { say(r, 'Enter both values first.'); return; }
      const ok = Math.abs(Number(qi.value) - h.q) < 0.006 && Math.abs(Number(ci.value) - h.twopq) < 0.006;
      const w = r.querySelector('[data-work]'); w.hidden = false;
      w.innerHTML = `<p>q² = ${n} ÷ ${t.toLocaleString()} = ${fmt(h.q2, 4)} → q = √q² = ${fmt(h.q, 3)}; p = 1 − q = ${fmt(h.p, 3)}</p><p>p² = ${fmt(h.p2, 3)}, 2pq = ${fmt(h.twopq, 3)}, q² = ${fmt(h.q2, 4)} (they sum to 1)</p>`;
      say(r, ok ? 'Correct. For rare recessive traits, carriers are far more common than affected individuals.' : 'Check your work: q² is the recessive phenotype frequency, so take its square root first.', ok);
    });
    r.querySelector('[data-next]').addEventListener('click', () => { at = (at + 1) % HW_CASES.length; draw(); });
    r.querySelector('[data-lab-reset]').addEventListener('click', () => { at = 0; draw(); });
    draw();
  },
};

export const SKILL_LABS = {punnett, chisquare, gel, abotype, transformation, vitalsreport, iolab, codonlab, hwlab};
