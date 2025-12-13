import { useState } from "react";
import axios from "../../api/axios";
import Sidebar from "../../components/Sidebar";
import { Navigate } from "react-router-dom";

export default function CategoryAdd() {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/category", { name, icon });

      console.log("ADD CATEGORY:", res.data);
      alert("Category added!");
      setName(""); // reset field
      setIcon("")
      return <Navigate to="/categories" />;

    } catch (err) {
      console.error("ERR:", err.response?.data || err);
      alert("Gagal menambahkan kategori!");
    }
  };

  return (
    <div className="flex bg-[#0f0f10] min-h-screen text-gray-200">
      <Sidebar />

      <div className="ml-60 p-8 w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Add Category</h1>
          <p className="text-gray-400 text-sm">Create a new expense category</p>
        </div>

        {/* Form Card */}
        <div className="bg-[#18181b] p-6 rounded-xl shadow-xl border border-gray-800 max-w-lg">
          <form onSubmit={submit}>

            <label className="block text-gray-300 mb-2">Category Name</label>
            <input
              type="text"
              value={name}
              placeholder="ex : Food, Transport, etc"
              onChange={(e) => setName(e.target.value)}
              className="w-full mb-5 p-3 rounded-lg bg-[#202024] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              required
            />

            <label className="block text-gray-300 mb-2">Icon</label>
            <input
              type="text"
              value={icon}
              placeholder="ex : Hours, Daily, etc"
              onChange={(e) => setIcon(e.target.value)}
              className="w-full mb-5 p-3 rounded-lg bg-[#202024] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              required
            />

            <button
              className="w-full bg-blue-600 hover:bg-blue-700 transition-all text-white p-3 rounded-lg shadow-lg shadow-blue-900/30 font-medium"
            >
              Save Category
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
