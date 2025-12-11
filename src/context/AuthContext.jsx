import { createContext, useState, useEffect } from "react";
import axios from "../api/axios";
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, [token]);

  const login = async (email, password) => {
    const res = await axios.post("/login", { email, password });

    console.log("LOGIN RESPONSE:", res.data);

    const tk = res.data.token;
    setToken(tk);
    localStorage.setItem("token", tk);

    axios.defaults.headers.common["Authorization"] = `Bearer ${tk}`;
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Logout?",
      text: "Apakah kamu yakin ingin keluar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, logout",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.post("/logout");

          localStorage.removeItem("token");
          setToken(""); // reset token react

          delete axios.defaults.headers.common["Authorization"];

          Swal.fire({
            title: "Berhasil!",
            text: "Kamu telah logout.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });

          window.location.href = "/login";
          // atau navigasi dengan react-router:
          // navigate("/login");
        } catch (err) {
          Swal.fire("Gagal!", "Logout gagal.", "error");
        }
      }
    });
  };

  return (
    <AuthContext.Provider value={{ token, login, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}
