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
        padding: "16px 32px",
        background: "#fff",
        borderBottom: "1px solid #ddd",
        position: "relative",
      }}
    >
      {/* Logo + slogan à gauche */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <Image src="/images/fintrack.logo.png" alt="Fintrack Logo" width={120} height={50} style={{ objectFit: "contain" }} />
        <span style={{ fontSize: 14, color: "#555", marginTop: 4 }}>
          Your money, your way.
        </span>
      </div>

      {/* Menu à gauche du logo */}
      <nav style={{ display: "flex", gap: 24, marginLeft: 32 }}>
        <Link href="/">Home</Link>
        <Link href="/about-us">About Us</Link>
        <Link href="/contact">Contact Us</Link>
      </nav>

      {/* Login / Signup en haut à droite */}
      <div style={{ position: "absolute", right: 32, top: 16 }}>
        <Link href="/login">
          <button style={{ marginRight: 8, padding: "8px 16px", borderRadius: 8, border: "1px solid #0ea5a0", background: "#fff", color: "#0ea5a0", cursor: "pointer" }}>Login</button>
        </Link>
        <Link href="/signup">
          <button style={{ padding: "8px 16px", borderRadius: 8, border: "none", background: "#0ea5a0", color: "#fff", cursor: "pointer" }}>Signup</button>
        </Link>
      </div>
    </header>
  );
}

