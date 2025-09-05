// components/Navbar.jsx
import Link from "next/link";

export default function Navbar() {
  return (
    <header
      style={{
        width: "100%",
        background: "#ffffff",
        padding: "14px 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)", // Ombre subtile au lieu de border
      }}
    >
      {/* Logo */}
      <div
        style={{
          fontWeight: 700,
          fontSize: "1.4rem",
          color: "#2563eb",
          cursor: "pointer",
        }}
      >
        Fintrack
      </div>

      {/* Navigation */}
      <nav style={{ display: "flex", gap: "24px" }}>
        {["Home", "About Us", "Services", "Contact Us"].map((item, index) => (
          <Link
            key={index}
            href={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "")}`}
            style={{
              color: "#374151",
              fontWeight: 500,
              fontSize: "1rem",
              textDecoration: "none",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#2563eb")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#374151")}
          >
            {item}
          </Link>
        ))}
      </nav>
    </header>
  );
}
