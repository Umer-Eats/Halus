import { createHash, randomUUID } from 'node:crypto';
import { EVENTS, LESSONS } from '../dist/model.js';
import { COMMUNITIES, equalSecret, findCommunity, passwordFor, publicCommunities } from './communities.js';
import { ensureSchema, one, rows } from './db.js';
import { allowHalMessage, askHal } from './hal.js';
import { AppError, failure, readBody, send, text } from './http.js';

const EVENT_NAMES = new Set(EVENTS.map((e) => e.name));
const LESSON_IDS = new Set(LESSONS.map((l) => l.id));
const ASSIGNMENT_TYPES = ['Lesson', 'Quiz', 'Skill checklist', 'Reflection'];
const ENROLL_LIMIT = 10;
const ENROLL_WINDOW_MS = 15 * 60_000;

// ---------- validation ----------

function eventName(value, { allowEmpty = false } = {}) {
  if (allowEmpty && (value === null || value === '' || value === undefined)) return null;
  if (!EVENT_NAMES.has(value)) throw new AppError(400, 'Choose an event from the secondary catalog.');
  return value;
}

function dueDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value) || Number.isNaN(Date.parse(value + 'T00:00:00Z')))
    throw new AppError(400, 'Choose a due date.');
  return value;
}

function assignmentFields(body, partial) {
  const out = {};
  if (!partial || 'title' in body) out.title = text(body.title, 'an assignment title', { max: 140 });
  if (!partial || 'type' in body) {
    if (!ASSIGNMENT_TYPES.includes(body.type)) throw new AppError(400, 'Choose an assignment type.');
    out.type = body.type;
  }
  if (!partial || 'due' in body) out.due = dueDate(body.due);
  // A blank event sends the assignment to the whole community.
  if (!partial || 'event' in body) out.event = eventName(body.event, { allowEmpty: true });
  if (!partial || 'instructions' in body) out.instructions = text(body.instructions, 'instructions', { max: 4000, required: false });
  return out;
}

// ---------- shapes ----------

const profile = (user, communities) => ({
  uid: user.id,
  email: user.email,
  displayName: user.display_name,
  role: user.role,
  community: publicCommunities(communities).find((c) => c.id === user.community_id) ?? null,
  event: user.event ?? null,
  eventSelectedAt: user.event_selected_at ?? null,
});

const assignment = (a) => ({
  id: a.id,
  title: a.title,
  type: a.type,
  event: a.event ?? null,
  due: a.due,
  instructions: a.instructions,
  createdAt: a.created_at,
  ...(a.submission_count !== undefined && { submissionCount: Number(a.submission_count) }),
  ...(a.submitted_at !== undefined && { submitted: Boolean(a.submitted_at), submittedAt: a.submitted_at ?? null, submission: a.submission_body ?? null }),
});

const post = (p) => ({
  id: p.id,
  body: p.body,
  createdAt: p.created_at,
  author: { uid: p.author_id, displayName: p.display_name ?? 'Former member', role: p.role ?? null },
});

// ---------- request helpers ----------

async function identity(ctx) {
  const header = ctx.req.headers.authorization;
  if (typeof header !== 'string' || !header.startsWith('Bearer ')) throw new AppError(401, 'Please log in to continue.');
  return ctx.verifyToken(header.slice(7));
}

async function member(ctx, role) {
  const who = await identity(ctx);
  const user = one(await ctx.db.execute({ sql: 'SELECT * FROM users WHERE id = ?', args: [who.uid] }));
  if (!user) throw new AppError(403, 'Finish joining your school community to continue.');
  if (!findCommunity(user.community_id, ctx.communities)) throw new AppError(403, 'Your school community is no longer active on Halus.');
  if (role && user.role !== role) throw new AppError(403, `This needs an ${role} account.`);
  return user;
}

async function limitEnrollment(db, uid) {
  const now = Date.now();
  const key = createHash('sha256').update('enroll:' + uid).digest('hex');
  const result = await db.batch([
    { sql: 'DELETE FROM enrollment_limits WHERE expires_at < ?', args: [now] },
    {
      sql: 'INSERT INTO enrollment_limits (key, attempts, expires_at) VALUES (?, 1, ?) ON CONFLICT(key) DO UPDATE SET attempts = attempts + 1',
      args: [key, now + ENROLL_WINDOW_MS],
    },
    { sql: 'SELECT attempts FROM enrollment_limits WHERE key = ?', args: [key] },
  ], 'write');
  if (Number(result[2].rows[0].attempts) > ENROLL_LIMIT)
    throw new AppError(429, 'Too many attempts. Try again in 15 minutes.');
}

