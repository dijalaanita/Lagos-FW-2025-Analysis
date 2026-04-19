import BrandAnalysis from "./pages/BrandAnalysis";
import NavBar from "./components/NavBar";
import Overview from "./pages/Overview";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login";
import { isAuthenticated, logout, getRole, getUsername } from "./services/auth";
import { useState, createContext, useContext } from "react";

// Any component can call useRole() to read the current user's role.
export const RoleContext = createContext({ role: null, username: null });
export const useRole = () => useContext(RoleContext);

// Wrap a route element to restrict it to certain roles.
function RoleRoute({ allowed, children }) {
  const { role } = useContext(RoleContext);
  if (!allowed.includes(role)) {
    return (
      <div style={{ textAlign: "center", padding: "80px 20px" }}>
        <h2 style={{ color: "#c0392b" }}>Access Restricted</h2>
        <p style={{ color: "#666" }}>
          Your account role (<strong>{role}</strong>) does not have permission to view this page.
        </p>
      </div>
    );
  }
  return children;
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());
  const [role, setRole] = useState(getRole());
  const [username, setUsername] = useState(getUsername());

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setRole(getRole());
    setUsername(getUsername());
  };

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    setRole(null);
    setUsername(null);
  };

  if (!isLoggedIn) {
    return <Login loginSuccess={handleLoginSuccess} />;
  }

  return (
    <RoleContext.Provider value={{ role, username }}>
      <div style={{ fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}>
        <NavBar onLogout={handleLogout} role={role} username={username} />

        <div
          className="content-container"
          style={{
            padding: "10px",
            maxWidth: "1200px",
            margin: "0 auto",
            minHeight: "100vh",
          }}
        >
          <Routes>
            {/* Everyone can see the overview */}
            <Route path="/" element={<Overview />} />

            {/* Brand Analysis: designers and students only */}
            <Route
              path="/brand-analysis"
              element={
                <RoleRoute allowed={["designer", "student"]}>
                  <BrandAnalysis />
                </RoleRoute>
              }
            />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </RoleContext.Provider>
  );
}