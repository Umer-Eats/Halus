import { createApp } from '../server/app.js';
import { firebaseVerifier } from '../server/auth.js';
import { createDb } from '../server/db.js';
import { failure } from '../server/http.js';

let app = null;

export default async function handler(req, res) {
  try {
    app ??= createApp({ db: createDb(), verifyToken: firebaseVerifier() });
  } catch (error) {
    return failure(res, error);
  }
  return app(req, res);
}
