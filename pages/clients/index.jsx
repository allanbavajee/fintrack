/* pages/clients/index.jsx */
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import Link from "next/link";

export default function ClientsPage() {
  const [clients, setClients] = useState([]);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      if (session) fetchClients(session);
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchClients(session);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const fetchClients = async (session) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/clients?select=*`,
      {
        headers: {
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          Authorization: `Bearer ${session.access_token}`,
        },
      }
    );
    const data = await res.json();
    if (res.ok) setClients(data);
  };

  if (!session) return <p>Vous devez être connecté.</p>;

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h2>Liste des clients</h2>
      <Link href="/clients/add">➕ Ajouter un client</Link>
      <ul>
        {clients.map((c) => (
          <li key={c.id}>
            {c.name} ({c.email})
          </li>
        ))}
      </ul>
    </div>
  );
}
