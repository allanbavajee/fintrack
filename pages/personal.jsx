// pages/personal.jsx
import { useState } from "react";
import Header from "../components/Header";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

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

  // Données pour PieChart
  const chartData = [
    { name: "Income", value: totalIncome },
    { name: "Expense", value: totalExpense },
  ];
  const COLORS = ["#1f6feb", "#ff6b61"];

  return (
    <div style={{ minHeight: "100vh", background: "#fafafa" }}>
      {/* ✅ Header dynamique */}
      <Header />

      <main style={{ maxWidth: 1000, margin: "40px auto", padding: "0 16px" }}>
        <h1 style={{ textAlign: "center", color: "#0d1f4c", marginBottom: 32 }}>
          Personal Finance Dashboard
        </h1>

        {/* Résumé rapide */}
        <div style={{ display: "flex", justifyContent: "space-around", marginBottom: 32 }}>
          {[{ label: "Balance", value: balance.toFixed(2) },
            { label: "Income", value: totalIncome.toFixed(2) },
            { label: "Expense", value: totalExpense.toFixed(2) }
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                background: "#f5f5f5",
                borderRadius: 12,
                padding: "16px 24px",
                width: 140,
                textAlign: "center",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
              }}
            >
              <strong>{item.label}</strong>
              <p style={{ margin: "8px 0 0", fontSize: 18, color: "#333" }}>
                {item.value} €
              </p>
            </div>
          ))}
        </div>

        {/* Graphique */}
        <div style={{ height: 300, marginBottom: 40 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Formulaire Ajout */}
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
        <section style={{ marginBottom: 40 }}>
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

        {/* Guide d’utilisation */}
        <section style={{ marginTop: 40, background: "#fff", padding: 24, borderRadius: 12, boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
          <h2 style={{ color: "#0d1f4c", marginBottom: 16 }}>How to use this dashboard?</h2>
          <ul style={{ lineHeight: "1.8", color: "#444" }}>
            <li>➕ Enter an <b>income</b> and click <b>Add Income</b>.</li>
            <li>➖ Enter an <b>expense</b> and click <b>Add Expense</b>.</li>
            <li>📊 Visualize your balance with the Pie Chart.</li>
            <li>📝 Track every transaction in the history list.</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
