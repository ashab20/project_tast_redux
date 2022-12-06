import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export function PrivateGuard({ children }) {
  const isLoggedIn = useAuth();
  return isLoggedIn ? children : <Navigate to="/" />;
}

export function PublicGuard({ children }) {
  const isLoggedIn = useAuth();

  return !isLoggedIn ? children : <Navigate to="/teams" />;
}
