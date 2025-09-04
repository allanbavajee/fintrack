/* pages/signup.jsx */
import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return setMessage(error.message);

    if (data.user) {
      // Enregistrer nom & prénom dans "profiles"
      await supabase.from("profiles").insert({
        id: data.user.id,
        first_name: firstName,
        last_name: lastName,
      });
    }

    setMessage("✅ Inscription réussie !");
    setTimeout(() => router.push("/personal"), 1500);
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto", textAlign: "center" }}>
      <h2>Créer un compte</h2>
      {message && <p>{message}</p>}
      <input placeholder="Prénom" value={firstName} onChange={e => setFirstName(e.target.value)} />
      <input placeholder="Nom" value={lastName} onChange={e => setLastName(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleSignup}>S'inscrire</button>
      <p>Déjà un compte ? <a href="/login">Se connecter</a></p>
    </div>
  );
}
