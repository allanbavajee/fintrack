/* pages/index.jsx */
import Link from "next/link";

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "20px",
        background: "linear-gradient(to right, #4facfe, #00f2fe)",
        color: "#fff",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "20px" }}>Welcome to Fintrack 🚀</h1>
      <p style={{ maxWidth: "600px", fontSize: "1.2rem", marginBottom: "40px" }}>
        Fintrack helps you manage your finances easily. Use it in <strong>Personal Mode</strong> to track your income, expenses, and savings,
        or in <strong>Pro Mode</strong> to manage clients, create quotes, and invoices.
      </p>

      <div style={{ display: "flex", gap: "20px" }}>
        <Link href="/personal">
          <button
            style={{
              padding: "15px 30px",
              fontSize: "1.1rem",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              backgroundColor: "#fff",
              color: "#4facfe",
              fontWeight: "bold",
              transition: "transform 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Personal Mode
          </button>
        </Link>

        <Link href="/pro">
          <button
            style={{
              padding: "15px 30px",
              fontSize: "1.1rem",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              backgroundColor: "#fff",
              color: "#00c6ff",
              fontWeight: "bold",
              transition: "transform 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Pro Mode
          </button>
        </Link>
      </div>

      <div style={{ marginTop: "60px", maxWidth: "700px", textAlign: "left" }}>
        <h2>Features:</h2>
        <ul style={{ lineHeight: "1.8", fontSize: "1.1rem" }}>
          <li>💰 Track your personal income and expenses</li>
          <li>📊 Visualize your savings and financial health</li>
          <li>📝 Create and manage clients, quotes, and invoices</li>
          <li>🔔 Get weekly tips to improve your finances</li>
          <li>🔒 Secure and personalized experience with login</li>
        </ul>
      </div>
    </div>
  );
}
