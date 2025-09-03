import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const personalSteps = [
    { title: "Income", icon: "💼", desc: "Track all your revenue sources like salary, freelance or passive income.", extra: "💵 Salary | 🖥 Freelance | 📈 Investments" },
    { title: "Expenses", icon: "🛒", desc: "Record all monthly expenses: rent, groceries, subscriptions, leisure activities.", extra: "🏠 Rent | 🍔 Food | 🎮 Leisure | 🎟 Subscriptions" },
    { title: "Savings", icon: "🏦", desc: "Set aside a percentage of your income for savings and emergency funds.", extra: "💰 Bank | 🏠 Emergency Fund | 🎯 Goals" },
  ];

  const proSteps = [
    { title: "Clients", icon: "👤", desc: "Create and manage client profiles including contacts, company info, and notes.", extra: "📝 Details | 📞 Contact | 🏢 Company" },
    { title: "Quotation", icon: "📝", desc: "Generate professional quotations for clients quickly and easily.", extra: "📊 Price | 🗓 Validity | ✏️ Notes" },
    { title: "Invoice", icon: "📄", desc: "Convert quotes into invoices, track payments, and manage billing efficiently.", extra: "💳 Payment | 📅 Due Date | 🧾 Status" },
  ];

  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const cardStyle = {
    borderRadius: 16,
    padding: "16px",
    marginBottom: 16,
    maxWidth: 220,
    textAlign: "center",
    opacity: animate ? 1 : 0,
    transform: animate ? "translateY(0)" : "translateY(20px)",
    transition: "opacity 0.6s ease, transform 0.6s ease, boxShadow 0.3s ease",
    cursor: "pointer",
    backgroundColor: "transparent",
  };

  const arrowSVG = (
    <svg
      width="20"
      height="40"
      viewBox="0 0 20 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ margin: "0 auto", display: "block", animation: animate ? "arrowAnim 1s infinite alternate" : "none" }}
    >
      <path d="M10 0 V30 M10 30 L5 25 M10 30 L15 25" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <style>{`@keyframes arrowAnim { 0% { transform: translateY(0); } 100% { transform: translateY(6px); } }`}</style>
    </svg>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#fff", fontFamily: "Inter, Arial, sans-serif", paddingTop: 24 }}>
      {/* Welcome */}
      <div style={{ textAlign: "center", marginTop: 64, maxWidth: 800, marginLeft: "auto", marginRight: "auto" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: 16 }}>Welcome to Fintrack</h1>
        <p style={{ fontSize: "1rem", color: "#444", lineHeight: 1.6 }}>
          Manage your personal and professional finances effortlessly. Track your income, expenses, savings, clients, quotations, and invoices all in one place. Simplify your financial life, gain clarity, and make smarter decisions every day with Fintrack.
        </p>
      </div>

      {/* Boutons Personal / Pro */}
      <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 32 }}>
        <Link href="/personal">
          <button style={{ padding: "14px 32px", borderRadius: 12, border: "none", cursor: "pointer", background: "linear-gradient(45deg, #1f6feb, #0ea5a0)", color: "#fff", fontWeight: 700 }}>
            Personal Mode
          </button>
        </Link>
        <Link href="/pro">
          <button style={{ padding: "14px 32px", borderRadius: 12, border: "none", cursor: "pointer", background: "linear-gradient(45deg, #0ea5a0, #1f6feb)", color: "#fff", fontWeight: 700 }}>
            Pro Mode
          </button>
        </Link>
      </div>

      {/* Features */}
      <div style={{ textAlign: "center", marginTop: 48 }}>
        <h2 style={{ fontSize: "1.25rem", marginBottom: 12 }}>✨ Features</h2>
        <ul style={{ listStyle: "none", paddingLeft: 0, lineHeight: 1.6 }}>
          <li>💰 Track your personal income, expenses and savings</li>
          <li>📊 Visualize your financial health with charts</li>
          <li>📝 Create and manage clients, quotes and invoices</li>
          <li>🔔 Receive weekly tips to improve your finances</li>
          <li>🔒 Secure and personalized experience with login</li>
        </ul>
      </div>

      {/* Dashboard Image */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 32 }}>
        <Image src="/images/fintrack.logo.png" alt="Dashboard Example" width={350} height={200} style={{ borderRadius: 16 }} />
      </div>

      {/* Réseaux sociaux */}
      <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 32 }}>
        <Image src="/images/facebook.png" alt="Facebook" width={32} height={32} />
        <Image src="/images/tiktok.png" alt="TikTok" width={32} height={32} />
        <Image src="/images/whatsapp.png" alt="WhatsApp" width={32} height={32} />
        <Image src="/images/linkedin.png" alt="LinkedIn" width={32} height={32} />
      </div>

      {/* Personal / Pro Flow */}
      <div style={{ display: "flex", justifyContent: "space-between", maxWidth: 1300, margin: "48px
