// Pointer-based drag and drop for lesson activities. Works with mouse, pen and touch.
// A lifted copy follows the pointer while the original stays behind as a placeholder;
// everything that moves glides to its new place instead of jumping.

const still = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const EASE = 'cubic-bezier(.2,.8,.2,1)';

/** Positions of elements, to animate from after the DOM changes. */
export const snapshot = els => new Map([...els].map(el => [el, el.getBoundingClientRect()]));

/** Glide each element from its recorded position to where it is now. */
export function glide(before, duration = 260) {
  if (still()) return;
  before.forEach((a, el) => {
    if (!el.isConnected) return;
    const b = el.getBoundingClientRect(), dx = a.left - b.left, dy = a.top - b.top;
    if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;
    el.animate([{transform: `translate(${dx}px,${dy}px)`}, {transform: 'none'}], {duration, easing: EASE});
  });
}

// The floating copy. It lives beside the original so the widget's styles still apply,
// and corrects for any transformed ancestor that would offset a fixed element.
function lift(item, ev) {
  const r = item.getBoundingClientRect();
  const ghost = item.cloneNode(true);
  ghost.querySelectorAll('[id]').forEach(n => n.removeAttribute('id'));
  ghost.removeAttribute('data-item'); ghost.removeAttribute('data-step'); ghost.removeAttribute('tabindex');
  ghost.setAttribute('aria-hidden', 'true');
  ghost.classList.add('lw-ghost');
  Object.assign(ghost.style, {position: 'fixed', left: '0', top: '0', width: r.width + 'px', height: r.height + 'px', margin: '0', zIndex: '1000', pointerEvents: 'none', boxSizing: 'border-box'});
  item.after(ghost);
  const o = ghost.getBoundingClientRect();
  const g = {ghost, ox: o.left, oy: o.top, dx: ev.clientX - r.left, dy: ev.clientY - r.top, x: r.left, y: r.top};
  place(g, r.left, r.top);
  requestAnimationFrame(() => ghost.classList.add('up'));
  item.classList.add('lw-placeholder');
  item.lwLifted = g;
  return g;
}
function place(g, x, y) { g.x = x; g.y = y; g.ghost.style.transform = `translate3d(${x - g.ox}px,${y - g.oy}px,0)`; }

// Fly the copy into the target rectangle, then reveal the real element underneath.
function land(g, item) {
  const done = () => { if (!g.ghost.isConnected) return; g.ghost.remove(); if (item.lwLifted === g) item.classList.remove('lw-placeholder'); };
  g.ghost.classList.remove('up');
  if (still() || !item.isConnected) return done();
  item.getAnimations().forEach(a => a.finish());
  const t = item.getBoundingClientRect();
  const anim = g.ghost.animate([{transform: g.ghost.style.transform}, {transform: `translate3d(${t.left - g.ox}px,${t.top - g.oy}px,0)`}], {duration: 220, easing: EASE, fill: 'forwards'});
  anim.onfinish = done; anim.oncancel = done;
  setTimeout(done, 320);
}

/**
 * Make items draggable inside root.
 * opts.items     selector for draggable elements
 * opts.handle    optional selector that starts a touch drag (mouse can drag anywhere)
 * opts.target(x, y, item)  return the drop target under the pointer, or null
 * opts.hover(target)       highlight a target (null clears)
 * opts.move(item, x, y)    live mode: rearrange while dragging
 * opts.drop(item, target)  commit the drop (not called when dropped outside every target)
 */
export function dragify(root, opts) {
  let press = null, drag = null, frame = 0;

  const edgeScroll = () => {
    if (!drag) return;
    const y = drag.py, h = innerHeight, zone = 70;
    const speed = y < zone ? -(zone - y) / 4 : y > h - zone ? (y - (h - zone)) / 4 : 0;
    if (speed) { scrollBy(0, speed); opts.move?.(drag.item, drag.px, drag.py); }
    frame = requestAnimationFrame(edgeScroll);
  };

  const start = ev => {
    drag = {item: press.item, g: lift(press.item, ev), px: ev.clientX, py: ev.clientY, target: null};
    root.classList.add('lw-dragging');
    document.documentElement.classList.add('lw-drag-active');
    frame = requestAnimationFrame(edgeScroll);
  };

  const onMove = ev => {
    if (!press || ev.pointerId !== press.id) return;
    if (!drag) {
      if (Math.hypot(ev.clientX - press.x, ev.clientY - press.y) < 5) return;
      start(ev);
    }
    ev.preventDefault();
    drag.px = ev.clientX; drag.py = ev.clientY;
    place(drag.g, ev.clientX - drag.g.dx, ev.clientY - drag.g.dy);
    if (opts.move) opts.move(drag.item, ev.clientX, ev.clientY);
    else {
      const t = opts.target(ev.clientX, ev.clientY, drag.item);
      if (t !== drag.target) { drag.target = t; opts.hover?.(t); }
    }
  };

  const finish = ev => {
    if (!press || ev.pointerId !== press.id) return;
    removeEventListener('pointermove', onMove);
    removeEventListener('pointerup', finish);
    removeEventListener('pointercancel', finish);
    press = null;
    if (!drag) return;
    cancelAnimationFrame(frame);
    const {item, g} = drag, target = ev.type === 'pointercancel' ? null : (opts.move ? true : drag.target);
    opts.hover?.(null);
    if (target) opts.drop(item, target);
    land(g, item);
    drag = null;
    root.classList.remove('lw-dragging');
    document.documentElement.classList.remove('lw-drag-active');
    // A drag should not also count as a click on whatever is under the pointer.
    const swallow = click => { click.stopPropagation(); click.preventDefault(); };
    addEventListener('click', swallow, {capture: true, once: true});
    setTimeout(() => removeEventListener('click', swallow, {capture: true}), 0);
  };

  root.addEventListener('pointerdown', ev => {
    if (press || ev.button !== 0) return;
    const item = ev.target.closest(opts.items);
    if (!item || !root.contains(item) || item.classList.contains('lw-ghost')) return;
    if (ev.pointerType !== 'mouse' && opts.handle && !ev.target.closest(opts.handle)) return;
    if (ev.target.closest('select, input, textarea')) return;
    press = {item, id: ev.pointerId, x: ev.clientX, y: ev.clientY};
    if (ev.pointerType === 'mouse') ev.preventDefault();
    addEventListener('pointermove', onMove, {passive: false});
    addEventListener('pointerup', finish);
    addEventListener('pointercancel', finish);
  });
  root.addEventListener('dragstart', ev => ev.preventDefault());
}

/** The first element matching selector under a point, ignoring the dragged copy. */
export const under = (x, y, selector, root) => {
  const el = document.elementFromPoint(x, y)?.closest(selector);
  return el && root.contains(el) ? el : null;
};
