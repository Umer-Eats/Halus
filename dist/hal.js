// Hal, the one global study buddy: roams the screen, reacts, eats apples and chats through Gemini.
import {HAL_ACTIONS, HAL_SIZE, boundHal, stepHal} from './hal-motion.js';
import {halSVG} from './hal-character.js';
import {LESSONS} from './model.js';

const LIMITS = {message: 1000, turn: 1500, turns: 12};
// How long Hal waits for the student's "why" before he loses his patience.
const PATIENCE_MS = 60000;
const pepTalks = [
  'One small step still counts. You have got this.',
  'A tricky question is a chance to learn something new.',
  'Take a breath. Then try the next tiny step.',
  'Every clinician started exactly where you are now.',
  'Stay curious. Your next good answer is close.',
  'How about a sip of water and a stretch? Even snakes take breaks.',
];

const read = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } };
const write = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} };
const el = (tag, attrs = {}, ...children) => {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k.startsWith('on')) node.addEventListener(k.slice(2), v);
    else if (v !== false && v != null) node.setAttribute(k, v === true ? '' : v);
  }
  node.append(...children.filter(c => c != null && c !== false));
  return node;
};
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
// app.js sets this from the signed-in student's profile.
const studentEvent = () => document.body.dataset.event || null;

export function mountHal(parent = document.body) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const prefs = {muted: false, anchored: false, ...read('hal-prefs', {})};
  const savePrefs = () => write('hal-prefs', prefs);
  const canMove = () => !reduced.matches;
  const now0 = performance.now();
  const s = {
    position: boundHal(read('hal-position', null) ?? {x: innerWidth - 140, y: innerHeight - 130}, innerWidth, innerHeight),
    target: null, apple: null, action: 'wave', since: now0, until: now0 + 2800, facing: -1,
    message: prefs.muted ? '' : 'Hi, I am Hal! Double-click me to chat, or click for more.',
    messageUntil: now0 + 8000, nextTalk: now0 + 60000, nextWalk: now0 + 9000,
    nextAct: now0 + 5000, actIndex: 0,
  };
  let menuOpen = false, chatOpen = false, held = false, drag = null, suppressClick = false, clickTimer, talkIndex = 0, roamIndex = 0;

  const setAction = (action, until = 0) => {
    if (s.action !== action) s.since = performance.now();
    s.action = action;
    s.until = until;
  };
  const say = message => {
    if (prefs.muted) return;
    s.message = message;
    s.messageUntil = performance.now() + 6500;
  };
  /** A reaction pins Hal in place with an expression for a while. */
  const react = (action, duration = 4500) => {
    s.target = null;
    s.apple = null;
    setAction(action, performance.now() + duration);
    s.nextWalk = s.until + 4000;
    s.nextAct = s.until + 3500;
  };
  const feed = point => {
    if (prefs.anchored || !canMove()) {
      s.apple = {...s.position};
      s.target = null;
      setAction('eat', performance.now() + 1700);
    } else {
      s.apple = boundHal(point ?? {x: s.position.x + (s.position.x > innerWidth / 2 ? -180 : 180), y: s.position.y}, innerWidth, innerHeight);
      s.target = s.apple;
      setAction('dash');
      say('An apple a day! Thank you.');
    }
    setMenu(false);
  };
  const toggleTalking = () => {
    prefs.muted = !prefs.muted;
    savePrefs();
    s.message = '';
    s.nextTalk = performance.now() + 60000;
    if (!prefs.muted) say('I am cheering for you again!');
    renderMenu();
  };
  const setAnchored = value => {
    prefs.anchored = value;
    savePrefs();
    write('hal-position', s.position);
    if (value) { s.target = null; if (s.action === 'slither' || s.action === 'dash') setAction('idle'); }
    renderMenu();
  };

  // DOM ------------------------------------------------------------------------------------------
  const root = el('div', {class: 'hal-companion', 'data-testid': 'hal-companion'});
  const apple = el('div', {class: 'hal-apple', role: 'img', 'aria-label': 'An apple for Hal', hidden: true});
  apple.innerHTML = '<svg viewBox="0 0 8 8" width="24" height="24" shape-rendering="crispEdges"><path fill="#22080f" d="M2 2h4v1h1v4H6v1H2V7H1V3h1z"/><path fill="#7cc35a" d="M2 3h4v4H2z"/><path fill="#c8f0a8" d="M2 3h1v1H2z"/><path fill="#6b3a1f" d="M4 0h1v2H4z"/><path fill="#3f9a3a" d="M5 0h2v1H5z"/></svg>';
  const bubble = el('div', {class: 'hal-bubble', role: 'status', hidden: true});
  const art = el('span', {class: 'hal-art'});
  const plate = el('span', {class: 'hal-nameplate'});
  const body = el('button', {type: 'button', class: 'hal-companion-body', 'aria-expanded': 'false', 'aria-controls': 'hal-controls'}, art, plate);
  const menu = el('div', {id: 'hal-controls', class: 'hal-panel hal-controls', role: 'region', 'aria-label': 'Hal controls', hidden: true});
  const menuPreview = el('div', {class: 'hal-menu-preview', 'aria-hidden': 'true'});
  const chat = createChat({react, onClose: () => setChat(false)});
  root.append(apple, bubble, body, menu, chat.node);
  parent.append(root);

  function setMenu(open) {
    menuOpen = open;
    body.setAttribute('aria-expanded', String(open));
    if (open) { chatOpen && setChat(false); renderMenu(); }
    menu.hidden = !open;
  }
  function setChat(open, focus) {
    chatOpen = open;
    if (open) { setMenu(false); s.target = null; }
    chat.setOpen(open, focus);
    root.dataset.chat = String(open);
  }
  function renderMenu() {
    plate.innerHTML = 'HAL <span>' + (prefs.muted ? '· quiet' : '· study buddy') + '</span>';
    body.setAttribute('aria-label', `Hal, your study buddy. Click or right-click for animations and controls, double-click to chat.`);
    root.dataset.muted = String(prefs.muted);
    root.dataset.anchored = String(prefs.anchored);
    if (!menuOpen) return;
    const animations = ['idle', 'wave', 'thinking', 'happy', 'angry', 'sad', 'surprised', 'eat', 'sleep', 'slither', 'dash'];
    const moods = el('div', {class: 'hal-moods', 'aria-label': 'Hal animations'},
      ...animations.map(a => el('button', {type: 'button', class: 'hal-animation', 'aria-pressed': String(s.action === a), onclick: () => {
        if (a === 'slither' || a === 'dash') {
          if (prefs.anchored) setAnchored(false);
          s.target = boundHal({x: s.position.x + (s.position.x > innerWidth / 2 ? -140 : 140), y: s.position.y}, innerWidth, innerHeight);
          setAction(a);
          setMenu(false);
        } else react(a, 5000);
        renderMenu();
      }}, el('span', {class: 'hal-animation-icon'}, (() => { const span = el('span'); span.innerHTML = halSVG({action: a, seconds: .2}); return span; })()), el('span', {}, a === 'angry' ? 'Mad' : a === 'dash' ? 'Fast slither' : a))));
    menu.replaceChildren(
      el('div', {class: 'hal-panel-title'}, el('strong', {}, 'Hal animation studio'), el('button', {type: 'button', 'aria-label': 'Close Hal controls', onclick: () => setMenu(false)}, '×')),
      el('p', {}, 'Pick an animation. Drag Hal to a spot, then anchor him there.'),
      menuPreview,
      moods,
      el('button', {type: 'button', class: 'hal-anchor', 'aria-pressed': String(prefs.anchored), onclick: () => setAnchored(!prefs.anchored)}, prefs.anchored ? '● Anchored here · Release' : '○ Anchor Hal here'),
      el('div', {class: 'hal-controls-actions'},
        el('button', {type: 'button', onclick: () => feed()}, 'Give apple'),
        el('button', {type: 'button', 'aria-pressed': String(prefs.muted), onclick: toggleTalking}, prefs.muted ? 'Unmute talks' : 'Mute talks')),
      el('button', {type: 'button', class: 'hal-primary', onclick: () => setChat(true)}, 'Chat with Hal'),
    );
  }
  renderMenu();

  // Pointer: drag to place, click/right-click for animation studio, double-click to chat.
  body.addEventListener('pointerdown', e => {
    if (e.button !== 0) return;
    drag = {x: e.clientX, y: e.clientY, origin: {...s.position}, moved: false};
    suppressClick = false;
    body.setPointerCapture(e.pointerId);
  });
  body.addEventListener('pointermove', e => {
    if (!drag) return;
    const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
    if (!drag.moved && Math.hypot(dx, dy) < 5) return;
    drag.moved = suppressClick = true;
    clearTimeout(clickTimer);
    setMenu(false);
    s.position = boundHal({x: drag.origin.x + dx, y: drag.origin.y + dy}, innerWidth, innerHeight);
    s.target = null;
    s.apple = null;
    setAction('idle');
  });
  body.addEventListener('lostpointercapture', () => {
    if (drag?.moved) setAnchored(true);
    drag = null;
  });
  body.addEventListener('pointerenter', () => { held = true; });
  body.addEventListener('pointerleave', () => { held = false; });
  body.addEventListener('focus', () => { held = true; });
  body.addEventListener('blur', () => { held = false; });
  body.addEventListener('contextmenu', e => { e.preventDefault(); clearTimeout(clickTimer); setMenu(true); });
  body.addEventListener('keydown', e => {
    const k = e.key.toLowerCase();
    if (k === 'm') toggleTalking();
    if (k === 'f') feed();
    if (k === 'c') setChat(!chatOpen);
    if (e.key === 'Escape') setMenu(false);
  });
  body.addEventListener('click', e => {
    if (suppressClick) { e.preventDefault(); suppressClick = false; return; }
    clearTimeout(clickTimer);
    if (e.detail === 2) { setChat(!chatOpen); return; }
    if (e.detail <= 1) clickTimer = setTimeout(() => setMenu(!menuOpen), e.detail === 0 ? 0 : 260);
  });
  body.addEventListener('dblclick', e => e.stopPropagation());
  menu.addEventListener('keydown', e => { if (e.key === 'Escape') { setMenu(false); body.focus(); } });

  const onTriple = e => {
    if (e.button !== 0 || e.detail !== 3 || e.target.closest('input, textarea, select, [contenteditable="true"], .hal-companion')) return;
    feed({x: e.clientX - HAL_SIZE / 2, y: e.clientY - HAL_SIZE + 16});
  };
  const onMood = e => {
    const d = e.detail;
    if (d && HAL_ACTIONS.includes(d.action)) react(d.action, Number.isFinite(d.duration) ? clamp(d.duration, 500, 120000) : 5000);
  };
  const onAsk = e => setChat(true, e.detail?.lessonId ?? '');
  const onResize = () => {
    s.position = boundHal(s.position, innerWidth, innerHeight);
    if (s.target) s.target = boundHal(s.target, innerWidth, innerHeight);
    if (s.apple) s.apple = boundHal(s.apple, innerWidth, innerHeight);
  };
  document.addEventListener('click', onTriple);
  window.addEventListener('hal:mood', onMood);
  window.addEventListener('hal:ask', onAsk);
  window.addEventListener('resize', onResize);

  // Frame loop -----------------------------------------------------------------------------------
  let raf = 0, previous = performance.now(), lastArt = '', lastPreview = '';
  const tick = now => {
    const dt = Math.min((now - previous) / 1000, 0.05);
    previous = now;
    if (!document.hidden && !drag?.moved) {
      if (s.message && now > s.messageUntil) s.message = '';
      // An open panel keeps Hal beside it instead of wandering off mid-conversation.
      if (!menuOpen && !chatOpen && (!held || s.apple)) {
        if (s.target) {
          if (Math.abs(s.target.x - s.position.x) > 1) s.facing = s.target.x < s.position.x ? -1 : 1;
          s.position = canMove() ? stepHal(s.position, s.target, dt, s.action === 'dash' ? 230 : 70) : {...s.target};
          if (Math.hypot(s.position.x - s.target.x, s.position.y - s.target.y) < 1) {
            s.target = null;
            setAction(s.apple ? 'eat' : 'idle', s.apple ? now + 1700 : 0);
            s.nextWalk = now + 6000 + Math.random() * 6000;
          }
        } else if (s.until && now >= s.until) {
          if (s.action === 'eat') {
            s.apple = null;
            setAction('happy', now + 3000);
            say('Crunchy. Ready for another small win?');
          } else setAction('idle');
        } else if (!s.until && now > s.nextWalk && canMove() && !prefs.anchored) {
          // Hal roams the whole viewport, below the site header.
          roamIndex++;
          s.target = boundHal({x: 16 + Math.random() * (innerWidth - HAL_SIZE - 32), y: 72 + Math.random() * (innerHeight - HAL_SIZE - 88)}, innerWidth, innerHeight);
          setAction(roamIndex % 4 === 0 ? 'dash' : 'slither');
          if (roamIndex % 5 === 0) say('Just stretching my coils.');
        }
      }
      if (now > s.nextTalk && !s.apple && !menuOpen && !chatOpen) {
        say(pepTalks[talkIndex++ % pepTalks.length]);
        s.nextTalk = now + 75000;
      }
      // Short ambient beats between walks give Hal a readable, companion-like cycle.
      if (!s.target && !s.apple && !s.until && !menuOpen && !chatOpen && !held && now >= s.nextAct) {
        const ambient = ['wave', 'idle', 'thinking', 'idle', 'happy', 'idle', 'sleep', 'idle'];
        const action = ambient[s.actIndex++ % ambient.length];
        setAction(action, action === 'idle' ? 0 : now + (action === 'sleep' ? 4200 : 1800));
        s.nextAct = now + (action === 'idle' ? 3500 : 6000);
      }
      paint(now);
    }
    raf = requestAnimationFrame(tick);
  };
  function paint(now) {
    const {x, y} = s.position;
    body.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    const seconds = canMove() ? (now - s.since) / 1000 : 0;
    const markup = halSVG({action: s.action, seconds, facing: s.facing});
    if (markup !== lastArt) { art.innerHTML = markup; lastArt = markup; }
    root.dataset.action = s.action;
    apple.hidden = !s.apple;
    if (s.apple) {
      apple.style.left = s.apple.x + (s.facing < 0 ? 18 : 60) + 'px';
      apple.style.top = s.apple.y + 66 + 'px';
      apple.classList.toggle('is-eating', s.action === 'eat');
    }
    const showBubble = Boolean(s.message) && !prefs.muted && !menuOpen && !chatOpen;
    if (bubble.textContent !== s.message) bubble.textContent = s.message;
    bubble.hidden = !showBubble;
    const left = clamp(x - 72, 8, Math.max(8, innerWidth - 248));
    if (showBubble) {
      bubble.style.left = left + 'px';
      bubble.style.top = (y < 110 ? y + HAL_SIZE + 4 : y - bubble.offsetHeight - 8) + 'px';
    }
    if (menuOpen) {
      if (markup !== lastPreview) { menuPreview.innerHTML = markup; lastPreview = markup; }
      menu.style.left = clamp(x - 80, 8, Math.max(8, innerWidth - menu.offsetWidth - 8)) + 'px';
      menu.style.top = clamp(y < 320 ? y + HAL_SIZE : y - menu.offsetHeight - 6, 8, innerHeight - menu.offsetHeight - 8) + 'px';
    }
    if (chatOpen) chat.place(s.position);
  }
  raf = requestAnimationFrame(tick);
  const onVisibility = () => { previous = performance.now(); };
  document.addEventListener('visibilitychange', onVisibility);

  return () => {
    cancelAnimationFrame(raf);
    clearTimeout(clickTimer);
    chat.destroy();
    document.removeEventListener('click', onTriple);
    window.removeEventListener('hal:mood', onMood);
    window.removeEventListener('hal:ask', onAsk);
    window.removeEventListener('resize', onResize);
    document.removeEventListener('visibilitychange', onVisibility);
    root.remove();
  };
}

