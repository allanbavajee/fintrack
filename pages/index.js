/* pages/index.jsx */
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
    transition: "opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease",
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
    <div style={{ minHeight: "100vh", background: "#f2f5f8", fontFamily: "Inter, Arial, sans-serif" }}>
      {/* Main Layout */}
      <div style={{ display: "flex", justifyContent: "space-between", maxWidth: 1300, margin: "48px auto", gap: 48 }}>
        
        {/* Personal Flow (Left) */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h2 style={{ color: "#1f6feb", marginBottom: 16, textAlign: "center" }}>Personal Flow</h2>
          {personalSteps.map((item, index) => (
            <div key={index} style={{ position: "relative" }}>
              <div
                style={cardStyle}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 12px 28px rgba(0,0,0,0.15)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ fontSize: 36, marginBottom: 6 }}>{item.icon}</div>
                <h3>{item.title}</h3>
                <p style={{ fontSize: 13, color: "#555" }}>{item.desc}</p>
                <p style={{ fontSize: 12, color: "#333", marginTop: 4 }}>{item.extra}</p>
              </div>
              {index < personalSteps.length - 1 && arrowSVG}
            </div>
          ))}
        </div>

        {/* Center - Buttons + Features + Dashboard */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", maxWidth: 400 }}>
          <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
            <Link href="/personal"><button style={{ padding:"14px 32px", borderRadius:12, border:"none", cursor:"pointer", background:"linear-gradient(45deg, #1f6feb, #0ea5a0)", color:"#fff", fontWeight:700 }}>Personal Mode</button></Link>
            <Link href="/pro"><button style={{ padding:"14px 32px", borderRadius:12, border:"none", cursor:"pointer", background:"linear-gradient(45deg, #0ea5a0, #1f6feb)", color:"#fff", fontWeight:700 }}>Pro Mode</button></Link>
          </div>

          <div style={{ textAlign: "center", color: "#444", marginBottom: 24 }}>
            <h2 style={{ fontSize: "1.25rem", marginBottom: 12 }}>✨ Features</h2>
            <ul style={{ listStyle: "none", paddingLeft: 0, lineHeight: 1.6 }}>
              <li>💰 Track your personal income, expenses and savings</li>
              <li>📊 Visualize your financial health with charts</li>
              <li>📝 Create and manage clients, quotes and invoices</li>
              <li>🔔 Receive weekly tips to improve your finances</li>
              <li>🔒 Secure and personalized experience with login</li>
            </ul>
          </div>

          <div style={{ marginTop: 16 }}>
            <Image src="/images/dash.png" alt="Dashboard Example" width={350} height={200} style={{ borderRadius: 16 }} />
          </div>
        </div>

        {/* Pro Flow (Right) */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h2 style={{ color: "#0ea5a0", marginBottom: 16, textAlign: "center" }}>Pro Flow</h2>
          {proSteps.map((item, index) => (
            <div key={index} style={{ position: "relative" }}>
              <div
                style={cardStyle}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 12px 28px rgba(0,0,0,0.15)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ fontSize: 36, marginBottom: 6 }}>{item.icon}</div>
                <h3>{item.title}</h3>
                <p style={{ fontSize: 13, color: "#555" }}>{item.desc}</p>
                <p style={{ fontSize: 12, color: "#333", marginTop: 4 }}>{item.extra}</p>
              </div>
              {index < proSteps.length - 1 && arrowSVG}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer style={{ marginTop: 48, textAlign: "center", padding: 16, borderTop: "1px solid #ccc", fontSize: 13, color: "#555" }}>
        © 2025 Fintrack. All rights reserved. | <Link href="/privacy">Privacy Policy</Link> | <Link href="/contact">Contact</Link>
      </footer>
    </div>
  );
}
