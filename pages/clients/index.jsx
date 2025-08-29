/* fintrack/pages/clients/index.jsx */
import { useEffect, useState } from "react";

export default function ClientsPage() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetch("/api/clients")
      .then((res) => res.json())
      .then((data) => setClients(data));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>📋 Clients</h1>
      <a href="/clients/add">+ Ajouter un client</a>
      <ul>
        {clients.map((c) => (
          <li key={c.id}>
            {c.name} - {c.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
