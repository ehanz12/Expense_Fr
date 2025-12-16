import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import axios from "../../api/axios";
import Swal from "sweetalert2";

export default function DashboardSavings() {
  const [tabungans, setTabungans] = useState([]);
  const [selectedTabungan, setSelectedTabungan] = useState(null);
  const [transaksis, setTransaksis] = useState([]);

  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPage, setTotalPage] = useState(1);

  const [showCreate, setShowCreate] = useState(false);
  const [showSetor, setShowSetor] = useState(false);
  const [showTarik, setShowTarik] = useState(false);

  /* ================= FETCH TABUNGAN ================= */
  const fetchTabungan = async () => {
    try {
      const res = await axios.get("/tabungan");
      setTabungans(res.data.data || []);
    } catch (err) {
      Swal.fire("Error", "Gagal mengambil tabungan", "error");
    }
  };

  /* ================= FETCH TRANSAKSI (PAGINATION) ================= */
  const fetchTransaksi = async () => {
    try {
      const res = await axios.get(
        `/tabungan/transaksi?page=${page}&limit=${limit}`
      );

      setTransaksis(res.data.data || []);
      setTotalPage(res.data.pagination?.total_page || 1);
    } catch (err) {
      Swal.fire("Error", "Gagal mengambil transaksi", "error");
    }
  };

  useEffect(() => {
    fetchTabungan();
  }, []);

  useEffect(() => {
    fetchTransaksi();
  }, [page]);

  /* ================= TOTAL ================= */
  const totalSaldo = tabungans.reduce(
    (sum, t) => sum + (t.tabungan?.saldo || 0),
    0
  );

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Sidebar />

      <div className="ml-60 p-8 w-full animate-fadeIn">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard Savings</h1>

          <button
            onClick={() => setShowCreate(true)}
            className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow hover:scale-105 transition"
          >
            + Tabungan
          </button>
        </div>

        {/* ACTION BUTTON */}
        <div className="flex gap-3 mb-8">
          <button
            disabled={!selectedTabungan}
            onClick={() => setShowSetor(true)}
            className={`px-5 py-2 rounded-xl text-white ${
              selectedTabungan
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Setor
          </button>

          <button
            disabled={!selectedTabungan}
            onClick={() => setShowTarik(true)}
            className={`px-5 py-2 rounded-xl text-white ${
              selectedTabungan
                ? "bg-red-600 hover:bg-red-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Tarik
          </button>
        </div>

        {/* SUMMARY */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SummaryCard
            title="Total Seluruh Tabungan"
            value={`Rp ${totalSaldo.toLocaleString()}`}
            desc="Saldo terupdate otomatis"
          />

          <SummaryCard
            title="Total Setor Hari Ini"
            value="Rp 0"
            desc="Coming soon"
          />

          <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow border flex items-center justify-center">
            <p className="text-gray-500">📊 Chart (Coming Soon)</p>
          </div>
        </div>

        {/* TRANSAKSI */}
        <div className="p-6 mt-6 rounded-2xl bg-white dark:bg-gray-800 shadow border">
          <h2 className="text-xl font-semibold mb-4">Transaksi Terbaru</h2>

          {transaksis.length === 0 ? (
            <p className="text-gray-500">Belum ada transaksi.</p>
          ) : (
            <>
              <div className="space-y-3">
                {transaksis.map((trx) => (
                  <div
                    key={trx.id}
                    className="flex justify-between items-center p-4 rounded-xl border"
                  >
                    <div>
                      <p className="font-semibold">
                        {trx.user?.name} – {trx.jenis}
                      </p>
                      <p className="text-sm text-gray-500">
                        {trx.tabungan?.nama_tabungan}
                      </p>
                    </div>

                    <p
                      className={`font-bold ${
                        trx.jenis === "setor"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      Rp {trx.jumlah.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              {/* PAGINATION */}
              <div className="flex justify-between items-center mt-6">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="px-4 py-2 rounded-xl bg-gray-200 disabled:opacity-50"
                >
                  ◀ Prev
                </button>

                <span className="text-sm">
                  Page {page} of {totalPage}
                </span>

                <button
                  disabled={page === totalPage}
                  onClick={() => setPage(page + 1)}
                  className="px-4 py-2 rounded-xl bg-gray-200 disabled:opacity-50"
                >
                  Next ▶
                </button>
              </div>
            </>
          )}
        </div>

        {/* TABUNGAN CARD */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Tabungan Saya</h2>

          {tabungans.length === 0 ? (
            <p className="text-gray-500">Belum ada tabungan.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tabungans.map((tab) => (
                <TabunganCard
                  key={tab.tabungan.id}
                  tabungan={tab.tabungan}
                  selected={selectedTabungan?.id === tab.tabungan.id}
                  onClick={() => setSelectedTabungan(tab.tabungan)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MODALS */}
      {showCreate && (
        <Modal title="Tambah Tabungan" onClose={() => setShowCreate(false)}>
          <CreateTabunganForm
            onClose={() => {
              setShowCreate(false);
              fetchTabungan();
            }}
          />
        </Modal>
      )}

      {showSetor && selectedTabungan && (
        <Modal title="Setor Tabungan" onClose={() => setShowSetor(false)}>
          <SetorForm
            tabunganId={selectedTabungan.id}
            onClose={() => {
              setShowSetor(false);
              fetchTabungan();
              fetchTransaksi();
            }}
          />
        </Modal>
      )}

      {showTarik && selectedTabungan && (
        <Modal title="Tarik Tabungan" onClose={() => setShowTarik(false)}>
          <TarikForm
            tabunganId={selectedTabungan.id}
            onClose={() => {
              setShowTarik(false);
              fetchTabungan();
              fetchTransaksi();
            }}
          />
        </Modal>
      )}
    </div>
  );
}

/* ================= COMPONENT ================= */

function SummaryCard({ title, value, desc }) {
  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow border">
      <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-300">
        {title}
      </h2>
      <p className="text-4xl font-bold mt-3 text-blue-600 dark:text-blue-400">
        {value}
      </p>
      <p className="text-xs mt-2 text-gray-500">{desc}</p>
    </div>
  );
}

function TabunganCard({ tabungan, selected, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`p-6 rounded-2xl cursor-pointer border shadow transition-all ${
        selected
          ? "bg-blue-600 text-white scale-105 shadow-blue-500/40"
          : "bg-white dark:bg-gray-800 hover:shadow-lg"
      }`}
    >
      <h3 className="text-lg font-bold mb-2">{tabungan.nama_tabungan}</h3>
      <p className="text-sm opacity-80">Saldo Saat Ini</p>
      <p className="text-3xl font-bold mt-2">
        Rp {tabungan.saldo?.toLocaleString() || 0}
      </p>
    </div>
  );
}

/* ================= MODAL ================= */

function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

/* ================= FORMS ================= */

function CreateTabunganForm({ onClose }) {
  const [nama, setNama] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    await axios.post("/tabungan", { nama_tabungan: nama });
    Swal.fire("Berhasil", "Tabungan berhasil dibuat", "success");
    onClose();
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <input
        className="w-full p-3 rounded-xl border"
        placeholder="Nama Tabungan"
        value={nama}
        onChange={(e) => setNama(e.target.value)}
        required
      />
      <button className="w-full bg-blue-600 text-white py-3 rounded-xl">
        Simpan
      </button>
    </form>
  );
}

function SetorForm({ tabunganId, onClose }) {
  const [jumlah, setJumlah] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    await axios.post(`/tabungan/${tabunganId}/setor`, {
      jumlah: Number(jumlah),
    });
    Swal.fire("Berhasil", "Setor berhasil", "success");
    onClose();
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <input
        type="number"
        className="w-full p-3 rounded-xl border"
        placeholder="Jumlah Setor"
        value={jumlah}
        onChange={(e) => setJumlah(e.target.value)}
        required
      />
      <button className="w-full bg-green-600 text-white py-3 rounded-xl">
        Setor
      </button>
    </form>
  );
}

function TarikForm({ tabunganId, onClose }) {
  const [jumlah, setJumlah] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`/tabungan/${tabunganId}/tarik`, {
        jumlah: Number(jumlah),
      });

      Swal.fire("Berhasil", "Tarik berhasil", "success");
      onClose();
    } catch (err) {
      // ambil pesan error dari backend kalau ada
      const message =
        err.response?.data?.error || "Kamu bukan owner tabungan ini";

      Swal.fire("Gagal", message, "error");
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <input
        type="number"
        className="w-full p-3 rounded-xl border"
        placeholder="Jumlah Tarik"
        value={jumlah}
        onChange={(e) => setJumlah(e.target.value)}
        required
      />
      <button className="w-full bg-red-600 text-white py-3 rounded-xl">
        Tarik
      </button>
    </form>
  );
}
