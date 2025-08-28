/*fintrack/pages/clients.js*/
import { useEffect, useState } from "react";

export default function Clients() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetch("/api/clients")
      .then((res) => res.json())
      .then((data) => setClients(data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Clients</h1>
      <ul className="space-y-2">
        {clients.map((c) => (
          <li key={c.id} className="p-3 bg-white shadow rounded">
            {c.name} – {c.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
