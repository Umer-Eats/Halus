# Halus backend

The static site in `dist/` and a single serverless function in `api/index.js` deploy together on Vercel. `vercel.json` rewrites every `/api/*` request to that function, and `server/app.js` routes it. Data lives in Turso. Accounts are Firebase Authentication. The server verifies each Firebase ID token with the Admin SDK and checks for revoked tokens.

## Setup

1. `npm install`
2. Copy `.env.example` to `.env` and fill it in. Locally, leave `TURSO_DATABASE_URL` unset to use a file database in `.data/`.
3. `npm run communities:check` confirms every community password is set.
4. `npm run dev` serves the site and the API at http://127.0.0.1:4173. Run `npm test` to run the tests.
5. On Vercel, add the same variables under Project > Settings > Environment Variables, then deploy. Tables are created automatically on the first request.

Turso: `turso db create halus`, then `turso db show halus --url` and `turso db tokens create halus`.
Firebase: enable the sign-in providers you want. Download a service account key (Project settings > Service accounts) for the three `FIREBASE_*` Admin settings. Add your Vercel domain under Authentication > Settings > Authorized domains.

## Communities

Communities are listed in [`communities.json`](communities.json), which is committed. It holds public names and IDs, plus the **names** of the environment settings that contain the passwords. It never holds the passwords themselves.

```json
{
  "id": "ppchs",
  "name": "Pembroke Pines Charter High School",
  "studentPassword": { "env": "PPCHS_STUDENT_PASSWORD" },
  "instructorPassword": { "env": "PPCHS_INSTRUCTOR_PASSWORD" }
}
```

- Each community has its own student password and its own instructor password. They must be different from each other, and no two communities may share a student password.
- Enrollment: a user signs in with Firebase. The site then calls `POST /api/auth/register` with `{ role, communityId, password, displayName }`. The password must match that community's password for the chosen role. Each account holds one role in one community.
- Wrong guesses are limited to 10 per account every 15 minutes.
- To change a password, update the setting in Vercel and redeploy. Existing members stay enrolled; the shared password only gates joining.
- To add a community, add an object with a new lowercase `id`, set its two settings, and deploy. Keep existing IDs unchanged, because memberships reference them.

## API

All routes except `health`, `config` and `communities` need `Authorization: Bearer <Firebase ID token>`.

| Route | Who | Purpose |
| --- | --- | --- |
| `GET /api/config` | anyone | Firebase web config and the public community list |
| `GET /api/communities` | anyone | `[{ id, name }]` |
| `POST /api/auth/register` | signed in | Join a community as a student or instructor |
| `GET /api/me`, `PATCH /api/me` | signed in | Profile (`enrolled: false` before joining); rename |
| `PUT /api/me/event` | student | Choose the annual event (once) |
| `GET /api/students` | instructor | Roster with event, lesson progress, last quiz score |
| `PATCH /api/students/:uid` | instructor | Change a student's event |
| `DELETE /api/students/:uid` | instructor | Remove a student's enrollment (their progress is kept) |
| `GET`, `POST /api/assignments` | member / instructor | Students see community-wide assignments plus those for their event |
| `PATCH`, `DELETE /api/assignments/:id` | instructor | Edit or delete |
| `GET /api/assignments/:id/submissions` | instructor | Responses |
| `PUT /api/assignments/:id/submission` | student | Submit or update a response |
| `GET`, `POST /api/posts` | member | Private community feed (`?before=` to page) |
| `DELETE /api/posts/:id` | author or instructor | Remove a post |
| `GET /api/progress` | member | Completed lessons and quiz history |
| `PUT /api/progress/lessons/:lessonId` | member | Mark a lesson complete |
| `POST /api/progress/quizzes` | member | Record a quiz score `{ score }` |

Errors are always `{ "error": "message" }`. The message is safe to show to users.
