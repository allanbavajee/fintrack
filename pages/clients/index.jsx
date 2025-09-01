/* pages/clients/index.jsx */
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function ClientsPage() {
  const [session, setSession] = useState(null);
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({
    name: "",
    company: "",
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

    if (!form.name) {
      setMessage("Le champ Nom est obligatoire.");
      return;
    }

    try {
      // Vérifier si client existe déjà
      const { data: existing } = await supabase
        .from("clients")
        .select("*")
        .eq("user_id", session.user.id)
        .eq("name", form.name);

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
        name: "",
        company: "",
      });

      // Recharger la liste des 10 derniers clients
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
    <div style={{ display: "flex", gap: 40, maxWidth: 900, margin: "0 auto" }}>
      {/* Formulaire à gauche */}
      <div style={{ flex: 1 }}>
        <h2>Ajouter un client</h2>
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nom *</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Nom de la société</label>
            <input
              type="text"
              name="company"
              value={form.company}
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
                {c.name} {c.company ? `– ${c.company}` : ""}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
