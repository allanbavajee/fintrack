/* pages/index.jsx */
import Image from "next/image";
import Link from "next/link";

// === DATA ===
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

// === STYLES ===
const cardStyle = {
  borderRadius: 16,
  padding: "16px",
  marginBottom: 16,
  maxWidth: 220,
  textAlign: "center",
  cursor: "pointer",
  backgroundColor: "transparent",
  transition: "all 0.3s ease",
};

const arrowSVG = (
  <svg width="20" height="40" viewBox="0 0 20 40" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ margin: "0 auto", display: "block" }}>
    <path d="M10 0 V30 M10 30 L5 25 M10 30 L15 25"
      stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "#fff", fontFamily: "Inter, Arial, sans-serif", paddingTop: 16 }}>
      
      {/* Header (inchangé, sans titre) */}
      <header style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", maxWidth: 1300, margin: "0 auto", padding: "16px" }}>
        <div>
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
      </header>

      {/* Welcome Section (remonté plus haut) */}
      <section style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", maxWidth: 900, margin: "10px auto" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: 16 }}>Welcome to Fintrack</h2>
        <p style={{ fontSize: "1rem", color: "#444", lineHeight: 1.6 }}>
          Manage your personal and professional finances effortlessly. Track your income, expenses, savings, clients, quotations, and invoices all in one place.
          Simplify your financial life, gain clarity, and make smarter decisions every day with Fintrack. Enjoy a secure, seamless, and insightful experience
          that empowers you to take control of your money.
        </p>
      </section>

      {/* Features */}
      <section style={{ textAlign: "center", marginBottom: 32 }}>
        <h2 style={{ fontSize: "1.25rem", marginBottom: 12 }}>✨ Features</h2>
        <ul style={{ listStyle: "none", paddingLeft: 0, lineHeight: 1.6 }}>
          <li>💰 Track your personal income, expenses and savings</li>
          <li>📊 Visualize your financial health with charts</li>
          <li>📝 Create and manage clients, quotes and invoices</li>
          <li>🔔 Receive weekly tips to improve your finances</li>
          <li>🔒 Secure and personalized experience with login</li>
        </ul>
      </section>

      {/* Personal / Pro Buttons (avec hover) */}
      <section style={{ display: "flex", justifyContent: "center", gap: 24, marginBottom: 48 }}>
        <Link href="/personal">
          <button
            style={{
              padding: "16px 40px",
              borderRadius: 14,
              border: "none",
              cursor: "pointer",
              background: "#ff7f50",
              color: "#fff",
              fontWeight: 700,
              fontSize: "1.1rem",
              transition: "0.3s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#ff6333"}
            onMouseLeave={e => e.currentTarget.style.background = "#ff7f50"}
          >
            Personal Mode
          </button>
        </Link>
        <Link href="/pro">
          <button
            style={{
              padding: "16px 40px",
              borderRadius: 14,
              border: "none",
              cursor: "pointer",
              background: "#1f6feb",
              color: "#fff",
              fontWeight: 700,
              fontSize: "1.1rem",
              transition: "0.3s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#155ccc"}
            onMouseLeave={e => e.currentTarget.style.background = "#1f6feb"}
          >
            Pro Mode
          </button>
        </Link>
      </section>

      {/* Flows Section (remontés au même niveau que Features, coins) */}
      <section style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        maxWidth: 1300,
        margin: "0 auto",
        padding: "0 24px 48px",
      }}>

        {/* Personal Flow (à gauche) */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginTop: "-80px" }}>
          <h2 style={{ color: "#1f6feb", marginBottom: 16 }}>Personal Flow</h2>
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

        {/* Dashboard (centré) */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Image src="/images/dashboard.png" alt="Dashboard Example" width={350} height={200} style={{ borderRadius: 16 }} />
          <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 32 }}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><Image src="/images/facebook.png" alt="Facebook" width={32} height={32} /></a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer"><Image src="/images/tiktok.png" alt="TikTok" width={32} height={32} /></a>
            <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer"><Image src="/images/whatsapp.png" alt="WhatsApp" width={32} height={32} /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><Image src="/images/linkedin.png" alt="LinkedIn" width={32} height={32} /></a>
          </div>
        </div>

        {/* Pro Flow (à droite) */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", marginTop: "-80px" }}>
          <h2 style={{ color: "#0ea5a0", marginBottom: 16 }}>Pro Flow</h2>
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
      </section>

      {/* Footer (inchangé) */}
      <footer style={{ textAlign: "center", padding: 16, borderTop: "1px solid #ccc", fontSize: 13, color: "#555" }}>
        © 2025 Fintrack. All rights reserved. | <Link href="/privacy">Privacy Policy</Link> | <Link href="/terms">Terms of Service</Link>
      </footer>
    </div>
  );
}
