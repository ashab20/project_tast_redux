import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { PrivateGuard, PublicGuard } from "./components/authGuard";
import Navbar from "./components/Navbar";
import Notice from "./components/Notice";
import useAuthCheck from "./hooks/useAuthCheck";
import Login from "./pages/Login";
import Project from "./pages/Projects";
import Teams from "./pages/Teams";

function App() {
  const authCheck = useAuthCheck();

  return !authCheck ? (
    <div>Authentication Checking</div>
  ) : (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PublicGuard>
              <Login />
            </PublicGuard>
          }
        />
        <Route
          path="/projects"
          element={
            <PrivateGuard>
              <Project />
            </PrivateGuard>
          }
        />
        <Route
          path="/teams"
          element={
            <PrivateGuard>
              <Teams />
            </PrivateGuard>
          }
        />
      </Routes>
      <Notice />
    </Router>
  );
}

export default App;
