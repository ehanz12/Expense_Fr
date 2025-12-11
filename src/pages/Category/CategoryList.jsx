import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";
import Sidebar from "../../components/Sidebar";

export default function CategoryList() {
  const [items, setItems] = useState([]);

  const loadCategories = async () => {
    const res = await axios.get("/category");
    setItems(res.data.data);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const remove = async (id) => {
    if (!confirm("Yakin ingin menghapus kategori ini?")) return;

    try {
      await axios.delete(`/category/${id}`);
      alert("Category deleted!");
      loadCategories();
    } catch (err) {
      alert("Gagal menghapus kategori!");
    }
  };

  return (
    <div className="flex bg-[#0f0f10] min-h-screen text-gray-200">
      <Sidebar />

      <div className="ml-60 p-8 w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Categories</h1>
            <p className="text-gray-400 text-sm mt-1">
              Manage your expense categories
            </p>
          </div>

          <Link
            to="/categories/add"
            className="bg-blue-600 hover:bg-blue-700 transition-all text-white px-5 py-2.5 rounded-lg shadow-lg shadow-blue-900/30"
          >
            + Add Category
          </Link>
        </div>

        {/* Card */}
        <div className="bg-[#18181b] rounded-xl shadow-xl p-6 border border-gray-800">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-700">
                <th className="pb-3">Name</th>
                <th className="pb-3">Icons</th>
                <th className="pb-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {items.map((cat) => (
                <tr
                  key={cat.id}
                  className="border-b border-gray-800 hover:bg-[#202024] transition-all"
                >
                  <td className="py-3 font-medium text-gray-100">{cat.name}</td>
                  <td className="py-3 font-medium text-gray-100">{cat.icon}</td>

                  <td className="py-3 text-center">
                    <Link
                      to={`/categories/edit/${cat.id}`}
                      className="text-blue-400 hover:text-blue-300 font-medium mr-4"
                    >
                      Edit
                    </Link>

                    <button
                      className="text-red-400 hover:text-red-300 font-medium"
                      onClick={() => remove(cat.id)}
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
