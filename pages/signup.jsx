import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/router";

export default function SignupPage() {
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { prenom, nom },
      },
    });
    if (error) setMessage(error.message);
    else {
      setMessage("Inscription réussie ! Vérifie ton email pour confirmer.");
      router.push("/personal");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "100px auto", textAlign: "center" }}>
      <h2>Signup</h2>
      {message && <p>{message}</p>}
      <input type="text" placeholder="Prénom" value={prenom} onChange={e => setPrenom(e.target.value)} style={{ display: "block", margin: "10px auto", padding: "8px", width: "100%" }} />
      <input type="text" placeholder="Nom" value={nom} onChange={e => setNom(e.target.value)} style={{ display: "block", margin: "10px auto", padding: "8px", width: "100%" }} />
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={{ display: "block", margin: "10px auto", padding: "8px", width: "100%" }} />
      <input type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} style={{ display: "block", margin: "10px auto", padding: "8px", width: "100%" }} />
      <button onClick={handleSignup} style={{ padding: "10px 20px", marginTop: 12, background: "#ff7f50", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}>
        Signup
      </button>
    </div>
  );
}
