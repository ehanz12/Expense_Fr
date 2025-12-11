import { useEffect, useState } from "react";

export default function Navbar() {
    const [dark, setDark] = useState(
        localStorage.getItem("dark-mode") === "true"
    );

    useEffect(() => {
        if (dark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("dark-mode", dark);
    }, [dark]);

    return (
        <div className="p-4 bg-gray-200 dark:bg-gray-800 flex justify-end">
            <button
                className="px-4 py-2 bg-gray-700 text-white rounded"
                onClick={() => setDark(!dark)}
            >
                {dark ? "Light Mode" : "Dark Mode"}
            </button>
        </div>
    );
}
