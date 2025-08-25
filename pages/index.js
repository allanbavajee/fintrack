import { useEffect, useState } from "react"

export default function HomePage() {
  // Clients
  const [clients, setClients] = useState([])
  const [companyName, setCompanyName] = useState("")
  const [brn, setBrn] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [contactName, setContactName] = useState("")

  // Quotes
  const [quotes, setQuotes] = useState([])
  const [quoteClientId, setQuoteClientId] = useState("")
  const [quoteDate, setQuoteDate] = useState("")
  const [quoteDescription, setQuoteDescription] = useState("")
  const [quoteQuantity, setQuoteQuantity] = useState(1)
  const [quotePrice, setQuotePrice] = useState(0)
  const [quoteStatus, setQuoteStatus] = useState("Draft")

  // Invoices
  const [invoices, setInvoices] = useState([])
  const [invoiceClientId, setInvoiceClientId] = useState("")
  const [invoiceDate, setInvoiceDate] = useState("")
  const [invoiceDescription, setInvoiceDescription] = useState("")
  const [invoiceQuantity, setInvoiceQuantity] = useState(1)
  const [invoicePrice, setInvoicePrice] = useState(0)
  const [invoiceStatus, setInvoiceStatus] = useState("Draft")

  const userId = "demo-user"

  // Fetch Clients
  useEffect(() => {
    fetch("/api/clients", { headers: { "x-user-id": userId } })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setClients(data)
        else setClients([])
      })
  }, [])

  // Fetch Quotes
  useEffect(() => {
    fetch("/api/quotes", { headers: { "x-user-id": userId } })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setQuotes(data)
        else setQuotes([])
      })
  }, [])

  // Fetch Invoices
  useEffect(() => {
    fetch("/api/invoices", { headers: { "x-user-id": userId } })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setInvoices(data)
        else setInvoices([])
      })
  }, [])

  // Add Client
  const addClient = async () => {
    if (!companyName) return alert("Company name is required")
    const res = await fetch("/api/clients", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-user-id": userId },
      body: JSON.stringify({ company_name: companyName, brn, phone, email, contact_name: contactName })
    })
    const data = await res.json()
    if (res.ok) {
      setClients([...clients, data])
      setCompanyName(""); setBrn(""); setPhone(""); setEmail(""); setContactName("")
    } else alert(data.error?.message || "Error adding client")
  }

  // Add Quote
  const addQuote = async () => {
    if (!quoteClientId || !quoteDate || !quoteDescription) return alert("Client, date and description required")
    const res = await fetch("/api/quotes", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-user-id": userId },
      body: JSON.stringify({ client_id: quoteClientId, date: quoteDate, description: quoteDescription, quantity: quoteQuantity, price: quotePrice, status: quoteStatus })
    })
    const data = await res.json()
    if (res.ok) {
      setQuotes([...quotes, data])
      setQuoteClientId(""); setQuoteDate(""); setQuoteDescription(""); setQuoteQuantity(1); setQuotePrice(0)
    } else alert(data.error?.message || "Error adding quote")
  }

  // Add Invoice
  const addInvoice = async () => {
    if (!invoiceClientId || !invoiceDate || !invoiceDescription) return alert("Client, date and description required")
    const res = await fetch("/api/invoices", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-user-id": userId },
      body: JSON.stringify({ client_id: invoiceClientId, date: invoiceDate, description: invoiceDescription, quantity: invoiceQuantity, price: invoicePrice, status: invoiceStatus })
    })
    const data = await res.json()
    if (res.ok) {
      setInvoices([...invoices, data])
      setInvoiceClientId(""); setInvoiceDate(""); setInvoiceDescription(""); setInvoiceQuantity(1); setInvoicePrice(0)
    } else alert(data.error?.message || "Error adding invoice")
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>FinTrack Demo</h1>

      {/* Clients Section */}
      <h2>Add New Client</h2>
      <input placeholder="Company Name" value={companyName} onChange={e => setCompanyName(e.target.value)} />
      <input placeholder="BRN" value={brn} onChange={e => setBrn(e.target.value)} />
      <input placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Contact Name" value={contactName} onChange={e => setContactName(e.target.value)} />
      <button onClick={addClient}>Add Client</button>

      <h3>All Clients</h3>
      <ul>
        {clients.map(c => <li key={c.id}>{c.company_name} - {c.brn} - {c.phone} - {c.email} - {c.contact_name}</li>)}
      </ul>

      {/* Quotes Section */}
      <h2>Add New Quote</h2>
      <select value={quoteClientId} onChange={e => setQuoteClientId(e.target.value)}>
        <option value="">Select client</option>
        {clients.map(c => <option key={c.id} value={c.id}>{c.company_name}</option>)}
      </select>
      <input type="date" value={quoteDate} onChange={e => setQuoteDate(e.target.value)} />
      <input placeholder="Description" value={quoteDescription} onChange={e => setQuoteDescription(e.target.value)} />
      <input type="number" value={quoteQuantity} onChange={e => setQuoteQuantity(Number(e.target.value))} />
      <input type="number" value={quotePrice} onChange={e => setQuotePrice(Number(e.target.value))} />
      <select value={quoteStatus} onChange={e => setQuoteStatus(e.target.value)}>
        <option value="Draft">Draft</option>
        <option value="Sent">Sent</option>
      </select>
      <button onClick={addQuote}>Add Quote</button>

      <h3>All Quotes</h3>
      <ul>
        {quotes.map(q => {
          const client = clients.find(c => c.id === q.client_id)
          return (
            <li key={q.id}>
              {client ? client.company_name : "Unknown client"} - Amount: {q.quantity * q.price} - Status: {q.status}
            </li>
          )
        })}
      </ul>

      {/* Invoices Section */}
      <h2>Add New Invoice</h2>
      <select value={invoiceClientId} onChange={e => setInvoiceClientId(e.target.value)}>
        <option value="">Select client</option>
        {clients.map(c => <option key={c.id} value={c.id}>{c.company_name}</option>)}
      </select>
      <input type="date" value={invoiceDate} onChange={e => setInvoiceDate(e.target.value)} />
      <input placeholder="Description" value={invoiceDescription} onChange={e => setInvoiceDescription(e.target.value)} />
      <input type="number" value={invoiceQuantity} onChange={e => setInvoiceQuantity(Number(e.target.value))} />
      <input type="number" value={invoicePrice} onChange={e => setInvoicePrice(Number(e.target.value))} />
      <select value={invoiceStatus} onChange={e => setInvoiceStatus(e.target.value)}>
        <option value="Draft">Draft</option>
        <option value="Sent">Sent</option>
      </select>
      <button onClick={addInvoice}>Add Invoice</button>

      <h3>All Invoices</h3>
      <ul>
        {invoices.map(i => {
          const client = clients.find(c => c.id === i.client_id)
          return (
            <li key={i.id}>
              {client ? client.company_name : "Unknown client"} - Amount: {i.quantity * i.price} - Status: {i.status}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
