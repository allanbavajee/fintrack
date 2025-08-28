/* fintrack/pages/index.jsx */
export default function Home() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Bienvenue sur Fintrack 🚀</h1>
      <p>Utilise le menu pour naviguer :</p>
      <ul>
        <li><a href="/clients">Clients</a></li>
        <li><a href="/quotes">Quotes</a></li>
        <li><a href="/invoices">Invoices</a></li>
      </ul>
    </div>
  );
}
