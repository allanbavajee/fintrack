/*fintrack/pages/api/quotes.js*/
import { quotes } from "../../utils/data";

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(quotes);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
