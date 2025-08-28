/*fintrack/pages/api/clients.js*/
import { clients } from "../../utils/data";

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(clients);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
