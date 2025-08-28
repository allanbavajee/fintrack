// fintrack/pages/clients.js
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function ClientsPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ company_name: "", brn: "", email: "", phone: "", contact_name: "" });
  const [msg, setMsg] = useState(null);

  const load = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;
    const res = await fetch("/api/clients", { headers: { Authorization: `Bearer ${session.access_token}` } });
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

    const res = await fetch("/api/clients", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.access_token}` },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      setItems([data, ...items]);
      setForm({ company_name: "", brn: "", email: "", phone: "", contact_name: "" });
      setMsg("Client created ✅");
    } else {
      setMsg(data.error || "Error");
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>Clients</h1>
      <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 420 }}>
        <input placeholder="Company Name" value={form.company_name} onChange={(e) => setForm((f) => ({ ...f, company_name: e.target.value }))} />
        <input placeholder="BRN" value={form.brn} onChange={(e) => setForm((f) => ({ ...f, brn: e.target.value }))} />
        <input placeholder="Email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
        <input placeholder="Phone" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} />
        <input placeholder="Contact Name" value={form.contact_name} onChange={(e) => setForm((f) => ({ ...f, contact_name: e.target.value }))} />
        <button type="submit">Add Client</button>
      </form>
      {msg && <p>{msg}</p>}

      <h3 style={{ marginTop: 16 }}>All Clients</h3>
      <ul>
        {items.map((c) => (
          <li key={c.id}>
            {c.company_name} — {c.email} — {c.phone}
          </li>
        ))}
      </ul>
    </div>
  );
}
