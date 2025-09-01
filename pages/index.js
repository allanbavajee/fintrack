/* pages/index.jsx */
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import Link from "next/link";

export default function Home() {
  const [session, setSession] = useState(null);
  const [mode, setMode] = useState("personal"); // personal or pro
  const [stats, setStats] = useState({ clients: 0, quotes: 0, invoices: 0 });
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({ amount: "", type: "income", description: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      if (!session) return;

      // Load last 10 clients (Pro Mode)
      const { data: clientsData } = await supabase
        .from("clients")
        .select("*")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false })
        .limit(10);

      setStats(prev => ({ ...prev, clients: clientsData?.length || 0 }));

      // Load income/expenses (Personal Mode)
      const { data: incomeData } = await supabase
        .from("personal_finances")
        .select("*")
        .eq("user_id", session.user.id)
        .eq("type", "income");

      const { data: expenseData } = await supabase
        .from("personal_finances")
        .select("*")
        .eq("user_id", session.user.id)
        .eq("type", "expense");

      setIncome(incomeData || []);
      setExpenses(expenseData || []);
    };

    load();
  }, []);

  const toggleMode = () => setMode(mode === "personal" ? "pro" : "personal");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!form.amount || isNaN(form.amount)) {
      setMessage("Please enter a valid amount.");
      return;
    }

    try {
      const { error } = await supabase.from("personal_finances").insert([
        {
          user_id: session.user.id,
          amount: parseFloat(form.amount),
          type: form.type,
          description: form.description || "",
        },
      ]);

      if (error) throw error;

      setMessage("Entry added successfully!");
      setForm({ amount: "", type: "income", description: "" });

      if (form.type === "income") {
        setIncome(prev => [...prev, { ...form, amount: parseFloat(form.amount) }]);
      } else {
        setExpenses(prev => [...prev, { ...form, amount: parseFloat(form.amount) }]);
      }
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

  if (!session) return <p>Please log in to see your dashboard.</p>;

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
      <h1>Welcome to Fintrack 🚀</h1>
      <button onClick={toggleMode} style={{ margin: "20px" }}>
        Switch to {mode === "personal" ? "Pro" : "Personal"} Mode
      </button>

      {mode === "personal" ? (
        <div>
          <h2>Personal Finance</h2>
          {message && <p>{message}</p>}
          <form onSubmit={handleSubmit}>
            <div>
              <label>Amount:</label>
              <input type="number" name="amount" value={form.amount} onChange={handleChange} />
            </div>
            <div>
              <label>Type:</label>
              <select name="type" value={form.type} onChange={handleChange}>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
            <div>
              <label>Description:</label>
              <input type="text" name="description" value={form.description} onChange={handleChange} />
            </div>
            <button type="submit">Add Entry</button>
          </form>

          <h3>Totals</h3>
          <p>Total Income: ${income.reduce((a, b) => a + (b.amount || 0), 0)}</p>
          <p>Total Expenses: ${expenses.reduce((a, b) => a + (b.amount || 0), 0)}</p>
          <p>Savings: ${income.reduce((a, b) => a + (b.amount || 0), 0) - expenses.reduce((a, b) => a + (b.amount || 0), 0)}</p>

          <h3>Weekly Tips</h3>
          <ul>
            <li>Save at least 10% of your income each month.</li>
            <li>Track all your expenses carefully.</li>
            <li>Review your budget weekly.</li>
          </ul>
        </div>
      ) : (
        <div>
          <h2>Pro Mode</h2>
          <p>Last 10 Clients: {stats.clients}</p>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Link href="/clients/add"><button>Add Client</button></Link>
            <Link href="/quotes/create"><button>Create Quote</button></Link>
            <Link href="/invoices/create"><button>Create Invoice</button></Link>
          </div>
        </div>
      )}
    </div>
  );
}
