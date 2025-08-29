/* fintrack/pages/clients/add.jsx */
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function AddClient() {
  const [company_name, setCompanyName] = useState("");
  const [brn, setBRN] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [contact_name, setContactName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !session) {
      setMessage("Vous devez être connecté pour ajouter un client.");
      return;
    }

    const token = session.access_token;

    try {
      const res = await fetch("/api/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ company_name, brn, email, phone, contact_name })
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Client créé ✅");
        setCompanyName(""); setBRN(""); setEmail(""); setPhone(""); setContactName("");
      } else {
        setMessage("Erreur: " + (data.error || "Erreur inconnue"));
      }
    } catch (err) {
      console.error("Erreur fetch:", err);
      setMessage("Erreur de connexion au serveur");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px", padding: "2rem" }}>
      <input placeholder="Nom de l'entreprise" value={company_name} onChange={e => setCompanyName(e.target.value)} />
      <input placeholder="BRN" value={brn} onChange={e => setBRN(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Téléphone" value={phone} onChange={e => setPhone(e.target.value)} />
      <input placeholder="Nom du contact" value={contact_name} onChange={e => setContactName(e.target.value)} />
      <button type="submit">Créer le client</button>
      {message && <p>{message}</p>}
    </form>
  );
}
