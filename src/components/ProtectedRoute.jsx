/**
 * components/ProtectedRoute.jsx
 *
 * Wraps routes that will require authentication once it's implemented.
 * Today `isAuthenticated` is always true (see AuthContext), so this simply
 * renders its children — but every route is already wrapped, so enabling
 * real auth later is a one-line change in AuthContext instead of a
 * route-by-route refactor.
 */

import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { isAuthenticated, isAuthReady } = useContext(AuthContext);

  if (!isAuthReady) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
