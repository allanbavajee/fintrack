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
        console.error("Erreur fetching clients:", error);
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
      <h1>Liste des clients</h1>
      {clients.length === 0 ? (
        <p>Aucun client trouvé.</p>
      ) : (
        <ul>
          {clients.map((c) => (
            <li key={c.id}>
              {c.company_name} - {c.contact_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
