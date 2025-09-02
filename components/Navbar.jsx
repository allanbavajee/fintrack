/* components/Navbar.jsx */
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 32px",
        background: "#f9fafb",
        borderBottom: "1px solid #ddd",
      }}
    >
      {/* Logo + Slogan */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <Image
          src="/images/fintrack.logo.png"
          alt="Fintrack Logo"
          width={120}
          height={50}
          priority
        />
        <span style={{ fontSize: "14px", color: "#555", marginTop: "4px" }}>
          Votre partenaire financier
        </span>
      </div>

      {/* Menu */}
      <nav>
        <ul
          style={{
            display: "flex",
            listStyle: "none",
            gap: "24px",
            margin: 0,
            padding: 0,
          }}
        >
          <li><Link href="/">Accueil</Link></li>
          <li><Link href="/clients">Clients</Link></li>
          <li><Link href="/invoices">Invoices</Link></li>
          <li><Link href="/quotes">Quotes</Link></li>
          <li><Link href="/quotes/create">Créer Quotation</Link></li>
        </ul>
      </nav>
    </header>
  );
}
