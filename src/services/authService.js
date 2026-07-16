/**
 * services/authService.js
 *
 * NOTE: Authentication is NOT implemented yet. The backend currently exposes
 * no auth endpoints. This file only prepares the shape future JWT-based auth
 * will plug into, so AuthContext/ProtectedRoute/api.js don't need to change
 * later — only the bodies of these functions do.
 *
 * When the backend adds real auth endpoints (e.g. POST /api/auth/login),
 * update the calls below to hit them, and wire attachAuthToken() into
 * services/api.js's request interceptor.
 */

const TOKEN_STORAGE_KEY = "idp_auth_token";

/** Reads the persisted token, if any. Returns null when auth isn't in use. */
export function getToken() {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
}

/** Persists a token after a future successful login. */
export function setToken(token) {
  if (token) {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
  }
}

/** Clears any stored token (future logout). */
export function clearToken() {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
}

/**
 * Placeholder login call. Not connected to any real endpoint yet — throws
 * so that any accidental early usage fails loudly instead of silently.
 */
export async function login(/* credentials */) {
  throw new Error(
    "Authentication is not yet enabled on the backend. login() is a placeholder."
  );
}

/** Placeholder logout — safe to call any time, just clears local state. */
export function logout() {
  clearToken();
}

/**
 * Attaches the Authorization header to an axios config object when a token
 * is present. Currently unused by services/api.js until auth goes live.
 */
export function attachAuthToken(config) {
  const token = getToken();
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
}
