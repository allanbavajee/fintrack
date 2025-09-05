/* pages/auth.js */
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true); // true = login, false = signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) setMessage(error.message);
        else setMessage("Login successful!");
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) setMessage(error.message);
        else setMessage("Signup successful! Please check your email.");
      }
    } catch (err) {
      setMessage("Something went wrong.");
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#f9f9f9", fontFamily: "Inter, Arial, sans-serif" }}>
      <div style={{ width: 380, padding: 32, background: "#fff", borderRadius: 16, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
        
        {/* Toggle */}
        <div style={{ display: "flex", justifyContent: "center", gap: 24, marginBottom: 24 }}>
          <button onClick={() => setIsLogin(true)}
            style={{
              padding: "8px 24px",
              border: "none",
              borderBottom: isLogin ? "3px solid #1f6feb" : "3px solid transparent",
              background: "transparent",
              cursor: "pointer",
              fontWeight: 600,
              color: isLogin ? "#1f6feb" : "#555",
              transition: "0.2s"
            }}>Login</button>
          <button onClick={() => setIsLogin(false)}
            style={{
              padding: "8px 24px",
              border: "none",
              borderBottom: !isLogin ? "3px solid #ff6b61" : "3px solid transparent",
              background: "transparent",
              cursor: "pointer",
              fontWeight: 600,
              color: !isLogin ? "#ff6b61" : "#555",
              transition: "0.2s"
            }}>Signup</button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ padding: 12, borderRadius: 8, border: "1px solid #ccc", fontSize: 14 }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ padding: 12, borderRadius: 8, border: "1px solid #ccc", fontSize: 14 }}
          />
          <button type="submit" style={{
            padding: 12,
            borderRadius: 8,
            border: "none",
            background: isLogin ? "#1f6feb" : "#ff6b61",
            color: "#fff",
            fontWeight: 600,
            cursor: "pointer",
            transition: "0.2s"
          }} onMouseEnter={e => e.currentTarget.style.opacity = 0.9} onMouseLeave={e => e.currentTarget.style.opacity = 1}>
            {isLogin ? "Login" : "Signup"}
          </button>
        </form>

        {message && <p style={{ marginTop: 16, color: "#ff4d4d", textAlign: "center" }}>{message}</p>}
      </div>
    </div>
  );
}
