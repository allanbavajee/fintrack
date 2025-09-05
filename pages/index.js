import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

// Exemple de steps
const personalSteps = [
  { icon: "💰", title: "Budget", desc: "Track income & expenses", extra: "Personalized insights" },
  { icon: "📊", title: "Charts", desc: "Visualize your money", extra: "Better decisions" },
];

const proSteps = [
  { icon: "📝", title: "Clients", desc: "Manage your clients", extra: "CRM included" },
  { icon: "📄", title: "Invoices", desc: "Quotes & invoices", extra: "Fast & easy" },
];

const cardStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: 16,
  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  textAlign: "center",
  marginBottom: 28,
  transition: "0.3s",
  width: "220px",
};

const arrowSVG = (
  <div style={{ textAlign: "center", marginBottom: 28 }}>
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#1f6feb" strokeWidth="2">
      <path d="M12 5v14M5 12h14" />
    </svg>
  </div>
);

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
              gap: "28px",
              listStyle: "none",
              margin: 0,
              padding: 0,
              fontWeight: "500",
            }}
          >
            <li>
              <Link href="/" legacyBehavior>
                <a style={navLinkStyle}>Home</a>
              </Link>
            </li>
            <li>
              <Link href="/about" legacyBehavior>
                <a style={navLinkStyle}>About Us</a>
              </Link>
            </li>
            <li>
              <Link href="/services" legacyBehavior>
                <a style={navLinkStyle}>Services</a>
              </Link>
            </li>
            <li>
              <Link href="/contact" legacyBehavior>
                <a style={navLinkStyle}>Contact Us</a>
              </Link>
            </li>
            <li>
              <Link href="/login" legacyBehavior>
                <a style={navLinkStyle}>Login</a>
              </Link>{" "}
              |{" "}
              <Link href="/signup" legacyBehavior>
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

      {/* Main Content */}
      <section
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          maxWidth: 1300,
          margin: "0 auto",
          padding: "0 16px",
          gap: "40px",
        }}
      >
        {/* Personal Flow */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "30%",
          }}
        >
          <h2 style={{ color: "#1f6feb", marginBottom: 24 }}>Personal Flow</h2>
          {personalSteps.map((item, index) => (
            <div key={index} style={{ position: "relative" }}>
              <div
                style={cardStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 28px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 2px 6px rgba(0,0,0,0.05)";
                }}
              >
                <div style={{ fontSize: 36, marginBottom: 8 }}>{item.icon}</div>
                <h3>{item.title}</h3>
                <p style={{ fontSize: 13, color: "#555", whiteSpace: "nowrap" }}>
                  {item.desc}
                </p>
                <p
                  style={{
                    fontSize: 12,
                    color: "#333",
                    marginTop: 6,
                  }}
                >
                  {item.extra}
                </p>
              </div>
              {index < personalSteps.length - 1 && arrowSVG}
            </div>
          ))}
        </div>

        {/* Features */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "40%",
          }}
        >
          <h2 style={{ fontSize: "1.5rem", marginBottom: 20, color: "#0d1f4c" }}>
            ✨ Features
          </h2>
          <ul
            style={{
              listStyle: "none",
              paddingLeft: 0,
              lineHeight: 2,
              textAlign: "center",
            }}
          >
            <li>💰 Track your personal income, expenses and savings</li>
            <li>📊 Visualize your financial health with charts</li>
            <li>📝 Create and manage clients, quotes and invoices</li>
            <li>🔔 Receive weekly tips to improve your finances</li>
            <li>🔒 Secure and personalized experience with login</li>
          </ul>

          {/* Flow Buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 20,
              margin: "24px 0 16px 0",
            }}
          >
            <Link href="/personal">
              <button
                style={buttonStyle("#ff6b61", "#ff5045")}
              >
                Personal Mode
              </button>
            </Link>
            <Link href="/pro">
              <button
                style={buttonStyle("#1f6feb", "#155ccc")}
              >
                Pro Mode
              </button>
            </Link>
          </div>

          {/* Dashboard */}
          <Image
            src="/images/dashboard.png"
            alt="Dashboard Example"
            width={350}
            height={220}
            style={{ borderRadius: 16, marginTop: 10 }}
          />

          {/* Social Logos */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 16,
              marginTop: 16,
            }}
          >
            <a href="https://facebook.com" target="_blank">🌐</a>
            <a href="https://twitter.com" target="_blank">🐦</a>
            <a href="https://linkedin.com" target="_blank">💼</a>
          </div>
        </div>

        {/* Pro Flow */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "30%",
          }}
        >
          <h2 style={{ color: "#0ea5a0", marginBottom: 24 }}>Pro Flow</h2>
          {proSteps.map((item, index) => (
            <div key={index} style={{ position: "relative" }}>
              <div
                style={cardStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 28px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 2px 6px rgba(0,0,0,0.05)";
                }}
              >
                <div style={{ fontSize: 36, marginBottom: 8 }}>{item.icon}</div>
                <h3>{item.title}</h3>
                <p style={{ fontSize: 13, color: "#555", whiteSpace: "nowrap" }}>
                  {item.desc}
                </p>
                <p
                  style={{
                    fontSize: 12,
                    color: "#333",
                    marginTop: 6,
                  }}
                >
                  {item.extra}
                </p>
              </div>
              {index < proSteps.length - 1 && arrowSVG}
            </div>
          ))}
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
  marginTop: 8,
});
