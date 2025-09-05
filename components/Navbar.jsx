/* components/Navbar.jsx */
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Navbar() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };
    getSession();
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => setSession(session));
    return () => authListener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => { await supabase.auth.signOut(); setSession(null); };

  return (
    <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 32px", background: "#fff" }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Image src="/images/fintrack.logo.png" alt="Fintrack Logo" width={140} height={50} />
        <span style={{ fontSize: 14, color: "#555" }}>Your money, your way.</span>
      </div>

      {/* Menu */}
      <nav style={{ display: "flex", gap: 24, alignItems: "center" }}>
        <Link href="/">Home</Link>
        <Link href="/about-us">About Us</Link>
        <Link href="/contact">Contact Us</Link>
        <Link href="/services">Services</Link>
        {!session ? (
          <>
            <Link href="/login">Login</Link>
            <Link href="/signup">Signup</Link>
          </>
        ) : (
          <>
            <span>Hi, {session.user.user_metadata?.prenom || session.user.email}</span>
            <button onClick={handleLogout} style={{ background: "transparent", border: "none", cursor: "pointer", color: "#ff4d4d" }}>Logout</button>
          </>
        )}
      </nav>
    </header>
  );
}
