/*fintrack/pages/invoices.js*/
import { useEffect, useState } from "react";

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetch("/api/invoices")
      .then((res) => res.json())
      .then((data) => setInvoices(data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Invoices</h1>
      <ul className="space-y-2">
        {invoices.map((i) => (
          <li key={i.id} className="p-3 bg-white shadow rounded">
            #{i.id} – {i.client} – {i.amount}€ – {i.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
