import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import Sidebar from "../../components/Sidebar";

export default function CategoryEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [loading, setLoading] = useState(true);

  // Load data category
  useEffect(() => {
    axios
      .get(`/category/${id}`)
      .then((res) => {
        setName(res.data.data.name);
        setIcon(res.data.data.icon);
      })
      .catch(() => {
        alert("Category not found");
        navigate("/categories");
      })
      .finally(() => setLoading(false));
  }, [id]);

  // Submit update
  const submit = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(`/category/${id}`, {
        name: name,
        icon : icon,
      });

      alert("Category updated!");
      return navigate("/categories");
    } catch (err) {
      console.error(err.response?.data);
      alert("Gagal update category!");
    }
  };

  if (loading) {
    return (
      <div className="flex bg-[#0f0f10] h-screen text-gray-300">
        <Sidebar />
        <div className="flex items-center justify-center ml-60 w-full">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-[#0f0f10] min-h-screen text-gray-200">
      <Sidebar />

      <div className="ml-60 p-10 w-full">
        <h1 className="text-3xl font-bold mb-6">Edit Category</h1>

        <div className="bg-[#18181b] p-6 rounded-xl border border-gray-800 shadow-xl max-w-lg">
          <form onSubmit={submit}>
            <label className="text-gray-300 mb-1 block">Category Name</label>

            <input
              type="text"
              className="w-full p-2.5 rounded-md bg-[#202024] text-white border border-gray-700 mb-4 focus:border-blue-500 outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label className="text-gray-300 mb-1 block">Icons</label>

            <input
              type="text"
              className="w-full p-2.5 rounded-md bg-[#202024] text-white border border-gray-700 mb-4 focus:border-blue-500 outline-none"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
            />

            <button
              className="w-full bg-blue-600 hover:bg-blue-700 transition-all text-white py-2.5 rounded-lg shadow-lg shadow-blue-900/30"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
