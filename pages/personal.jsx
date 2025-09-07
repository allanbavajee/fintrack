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
                background: "#f5f5f5",
                borderRadius: 12,
                padding: "16px 24px",
                width: 120,
                textAlign: "center",
              }}
            >
              <strong>{item.label}</strong>
              <p style={{ margin: "8px 0 0", fontSize: 18, color: "#333" }}>
                {item.value} €
              </p>
            </div>
          ))}
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
      </main>
    </div>
  );
}
