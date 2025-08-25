import { useEffect, useState } from "react"

export default function Home() {
  const [clients, setClients] = useState([])
  const [quotes, setQuotes] = useState([])
  const [invoices, setInvoices] = useState([])

  const [clientForm, setClientForm] = useState({ company_name: "", contact_name: "", email: "", phone: "" })
  const [quoteForm, setQuoteForm] = useState({ client_id: "", amount: "", status: "draft" })
  const [invoiceForm, setInvoiceForm] = useState({ client_id: "", amount: "", status: "draft" })

  const [error, setError] = useState(null)
  const [loadingClient, setLoadingClient] = useState(false)
  const [loadingQuote, setLoadingQuote] = useState(false)
  const [loadingInvoice, setLoadingInvoice] = useState(false)

  // Fetch clients, quotes, invoices
  const fetchClients = async () => {
    try {
      const res = await fetch("/api/clients")
      if (!res.ok) throw new Error(await res.text())
      const data = await res.json()
      setClients(Array.isArray(data) ? data.filter(c => c != null) : [])
    } catch (err) { console.error(err); setError(err.message) }
  }

  const fetchQuotes = async () => {
    try {
      const res = await fetch("/api/quotes")
      if (!res.ok) throw new Error(await res.text())
      const data = await res.json()
      setQuotes(Array.isArray(data) ? data.filter(q => q != null) : [])
    } catch (err) { console.error(err); setError(err.message) }
  }

  const fetchInvoices = async () => {
    try {
      const res = await fetch("/api/invoices")
      if (!res.ok) throw new Error(await res.text())
      const data = await res.json()
      setInvoices(Array.isArray(data) ? data.filter(i => i != null) : [])
    } catch (err) { console.error(err); setError(err.message) }
  }

  useEffect(() => {
    fetchClients()
    fetchQuotes()
    fetchInvoices()
  }, [])

  // Add client
  const handleClientSubmit = async (e) => {
    e.preventDefault()
    setLoadingClient(true)
    setError(null)
    try {
      const res = await fetch("/api/clients", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(clientForm) })
      if (!res.ok) throw new Error(await res.text())
      const result = await res.json()
      const newClient = Array.isArray(result) ? result[0] : result
      setClients([...clients, newClient])
      setClientForm({ company_name: "", contact_name: "", email: "", phone: "" })
    } catch (err) { console.error(err); setError(err.message) }
    finally { setLoadingClient(false) }
  }

  // Add quote
  const handleQuoteSubmit = async (e) => {
    e.preventDefault()
    setLoadingQuote(true)
    setError(null)
    try {
      const res = await fetch("/api/quotes", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(quoteForm) })
      if (!res.ok) throw new Error(await res.text())
      const result = await res.json()
      const newQuote = Array.isArray(result) ? result[0] : result
      setQuotes([...quotes, newQuote])
      setQuoteForm({ client_id: "", amount: "", status: "draft" })
    } catch (err) { console.error(err); setError(err.message) }
    finally { setLoadingQuote(false) }
  }

  // Add invoice
  const handleInvoiceSubmit = async (e) => {
    e.preventDefault()
    setLoadingInvoice(true)
    setError(null)
    try {
      const res = await fetch("/api/invoices", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(invoiceForm) })
      if (!res.ok) throw new Error(await res.text())
      const result = await res.json()
      const newInvoice = Array.isArray(result) ? result[0] : result
      setInvoices([...invoices, newInvoice])
      setInvoiceForm({ client_id: "", amount: "", status: "draft" })
    } catch (err) { console.error(err); setError(err.message) }
    finally { setLoadingInvoice(false) }
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>FinTrack Demo</h1>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {/* Clients */}
      <h2>Clients</h2>
      <ul>
        {clients.map(c => <li key={c.id}>{c.company_name} - {c.contact_name} - {c.email} - {c.phone}</li>)}
      </ul>
      <h3>Add Client</h3>
      <form onSubmit={handleClientSubmit}>
        <input type="text" placeholder="Company Name" value={clientForm.company_name} onChange={e => setClientForm({...clientForm, company_name: e.target.value})} required/>
        <input type="text" placeholder="Contact Name" value={clientForm.contact_name} onChange={e => setClientForm({...clientForm, contact_name: e.target.value})} required/>
        <input type="email" placeholder="Email" value={clientForm.email} onChange={e => setClientForm({...clientForm, email: e.target.value})} required/>
        <input type="text" placeholder="Phone" value={clientForm.phone} onChange={e => setClientForm({...clientForm, phone: e.target.value})} required/>
        <button type="submit" disabled={loadingClient}>{loadingClient ? "Adding..." : "Add Client"}</button>
      </form>

      {/* Quotes */}
      <h2>Quotes</h2>
      <ul>
        {quotes.map(q => {
          const client = clients.find(c => c.id === q.client_id)
          return <li key={q.id}>{client ? client.company_name : "Unknown client"} - Amount: {q.amount} - Status: {q.status}</li>
        })}
      </ul>
      <h3>Add Quote</h3>
      <form onSubmit={handleQuoteSubmit}>
        <select value={quoteForm.client_id} onChange={e => setQuoteForm({...quoteForm, client_id: e.target.value})} required>
          <option value="">Select Client</option>
          {clients.map(c => <option key={c.id} value={c.id}>{c.company_name}</option>)}
        </select>
        <input type="number" placeholder="Amount" value={quoteForm.amount} onChange={e => setQuoteForm({...quoteForm, amount: e.target.value})} required/>
        <select value={quoteForm.status} onChange={e => setQuoteForm({...quoteForm, status: e.target.value})}>
          <option value="draft">Draft</option>
          <option value="sent">Sent</option>
          <option value="paid">Paid</option>
        </select>
        <button type="submit" disabled={loadingQuote}>{loadingQuote ? "Adding..." : "Add Quote"}</button>
      </form>

      {/* Invoices */}
      <h2>Invoices</h2>
      <ul>
        {invoices.map(i => {
          const client = clients.find(c => c.id === i.client_id)
          return <li key={i.id}>{client ? client.company_name : "Unknown client"} - Amount: {i.amount} - Status: {i.status}</li>
        })}
      </ul>
      <h3>Add Invoice</h3>
      <form onSubmit={handleInvoiceSubmit}>
        <select value={invoiceForm.client_id} onChange={e => setInvoiceForm({...invoiceForm, client_id: e.target.value})} required>
          <option value="">Select Client</option>
          {clients.map(c => <option key={c.id} value={c.id}>{c.company_name}</option>)}
        </select>
        <input type="number" placeholder="Amount" value={invoiceForm.amount} onChange={e => setInvoiceForm({...invoiceForm, amount: e.target.value})} required/>
        <select value={invoiceForm.status} onChange={e => setInvoiceForm({...invoiceForm, status: e.target.value})}>
          <option value="draft">Draft</option>
          <option value="sent">Sent</option>
          <option value="paid">Paid</option>
        </select>
        <button type="submit" disabled={loadingInvoice}>{loadingInvoice ? "Adding..." : "Add Invoice"}</button>
      </form>
    </div>
  )
}
