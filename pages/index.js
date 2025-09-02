/* pages/index.jsx */
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const personalSteps = [
    {
      step: 1,
      title: "Income",
      icon: "💼",
      desc: "Track all your revenue sources like salary, freelance or passive income.",
      extra: "💵 Salary | 🖥 Freelance | 📈 Investments",
    },
    {
      step: 2,
      title: "Expenses",
      icon: "🛒",
      desc: "Record all monthly expenses: rent, groceries, subscriptions, leisure activities.",
      extra: "🏠 Rent | 🍔 Food | 🎮 Leisure | 🎟 Subscriptions",
    },
    {
      step: 3,
      title: "Savings",
      icon: "🏦",
      desc: "Set aside a percentage of your income for savings and emergency funds.",
      extra: "💰 Bank | 🏠 Emergency Fund | 🎯 Goals",
    },
  ];

  const proSteps = [
    {
      step: 1,
      title: "Clients",
      icon: "👤",
      desc: "Create and manage client profiles including contacts, company info, and notes.",
      extra: "📝 Details | 📞 Contact | 🏢 Company",
    },
    {
      step: 2,
      title: "Quotation",
      icon: "📝",
      desc: "Generate professional quotations for clients quickly and easily.",
      extra: "📊 Price | 🗓 Validity | ✏️ Notes",
    },
    {
      step: 3,
      title: "Invoice",
      icon: "📄",
      desc: "Convert quotes into invoices, track payments, and manage billing efficiently.",
      extra: "💳 Payment | 📅 Due Date | 🧾 Status",
    },
  ];

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const cardStyle = {
    borderRadius: 16,
    padding: "20px",
    marginBottom: 24,
    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
    maxWidth: 220,
    textAlign: "center",
    position: "relative",
    opacity: animate ? 1 : 0,
    transform: animate ? "translateY(0)" : "translateY(20px)",
    transition: "opacity 0.6s ease, transform 0.6s ease, transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
    backgroundColor: "transparent", // suppression du fond blanc
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
      <style>{`
        @keyframes arrowAnim {
          0% { transform: translateY(0); }
          100% { transform: translateY(6px); }
        }
      `}</style>
    </svg>
  );

  return (
    <div style={{ minHeight: "100vh", padding: 24, background: "#f2f5f8", fontFamily: "Inter, Arial, sans-serif" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <h1 style={{ fontSize: "3rem", marginBottom: 12 }}>Welcome to Fintrack 🚀</h1>
        <p style={{ fontSize: "1.15rem", color: "#555", maxWidth: 700, margin: "0 auto", lineHeight: 1.6 }}>
          Manage your personal and professional finances easily. Keep track of your income, expenses, savings, and for business, create clients, generate quotations and invoices—all in one secure platform. Improve your financial habits with weekly tips and interactive dashboards.
        </p>
      </div>

      {/* Main Layout */}
      <div style={{ display: "flex", justifyContent: "space-between", maxWidth: 1300, margin: "0 auto", gap: 48 }}>
        {/* Personal Flow (Left) */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginLeft: 0 }}>
          <h2 style={{ color: "#1f6feb", marginBottom: 24 }}>Personal Flow</h2>
          {personalSteps.map((item, index) => (
            <div
              key={item.step}
              style={{ position: "relative" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 12px 28px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.08)";
              }}
            >
              <div style={{ ...cardStyle }}>
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
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", maxWidth: 400 }}>
          <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
            <Link href="/personal">
              <button style={{
                padding: "14px 32px",
                borderRadius: 12,
                border: "none",
                cursor: "pointer",
                background: "linear-gradient(45deg, #1f6feb, #0ea5a0)",
                color: "#fff",
                fontWeight: 700,
                fontSize: "1.05rem",
                boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease"
              }}
              onMouseEnter={(e)=>{ e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 28px rgba(0,0,0,0.3)"; }}
              onMouseLeave={(e)=>{ e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.2)"; }}
              >Personal Mode</button>
            </Link>
            <Link href="/pro">
              <button style={{
                padding: "14px 32px",
                borderRadius: 12,
                border: "none",
                cursor: "pointer",
                background: "linear-gradient(45deg, #0ea5a0, #1f6feb)",
                color: "#fff",
                fontWeight: 700,
                fontSize: "1.05rem",
                boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease"
              }}
              onMouseEnter={(e)=>{ e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 28px rgba(0,0,0,0.3)"; }}
              onMouseLeave={(e)=>{ e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.2)"; }}
              >Pro Mode</button>
            </Link>
          </div>

          <div style={{ textAlign: "center", color: "#444", marginBottom: 36 }}>
            <h2 style={{ fontSize: "1.25rem", marginBottom: 12 }}>✨ Features</h2>
            <ul style={{ listStyle: "none", paddingLeft: 0, lineHeight: 1.7, fontSize: "1.03rem" }}>
              <li>💰 Track your personal income, expenses and savings</li>
              <li>📊 Visualize your financial health with charts</li>
              <li>📝 Create and manage clients, quotes and invoices</li>
              <li>🔔 Receive weekly tips to improve your finances</li>
              <li>🔒 Secure and personalized experience with login</li>
            </ul>
          </div>
        </div>

        {/* Pro Flow (Right) */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", marginRight: 0 }}>
          <h2 style={{ color: "#0ea5a0", marginBottom: 24 }}>Pro Flow</h2>
          {proSteps.map((item, index) => (
            <div
              key={item.step}
              style={{ position: "relative" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 12px 28px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.08)";
              }}
            >
              <div style={{ ...cardStyle }}>
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
