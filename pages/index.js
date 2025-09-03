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
    <div style={{ minHeight: "100vh", background: "#fff", fontFamily: "Inter, Arial, sans-serif", paddingTop: 48 }}>
      {/* Header with Login / Signup */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", maxWidth: 1300, margin: "0 auto", padding: "0 32px" }}>
        {/* Logo */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <Image src="/images/fintrack.logo.png" alt="Fintrack Logo" width={120} height={50} />
          <span style={{ marginTop: 4, fontSize: 14, color: "#555" }}>Your money, your way.</span>
        </div>

        {/* Menu */}
        <nav style={{ display: "flex", gap: 24, marginTop: 12 }}>
          <Link href="/">Home</Link>
          <Link href="/about">About Us</Link>
          <Link href="/contact">Contact Us</Link>
        </nav>

        {/* Login / Signup */}
        <div style={{ marginTop: 0 }}>
          <Link href="/login"><button style={{ marginRight: 8, padding: "8px 16px", borderRadius: 8, border: "none", background: "#1f6feb", color: "#fff", cursor: "pointer" }}>Login</button></Link>
          <Link href="/signup"><button style={{ padding: "8px 16px", borderRadius: 8, border: "none", background: "#0ea5a0", color: "#fff", cursor: "pointer" }}>Signup</button></Link>
        </div>
      </div>

      {/* Welcome & Description */}
      <div style={{ textAlign: "center", marginTop: 48, maxWidth: 800, marginLeft: "auto", marginRight: "auto" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: 16 }}>Welcome to Fintrack</h1>
        <p style={{ fontSize: "1.1rem", lineHeight: 1.6 }}>
          Manage your personal and professional finances effortlessly. Track your income, expenses, savings, clients, quotes, and invoices all in one place. 
          Discover how Fintrack can help you take control of your money, set financial goals, and grow your wealth with smart insights and easy-to-use tools.
        </p>
      </div>

      {/* Mode Buttons */}
      <div style={{ display: "flex", justifyContent: "center", gap: 32, marginTop: 32 }}>
        <Link href="/personal"><button style={{ padding:"18px 36px", borderRadius:12, border:"none", cursor:"pointer", background:"linear-gradient(45deg, #1f6feb, #0ea5a0)", color:"#fff", fontWeight:700, fontSize: 18 }}>Personal Mode</button></Link>
        <Link href="/pro"><button style={{ padding:"18px 36px", borderRadius:12, border:"none", cursor:"pointer", background:"linear-gradient(45deg, #0ea5a0, #1f6feb)", color:"#fff", fontWeight:700, fontSize: 18 }}>Pro Mode</button></Link>
      </div>

      {/* Main Flow Section */}
      <div style={{ display: "flex", justifyContent: "space-between", maxWidth: 1300, margin: "48px auto", gap: 48 }}>
        {/* Personal Flow */}
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

        {/* Description / Features / Dashboard */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", maxWidth: 400 }}>
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

        {/* Pro Flow */}
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

      {/* Social Media Section */}
      <div style={{ position: "relative", width: 400, height: 100, margin: "32px auto 48px", textAlign: "center" }}>
        <img src="/images/1016.png" alt="Social Media Logos" style={{ width: "100%", height: "100%" }} />
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ position: "absolute", top: 20, left: 20, width: 40, height: 40 }}></a>
        <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" style={{ position: "absolute", top: 20, left: 100, width: 40, height: 40 }}></a>
        <a href="https://wa.me/123456789" target="_blank" rel="noopener noreferrer" style={{ position: "absolute", top: 20, left: 180, width: 40, height: 40 }}></a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ position: "absolute", top: 20, left: 260, width: 40, height: 40 }}></a>
      </div>

      {/* Footer */}
      <footer style={{ marginTop: 48, textAlign: "center", padding: 16, borderTop: "1px solid #ccc", fontSize: 13, color: "#555" }}>
        © 2025 Fintrack. All rights reserved. | <Link href="/privacy">Privacy Policy</Link> | <Link href="/contact">Contact</Link>
      </footer>
    </div>
  );
}
