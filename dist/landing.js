// Landing-page motion. Vanilla ports of 21st.dev community patterns:
// Background Paths (kokonutd), Animated Hero (tommyjepsen), Spotlight Card (jahed),
// Container Scroll Animation (manuarora700), Radial Orbital Timeline (jatin-yadav05), Marquee.

const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

// Background Paths: two mirrored families of flowing curves that draw and retract.
export function backgroundPaths(count = 16) {
  const family = position => Array.from({length: count}, (_, i) => {
    const o = i * 9 * position, d = i * 10;
    const path = `M-${380 - o} -${189 + d}C-${380 - o} -${189 + d} -${312 - o} ${216 - d} ${152 - o} ${343 - d}C${616 - o} ${470 - d} ${684 - o} ${875 - d} ${684 - o} ${875 - d}`;
    return `<path d="${path}" pathLength="1" style="--w:${(.6 + i * .06).toFixed(2)};--o:${(.12 + i * .045).toFixed(2)};--t:${(20 + (i * 7 % 10)).toFixed(0)}s;--delay:-${(i * 1.3).toFixed(1)}s"/>`;
  }).join('');
  return `<svg class="bg-paths" viewBox="0 0 696 316" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><g class="paths-a">${family(1)}</g><g class="paths-b">${family(-1)}</g></svg>`;
}

