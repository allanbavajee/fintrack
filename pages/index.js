/* pages/index.js */
import { FaUser, FaFileInvoice, FaQuoteRight, FaMoneyBillWave, FaPiggyBank, FaArrowDown } from "react-icons/fa";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-12">
      {/* Title */}
      <h1 className="text-5xl font-bold text-gray-800 mb-4 text-center">
        Welcome to <span className="text-blue-600">Fintrack 🚀</span>
      </h1>
      <p className="text-gray-600 text-center max-w-2xl mb-10">
        Manage your <strong>personal</strong> and <strong>professional</strong> finances easily.
        Choose your mode below:
      </p>

      {/* Buttons */}
      <div className="flex gap-6 mb-14">
        <Link href="/personal">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-xl shadow-lg hover:bg-blue-700 transition">
            Personal Mode
          </button>
        </Link>
        <Link href="/pro">
          <button className="bg-green-600 text-white px-8 py-3 rounded-xl shadow-lg hover:bg-green-700 transition">
            Pro Mode
          </button>
        </Link>
      </div>

      {/* Features */}
      <div className="bg-gray-50 p-8 rounded-2xl shadow-lg max-w-4xl text-center">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">✨ Features</h2>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <li className="flex flex-col items-center text-gray-700">
            <FaMoneyBillWave className="text-4xl text-green-600 mb-2" />
            Track income & expenses
          </li>
          <li className="flex flex-col items-center text-gray-700">
            <FaPiggyBank className="text-4xl text-pink-500 mb-2" />
            Build savings
          </li>
          <li className="flex flex-col items-center text-gray-700">
            <FaQuoteRight className="text-4xl text-orange-600 mb-2" />
            Create quotes
          </li>
          <li className="flex flex-col items-center text-gray-700">
            <FaFileInvoice className="text-4xl text-purple-600 mb-2" />
            Generate invoices
          </li>
        </ul>
      </div>

      {/* Flow Diagrams */}
      <div className="flex flex-col md:flex-row justify-between w-full max-w-6xl mt-20 gap-12">
        
        {/* Personal Flow */}
        <div className="flex-1 flex flex-col items-center bg-blue-50 p-6 rounded-2xl shadow-md">
          <h3 className="text-xl font-semibold text-blue-700 mb-6">📌 Personal Flow</h3>
          <div className="flex flex-col items-center space-y-6 text-gray-700 font-medium">
            <div className="flex flex-col items-center">
              <div className="bg-green-100 text-green-700 p-4 rounded-full shadow">
                <FaMoneyBillWave className="text-2xl" />
              </div>
              <p className="mt-2">Income</p>
            </div>
            <FaArrowDown className="text-blue-400 text-2xl" />
            <div className="flex flex-col items-center">
              <div className="bg-red-100 text-red-700 p-4 rounded-full shadow">
                <FaUser className="text-2xl" />
              </div>
              <p className="mt-2">Expenses</p>
            </div>
            <FaArrowDown className="text-blue-400 text-2xl" />
            <div className="flex flex-col items-center">
              <div className="bg-yellow-100 text-yellow-700 p-4 rounded-full shadow">
                <FaPiggyBank className="text-2xl" />
              </div>
              <p className="mt-2">Savings</p>
            </div>
          </div>
        </div>

        {/* Pro Flow */}
        <div className="flex-1 flex flex-col items-center bg-green-50 p-6 rounded-2xl shadow-md">
          <h3 className="text-xl font-semibold text-green-700 mb-6">📌 Pro Flow</h3>
          <div className="flex flex-col items-center space-y-6 text-gray-700 font-medium">
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 text-blue-700 p-4 rounded-full shadow">
                <FaUser className="text-2xl" />
              </div>
              <p className="mt-2">Client</p>
            </div>
            <FaArrowDown className="text-green-400 text-2xl" />
            <div className="flex flex-col items-center">
              <div className="bg-orange-100 text-orange-700 p-4 rounded-full shadow">
                <FaQuoteRight className="text-2xl" />
              </div>
              <p className="mt-2">Quotation</p>
            </div>
            <FaArrowDown className="text-green-400 text-2xl" />
            <div className="flex flex-col items-center">
              <div className="bg-purple-100 text-purple-700 p-4 rounded-full shadow">
                <FaFileInvoice className="text-2xl" />
              </div>
              <p className="mt-2">Invoice</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
