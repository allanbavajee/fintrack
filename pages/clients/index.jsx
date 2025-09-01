/* pages/clients/index.jsx */
/* pages/clients/index.jsx */
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function ClientsPage() {
  const [session, setSession] = useState(null);
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    company_number: "",
    company_address: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      if (session) {
        const { data: clientsData } = await supabase
          .from("clients")
          .select("*")
          .eq("user_id", session.user.id)
          .order("created_at", { ascending: false })
          .limit(10);

        setClients(clientsData || []);
      }
    };
    load();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!form.first_name || !form.last_name || !form.phone) {
      setMessage("Les champs Nom, Prénom et Téléphone sont obligatoires.");
      return;
    }

    try {
      // Vérifier si client existe déjà
      const { data: existing } = await supabase
        .from("clients")
        .select("*")
        .eq("user_id", session.user.id)
        .eq("first_name", form.first_name)
        .eq("last_name", form.last_name)
        .eq("phone", form.phone);

      if (existing.length > 0) {
        setMessage("Ce client existe déjà !");
        return;
      }

      // Ajouter le client
      const { error } = await supabase.from("clients").insert([
        {
          user_id: session.user.id,
          ...form,
        },
      ]);

      if (error) throw error;

      setMessage("✅ Client ajouté avec succès !");
      setForm({
        first_name: "",
        last_name: "",
        phone: "",
        email: "",
        company_number: "",
        company_address: "",
      });

      // Recharger la liste des clients (10 derniers)
      const { data: clientsData } = await supabase
        .from("clients")
        .select("*")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false })
        .limit(10);

      setClients(clientsData || []);
    } catch (err) {
      setMessage(`Erreur : ${err.message}`);
    }
  };

  if (!session) return <p>Veuillez vous connecter pour accéder aux clients.</p>;

  return (
    <div style={{ display: "flex", gap: 40, maxWidth: 1000, margin: "0 auto" }}>
      {/* Formulaire à gauche */}
      <div style={{ flex: 1 }}>
        <h2>Ajouter un client</h2>
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nom *</label>
            <input
              type="text"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Prénom *</label>
            <input
              type="text"
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Téléphone *</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Numéro société</label>
            <input
              type="text"
              name="company_number"
              value={form.company_number}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Adresse société</label>
            <input
              type="text"
              name="company_address"
              value={form.company_address}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Ajouter Client</button>
        </form>
      </div>

      {/* Liste des 10 derniers clients à droite */}
      <div style={{ flex: 1 }}>
        <h2>Derniers clients</h2>
        {clients.length === 0 ? (
          <p>Aucun client ajouté.</p>
        ) : (
          <ul>
            {clients.map((c) => (
              <li key={c.id}>
                {c.first_name} {c.last_name} - {c.phone}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

