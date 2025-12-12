// src/api/axios.js
import axios from "axios";

const instance = axios.create({
    baseURL: "https://journals-midlands-male-resolve.trycloudflare.com/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: false,  // Gofiber tidak pakai cookie
});

// 🔥 Auto set token saat pertama kali axios dipakai
const token = localStorage.getItem("token");
if (token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default instance;
