import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";

/* DATA */
const personalSteps = [
  { title: "Income", icon: "/icons/income.svg", desc: "Track all your revenue sources like salary, freelance or passive income.", extra: "Salary | Freelance | Investments" },
  { title: "Expenses", icon: "/icons/expenses.svg", desc: "Record all monthly expenses: rent, groceries, subscriptions, leisure activities.", extra: "Rent | Food | Leisure | Subscriptions" },
  { title: "Savings", icon: "/icons/savings.svg", desc: "Set aside a percentage of your income for savings and emergency funds.", extra: "Bank | Emergency Fund | Goals" },
];

const proSteps = [
  { title: "Clients", icon: "/icons/clients.svg", desc: "Create and manage client profiles including contacts, company info, and notes.", extra: "Details | Contact | Company" },
  { title: "Quotation", icon: "/icons/quotation.svg", desc: "Generate professional quotations for clients quickly and easily.", extra: "Price | Validity | Notes" },
  { title: "Invoice", icon: "/icons/invoice.svg", desc: "Convert quotes into invoices, track payments, and manage billing efficiently.", extra: "Payment | Due Date | Status" },
];

/* Styles */
const cardStyle = {
  borderRadius: 16,
  padding: "16px",
  marginBottom: 24,
  maxWidth: 220,
  textAlign: "center",
  cursor: "pointer",
  backgroundColor: "#f9f9f9",
  transition: "all 0.3s ease",
  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
};

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", fontFamily: "Inter, Arial, sans-serif" }}>
      <Navbar />

      {/* Welcome */}
      <section style={{ maxWidth: 1000, margin: "60px auto 40px", textAlign: "center" }}>
        <h2 style={{ fontSize: "2.2rem", marginBottom: 16, color: "#0d1f4c" }}>Welcome to Fintrack</h2>
        <p style={{ fontSize: "1.1rem", color: "#555", lineHeight: 1.8 }}>
          Track your personal and professional finances effortlessly. Manage income, expenses, savings, clients, quotations, and invoices all in one place.
        </p>
      </section>

      {/* Main Content */}
      <section style={{ display: "flex", justifyContent: "space-between", maxWidth: 1300, margin: "0 auto", padding: "0 16px" }}>
        
        {/* Personal Flow */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "30%", marginTop: 40 }}>
          <h2 style={{ color: "#1f6feb", marginBottom: 24 }}>Personal Flow</h2>
          {personalSteps.map((item, i) => (
            <div key={i} style={{ marginBottom: 16 }}>
              <Image src={item.icon} alt={item.title} width={50} height={50} />
              <h3>{item.title}</h3>
              <p style={{ fontSize: 13, color: "#555" }}>{item.desc}</p>
              <p style={{ fontSize: 12, color: "#333", marginTop: 6 }}>{item.extra}</p>
            </div>
          ))}
        </div>

        {/* Features */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "35%", marginTop: 40 }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: 20, color: "#0d1f4c" }}>✨ Features</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, width: "100%" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Image src="/icons/personal.svg" width={32} height={32} alt="Personal" />
              <span>Track income, expenses & savings</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Image src="/icons/chart.svg" width={32} height={32} alt="Charts" />
              <span>Visualize your financial health</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Image src="/icons/clients.svg" width={32} height={32} alt="Clients" />
              <span>Manage clients, quotes & invoices</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Image src="/icons/tips.svg" width={32} height={32} alt="Tips" />
              <span>Receive weekly finance tips</span>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 32 }}>
            <Link href="/personal"><button style={{ padding: "16px 40px", borderRadius: 16, border: "none", cursor: "pointer", background: "#ff6b61", color: "#fff", fontWeight: 700 }}>Personal Mode</button></Link>
            <Link href="/pro"><button style={{ padding: "16px 40px", borderRadius: 16, border: "none", cursor: "pointer", background: "#1f6feb", color: "#fff", fontWeight: 700 }}>Pro Mode</button></Link>
          </div>

          <Image src="/images/dashboard.png" width={350} height={220} style={{ borderRadius: 16, marginTop: 20 }} alt="Dashboard" />

          {/* Socials */}
          <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 16 }}>
            {["fb","tiktok","wa","in","mail"].map((icon, idx)=>(
              <Image key={idx} src={`/images/${icon}.png`} width={32} height={32} alt={icon} />
            ))}
          </div>
        </div>

        {/* Pro Flow */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "30%", marginTop: 40 }}>
          <h2 style={{ color: "#0ea5a0", marginBottom: 24 }}>Pro Flow</h2>
          {proSteps.map((item,i)=>(
            <div key={i} style={{ marginBottom: 16 }}>
              <Image src={item.icon} width={50} height={50} alt={item.title} />
              <h3>{item.title}</h3>
              <p style={{ fontSize: 13, color: "#555" }}>{item.desc}</p>
              <p style={{ fontSize: 12, color: "#333", marginTop: 6 }}>{item.extra}</p>
            </div>
          ))}
        </div>

      </section>

      {/* Footer */}
      <footer style={{ textAlign: "center", padding: 24, borderTop: "1px solid #ccc", fontSize: 13, color: "#555" }}>
        © 2025 Fintrack. All rights reserved. | <Link href="/privacy">Privacy Policy</Link> | <Link href="/terms">Terms of Service</Link>
      </footer>
    </div>
  );
}
