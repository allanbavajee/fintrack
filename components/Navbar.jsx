/* components/Navbar.jsx */
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "../lib/useAuth";  // hook de gestion d'auth

export default function Navbar() {
  const { user, profile, logout } = useAuth();

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
        <span style={{ fontSize: 14, color: "#555", marginTop: 4 }}>Your money, your way.</span>
      </div>

      {/* Menu */}
      <nav style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <Link href="/">Home</Link>
        <Link href="/about-us">About Us</Link>
        <Link href="/contact">Contact Us</Link>
        <Link href="/services">Services</Link>

        {/* Auth section */}
        {user ? (
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 14, color: "#333" }}>
              👋 Bienvenue {profile?.first_name || user.email}
            </span>
            <button
              onClick={logout}
              style={{
                padding: "8px 16px",
                borderRadius: 8,
                border: "1px solid #e63946",
                background: "#fff",
                color: "#e63946",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            <Link href="/login">
              <button
                style={{
                  marginRight: 12,
                  padding: "8px 20px",
                  borderRadius: 8,
                  border: "1px solid #1f6feb",
                  background: "#fff",
                  color: "#1f6feb",
                  fontWeight: 600,
                }}
              >
                Login
              </button>
            </Link>
            <Link href="/signup">
              <button
                style={{
                  padding: "8px 20px",
                  borderRadius: 8,
                  border: "none",
                  background: "#1f6feb",
                  color: "#fff",
                  fontWeight: 600,
                }}
              >
                Signup
              </button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
