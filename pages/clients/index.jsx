/* fintrack/pages/clients/index.jsx */
import { useEffect, useState } from "react";
import supabase from "../../lib/supabaseClient"; // ✅ client côté navigateur

export default function ClientsPage() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    async function fetchClients() {
      const { data, error } = await supabase.from("clients").select("*");
      if (error) {
        console.error("Erreur Supabase:", error.message);
      } else {
        setClients(data);
      }
    }
    fetchClients();
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Liste des clients</h1>
      {clients.length === 0 ? (
        <p>Aucun client trouvé.</p>
      ) : (
        <ul>
          {clients.map((client) => (
            <li key={client.id}>
              {client.name} — {client.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
