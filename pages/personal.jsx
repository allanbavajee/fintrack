// pages/personal.jsx
import { useState } from "react";
import Header from "../components/Header";

export default function Personal() {
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState("");
  const [expense, setExpense] = useState("");
  const [history, setHistory] = useState([]);

  const addIncome = () => {
    if (!income) return;
    const value = parseFloat(income);
    if (isNaN(value)) return;
    setBalance(balance + value);
    setHistory([...history, { type: "income", amount: value }]);
    setIncome("");
  };

  const addExpense = () => {
    if (!expense) return;
    const value = parseFloat(expense);
    if (isNaN(value)) return;
    setBalance(balance - value);
    setHistory([...history, { type: "expense", amount: value }]);
    setExpense("");
  };

  const totalIncome = history
    .filter((h) => h.type === "income")
    .reduce((sum, h) => sum + h.amount, 0);

  const totalExpense = history
    .filter((h) => h.type === "expense")
    .reduce((sum, h) => sum + h.amount, 0);

  // Pourcentage pour Pie Chart
  const total = totalIncome + totalExpense;
  const incomePercent = total > 0 ? (totalIncome / total) * 360 : 0;

  return (
    <div style={{ minHeight: "100vh", background: "#fafafa" }}>
      <Header />

      <main style={{ maxWidth: 900, margin: "40px auto", padding: "0 16px" }}>
        <h1 style={{ textAlign: "center", color: "#0d1f4c", marginBottom: 32 }}>
          Personal Finance Dashboard
        </h1>

        {/* Résumé */}
        <div style={{ display: "flex", justifyContent: "space-around", marginBottom: 32 }}>
          {[
            { label: "Balance", value: balance.toFixed(2) },
            { label: "Income", value: totalIncome.toFixed(2) },
            { label: "Expense", value: totalExpense.toFixed(2) },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                background: "#fff",
                borderRadius: 12,
                padding: "16px 24px",
                width: 140,
                textAlign: "center",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}
            >
              <strong>{item.label}</strong>
              <p style={{ margin: "8px 0 0", fontSize: 18, color: "#333" }}>
                {item.value} €
              </p>
            </div>
          ))}
        </div>

        {/* Pie Chart Income vs Expense */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 40 }}>
          <div
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              background: `conic-gradient(#1f6feb ${incomePercent}deg, #ff6b61 0)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 600,
              color: "#0d1f4c",
            }}
          >
            {total > 0 ? `${Math.round((totalIncome / total) * 100)}% Income` : "No Data"}
          </div>
        </div>

        {/* Ajout */}
        <div style={{ display: "flex", justifyContent: "center", gap: 20, marginBottom: 40 }}>
          <div>
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="Enter income"
              style={{ padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
            />
            <button
              onClick={addIncome}
              style={{
                marginLeft: 8,
                padding: "10px 20px",
                borderRadius: 8,
                border: "none",
                background: "#1f6feb",
                color: "#fff",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Add Income
            </button>
          </div>

          <div>
            <input
              type="number"
              value={expense}
              onChange={(e) => setExpense(e.target.value)}
              placeholder="Enter expense"
              style={{ padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
            />
            <button
              onClick={addExpense}
              style={{
                marginLeft: 8,
                padding: "10px 20px",
                borderRadius: 8,
                border: "none",
                background: "#ff6b61",
                color: "#fff",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Add Expense
            </button>
          </div>
        </div>

        {/* Historique */}
        <section>
          <h2 style={{ marginBottom: 16, color: "#0d1f4c" }}>Transaction History</h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {history.map((item, idx) => (
              <li
                key={idx}
                style={{
                  marginBottom: 10,
                  padding: "10px 16px",
                  borderRadius: 8,
                  background: item.type === "income" ? "#e6f4ea" : "#fdecea",
                  color: item.type === "income" ? "#137333" : "#b3261e",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>{item.type === "income" ? "Income" : "Expense"}</span>
                <span>{item.amount} €</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Guide utilisateur */}
        <section style={{ marginTop: 40 }}>
          <h2 style={{ color: "#0d1f4c", marginBottom: 12 }}>📘 How to use</h2>
          <p style={{ color: "#555", lineHeight: 1.6 }}>
            1. Enter your income and expense values in the fields above.<br />
            2. Click <b>Add Income</b> or <b>Add Expense</b> to update your balance.<br />
            3. The <b>Pie Chart</b> shows the proportion of income vs expense.<br />
            4. Track all your transactions in the <b>History</b> section.<br />
            5. Use this tool regularly to manage your personal budget.
          </p>
        </section>
      </main>
    </div>
  );
}
