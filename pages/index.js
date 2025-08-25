import { useEffect, useState } from "react"

export default function Home() {
  const [clients, setClients] = useState([])
  const [quotes, setQuotes] = useState([])
  const [clientForm, setClientForm] = useState({
    company_name: "",
    email: "",
    phone: "",
    contact_name: ""
  })
  const [quoteForm, setQuoteForm] = useState({
    client_id: "",
    total: "",
    status: "draft"
  })
  const [error, setError] = useState(null)
  const [loadingClient, setLoadingClient] = useState(false)
  const [loadingQuote, setLoadingQuote] = useState(false)

  // Récupérer les clients
  const fetchClients = async () => {
    try {
      const res = await fetch("/api/clients")
      if (!res.ok) throw new Error(await res.text())
      const data = await res.json()
      setClients(Array.isArray(data) ? data.filter(c => c != null) : [])
    } catch (err) {
      console.error("Fetch clients error:", err)
      setError(err.message)
    }
  }

  // Récupérer les quotes
  const fetchQuotes = async () => {
    try {
      const res = await fetch("/api/quotes")
      if (!res.ok) throw new Error(await res.text())
      const data = await res.json()
      setQuotes(Array.isArray(data) ? data.filter(q => q != null) : [])
    } catch (err) {
      console.error("Fetch quotes error:", err)
      setError(err.message)
    }
  }

  useEffect(() => {
    fetchClients()
    fetchQuotes()
  }, [])

  // Ajouter un client
  const handleClientSubmit = async (e) => {
    e.preventDefault()
    setLoadingClient(true)
    setError(null)

    try {
      const res = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clientForm)
      })
      if (!res.ok) throw new Error(await res.text())
      const result = await res.json()
      const newClient = Array.isArray(result) ? result[0] : result
      if (newClient) {
        setClients([...clients, newClient])
        setClientForm({ company_name: "", email: "", phone: "", contact_name: "" })
      }
    } catch (err) {
      console.error("Add client error:", err)
      setError(err.message)
    } finally {
      setLoadingClient(false)
    }
  }

  // Ajouter un quote
  const handleQuoteSubmit = async (e) => {
    e.preventDefault()
    setLoadingQuote(true)
    setError(null)

    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quoteForm)
      })
      if (!res.ok) throw new Error(await res.text())
      const result = await res.json()
      const newQuote = Array.isArray(result) ? result[0] : result
      if (newQuote) {
        setQuotes([...quotes, newQuote])
        setQuoteForm({ client_id: "", total: "", status: "draft" })
      }
    } catch (err) {
      console.error("Add quote error:", err)
      setError(err.message)
    } finally {
      setLoadingQuote(false)
    }
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>FinTrack Demo</h1>

      <h2>Clients</h2>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <ul>
        {clients.map(client => (
          <li key={client.id}>
            {client.company_name} - {client.contact_name} - {client.email} - {client.phone}
          </li>
        ))}
      </ul>

      <h3>Add a new client</h3>
      <form onSubmit={handleClientSubmit} style={{ marginBottom: "2rem" }}>
        <input type="text" placeholder="Company Name" value={clientForm.company_name} onChange={e => setClientForm({...clientForm, company_name: e.target.value})} required style={{ display: "block", marginBottom: "0.5rem" }}/>
        <input type="text" placeholder="Contact Name" value={clientForm.contact_name} onChange={e => setClientForm({...clientForm, contact_name: e.target.value})} required style={{ display: "block", marginBottom: "0.5rem" }}/>
        <input type="email" placeholder="Email" value={clientForm.email} onChange={e => setClientForm({...clientForm, email: e.target.value})} required style={{ display: "block", marginBottom: "0.5rem" }}/>
        <input type="text" placeholder="Phone" value={clientForm.phone} onChange={e => setClientForm({...clientForm, phone: e.target.value})} required style={{ display: "block", marginBottom: "0.5rem" }}/>
        <button type="submit" disabled={loadingClient}>{loadingClient ? "Adding..." : "Add Client"}</button>
      </form>

      <h2>Quotes</h2>
      <ul>
        {quotes.map(quote => {
          const client = clients.find(c => c.id === quote.client_id)
          return (
            <li key={quote.id}>
              {client ? client.company_name : "Unknown client"} - Total: {quote.total} - Status: {quote.status}
            </li>
          )
        })}
      </ul>

      <h3>Add a new quote</h3>
      <form onSubmit={handleQuoteSubmit}>
        <select value={quoteForm.client_id} onChange={e => setQuoteForm({...quoteForm, client_id: e.target.value})} required style={{ display: "block", marginBottom: "0.5rem" }}>
          <option value="">Select Client</option>
          {clients.map(client => (
            <option key={client.id} value={client.id}>{client.company_name}</option>
          ))}
        </select>
        <input type="number" placeholder="Total" value={quoteForm.total} onChange={e => setQuoteForm({...quoteForm, total: e.target.value})} required style={{ display: "block", marginBottom: "0.5rem" }}/>
        <select value={quoteForm.status} onChange={e => setQuoteForm({...quoteForm, status: e.target.value})} style={{ display: "block", marginBottom: "0.5rem" }}>
          <option value="draft">Draft</option>
          <option value="sent">Sent</option>
          <option value="paid">Paid</option>
        </select>
        <button type="submit" disabled={loadingQuote}>{loadingQuote ? "Adding..." : "Add Quote"}</button>
      </form>
    </div>
  )
}
