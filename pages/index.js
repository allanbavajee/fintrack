/*fintrack/pages/index.js*/
import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome to FinTrack 🚀</h1>
      <p>Navigate:</p>
      <ul>
        <li><Link href="/clients">Clients</Link></li>
        <li><Link href="/quotes">Quotes</Link></li>
        <li><Link href="/invoices">Invoices</Link></li>
      </ul>
    </div>
  );
}
