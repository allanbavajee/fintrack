// /pages/index.js
import { FaMoneyBillWave, FaChartPie, FaUsers, FaFileInvoice, FaArrowDown, FaArrowRight } from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col items-center p-10">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Welcome to <span className="text-blue-600">Fintrack 🚀</span>
      </h1>
      <p className="text-lg text-gray-600 mb-12 text-center max-w-2xl">
        Fintrack helps you manage your money with ease. Choose your mode and start managing your finances smarter.
      </p>

      {/* Layout global en 3 colonnes */}
      <div className="grid grid-cols-3 gap-10 w-full max-w-6xl">
        
        {/* Flow Personal Mode */}
        <div className="flex flex-col items-center bg-gray-50 p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-blue-600">Personal Mode</h2>
          <div className="flex flex-col items-center space-y-4">
            <FaMoneyBillWave className="text-green-500 text-3xl" />
            <span className="font-medium">Income</span>
            <FaArrowDown className="text-gray-500" />
            <FaChartPie className="text-red-500 text-3xl" />
            <span className="font-medium">Expenses</span>
            <FaArrowDown className="text-gray-500" />
            <FaChartPie className="text-yellow-500 text-3xl" />
            <span className="font-medium">Savings</span>
          </div>
        </div>

        {/* Features au centre */}
        <div className="flex flex-col items-center bg-white border p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Features</h2>
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-center gap-3">
              <FaMoneyBillWave className="text-green-500" /> Track personal income, expenses & savings
            </li>
            <li className="flex items-center gap-3">
              <FaChartPie className="text-blue-500" /> Visualize your financial health with charts
            </li>
            <li className="flex items-center gap-3">
              <FaUsers className="text-purple-500" /> Create and manage clients
            </li>
            <li className="flex items-center gap-3">
              <FaFileInvoice className="text-orange-500" /> Generate quotes and invoices
            </li>
            <li className="flex items-center gap-3">
              🔔 Weekly tips to improve your finances
            </li>
            <li className="flex items-center gap-3">
              🔒 Secure & personalized with login
            </li>
          </ul>

          <div className="flex gap-6 mt-10">
            <a
              href="/personal"
              className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
            >
              Personal Mode
            </a>
            <a
              href="/pro"
              className="px-6 py-3 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition"
            >
              Pro Mode
            </a>
          </div>
        </div>

        {/* Flow Pro Mode */}
        <div className="flex flex-col items-center bg-gray-50 p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-green-600">Pro Mode</h2>
          <div className="flex flex-col items-center space-y-4">
            <FaUsers className="text-purple-500 text-3xl" />
            <span className="font-medium">Create Client</span>
            <FaArrowDown className="text-gray-500" />
            <FaFileInvoice className="text-orange-500 text-3xl" />
            <span className="font-medium">Quotation</span>
            <FaArrowDown className="text-gray-500" />
            <FaFileInvoice className="text-blue-500 text-3xl" />
            <span className="font-medium">Invoice</span>
          </div>
        </div>
      </div>
    </div>
  );
}