async function assignmentInCommunity(ctx, user, id) {
  const a = one(await ctx.db.execute({ sql: 'SELECT * FROM assignments WHERE id = ? AND community_id = ?', args: [id, user.community_id] }));
  if (!a) throw new AppError(404, 'That assignment was not found.');
  return a;
}

// ---------- routes ----------

const routes = [];
const route = (method, path, handler) => {
  const keys = [];
  const pattern = new RegExp('^' + path.replace(/:(\w+)/g, (_, k) => (keys.push(k), '([^/]+)')) + '/?$');
  routes.push({ method, pattern, keys, handler });
};

route('GET', '/health', () => ({ ok: true }));

// Hal's study chat (Gemini). Open to visitors too, so it is rate limited per address.
const halLog = new Map();
route('POST', '/hal', async (ctx) => {
  const address = String(ctx.req.headers['x-forwarded-for'] ?? '').split(',')[0].trim() || ctx.req.socket?.remoteAddress || 'local';
  if (!allowHalMessage(halLog, address, Date.now())) throw new AppError(429, 'Hal needs a short break. Try again in a few minutes.');
  return askHal(ctx.body, { apiKey: ctx.env.GEMINI_API_KEY, model: ctx.env.GEMINI_MODEL });
});

// Public settings the static site needs before anyone signs in.
route('GET', '/config', (ctx) => ({
  firebase: {
    apiKey: ctx.env.FIREBASE_WEB_API_KEY ?? null,
    authDomain: ctx.env.FIREBASE_AUTH_DOMAIN ?? null,
    projectId: ctx.env.FIREBASE_PROJECT_ID ?? null,
    appId: ctx.env.FIREBASE_APP_ID ?? null,
  },
  communities: publicCommunities(ctx.communities),
}));

route('GET', '/communities', (ctx) => ({ communities: publicCommunities(ctx.communities) }));

route('POST', '/auth/register', async (ctx) => {
  const who = await identity(ctx);
  if (!who.email) throw new AppError(400, 'Use an account with an email address.');
  const body = ctx.body;
  if (body.role !== 'student' && body.role !== 'instructor') throw new AppError(400, 'Choose student or instructor.');
  const community = findCommunity(body.communityId, ctx.communities);
  if (!community) throw new AppError(400, 'Choose your school community.');

  const existing = one(await ctx.db.execute({ sql: 'SELECT * FROM users WHERE id = ?', args: [who.uid] }));
  if (existing) {
    if (existing.role !== body.role)
      throw new AppError(409, `This account is already registered as an ${existing.role}. Use that login instead.`);
    if (existing.community_id !== community.id)
      throw new AppError(409, 'This account already belongs to another school community.');
    return { profile: profile(existing, ctx.communities) };
  }

  const displayName = text(body.displayName ?? who.name, 'your name', { max: 80 });
  if (typeof body.password !== 'string' || !body.password || body.password.length > 256)
    throw new AppError(400, body.role === 'student' ? 'Enter your community student password.' : 'Enter your community instructor password.');
  const expected = passwordFor(community, body.role, ctx.env);
  // Count the attempt before checking it, so wrong guesses always use up the allowance.
  await limitEnrollment(ctx.db, who.uid);
  if (!equalSecret(body.password, expected)) throw new AppError(403, 'That password is not right for this community.');

  await ctx.db.execute({
    sql: 'INSERT INTO users (id, email, display_name, role, community_id) VALUES (?, ?, ?, ?, ?) ON CONFLICT(id) DO NOTHING',
    args: [who.uid, who.email, displayName, body.role, community.id],
  });
  const user = one(await ctx.db.execute({ sql: 'SELECT * FROM users WHERE id = ?', args: [who.uid] }));
  return { status: 201, data: { profile: profile(user, ctx.communities) } };
});

route('GET', '/me', async (ctx) => {
  const who = await identity(ctx);
  const user = one(await ctx.db.execute({ sql: 'SELECT * FROM users WHERE id = ?', args: [who.uid] }));
  return { enrolled: Boolean(user), profile: user ? profile(user, ctx.communities) : null };
});

