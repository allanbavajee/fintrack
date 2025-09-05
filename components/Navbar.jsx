import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const menuStyle = {
    display: "flex",
    gap: 16, // espacement réduit entre éléments
    alignItems: "center",
    fontWeight: 500,
    color: "#0d1f4c",
  };

  const menuItemStyle = {
    textDecoration: "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
    padding: "8px 12px",
    borderRadius: 6,
  };

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 32px",
        background: "#fff",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)", // léger shadow pour style
        position: "sticky",
        top: 0,
        zIndex: 1000,
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
        {[
          { name: "Home", href: "/" },
          { name: "About Us", href: "/about-us" },
          { name: "Contact Us", href: "/contact" },
          { name: "Services", href: "/services" },
          { name: "Login", href: "/auth" },
          { name: "Signup", href: "/auth" },
        ].map((item, idx) => (
          <Link
            key={idx}
            href={item.href}
            style={{
              ...menuItemStyle,
              color: "#0d1f4c",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#ffefef")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}
