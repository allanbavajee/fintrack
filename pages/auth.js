/* pages/auth.jsx */
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Auth() {
  const [activeTab, setActiveTab] = useState("login");

  const toggleTab = (tab) => setActiveTab(tab);

  return (
    <div style={{ minHeight: "100vh", fontFamily: "Inter, Arial, sans-serif", background: "#fff" }}>
      {/* Header */}
      <header style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 32px",
        background: "#fff",
        borderBottom: "1px solid #eee",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Image src="/images/fintrack.logo.png" alt="Fintrack Logo" width={140} height={50} />
          <span style={{ fontSize: 14, color: "#555" }}>Your money, your way.</span>
        </div>

        {/* Menu */}
        <nav style={{ display: "flex", gap: 16, alignItems: "center", fontWeight: 500 }}>
          {["Home", "About Us", "Contact Us", "Services"].map((item, idx) => (
            <Link key={idx} href={`/${item.toLowerCase().replace(/\s/g, '-')}`}
              style={{
                textDecoration: "none",
                color: "#0d1f4c",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.color = "#ff6b61"}
              onMouseLeave={e => e.currentTarget.style.color = "#0d1f4c"}
            >
              {item}
            </Link>
          ))}
          <Link href="/auth" style={{ textDecoration: "none", color: "#0d1f4c", fontWeight: 600 }}
            onMouseEnter={e => e.currentTarget.style.color = "#ff6b61"}
            onMouseLeave={e => e.currentTarget.style.color = "#0d1f4c"}>
            Login | Signup
          </Link>
        </nav>
      </header>

      {/* Auth Section */}
      <section style={{ maxWidth: 400, margin: "60px auto", padding: 24, borderRadius: 16, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        {/* Tabs */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24, gap: 24 }}>
          <button
            onClick={() => toggleTab("login")}
            style={{
              background: activeTab === "login" ? "#1f6feb" : "transparent",
              color: activeTab === "login" ? "#fff" : "#0d1f4c",
              border: "none",
              padding: "8px 24px",
              borderRadius: 12,
              cursor: "pointer",
              fontWeight: 600,
              transition: "0.3s"
            }}
          >
            Login
          </button>
          <button
            onClick={() => toggleTab("signup")}
            style={{
              background: activeTab === "signup" ? "#1f6feb" : "transparent",
              color: activeTab === "signup" ? "#fff" : "#0d1f4c",
              border: "none",
              padding: "8px 24px",
              borderRadius: 12,
              cursor: "pointer",
              fontWeight: 600,
              transition: "0.3s"
            }}
          >
            Signup
          </button>
        </div>

        {/* Form */}
        {activeTab === "login" ? (
          <form style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <input type="email" placeholder="Email" style={{ padding: 12, borderRadius: 8, border: "1px solid #ccc" }} />
            <input type="password" placeholder="Password" style={{ padding: 12, borderRadius: 8, border: "1px solid #ccc" }} />
            <button type="submit" style={{ padding: 12, borderRadius: 8, border: "none", background: "#1f6feb", color: "#fff", fontWeight: 600, cursor: "pointer" }}>Login</button>
          </form>
        ) : (
          <form style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <input type="text" placeholder="Full Name" style={{ padding: 12, borderRadius: 8, border: "1px solid #ccc" }} />
            <input type="email" placeholder="Email" style={{ padding: 12, borderRadius: 8, border: "1px solid #ccc" }} />
            <input type="password" placeholder="Password" style={{ padding: 12, borderRadius: 8, border: "1px solid #ccc" }} />
            <button type="submit" style={{ padding: 12, borderRadius: 8, border: "none", background: "#1f6feb", color: "#fff", fontWeight: 600, cursor: "pointer" }}>Signup</button>
          </form>
        )}
      </section>
    </div>
  );
}
