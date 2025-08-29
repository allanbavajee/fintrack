/* fintrack/components/Navbar.jsx */
import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      style={{
        padding: "1rem",
        background: "#222",
        color: "white",
        display: "flex",
        gap: "1rem",
      }}
    >
      <Link href="/" style={{ color: "white", textDecoration: "none" }}>
        🏠 Accueil
      </Link>
      <Link href="/clients" style={{ color: "white", textDecoration: "none" }}>
        👥 Clients
      </Link>
      <Link href="/clients/add" style={{ color: "white", textDecoration: "none" }}>
        ➕ Ajouter Client
      </Link>
    </nav>
  );
}
