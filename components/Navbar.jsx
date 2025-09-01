/* components/Navbar.jsx */
import Link from "next/link";
import { supabase } from "../lib/supabaseClient";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => setSession(session)
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleSignout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  return (
    <nav style={{ display: "flex", gap: "15px", padding: "10px", borderBottom: "1px solid #ccc" }}>
      <Link href="/">Accueil</Link>
      {session && <Link href="/clients">Clients</Link>}
      {session && <Link href="/invoices">Invoices</Link>}
      {session && <Link href="/quotes">Quotes</Link>}
      {session && <Link href="/quotes/add">Créer Quotation</Link>}

      <div style={{ marginLeft: "auto" }}>
        {!session ? (
          <Link href="/">Login / Signup</Link>
        ) : (
          <>
            <span>{session.user.email}</span>
            <button onClick={handleSignout} style={{ marginLeft: "10px" }}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
