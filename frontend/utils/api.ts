// utils/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:7000",
  withCredentials: true,
});

// ✅ interceptor AFTER api create
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 🔄 refresh token call
        await api.post("/refresh-token");

        // 🔁 retry original request
        return api(originalRequest);
      } catch (err) {
        // ❌ refresh fail → logout
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);

export default api;
