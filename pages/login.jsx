import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    } else {
      router.push("/"); // redirect accueil
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f9f9f9",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          background: "#fff",
          padding: "32px",
          borderRadius: 16,
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: 400,
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: 20, fontSize: "1.5rem" }}>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: 12,
            borderRadius: 8,
            border: "1px solid #ccc",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: 16,
            borderRadius: 8,
            border: "1px solid #ccc",
          }}
        />

        {error && <p style={{ color: "red", marginBottom: 12 }}>{error}</p>}

        <button
          type="submit"
          style={{
            background: "#1f6feb",
            color: "#fff",
            padding: "12px",
            border: "none",
            borderRadius: 8,
            width: "100%",
            fontWeight: 600,
            cursor: "pointer",
            transition: "0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#155ccc")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#1f6feb")}
        >
          Login
        </button>
      </form>
    </div>
  );
}
