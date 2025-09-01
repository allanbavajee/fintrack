/* fintrack/pages/clients/add.jsx */
import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";

export default function AddClient() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddClient = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // insertion dans la table clients
      const { data, error } = await supabase
        .from("clients")
        .insert([{ name, email }]);

      if (error) throw error;

      console.log("✅ Nouveau client ajouté:", data);

      // redirige vers la liste des clients
      router.push("/clients");
    } catch (err) {
      console.error("❌ Erreur lors de l’ajout:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Ajouter un client</h1>

      <form onSubmit={handleAddClient} style={{ marginTop: "1rem" }}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Nom :</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ marginLeft: "1rem", padding: "0.5rem" }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ marginLeft: "1rem", padding: "0.5rem" }}
          />
        </div>

        {error && <p style={{ color: "red" }}>⚠ {error}</p>}

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "0.6rem 1.2rem",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {loading ? "Ajout en cours..." : "Ajouter"}
        </button>
      </form>
    </div>
  );
}
