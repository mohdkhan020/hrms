"use client";
import React, { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";
import { User } from "@/types/user";
import api from "@/utils/api";
import { usePathname } from "next/navigation";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  setUser: (u: User | null) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export function AuthProvider({ children }: { children: React.ReactNode }) {


  const pathname = usePathname();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔁 Auto-login check (cookie based)
  useEffect(() => {
    // ❌ login page pe skip karo
    if (pathname === "/login") {
      setLoading(false);
      return;
    }

    async function loadUser() {
      try {
        // const res = await axios.get("http://localhost:7000/auth/me", {
        //   withCredentials: true, // 🍪 cookie send hogi
        // });
         const res = await api.get("/auth/me");
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, []);

  // 🚪 Logout
  async function logout() {
    // await axios.post("http://localhost:7000/auth/logout", {}, { withCredentials: true });
    await api.post("/auth/logout");
    setUser(null);
    window.location.href = "/login";
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        setUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ✅ Custom hook
export const useAuth = () => useContext(AuthContext);
