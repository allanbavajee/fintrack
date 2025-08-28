// fintrack/pages/dashboard.js
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>FinTrack Dashboard</h1>
      <p>{user ? `Logged in as ${user.email}` : "No user"}</p>
      <nav style={{ display: "flex", gap: 12, margin: "12px 0" }}>
        <a href="/clients">Clients</a>
        <a href="/quotes">Quotes</a>
        <a href="/invoices">Invoices</a>
      </nav>
      <button onClick={logout}>Log out</button>
    </div>
  );
}
