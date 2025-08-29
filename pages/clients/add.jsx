/* fintrack/pages/clients/add.jsx */
import { useState } from "react";
import { useRouter } from "next/router";

export default function AddClient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Client ajouté ✅");
        router.push("/clients"); // Retour à la liste
      } else {
        alert("Erreur: " + data.error);
      }
    } catch (err) {
      console.error("Erreur:", err);
      alert("Erreur serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Ajouter un client 👤</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Nom :</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ marginLeft: "1rem" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ marginLeft: "1rem" }}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Ajout en cours..." : "Ajouter"}
        </button>
      </form>
    </div>
  );
}
