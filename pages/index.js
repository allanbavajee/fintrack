/* pages/index.js */
import { FaUser, FaFileInvoice, FaQuoteRight, FaMoneyBill, FaArrowDown, FaArrowRight } from "react-icons/fa";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-12">
      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
        Welcome to <span className="text-blue-600">Fintrack 🚀</span>
      </h1>
      <p className="text-gray-600 text-center max-w-2xl mb-10">
        Manage your <strong>personal</strong> and <strong>professional</strong> finances easily.
        Choose your mode below:
      </p>

      {/* Buttons */}
      <div className="flex gap-6 mb-14">
        <Link href="/personal">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow hover:bg-blue-700 transition">
            Personal Mode
          </button>
        </Link>
        <Link href="/pro">
          <button className="bg-green-600 text-white px-8 py-3 rounded-lg shadow hover:bg-green-700 transition">
            Pro Mode
          </button>
        </Link>
      </div>

      {/* Features */}
      <div className="bg-gray-50 p-8 rounded-xl shadow-md max-w-4xl text-center">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Features</h2>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <li className="flex flex-col items-center text-gray-700">
            <FaMoneyBill className="text-3xl text-green-600 mb-2" />
            Track income & expenses
          </li>
          <li className="flex flex-col items-center text-gray-700">
            <FaUser className="text-3xl text-blue-600 mb-2" />
            Manage clients
          </li>
          <li className="flex flex-col items-center text-gray-700">
            <FaQuoteRight className="text-3xl text-orange-600 mb-2" />
            Create quotes
          </li>
          <li className="flex flex-col items-center text-gray-700">
            <FaFileInvoice className="text-3xl text-purple-600 mb-2" />
            Generate invoices
          </li>
        </ul>
      </div>

      {/* Flows Section */}
      <div className="flex flex-col md:flex-row justify-between items-start w-full max-w-6xl mt-16">
        {/* Personal Flow */}
        <div className="flex-1 flex flex-col items-center mb-12 md:mb-0">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Personal Flow</h3>
          <div className="flex flex-col items-center text-gray-700 font-medium">
            <span className="flex items-center"><FaMoneyBill className="mr-2 text-green-600" /> Income</span>
            <FaArrowDown className="text-gray-500 my-2" />
            <span className="flex items-center"><FaArrowRight className="mr-2 text-blue-600" /> Expenses</span>
            <FaArrowDown className="text-gray-500 my-2" />
            <span className="flex items-center"><FaArrowRight className="mr-2 text-yellow-600" /> Savings</span>
          </div>
        </div>

        {/* Pro Flow */}
        <div className="flex-1 flex flex-col items-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Pro Flow</h3>
          <div className="flex flex-col items-center text-gray-700 font-medium">
            <span className="flex items-center"><FaUser className="mr-2 text-blue-600" /> Client</span>
            <FaArrowDown className="text-gray-500 my-2" />
            <span className="flex items-center"><FaQuoteRight className="mr-2 text-orange-600" /> Quotation</span>
            <FaArrowDown className="text-gray-500 my-2" />
            <span className="flex items-center"><FaFileInvoice className="mr-2 text-purple-600" /> Invoice</span>
          </div>
        </div>
      </div>
    </div>
  );
}
