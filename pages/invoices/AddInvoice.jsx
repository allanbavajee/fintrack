// pages/invoices/AddInvoice.jsx
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function AddInvoice({ clientId, quoteId }) {
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("draft");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data: { session } } = await supabase.auth.getSession();

    const res = await fetch("/api/invoices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session.access_token}`
      },
      body: JSON.stringify({
        client_id: clientId,  // passer le clientId
        quote_id: quoteId,    // passer le quoteId
        amount: parseFloat(amount),
        status
      })
    });

    const data = await res.json();
    if (res.ok) setMessage("Invoice created ✅");
    else setMessage("Error: " + data.error.message);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
      <select value={status} onChange={e => setStatus(e.target.value)}>
        <option value="draft">Draft</option>
        <option value="sent">Sent</option>
      </select>
      <button type="submit">Create Invoice</button>
      <p>{message}</p>
    </form>
  );
}
