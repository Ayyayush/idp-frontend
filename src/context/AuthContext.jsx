/**
 * context/AuthContext.jsx
 *
 * Scaffolding for future JWT authentication. The backend has no auth
 * endpoints today, so this provider currently treats every visitor as
 * authenticated and never blocks the app. Wiring in real auth later only
 * requires updating login()/logout() below and services/authService.js —
 * every consumer of this context (ProtectedRoute, Navbar, etc.) already
 * reads the right shape.
 */

import { createContext, useCallback, useMemo, useState } from "react";
import * as authService from "../services/authService";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext({
  user: null,
  isAuthenticated: true,
  isAuthReady: true,
  login: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  // No login screen exists yet, so there is no real "user" object. Auth is
  // treated as always-ready/always-allowed until the backend supports it.
  const [user] = useState(null);

  const login = useCallback(async (credentials) => {
    return authService.login(credentials);
  }, []);

  const logout = useCallback(() => {
    authService.logout();
  }, []);

  const value = useMemo(
    () => ({
      user,
      // Hard-coded true today (no auth enforcement yet). Once real auth
      // ships, derive this from the presence/validity of a stored token.
      isAuthenticated: true,
      isAuthReady: true,
      login,
      logout,
    }),
    [user, login, logout]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};
