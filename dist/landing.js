// Public-page behaviour: restrained reveals, header state, preview tabs, live sculpture.
import {mountBloodstream} from './bloodstream.js';

export function initLanding(root) {
  const cleanups = [];
  const on = (target, type, fn, opts) => { target.addEventListener(type, fn, opts); cleanups.push(() => target.removeEventListener(type, fn, opts)); };
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Reveal: headings slide up line by line, hairlines draw, blocks fade in.
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), {threshold: .18, rootMargin: '0px 0px -8% 0px'});
  root.querySelectorAll('[data-reveal], .rule, .split').forEach(el => io.observe(el));
  cleanups.push(() => io.disconnect());
  requestAnimationFrame(() => requestAnimationFrame(() => root.querySelector('.hero')?.classList.add('in')));

  // Header settles into a solid bar once the page scrolls.
  const header = root.querySelector('.site-header');
  const onScroll = () => header?.classList.toggle('scrolled', scrollY > 24);
  on(window, 'scroll', onScroll, {passive: true}); onScroll();

  // Live hero bloodstream.
  const canvas = root.querySelector('canvas.sculpture');
  if (canvas) cleanups.push(mountBloodstream(canvas));

  // Product preview tabs.
  const preview = root.querySelector('.preview-window');
  if (preview) {
    const tabs = [...preview.querySelectorAll('[data-tab]')], ink = preview.querySelector('.tab-ink');
    const place = t => { ink.style.width = t.offsetWidth + 'px'; ink.style.transform = `translateX(${t.offsetLeft}px)`; };
    const pick = t => {
      tabs.forEach(x => { x.classList.toggle('on', x === t); x.setAttribute('aria-selected', x === t); });
      preview.querySelectorAll('[data-pane]').forEach(p => p.classList.toggle('on', p.dataset.pane === t.dataset.tab));
      place(t);
    };
    tabs.forEach(t => on(t, 'click', () => pick(t)));
    requestAnimationFrame(() => place(tabs[0]));
    on(window, 'resize', () => place(preview.querySelector('[data-tab].on')));
  }

  // Departures board: rows expand on hover/focus (and tap on touch).
  root.querySelectorAll('.board-row').forEach(row => {
    on(row, 'click', e => { if (matchMedia('(hover: none)').matches && !row.classList.contains('open')) { e.preventDefault(); root.querySelectorAll('.board-row.open').forEach(r => r.classList.remove('open')); row.classList.add('open'); } });
  });

  if (still) root.querySelectorAll('[data-reveal], .rule, .split').forEach(el => el.classList.add('in'));
  return () => cleanups.forEach(fn => fn());
}
