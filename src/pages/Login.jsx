import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
    const { login } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg("");

        try {
            await login(email, password);
        } catch (err) {
            setErrorMsg("Email atau password salah");
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 px-4">
            
            {/* Card container */}
            <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8 animate-fadeIn">
                
                <h1 className="text-3xl font-bold text-center mb-6 text-white">
                    Welcome Back ✨
                </h1>
                <p className="text-center text-gray-300 mb-6">
                    Silahkan login untuk melanjutkan
                </p>

                {errorMsg && (
                    <div className="bg-red-500/20 text-red-300 p-2 rounded mb-3 text-sm text-center">
                        {errorMsg}
                    </div>
                )}

                <form onSubmit={submit} className="space-y-4">

                    <div>
                        <label className="text-sm text-gray-300">Email</label>
                        <input
                            type="email"
                            placeholder="Masukkan email..."
                            className="w-full mt-1 p-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 outline-none"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-300">Password</label>
                        <input
                            type="password"
                            placeholder="Masukkan password..."
                            className="w-full mt-1 p-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 outline-none"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        disabled={loading}
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-blue-500/40 disabled:opacity-50"
                    >
                        {loading ? "Memproses..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
}
