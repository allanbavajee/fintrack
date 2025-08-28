/*fintrack/pages/quotes.js*/
import { useEffect, useState } from "react";

export default function Quotes() {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    fetch("/api/quotes")
      .then((res) => res.json())
      .then((data) => setQuotes(data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Quotes</h1>
      <ul className="space-y-2">
        {quotes.map((q) => (
          <li key={q.id} className="p-3 bg-white shadow rounded">
            #{q.id} – {q.client} – {q.amount}€
          </li>
        ))}
      </ul>
    </div>
  );
}
