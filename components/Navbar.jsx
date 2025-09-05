import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const menuStyle = {
    display: "flex",
    gap: 24,
    alignItems: "center",
    fontWeight: 500,
    color: "#0d1f4c",
  };

  const menuItemStyle = {
    textDecoration: "none",
    cursor: "pointer",
    transition: "color 0.2s",
  };

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 32px",
        background: "#fff",
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Image
          src="/images/fintrack.logo.png"
          alt="Fintrack Logo"
          width={140}
          height={50}
        />
        <span style={{ fontSize: 14, color: "#555" }}>Your money, your way.</span>
      </div>

      {/* Menu */}
      <nav style={menuStyle}>
        <Link href="/" style={menuItemStyle}>Home</Link>
        <Link href="/about-us" style={menuItemStyle}>About Us</Link>
        <Link href="/contact" style={menuItemStyle}>Contact Us</Link>
        <Link href="/services" style={menuItemStyle}>Services</Link>
        <Link href="/auth" style={menuItemStyle}>Login</Link>
        <Link href="/auth" style={menuItemStyle}>Signup</Link>
      </nav>
    </header>
  );
}
