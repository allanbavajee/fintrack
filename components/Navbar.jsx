/* components/Navbar.jsx */
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 32px",
        background: "#fff",
        borderBottom: "1px solid #ddd",
      }}
    >
      {/* Logo + Slogan */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 4 }}>
        <Image
          src="/images/fintrack.logo.png"
          alt="Fintrack Logo"
          width={120}
          height={50}
          style={{ objectFit: "contain" }}
        />
        <span style={{ fontSize: 14, color: "#555" }}>Your Money, Your Way.</span>
      </div>

      {/* Menu à gauche */}
      <nav style={{ display: "flex", gap: 24, marginLeft: 32 }}>
        <Link href="/">Home</Link>
        <Link href="/about">About Us</Link>
        <Link href="/contact">Contact Us</Link>
        <Link href="/services">Services</Link>
      </nav>
    </header>
  );
}
