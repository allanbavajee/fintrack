/* pages/index.js */
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

/* DATA */
const personalSteps = [
  { title: "Income", icon: "💼", desc: "Track all your revenue sources like salary, freelance or passive income." },
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
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 32px",
          background: "#fff",
          boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Image
            src="/images/fintrack.logo.png"
            alt="Fintrack Logo"
            width={140}
            height={50}
          />
          <span style={{ fontSize: 14, color: "#555" }}>Your money, your way.</span>
        </div>

        {/* Menu */}
        <nav style={{ display: "flex", gap: 24, alignItems: "center", fontWeight: 500, color: "#0d1f4c" }}>
          <Link href="/" style={{ textDecoration: "none", cursor: "pointer", transition: "color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.color = "#1f6feb"}
            onMouseLeave={e => e.currentTarget.style.color = "#0d1f4c"}>Home</Link>
          <Link href="/about-us" style={{ textDecoration: "none", cursor: "pointer", transition: "color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.color = "#1f6feb"}
            onMouseLeave={e => e.currentTarget.style.color = "#0d1f4c"}>About Us</Link>
          <Link href="/contact" style={{ textDecoration: "none", cursor: "pointer", transition: "color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.color = "#1f6feb"}
            onMouseLeave={e => e.currentTarget.style.color = "#0d1f4c"}>Contact Us</Link>
          <Link href="/services" style={{ textDecoration: "none", cursor: "pointer", transition: "color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.color = "#1f6feb"}
            onMouseLeave={e => e.currentTarget.style.color = "#0d1f4c"}>Services</Link>
          <Link href="/auth" style={{ textDecoration: "none", cursor: "pointer", transition: "color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.color = "#1f6feb"}
            onMouseLeave={e => e.currentTarget.style.color = "#0d1f4c"}>Login | Signup</Link>
        </nav>
      </header>

      {/* Welcome Section */}
      <section style={{ maxWidth: 1000, margin: "60px auto 40px", textAlign: "center" }}>
        <h2 style={{ fontSize: "2.2rem", marginBottom: 16, color: "#0d1f4c" }}>Welcome to Fintrack</h2>
        <p style={{ fontSize: "1.1rem", color: "#555", lineHeight: 1.8 }}>
          Manage your personal and professional finances effortlessly. Track your income, expenses, savings, clients, quotations, and invoices all in one place.
        </p>
      </section>

      {/* Main Content */}
      <section style={{ display: "flex", flexDirection: "column", alignItems: "center", maxWidth: 1300, margin: "0 auto", padding: "0 16px" }}>
        {/* Features */}
        <h2 style={{ fontSize: "1.5rem", marginBottom: 24, color: "#0d1f4c" }}>✨ Features</h2>

        {/* Flows + Features list */}
        <div style={{ display: "flex", justifyContent: "space-between", width: "100%", gap: 16, alignItems: "flex-start" }}>
          
          {/* Personal Flow */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "30%" }}>
            <h3 style={{ color: "#1f6feb", marginBottom: 16 }}>Personal Flow</h3>
            {personalSteps.map((item, index) => (
              <p key={index} style={{ fontSize: 14, color: "#555", margin: 4, whiteSpace: "nowrap" }}>
                {item.icon} {item.desc}
              </p>
            ))}
          </div>

          {/* Features List Center */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "35%" }}>
            <ul style={{ listStyle: "none", paddingLeft: 0, lineHeight: 2, textAlign: "center", marginBottom: 24 }}>
              <li>💰 Track your personal income, expenses and savings</li>
              <li>📊 Visualize your financial health with charts</li>
              <li>📝 Create and manage clients, quotes and invoices</li>
              <li>🔔 Receive weekly tips to improve your finances</li>
              <li>🔒 Secure and personalized experience with login</li>
            </ul>

            {/* Flow Buttons */}
            <div style={{ display: "flex", justifyContent: "center", gap: 20, marginBottom: 24 }}>
              <button style={{ padding: "12px 32px", borderRadius: 16, border: "none", background: "#ff6b61", color: "#fff", fontWeight: 700, cursor: "pointer" }}>
                Personal Mode
              </button>
              <button style={{ padding: "12px 32px", borderRadius: 16, border: "none", background: "#1f6feb", color: "#fff", fontWeight: 700, cursor: "pointer" }}>
                Pro Mode
              </button>
            </div>

            {/* Dashboard */}
            <Image src="/images/dashboard.png" alt="Dashboard Example" width={350} height={220} style={{ borderRadius: 16 }} />

            {/* Social Icons */}
            <div style={{ display: "flex", gap: 16, marginTop: 16 }}>
              <Image src="/images/facebook.png" alt="Facebook" width={32} height={32} />
              <Image src="/images/twitter.png" alt="Twitter" width={32} height={32} />
              <Image src="/images/linkedin.png" alt="LinkedIn" width={32} height={32} />
            </div>
          </div>

          {/* Pro Flow */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "30%" }}>
            <h3 style={{ color: "#0ea5a0", marginBottom: 16 }}>Pro Flow</h3>
            {proSteps.map((item, index) => (
              <p key={index} style={{ fontSize: 14, color: "#555", margin: 4, whiteSpace: "nowrap" }}>
                {item.icon} {item.desc}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ textAlign: "center", padding: 24, borderTop: "1px solid #ccc", fontSize: 13, color: "#555" }}>
        © 2025 Fintrack. All rights reserved. | <Link href="/privacy">Privacy Policy</Link> | <Link href="/terms">Terms of Service</Link>
      </footer>
    </div>
  );
}
