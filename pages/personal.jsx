// pages/personal.jsx
import { useState } from "react";
import Header from "../components/Header";

export default function Personal() {
  const [transactions, setTransactions] = useState([]);
  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [notes, setNotes] = useState("");

  const addTransaction = () => {
    if (!amount || !category) return;
    setTransactions(prev => [
      ...prev,
      { type, amount: parseFloat(amount), category, notes, date: new Date().toLocaleDateString() }
    ]);
    setAmount(""); setCategory(""); setNotes("");
  };

  const totalIncome = transactions.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
    <>
      <Header />

      <main style={{ maxWidth: 800, margin: "20px auto", padding: "0 16px", fontFamily: "Inter, sans-serif" }}>
        <h1 style={{ textAlign: "center", marginBottom: 24 }}>Personal Finance Dashboard</h1>

        {/* Summary */}
        <div style={{ display: "flex", justifyContent: "space-around", marginBottom: 32 }}>
          {[
            { label: "Balance", value: balance.toFixed(2) },
            { label: "Income", value: totalIncome.toFixed(2) },
            { label: "Expense", value: totalExpense.toFixed(2) }
          ].map((item, idx) => (
            <div key={idx} style={{
              background: "#f5f5f5", borderRadius: 12,
              padding: "16px 24px", width: 120, textAlign: "center"
            }}>
              <strong>{item.label}</strong>
              <p style={{ margin: "8px 0 0", fontSize: 18, color: "#333" }}>{item.value} €</p>
            </div>
          ))}
        </div>

        {/* Input form */}
        <div style={{ marginBottom: 32, padding: 16, border: "1px solid #ddd", borderRadius: 12 }}>
          <h2>Add Transaction</h2>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
            <select style={selectStyle} value={type} onChange={e => setType(e.target.value)}>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <input style={inputStyle} type="number" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
            <input style={inputStyle} type="text" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
            <input style={inputStyle} type="text" placeholder="Notes" value={notes} onChange={e => setNotes(e.target.value)} />
            <button style={btnStyle} onClick={addTransaction}>Add</button>
          </div>
        </div>

        {/* Transaction history */}
        <div>
          <h2>History</h2>
          {transactions.length === 0 ? (
            <p>No transactions yet.</p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Date", "Type", "Amount", "Category", "Notes"].map((h, i) => (
                    <th key={i} style={{ textAlign: "left", padding: "8px 4px", borderBottom: "2px solid #ddd" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {transactions.map((t, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={tdStyle}>{t.date}</td>
                    <td style={tdStyle}>{t.type}</td>
                    <td style={tdStyle}>{t.amount.toFixed(2)} €</td>
                    <td style={tdStyle}>{t.category}</td>
                    <td style={tdStyle}>{t.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </>
  );
}

const inputStyle = {
  padding: "10px", borderRadius: 6, border: "1px solid #ccc", flex: "1 1 120px"
};
const selectStyle = { ...inputStyle, width: 140 };
const btnStyle = {
  padding: "10px 20px", borderRadius: 6, border: "none", background: "#1f6feb", color: "#fff",
  cursor: "pointer", fontWeight: 600
};
const tdStyle = { padding: "8px 4px" };
