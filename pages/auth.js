/* pages/auth.jsx */
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";

export default function AuthPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        router.replace("/"); // si déjà connecté → home
      }
    };
    checkSession();
  }, [router]);

  const handleSignup = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { first_name: firstName, last_name: lastName } },
    });

    if (error) setMessage(error.message);
    else setMessage("✅ Inscription réussie ! Vérifie ton email pour confirmer.");
  };

  const handleSignin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setMessage(error.message);
    else {
      setMessage("✅ Connexion réussie !");
      router.replace("/"); // après login → home
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#fff", fontFamily: "Inter, Arial, sans-serif" }}>
      {/* Menu simple */}
      <header style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "16px 32px", borderBottom: "1px solid #eee"
      }}>
        <h2 style={{ color: "#0d1f4c" }}>Fintrack</h2>
        <nav style={{ display: "flex", gap: 16 }}>
          <a href="/">Home</a>
          <a href="/about-us">About Us</a>
          <a href="/contact-us">Contact Us</a>
          <a href="/services">Services</a>
        </nav>
      </header>

      <div style={{ maxWidth: 420, margin: "40px auto", padding: 24, border: "1px solid #eee", borderRadius: 12 }}>
        {/* Tabs */}
        <div style={{ display: "flex", justifyContent: "center", gap: 20, marginBottom: 20 }}>
          <button
            onClick={() => setActiveTab("login")}
            style={{
              padding: "10px 20px",
              border: "none",
              borderBottom: activeTab === "login" ? "2px solid #1f6feb" : "2px solid transparent",
              background: "transparent",
              cursor: "pointer",
              fontWeight: activeTab === "login" ? "700" : "400",
              color: "#0d1f4c"
            }}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab("signup")}
            style={{
              padding: "10px 20px",
              border: "none",
              borderBottom: activeTab === "signup" ? "2px solid #1f6feb" : "2px solid transparent",
              background: "transparent",
              cursor: "pointer",
              fontWeight: activeTab === "signup" ? "700" : "400",
              color: "#0d1f4c"
            }}
          >
            Signup
          </button>
        </div>

        {message && <p style={{ color: "#ff6b61", marginBottom: 12 }}>{message}</p>}

        {/* Forms */}
        {activeTab === "signup" && (
          <>
            <input type="text" placeholder="First Name" value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              style={{ width: "100%", marginBottom: 12, padding: 10, borderRadius: 8, border: "1px solid #ddd" }} />
            <input type="text" placeholder="Last Name" value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              style={{ width: "100%", marginBottom: 12, padding: 10, borderRadius: 8, border: "1px solid #ddd" }} />
          </>
        )}

        <input type="email" placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", marginBottom: 12, padding: 10, borderRadius: 8, border: "1px solid #ddd" }} />
        <input type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", marginBottom: 20, padding: 10, borderRadius: 8, border: "1px solid #ddd" }} />

        {activeTab === "signup" ? (
          <button onClick={handleSignup} style={{
            width: "100%", padding: "12px", border: "none", borderRadius: 8,
            background: "#1f6feb", color: "#fff", fontWeight: "600", cursor: "pointer"
          }}>
            Signup
          </button>
        ) : (
          <button onClick={handleSignin} style={{
            width: "100%", padding: "12px", border: "none", borderRadius: 8,
            background: "#1f6feb", color: "#fff", fontWeight: "600", cursor: "pointer"
          }}>
            Login
          </button>
        )}
      </div>
    </div>
  );
}
