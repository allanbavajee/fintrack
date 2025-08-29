/* fintrack/pages/clients/index.jsx */
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      const { data, error } = await supabase.from("clients").select("*");
      if (error) {
        console.error("Erreur récupération clients:", error.message);
      } else {
        setClients(data);
      }
      setLoading(false);
    };
    fetchClients();
  }, []);

  if (loading) return <p>Chargement...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>📋 Liste des Clients</h1>
      {clients.length === 0 ? (
        <p>Aucun client trouvé.</p>
      ) : (
        <ul>
          {clients.map((client) => (
            <li key={client.id}>
              <strong>{client.company_name}</strong> – {client.contact_name} ({client.email})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
