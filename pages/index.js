/* pages/index.jsx */
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [showFlows, setShowFlows] = useState(false);

  // Animation fade-in
  useEffect(() => {
    setTimeout(() => setShowFlows(true), 300);
  }, []);

  const flowStyle = {
    transition: "all 0.8s ease",
    opacity: showFlows ? 1 : 0,
    transform: showFlows ? "translateY(0)" : "translateY(30px)",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "#ffffff",
        fontFamily: "Inter, Arial, sans-serif",
        color: "#222",
        padding: "24px",
      }}
    >
      {/* Header */}
      <h1 style={{ fontSize: "3rem", marginBottom: "12px", textAlign: "center" }}>
        Welcome to <span style={{ color: "#1f6feb" }}>Fintrack 🚀</span>
      </h1>
      <p style={{ fontSize: "1.08rem", color: "#444", maxWidth: 680, marginBottom: "26px", textAlign: "center" }}>
        Manage your personal and professional finances easily. Choose your mode below:
      </p>

      {/* Buttons */}
      <div style={{ display: "flex", gap: 18, marginBottom: 34 }}>
        <Link href="/personal">
          <button
            style={{
              padding: "12px 28px",
              fontSize: "1rem",
              borderRadius: 10,
              border: "none",
              cursor: "pointer",
              backgroundColor: "#dbeafe",
              color: "#1f6feb",
              fontWeight: 700,
              boxShadow: "0 6px 18px rgba(31,111,235,0.08)",
              transition: "transform .12s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            Personal Mode
          </button>
        </Link>

        <Link href="/pro">
          <button
            style={{
              padding: "12px 28px",
              fontSize: "1rem",
              borderRadius: 10,
              border: "none",
              cursor: "pointer",
              backgroundColor: "#d1fae5",
              color: "#0ea5a0",
              fontWeight: 700,
              boxShadow: "0 6px 18px rgba(14,165,160,0.08)",
              transition: "transform .12s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            Pro Mode
          </button>
        </Link>
      </div>

      {/* Main layout: flows left/right + features center */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          width: "100%",
          maxWidth: 1000,
          marginTop: 40,
        }}
      >
        {/* Personal Flow - Left */}
        <div style={{ flex: 1, ...flowStyle }}>
          <h3 style={{ textAlign: "center", fontWeight: 700, color: "#1f6feb", marginBottom: 20 }}>
            📌 Personal Flow
          </h3>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
            <div style={{ background: "#bfdbfe", padding: 16, borderRadius: 50, width: 80, height: 80, display: "flex", justifyContent: "center", alignItems: "center" }}>
              💵
            </div>
            <span>Income</span>
            <span style={{ fontSize: "1.5rem", color: "#60a5fa" }}>⬇️</span>
            <div style={{ background: "#fecaca", padding: 16, borderRadius: 50, width: 80, height: 80, display: "flex", justifyContent: "center", alignItems: "center" }}>
              💸
            </div>
            <span>Expenses</span>
            <span style={{ fontSize: "1.5rem", color: "#fca5a5" }}>⬇️</span>
            <div style={{ background: "#fef08a", padding: 16, borderRadius: 50, width: 80, height: 80, display: "flex", justifyContent: "center", alignItems: "center" }}>
              🏦
            </div>
            <span>Savings</span>
          </div>
        </div>

        {/* Features Center */}
        <div style={{ flex: 1, textAlign: "center", padding: "0 24px" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: 12 }}>✨ Features</h2>
          <ul style={{ listStyle: "none", padding: 0, lineHeight: 1.9, fontSize: "1rem" }}>
            <li>💰 Track your personal income, expenses and savings</li>
            <li>📊 Visualize your financial health with charts</li>
            <li>📝 Create and manage clients, quotes and invoices</li>
            <li>🔔 Receive weekly tips to improve your finances</li>
            <li>🔒 Secure and personalized experience with login</li>
          </ul>
        </div>

        {/* Pro Flow - Right */}
        <div style={{ flex: 1, ...flowStyle }}>
          <h3 style={{ textAlign: "center", fontWeight: 700, color: "#0ea5a0", marginBottom: 20 }}>
            📌 Pro Flow
          </h3>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
            <div style={{ background: "#d1fae5", padding: 16, borderRadius: 50, width: 80, height: 80, display: "flex", justifyContent: "center", alignItems: "center" }}>
              👥
            </div>
            <span>Create Client</span>
            <span style={{ fontSize: "1.5rem", color: "#34d399" }}>⬇️</span>
            <div style={{ background: "#fed7aa", padding: 16, borderRadius: 50, width: 80, height: 80, display: "flex", justifyContent: "center", alignItems: "center" }}>
              📝
            </div>
            <span>Quotation</span>
            <span style={{ fontSize: "1.5rem", color: "#fb923c" }}>⬇️</span>
            <div style={{ background: "#ddd6fe", padding: 16, borderRadius: 50, width: 80, height: 80, display: "flex", justifyContent: "center", alignItems: "center" }}>
              🧾
            </div>
            <span>Invoice</span>
          </div>
        </div>
      </div>
    </div>
  );
}
