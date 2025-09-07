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

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) =>
      setSession(session)
    );

    return () => authListener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 32px",
        background: "#fff",
        borderBottom: "1px solid #eee",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Image src="/images/fintrack.logo.png" alt="Fintrack Logo" width={140} height={50} />
        <span style={{ fontSize: 14, color: "#555" }}>Your money, your way.</span>
      </div>

      {/* Menu */}
      <nav style={{ display: "flex", gap: 20, alignItems: "center", fontWeight: 500 }}>
        <Link href="/" style={{ textDecoration: "none", color: "#0d1f4c" }}>
          Home
        </Link>
        <Link href="/about-us" style={{ textDecoration: "none", color: "#0d1f4c" }}>
          About Us
        </Link>
        <Link href="/contact-us" style={{ textDecoration: "none", color: "#0d1f4c" }}>
          Contact Us
        </Link>
        <Link href="/services" style={{ textDecoration: "none", color: "#0d1f4c" }}>
          Services
        </Link>

        {!session ? (
          <Link
            href="/auth"
            style={{ textDecoration: "none", color: "#0d1f4c", fontWeight: 600 }}
          >
            Login|Signup
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            style={{
              border: "none",
              background: "#ff6b61",
              color: "#fff",
              padding: "8px 16px",
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}
