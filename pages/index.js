/* pages/index.jsx */
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const personalSteps = [
    { title: "Income", desc: "Track all your personal revenue sources like salary, freelance, or passive income." },
    { title: "Expenses", desc: "Record all monthly expenses: rent, groceries, subscriptions, leisure." },
    { title: "Savings", desc: "Set aside a percentage of your income for savings and emergency funds." },
  ];

  const proSteps = [
    { title: "Clients", desc: "Create and manage client profiles including contacts and company info." },
    { title: "Quotations", desc: "Generate professional quotations quickly and easily." },
    { title: "Invoices", desc: "Convert quotes into invoices, track payments, and manage billing." },
  ];

  return (
    <main style={{ fontFamily: "Inter, Arial, sans-serif" }}>
      {/* Hero Section */}
      <section style={{ textAlign: "center", padding: "80px 24px", background: "#f2f5f8" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: 16 }}>WELCOME TO FINTRACK</h1>
        <p style={{ fontSize: "1.1rem", color: "#555", marginBottom: 32 }}>
          Manage your personal and professional finances with simplicity and clarity.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
          <Link href="/personal">
            <button style={{ padding: "14px 32px", borderRadius: 12, border: "none", background: "#1f6feb", color: "#fff", cursor: "pointer" }}>
              Personal Mode
            </button>
          </Link>
          <Link href="/pro">
            <button style={{ padding: "14px 32px", borderRadius: 12, border: "none", background: "#0ea5a0", color: "#fff", cursor: "pointer" }}>
              Pro Mode
            </button>
          </Link>
        </div>
      </section>

      {/* Flows Section */}
      <section style={{ display: "flex", justifyContent: "space-around", padding: "60px 24px", maxWidth: 1200, margin: "0 auto" }}>
        
        {/* Personal Flow */}
        <div style={{ width: "30%", textAlign: "center" }}>
          <h2 style={{ color: "#1f6feb", marginBottom: 16 }}>Personal Flow</h2>
          {personalSteps.map((step, i) => (
            <div key={i} style={{ marginBottom: 24, padding: 16, borderRadius: 12, background: "#fff", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
              <h3>{step.title}</h3>
              <p style={{ color: "#555" }}>{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Central Illustration */}
        <div style={{ width: "30%", textAlign: "center" }}>
          <Image src="/dash.png" alt="Dashboard" width={300} height={200} style={{ borderRadius: 16 }} />
        </div>

        {/* Pro Flow */}
        <div style={{ width: "30%", textAlign: "center" }}>
          <h2 style={{ color: "#0ea5a0", marginBottom: 16 }}>Pro Flow</h2>
          {proSteps.map((step, i) => (
            <div key={i} style={{ marginBottom: 24, padding: 16, borderRadius: 12, background: "#fff", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
              <h3>{step.title}</h3>
              <p style={{ color: "#555" }}>{step.desc}</p>
            </div>
          ))}
        </div>

      </section>

      {/* Footer */}
      <footer style={{ textAlign: "center", padding: "32px 24px", background: "#f9fafb", borderTop: "1px solid #ddd", color: "#555" }}>
        © 2025 Fintrack. All rights reserved.
      </footer>
    </main>
  );
}

