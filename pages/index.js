import { useEffect, useState } from "react"

export default function QuotesPage() {
  const [clients, setClients] = useState([])
  const [quotes, setQuotes] = useState([])

  // Formulaire pour ajouter une quote
  const [form, setForm] = useState({
    client_id: "",
    date: "",
    description: "",
    quantity: 1,
    price: 0,
    status: "draft"
  })

  useEffect(() => {
    // Fetch clients
    fetch("/api/clients", { headers: { "x-user-id": "demo-user" } })
      .then(res => res.json())
      .then(data => setClients(data))

    // Fetch quotes
    fetch("/api/quotes", { headers: { "x-user-id": "demo-user" } })
      .then(res => res.json())
      .then(data => setQuotes(data))
  }, [])

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const res = await fetch("/api/quotes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-user-id": "demo-user"
      },
      body: JSON.stringify(form)
    })
    const data = await res.json()
    if (!res.ok) {
      alert(`Error: ${data.error.message || "Unknown error"}`)
      return
    }
    setQuotes(prev => [...prev, data])
    // Reset form
    setForm({ client_id: "", date: "", description: "", quantity: 1, price: 0, status: "draft" })
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>FinTrack Demo - Quotes</h1>

      <h2>Add New Quote</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
        <label>
          Client:
          <select name="client_id" value={form.client_id} onChange={handleChange} required>
            <option value="">Select client</option>
            {clients.map(c => (
              <option key={c.id} value={c.id}>{c.company_name}</option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Date:
          <input type="date" name="date" value={form.date} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Description:
          <input type="text" name="description" value={form.description} onChange={handleChange} />
        </label>
        <br />
        <label>
          Quantity:
          <input type="number" name="quantity" value={form.quantity} onChange={handleChange} min="1" />
        </label>
        <br />
        <label>
          Price:
          <input type="number" name="price" value={form.price} onChange={handleChange} min="0" step="0.01" />
        </label>
        <br />
        <label>
          Status:
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="draft">Draft</option>
            <option value="sent">Sent</option>
          </select>
        </label>
        <br />
        <button type="submit">Add Quote</button>
      </form>

      <h2>List of Quotes</h2>
      <ul>
        {quotes.map(q => {
          const client = clients.find(c => c.id === q.client_id)
          return (
            <li key={q.id} style={{ marginBottom: "1rem" }}>
              <strong>Client:</strong> {client ? client.company_name : "Unknown"} <br />
              <strong>Quote Number:</strong> {q.quote_number} <br />
              <strong>Date:</strong> {q.date} <br />
              <strong>Description:</strong> {q.description} <br />
              <strong>Quantity:</strong> {q.quantity} <br />
              <strong>Price:</strong> ${q.price} <br />
              <strong>Total:</strong> ${q.total} <br />
              <strong>Status:</strong> {q.status}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
