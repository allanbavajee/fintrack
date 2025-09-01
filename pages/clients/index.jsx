/* pages/clients/index.jsx */
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import Navbar from "../../components/Navbar";

export default function ListClients() {
  const [session, setSession] = useState(null);
  const [clients, setClients] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      if (session) fetchClients(session);
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        if (session) fetchClients(session);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const fetchClients = async (session) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/clients?select=*`, {
        headers: {
          "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          "Authorization": `Bearer ${session.access_token}`
        }
      });

      const data = await res.json();
      if (!res.ok) setMessage(`Erreur : ${JSON.stringify(data)}`);
      else setClients(data);
    } catch (err) {
      setMessage(`Erreur : ${err.message}`);
    }
  };

  if (!session) return (
    <>
      <Navbar /> {/* inclure seulement une fois */}
      <p>Vous devez être connecté pour voir vos clients.</p>
    </>
  );

  return (
    <>
      <Navbar /> {/* inclure seulement une fois */}
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h2>Liste des clients</h2>
        {message && <p>{message}</p>}
        {clients.length === 0 ? (
          <p>Aucun client trouvé.</p>
        ) : (
          <ul>
            {clients.map((client) => (
              <li key={client.id}>
                {client.name} - {client.email}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
