/* components/Header.jsx */
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "16px 48px",
      backgroundColor: "#f2f5f8",
      borderBottom: "1px solid #ddd",
      position: "sticky",
      top: 0,
      zIndex: 1000
    }}>
      {/* Logo + Slogan */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <Image src="/images/fintrack.logo.png" alt="Fintrack Logo" width={120} height={60} />
        <span style={{ fontSize: "0.9rem", color: "#555", marginTop: 4 }}>Your Finances, Your Way.</span>
      </div>

      {/* Menu */}
      <nav style={{ display: "flex", gap: 24, fontWeight: 500, alignItems: "center" }}>
        <Link href="/">Accueil</Link>
        <Link href="/clients">Clients</Link>
        <Link href="/invoices">Invoices</Link>
        <Link href="/quotes">Quotes</Link>
        <Link href="/create">Créer Quotation</Link>
        <Link href="/login">Login/Signup</Link>
      </nav>
    </header>
  );
}
