import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = supabase.auth.getSession().then(({ data }) => {
      if (data.session) setUser(data.session.user);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) setUser(session.user);
      else setUser(null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 32px", background: "#fff", borderBottom: "1px solid #ddd" }}>
      
      {/* Logo + slogan */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <Image src="/images/fintrack.logo.png" alt="Fintrack Logo" width={120} height={50} />
        <span style={{ fontSize: 14, color: "#555", marginTop: 4 }}>
          Your money, your way.
        </span>
      </div>

      {/* Menu */}
      <nav style={{ display: "flex", gap: 24, alignItems: "center" }}>
        <Link href="/">Home</Link>
        <Link href="/about-us">About Us</Link>
        <Link href="/contact">Contact Us</Link>
        <Link href="/services">Services</Link>

        {/* Connexion / Déconnexion */}
        {user ? (
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span>👋 Bonjour {user.user_metadata?.prenom || user.email}</span>
            <button 
              onClick={handleLogout} 
              style={{ padding: "8px 16px", borderRadius: 6, border: "none", background: "#ff7f50", color: "#fff", cursor: "pointer" }}
            >
              Logout
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", gap: 12 }}>
            <Link href="/auth?mode=login">
              <button style={{ padding: "8px 16px", borderRadius: 6, border: "1px solid #1f6feb", background: "#fff", color: "#1f6feb", cursor: "pointer" }}>
                Login
              </button>
            </Link>
            <Link href="/auth?mode=signup">
              <button style={{ padding: "8px 16px", borderRadius: 6, border: "none", background: "#1f6feb", color: "#fff", cursor: "pointer" }}>
                Signup
              </button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
