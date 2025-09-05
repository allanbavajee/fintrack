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
        boxShadow: "0 0 0 rgba(0,0,0,0)", // plus de ligne/shadow
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
      <nav style={{ display: "flex", gap: 24, alignItems: "center" }}>
        {["Home", "About Us", "Contact Us", "Services", "Login", "Signup"].map((item, idx) => (
          <Link key={idx} href={`/${item.toLowerCase().replace(/\s+/g, "-")}`} style={{
            textDecoration: "none",
            color: "#0d1f4c",
            fontWeight: 500,
            transition: "0.2s",
          }} 
          onMouseEnter={(e) => e.currentTarget.style.color = "#ff6b61"}
          onMouseLeave={(e) => e.currentTarget.style.color = "#0d1f4c"}>
            {item}
          </Link>
        ))}
      </nav>
    </header>
  );
}
