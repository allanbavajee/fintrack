/* pages/index.jsx */
import Link from "next/link";
import { FaMoneyBillWave, FaShoppingCart, FaPiggyBank, FaUserTie, FaFileInvoice, FaFileAlt } from "react-icons/fa";

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
        background: "#fff",
        fontFamily: "Arial, sans-serif",
        color: "#333",
      }}
    >
      {/* Personal Mode Flow - Left */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h3 style={{ marginBottom: "20px", fontSize: "1.5rem", color: "#4facfe" }}>Personal Mode</h3>
        <FlowStep icon={<FaMoneyBillWave />} text="Income" desc="Track your earnings" color="#4facfe" />
        <Arrow />
        <FlowStep icon={<FaShoppingCart />} text="Expenses" desc="Manage your spending" color="#43e97b" />
        <Arrow />
        <FlowStep icon={<FaPiggyBank />} text="Savings" desc="Grow your savings safely" color="#f093fb" />
      </div>

      {/* Center Features and Buttons */}
      <div style={{ flex: 1, margin: "0 50px", textAlign: "center" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>Welcome to Fintrack 🚀</h1>
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

        <div style={{ maxWidth: "450px", margin: "0 auto", textAlign: "left" }}>
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
        <h3 style={{ marginBottom: "20px", fontSize: "1.5rem", color: "#00c6ff" }}>Pro Mode</h3>
        <FlowStep icon={<FaUserTie />} text="Create Client" desc="Store client details securely" color="#00c6ff" />
        <Arrow />
        <FlowStep icon={<FaFileAlt />} text="Quotation" desc="Send professional quotes" color="#43e97b" />
        <Arrow />
        <FlowStep icon={<FaFileInvoice />} text="Invoice" desc="Get paid faster" color="#f093fb" />
      </div>
    </div>
  );
}

// Flow step component
const FlowStep = ({ icon, text, desc, color }) => (
  <div
    style={{
      padding: "15px 20px",
      backgroundColor: color,
      color: "#fff",
      borderRadius: "50px",
      textAlign: "center",
      boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
      width: "200px",
    }}
  >
    <div style={{ fontSize: "1.8rem", marginBottom: "10px" }}>{icon}</div>
    <strong>{text}</strong>
    <p style={{ fontSize: "0.9rem", marginTop: "5px" }}>{desc}</p>
  </div>
);

// Arrow component
const Arrow = () => (
  <div style={{ fontSize: "2rem", margin: "15px 0", color: "#999" }}>⬇️</div>
);

const buttonStyle = {
  padding: "15px 30px",
  fontSize: "1.1rem",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  backgroundColor: "#f0f4f8",
  color: "#333",
  fontWeight: "bold",
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  transition: "transform 0.2s",
};
