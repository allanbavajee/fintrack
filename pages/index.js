/* pages/index.js */
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

/* DATA */
const personalSteps = [
  { title: "Income", icon: "💼", desc: "Track your personal income, expenses and savings." },
  { title: "Expenses", icon: "🛒", desc: "Record all monthly expenses: rent, groceries, subscriptions, leisure activities." },
  { title: "Savings", icon: "🏦", desc: "Set aside a percentage of your income for savings and emergency funds." },
];

const proSteps = [
  { title: "Clients", icon: "👤", desc: "Create and manage client profiles including contacts, company info, and notes." },
  { title: "Quotation", icon: "📝", desc: "Generate professional quotations for clients quickly and easily." },
  { title: "Invoice", icon: "📄", desc: "Convert quotes into invoices, track payments, and manage billing efficiently." },
];

/* Styles */
const cardStyle = {
  borderRadius: 16,
  padding: "16px",
  marginBottom: 24,
  maxWidth: 220,
  textAlign: "center",
  cursor: "pointer",
  backgroundColor: "#f9f9f9",
  transition: "all 0.3s ease",
  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
};

export default function Home() {
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
    <div style={{ minHeight: "100vh", background: "#ffffff", fontFamily: "Inter, Arial, sans-serif" }}>
      
      {/* Header */}
      <header style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 32px",
        background: "#fff",
        borderBottom: "1px solid #eee",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Image src="/images/fintrack.logo.png" alt="Fintrack Logo" width={140} height={50} />
          <span style={{ fontSize: 14, color: "#555" }}>Your money, your way.</span>
        </div>

        <nav style={{ display: "flex", gap: 20, alignItems: "center", fontWeight: 500 }}>
          {["Home", "About Us", "Contact Us", "Services"].map((item, idx) => (
            <Link key={idx} href={`/${item.toLowerCase().replace(/\s/g, '-')}`}
              style={{
                textDecoration: "none",
                color: "#0d1f4c",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.color = "#ff6b61"}
              onMouseLeave={e => e.currentTarget.style.color = "#0d1f4c"}
            >
              {item}
            </Link>
          ))}
          {!session ? (
            <>
              <Link href="/auth/login" style={{ color: "#0d1f4c", transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#1f6feb"}
                onMouseLeave={e => e.currentTarget.style.color = "#0d1f4c"}
              >Login</Link>
              <Link href="/auth/signup" style={{ color: "#0d1f4c", transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#1f6feb"}
                onMouseLeave={e => e.currentTarget.style.color = "#0d1f4c"}
              >Signup</Link>
            </>
          ) : (
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <span>👋 {session.user.user_metadata?.prenom || session.user.email}</span>
              <button onClick={handleLogout} style={{ background: "#ff4d4d", color: "#fff", border: "none", padding: "6px 12px", borderRadius: 6, cursor: "pointer" }}>Logout</button>
            </div>
          )}
        </nav>
      </header>

      {/* Features centered */}
      <section style={{ textAlign: "center", margin: "40px 16px 40px" }}>
        <h2 style={{ fontSize: "1.8rem", color: "#0d1f4c", marginBottom: 20 }}>✨ Features</h2>
      </section>

      {/* Flows + features alignment */}
      <section style={{ display: "flex", justifyContent: "space-between", maxWidth: 1300, margin: "0 auto", padding: "0 16px", gap: 20, alignItems: "flex-start" }}>
        
        {/* Personal Flow */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "25%" }}>
          <h2 style={{ color: "#1f6feb", marginBottom: 16 }}>Personal Flow</h2>
          {personalSteps.map((step, idx) => (
            <p key={idx} style={{ fontSize: 14, color: "#555", textAlign: "left", marginBottom: 8 }}>{step.icon} {step.desc}</p>
          ))}
        </div>

        {/* Central Features text (already above) */}
        <div style={{ width: "50%" }}></div>

        {/* Pro Flow */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "25%" }}>
          <h2 style={{ color: "#0ea5a0", marginBottom: 16 }}>Pro Flow</h2>
          {proSteps.map((step, idx) => (
            <p key={idx} style={{ fontSize: 14, color: "#555", textAlign: "left", marginBottom: 8 }}>{step.icon} {step.desc}</p>
          ))}
        </div>
      </section>

      {/* Buttons Personal / Pro Mode */}
      <section style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 32 }}>
        <Link href="/personal">
          <button style={{ padding: "16px 40px", borderRadius: 16, border: "none", cursor: "pointer", background: "#ff6b61", color: "#fff", fontWeight: 700, fontSize: "1.1rem", transition: "0.3s" }}
            onMouseEnter={e => e.currentTarget.style.background = "#ff5045"}
            onMouseLeave={e => e.currentTarget.style.background = "#ff6b61"}
          >Personal Mode</button>
        </Link>
        <Link href="/pro">
          <button style={{ padding: "16px 40px", borderRadius: 16, border: "none", cursor: "pointer", background: "#1f6feb", color: "#fff", fontWeight: 700, fontSize: "1.1rem", transition: "0.3s" }}
            onMouseEnter={e => e.currentTarget.style.background = "#155ccc"}
            onMouseLeave={e => e.currentTarget.style.background = "#1f6feb"}
          >Pro Mode</button>
        </Link>
      </section>

      {/* Dashboard Image */}
      <section style={{ textAlign: "center", marginTop: 40 }}>
        <Image src="/images/dashboard.png" alt="Dashboard Example" width={350} height={220} style={{ borderRadius: 16 }} />
      </section>

      {/* Social Logos */}
      <section style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 16 }}>
        {["fb", "tiktok", "wa", "in", "mail"].map((icon, idx) => (
          <a key={idx} href="#" target="_blank" rel="noopener noreferrer">
            <Image src={`/images/${icon}.png`} alt={icon} width={32} height={32} style={{ cursor: "pointer", transition: "transform 0.3s" }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.2)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            />
          </a>
        ))}
      </section>

      {/* Footer */}
      <footer style={{ textAlign: "center", padding: 24, borderTop: "1px solid #ccc", fontSize: 13, color: "#555", marginTop: 40 }}>
        © 2025 Fintrack. All rights reserved. | <Link href="/privacy">Privacy Policy</Link> | <Link href="/terms">Terms of Service</Link>
      </footer>

    </div>
  );
}
