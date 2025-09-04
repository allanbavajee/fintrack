import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 32px",
        background: "#fff",
        borderBottom: "1px solid #ddd",
      }}
    >
      {/* Logo + slogan */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <Image src="/images/fintrack.logo.png" alt="Fintrack Logo" width={120} height={50} />
        <span style={{ fontSize: 14, color: "#555", marginTop: 4 }}>
          Your money, your way.
        </span>
      </div>

      {/* Menu */}
      <nav style={{ display: "flex", gap: 24, alignItems: "center" }}>
        <Link href="/">Home</Link>
        <Link href="/about-us">About Us</Link>
        <Link href="/contact">Contact Us</Link>
        <Link href="/services">Services</Link>
      </nav>
    </header>
  );
}
