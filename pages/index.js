/*fintrack/pages/index.js*/
export default function Home() {
  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>🚀 Bienvenue sur FinTrack</h1>
      <p>Suivi de vos clients, devis et factures avec Supabase + Next.js.</p>

      <ul>
        <li><a href="/clients">📂 Clients</a></li>
        <li><a href="/quotes">📝 Devis</a></li>
        <li><a href="/invoices">💳 Factures</a></li>
      </ul>
    </div>
  );
}
