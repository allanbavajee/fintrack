// fintrack/pages/invoices.js
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function InvoicesPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ client_id: "", date: "", description: "", quantity: 1, amount: 0, status: "Draft" });
  const [msg, setMsg] = useState(null);

  const load = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;
    const res = await fetch("/api/invoices", { headers: { Authorization: `Bearer ${session.access_token}` } });
    const data = await res.json();
    if (!data?.error) setItems(data);
    else setMsg(data.error);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setMsg(null);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return setMsg("Not logged in");

    const res = await fetch("/api/invoices", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.access_token}` },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      setItems([data, ...items]);
      setForm({ client_id: "", date: "", description: "", quantity: 1, amount: 0, status: "Draft" });
      setMsg("Invoice created ✅");
    } else {
      setMsg(data.error || "Error");
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>Invoices</h1>
      <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 420 }}>
        <input placeholder="Client ID" value={form.client_id} onChange={(e) => setForm((f) => ({ ...f, client_id: e.target.value }))} />
        <input type="date" placeholder="Date" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} />
        <input placeholder="Description" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
        <input type="number" placeholder="Quantity" value={form.quantity} onChange={(e) => setForm((f) => ({ ...f, quantity: Number(e.target.value) }))} />
        <input type="number" placeholder="Amount" value={form.amount} onChange={(e) => setForm((f) => ({ ...f, amount: Number(e.target.value) }))} />
        <select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}>
          <option>Draft</option>
          <option>Sent</option>
          <option>Paid</option>
        </select>
        <button type="submit">Add Invoice</button>
      </form>
      {msg && <p>{msg}</p>}

      <h3 style={{ marginTop: 16 }}>All Invoices</h3>
      <ul>
        {items.map((i) => (
          <li key={i.id}>
            {i.description} — {i.amount} — {i.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
