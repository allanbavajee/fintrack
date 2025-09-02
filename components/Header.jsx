// components/Header.jsx
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "12px 32px",
        borderBottom: "1px solid #ddd",
        background: "#fff",
      }}
    >
      {/* Ligne du haut */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "center",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Image
            src="/images/fintrack.logo.png"
            alt="Fintrack Logo"
            width={40}
            height={40}
          />
          <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
            Fintrack
          </span>
        </div>

        {/* Menu principal */}
        <nav style={{ display: "flex", gap: "20px" }}>
          <Link href="/">Accueil</Link>
          <Link href="/clients">Clients</Link>
          <Link href="/invoices">Invoices</Link>
          <Link href="/quotes">Quotes</Link>
          <Link href="/create-quote">Créer Quotation</Link>
        </nav>

        {/* Login / Signup */}
        <div>
          <Link href="/login">Login</Link> | <Link href="/signup">Signup</Link>
        </div>
      </div>

      {/* Slogan */}
      <p
        style={{
          marginTop: 8,
          fontSize: "0.95rem",
          color: "#555",
          fontStyle: "italic",
        }}
      >
        Gérez vos finances personnelles et professionnelles en toute simplicité.
      </p>
    </header>
  );
}
