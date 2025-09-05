/*pages/index.js*/
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { TrendingUp, ShoppingCart, PiggyBank, User, FileText, Receipt } from "lucide-react";
import Navbar from "../components/Navbar";

// DATA
const personalSteps = [
  { title: "Income", icon: <TrendingUp size={36} color="#2563eb" />, desc: "Track all your revenue sources like salary, freelance or passive income.", extra: "Salary | Freelance | Investments" },
  { title: "Expenses", icon: <ShoppingCart size={36} color="#fb6f5f" />, desc: "Record all monthly expenses: rent, groceries, subscriptions, leisure activities.", extra: "Rent | Food | Leisure | Subscriptions" },
  { title: "Savings", icon: <PiggyBank size={36} color="#10b981" />, desc: "Set aside a percentage of your income for savings and emergency funds.", extra: "Bank | Emergency Fund | Goals" },
];

const proSteps = [
  { title: "Clients", icon: <User size={36} color="#2563eb" />, desc: "Create and manage client profiles including contacts, company info, and notes.", extra: "Details | Contact | Company" },
  { title: "Quotation", icon: <FileText size={36} color="#fb6f5f" />, desc: "Generate professional quotations for clients quickly and easily.", extra: "Price | Validity | Notes" },
  { title: "Invoice", icon: <Receipt size={36} color="#10b981" />, desc: "Convert quotes into invoices, track payments, and manage billing efficiently.", extra: "Payment | Due Date | Status" },
];

// STYLES
const cardStyle = {
  borderRadius: 16,
  padding: "20px",
  marginBottom: 24,
  maxWidth: 240,
  textAlign: "center",
  cursor: "pointer",
  backgroundColor: "#f3f4f6",
  transition: "all 0.3s ease",
};

const arrowSVG = (
  <svg width="20" height="40" viewBox="0 0 20 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ margin: "0 auto", display: "block" }}>
    <path d="M10 0 V30 M10 30 L5 25 M10 30 L15 25" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

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
    <div style={{ minHeight: "100vh", background: "#fff", fontFamily: "Inter, Arial, sans-serif" }}>
      <Navbar />

      {/* Welcome Section */}
      <section style={{ maxWidth: 1000, margin: "60px auto 40px", textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", top: 20, right: 0, display: "flex", gap: 12 }}>
          {!session ? (
            <>
              <Link href="/login">
                <button style={{ background: "#2563eb", color: "#fff", border: "none", padding: "10px 20px", borderRadius: 8, cursor: "pointer" }}>Login</button>
              </Link>
              <Link href="/signup">
                <button style={{ background: "#fb6f5f", color: "#fff", border: "none", padding: "10px 20px", borderRadius: 8, cursor: "pointer" }}>Signup</button>
              </Link>
            </>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontWeight: 600 }}>👋 Bienvenue {session.user.user_metadata?.prenom || session.user.email}</span>
              <button onClick={handleLogout} style={{ background: "#ff4d4d", color: "#fff", border: "none", padding: "8px 16px", borderRadius: 8, cursor: "pointer" }}>Logout</button>
            </div>
          )}
        </div>

        <h2 style={{ fontSize: "2rem", marginBottom: 20, color: "#2563eb" }}>Welcome to Fintrack</h2>
        <p style={{ fontSize: "1.1rem", color: "#374151", lineHeight: 1.8 }}>Manage your personal and professional finances effortlessly. Track your income, expenses, savings, clients, quotations, and invoices all in one place.</p>
      </section>

      {/* Layout flows et features */}
      <section style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", maxWidth: 1200, margin: "0 auto", padding: "0 16px" }}>
        {/* Personal Flow */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "28%", marginTop: 40 }}>
          <h2 style={{ color: "#2563eb", marginBottom: 16 }}>Personal Flow</h2>
          {personalSteps.map((item, index) => (
            <div key={index} style={{ position: "relative" }}>
              <div style={cardStyle} onMouseEnter={e => { e.currentTarget.style.transform="scale(1.05)"; e.currentTarget.style.boxShadow="0 12px 28px rgba(0,0,0,0.15)"; }} onMouseLeave={e => { e.currentTarget.style.transform="scale(1)"; e.currentTarget.style.boxShadow="none"; }}>
                <div style={{ marginBottom: 8 }}>{item.icon}</div>
                <h3>{item.title}</h3>
                <p style={{ fontSize: 13, color: "#555" }}>{item.desc}</p>
                <p style={{ fontSize: 12, color: "#333", marginTop: 6 }}>{item.extra}</p>
              </div>
              {index < personalSteps.length-1 && arrowSVG}
            </div>
          ))}
        </div>

        {/* Features */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "40%", marginTop: 60 }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: 20, color: "#2563eb" }}>✨ Features</h2>
          <ul style={{ listStyle: "none", paddingLeft: 0, lineHeight: 2 }}>
            <li>💰 Track your personal income, expenses and savings</li>
            <li>📊 Visualize your financial health with charts</li>
            <li>📝 Create and manage clients, quotes and invoices</li>
            <li>🔔 Receive weekly tips to improve your finances</li>
            <li>🔒 Secure and personalized experience with login</li>
          </ul>

          <div style={{ display: "flex", justifyContent: "center", gap: 24, margin: "32px 0" }}>
            <Link href="/personal">
              <button style={{ padding:"16px 40px", borderRadius:16, border:"none", cursor:"pointer", background:"#fb6f5f", color:"#fff", fontWeight:700, fontSize:"1.1rem", transition:"0.3s" }} onMouseEnter={e => e.currentTarget.style.background="#f65b4b"} onMouseLeave={e => e.currentTarget.style.background="#fb6f5f"}>Personal Mode</button>
            </Link>
            <Link href="/pro">
              <button style={{ padding:"16px 40px", borderRadius:16, border:"none", cursor:"pointer", background:"#2563eb", color:"#fff", fontWeight:700, fontSize:"1.1rem", transition:"0.3s" }} onMouseEnter={e => e.currentTarget.style.background="#1f4fc0"} onMouseLeave={e => e.currentTarget.style.background="#2563eb"}>Pro Mode</button>
            </Link>
          </div>

          <Image src="/images/dashboard.png" alt="Dashboard Example" width={360} height={220} style={{ borderRadius: 16, marginTop: 20 }} />

        </div>

        {/* Pro Flow */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "28%", marginTop: 40 }}>
          <h2 style={{ color: "#10b981", marginBottom: 16 }}>Pro Flow</h2>
          {proSteps.map((item, index) => (
            <div key={index} style={{ position: "relative" }}>
              <div style={cardStyle} onMouseEnter={e => { e.currentTarget.style.transform="scale(1.05)"; e.currentTarget.style.boxShadow="0 12px 28px rgba(0,0,0,0.15)"; }} onMouseLeave={e => { e.currentTarget.style.transform="scale(1)"; e.currentTarget.style.boxShadow="none"; }}>
                <div style={{ marginBottom: 8 }}>{item.icon}</div>
                <h3>{item.title}</h3>
                <p style={{ fontSize: 13, color: "#555" }}>{item.desc}</p>
                <p style={{ fontSize: 12, color: "#333", marginTop: 6 }}>{item.extra}</p>
              </div>
              {index < proSteps.length-1 && arrowSVG}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ textAlign:"center", padding:20, fontSize:13, color:"#555" }}>
        © 2025 Fintrack. All rights reserved. | <Link href="/privacy">Privacy Policy</Link> | <Link href="/terms">Terms of Service</Link>
      </footer>
    </div>
  );
}
