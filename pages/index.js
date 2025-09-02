/* pages/index.jsx */
import Link from "next/link";

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#fff", padding: "32px", fontFamily: "Inter, Arial, sans-serif" }}>
      {/* Header */}
      <h1 style={{ fontSize: "3rem", fontWeight: "700", textAlign: "center", marginBottom: "12px" }}>
        Welcome to <span style={{ color: "#1f6feb" }}>Fintrack 🚀</span>
      </h1>
      <p style={{ fontSize: "1.1rem", textAlign: "center", color: "#444", maxWidth: 720, marginBottom: "28px" }}>
        Manage your personal and professional finances easily. Choose your mode below:
      </p>

      {/* Buttons */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "40px" }}>
        <Link href="/personal">
          <button style={{ padding: "12px 28px", fontSize: "1rem", borderRadius: 12, border: "none", backgroundColor: "#1f6feb", color: "#fff", fontWeight: 700, cursor: "pointer", boxShadow: "0 6px 18px rgba(31,111,235,0.2)" }}>
            Personal Mode
          </button>
        </Link>
        <Link href="/pro">
          <button style={{ padding: "12px 28px", fontSize: "1rem", borderRadius: 12, border: "none", backgroundColor: "#0ea5a0", color: "#fff", fontWeight: 700, cursor: "pointer", boxShadow: "0 6px 18px rgba(14,165,160,0.2)" }}>
            Pro Mode
          </button>
        </Link>
      </div>

      {/* Main Layout with Flows */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", width: "100%", maxWidth: 1200 }}>
        
        {/* Personal Flow Left */}
        <div style={{ flex: 1, marginRight: "20px" }}>
          <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#1f6feb", marginBottom: "16px" }}>📌 Personal Flow</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div style={{ backgroundColor: "#e6f7ff", padding: "16px", borderRadius: "12px", boxShadow: "0 6px 16px rgba(31,111,235,0.1)" }}>
              <div style={{ fontWeight: 700 }}>Income 💵</div>
              <p style={{ marginTop: "4px", fontSize: "0.95rem", color: "#555" }}>
                Add your salary, freelance earnings, or any other income source. Track everything easily.
              </p>
            </div>
            <div style={{ backgroundColor: "#fef3f2", padding: "16px", borderRadius: "12px", boxShadow: "0 6px 16px rgba(239,68,68,0.1)" }}>
              <div style={{ fontWeight: 700 }}>Expenses 📊</div>
              <p style={{ marginTop: "4px", fontSize: "0.95rem", color: "#555" }}>
                Record your daily expenses and bills to understand where your money goes.
              </p>
            </div>
            <div style={{ backgroundColor: "#fef9c3", padding: "16px", borderRadius: "12px", boxShadow: "0 6px 16px rgba(234,179,8,0.1)" }}>
              <div style={{ fontWeight: 700 }}>Savings 🏦</div>
              <p style={{ marginTop: "4px", fontSize: "0.95rem", color: "#555" }}>
                See how much you saved and plan your future goals efficiently.
              </p>
            </div>
          </div>
        </div>

        {/* Features Center */}
        <div style={{ flex: 1.2, textAlign: "center", padding: "0 20px" }}>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 700, marginBottom: "18px" }}>✨ Features</h2>
          <ul style={{ textAlign: "left", listStyle: "none", paddingLeft: 0, fontSize: "1rem", color: "#444", lineHeight: 1.8 }}>
            <li>💰 Track income, expenses and savings</li>
            <li>📊 Visualize your financial health with charts</li>
            <li>📝 Create and manage clients, quotes and invoices</li>
            <li>🔔 Receive weekly tips to improve finances</li>
            <li>🔒 Secure and personalized experience with login</li>
          </ul>
        </div>

        {/* Pro Flow Right */}
        <div style={{ flex: 1, marginLeft: "20px" }}>
          <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#0ea5a0", marginBottom: "16px" }}>📌 Pro Flow</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div style={{ backgroundColor: "#d1fae5", padding: "16px", borderRadius: "12px", boxShadow: "0 6px 16px rgba(5,150,105,0.1)" }}>
              <div style={{ fontWeight: 700 }}>Create Client 👥</div>
              <p style={{ marginTop: "4px", fontSize: "0.95rem", color: "#555" }}>
                Add your clients with full details to manage your business relationships easily.
              </p>
            </div>
            <div style={{ backgroundColor: "#fef3c7", padding: "16px", borderRadius: "12px", boxShadow: "0 6px 16px rgba(202,138,4,0.1)" }}>
              <div style={{ fontWeight: 700 }}>Quotation 📝</div>
              <p style={{ marginTop: "4px", fontSize: "0.95rem", color: "#555" }}>
                Generate professional quotes quickly for your clients and track them efficiently.
              </p>
            </div>
            <div style={{ backgroundColor: "#ede9fe", padding: "16px", borderRadius: "12px", boxShadow: "0 6px 16px rgba(124,58,237,0.1)" }}>
              <div style={{ fontWeight: 700 }}>Invoice 🧾</div>
              <p style={{ marginTop: "4px", fontSize: "0.95rem", color: "#555" }}>
                Convert quotations to invoices and track payments to stay on top of your business finances.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
