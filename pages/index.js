import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>FinTrack - Your money, your way</title>
      </Head>

      {/* Header */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 40px",
          borderBottom: "1px solid #eee",
          background: "#fff",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        {/* Logo */}
        <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#1f6feb" }}>
          <Image src="/images/logo.png" alt="Logo" width={140} height={40} />
        </div>

        {/* Menu */}
        <nav>
          <ul
            style={{
              display: "flex",
              gap: "22px",
              listStyle: "none",
              margin: 0,
              padding: 0,
              fontWeight: "500",
            }}
          >
            {["Home", "About Us", "Services", "Contact Us"].map((item, i) => (
              <li key={i}>
                <a href="#" style={navLinkStyle}>
                  {item}
                </a>
              </li>
            ))}
            <li>
              <Link href="/auth" legacyBehavior>
                <a style={navLinkStyle}>Login</a>
              </Link>{" "}
              |{" "}
              <Link href="/auth" legacyBehavior>
                <a style={navLinkStyle}>Signup</a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero */}
      <section
        style={{
          textAlign: "center",
          padding: "60px 20px 40px",
          background: "#fff",
        }}
      >
        <h1 style={{ fontSize: "2.5rem", marginBottom: 16, color: "#0d1f4c" }}>
          Your money, your way
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#444" }}>
          Manage your personal and professional finances with ease.
        </p>
      </section>

      {/* Features Row */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "40px 20px",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "1.6rem", marginBottom: 30, color: "#0d1f4c" }}>
          ✨ Features
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "20px",
          }}
        >
          {/* Personal Flow */}
          <div style={{ width: "30%", textAlign: "center" }}>
            <h3 style={{ color: "#1f6feb" }}>Personal Flow</h3>
            <p>💰 Track your personal income</p>
            <p>📊 Visualize your money</p>
          </div>

          {/* Center Features */}
          <div style={{ width: "40%", textAlign: "center" }}>
            <p>💰 Track your personal income, expenses and savings</p>
            <p>📊 Visualize your financial health with charts</p>
            <p>📝 Create and manage clients, quotes and invoices</p>
            <p>🔔 Receive weekly tips to improve your finances</p>
            <p>🔒 Secure and personalized experience with login</p>
          </div>

          {/* Pro Flow */}
          <div style={{ width: "30%", textAlign: "center" }}>
            <h3 style={{ color: "#0ea5a0" }}>Pro Flow</h3>
            <p>📝 Manage your clients</p>
            <p>📄 Generate invoices</p>
          </div>
        </div>

        {/* Flow Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 20,
            margin: "32px 0 16px",
          }}
        >
          <button style={buttonStyle("#ff6b61", "#ff5045")}>Personal Mode</button>
          <button style={buttonStyle("#1f6feb", "#155ccc")}>Pro Mode</button>
        </div>

        {/* Dashboard */}
        <Image
          src="/images/dashboard.png"
          alt="Dashboard"
          width={400}
          height={250}
          style={{ borderRadius: 16 }}
        />

        {/* Socials */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 16,
            marginTop: 20,
          }}
        >
          <a href="#" style={socialLink}>🌐</a>
          <a href="#" style={socialLink}>🐦</a>
          <a href="#" style={socialLink}>💼</a>
        </div>
      </section>
    </>
  );
}

const navLinkStyle = {
  textDecoration: "none",
  color: "#333",
  fontSize: "1rem",
  transition: "color 0.3s",
};
const socialLink = {
  fontSize: "1.5rem",
  transition: "0.3s",
};
const buttonStyle = (bg, hover) => ({
  padding: "12px 32px",
  borderRadius: 16,
  border: "none",
  cursor: "pointer",
  background: bg,
  color: "#fff",
  fontWeight: 700,
  fontSize: "1rem",
  transition: "0.3s",
});
