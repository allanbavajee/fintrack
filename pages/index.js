/* pages/index.jsx */
import Link from "next/link";

export default function Home() {
  const personalSteps = [
    { step: 1, title: "Income", icon: "💼", desc: "Track all your revenue sources like salary or freelance work." },
    { step: 2, title: "Expenses", icon: "🛒", desc: "Record all monthly expenses: rent, groceries, leisure." },
    { step: 3, title: "Savings", icon: "🏦", desc: "Set aside a percentage of your income for savings." },
  ];

  const proSteps = [
    { step: 1, title: "Clients", icon: "👤", desc: "Create and manage client profiles with full info." },
    { step: 2, title: "Quotation", icon: "📝", desc: "Generate quotes for clients easily and quickly." },
    { step: 3, title: "Invoice", icon: "📄", desc: "Convert quotes into invoices and track payments." },
  ];

  const cardStyle = {
    background: "#fff",
    borderRadius: 16,
    padding: "20px",
    marginBottom: 24,
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
    maxWidth: 220,
    textAlign: "center",
  };

  return (
    <div style={{ minHeight: "100vh", padding: 24, background: "#f9f9f9", fontFamily: "Inter, Arial, sans-serif" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <h1 style={{ fontSize: "3rem", marginBottom: 12 }}>Welcome to Fintrack 🚀</h1>
        <p style={{ fontSize: "1.1rem", color: "#555" }}>
          Manage your personal and professional finances easily. Choose your mode below:
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 18, marginTop: 24 }}>
          <Link href="/personal">
            <button style={{ padding: "12px 28px", borderRadius: 10, border: "none", cursor: "pointer", backgroundColor: "#1f6feb", color: "#fff", fontWeight: 700 }}>Personal Mode</button>
          </Link>
          <Link href="/pro">
            <button style={{ padding: "12px 28px", borderRadius: 10, border: "none", cursor: "pointer", backgroundColor: "#0ea5a0", color: "#fff", fontWeight: 700 }}>Pro Mode</button>
          </Link>
        </div>
      </div>

      {/* Flows */}
      <div style={{ display: "flex", justifyContent: "space-between", maxWidth: 1000, margin: "0 auto", gap: 48 }}>
        {/* Personal Flow */}
        <div>
          <h2 style={{ textAlign: "center", color: "#1f6feb", marginBottom: 24 }}>Personal Flow</h2>
          {personalSteps.map((item) => (
            <div key={item.step} style={cardStyle}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>{item.icon}</div>
              <h3 style={{ marginBottom: 8 }}>{item.title}</h3>
              <p style={{ fontSize: 14, color: "#555" }}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Pro Flow */}
        <div>
          <h2 style={{ textAlign: "center", color: "#0ea5a0", marginBottom: 24 }}>Pro Flow</h2>
          {proSteps.map((item) => (
            <div key={item.step} style={cardStyle}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>{item.icon}</div>
              <h3 style={{ marginBottom: 8 }}>{item.title}</h3>
              <p style={{ fontSize: 14, color: "#555" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div style={{ maxWidth: 720, textAlign: "center", color: "#444", marginTop: 48, marginLeft: "auto", marginRight: "auto" }}>
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
  );
}