route('PATCH', '/me', async (ctx) => {
  const user = await member(ctx);
  const displayName = text(ctx.body.displayName, 'your name', { max: 80 });
  await ctx.db.execute({ sql: 'UPDATE users SET display_name = ? WHERE id = ?', args: [displayName, user.id] });
  return { profile: profile({ ...user, display_name: displayName }, ctx.communities) };
});

// Students pick one annual event. Changing it afterwards is an instructor decision.
route('PUT', '/me/event', async (ctx) => {
  const user = await member(ctx, 'student');
  const event = eventName(ctx.body.event);
  if (user.event && user.event !== event)
    throw new AppError(409, 'Your annual event is already selected. Ask your instructor to change it.');
  if (!user.event) {
    await ctx.db.execute({
      sql: "UPDATE users SET event = ?, event_selected_at = strftime('%Y-%m-%dT%H:%M:%fZ','now') WHERE id = ? AND event IS NULL",
      args: [event, user.id],
    });
  }
  const fresh = one(await ctx.db.execute({ sql: 'SELECT * FROM users WHERE id = ?', args: [user.id] }));
  if (fresh.event !== event) throw new AppError(409, 'Your annual event is already selected. Ask your instructor to change it.');
  return { profile: profile(fresh, ctx.communities) };
});

route('GET', '/students', async (ctx) => {
  const user = await member(ctx, 'instructor');
  const result = await ctx.db.execute({
    sql: `SELECT u.id, u.display_name, u.email, u.event, u.created_at,
        (SELECT COUNT(*) FROM lesson_progress lp WHERE lp.user_id = u.id) AS lessons_completed,
        (SELECT q.score FROM quiz_attempts q WHERE q.user_id = u.id ORDER BY q.created_at DESC LIMIT 1) AS last_quiz_score
      FROM users u WHERE u.community_id = ? AND u.role = 'student' ORDER BY u.display_name COLLATE NOCASE`,
    args: [user.community_id],
  });
  return {
    students: rows(result).map((s) => ({
      uid: s.id,
      displayName: s.display_name,
      email: s.email,
      event: s.event ?? null,
      joinedAt: s.created_at,
      lessonsCompleted: Number(s.lessons_completed),
      progress: Math.round((Number(s.lessons_completed) / LESSONS.length) * 100),
      lastQuizScore: s.last_quiz_score === null ? null : Number(s.last_quiz_score),
    })),
  };
});

route('PATCH', '/students/:uid', async (ctx) => {
  const user = await member(ctx, 'instructor');
  const event = eventName(ctx.body.event, { allowEmpty: true });
  const result = await ctx.db.execute({
    sql: `UPDATE users SET event = ?, event_selected_at = CASE WHEN ? IS NULL THEN NULL ELSE strftime('%Y-%m-%dT%H:%M:%fZ','now') END
      WHERE id = ? AND community_id = ? AND role = 'student'`,
    args: [event, event, ctx.params.uid, user.community_id],
  });
  if (!result.rowsAffected) throw new AppError(404, 'That student is not in your community.');
  return { uid: ctx.params.uid, event };
});

// Removes the enrollment only. Progress stays keyed to the Firebase account, so a student
// who is re-admitted picks up where they left off. Change the student password to keep them out.
route('DELETE', '/students/:uid', async (ctx) => {
  const user = await member(ctx, 'instructor');
  const result = await ctx.db.execute({
    sql: "DELETE FROM users WHERE id = ? AND community_id = ? AND role = 'student'",
    args: [ctx.params.uid, user.community_id],
  });
  if (!result.rowsAffected) throw new AppError(404, 'That student is not in your community.');
  return { status: 204 };
});

route('GET', '/assignments', async (ctx) => {
  const user = await member(ctx);
  if (user.role === 'instructor') {
    const result = await ctx.db.execute({
      sql: `SELECT a.*, (SELECT COUNT(*) FROM submissions s WHERE s.assignment_id = a.id) AS submission_count
        FROM assignments a WHERE a.community_id = ? ORDER BY a.due, a.created_at`,
      args: [user.community_id],
    });
    return { assignments: rows(result).map(assignment) };
  }
  const result = await ctx.db.execute({
    sql: `SELECT a.*, s.submitted_at, s.body AS submission_body FROM assignments a
      LEFT JOIN submissions s ON s.assignment_id = a.id AND s.user_id = ?
      WHERE a.community_id = ? AND (a.event IS NULL OR a.event = ?) ORDER BY a.due, a.created_at`,
    args: [user.id, user.community_id, user.event],
  });
  return { assignments: rows(result).map(assignment) };
});

