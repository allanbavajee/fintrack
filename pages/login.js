import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/router";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  // Redirige si déjà connecté
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) router.push("/");
    };
    checkUser();
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else router.push("/");
  };

  const handleSignUp = async () => {
    setError(null);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
    else alert("Sign up successful! Check your email to confirm.");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Login / Sign Up</h1>
      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", maxWidth: "300px" }}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={{ marginBottom: "10px", padding: "8px" }} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required style={{ marginBottom: "10px", padding: "8px" }} />
        <button type="submit" style={{ padding: "10px", marginBottom: "10px" }}>Login</button>
        <button type="button" onClick={handleSignUp} style={{ padding: "10px" }}>Sign Up</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
