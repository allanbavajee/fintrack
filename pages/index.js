/* pages/index.js */
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

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
        <nav style={{ display: "flex", gap: 16, alignItems: "center", fontWeight: 500 }}>
          {["Home", "About Us", "Contact Us", "Services"].map((item, idx) => (
            <Link key={idx} href={`/${item.toLowerCase().replace(/\s/g, '-')}`}
              style={{
                textDecoration: "none",
                color: "#0d1f4c",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.color = "#ff6b61"; e.currentTarget.style.fontWeight = "bold"; e.currentTarget.style.textDecoration = "underline"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "#0d1f4c"; e.currentTarget.style.fontWeight = "500"; e.currentTarget.style.textDecoration = "none"; }}
            >
              {item}
            </Link>
          ))}
          <Link href="/auth"
            style={{ textDecoration: "none", color: "#0d1f4c", fontWeight: 600 }}
            onMouseEnter={e => e.currentTarget.style.color = "#ff6b61"}
            onMouseLeave={e => e.currentTarget.style.color = "#0d1f4c"}
          >
            Login|Signup
          </Link>
        </nav>
      </header>

      {/* Welcome Section */}
      <section style={{ maxWidth: 1000, margin: "40px auto 40px", textAlign: "center" }}>
        <h2 style={{ fontSize: "2.2rem", marginBottom: 16, color: "#0d1f4c" }}>Welcome to Fintrack</h2>
        <p style={{ fontSize: "1.1rem", color: "#555", lineHeight: 1.8 }}>
          Manage your personal and professional finances effortlessly. Track your income, expenses, savings, clients, quotations, and invoices all in one place.
        </p>
      </section>

      {/* Features + Flows Section */}
      <section style={{ maxWidth: 1400, margin: "0 auto", padding: "0 16px" }}>
        {/* Title */}
        <h2 style={{ textAlign: "center", fontSize: "1.5rem", marginBottom: 16, color: "#0d1f4c" }}>✨ Features</h2>

        {/* First Feature */}
        <p style={{ textAlign: "center", marginBottom: 40, whiteSpace: "nowrap", fontWeight: 500, color: "#555" }}>{featuresList[0]}</p>

        {/* Central Row: Personal Flow | Visualize | Pro Flow */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>

          {/* Personal Flow */}
          <div style={{ width: "25%", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h3 style={{ color: "#1f6feb", marginBottom: 16 }}>Personal Flow</h3>
            {personalSteps.map((step, idx) => (
              <div key={idx} style={{ ...cardStyle }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = "#e6f4ea"}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = "#f9f9f9"}
              >
                <div style={{ fontSize: 36, marginBottom: 8 }}>{step.icon}</div>
                <strong>{step.title}</strong>
                <p style={{ fontSize: 12, color: "#555" }}>{step.desc}</p>
                <p style={{ fontSize: 11, color: "#333", marginTop: 4 }}>{step.extra}</p>
              </div>
            ))}
          </div>

          {/* Center Feature */}
          <div style={{ width: "40%", textAlign: "center" }}>
            <p style={{ fontSize: "1.1rem", marginBottom: 24 }}>{featuresList[1]}</p>

            {/* Remaining features */}
            {featuresList.slice(2).map((feat, idx) => (
              <p key={idx} style={{ marginBottom: 8, color: "#555" }}>{feat}</p>
            ))}
          </div>

          {/* Pro Flow */}
          <div style={{ width: "25%", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h3 style={{ color: "#0ea5a0", marginBottom: 16 }}>Pro Flow</h3>
            {proSteps.map((step, idx) => (
              <div key={idx} style={{ ...cardStyle }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = "#e0f7f7"}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = "#f9f9f9"}
              >
                <div style={{ fontSize: 36, marginBottom: 8 }}>{step.icon}</div>
                <strong>{step.title}</strong>
                <p style={{ fontSize: 12, color: "#555" }}>{step.desc}</p>
                <p style={{ fontSize: 11, color: "#333", marginTop: 4 }}>{step.extra}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard */}
      <section style={{ textAlign: "center", marginTop: 24 }}>
        <Image src="/images/dashboard.png" alt="Dashboard Example" width={350} height={220} style={{ borderRadius: 16 }} />
      </section>

      {/* Footer */}
      <footer style={{ textAlign: "center", padding: 24, borderTop: "1px solid #ccc", fontSize: 13, color: "#555", marginTop: 40 }}>
        © 2025 Fintrack. All rights reserved. | <Link href="/privacy">Privacy Policy</Link> | <Link href="/terms">Terms of Service</Link>
      </footer>
    </div>
  );
}
