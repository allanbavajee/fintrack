import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div>
      <nav style={{
        padding: "10px",
        background: "#f0f0f0",
        marginBottom: "20px",
        display: "flex",
        gap: "20px"
      }}>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/clients/AddClient">Add Client</Link>
        <Link href="/quotes/AddQuote">Add Quote</Link>
        <Link href="/invoices/AddInvoice">Add Invoice</Link>
      </nav>
      <main style={{ padding: "20px" }}>
        {children}
      </main>
    </div>
  );
}
