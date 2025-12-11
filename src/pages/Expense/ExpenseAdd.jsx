import { useState, useEffect } from "react";
import axios from "../../api/axios";
import Sidebar from "../../components/Sidebar";

export default function ExpenseAdd() {
  const [categoryID, setCategoryID] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [spentAt, setSpentAt] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("/category")
      .then((res) => setCategories(res.data.data))
      .catch((err) => console.error("ERR GET CATEGORY:", err));
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/expense", {
        category_id: Number(categoryID),
        amount: Number(amount),
        note: note,
        spent_at: new Date(spentAt).toISOString(),
      });

      console.log("ADD SUCCESS:", res.data);
      alert("Expense added!");
      window.location = "/expenses"
    } catch (err) {
      console.error("ERR ADD EXPENSE:", err.response?.data || err);
      alert("Gagal menambahkan expense!");
    }
  };

  return (
    <div className="flex bg-[#0f0f10] min-h-screen text-gray-200">
      <Sidebar />

      <div className="ml-60 p-10 w-full">
        <h1 className="text-3xl font-bold mb-8">Add New Expense</h1>

        <div className="bg-[#18181b] p-8 rounded-xl shadow-xl border border-gray-800 max-w-xl">
          <form onSubmit={submit} className="space-y-5">
            {/* CATEGORY */}
            <div>
              <label className="block mb-1 text-gray-300 font-medium">
                Category
              </label>
              <select
                className="w-full p-3 rounded-lg bg-[#222225] border border-gray-700 text-gray-200 focus:outline-none focus:border-blue-500 transition"
                onChange={(e) => setCategoryID(e.target.value)}
              >
                <option value="">-- Select Category --</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* AMOUNT */}
            <div>
              <label className="block mb-1 text-gray-300 font-medium">
                Amount
              </label>
              <input
                type="number"
                placeholder="Enter amount"
                className="w-full p-3 rounded-lg bg-[#222225] border border-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition"
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            {/* DATE */}
            <div>
              <label className="block mb-1 text-gray-300 font-medium">
                Spent At
              </label>
              <input
                type="datetime-local"
                className="w-full p-3 rounded-lg bg-[#222225] border border-gray-700 text-gray-200 focus:outline-none focus:border-blue-500 transition"
                onChange={(e) => setSpentAt(e.target.value)}
              />
            </div>

            {/* NOTE */}
            <div>
              <label className="block mb-1 text-gray-300 font-medium">
                Note
              </label>
              <textarea
                placeholder="Optional note..."
                className="w-full p-3 rounded-lg bg-[#222225] border border-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition h-24"
                onChange={(e) => setNote(e.target.value)}
              />
            </div>

            {/* BUTTON */}
            <button className="w-full bg-blue-600 hover:bg-blue-700 transition-all text-white p-3 rounded-lg font-semibold shadow-lg shadow-blue-900/40">
              Add Expense
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
