/* pages/auth.jsx */
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login"); // "login" ou "signup"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { firstName, lastName }, // stocké dans metadata
      },
    });
    if (error) setMessage(error.message);
    else setMessage("✅ Inscription réussie ! Vérifie ton email pour confirmer.");
  };

  const handleSignin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setMessage(error.message);
    else setMessage("✅ Connexion réussie !");
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#f9fafb" }}>
      <div style={{ width: 400, padding: 24, borderRadius: 16, background: "#fff", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        
        {/* Onglets */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <button
            onClick={() => setActiveTab("login")}
            style={{
              flex: 1,
              padding: "12px",
              border: "none",
              borderBottom: activeTab === "login" ? "3px solid #1f6feb" : "3px solid transparent",
              background: "transparent",
              cursor: "pointer",
              fontWeight: activeTab === "login" ? "700" : "500",
              color: activeTab === "login" ? "#1f6feb" : "#555",
            }}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab("signup")}
            style={{
              flex: 1,
              padding: "12px",
              border: "none",
              borderBottom: activeTab === "signup" ? "3px solid #ff6b61" : "3px solid transparent",
              background: "transparent",
              cursor: "pointer",
              fontWeight: activeTab === "signup" ? "700" : "500",
              color: activeTab === "signup" ? "#ff6b61" : "#555",
            }}
          >
            Signup
          </button>
        </div>

        {/* Message */}
        {message && <p style={{ textAlign: "center", marginBottom: 16, color: "#333" }}>{message}</p>}

        {/* Formulaire */}
        {activeTab === "signup" && (
          <>
            <input type="text" placeholder="First Name"
              value={firstName} onChange={e => setFirstName(e.target.value)}
              style={inputStyle} />
            <input type="text" placeholder="Last Name"
              value={lastName} onChange={e => setLastName(e.target.value)}
              style={inputStyle} />
          </>
        )}
        <input type="email" placeholder="Email"
          value={email} onChange={e => setEmail(e.target.value)}
          style={inputStyle} />
        <input type="password" placeholder="Password"
          value={password} onChange={e => setPassword(e.target.value)}
          style={inputStyle} />

        <button
          onClick={activeTab === "login" ? handleSignin : handleSignup}
          style={{
            width: "100%",
            padding: "12px",
            border: "none",
            borderRadius: 8,
            marginTop: 12,
            cursor: "pointer",
            background: activeTab === "login" ? "#1f6feb" : "#ff6b61",
            color: "#fff",
            fontWeight: 700,
            fontSize: "1rem",
          }}
        >
          {activeTab === "login" ? "Login" : "Signup"}
        </button>
      </div>
    </div>
  );
}

/* style réutilisable */
const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  marginBottom: 12,
  border: "1px solid #ccc",
  borderRadius: 6,
  fontSize: "0.95rem",
};
