/*fintrack/pages/invoices/index.jsx*/
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInvoices = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setError("Please login first");
        return;
      }
      const token = session.access_token;
      try {
        const res = await fetch("/api/invoices", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok) setInvoices(data);
        else setError(data.error);
      } catch {
        setError("Failed to load invoices");
      }
    };
    fetchInvoices();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Invoices</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {invoices.map(i => (
          <li key={i.id}>Invoice #{i.id} - {i.amount}</li>
        ))}
      </ul>
    </div>
  );
}
