/*fintrack/utils/data.js*/
export const clients = [
  { id: 1, name: "Alice Dupont", email: "alice@example.com" },
  { id: 2, name: "Bob Martin", email: "bob@example.com" },
];

export const quotes = [
  { id: 1, client: "Alice Dupont", amount: 500 },
  { id: 2, client: "Bob Martin", amount: 1200 },
];

export const invoices = [
  { id: 1, client: "Alice Dupont", amount: 500, status: "Paid" },
  { id: 2, client: "Bob Martin", amount: 1200, status: "Pending" },
];
