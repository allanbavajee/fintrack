import { useEffect, useState } from "react"

export default function InvoicesPage() {
  const [clients, setClients] = useState([])
  const [invoices, setInvoices] = useState([])

  // Formulaire
  const [clientId, setClientId] = useState("")
  const [date, setDate] = useState("")
  const [description, setDescription] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [price, setPrice] = useState(0)
  const [status, setStatus] = useState("Draft")

  // Fetch clients et invoices
  useEffect(() => {
    fetch("/api/clients", { headers: { "x-user-id": "demo-user" } })
      .then(res => res.json())
      .then(data => setClients(data))

    fetch("/api/invoices", { headers: { "x-user-id": "demo-user" } })
      .then(res => res.json())
      .then(data => setInvoices(data))
  }, [])

  const addInvoice = async () => {
    if (!clientId || !date || !description) {
      alert("Client, date and description are required")
      return
    }

    const res = await fetch("/api/invoices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-user-id": "demo-user"
      },
      body: JSON.stringify({ client_id: clientId, date, description, quantity, price, status })
    })

    const data = await res.json()
    if (res.ok) {
      setInvoices([...invoices, data])
      setDescription("")
      setQuantity(1)
      setPrice(0)
    } else {
      alert(data.error?.message || "Error adding invoice")
    }
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>FinTrack Demo - Invoices</h1>

      <h2>Add New Invoice</h2>
      <div>
        <label>Client:</label>
        <select value={clientId} onChange={e => setClientId(e.target.value)}>
          <option value="">Select client</option>
          {clients.map(c => (
            <option key={c.id} value={c.id}>{c.company_name}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Date:</label>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      </div>
      <div>
        <label>Description:</label>
        <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
      </div>
      <div>
        <label>Quantity:</label>
        <input type="number" value={quantity} onChange={e => setQuantity(Number(e.target.value))} />
      </div>
      <div>
        <label>Price:</label>
        <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} />
      </div>
      <div>
        <label>Status:</label>
        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option value="Draft">Draft</option>
          <option value="Sent">Sent</option>
        </select>
      </div>
      <button onClick={addInvoice}>Add Invoice</button>

      <h2>All Invoices</h2>
      <ul>
        {invoices.map(i => {
          const client = clients.find(c => c.id === i.client_id)
          return (
            <li key={i.id}>
              {client ? client.company_name : "Unknown client"} - Amount: {i.total} - Status: {i.status}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
