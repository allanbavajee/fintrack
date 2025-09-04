import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const personalSteps = [
  { title: "Income", icon: "💼", desc: "Track your salary, freelance, or passive income." },
  { title: "Expenses", icon: "🛒", desc: "Record all monthly expenses." },
  { title: "Savings", icon: "🏦", desc: "Set aside income for savings and emergency funds." },
];

const proSteps = [
  { title: "Clients", icon: "👤", desc: "Manage client profiles and contacts." },
  { title: "Quotation", icon: "📝", desc: "Generate professional quotations." },
  { title: "Invoice", icon: "📄", desc: "Convert quotes into invoices and track payments." },
];

export default function Home() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };
    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => authListener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  return (
    <div style={{ minHeight: "100vh", fontFamily: "Inter, Arial, sans-serif" }}>
      {/* Login/Signup ou Logout */}
      <div style={{ position: "absolute", top: 16, right: 32 }}>
        {!session ? (
          <div style={{ display: "flex", gap: 10 }}>
            <Link href="/login">
              <button style={{ background: "#1f6feb", color: "#fff", border: "none", padding: "6px 14px", borderRadius: 6, cursor: "pointer" }}>
                Login
              </button>
            </Link>
            <Link href="/signup">
              <button style={{ background: "#ff7f50", color: "#fff", border: "none", padding: "6px 14px", borderRadius: 6, cursor: "pointer" }}>
                Signup
              </button>
            </Link>
          </div>
        ) : (
          <div>
            <span style={{ marginRight: 8, fontWeight: 600 }}>
              👋 Bienvenue {session.user.user_metadata?.prenom || session.user.email}
            </span>
            <button
              onClick={handleLogout}
              style={{ background: "#ff4d4d", color: "#fff", border: "none", padding: "6px 12px", borderRadius: 6, cursor: "pointer" }}
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Welcome Section */}
      <section style={{ maxWidth: 1000, margin: "80px auto 20px auto", textAlign: "center" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: 16 }}>Welcome to Fintrack</h2>
        <p style={{ fontSize: "1rem", color: "#444", lineHeight: 1.6 }}>
          Manage your personal and professional finances effortlessly. Track your income, expenses, savings, clients, quotations, and invoices all in one place.
        </p>
      </section>

      {/* Footer */}
      <footer style={{ textAlign: "center", padding: 16, borderTop: "1px solid #ccc", fontSize: 13, color: "#555" }}>
        © 2025 Fintrack. All rights reserved.
      </footer>
    </div>
  );
}