route('POST', '/assignments', async (ctx) => {
  const user = await member(ctx, 'instructor');
  const fields = assignmentFields(ctx.body, false);
  const id = randomUUID();
  await ctx.db.execute({
    sql: 'INSERT INTO assignments (id, community_id, event, title, type, instructions, due, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    args: [id, user.community_id, fields.event, fields.title, fields.type, fields.instructions, fields.due, user.id],
  });
  return { status: 201, data: { assignment: assignment(await assignmentInCommunity(ctx, user, id)) } };
});

route('PATCH', '/assignments/:id', async (ctx) => {
  const user = await member(ctx, 'instructor');
  await assignmentInCommunity(ctx, user, ctx.params.id);
  const fields = assignmentFields(ctx.body, true);
  const keys = Object.keys(fields);
  if (keys.length) {
    await ctx.db.execute({
      sql: `UPDATE assignments SET ${keys.map((k) => `${k} = ?`).join(', ')} WHERE id = ? AND community_id = ?`,
      args: [...keys.map((k) => fields[k]), ctx.params.id, user.community_id],
    });
  }
  return { assignment: assignment(await assignmentInCommunity(ctx, user, ctx.params.id)) };
});

route('DELETE', '/assignments/:id', async (ctx) => {
  const user = await member(ctx, 'instructor');
  await assignmentInCommunity(ctx, user, ctx.params.id);
  await ctx.db.batch([
    { sql: 'DELETE FROM submissions WHERE assignment_id = ?', args: [ctx.params.id] },
    { sql: 'DELETE FROM assignments WHERE id = ? AND community_id = ?', args: [ctx.params.id, user.community_id] },
  ], 'write');
  return { status: 204 };
});

route('GET', '/assignments/:id/submissions', async (ctx) => {
  const user = await member(ctx, 'instructor');
  await assignmentInCommunity(ctx, user, ctx.params.id);
  const result = await ctx.db.execute({
    sql: `SELECT s.user_id, s.body, s.submitted_at, u.display_name FROM submissions s
      LEFT JOIN users u ON u.id = s.user_id WHERE s.assignment_id = ? ORDER BY s.submitted_at`,
    args: [ctx.params.id],
  });
  return {
    submissions: rows(result).map((s) => ({
      uid: s.user_id,
      displayName: s.display_name ?? 'Former member',
      body: s.body,
      submittedAt: s.submitted_at,
    })),
  };
});

route('PUT', '/assignments/:id/submission', async (ctx) => {
  const user = await member(ctx, 'student');
  const a = await assignmentInCommunity(ctx, user, ctx.params.id);
  if (a.event && a.event !== user.event) throw new AppError(404, 'That assignment was not found.');
  const body = text(ctx.body.body, 'your response', { max: 10000, required: false });
  await ctx.db.execute({
    sql: `INSERT INTO submissions (assignment_id, user_id, body) VALUES (?, ?, ?)
      ON CONFLICT(assignment_id, user_id) DO UPDATE SET body = excluded.body, submitted_at = strftime('%Y-%m-%dT%H:%M:%fZ','now')`,
    args: [a.id, user.id, body],
  });
  return { assignmentId: a.id, submitted: true };
});

route('GET', '/posts', async (ctx) => {
  const user = await member(ctx);
  const before = typeof ctx.query.get('before') === 'string' && ctx.query.get('before') ? ctx.query.get('before') : '9999';
  const result = await ctx.db.execute({
    sql: `SELECT p.*, u.display_name, u.role FROM posts p LEFT JOIN users u ON u.id = p.author_id
      WHERE p.community_id = ? AND p.created_at < ? ORDER BY p.created_at DESC LIMIT 30`,
    args: [user.community_id, before],
  });
  const posts = rows(result).map(post);
  return { posts, nextBefore: posts.length === 30 ? posts.at(-1).createdAt : null };
});

route('POST', '/posts', async (ctx) => {
  const user = await member(ctx);
  const body = text(ctx.body.body, 'a message', { max: 1500 });
  const id = randomUUID();
  await ctx.db.execute({
    sql: 'INSERT INTO posts (id, community_id, author_id, body) VALUES (?, ?, ?, ?)',
    args: [id, user.community_id, user.id, body],
  });
  const created = one(await ctx.db.execute({
    sql: 'SELECT p.*, u.display_name, u.role FROM posts p LEFT JOIN users u ON u.id = p.author_id WHERE p.id = ?',
    args: [id],
  }));
  return { status: 201, data: { post: post(created) } };
});

