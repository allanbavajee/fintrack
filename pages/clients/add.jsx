/* fintrack/pages/clients/add.jsx */
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function AddClient() {
  const [company_name, setCompanyName] = useState("");
  const [BRN, setBRN] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [contact_name, setContactName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Envoi en cours...");

    // Vérifie les champs
    if (!company_name || !BRN || !email || !phone || !contact_name) {
      setMessage("Tous les champs sont requis.");
      return;
    }

    try {
      // Ajout client via Supabase
      const { data, error } = await supabase
        .from("clients")
        .insert([{ company_name, brn: BRN, email, phone, contact_name }])
        .select()
        .single();

      if (error) {
        console.error("Erreur ajout client:", error);
        setMessage("Erreur: " + error.message);
      } else {
        console.log("Client créé:", data);
        setMessage("Client créé ✅");
        // Reset form
        setCompanyName(""); setBRN(""); setEmail(""); setPhone(""); setContactName("");
      }
    } catch (err) {
      console.error("Erreur fetch:", err);
      setMessage("Erreur côté serveur ou connexion.");
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h2>Ajouter un client</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
        <input placeholder="Company Name" value={company_name} onChange={e => setCompanyName(e.target.value)} />
        <input placeholder="BRN" value={BRN} onChange={e => setBRN(e.target.value)} />
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
        <input placeholder="Contact Name" value={contact_name} onChange={e => setContactName(e.target.value)} />
        <button type="submit">Créer le client</button>
      </form>
      {message && <p style={{ marginTop: "1rem", color: message.startsWith("Erreur") ? "red" : "green" }}>{message}</p>}
    </div>
  );
}
