import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/router";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage("");

    // Envoie le mail de confirmation avec redirectTo
    const { data, error } = await supabase.auth.signUp(
      {
        email,
        password,
      },
      {
        redirectTo: `${window.location.origin}/login`, // Redirection après confirmation
      }
    );

    if (error) {
      setError(error.message);
    } else {
      setMessage("Signup successful! Check your email to confirm your account.");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Sign Up</h1>
      <form
        onSubmit={handleSignup}
        style={{ display: "flex", flexDirection: "column", maxWidth: "300px" }}
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ marginBottom: "10px", padding: "8px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ marginBottom: "10px", padding: "8px" }}
        />
        <button type="submit" style={{ padding: "10px" }}>
          Sign Up
        </button>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
