/* pages/index.jsx */
import Link from "next/link";

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "24px",
        background: "#ffffff",
        fontFamily: "Inter, Arial, sans-serif",
        color: "#222",
        textAlign: "center",
      }}
    >
      {/* En-tête */}
      <h1 style={{ fontSize: "3rem", marginBottom: "12px" }}>Bienvenue sur Fintrack 🚀</h1>
      <p style={{ fontSize: "1.08rem", color: "#444", maxWidth: 680, marginBottom: "26px" }}>
        Gérez vos finances personnelles et professionnelles facilement. Choisissez votre mode ci-dessous :
      </p>

      {/* Boutons de sélection */}
      <div style={{ display: "flex", gap: 18, marginBottom: 34 }}>
        <Link href="/personal">
          <button
            style={{
              padding: "12px 28px",
              fontSize: "1rem",
              borderRadius: 10,
              border: "none",
              cursor: "pointer",
              backgroundColor: "#ffffff",
              color: "#1f6feb",
              fontWeight: 700,
              boxShadow: "0 6px 18px rgba(31,111,235,0.08)",
              transition: "transform .12s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            Mode Personnel
          </button>
        </Link>

        <Link href="/pro">
          <button
            style={{
              padding: "12px 28px",
              fontSize: "1rem",
              borderRadius: 10,
              border: "none",
              cursor: "pointer",
              backgroundColor: "#ffffff",
              color: "#0ea5a0",
              fontWeight: 700,
              boxShadow: "0 6px 18px rgba(14,165,160,0.08)",
              transition: "transform .12s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            Mode Pro
          </button>
        </Link>
      </div>

      {/* Flows */}
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%", maxWidth: 1000, marginBottom: 36 }}>
        {/* Flow Personnel */}
        <div style={{ textAlign: "center", width: 180 }}>
          <div
            style={{
              width: 140,
              margin: "0 auto 12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 140,
              borderRadius: 16,
              background: "linear-gradient(135deg,#e6f7ff,#f0fbf8)",
              boxShadow: "0 8px 24px rgba(31,111,235,0.06)",
            }}
          >
            <div style={{ fontSize: 36 }}>💰</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
            <div style={{ fontWeight: 700, color: "#1f6feb" }}>Flow Personnel</div>

            <div style={{ textAlign: "center", marginTop: 8 }}>
              <div style={{ marginBottom: 8, fontWeight: 600 }}>Revenus</div>
              <div style={{ height: 12 }} />
              <div style={{ marginBottom: 8, fontWeight: 600 }}>Dépenses</div>
              <div style={{ height: 12 }} />
              <div style={{ marginBottom: 2, fontWeight: 600 }}>Épargne</div>
            </div>
          </div>
        </div>

        {/* Flow Professionnel */}
        <div style={{ textAlign: "center", width: 180 }}>
          <div
            style={{
              width: 140,
              margin: "0 auto 12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 140,
              borderRadius: 16,
              background: "linear-gradient(135deg,#f0fff4,#fff7ed)",
              boxShadow: "0 8px 24px rgba(14,165,160,0.06)",
            }}
          >
            <div style={{ fontSize: 36 }}>📋</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
            <div style={{ fontWeight: 700, color: "#0ea5a0" }}>Flow Professionnel</div>

            <div style={{ textAlign: "center", marginTop: 8 }}>
              <div style={{ marginBottom: 8, fontWeight: 600 }}>Clients</div>
              <div style={{ height: 12 }} />
              <div style={{ marginBottom: 8, fontWeight: 600 }}>Devis</div>
              <div style={{ height: 12 }} />
              <div style={{ marginBottom: 2, fontWeight: 600 }}>Factures</div>
            </div>
          </div>
        </div>
      </div>

      {/* Fonctionnalités */}
      <div style={{ maxWidth: 720, textAlign: "center", color: "#444" }}>
        <h2 style={{ fontSize: "1.25rem", marginBottom: 12 }}>✨ Fonctionnalités</h2>
        <ul style={{ listStyle: "none", paddingLeft: 0, lineHeight: 1.9, fontSize: "1.03rem" }}>
          <li>💰 Suivi des revenus, dépenses et épargne</li>
          <li>📊 Visualisation de votre santé financière</li>
          <li>📝 Création et gestion des clients, devis et factures</li>
          <li>🔔 Notifications hebdomadaires pour améliorer vos finances</li>
          <li>🔒 Expérience sécurisée et personnalisée avec connexion</li>
        </ul>
      </div>
    </div>
  );
}
