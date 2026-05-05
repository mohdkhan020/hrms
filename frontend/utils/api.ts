// utils/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:7000",
  withCredentials: true,
});
let isRefreshing = false;

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    const url = originalRequest?.url || "";
    // ❌ refresh API ko kabhi intercept mat karo
    if (url.includes("/auth/refresh-token")) {
      console.log("Refresh failed → stop loop");
      window.location.href = "/login"; // 👈 logout state
      return Promise.reject(error);
    }

    // ❌ already retry ho chuka
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    // 🔥 agar already refresh chal raha hai → wait mat karo, direct fail
    if (isRefreshing) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401) {
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await api.post("/auth/refresh-token");
        isRefreshing = false;

        return api(originalRequest);
      } catch (err) {
        isRefreshing = false;

        console.log("User is logged out → redirect");

        window.location.href = "/login"; // 👈 FINAL STOP
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);
export default api;