/** The chat panel. Closing it keeps the thread; switching what Hal is looking at starts a new one. */
function createChat({react, onClose}) {
  let open = false, focus = '', turns = [], sending = false, error = '', why = {pending: false, missed: 0}, session = 0, patience, size = null;
  const log = el('div', {class: 'hal-chat-log', role: 'log', 'aria-live': 'polite', 'aria-label': 'Conversation'});
  const select = el('select', {'aria-label': 'What Hal is looking at', onchange: () => setFocus(select.value)});
  const helps = el('div', {class: 'hal-chat-prompts'});
  const status = el('p', {class: 'hal-chat-why', role: 'status', hidden: true});
  const errorBox = el('p', {class: 'hal-chat-error', role: 'alert', hidden: true});
  const input = el('textarea', {rows: '2', maxlength: String(LIMITS.message), placeholder: 'Ask Hal…', 'aria-label': 'Message Hal'});
  const sendButton = el('button', {type: 'submit', disabled: true}, 'Send');
  const resize = el('button', {type: 'button', class: 'hal-chat-resize', 'aria-label': 'Resize Hal chat', title: 'Drag to resize'}, '⤢');
  const node = el('section', {id: 'hal-chat', class: 'hal-panel hal-chat', 'aria-label': 'Chat with Hal', hidden: true},
    resize,
    el('div', {class: 'hal-panel-title'}, el('strong', {}, 'Study with Hal'), el('button', {type: 'button', 'aria-label': 'Close Hal chat', onclick: () => onClose()}, '×')),
    el('label', {class: 'hal-chat-focus'}, el('span', {}, 'Looking at'), select),
    log, helps, status, errorBox,
    el('form', {class: 'hal-chat-form', onsubmit: e => { e.preventDefault(); send(input.value); }}, input, sendButton),
    el('p', {class: 'hal-chat-note'}, 'Hal is powered by Google Gemini and can be wrong. Check the official HOSA guidelines, and do not share personal information.'),
  );
  node.addEventListener('keydown', e => { if (e.key === 'Escape') onClose(); });
  input.addEventListener('input', () => { sendButton.disabled = sending || !input.value.trim(); clearTimeout(patience); });
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) { e.preventDefault(); send(input.value); }
  });
  let resizing = null;
  resize.addEventListener('pointerdown', e => {
    const rect = node.getBoundingClientRect();
    resizing = {x: e.clientX, y: e.clientY, width: rect.width, height: rect.height};
    resize.setPointerCapture(e.pointerId);
  });
  resize.addEventListener('pointermove', e => {
    if (!resizing) return;
    size = {width: clamp(resizing.width + resizing.x - e.clientX, 280, innerWidth - 16), height: clamp(resizing.height + resizing.y - e.clientY, 320, innerHeight - 16)};
  });
  resize.addEventListener('lostpointercapture', () => { resizing = null; });
  const onWindowResize = () => { size = null; };
  window.addEventListener('resize', onWindowResize);

  function setFocus(value) {
    focus = value;
    session++;
    turns = [];
    why = {pending: false, missed: 0};
    error = '';
    sending = false;
    clearTimeout(patience);
    render();
  }
  function options() {
    const event = studentEvent();
    select.replaceChildren(
      el('option', {value: ''}, event ? 'My event: ' + event : 'HOSA in general'),
      ...LESSONS.map(l => el('option', {value: l.id}, 'Lesson: ' + l.title)),
    );
    select.value = focus;
  }
  function render() {
    const lesson = LESSONS.find(l => l.id === focus);
    log.replaceChildren(
      ...(turns.length ? [] : [el('p', {class: 'hal-chat-hint'}, lesson
        ? `I can see "${lesson.title}". Ask me anything about it, or let me quiz you. If I give you an answer, I will want to know why it is right!`
        : studentEvent() ? `I know you are preparing for ${studentEvent()}. Ask me a question, or let me quiz you.` : 'Ask me about HOSA events, study habits or health science. Pick a lesson above to focus on it.')]),
      ...turns.map(t => el('div', {class: 'hal-chat-turn hal-chat-' + t.role},
        el('span', {class: 'sr-only'}, t.role === 'hal' ? 'Hal: ' : 'You: '),
        ...(t.role === 'hal' ? t.text.split(/\n\s*\n/).map(p => el('p', {}, p.trim())) : [t.text]))),
      ...(sending ? [el('p', {class: 'hal-chat-turn hal-chat-hal hal-chat-pending'}, 'Hal is thinking…')] : []),
    );
    log.scrollTop = log.scrollHeight;
    const prompts = lesson ? ['Explain this more simply', 'Give me an example', 'Quiz me on this lesson']
      : ['What should I study first?', 'Quiz me on my event', 'Make me a one-week plan'];
    helps.hidden = sending || turns.length > 0;
    helps.replaceChildren(...prompts.map(p => el('button', {type: 'button', onclick: () => send(p)}, p)));
    status.hidden = !why.pending || sending;
    status.textContent = 'Hal is waiting for your why.';
    errorBox.hidden = !error;
    errorBox.textContent = error;
    input.placeholder = why.pending ? 'Explain why…' : 'Ask Hal…';
    input.setAttribute('aria-label', why.pending ? 'Explain why to Hal' : 'Message Hal');
    sendButton.disabled = sending || !input.value.trim();
  }
  async function send(text) {
    const message = text.trim().slice(0, LIMITS.message);
    if (!message || sending) return;
    const id = session;
    const history = turns.slice(-LIMITS.turns).map(({role, text}) => ({role, text: text.slice(0, LIMITS.turn)}));
    turns.push({role: 'student', text: message});
    input.value = '';
    sending = true;
    error = '';
    clearTimeout(patience);
    react('thinking', 60000);
    render();
    try {
      const response = await fetch('/api/hal', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({message, history, lessonId: focus || undefined, event: studentEvent() ?? undefined, pendingWhy: why.pending, missedWhys: why.missed}),
      });
      const reply = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(reply.error || 'Hal could not answer right now. Try again in a moment.');
      if (id !== session) return;
      turns.push({role: 'hal', text: reply.reply});
      why = {pending: reply.awaitingWhy, missed: reply.missedWhys};
      // He stays mad, or keeps waiting, until the student explains why.
      react(reply.mood, reply.mood === 'angry' ? 120000 : reply.awaitingWhy && reply.mood === 'thinking' ? PATIENCE_MS : 7000);
      if (why.pending) patience = setTimeout(() => {
        if (input.value.trim() || !open) return;
        react('angry', 120000);
        turns.push({role: 'hal', text: 'I am still waiting! Tell me why, in your own words.'});
        render();
      }, PATIENCE_MS);
    } catch (failure) {
      if (id !== session) return;
      turns.pop();
      input.value = message;
      error = failure.message;
      react('sad', 4000);
    } finally {
      if (id === session) { sending = false; render(); }
    }
  }
  return {
    node,
    setOpen(value, nextFocus) {
      open = value;
      node.hidden = !value;
      if (!value) return;
      if (nextFocus !== undefined && nextFocus !== focus) setFocus(nextFocus);
      options();
      render();
      setTimeout(() => input.focus(), 0);
    },
    /** Sits beside Hal so his reactions stay visible; on narrow screens it stacks instead. */
    place({x, y}) {
      const width = Math.min(size?.width ?? 340, innerWidth - 16), height = Math.min(size?.height ?? 460, innerHeight - 16);
      const beside = x - width - 8 >= 8 ? x - width - 8 : x + HAL_SIZE + 8 + width <= innerWidth - 8 ? x + HAL_SIZE + 8 : null;
      const left = beside ?? clamp(x - 110, 8, innerWidth - width - 8);
      const top = clamp(beside !== null ? y + HAL_SIZE - height : y - height - 6 >= 8 ? y - height - 6 : y + HAL_SIZE + 6, 8, innerHeight - height - 8);
      Object.assign(node.style, {width: width + 'px', height: height + 'px', left: left + 'px', top: top + 'px'});
    },
    destroy() { clearTimeout(patience); window.removeEventListener('resize', onWindowResize); },
  };
}
