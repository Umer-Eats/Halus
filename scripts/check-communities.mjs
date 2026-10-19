// Validates communities.json and confirms every password setting is present in this environment.
// Run before deploying: npm run communities:check
import { COMMUNITIES, checkPasswordSettings } from '../server/communities.js';

const problems = checkPasswordSettings();
for (const c of COMMUNITIES) console.log(`${c.id}  ${c.name}  (${c.studentEnv}, ${c.instructorEnv})`);
if (problems.length) {
  for (const p of problems) console.error('  - ' + p);
  process.exit(1);
}
console.log('All community passwords are configured.');
