// src/api/axios.js
import axios from "axios";
import Swal from "sweetalert2";

const instance = axios.create({
  baseURL: "https://www.reihan.biz.id/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, // Fiber pakai Bearer token
});

/* ============================
   REQUEST INTERCEPTOR
============================ */
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ============================
   RESPONSE INTERCEPTOR
============================ */
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // 🔥 jika token invalid / expired
    if (error.response && error.response.status === 401) {
      // hapus token
      localStorage.removeItem("token");

      // optional: cegah swal double
      if (!window.__SESSION_EXPIRED__) {
        window.__SESSION_EXPIRED__ = true;

        Swal.fire({
          icon: "warning",
          title: "Session Expired",
          text: "Silakan login kembali",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          window.location.href = "/";
        });
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
