/* pages/signup.jsx */
import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setMessage(error.message);
    else {
      setMessage("✅ Inscription réussie ! Vérifie ton email pour confirmer.");
      setTimeout(() => router.push("/personal"), 2000); // redirige après 2s
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto", textAlign: "center" }}>
      <h2>Créer un compte</h2>
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
      <button onClick={handleSignup} style={{ padding:"10px 20px", marginTop:10 }}>
        S'inscrire
      </button>
      <p style={{ marginTop:16 }}>
        Déjà un compte ? <a href="/login">Se connecter</a>
      </p>
    </div>
  );
}
