import { Link, useLocation } from "react-router-dom";
import { FiHome, FiList, FiFolder, FiLogOut } from "react-icons/fi";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Sidebar() {
    const location = useLocation();
    const { handleLogout } = useContext(AuthContext);

    const menuItems = [
        { path: "/", label: "Dashboard", icon: <FiHome /> },
        { path: "/expenses", label: "Expenses", icon: <FiList /> },
        { path: "/categories", label: "Categories", icon: <FiFolder /> },
    ];

    return (
        <div className="w-60 h-screen fixed bg-gray-900/80 backdrop-blur-xl border-r border-gray-700 text-white p-5 flex flex-col">
            <h1 className="text-2xl font-extrabold tracking-wide mb-8">
                Expense<span className="text-blue-400">App</span>
            </h1>

            {/* Menu */}
            <nav className="flex flex-col gap-2">
                {menuItems.map((item, i) => {
                    const active = location.pathname === item.path;

                    return (
                        <Link
                            key={i}
                            to={item.path}
                            className={`
                                flex items-center gap-3 py-3 px-4 rounded-xl 
                                transition-all duration-300 text-sm font-medium
                                ${active
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                }
                            `}
                        >
                            <span className="text-lg">{item.icon}</span>
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Logout */}
            <button
                type="submit"
                onClick={handleLogout}
                className="mt-auto flex items-center gap-3 py-3 px-4 text-left rounded-xl bg-red-600/80 hover:bg-red-700 transition-all duration-300"
            >
                <FiLogOut className="text-lg" />
                Logout
            </button>
        </div>
    );
}
