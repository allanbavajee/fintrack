import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";

export default function AuthPage() {
  const router = useRouter();
  const { mode } = router.query; // "login" ou "signup"

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!mode) {
      router.replace("/auth?mode=login"); // défaut: login
    }
  }, [mode, router]);

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
      setMessage("✅ Inscription réussie ! Vérifie ton email pour confirmer.");
      router.push("/personal"); // redirection après signup
    }
  };

  const handleSignin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) setMessage(error.message);
    else {
      setMessage("✅ Connexion réussie !");
      router.push("/personal"); // redirection après login
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "60px auto", textAlign: "center", fontFamily: "Inter, Arial, sans-serif" }}>
      <h2 style={{ marginBottom: 20 }}>
        {mode === "signup" ? "Créer un compte" : "Connexion"}
      </h2>

      {message && <p style={{ color: "green", marginBottom: 12 }}>{message}</p>}

      {/* Champs supplémentaires uniquement pour Signup */}
      {mode === "signup" && (
        <>
          <input
            type="text"
            placeholder="Prénom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            style={{ width: "100%", padding: 10, marginBottom: 10 }}
          />
          <input
            type="text"
            placeholder="Nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            style={{ width: "100%", padding: 10, marginBottom: 10 }}
          />
        </>
      )}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", padding: 10, marginBottom: 10 }}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", padding: 10, marginBottom: 10 }}
      />

      {mode === "signup" ? (
        <button
          onClick={handleSignup}
          style={{
            width: "100%",
            padding: 12,
            background: "#ff7f50",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            marginBottom: 12,
          }}
        >
          S'inscrire
        </button>
      ) : (
        <button
          onClick={handleSignin}
          style={{
            width: "100%",
            padding: 12,
            background: "#1f6feb",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            marginBottom: 12,
          }}
        >
          Se connecter
        </button>
      )}

      <p style={{ fontSize: 14, marginTop: 8 }}>
        {mode === "signup" ? (
          <>
            Déjà un compte ?{" "}
            <a href="/auth?mode=login" style={{ color: "#1f6feb" }}>
              Se connecter
            </a>
          </>
        ) : (
          <>
            Pas encore inscrit ?{" "}
            <a href="/auth?mode=signup" style={{ color: "#ff7f50" }}>
              Créer un compte
            </a>
          </>
        )}
      </p>
    </div>
  );
}
