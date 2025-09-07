// components/Header.jsx
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Header() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };
    getSession();
    const { data: listener } = supabase.auth.onAuthStateChange((_evt, session) => setSession(session));
    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  return (
    <header style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "16px 32px", background: "#fff", borderBottom: "1px solid #ddd",
      position: "sticky", top: 0, zIndex: 1000
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Image src="/images/fintrack.logo.png" alt="Logo" width={140} height={50} />
        <span style={{ fontSize: 16, fontWeight: 500, color: "#333" }}>Fintrack</span>
      </div>
      <nav style={{ display: "flex", gap: 24, alignItems: "center" }}>
        {["Home", "About Us", "Contact Us", "Services"].map((item, idx) => (
          <Link key={idx} href={`/${item.toLowerCase().replace(/\s/g, "-")}`}>
            <a style={{
              textDecoration: "none", color: "#555", fontSize: 15,
              padding: "6px 10px", borderRadius: 6,
              transition: "background 0.2s, color 0.2s"
            }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "#f0f0f0";
                e.currentTarget.style.color = "#1f6feb";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#555";
              }}
            >
              {item}
            </a>
          </Link>
        ))}

        {!session ? (
          <Link href="/auth">
            <a style={{
              fontWeight: 600, color: "#1f6feb", fontSize: 15,
              padding: "6px 10px", borderRadius: 6, border: "1px solid #1f6feb",
              transition: "background 0.2s, color 0.2s"
            }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "#1f6feb";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#1f6feb";
              }}
            >
              Login | Signup
            </a>
          </Link>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 15, color: "#333" }}>👋 {session.user.user_metadata?.prenom || session.user.email}</span>
            <button onClick={handleLogout} style={{
              padding: "6px 12px", border: "none", borderRadius: 6,
              background: "#ff6b61", color: "#fff", cursor: "pointer",
              fontSize: 15, transition: "background 0.2s"
            }}
              onMouseEnter={e => e.currentTarget.style.background = "#e55650"}
              onMouseLeave={e => e.currentTarget.style.background = "#ff6b61"}
            >
              Logout
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
