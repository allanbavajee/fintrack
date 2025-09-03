/* pages/index.jsx */
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// … import et data restent inchangés

export default function Home() {
  // personalSteps, proSteps, cardStyle et arrowSVG restent inchangés

  return (
    <div style={{ minHeight: "100vh", background: "#fff", fontFamily: "Inter, Arial, sans-serif", paddingTop: 16 }}>
      
      {/* Header: Login/Signup */}
      <div style={{ display: "flex", justifyContent: "flex-end", maxWidth: 1300, margin: "0 auto", paddingRight: 16 }}>
        <Link href="/login">
          <button style={{ marginRight: 12, padding: "10px 24px", borderRadius: 8, border: "1px solid #1f6feb", background: "#fff", color: "#1f6feb", fontWeight: 600 }}>
            Login
          </button>
        </Link>
        <Link href="/signup">
          <button style={{ padding: "10px 24px", borderRadius: 8, border: "none", background: "#1f6feb", color: "#fff", fontWeight: 600 }}>
            Signup
          </button>
        </Link>
      </div>

      {/* Welcome + Features + Boutons Personal/Pro */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", maxWidth: 900, margin: "24px auto" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: 12 }}>Welcome to Fintrack</h1>
        <p style={{ fontSize: "1rem", color: "#444", lineHeight: 1.6, marginBottom: 24 }}>
          Manage your personal and professional finances effortlessly. Track your income, expenses, savings, clients, quotations, and invoices all in one place. Simplify your financial life, gain clarity, and make smarter decisions every day with Fintrack. Enjoy a secure, seamless, and insightful experience that empowers you to take control of your money.
        </p>

        {/* Features */}
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: "1.25rem", marginBottom: 12 }}>✨ Features</h2>
          <ul style={{ listStyle: "none", paddingLeft: 0, lineHeight: 1.6 }}>
            <li>💰 Track your personal income, expenses and savings</li>
            <li>📊 Visualize your financial health with charts</li>
            <li>📝 Create and manage clients, quotes and invoices</li>
            <li>🔔 Receive weekly tips to improve your finances</li>
            <li>🔒 Secure and personalized experience with login</li>
          </ul>
        </div>

        {/* Boutons Personal / Pro */}
        <div style={{ display: "flex", justifyContent: "center", gap: 24, marginBottom: 48 }}>
          <Link href="/personal">
            <button style={{ padding: "16px 40px", borderRadius: 14, border: "none", cursor: "pointer", background: "#ff7f50", color: "#fff", fontWeight: 700, fontSize: "1.1rem" }}>
              Personal Mode
            </button>
          </Link>
          <Link href="/pro">
            <button style={{ padding: "16px 40px", borderRadius: 14, border: "none", cursor: "pointer", background: "#1f6feb", color: "#fff", fontWeight: 700, fontSize: "1.1rem" }}>
              Pro Mode
            </button>
          </Link>
        </div>
      </div>

      {/* Layout principal avec flows alignés à la hauteur des Features */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", gap: 48, maxWidth: 1300, margin: "0 auto", paddingBottom: 48 }}>
        
        {/* Personal Flow */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: -16 }}>
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

        {/* Dashboard */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: -16 }}>
          <Image src="/images/dashboard.png" alt="Dashboard Example" width={350} height={200} style={{ borderRadius: 16 }} />

          {/* Réseaux sociaux */}
          <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 32 }}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><Image src="/images/facebook.png" alt="Facebook" width={32} height={32} /></a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer"><Image src="/images/tiktok.png" alt="TikTok" width={32} height={32} /></a>
            <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer"><Image src="/images/whatsapp.png" alt="WhatsApp" width={32} height={32} /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><Image src="/images/linkedin.png" alt="LinkedIn" width={32} height={32} /></a>
          </div>
        </div>

        {/* Pro Flow */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: -16 }}>
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

