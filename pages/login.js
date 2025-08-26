import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/router";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Connexion
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      router.push("/"); // redirection vers Dashboard
    }
    setLoading(false);
  };

  // Inscription
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      alert("Compte créé ! Vérifie ton email pour confirmer.");
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "2rem auto" }}>
      <h1>Login / Signup</h1>
      <form>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ display: "block", width: "100%", marginBottom: "1rem" }}
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ display: "block", width: "100%", marginBottom: "1rem" }}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{ marginRight: "1rem" }}
        >
          {loading ? "Connexion..." : "Login"}
        </button>

        <button onClick={handleSignup} disabled={loading}>
          {loading ? "Inscription..." : "Signup"}
        </button>
      </form>
    </div>
  );
}
