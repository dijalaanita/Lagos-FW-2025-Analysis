import { useState } from "react";
import { login as loginService, signup } from "../services/auth";

const ROLES =[
    {
        value: "designer",
        label: "Designer",
        icon: "🎨",
        description:"Full access: brand analysis, insights, export & research profiles",
    },
    {
    value: "student",
    label: "Student",
    icon: "🎓",
    description: "Access overviews, colour & fabric trends, top rankings",
  },
  {
    value: "buyer",
    label: "Buyer",
    icon: "🛍️",
    description: "Overview, commercial insights & top colour/fabric picks",
  },
]

export default function Login({ loginSuccess}){
    const [isSigned, setIsSigned] = useState(false);
    const [form, setForm] = useState({ username: "", password:""});
    const [selectedRole, setSelectedRole] = useState(ROLES[0].value);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!form.username.trim() || !form.password.trim()) {
            setError("Username and password are required.");
            return;
        }
        setLoading(true);
        try {
            if (isSigned) {
                await signup(form.username, form.password, selectedRole);
                alert("Signup successful! Please login.");
                setIsSigned(false);
                setForm({ username: "", password: "" });
            } else {
                await loginService(form.username, form.password);
                loginSuccess();
            }
        } catch (err) {
            const detail = err.response?.data?.detail;
            setError(detail || "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }

    };

    return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#f5f5f5",
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      padding: "20px",
    }}>
      <div style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "40px",
        width: "100%",
        maxWidth: "460px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
      }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1 style={{ fontSize: "22px", fontWeight: "700", letterSpacing: "4px", color: "#111", margin: 0 }}>
            HoL
          </h1>
          <p style={{ fontSize: "11px", letterSpacing: "3px", color: "#999", marginTop: "4px", textTransform: "uppercase" }}>
            Lagos Fashion Week Analysis
          </p>
          <h2 style={{ fontSize: "18px", fontWeight: "400", color: "#333", marginTop: "20px", marginBottom: 0 }}>
            {isSignup ? "Create your account" : "Welcome back"}
          </h2>
        </div>
 
        {/* Role selector — only shown on signup */}
        {isSignup && (
          <div style={{ marginBottom: "24px" }}>
            <p style={{ fontSize: "12px", letterSpacing: "2px", color: "#888", textTransform: "uppercase", marginBottom: "12px" }}>
              I am a...
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {ROLES.map((role) => (
                <label
                  key={role.value}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    padding: "14px 16px",
                    borderRadius: "8px",
                    border: `2px solid ${selectedRole === role.value ? "#111" : "#e0e0e0"}`,
                    cursor: "pointer",
                    background: selectedRole === role.value ? "#f8f8f8" : "#fff",
                    transition: "border-color 0.15s",
                  }}
                >
                  <input
                    type="radio"
                    name="role"
                    value={role.value}
                    checked={selectedRole === role.value}
                    onChange={() => setSelectedRole(role.value)}
                    style={{ marginTop: "3px", accentColor: "#111" }}
                  />
                  <div>
                    <span style={{ fontSize: "15px", fontWeight: "600", color: "#111" }}>
                      {role.icon} {role.label}
                    </span>
                    <p style={{ fontSize: "12px", color: "#888", margin: "3px 0 0" }}>
                      {role.description}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}
 
        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            style={inputStyle}
            autoComplete="username"
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            style={inputStyle}
            autoComplete={isSignup ? "new-password" : "current-password"}
          />
 
          {error && (
            <p style={{ color: "#c0392b", fontSize: "13px", margin: 0, textAlign: "center" }}>
              {error}
            </p>
          )}
 
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "13px",
              background: loading ? "#888" : "#111",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "600",
              letterSpacing: "2px",
              textTransform: "uppercase",
              cursor: loading ? "not-allowed" : "pointer",
              marginTop: "4px",
              transition: "background 0.15s",
            }}
          >
            {loading ? "Please wait..." : isSignup ? "Create Account" : "Login"}
          </button>
        </form>
 
        {/* Toggle */}
        <p
          onClick={() => { setIsSignup(!isSignup); setError(""); }}
          style={{
            cursor: "pointer",
            marginTop: "20px",
            textAlign: "center",
            fontSize: "13px",
            color: "#555",
            textDecoration: "underline",
          }}
        >
          {isSignup ? "Already have an account? Log in" : "Need an account? Sign up"}
        </p>
      </div>
    </div>
  );
}
 
const inputStyle = {
  padding: "12px 14px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  fontSize: "14px",
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
};