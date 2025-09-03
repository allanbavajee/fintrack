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
        padding: "16px 48px",
        background: "#f9fafb",
        borderBottom: "1px solid #ddd",
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Image src="/images/fintrack.logo.png" alt="Fintrack Logo" width={120} height={50} />
        <span style={{ fontWeight: "bold", fontSize: "1.1rem" }}>Fintrack</span>
      </div>

      {/* Menu */}
      <nav>
        <ul style={{ display: "flex", listStyle: "none", gap: 24, margin: 0, padding: 0 }}>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About Us</Link></li>
          <li><Link href="/contact">Contact Us</Link></li>
          <li><Link href="/pricing">Pricing</Link></li>
          <li><Link href="/testimonials">Testimonials</Link></li>
        </ul>
      </nav>

      {/* CTA */}
      <div>
        <Link href="/login">
          <button style={{ padding: "8px 16px", borderRadius: 8, border: "none", background: "#1f6feb", color: "#fff", cursor: "pointer" }}>
            Login
          </button>
        </Link>
      </div>
    </header>
  );
}


