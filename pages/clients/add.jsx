/* fintrack/pages/clients/add.jsx */
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function AddClient() {
  const [company_name, setCompanyName] = useState("");
  const [contact_name, setContactName] = useState("");
  const [brn, setBRN] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    // Vérifie que tous les champs sont remplis
    if (!company_name || !contact_name || !brn || !email || !phone) {
      setMessage("Tous les champs sont requis !");
      return;
    }

    // Insert dans Supabase
    const { data, error } = await supabase
      .from("clients")
      .insert([{ company_name, contact_name, brn, email, phone }]);

    if (error) {
      console.error("Erreur ajout client:", error);
      setMessage("Erreur lors de la création du client");
    } else {
      setMessage("Client créé ✅");
      setCompanyName("");
      setContactName("");
      setBRN("");
      setEmail("");
      setPhone("");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Ajouter un client</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
        <input placeholder="Nom de l'entreprise" value={company_name} onChange={e => setCompanyName(e.target.value)} />
        <input placeholder="Nom du contact" value={contact_name} onChange={e => setContactName(e.target.value)} />
        <input placeholder="BRN" value={brn} onChange={e => setBRN(e.target.value)} />
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="Téléphone" value={phone} onChange={e => setPhone(e.target.value)} />
        <button type="submit">Créer le client</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
