/* pages/index.jsx */
import Link from "next/link";

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "100vh",
        padding: "50px",
        background: "linear-gradient(to right, #f0f4f8, #e4edf7)",
        fontFamily: "Arial, sans-serif",
        color: "#333",
      }}
    >
      {/* Personal Mode Flow - Left */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h3>Personal Mode</h3>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "30px", marginTop: "20px" }}>
          <div style={flowBoxStyle("#4facfe")}>Income</div>
          <div style={arrowStyle} />
          <div style={flowBoxStyle("#4facfe")}>Expenses</div>
          <div style={arrowStyle} />
          <div style={flowBoxStyle("#4facfe")}>Savings</div>
        </div>
      </div>

      {/* Center Features and Buttons */}
      <div style={{ flex: 1, margin: "0 50px", textAlign: "center" }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "20px" }}>Welcome to Fintrack 🚀</h1>
        <p style={{ fontSize: "1.2rem", marginBottom: "30px" }}>
          Manage your finances easily. Choose your mode to start:
        </p>

        <div style={{ display: "flex", gap: "20px", justifyContent: "center", marginBottom: "40px" }}>
          <Link href="/personal">
            <button style={buttonStyle}>Personal Mode</button>
          </Link>
          <Link href="/pro">
            <button style={buttonStyle}>Pro Mode</button>
          </Link>
        </div>

        <div style={{ maxWidth: "400px", margin: "0 auto", textAlign: "left" }}>
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

      {/* Pro Mode Flow - Right */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h3>Pro Mode</h3>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "30px", marginTop: "20px" }}>
          <div style={flowBoxStyle("#00c6ff")}>Create Client</div>
          <div style={arrowStyle} />
          <div style={flowBoxStyle("#00c6ff")}>Quotation</div>
          <div style={arrowStyle} />
          <div style={flowBoxStyle("#00c6ff")}>Invoice</div>
        </div>
      </div>
    </div>
  );
}

// Styles
const flowBoxStyle = (color) => ({
  padding: "15px 30px",
  backgroundColor: color,
  color: "#fff",
  borderRadius: "8px",
  fontWeight: "bold",
  width: "150px",
  textAlign: "center",
  boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
});

const arrowStyle = {
  width: "4px",
  height: "30px",
  backgroundColor: "#333",
  clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
  margin: "0 auto",
};
  
const buttonStyle = {
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
};
