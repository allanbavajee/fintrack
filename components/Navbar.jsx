import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const menuItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Contact Us", href: "/contact" },
    { name: "Services", href: "/services" },
    { name: "Login", href: "/auth" },
    { name: "Signup", href: "/auth" },
  ];

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 32px",
        background: "#fff",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Image src="/images/fintrack.logo.png" alt="Fintrack Logo" width={140} height={50} />
        <span style={{ fontSize: 14, color: "#555" }}>Your money, your way.</span>
      </div>

      {/* Menu */}
      <nav style={{ display: "flex", gap: 16, alignItems: "center", fontWeight: 500 }}>
        {menuItems.map((item, idx) => (
          <Link
            key={idx}
            href={item.href}
            style={{
              textDecoration: "none",
              color: "#0d1f4c",
              transition: "color 0.3s",
              fontSize: "1rem",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#1f6feb")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#0d1f4c")}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}
