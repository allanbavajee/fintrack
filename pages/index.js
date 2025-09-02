/* pages/index.jsx */
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const personalSteps = [
    {
      step: 1,
      title: "Income",
      icon: "💼",
      desc: "Track all your revenue sources like salary or freelance work.",
      extra: "💵 Salary | 🖥 Freelance | 📈 Investments",
      color: "#cce5ff",
    },
    {
      step: 2,
      title: "Expenses",
      icon: "🛒",
      desc: "Record all monthly expenses: rent, groceries, leisure.",
      extra: "🏠 Rent | 🍔 Food | 🎮 Leisure",
      color: "#b3ffd9",
    },
    {
      step: 3,
      title: "Savings",
      icon: "🏦",
      desc: "Set aside a percentage of your income for savings.",
      extra: "💰 Bank | 🏠 Emergency Fund | 🎯 Goals",
      color: "#fff3b3",
    },
  ];

  const proSteps = [
    {
      step: 1,
      title: "Clients",
      icon: "👤",
      desc: "Create and manage client profiles with full info.",
      extra: "📝 Details | 📞 Contact | 🏢 Company",
      color: "#ffe0b3",
    },
    {
      step: 2,
      title: "Quotation",
      icon: "📝",
      desc: "Generate quotes for clients easily and quickly.",
      extra: "📊 Price | 🗓 Validity | ✏️ Notes",
      color: "#d9b3ff",
    },
    {
      step: 3,
      title: "Invoice",
      icon: "📄",
      desc: "Convert quotes into invoices and track payments.",
      extra: "💳 Payment | 📅 Due Date | 🧾 Status",
      color: "#ffb3b3",
    },
  ];

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const cardStyle = (bg) => ({
    background: bg,
    borderRadius: 16,
    padding: "16px",
    marginBottom: 24,
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
    maxWidth: 200,
    textAlign: "center",
    position: "relative",
    opacity: animate ? 1 : 0,
    transform: animate ? "translateY(0)" : "translateY(20px)",
    transition: "opacity 0.6s ease, transform 0.6s ease",
  });

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
      <style>{`
        @keyframes arrowAnim {
          0% { transform: translateY(0); }
          100% { transform: translateY(6px); }
        }
      `}</style>
    </svg>
  );

  return (
    <div style={{ minHeight: "100vh", padding: 24, background: "#f9f9f9", fontFamily: "Inter, Arial, sans-serif" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <h1 style={{ fontSize: "3rem", marginBottom: 12 }}>Welcome to Fintrack 🚀</h1>
        <p style={{ fontSize: "1.1rem", color: "#555" }}>
          Manage your personal and professional finances easily. Choose your mode below:
        </p>
      </div>

      {/* Main Layout */}
      <div style={{ display: "flex", justifyContent: "center", maxWidth: 1200, margin: "0 auto", gap: 48 }}>
        {/* Personal Flow (Left) */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h2 style={{ color: "#1f6feb", marginBottom: 24 }}>Personal Flow</h2>
          {personalSteps.map((item, index) => (
            <div key={item.step} style={{ position: "relative" }}>
              <div style={cardStyle(item.color)}>
                <div style={{ fontSize: 36, marginBottom: 8 }}>{item.icon}</div>
                <h3 style={{ marginBottom: 6 }}>{item.title}</h3>
                <p style={{ fontSize: 14, color: "#555" }}>{item.desc}</p>
                <p style={{ fontSize: 12, color: "#333", marginTop: 6 }}>{item.extra}</p>
              </div>
              {index < personalSteps.length - 1 && arrowSVG}
            </div>
          ))}
        </div>

        {/* Center - Buttons + Features */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", maxWidth: 360 }}>
          <div style={{ display: "flex", gap: 16, marginBottom: 32 }}>
            <Link href="/personal">
              <button style={{ padding: "12px 28px", borderRadius: 10, border: "none", cursor: "pointer", backgroundColor: "#1f6feb", color: "#fff", fontWeight: 700 }}>Personal Mode</button>
            </Link>
            <Link href="/pro">
              <button style={{ padding: "12px 28px", borderRadius: 10, border: "none", cursor: "pointer", backgroundColor: "#0ea5a0", color: "#fff", fontWeight: 700 }}>Pro Mode</button>
            </Link>
          </div>

          <div style={{ textAlign: "center", color: "#444" }}>
            <h2 style={{ fontSize: "1.25rem", marginBottom: 12 }}>✨ Features</h2>
            <ul style={{ listStyle: "none", paddingLeft: 0, lineHeight: 1.9, fontSize: "1.03rem" }}>
              <li>💰 Track your personal income, expenses and savings</li>
              <li>📊 Visualize your financial health with charts</li>
              <li>📝 Create and manage clients, quotes and invoices</li>
              <li>🔔 Receive weekly tips to improve your finances</li>
              <li>🔒 Secure and personalized experience with login</li>
            </ul>
          </div>
        </div>

        {/* Pro Flow (Right) */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h2 style={{ color: "#0ea5a0", marginBottom: 24 }}>Pro Flow</h2>
          {proSteps.map((item, index) => (
            <div key={item.step} style={{ position: "relative" }}>
              <div style={cardStyle(item.color)}>
                <div style={{ fontSize: 36, marginBottom: 8 }}>{item.icon}</div>
                <h3 style={{ marginBottom: 6 }}>{item.title}</h3>
                <p style={{ fontSize: 14, color: "#555" }}>{item.desc}</p>
                <p style={{ fontSize: 12, color: "#333", marginTop: 6 }}>{item.extra}</p>
              </div>
              {index < proSteps.length - 1 && arrowSVG}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
