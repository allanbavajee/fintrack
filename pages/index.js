/* pages/index.js */
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { supabase } from "../lib/supabaseClient";

/* DATA */
const personalSteps = [
  { title: "Income", icon: "💼", desc: "Track revenue sources like salary, freelance, investments." },
  { title: "Expenses", icon: "🛒", desc: "Record monthly expenses: rent, groceries, subscriptions." },
  { title: "Savings", icon: "🏦", desc: "Save part of your income for goals & emergencies." },
];

const proSteps = [
  { title: "Clients", icon: "👤", desc: "Manage client profiles with contact & notes." },
  { title: "Quotation", icon: "📝", desc: "Generate professional quotations quickly." },
  { title: "Invoice", icon: "📄", desc: "Convert quotes into invoices & track payments." },
];

const featuresList = [
  "💰 Track your personal income, expenses and savings",
  "📊 Visualize your financial health with charts",
  "📝 Create and manage clients, quotes and invoices",
  "🔔 Receive weekly tips to improve your finances",
  "🔒 Secure and personalized experience with login",
];

const cardStyle = {
  borderRadius: 16,
  padding: "16px",
  marginBottom: 24,
  width: 220,
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
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) =>
      setSession(session)
    );
    return () => authListener.subscription.unsubscribe();
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", fontFamily: "Inter, Arial, sans-serif" }}>
      <Header />

      {/* Welcome Section */}
      <section style={{ maxWidth: 1000, margin: "40px auto", textAlign: "center" }}>
        <h2 style={{ fontSize: "2.2rem", marginBottom: 16, color: "#0d1f4c" }}>Welcome to Fintrack</h2>
        <p style={{ fontSize: "1.1rem", color: "#555", lineHeight: 1.8 }}>
          Manage your personal and professional finances effortlessly. Track your income, expenses,
          savings, clients, quotations, and invoices all in one place.
        </p>
      </section>

      {/* Features & Flows */}
<section
  style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: 40,
    alignItems: "flex-start",
    maxWidth: 1400,
    margin: "40px auto",
    padding: "0 20px",
  }}
>
  {/* Personal Flow */}
  <div style={{ textAlign: "center" }}>
    <h2 style={{ color: "#1f6feb", marginBottom: 20 }}>Personal Flow</h2>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {personalSteps.map((item, index) => (
        <div key={index} style={{ position: "relative", width: "100%" }}>
          <div
            style={{
              ...cardStyle,
              margin: "0 auto 24px",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#dce9ff")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#f9f9f9")}
          >
            <div style={{ fontSize: 32, marginBottom: 6 }}>{item.icon}</div>
            <h3 style={{ marginBottom: 6 }}>{item.title}</h3>
            <p style={{ fontSize: 13, color: "#555" }}>{item.desc}</p>
          </div>
          {/* Flèche entre étapes sauf dernière */}
          {index < personalSteps.length - 1 && (
            <div style={{ textAlign: "center", marginBottom: 24, color: "#1f6feb", fontSize: 20 }}>
              ↓
            </div>
          )}
        </div>
      ))}
    </div>
  </div>

  {/* Features */}
  <div style={{ textAlign: "center" }}>
    <h2 style={{ fontSize: "1.6rem", marginBottom: 20, color: "#0d1f4c" }}>✨ Features</h2>
    {featuresList.map((feat, idx) => (
      <p key={idx} style={{ color: "#555", margin: "10px 0" }}>
        {feat}
      </p>
    ))}

    {/* Buttons Flow */}
    <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 24 }}>
      <Link href="/personal">
        <button
          style={{
            padding: "14px 32px",
            borderRadius: 16,
            border: "none",
            cursor: "pointer",
            background: "#ff6b61",
            color: "#fff",
            fontWeight: 700,
            fontSize: "1rem",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#ff5045")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#ff6b61")}
        >
          Personal Mode
        </button>
      </Link>
      <Link href="/pro">
        <button
          style={{
            padding: "14px 32px",
            borderRadius: 16,
            border: "none",
            cursor: "pointer",
            background: "#1f6feb",
            color: "#fff",
            fontWeight: 700,
            fontSize: "1rem",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#155ccc")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#1f6feb")}
        >
          Pro Mode
        </button>
      </Link>
    </div>

    {/* Dashboard right under buttons */}
    <div style={{ marginTop: 30 }}>
      <Image
        src="/images/dashboard.png"
        alt="Dashboard Example"
        width={380}
        height={230}
        style={{ borderRadius: 16 }}
      />
    </div>
  </div>

  {/* Pro Flow */}
  <div style={{ textAlign: "center" }}>
    <h2 style={{ color: "#0ea5a0", marginBottom: 20 }}>Pro Flow</h2>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {proSteps.map((item, index) => (
        <div key={index} style={{ position: "relative", width: "100%" }}>
          <div
            style={{
              ...cardStyle,
              margin: "0 auto 24px",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#ccf7f2")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#f9f9f9")}
          >
            <div style={{ fontSize: 32, marginBottom: 6 }}>{item.icon}</div>
            <h3 style={{ marginBottom: 6 }}>{item.title}</h3>
            <p style={{ fontSize: 13, color: "#555" }}>{item.desc}</p>
          </div>
          {/* Flèche entre étapes sauf dernière */}
          {index < proSteps.length - 1 && (
            <div style={{ textAlign: "center", marginBottom: 24, color: "#0ea5a0", fontSize: 20 }}>
              ↓
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
</section>


      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          padding: 24,
          borderTop: "1px solid #ccc",
          fontSize: 13,
          color: "#555",
          marginTop: 40,
        }}
      >
        © 2025 Fintrack. All rights reserved. | <Link href="/privacy">Privacy Policy</Link> |{" "}
        <Link href="/terms">Terms of Service</Link>
      </footer>
    </div>
  );
}
