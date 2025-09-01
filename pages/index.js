/* pages/index.js */
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import Link from "next/link";

export default function Dashboard() {
  const [session, setSession] = useState(null);
  const [stats, setStats] = useState({ clients: 0, quotes: 0, invoices: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      if (!session) {
        setLoading(false);
        return;
      }

      try {
        // Récupération des counts avec RLS
        const [{ count: clients }, { count: quotes }, { count: invoices }] = await Promise.all([
          supabase.from("clients").select("*", { count: "exact" }).eq("user_id", session.user.id),
          supabase.from("quotes").select("*", { count: "exact" }).eq("user_id", session.user.id),
          supabase.from("invoices").select("*", { count: "exact" }).eq("user_id", session.user.id),
        ]);

        setStats({ clients, quotes, invoices });
      } catch (error) {
        console.error("Erreur chargement dashboard :", error);
      }
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) return <p>Chargement du dashboard...</p>;
  if (!session) return <p>Veuillez vous connecter pour voir votre dashboard.</p>;

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
      <h1>Bienvenue sur Fintrack 🚀</h1>

      <div style={{ display: "flex", justifyContent: "space-around", marginTop: 40 }}>
        <div style={{ border: "1px solid #ddd", padding: 20, borderRadius: 8 }}>
          <h3>Clients</h3>
          <p style={{ fontSize: 24 }}>{stats.clients}</p>
          <Link href="/clients"><button>Voir les clients</button></Link>
          <br />
          <Link href="/clients/add"><button style={{ marginTop: 5 }}>➕ Ajouter Client</button></Link>
        </div>

        <div style={{ border: "1px solid #ddd", padding: 20, borderRadius: 8 }}>
          <h3>Devis</h3>
          <p style={{ fontSize: 24 }}>{stats.quotes}</p>
          <Link href="/quotes"><button>Voir les devis</button></Link>
          <br />
          <Link href="/quotes/create"><button style={{ marginTop: 5 }}>➕ Créer Devis</button></Link>
        </div>

        <div style={{ border: "1px solid #ddd", padding: 20, borderRadius: 8 }}>
          <h3>Factures</h3>
          <p style={{ fontSize: 24 }}>{stats.invoices}</p>
          <Link href="/invoices"><button>Voir les factures</button></Link>
          <br />
          <Link href="/invoices/create"><button style={{ marginTop: 5 }}>➕ Créer Facture</button></Link>
        </div>
      </div>
    </div>
  );
}

