// Firebase Google sign-in plus the Halus API. The Firebase web config comes from GET /api/config,
// so nothing project-specific is committed to the static site.
const SDK = 'https://www.gstatic.com/firebasejs/12.19.0/';

export const session = {
  ready: false,       // first auth check finished
  unavailable: '',    // sign-in cannot start (missing config, offline)
  user: null,         // Firebase user
  profile: null,      // Halus profile once enrolled
  enrolled: false,
  error: '',
  communities: [],
};

let fb = null;
const listeners = new Set();
const notify = () => listeners.forEach((fn) => fn());
export const onSession = (fn) => listeners.add(fn);

export async function api(method, path, body) {
  const token = await session.user?.getIdToken();
  let res;
  try {
    res = await fetch('/api' + path, {
      method,
      headers: { ...(token && { Authorization: 'Bearer ' + token }), ...(body && { 'Content-Type': 'application/json' }) },
      body: body && JSON.stringify(body),
    });
  } catch {
    throw new Error('Halus could not be reached. Check your connection and try again.');
  }
  if (res.status === 204) return null;
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw Object.assign(new Error(data.error || 'Halus is temporarily unavailable. Please try again.'), { status: res.status });
  return data;
}

async function loadProfile() {
  session.error = '';
  try {
    const me = await api('GET', '/me');
    session.enrolled = me.enrolled;
    session.profile = me.profile;
  } catch (error) {
    session.enrolled = false;
    session.profile = null;
    session.error = error.message;
  }
}

export async function startSession() {
  try {
    const config = await api('GET', '/config');
    session.communities = config.communities ?? [];
    if (!config.firebase?.apiKey || !config.firebase?.authDomain) throw new Error('Sign-in is not configured yet.');
    const [{ initializeApp }, auth] = await Promise.all([import(SDK + 'firebase-app.js'), import(SDK + 'firebase-auth.js')]);
    fb = { ...auth, auth: auth.getAuth(initializeApp(config.firebase)) };
  } catch (error) {
    session.unavailable = error.message || 'Sign-in is unavailable right now.';
    session.ready = true;
    return notify();
  }
  fb.onAuthStateChanged(fb.auth, async (user) => {
    session.user = user;
    session.profile = null;
    session.enrolled = false;
    if (user) await loadProfile();
    session.ready = true;
    notify();
  });
}

const AUTH_ERRORS = {
  'auth/popup-blocked': 'Your browser blocked the Google window. Allow pop-ups for Halus and try again.',
  'auth/unauthorized-domain': 'Google sign-in is not enabled for this address yet.',
  'auth/operation-not-allowed': 'Google sign-in is not enabled for Halus yet.',
  'auth/network-request-failed': 'Google could not be reached. Check your connection and try again.',
  'auth/account-exists-with-different-credential': 'This email already uses a different sign-in method.',
  'auth/user-disabled': 'This account has been disabled.',
};

// Resolves false when the person closes the Google window themselves.
export async function googleSignIn() {
  if (!fb) throw new Error(session.unavailable || 'Sign-in is still loading.');
  const provider = new fb.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  try {
    await fb.signInWithPopup(fb.auth, provider);
    return true;
  } catch (error) {
    if (error?.code === 'auth/popup-closed-by-user' || error?.code === 'auth/cancelled-popup-request') return false;
    throw new Error(AUTH_ERRORS[error?.code] || 'Google sign-in did not finish. Please try again.');
  }
}

export async function enroll({ role, communityId, password, displayName }) {
  const { profile } = await api('POST', '/auth/register', { role, communityId, password, displayName });
  session.profile = profile;
  session.enrolled = true;
  session.error = '';
  notify();
  return profile;
}

export function setProfile(profile) {
  session.profile = profile;
  notify();
}

export async function signOut() {
  await fb?.signOut(fb.auth);
}
