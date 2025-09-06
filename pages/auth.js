// pages/auth.jsx
import { useState } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabaseClient";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- SIGN UP ---
  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            firstname: formData.firstname,
            lastname: formData.lastname,
          },
        },
      });
      if (error) throw error;
      setMessage("✅ Signup successful! Please check your email to confirm.");
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    }
  };

  // --- LOGIN ---
  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      if (error) throw error;
      setMessage("✅ Login successful! Redirecting...");
      window.location.href = "/"; // redirection vers la page d’accueil
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    }
  };

  return (
    <div style={{ fontFamily: "Inter, sans-serif", minHeight: "100vh", background: "#f9f9f9" }}>
      {/* Header avec menu */}
      <header style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "center", padding: "16px 32px",
        background: "#fff", borderBottom: "1px solid #eee"
      }}>
        <h2 style={{ color: "#0d1f4c" }}>Fintrack</h2>
        <nav style={{ display: "flex", gap: 16, alignItems: "center", fontWeight: 500 }}>
          <Link href="/">Home</Link>
          <Link href="/about-us">About Us</Link>
          <Link href="/services">Services</Link>
          <Link href="/contact-us">Contact Us</Link>
          <Link href="/auth" style={{ fontWeight: 600 }}>Login|Signup</Link>
        </nav>
      </header>

      {/* Container Auth */}
      <div style={{ maxWidth: 400, margin: "60px auto", padding: 24, background: "#fff", borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
        {/* Tabs */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <button
            onClick={() => setActiveTab("login")}
            style={{
              flex: 1, padding: 12, border: "none",
              background: activeTab === "login" ? "#1f6feb" : "#eee",
              color: activeTab === "login" ? "#fff" : "#333",
              cursor: "pointer", borderRadius: "8px 0 0 8px"
            }}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab("signup")}
            style={{
              flex: 1, padding: 12, border: "none",
              background: activeTab === "signup" ? "#1f6feb" : "#eee",
              color: activeTab === "signup" ? "#fff" : "#333",
              cursor: "pointer", borderRadius: "0 8px 8px 0"
            }}
          >
            Signup
          </button>
        </div>

        {/* LOGIN FORM */}
        {activeTab === "login" && (
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required style={inputStyle} />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required style={inputStyle} />
            <button type="submit" style={btnStyle}>Login</button>
          </form>
        )}

        {/* SIGNUP FORM */}
        {activeTab === "signup" && (
          <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <input type="text" name="firstname" placeholder="First Name" value={formData.firstname} onChange={handleChange} required style={inputStyle} />
            <input type="text" name="lastname" placeholder="Last Name" value={formData.lastname} onChange={handleChange} required style={inputStyle} />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required style={inputStyle} />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required style={inputStyle} />
            <button type="submit" style={btnStyle}>Signup</button>
          </form>
        )}

        {/* Message */}
        {message && <p style={{ marginTop: 20, textAlign: "center", color: message.startsWith("✅") ? "green" : "red" }}>{message}</p>}
      </div>
    </div>
  );
}

const inputStyle = {
  padding: "12px 14px",
  border: "1px solid #ccc",
  borderRadius: 8,
  fontSize: 14
};

const btnStyle = {
  padding: "14px",
  border: "none",
  borderRadius: 8,
  background: "#1f6feb",
  color: "#fff",
  fontWeight: 600,
  fontSize: 15,
  cursor: "pointer"
};
