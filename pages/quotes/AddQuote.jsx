// pages/quotes/AddQuote.jsx
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function AddQuote({ clientId }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("draft");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data: { session } } = await supabase.auth.getSession();

    const res = await fetch("/api/quotes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session.access_token}`
      },
      body: JSON.stringify({
        client_id: clientId,   // tu dois passer le clientId depuis ton état ou sélection
        description,
        quantity,
        amount: parseFloat(amount),
        status
      })
    });

    const data = await res.json();
    if (res.ok) setMessage("Quote created ✅");
    else setMessage("Error: " + data.error.message);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <input type="number" placeholder="Quantity" value={quantity} onChange={e => setQuantity(e.target.value)} />
      <input type="number" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
      <select value={status} onChange={e => setStatus(e.target.value)}>
        <option value="draft">Draft</option>
        <option value="sent">Sent</option>