route('DELETE', '/posts/:id', async (ctx) => {
  const user = await member(ctx);
  const target = one(await ctx.db.execute({
    sql: 'SELECT author_id FROM posts WHERE id = ? AND community_id = ?',
    args: [ctx.params.id, user.community_id],
  }));
  if (!target) throw new AppError(404, 'That post was not found.');
  if (target.author_id !== user.id && user.role !== 'instructor') throw new AppError(403, 'You can only remove your own posts.');
  await ctx.db.execute({ sql: 'DELETE FROM posts WHERE id = ?', args: [ctx.params.id] });
  return { status: 204 };
});

route('GET', '/progress', async (ctx) => {
  const user = await member(ctx);
  const [lessons, quizzes] = await ctx.db.batch([
    { sql: 'SELECT lesson_id, completed_at FROM lesson_progress WHERE user_id = ? ORDER BY completed_at', args: [user.id] },
    { sql: 'SELECT score, created_at FROM quiz_attempts WHERE user_id = ? ORDER BY created_at DESC LIMIT 50', args: [user.id] },
  ], 'read');
  const completed = rows(lessons).map((l) => l.lesson_id);
  return {
    completed,
    progress: Math.round((completed.length / LESSONS.length) * 100),
    quizHistory: rows(quizzes).reverse().map((q) => ({ score: Number(q.score), date: q.created_at })),
  };
});

route('PUT', '/progress/lessons/:lessonId', async (ctx) => {
  const user = await member(ctx);
  if (!LESSON_IDS.has(ctx.params.lessonId)) throw new AppError(404, 'That lesson was not found.');
  await ctx.db.execute({
    sql: 'INSERT INTO lesson_progress (user_id, lesson_id) VALUES (?, ?) ON CONFLICT DO NOTHING',
    args: [user.id, ctx.params.lessonId],
  });
  return { lessonId: ctx.params.lessonId, completed: true };
});

route('POST', '/progress/quizzes', async (ctx) => {
  const user = await member(ctx);
  const score = ctx.body.score;
  if (!Number.isInteger(score) || score < 0 || score > 100) throw new AppError(400, 'Scores are whole numbers from 0 to 100.');
  await ctx.db.execute({
    sql: 'INSERT INTO quiz_attempts (id, user_id, score) VALUES (?, ?, ?)',
    args: [randomUUID(), user.id, score],
  });
  return { status: 201, data: { score } };
});

// ---------- app ----------

// One Vercel function serves every /api route (vercel.json rewrites to it), which keeps
// the project far below the Hobby plan's function limit and shares one warm DB client.
export function createApp({ db, verifyToken, env = process.env, communities = COMMUNITIES }) {
  return async function handler(req, res) {
    try {
      const url = new URL(req.url, 'http://localhost');
      const rewritten = url.searchParams.get('route');
      const path = '/' + (rewritten ?? url.pathname.replace(/^\/api\/?/, '')).replace(/^\/+|\/+$/g, '');
      url.searchParams.delete('route');

      let allowed = [];
      for (const r of routes) {
        const match = r.pattern.exec(path);
        if (!match) continue;
        if (r.method !== req.method) { allowed.push(r.method); continue; }
        const params = Object.fromEntries(r.keys.map((k, i) => [k, decodeURIComponent(match[i + 1])]));
        const body = ['POST', 'PUT', 'PATCH'].includes(req.method) ? await readBody(req) : {};
        if (body === null || typeof body !== 'object' || Array.isArray(body)) throw new AppError(400, 'The request could not be read.');
        if (!['/health', '/config', '/communities', '/hal'].includes(path)) await ensureSchema(db);
        const out = await r.handler({ req, db, env, communities, verifyToken, params, query: url.searchParams, body });
        if (out && typeof out.status === 'number' && Object.keys(out).every((k) => k === 'status' || k === 'data'))
          return send(res, out.status, out.data);
        return send(res, 200, out);
      }
      if (allowed.length) {
        res.setHeader('Allow', allowed.join(', '));
        throw new AppError(405, 'That method is not supported here.');
      }
      throw new AppError(404, 'Not found.');
    } catch (error) {
      failure(res, error);
    }
  };
}
