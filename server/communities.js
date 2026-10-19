import { createHash, timingSafeEqual } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { AppError } from './http.js';

// communities.json is committed and holds only public names plus the NAMES of the
// environment settings that contain each community's passwords. The passwords live in
// .env locally and in the Vercel project settings in production.
export function loadCommunities(entries) {
  if (!Array.isArray(entries) || !entries.length) throw new Error('Add at least one community.');
  const ids = new Set();
  return entries.map((entry) => {
    if (typeof entry.id !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.id) || ids.has(entry.id))
      throw new Error('Community IDs must be unique lowercase words separated by hyphens.');
    if (typeof entry.name !== 'string' || !entry.name.trim()) throw new Error(`Community ${entry.id} needs a name.`);
    for (const field of ['studentPassword', 'instructorPassword']) {
      const setting = entry[field]?.env;
      if (typeof setting !== 'string' || !/^[A-Z][A-Z0-9_]*$/.test(setting))
        throw new Error(`Community ${entry.id}: ${field} needs a private environment setting name.`);
    }
    ids.add(entry.id);
    return {
      id: entry.id,
      name: entry.name.trim(),
      studentEnv: entry.studentPassword.env,
      instructorEnv: entry.instructorPassword.env,
    };
  });
}

export const COMMUNITIES = loadCommunities(
  JSON.parse(readFileSync(new URL('../communities.json', import.meta.url), 'utf8')),
);

export const publicCommunities = (list = COMMUNITIES) => list.map(({ id, name }) => ({ id, name }));
export const findCommunity = (id, list = COMMUNITIES) => list.find((c) => c.id === id) ?? null;

export function passwordFor(community, role, env = process.env) {
  const setting = role === 'instructor' ? community.instructorEnv : community.studentEnv;
  const value = env[setting];
  if (!value) throw new AppError(503, `${role === 'instructor' ? 'Instructor' : 'Student'} enrollment is not configured for ${community.name} yet.`);
  return value;
}

// Hashing first makes the comparison constant time regardless of input length.
export function equalSecret(actual, expected) {
  return timingSafeEqual(
    createHash('sha256').update(String(actual)).digest(),
    createHash('sha256').update(String(expected)).digest(),
  );
}

// A student password that matched another role or community would make enrollment ambiguous.
export function checkPasswordSettings(list = COMMUNITIES, env = process.env) {
  const problems = [];
  const seen = new Map();
  for (const c of list) {
    const student = env[c.studentEnv], instructor = env[c.instructorEnv];
    if (!student) problems.push(`${c.studentEnv} is not set`);
    if (!instructor) problems.push(`${c.instructorEnv} is not set`);
    if (student && instructor && student === instructor)
      problems.push(`${c.id}: student and instructor passwords must differ`);
    if (student) {
      if (seen.has(student)) problems.push(`${c.id} and ${seen.get(student)} share a student password`);
      seen.set(student, c.id);
    }
  }
  return problems;
}
