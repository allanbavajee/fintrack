/* pages/login.jsx */
import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSignin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setMessage(error.message);
    else {
      setMessage("✅ Connexion réussie !");
      setTimeout(() => router.push("/personal"), 1500); // redirige après 1.5s
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto", textAlign: "center" }}>
      <h2>Se connecter</h2>
      {message && <p>{message}</p>}
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={e => setEmail(e.target.value)} 
        style={{ display:"block", width:"100%", margin:"8px 0", padding:"8px" }}
      />
      <input 
        type="password" 
        placeholder="Mot de passe" 
        value={password} 
        onChange={e => setPassword(e.target.value)} 
        style={{ display:"block", width:"100%", margin:"8px 0", padding:"8px" }}
      />
      <button onClick={handleSignin} style={{ padding:"10px 20px", marginTop:10 }}>
        Se connecter
      </button>
      <p style={{ marginTop:16 }}>
        Pas encore de compte ? <a href="/signup">Créer un compte</a>
      </p>
    </div>
  );
}
