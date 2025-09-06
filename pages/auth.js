// pages/auth.jsx
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Link from "next/link";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login"); // login | signup
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("✅ Login successful! Redirecting...");
      window.location.href = "/"; // redirection après connexion
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage("");

    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          first_name: formData.firstName,
          last_name: formData.lastName,
        },
      },
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("✅ Signup successful! Please check your email to confirm.");
    }
  };

  return (
    <div style={{ fontFamily: "Inter, sans-serif", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header (menu identique à index) */}
      <header style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "16px 32px", background: "#fff", borderBottom: "1px solid #eee"
      }}>
        <Link href="/" style={{ fontSize: 20, fontWeight: 600, color: "#0d1f4c", textDecoration: "none" }}>
          Fintrack
        </Link>
        <nav style={{ display: "flex", gap: 16, fontWeight: 500 }}>
          {["Home", "About Us", "Contact Us", "Services"].map((item, idx) => (
            <Link key={idx} href={`/${item.toLowerCase().replace(/\s/g, "-")}`}
              style={{ textDecoration: "none", color: "#0d1f4c" }}>
              {item}
            </Link>
          ))}
        </nav>
      </header>

      {/* Auth form */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center"
      }}>
        <div style={{
          background: "#fff", padding: 32, borderRadius: 16,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)", width: "100%", maxWidth: 400
        }}>
          {/* Tabs */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
            <button
              onClick={() => setActiveTab("login")}
              style={{
                flex: 1, padding: 12, fontWeight: 600,
                background: activeTab === "login" ? "#1f6feb" : "#f5f5f5",
                color: activeTab === "login" ? "#fff" : "#333",
                border: "none", borderRadius: "8px 0 0 8px", cursor: "pointer"
              }}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab("signup")}
              style={{
                flex: 1, padding: 12, fontWeight: 600,
                background: activeTab === "signup" ? "#1f6feb" : "#f5f5f5",
                color: activeTab === "signup" ? "#fff" : "#333",
                border: "none", borderRadius: "0 8px 8px 0", cursor: "pointer"
              }}
            >
              Signup
            </button>
          </div>

          {/* Forms */}
          {activeTab === "login" ? (
            <form onSubmit={handleLogin}>
              <input
                type="email" name="email" placeholder="Email"
                value={formData.email} onChange={handleChange}
                required style={inputStyle}
              />
              <input
                type="password" name="password" placeholder="Password"
                value={formData.password} onChange={handleChange}
                required style={inputStyle}
              />
              <button type="submit" style={btnStyle}>Login</button>
            </form>
          ) : (
            <form onSubmit={handleSignup}>
              <input
                type="text" name="firstName" placeholder="First Name"
                value={formData.firstName} onChange={handleChange}
                required style={inputStyle}
              />
              <input
                type="text" name="lastName" placeholder="Last Name"
                value={formData.lastName} onChange={handleChange}
                required style={inputStyle}
              />
              <input
                type="email" name="email" placeholder="Email"
                value={formData.email} onChange={handleChange}
                required style={inputStyle}
              />
              <input
                type="password" name="password" placeholder="Password"
                value={formData.password} onChange={handleChange}
                required style={inputStyle}
              />
              <button type="submit" style={btnStyle}>Signup</button>
            </form>
          )}

          {message && <p style={{ marginTop: 16, textAlign: "center", color: "#ff6b61" }}>{message}</p>}
        </div>
      </div>
    </div>
  );
}

/* Styles */
const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "14px",
};

const btnStyle = {
  width: "100%",
  padding: "12px",
  border: "none",
  borderRadius: "8px",
  background: "#1f6feb",
  color: "#fff",
  fontWeight: 600,
  cursor: "pointer",
};
