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

const cardStyle = (flowType) => ({
  borderRadius: 16,
  padding: "16px",
  marginBottom: 24,
  width: 220,
  textAlign: "center",
  cursor: "pointer",
  backgroundColor: "#f9f9f9",
  transition: "all 0.3s ease",
  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
});

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
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
          maxWidth: 1400,
          margin: "0 auto",
          padding: "0 20px",
        }}
      >
        {/* Personal Flow */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h2 style={{ color: "#1f6feb", marginBottom: 10 }}>Personal Flow</h2>
          {personalSteps.map((item, index) => (
            <div
              key={index}
              style={cardStyle("personal")}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#eef4ff")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#f9f9f9")}
            >
              <div style={{ fontSize: 32, marginBottom: 6 }}>{item.icon}</div>
              <h3 style={{ marginBottom: 6 }}>{item.title}</h3>
              <p style={{ fontSize: 13, color: "#555" }}>{item.desc}</p>
              {index < personalSteps.length - 1 && <div style={{ fontSize: 20, color: "#1f6feb" }}>→</div>}
            </div>
          ))}
        </div>

        {/* Features Centered on Specific Line */}
        <div style={{ flexDirection: "column", textAlign: "center", marginTop: 30 }}>
          <p style={{ fontSize: 16, fontWeight: 500, margin: 0, color: "#0d1f4c" }}>
            📊 Visualize your financial health with charts
          </p>

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

          {/* Dashboard */}
          <div style={{ marginTop: 30 }}>
            <Image
              src="/images/dashboard.png"
              alt="Dashboard Example"
              width={400}
              height={250}
              style={{ borderRadius: 16 }}
            />
          </div>

          {/* Social Logos */}
          <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 20 }}>
            {["fb", "tiktok", "wa", "in", "mail"].map((icon, idx) => (
              <a key={idx} href="#" target="_blank" rel="noopener noreferrer">
                <Image
                  src={`/images/${icon}.png`}
                  alt={icon}
                  width={30}
                  height={30}
                  style={{ cursor: "pointer", transition: "transform 0.3s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
              </a>
            ))}
          </div>
        </div>

        {/* Pro Flow */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h2 style={{ color: "#0ea5a0", marginBottom: 10 }}>Pro Flow</h2>
          {proSteps.map((item, index) => (
            <div
              key={index}
              style={cardStyle("pro")}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#e6fffa")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#f9f9f9")}
            >
              <div style={{ fontSize: 32, marginBottom: 6 }}>{item.icon}</div>
              <h3 style={{ marginBottom: 6 }}>{item.title}</h3>
              <p style={{ fontSize: 13, color: "#555" }}>{item.desc}</p>
              {index < proSteps.length - 1 && <div style={{ fontSize: 20, color: "#0ea5a0" }}>→</div>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
