import { useEffect, useState } from "react"

export default function Home() {
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

  // Récupérer clients
  useEffect(() => {
    fetch("/api/clients")
      .then(res => res.json())
      .then(data => setClients(data))
      .catch(err => console.error("Error fetching clients:", err))
  }, [])

  // Récupérer quotes
  useEffect(() => {
    fetch("/api/quotes")
      .then(res => res.json())
      .then(data => setQuotes(data))
      .catch(err => console.error("Error fetching quotes:", err))
  }, [])

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("Submitting form:", form)

    if (!form.client_id) {
      alert("Please select a client")
      return
    }

    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-user-id": "demo-user" },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (res.status !== 201) {
        console.error("Error creating quote:", data)
        alert(`Error: ${data.error?.message || "Unknown error"}`)
        return
      }
      setQuotes(prev => [...prev, data])
      setForm({ client_id: "", date: "", description: "", quantity: 1, price: 0, status: "draft" })
    } catch (err) {
      console.error("Network error:", err)
      alert("Network error, see console")
    }
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>FinTrack Demo - Quotes</h1>
      <h2>Add New Quote</h2>

      <form onSubmit={handleSubmit}>
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
