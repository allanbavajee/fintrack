/* fintrack/pages/clients/add.jsx */
import { useState } from "react";

export default function AddClient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch("/api/clients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });
    window.location.href = "/clients";
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>➕ Ajouter un client</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        /><br/>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br/>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}
