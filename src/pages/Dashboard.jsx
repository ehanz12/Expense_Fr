import { useEffect, useState } from "react";
import axios from "../api/axios";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
    const [summary, setSummary] = useState(0);
    const [daily, setDaily] = useState(0);

    const LoadingDaily = async () => {
        axios.get("/expense/summary?period=daily")
            .then((res) => {
                console.log("SUMMARY RESPONSE:", res.data);
                setDaily(res.data.total);
            })
            .catch(err => console.error("SUMMARY ERROR:", err));
    }

    const LoadingMothly = async () => {
        axios.get("/expense/summary?period=monthly")
            .then((res) => {
                setSummary(res.data.total);
            })
            .catch(err => console.err(err))
    }

    useEffect(() => {
        LoadingDaily();
        LoadingMothly();
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">

            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="ml-60 p-8 w-full animate-fadeIn">

                {/* Header */}
                <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Total Bulanan */}
                    <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-blue-400/20 transition-all duration-300">
                        <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-300">
                            Total Pengeluaran Bulan Ini
                        </h2>

                        <p className="text-4xl font-bold mt-3 text-red-600 dark:text-red-400">
                            Rp {summary ? summary.toLocaleString() : "0"}
                        </p>

                        <p className="text-xs mt-2 text-gray-500 dark:text-gray-400">
                            Pengeluaran terupdate otomatis berdasarkan transaksi
                        </p>
                    </div>
                    {/* Total Harian */}
                    <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-blue-400/20 transition-all duration-300">
                        <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-300">
                            Total Pengeluaran Hari Ini
                        </h2>

                        <p className="text-4xl font-bold mt-3 text-red-600 dark:text-red-400">
                            Rp {daily? daily.toLocaleString() : "0"}
                        </p>

                        <p className="text-xs mt-2 text-gray-500 dark:text-gray-400">
                            Pengeluaran terupdate otomatis berdasarkan transaksi
                        </p>
                    </div>

                    {/* Placeholder Chart Card */}
                    <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center">
                        <p className="text-gray-500">📊 Chart Bulanan (Coming Soon)</p>
                    </div>

                </div>

                {/* Recent Transactions Placeholder */}
                <div className="mt-10 p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-semibold mb-4">
                        Transaksi Terbaru
                    </h2>

                    <p className="text-gray-500 dark:text-gray-400">
                        Data transaksi terbaru belum ditampilkan.
                    </p>
                </div>
            </div>
        </div>
    );
}
