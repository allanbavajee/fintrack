/*fintrack/pages/api/invoices.js*/
import { invoices } from "../../utils/data";

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(invoices);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
