import { useEffect, useState } from "react"

export default function Home() {
  const [clients, setClients] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch("/api/clients", {
      headers: {
        "x-user-id": "demo-user",
        "Content-Type": "application/json"
      }
    })
      .then(async res => {
        if (!res.ok) {
          const text = await res.text()
          throw new Error(text || "Erreur API")
        }
        return res.json()
      })
      .then(data => setClients(data))
      .catch(err => {
        console.error("Fetch error:", err)
        setError(err.message)
      })
  }, [])

  return (
    <div style={{ padding: "2rem" }}>
      <h1>FinTrack Demo</h1>
      <h2>Clients</h2>

      {error && <p style={{ color: "red" }}>Erreur: {error}</p>}

      <ul>
        {Array.isArray(clients) && clients.map(client => (
          <li key={client.id}>
            {client.company_name} - {client.email} - {client.phone}
          </li>
        ))}
      </ul>
    </div>
  )
}
