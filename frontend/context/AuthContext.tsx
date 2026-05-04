"use client";
import React, { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";
import { User } from "@/types/user";

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
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔁 Auto-login check (cookie based)
  useEffect(() => {
    async function loadUser() {
      try {
        const res = await axios.get("http://localhost:7000/auth/me", {
          withCredentials: true, // 🍪 cookie send hogi
        });
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
    await axios.post("http://localhost:7000/auth/logout", {}, { withCredentials: true });
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
