import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function AddQuote() {
  const [client_id, setClientId] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("pending");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !session) {
      setMessage("You must be logged in to create a quote.");
      return;
    }

    const token = session.access_token;

    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ client_id, amount, status })
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Quote created ✅");
        setClientId(""); setAmount(""); setStatus("pending");
      } else {
        setMessage("Error: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setMessage("Error connecting to server");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
      <input placeholder="Client ID" value={client_id} onChange={e => setClientId(e.target.value)} />
      <input placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
      <select value={status} onChange={e => setStatus(e.target.value)}>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </select>
      <button type="submit">Create Quote</button>
      {message && <p>{message}</p>}
    </form>
  );
}
