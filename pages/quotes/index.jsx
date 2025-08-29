/* fintrack/pages/quotes/index.jsx */
import { useEffect, useState } from "react";

export default function QuotesPage() {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    fetch("/api/quotes")
      .then((res) => res.json())
      .then((data) => setQuotes(data));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>📝 Devis</h1>
      <ul>
        {quotes.map((q) => (
          <li key={q.id}>
            Client {q.client_id} : {q.amount}€ - {q.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
