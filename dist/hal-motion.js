// Hal's clips, pose sampling and movement maths. Pure functions so the server tests can import them.
export const HAL_ACTIONS = ['idle', 'wave', 'thinking', 'angry', 'happy', 'sad', 'walk', 'run', 'eat', 'sleep', 'surprised'];
export const HAL_CLIPS = {
  idle: {frames: 8, fps: 3},
  wave: {frames: 6, fps: 7},
  thinking: {frames: 8, fps: 4},
  angry: {frames: 4, fps: 7},
  happy: {frames: 6, fps: 8},
  sad: {frames: 6, fps: 3},
  walk: {frames: 8, fps: 10},
  run: {frames: 8, fps: 14},
  eat: {frames: 6, fps: 7},
  sleep: {frames: 6, fps: 2},
  surprised: {frames: 4, fps: 5},
};
export const HAL_SIZE = 96;

/** Samples a pose between two keyframes so the 48px art moves smoothly at any refresh rate. */
export function halPose(action, seconds) {
  const clip = HAL_CLIPS[action] ?? HAL_CLIPS.idle;
  const phase = Math.max(0, seconds) * clip.fps;
  const frame = Math.floor(phase) % clip.frames;
  const next = (frame + 1) % clip.frames;
  const t = phase - Math.floor(phase);
  const blend = t * t * (3 - 2 * t);
  const sample = value => value(frame) + (value(next) - value(frame)) * blend;
  const moving = action === 'walk' || action === 'run';
  return {
    frame,
    // Head and neck rise and dip; the coils stay planted.
    bounce: sample(f => moving ? [0, -1, -1, 0, 0, -1, -1, 0][f] : action === 'happy' ? [0, -2, -4, -3, -1, 0][f] : f % 4 === 2 ? -1 : 0),
    // Slither: the coils shift against each other like a travelling wave.
    stride: moving ? sample(f => [0, 1, 2, 1, 0, -1, -2, -1][f]) : 0,
    sway: sample(f => f % 2),
    drift: sample(f => f % 3),
    thoughts: [0, 1, 2].map(i => sample(f => (f % 3 === i ? 1 : 0.25))),
  };
}

export function boundHal(point, width, height) {
  return {
    x: Math.max(0, Math.min(Math.max(0, width - HAL_SIZE), point.x)),
    y: Math.max(0, Math.min(Math.max(0, height - HAL_SIZE), point.y)),
  };
}

export function stepHal(from, to, seconds, speed) {
  const distance = Math.hypot(to.x - from.x, to.y - from.y);
  const step = Math.max(0, seconds) * speed;
  if (distance <= step || distance === 0) return {...to};
  return {x: from.x + ((to.x - from.x) / distance) * step, y: from.y + ((to.y - from.y) / distance) * step};
}

/** Any page script can set Hal's expression, e.g. while it waits on something. */
export function setHalMood(action, duration = 5000) {
  window.dispatchEvent(new CustomEvent('hal:mood', {detail: {action, duration}}));
}
