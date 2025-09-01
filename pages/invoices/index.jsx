/* pages/invoices/index.jsx */
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

export default function InvoicesList() {
  const [invoices, setInvoices] = useState([]);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      if (session) {
        const { data, error } = await supabase
          .from("invoices")
          .select("id, amount, created_at, clients(name)")
          .eq("user_id", session.user.id)
          .order("created_at", { ascending: false });

        if (!error) setInvoices(data || []);
      }
      setLoading(false);
    };

    load();
  }, []);

  if (loading) return <p>Chargement...</p>;

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h2>Factures</h2>
      <Link href="/invoices/create">
        <button>➕ Créer une facture</button>
      </Link>
      {invoices.length === 0 ? (
        <p>Aucune facture trouvée.</p>
      ) : (
        <table border="1" cellPadding="5" style={{ marginTop: "20px", width: "100%" }}>
          <thead>
            <tr>
              <th>Client</th>
              <th>Montant</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((i) => (
              <tr key={i.id}>
                <td>{i.clients?.name || "Inconnu"}</td>
                <td>{i.amount} €</td>
                <td>{new Date(i.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
