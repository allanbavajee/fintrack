import { useEffect, useState } from "react"

export default function Home() {
  const [clients, setClients] = useState([])
  const [form, setForm] = useState({
    company_name: "",
    email: "",
    phone: "",
    contact_name: ""
  })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  // Récupérer les clients existants
  const fetchClients = async () => {
    try {
      const res = await fetch("/api/clients")
      if (!res.ok) throw new Error(await res.text())
      const data = await res.json()
      setClients(data)
    } catch (err) {
      console.error("Fetch clients error:", err)
      setError(err.message)
    }
  }

  useEffect(() => {
    fetchClients()
  }, [])

  // Ajouter un client
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      })
      if (!res.ok) throw new Error(await res.text())
      const newClient = await res.json()
      setClients([...clients, newClient])
      setForm({ company_name: "", email: "", phone: "", contact_name: "" })
    } catch (err) {
      console.error("Add client error:", err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>FinTrack Demo</h1>
      <h2>Clients</h2>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <ul>
        {Array.isArray(clients) && clients.map(client => (
          <li key={client.id}>
            {client.company_name} - {client.email} - {client.phone} - {client.contact_name}
          </li>
        ))}
      </ul>

      <h3>Add a new client</h3>
      <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
        <input
          type="text"
          placeholder="Company Name"
          value={form.company_name}
          onChange={e => setForm({ ...form, company_name: e.target.value })}
          required
          style={{ display: "block", marginBottom: "0.5rem" }}
        />
        <input
          type="text"
          placeholder="Contact Name"
          value={form.contact_name}
          onChange={e => setForm({ ...form, contact_name: e.target.value })}
          required
          style={{ display: "block", marginBottom: "0.5rem" }}
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          required
          style={{ display: "block", marginBottom: "0.5rem" }}
        />
        <input
          type="text"
          placeholder="Phone"
          value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })}
          required
          style={{ display: "block", marginBottom: "0.5rem" }}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Client"}
        </button>
      </form>
    </div>
  )
}
