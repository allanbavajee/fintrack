/* pages/index.jsx */
import { FaMoneyBillWave, FaChartPie, FaPiggyBank, FaUser, FaQuoteRight, FaFileInvoice } from "react-icons/fa";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 font-sans">
      {/* Title */}
      <h1 className="text-5xl font-bold text-gray-800 mb-4 text-center">
        Welcome to <span className="text-blue-600">Fintrack 🚀</span>
      </h1>
      <p className="text-gray-600 text-center max-w-2xl mb-8">
        Manage your personal and professional finances easily. Choose your mode below:
      </p>

      {/* Buttons */}
      <div className="flex gap-6 mb-12">
        <Link href="/personal">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-xl shadow hover:bg-blue-700 transition">
            Personal Mode
          </button>
        </Link>
        <Link href="/pro">
          <button className="bg-green-600 text-white px-8 py-3 rounded-xl shadow hover:bg-green-700 transition">
            Pro Mode
          </button>
        </Link>
      </div>

      {/* Main Layout: Flows + Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-6xl">
        
        {/* Personal Flow */}
        <div className="flex flex-col items-center bg-blue-50 p-6 rounded-2xl shadow-md">
          <h3 className="text-xl font-semibold text-blue-700 mb-6">📌 Personal Flow</h3>
          <div className="flex flex-col items-center space-y-6 text-gray-700 font-medium">
            
            <div className="flex flex-col items-center">
              <div className="bg-green-100 text-green-700 p-4 rounded-full shadow">
                <FaMoneyBillWave className="text-2xl" />
              </div>
              <p className="mt-2 font-semibold">Income</p>
              <p className="text-sm text-gray-500 max-w-xs text-center">Add and track all your sources of income to know your total cash inflow.</p>
            </div>

            <div className="h-6 border-l-2 border-blue-300"></div>

            <div className="flex flex-col items-center">
              <div className="bg-red-100 text-red-700 p-4 rounded-full shadow">
                <FaChartPie className="text-2xl" />
              </div>
              <p className="mt-2 font-semibold">Expenses</p>
              <p className="text-sm text-gray-500 max-w-xs text-center">Log all your expenses to monitor spending and avoid overspending.</p>
            </div>

            <div className="h-6 border-l-2 border-blue-300"></div>

            <div className="flex flex-col items-center">
              <div className="bg-yellow-100 text-yellow-700 p-4 rounded-full shadow">
                <FaPiggyBank className="text-2xl" />
              </div>
              <p className="mt-2 font-semibold">Savings</p>
              <p className="text-sm text-gray-500 max-w-xs text-center">Keep track of your savings and set financial goals to grow your wealth.</p>
            </div>
          </div>
        </div>

        {/* Features (center) */}
        <div className="flex flex-col items-center bg-gray-50 p-6 rounded-2xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">✨ Features</h3>
          <ul className="space-y-4 text-gray-700 text-left">
            <li>💰 Track personal income, expenses, and savings</li>
            <li>📊 Visualize your financial health with charts</li>
            <li>📝 Create and manage clients, quotes, and invoices</li>
            <li>🔔 Receive weekly tips to improve your finances</li>
            <li>🔒 Secure and personalized experience with login</li>
          </ul>
        </div>

        {/* Pro Flow */}
        <div className="flex flex-col items-center bg-green-50 p-6 rounded-2xl shadow-md">
          <h3 className="text-xl font-semibold text-green-700 mb-6">📌 Pro Flow</h3>
          <div className="flex flex-col items-center space-y-6 text-gray-700 font-medium">
            
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 text-blue-700 p-4 rounded-full shadow">
                <FaUser className="text-2xl" />
              </div>
              <p className="mt-2 font-semibold">Client</p>
              <p className="text-sm text-gray-500 max-w-xs text-center">Create and manage clients efficiently with secure profiles.</p>
            </div>

            <div className="h-6 border-l-2 border-green-300"></div>

            <div className="flex flex-col items-center">
              <div className="bg-orange-100 text-orange-700 p-4 rounded-full shadow">
                <FaQuoteRight className="text-2xl" />
              </div>
              <p className="mt-2 font-semibold">Quotation</p>
              <p className="text-sm text-gray-500 max-w-xs text-center">Generate professional quotes quickly for each client.</p>
            </div>

            <div className="h-6 border-l-2 border-green-300"></div>

            <div className="flex flex-col items-center">
              <div className="bg-purple-100 text-purple-700 p-4 rounded-full shadow">
                <FaFileInvoice className="text-2xl" />
              </div>
              <p className="mt-2 font-semibold">Invoice</p>
              <p className="text-sm text-gray-500 max-w-xs text-center">Convert quotes into invoices and track payments easily.</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
