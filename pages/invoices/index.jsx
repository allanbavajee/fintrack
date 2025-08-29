/* fintrack/pages/invoices/index.jsx */
import { useEffect, useState } from "react";

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetch("/api/invoices")
      .then((res) => res.json())
      .then((data) => setInvoices(data));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>💰 Factures</h1>
      <ul>
        {invoices.map((i) => (
          <li key={i.id}>
            Client {i.client_id} : {i.amount}€ - {i.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
