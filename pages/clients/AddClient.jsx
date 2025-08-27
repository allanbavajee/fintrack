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
    setMessage("");

    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !session) {
      setMessage("You must be logged in to create a client.");
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
        body: JSON.stringify({ company_name, brn: BRN, email, phone, contact_name })
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Client created ✅");
        setCompanyName(""); setBRN(""); setEmail(""); setPhone(""); setContactName("");
      } else {
        setMessage("Error: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setMessage("Error connecting to server");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
      <input placeholder="Company Name" value={company_name} onChange={e => setCompanyName(e.target.value)} />
      <input placeholder="BRN" value={BRN} onChange={e => setBRN(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
      <input placeholder="Contact Name" value={contact_name} onChange={e => setContactName(e.target.value)} />
      <button type="submit">Create Client</button>
      {message && <p>{message}</p>}
    </form>
  );
}
