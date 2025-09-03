/* pages/personal.jsx */
import { useState } from "react";

export default function PersonalMode() {
  // Transactions
  const [transactions, setTransactions] = useState([]);
  const [type, setType] = useState("expense"); // expense ou income
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [notes, setNotes] = useState("");

  // Ratios
  const [expenseRatio, setExpenseRatio] = useState(33);
  const [savingsRatio, setSavingsRatio] = useState(33);
  const [leisureRatio, setLeisureRatio] = useState(34);

  // Ajouter transaction
  const addTransaction = () => {
    if (!amount || !category) return;
    setTransactions([...transactions, { type, amount: parseFloat(amount), category, notes, date: new Date() }]);
    setAmount(""); setCategory(""); setNotes("");
  };

  // Calculs
  const totalIncome = transactions.filter(t => t.type === "income").reduce((a,b)=>a+b.amount,0);
  const totalExpense = transactions.filter(t => t.type === "expense").reduce((a,b)=>a+b.amount,0);
  const savingsGoal = totalIncome * (savingsRatio / 100);

  // Conseils
  let advice = "";
  if (totalExpense > totalIncome * (expenseRatio/100)) {
    advice = "Attention : tes dépenses dépassent le ratio conseillé !";
  } else if (totalExpense < totalIncome * (expenseRatio/100)) {
    advice = "Bien joué ! Tes dépenses sont sous le ratio prévu.";
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", fontFamily: "Inter, Arial, sans-serif", padding: 16 }}>
      <h1 style={{ textAlign: "center", marginBottom: 24 }}>Personal Finance Coach</h1>

      {/* Dashboard résumé */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 32 }}>
        <div style={{ textAlign: "center" }}>
          <h3>Solde</h3>
          <p style={{ fontSize: 24, fontWeight: 600 }}>{(totalIncome - totalExpense).toFixed(2)} €</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <h3>Revenus</h3>
          <p style={{ fontSize: 24, fontWeight: 600 }}>{totalIncome.toFixed(2)} €</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <h3>Dépenses</h3>
          <p style={{ fontSize: 24, fontWeight: 600 }}>{totalExpense.toFixed(2)} €</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <h3>Épargne Objectif</h3>
          <p style={{ fontSize: 24, fontWeight: 600 }}>{savingsGoal.toFixed(2)} €</p>
        </div>
      </div>

      {/* Ajouter Transaction */}
      <div style={{ marginBottom: 32 }}>
        <h2>Ajouter une transaction</h2>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <select value={type} onChange={e=>setType(e.target.value)}>
            <option value="expense">Dépense</option>
            <option value="income">Revenu</option>
          </select>
          <input type="number" placeholder="Montant" value={amount} onChange={e=>setAmount(e.target.value)} />
          <input type="text" placeholder="Catégorie" value={category} onChange={e=>setCategory(e.target.value)} />
          <input type="text" placeholder="Notes" value={notes} onChange={e=>setNotes(e.target.value)} />
          <button onClick={addTransaction} style={{ background:"#1f6feb", color:"#fff", padding:"8px 16px", borderRadius:6 }}>Ajouter</button>
        </div>
      </div>

      {/* Historique */}
      <div style={{ marginBottom: 32 }}>
        <h2>Historique des transactions</h2>
        {transactions.length === 0 ? <p>Aucune transaction</p> :
          <table style={{ width: "100%", borderCollapse:"collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #ccc" }}>
                <th style={{ textAlign:"left" }}>Date</th>
                <th style={{ textAlign:"left" }}>Type</th>
                <th style={{ textAlign:"left" }}>Montant</th>
                <th style={{ textAlign:"left" }}>Catégorie</th>
                <th style={{ textAlign:"left" }}>Notes</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t,i)=>(
                <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                  <td>{t.date.toLocaleDateString()}</td>
                  <td>{t.type}</td>
                  <td>{t.amount.toFixed(2)} €</td>
                  <td>{t.category}</td>
                  <td>{t.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        }
      </div>

      {/* Ratios et Conseils */}
      <div style={{ marginBottom: 32 }}>
        <h2>Ratios financiers</h2>
        <p>Dépenses : <input type="number" value={expenseRatio} onChange={e=>setExpenseRatio(parseInt(e.target.value))} /> %</p>
        <p>Épargne : <input type="number" value={savingsRatio} onChange={e=>setSavingsRatio(parseInt(e.target.value))} /> %</p>
        <p>Loisirs : <input type="number" value={leisureRatio} onChange={e=>setLeisureRatio(parseInt(e.target.value))} /> %</p>
        <div style={{ marginTop:16, padding:16, background:"#f0f8ff", borderRadius:8 }}>
          <strong>Conseil : </strong> {advice || "Gérez vos finances pour respecter vos objectifs."}
        </div>
      </div>
    </div>
  )
}
