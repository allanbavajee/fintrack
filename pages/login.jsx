import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/router";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setMessage(error.message);
    else {
      setMessage("Connexion réussie !");
      router.push("/personal");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "100px auto", textAlign: "center" }}>
      <h2>Login</h2>
      {message && <p>{message}</p>}
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={{ display: "block", margin: "10px auto", padding: "8px", width: "100%" }} />
      <input type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} style={{ display: "block", margin: "10px auto", padding: "8px", width: "100%" }} />
      <button onClick={handleLogin} style={{ padding: "10px 20px", marginTop: 12, background: "#1f6feb", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}>
        Login
      </button>
    </div>
  );
}
