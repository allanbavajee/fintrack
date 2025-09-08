// components/Header.jsx
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "../lib/supabaseClient";

export default function Header() {
  const [session, setSession] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };
    getSession();
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) =>
      setSession(session)
    );
    return () => authListener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 24px",
        borderBottom: "1px solid #eee",
        background: "#fff",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Logo */}
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Image src="/images/fintrack.logo.png" alt="Fintrack Logo" width={120} height={40} />
        <span style={{ fontSize: 14, color: "#555" }}>Your money, your way.</span>
      </Link>

      {/* Menu desktop */}
      <nav
        style={{
          display: "flex",
          gap: 20,
          alignItems: "center",
        }}
        className="menu-desktop"
      >
        {["Home", "About Us", "Contact Us", "Services"].map((item, idx) => (
          <Link
            key={idx}
            href={`/${item.toLowerCase().replace(/\s/g, "-")}`}
            style={{
              textDecoration: "none",
              color: "#0d1f4c",
              fontWeight: 500,
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#ff6b61")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#0d1f4c")}
          >
            {item}
          </Link>
        ))}

        {session ? (
          <>
            <span style={{ color: "#0d1f4c", fontWeight: 600 }}>
              {session.user.email}
            </span>
            <button
              onClick={handleLogout}
              style={{
                padding: "8px 16px",
                borderRadius: 8,
                border: "none",
                background: "#ff6b61",
                color: "#fff",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            href="/auth"
            style={{
              textDecoration: "none",
              color: "#0d1f4c",
              fontWeight: 600,
              border: "1px solid #0d1f4c",
              borderRadius: 8,
              padding: "6px 14px",
            }}
          >
            Login | Signup
          </Link>
        )}
      </nav>

      {/* Menu mobile (burger) */}
      <div
        className="menu-mobile"
        style={{ display: "none", cursor: "pointer" }}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </div>

      {/* Drawer mobile */}
      {menuOpen && (
        <div
          style={{
            position: "absolute",
            top: 60,
            right: 0,
            width: "200px",
            background: "#fff",
            border: "1px solid #eee",
            borderRadius: "8px",
            padding: "16px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          {["Home", "About Us", "Contact Us", "Services"].map((item, idx) => (
            <div key={idx} style={{ marginBottom: 12 }}>
              <Link
                href={`/${item.toLowerCase().replace(/\s/g, "-")}`}
                style={{ color: "#0d1f4c", textDecoration: "none" }}
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </Link>
            </div>
          ))}

          {session ? (
            <button
              onClick={handleLogout}
              style={{
                marginTop: 12,
                padding: "8px 12px",
                borderRadius: 6,
                border: "none",
                background: "#ff6b61",
                color: "#fff",
                fontWeight: 600,
                cursor: "pointer",
                width: "100%",
              }}
            >
              Logout
            </button>
          ) : (
            <Link
              href="/auth"
              style={{
                display: "block",
                marginTop: 12,
                textDecoration: "none",
                textAlign: "center",
                color: "#fff",
                background: "#0d1f4c",
                borderRadius: 6,
                padding: "8px 12px",
                fontWeight: 600,
              }}
              onClick={() => setMenuOpen(false)}
            >
              Login | Signup
            </Link>
          )}
        </div>
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          .menu-desktop {
            display: none;
          }
          .menu-mobile {
            display: block;
          }
        }
      `}</style>
    </header>
  );
}
