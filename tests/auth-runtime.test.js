import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';

test('Firebase authentication loads without requiring ESM from CommonJS', () => {
  // Vercel's function loader rejects the synchronous require('jose') used by
  // jwks-rsa when jose is ESM-only, even when a local Node import succeeds.
  const result = spawnSync(process.execPath, [
    '--no-experimental-require-module', '--input-type=module', '-e',
    "await import('./server/auth.js'); await import('./api/index.js');",
  ], { cwd: new URL('../', import.meta.url), encoding: 'utf8', timeout: 10_000 });
  assert.equal(result.status, 0, result.stderr || result.error?.message);
});
