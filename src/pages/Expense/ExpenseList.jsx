import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import axios from "../../api/axios";

export default function ExpenseList() {
  const [items, setItems] = useState([]);

  const loadExpenses = async () => {
    const res = await axios.get("/expense");
    setItems(res.data.data);
  };
  useEffect(() => {
    loadExpenses();
  }, []);

  const deleteExpense = async (id) => {
    if (!confirm("Yakin ingin menghapus?")) return;

    try {
      const res = await axios.delete(`/expense/${id}`);

      console.log("DELETE:", res.data);
      alert("Expense deleted!");
      loadExpenses(); // refresh data
    } catch (err) {
      alert("Gagal menghapus expense!");
    }
  };
  return (
    <div className="flex bg-[#0f0f10] min-h-screen text-gray-200">
      <Sidebar />

      <div className="ml-60 p-8 w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Expenses</h1>
            <p className="text-gray-400 text-sm mt-1">
              Manage and track your spending
            </p>
          </div>

          <Link
            to="/expenses/add"
            className="bg-blue-600 hover:bg-blue-700 transition-all text-white px-5 py-2.5 rounded-lg shadow-lg shadow-blue-900/30"
          >
            + Add Expense
          </Link>
        </div>

        {/* Card Container */}
        <div className="bg-[#18181b] rounded-xl shadow-xl p-6 border border-gray-800">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-700">
                <th className="pb-3">Category</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Date</th>
                <th className="pb-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {items.map((exp) => (
                <tr
                  key={exp.id}
                  className="border-b border-gray-800 hover:bg-[#202024] transition-all"
                >
                  <td className="py-3 font-medium text-gray-100">
                    {exp.category.name}
                  </td>
                  <td className="py-3 text-gray-300">
                    Rp {exp.amount.toLocaleString()}
                  </td>
                  <td className="py-3 text-gray-400">{exp.spent_at}</td>

                  <td className="py-3 text-center">
                    <Link
                      to={`/expenses/edit/${exp.id}`}
                      className="text-blue-400 hover:text-blue-300 font-medium mr-4"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => deleteExpense(exp.id)}
                      className="text-red-400 hover:text-red-300 font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