export function initLanding(root) {
  const cleanups = [];
  const on = (target, type, fn, opts) => { target.addEventListener(type, fn, opts); cleanups.push(() => target.removeEventListener(type, fn, opts)); };
  const still = reduced();

  // Scroll reveal with stagger.
  const io = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); } }), {threshold: .14, rootMargin: '0px 0px -6% 0px'});
  root.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));
  cleanups.push(() => io.disconnect());
  requestAnimationFrame(() => root.querySelector('.hero')?.classList.add('booted'));

  // Animated Hero: rotating phrase.
  const rotator = root.querySelector('.rotator');
  if (rotator && !still) {
    const words = [...rotator.children]; let i = 0;
    const timer = setInterval(() => {
      words[i].className = 'out'; i = (i + 1) % words.length;
      words.forEach((w, j) => { if (j !== i && w.className !== 'out') w.className = ''; });
      words[i].className = 'in';
      setTimeout(() => words.forEach(w => { if (w.className === 'out') w.className = ''; }), 700);
    }, 2400);
    cleanups.push(() => clearInterval(timer));
  }

  // Hal typewriter bubble.
  const typed = root.querySelector('[data-typed]');
  if (typed) {
    const lines = JSON.parse(typed.dataset.typed); let line = 0, char = 0, dir = 1, wait = 0;
    if (still) typed.textContent = lines[0];
    else {
      const timer = setInterval(() => {
        if (wait > 0) { wait--; return; }
        char += dir; typed.textContent = lines[line].slice(0, char);
        if (dir > 0 && char >= lines[line].length) { dir = -1; wait = 45; }
        else if (dir < 0 && char <= 0) { dir = 1; line = (line + 1) % lines.length; wait = 6; }
      }, 45);
      cleanups.push(() => clearInterval(timer));
    }
  }

  // Cursor-follow light on the hero and spotlight cards.
  const hero = root.querySelector('.hero');
  if (hero && !still) on(hero, 'pointermove', e => {
    const r = hero.getBoundingClientRect();
    hero.style.setProperty('--hx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
    hero.style.setProperty('--hy', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
    hero.style.setProperty('--px', ((e.clientX - r.left) / r.width - .5).toFixed(3));
    hero.style.setProperty('--py', ((e.clientY - r.top) / r.height - .5).toFixed(3));
  });
  root.querySelectorAll('.spotlight').forEach(card => {
    on(card, 'pointermove', e => {
      const r = card.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
      card.style.setProperty('--mx', x + 'px'); card.style.setProperty('--my', y + 'px');
      if (!still) { card.style.setProperty('--rx', ((y / r.height - .5) * -5).toFixed(2) + 'deg'); card.style.setProperty('--ry', ((x / r.width - .5) * 6).toFixed(2) + 'deg'); }
    });
    on(card, 'pointerleave', () => { card.style.setProperty('--rx', '0deg'); card.style.setProperty('--ry', '0deg'); });
  });

  // Glass nav: sliding indicator.
  const nav = root.querySelector('.glass-nav'), pill = nav?.querySelector('.nav-pill');
  if (nav && pill) {
    nav.querySelectorAll('a').forEach(a => on(a, 'pointerenter', () => { pill.style.width = a.offsetWidth + 'px'; pill.style.transform = `translateX(${a.offsetLeft}px)`; pill.style.opacity = 1; }));
    on(nav, 'pointerleave', () => { pill.style.opacity = 0; });
  }

  // Header condenses after scrolling; Container Scroll tilt; hero parallax.
  const header = root.querySelector('.site-header');
  const tilt = root.querySelector('.scroll-stage'), card = tilt?.querySelector('.tilt-card'), title = tilt?.querySelector('.tilt-title');
  let ticking = false;
  const onScroll = () => {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      header?.classList.toggle('condensed', scrollY > 40);
      hero?.style.setProperty('--scroll', Math.min(scrollY / innerHeight, 1).toFixed(3));
      if (card && !still) {
        const r = tilt.getBoundingClientRect(), p = Math.min(Math.max((innerHeight - r.top) / (innerHeight * .95), 0), 1);
        const mobile = innerWidth < 760;
        card.style.transform = `perspective(1100px) rotateX(${(22 * (1 - p)).toFixed(2)}deg) scale(${(mobile ? .78 + .2 * p : 1.06 - .06 * p).toFixed(3)})`;
        title.style.transform = `translateY(${(-70 * p).toFixed(1)}px)`;
        tilt.style.setProperty('--p', p.toFixed(3));
      }
    });
  };
  on(window, 'scroll', onScroll, {passive: true}); on(window, 'resize', onScroll); onScroll();

  // Radial orbit of HOSA event categories around Hal.
  const orbit = root.querySelector('.orbit-system');
  if (orbit) {
    const nodes = [...orbit.querySelectorAll('.orbit-node')], detail = root.querySelector('.orbit-detail');
    let angle = 0, paused = false, last = performance.now(), frame;
    const place = () => {
      const w = orbit.clientWidth, rx = w * .42, ry = w * (innerWidth < 760 ? .42 : .3);
      nodes.forEach((n, i) => {
        const a = (i / nodes.length) * Math.PI * 2 + angle * Math.PI / 180, depth = (Math.sin(a) + 1) / 2;
        n.style.transform = `translate(-50%,-50%) translate(${(Math.cos(a) * rx).toFixed(1)}px,${(Math.sin(a) * ry).toFixed(1)}px) scale(${(.78 + depth * .3).toFixed(3)})`;
        n.style.zIndex = Math.round(depth * 10) + 2; n.style.opacity = (.55 + depth * .45).toFixed(2);
      });
    };
    const loop = now => { if (!paused && !still) angle = (angle + (now - last) * .012) % 360; last = now; place(); frame = requestAnimationFrame(loop); };
    frame = requestAnimationFrame(loop); cleanups.push(() => cancelAnimationFrame(frame));
    const select = n => {
      nodes.forEach(x => x.classList.toggle('active', x === n)); paused = !!n;
      orbit.classList.toggle('focused', !!n);
      if (n && detail) { detail.querySelector('h3').textContent = n.dataset.title; detail.querySelector('p').textContent = n.dataset.body; detail.querySelector('.orbit-tag').textContent = n.dataset.tag; detail.classList.add('show'); }
      else detail?.classList.remove('show');
    };
    nodes.forEach(n => on(n, 'click', e => { e.stopPropagation(); select(n.classList.contains('active') ? null : n); }));
    on(orbit, 'click', () => select(null));
    select(nodes[0]); paused = false; // show first description, keep orbit moving
  }

  // Study panel: segmented tabs with a sliding pill.
  const panel = root.querySelector('.study-panel');
  if (panel) {
    const tabs = [...panel.querySelectorAll('[data-tab]')], pill = panel.querySelector('.sp-pill');
    const movePill = t => { pill.style.width = t.offsetWidth + 'px'; pill.style.transform = `translateX(${t.offsetLeft}px)`; };
    const pick = t => {
      tabs.forEach(x => { x.classList.toggle('active', x === t); x.setAttribute('aria-selected', x === t); });
      panel.querySelectorAll('[data-pane]').forEach(p => p.classList.toggle('active', p.dataset.pane === t.dataset.tab));
      movePill(t);
    };
    tabs.forEach(t => on(t, 'click', () => pick(t)));
    requestAnimationFrame(() => movePill(tabs[0]));
    on(window, 'resize', () => movePill(panel.querySelector('[data-tab].active')));
  }

  // Event carousel arrows.
  const track = root.querySelector('.moves-track');
  root.querySelectorAll('[data-move]').forEach(b => on(b, 'click', () => {
    const card = track.querySelector('.move-card');
    track.scrollBy({left: Number(b.dataset.move) * (card.offsetWidth + 16), behavior: still ? 'auto' : 'smooth'});
  }));

  return () => cleanups.forEach(fn => fn());
}
