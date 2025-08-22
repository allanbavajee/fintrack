import { useEffect, useState } from "react"

export default function Home() {
  const [clients, setClients] = useState([])

  useEffect(() => {
    fetch("/api/clients", { headers: { "x-user-id": "demo-user" } })
      .then(res => res.json())
      .then(data => setClients(data))
  }, [])

  return (
    <div style={{ padding: "2rem" }}>
      <h1>FinTrack Demo</h1>
      <h2>Clients</h2>
      <ul>
        {clients.map(client => (
          <li key={client.id}>
            {client.company_name} - {client.email} - {client.phone}
          </li>
        ))}
      </ul>
    </div>
  )
}
