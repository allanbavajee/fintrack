/*fintrack/pages/clients/index.jsx*/
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClients = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setError("Please login first");
        return;
      }
      const token = session.access_token;
      try {
        const res = await fetch("/api/clients", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok) setClients(data);
        else setError(data.error);
      } catch {
        setError("Failed to load clients");
      }
    };
    fetchClients();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Clients</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {clients.map(c => (
          <li key={c.id}>{c.company_name} ({c.email})</li>
        ))}
      </ul>
    </div>
  );
}
