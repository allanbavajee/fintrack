/*fintrack/components/Layout.js*/
import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 text-white p-4">
        <nav className="flex space-x-6">
          <Link href="/">Dashboard</Link>
          <Link href="/clients">Clients</Link>
          <Link href="/quotes">Quotes</Link>
          <Link href="/invoices">Invoices</Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4">
        FinTrack © 2025
      </footer>
    </div>
  );
}
