// fintrack/pages/signup.js
import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMsg(null);

    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
    else {
      setMsg("Signup successful — check your email to confirm.");
      router.push("/login");
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>Sign up</h1>
      <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 360 }}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Create account</button>
      </form>
      {msg && <p style={{ color: "green" }}>{msg}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>
        Already have an account? <a href="/login">Log in</a>
      </p>
    </div>
  );
}
