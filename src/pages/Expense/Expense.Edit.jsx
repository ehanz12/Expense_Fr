import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import Sidebar from "../../components/Sidebar";

export default function ExpenseEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categoryID, setCategoryID] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [spentAt, setSpentAt] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load categories & expense data
  useEffect(() => {
    const loadData = async () => {
      try {
        const catRes = await axios.get("/category");
        setCategories(catRes.data.data);

        const expRes = await axios.get(`/expense/${id}`);
        const exp = expRes.data.data;

        setCategoryID(exp.category_id);
        setAmount(exp.amount);
        setNote(exp.note);

        // convert ISO → datetime-local format
        setSpentAt(exp.spent_at.slice(0, 16));
      } catch (err) {
        console.error(err);
        alert("Failed loading expense");
        navigate("/expenses");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id, navigate]);

  const submit = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(`/expense/${id}`, {
        category_id: Number(categoryID),
        amount: Number(amount),
        note,
        spent_at: new Date(spentAt).toISOString(),
      });

      alert("Expense updated!");
      navigate("/expenses");
    } catch (err) {
      console.error("UPDATE ERROR:", err.response?.data || err);
      alert("Gagal update expense!");
    }
  };

  if (loading) {
    return (
      <div className="flex bg-[#0f0f10] h-screen text-gray-300">
        <Sidebar />
        <div className="flex ml-60 items-center justify-center w-full">
          <p className="animate-pulse">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-[#0f0f10] min-h-screen text-gray-200">
      <Sidebar />

      <div className="ml-60 p-10 w-full">
        <h1 className="text-3xl font-bold mb-6 text-white">Edit Expense</h1>

        <div className="bg-[#18181b] p-6 rounded-xl border border-gray-800 shadow-xl max-w-lg">
          <form onSubmit={submit} className="space-y-5">

            {/* Category */}
            <div>
              <label className="block text-gray-300 mb-1">Category</label>
              <select
                value={categoryID}
                onChange={(e) => setCategoryID(e.target.value)}
                className="w-full p-2.5 rounded-md bg-[#202024] text-white border border-gray-700 focus:border-blue-500 outline-none"
              >
                <option value="">-- Select Category --</option>

                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-gray-300 mb-1">Amount</label>
              <input
                type="number"
                className="w-full p-2.5 rounded-md bg-[#202024] text-white border border-gray-700 focus:border-blue-500 outline-none"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            {/* Spent At */}
            <div>
              <label className="block text-gray-300 mb-1">Spent At</label>
              <input
                type="datetime-local"
                className="w-full p-2.5 rounded-md bg-[#202024] text-white border border-gray-700 focus:border-blue-500 outline-none"
                value={spentAt}
                onChange={(e) => setSpentAt(e.target.value)}
              />
            </div>

            {/* Note */}
            <div>
              <label className="block text-gray-300 mb-1">Note</label>
              <textarea
                className="w-full p-2.5 rounded-md bg-[#202024] text-white border border-gray-700 h-24 focus:border-blue-500 outline-none"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              ></textarea>
            </div>

            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg shadow-lg shadow-blue-900/30 transition-all"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
