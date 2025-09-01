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
        background: "linear-gradient(to right, #f0f4f8, #e4edf7)",
        fontFamily: "Arial, sans-serif",
        color: "#333",
        textAlign: "center",
      }}
    >
      {/* Header */}
      <h1 style={{ fontSize: "3rem", marginBottom: "20px" }}>Welcome to Fintrack 🚀</h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "40px", maxWidth: "600px" }}>
        Fintrack helps you manage your finances easily. Choose your mode to start:
      </p>

      {/* Buttons Personal / Pro */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "50px" }}>
        <Link href="/personal">
          <button
            style={{
              padding: "15px 30px",
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
              padding: "15px 30px",
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

      {/* Mini-schemas */}
      <div style={{ display: "flex", gap: "100px", marginBottom: "50px" }}>
        {/* Personal Mode Schema */}
        <div style={{ textAlign: "center" }}>
          <h3>Personal Mode Flow</h3>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", marginTop: "20px" }}>
            <div style={{ padding: "10px 20px", backgroundColor: "#4facfe", color: "#fff", borderRadius: "5px", fontWeight: "bold" }}>Income</div>
            <div style={{ width: "2px", height: "20px", backgroundColor: "#333" }} />
            <div style={{ padding: "10px 20px", backgroundColor: "#4facfe", color: "#fff", borderRadius: "5px", fontWeight: "bold" }}>Expenses</div>
            <div style={{ width: "2px", height: "20px", backgroundColor: "#333" }} />
            <div style={{ padding: "10px 20px", backgroundColor: "#4facfe", color: "#fff", borderRadius: "5px", fontWeight: "bold" }}>Savings</div>
          </div>
        </div>

        {/* Pro Mode Schema */}
        <div style={{ textAlign: "center" }}>
          <h3>Pro Mode Flow</h3>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", marginTop: "20px" }}>
            <div style={{ padding: "10px 20px", backgroundColor: "#00c6ff", color: "#fff", borderRadius: "5px", fontWeight: "bold" }}>Create Client</div>
            <div style={{ width: "2px", height: "20px", backgroundColor: "#333" }} />
            <div style={{ padding: "10px 20px", backgroundColor: "#00c6ff", color: "#fff", borderRadius: "5px", fontWeight: "bold" }}>Quotation</div>
            <div style={{ width: "2px", height: "20px", backgroundColor: "#333" }} />
            <div style={{ padding: "10px 20px", backgroundColor: "#00c6ff", color: "#fff", borderRadius: "5px", fontWeight: "bold" }}>Invoice</div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div style={{ maxWidth: "700px", textAlign: "center" }}>
        <h2>Features:</h2>
        <ul style={{ lineHeight: "1.8", fontSize: "1.1rem", paddingLeft: "0", listStyle: "none" }}>
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
