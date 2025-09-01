/* pages/index.jsx */
import Link from "next/link";

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "50px",
        background: "linear-gradient(to right, #f0f4f8, #e4edf7)",
        fontFamily: "Arial, sans-serif",
        color: "#333",
      }}
    >
      {/* Schémas à gauche */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "50px" }}>
        {/* Personal Mode schema */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "150px",
              height: "150px",
              margin: "0 auto 20px",
              borderRadius: "50%",
              background: "#4facfe",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "1.2rem",
            }}
          >
            💰
          </div>
          <p>Track your personal finances</p>
        </div>

        {/* Pro Mode schema */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "150px",
              height: "150px",
              margin: "0 auto 20px",
              borderRadius: "50%",
              background: "#00c6ff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "1.2rem",
            }}
          >
            📝
          </div>
          <p>Manage clients, quotes & invoices</p>
        </div>
      </div>

      {/* Texte et boutons à droite */}
      <div style={{ flex: 1, marginLeft: "50px", maxWidth: "500px" }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "20px" }}>Welcome to Fintrack 🚀</h1>
        <p style={{ fontSize: "1.2rem", marginBottom: "40px" }}>
          Fintrack helps you manage your finances easily. Choose your mode to start:
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "40px" }}>
          <Link href="/personal">
            <button
              style={{
                padding: "15px",
                fontSize: "1.1rem",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                backgroundColor: "#fff",
                color: "#333",
                fontWeight: "bold",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
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
                padding: "15px",
                fontSize: "1.1rem",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                backgroundColor: "#fff",
                color: "#333",
                fontWeight: "bold",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                transition: "transform 0.2s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              Pro Mode
            </button>
          </Link>
        </div>

        <div>
          <h2>Features:</h2>
          <ul style={{ lineHeight: "1.8", fontSize: "1.1rem" }}>
            <li>💰 Track your personal income, expenses and savings</li>
            <li>📊 Visualize your financial health with charts</li>
            <li>📝 Create and manage clients, quotes and invoices</li>
            <li>🔔 Receive weekly tips to improve your finances</li>
            <li>🔒 Secure and personalized experience with login</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
