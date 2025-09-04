import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";

export default function Signup() {
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          prenom,
          nom,
        },
      },
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
        onSubmit={handleSignup}
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
        <h2 style={{ marginBottom: 20, fontSize: "1.5rem" }}>Signup</h2>

        <input
          type="text"
          placeholder="First Name"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
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
          type="text"
          placeholder="Last Name"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
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
            background: "#ff7f50",
            color: "#fff",
            padding: "12px",
            border: "none",
            borderRadius: 8,
            width: "100%",
            fontWeight: 600,
            cursor: "pointer",
            transition: "0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#ff6333")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#ff7f50")}
        >
          Signup
        </button>
      </form>
    </div>
  );
}
