/*fintrack/pages/quotes/index.jsx*/
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function Quotes() {
  const [quotes, setQuotes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuotes = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setError("Please login first");
        return;
      }
      const token = session.access_token;
      try {
        const res = await fetch("/api/quotes", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok) setQuotes(data);
        else setError(data.error);
      } catch {
        setError("Failed to load quotes");
      }
    };
    fetchQuotes();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Quotes</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {quotes.map(q => (
          <li key={q.id}>Quote #{q.id} - {q.amount}</li>
        ))}
      </ul>
    </div>
  );
}
