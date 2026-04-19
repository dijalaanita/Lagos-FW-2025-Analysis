import { Link } from "react-router-dom";

const ROLE_COLORS = {
  designer: "#aa3bff",
  student:  "#2980b9",
  buyer:    "#27ae60",
};

const ROLE_LABELS = {
  designer: "✂️ Designer",
  student:  "🎓 Student",
  buyer:    "🛍️ Buyer",
};

export default function NavBar({ onLogout, role, username }) {
  const badgeColor = ROLE_COLORS[role] || "#888";
  const roleLabel  = ROLE_LABELS[role]  || role;

  return (
    <div style={{
      padding: "16px 40px",
      background: "#111",
      color: "white",
      display: "flex",
      gap: "20px",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      boxSizing: "border-box",
    }}>
      {/* Left: nav links */}
      <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
        <span style={{ fontWeight: "800", letterSpacing: "3px", fontSize: "15px", color: "#fff" }}>
          HoL
        </span>

        <Link to="/" style={linkStyle}>Overview</Link>

        {/* Brand Analysis only for designer + student */}
        {(role === "designer" || role === "student") && (
          <Link to="/brand-analysis" style={linkStyle}>Brand Analysis</Link>
        )}
      </div>

      {/* Right: role badge + username + logout */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {username && (
          <span style={{ color: "#aaa", fontSize: "13px" }}>
            {username}
          </span>
        )}

        <span style={{
          background: badgeColor,
          color: "#fff",
          padding: "3px 10px",
          borderRadius: "20px",
          fontSize: "11px",
          fontWeight: "600",
          letterSpacing: "1px",
        }}>
          {roleLabel}
        </span>

        <button
          onClick={onLogout}
          style={{
            background: "transparent",
            color: "white",
            border: "1px solid white",
            padding: "5px 15px",
            cursor: "pointer",
            borderRadius: "4px",
            fontSize: "13px",
            fontWeight: "600",
          }}
        >
          LOGOUT
        </button>
      </div>
    </div>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontWeight: "600",
  fontSize: "14px",
  letterSpacing: "1px",
};