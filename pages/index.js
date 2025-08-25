import { useEffect, useState } from "react"

export default function QuotesPage() {
  const [clients, setClients] = useState([])
  const [quotes, setQuotes] = useState([])

  const [form, setForm] = useState({
    client_id: "",
    date: "",
    description: "",
    quantity: 1,
    price: 0,
    status: "draft"
  })

  useEffect(() => {
    fetch("/api/clients", { headers: { "x-user-id": "demo-user" } })
      .then(res => res.json())
      .then(data => setClients(data))

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
      headers: { "Content-Type": "application/json", "x-user-id": "demo-user" },
      body: JSON.stringify(form)
    })
    const data = await res.json()
    if (!res.ok) return alert(`Error: ${data.error?.message || "Unknown"}`)
    setQuotes(prev => [...prev, data])
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
        <label>
          Date:
          <input type="date" name="date" value={form.date} onChange={handleChange} required />
        </label>
        <label>
          Description:
          <input type="text" name="description" value={form.description} onChange={handleChange} required />
        </label>
        <label>
          Quantity:
          <input type="number" name="quantity" value={form.quantity} onChange={handleChange} />
        </label>
        <label>
          Price:
          <input type="number" name="price" value={form.price} onChange={handleChange} />
        </label>
        <label>
          Status:
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="draft">Draft</option>
            <option value="sent">Sent</option>
          </select>
        </label>
        <button type="submit">Add Quote</button>
      </form>

      <h2>All Quotes</h2>
      <ul>
        {quotes.map(q => {
          const client = clients.find(c => c.id === q.client_id)
          return (
            <li key={q.id}>
              {client ? client.company_name : "Unknown client"} - {q.description} - Qty: {q.quantity} - Price: {q.price} - Total: {q.total} - Status: {q.status}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
