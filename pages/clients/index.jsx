/* fintrack/pages/clients/index.jsx */
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function ClientsPage() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      setError("");

      const { data, error } = await supabase.from("clients").select("*");

      if (error) {
        setError("Erreur lors de la récupération des clients: " + error.message);
      } else {
        setClients(data);
      }

      setLoading(false);
    };

    fetchClients();
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Liste des clients</h1>
      {loading && <p>Chargement...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {clients.length === 0 && !loading && <p>Aucun client trouvé.</p>}
      <ul>
        {clients.map((client) => (
          <li key={client.id}>
            <strong>{client.company_name}</strong> - {client.email} - {client.phone}
          </li>
        ))}
      </ul>
    </div>
  );
}
