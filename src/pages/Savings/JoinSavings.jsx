import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import axios from "../../api/axios";
import Swal from "sweetalert2";

export default function JoinSavings() {
  const [tabungans, setTabungans] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH TABUNGAN ================= */
  const fetchTabungans = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/tabungan/list");
      console.log(res.data.data);
      setTabungans(res.data.data || []);
    } catch (err) {
      Swal.fire("Error", "Gagal mengambil data tabungan", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTabungans();
  }, []);

  /* ================= JOIN TABUNGAN ================= */
  const joinTabungan = async (tabunganId) => {
    const confirm = await Swal.fire({
      title: "Join Tabungan?",
      text: "Kamu akan menjadi anggota tabungan ini",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, Join",
      cancelButtonText: "Batal",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axios.post(`/tabungan/${tabunganId}/join`);

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Berhasil join tabungan",
        timer: 1500,
        showConfirmButton: false,
      });

      fetchTabungans();
    } catch (err) {
      Swal.fire(
        "Gagal",
        err.response?.data?.error || "Gagal join tabungan",
        "error"
      );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Sidebar />

      <div className="ml-60 p-8 w-full animate-fadeIn">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Join Tabungan Bersama</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Pilih tabungan bersama yang ingin kamu ikuti
          </p>
        </div>

        {/* CONTENT */}
        {loading ? (
          <p className="text-gray-500">Loading tabungan...</p>
        ) : tabungans.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tabungans.map((item) => (
              <JoinTabunganCard
                key={item.id}
                tabungan={item}
                onJoin={() => joinTabungan(item.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= COMPONENT ================= */

function JoinTabunganCard({ tabungan, onJoin }) {
  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border shadow hover:shadow-xl transition-all hover:-translate-y-1">
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-1">
          {tabungan.nama_tabungan}
        </h2>
        <p className="text-sm text-gray-500">
          Owner: {tabungan.user?.name || "Unknown"}
        </p>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-500">Saldo Saat Ini</p>
        <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
          Rp {tabungan.saldo?.toLocaleString() || 0}
        </p>
      </div>

      <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
        <span>
          📅{" "}
          {new Date(
            tabungan.created_at
          ).toLocaleDateString()}
        </span>
      </div>

      <button
        onClick={onJoin}
        className="w-full py-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold hover:scale-105 transition"
      >
        Join Tabungan
      </button>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="p-10 rounded-2xl bg-white dark:bg-gray-800 border text-center shadow">
      <p className="text-2xl mb-2">😕</p>
      <h2 className="text-xl font-semibold mb-2">
        Belum ada tabungan tersedia
      </h2>
      <p className="text-gray-500">
        Saat ini belum ada tabungan bersama yang bisa di-join
      </p>
    </div>
  );
}
