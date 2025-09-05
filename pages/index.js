/* pages/index.js */
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

/* DATA */
const personalSteps = [
  { title: "Income", icon: "💼", desc: "Track all your revenue sources like salary, freelance or passive income.", extra: "Salary | Freelance | Investments" },
  { title: "Expenses", icon: "🛒", desc: "Record all monthly expenses: rent, groceries, subscriptions, leisure activities.", extra: "Rent | Food | Leisure | Subscriptions" },
  { title: "Savings", icon: "🏦", desc: "Set aside a percentage of your income for savings and emergency funds.", extra: "Bank | Emergency Fund | Goals" },
];

const proSteps = [
  { title: "Clients", icon: "👤", desc: "Create and manage client profiles including contacts, company info, and notes.", extra: "Details | Contact | Company" },
  { title: "Quotation", icon: "📝", desc: "Generate professional quotations for clients quickly and easily.", extra: "Price | Validity | Notes" },
  { title: "Invoice", icon: "📄", desc: "Convert quotes into invoices, track payments, and manage billing efficiently.", extra: "Payment | Due Date | Status" },
];

const featuresList = [
  "💰 Track your personal income, expenses and savings",
  "📊 Visualize your financial health with charts",
  "📝 Create and manage clients, quotes and invoices",
  "🔔 Receive weekly tips to improve your finances",
  "🔒 Secure and personalized experience with login"
];

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

const arrowSVG = (
  <svg width="20" height="40" viewBox="0 0 20 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ margin: "0 auto", display: "block" }}>
    <path d="M10 0 V30 M10 30 L5 25 M10 30 L15 25" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

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

        {/* Menu top right */}
        <nav style={{ display: "flex", gap: 20, alignItems: "center", fontWeight: 500 }}>
          {["Home", "About Us", "Contact Us", "Services", "Login", "Signup"].map((item, idx) => (
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
        </nav>
      </header>

      {/* Welcome Section */}
      <section style={{ maxWidth: 1000, margin: "40px auto 40px", textAlign: "center" }}>
        <h2 style={{ fontSize: "2.2rem", marginBottom: 16, color: "#0d1f4c" }}>Welcome to Fintrack</h2>
        <p style={{ fontSize: "1.1rem", color: "#555", lineHeight: 1.8 }}>
          Manage your personal and professional finances effortlessly. Track your income, expenses, savings, clients, quotations, and invoices all in one place.
        </p>
      </section>

      {/* Features & Flows Section */}
      <section style={{ display: "flex", justifyContent: "center", gap: 40, maxWidth: 1400, margin: "0 auto", padding: "0 16px" }}>

        {/* Personal Flow */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "25%", marginTop: 20 }}>
          <h2 style={{ color: "#1f6feb", marginBottom: 24 }}>Personal Flow</h2>
          {personalSteps.map((item, index) => (
            <div key={index} style={{ position: "relative" }}>
              <div style={cardStyle}>
                <div style={{ fontSize: 36, marginBottom: 8 }}>{item.icon}</div>
                <h3>{item.title}</h3>
                <p style={{ fontSize: 13, color: "#555" }}>{item.desc}</p>
                <p style={{ fontSize: 12, color: "#333", marginTop: 6 }}>{item.extra}</p>
              </div>
              {index < personalSteps.length - 1 && arrowSVG}
            </div>
          ))}
        </div>

        {/* Features */}
        <div style={{ width: "40%", textAlign: "center", marginTop: 0 }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: 20, color: "#0d1f4c" }}>✨ Features</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {featuresList.map((feat, idx) => (
              <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ width: "25%", textAlign: "left", color: "#1f6feb" }}>{idx === 0 ? " " : ""}</div>
                <p style={{ width: "50%", margin: 0, color: "#555" }}>{feat}</p>
                <div style={{ width: "25%", textAlign: "right", color: "#0ea5a0" }}>{idx === 0 ? " " : ""}</div>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 32 }}>
            <Link href="/personal">
              <button style={{ padding: "16px 40px", borderRadius: 16, border: "none", cursor: "pointer", background: "#ff6b61", color: "#fff", fontWeight: 700, fontSize: "1.1rem" }}
                onMouseEnter={e => e.currentTarget.style.background = "#ff5045"} onMouseLeave={e => e.currentTarget.style.background = "#ff6b61"}>Personal Mode</button>
            </Link>
            <Link href="/pro">
              <button style={{ padding: "16px 40px", borderRadius: 16, border: "none", cursor: "pointer", background: "#1f6feb", color: "#fff", fontWeight: 700, fontSize: "1.1rem" }}
                onMouseEnter={e => e.currentTarget.style.background = "#155ccc"} onMouseLeave={e => e.currentTarget.style.background = "#1f6feb"}>Pro Mode</button>
            </Link>
          </div>
        </div>

        {/* Pro Flow */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "25%", marginTop: 20 }}>
          <h2 style={{ color: "#0ea5a0", marginBottom: 24 }}>Pro Flow</h2>
          {proSteps.map((item, index) => (
            <div key={index} style={{ position: "relative" }}>
              <div style={cardStyle}>
                <div style={{ fontSize: 36, marginBottom: 8 }}>{item.icon}</div>
                <h3>{item.title}</h3>
                <p style={{ fontSize: 13, color: "#555" }}>{item.desc}</p>
                <p style={{ fontSize: 12, color: "#333", marginTop: 6 }}>{item.extra}</p>
              </div>
              {index < proSteps.length - 1 && arrowSVG}
            </div>
          ))}
        </div>
      </section>

      {/* Dashboard */}
      <section style={{ textAlign: "center", marginTop: 40 }}>
        <Image src="/images/dashboard.png" alt="Dashboard Example" width={350} height={220} style={{ borderRadius: 16 }} />

        {/* Social Logos */}
        <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 16 }}>
          {["fb", "tiktok", "wa", "in", "mail"].map((icon, idx) => (
            <a key={idx} href="#" target="_blank" rel="noopener noreferrer">
              <Image src={`/images/${icon}.png`} alt={icon} width={32} height={32} style={{ cursor: "pointer", transition: "transform 0.3s" }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.2)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              />
            </a>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ textAlign: "center", padding: 24, borderTop: "1px solid #ccc", fontSize: 13, color: "#555", marginTop: 40 }}>
        © 2025 Fintrack. All rights reserved. | <Link href="/privacy">Privacy Policy</Link> | <Link href="/terms">Terms of Service</Link>
      </footer>
    </div>
  );
}
