"use client";
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { User } from "@/types/user";


type AuthContextType = {
user: User | null;
token: string | null;
loading: boolean;
setUser: (u: User | null) => void;
setToken: (t: string | null) => void;
logout: () => void;
};


export const AuthContext = createContext<AuthContextType>({} as AuthContextType);


export function AuthProvider({ children }: { children: React.ReactNode }) {
const [user, setUser] = useState<User | null>(null);
const [token, setTokenState] = useState<string | null>(() => typeof window !== 'undefined' ? localStorage.getItem('token') : null);
const [loading, setLoading] = useState(true);


useEffect(() => {
async function load() {
if (!token) {
setLoading(false);
return;
}
try {
const res = await axios.get('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } });
setUser(res.data.user);
} catch (e) {
setUser(null);
setTokenState(null);
localStorage.removeItem('token');
} finally {
setLoading(false);
}
}
load();
}, [token]);


function setToken(t: string | null) {
setTokenState(t);
if (t) localStorage.setItem('token', t);
else localStorage.removeItem('token');
}


function logout() {
setUser(null);
setToken(null);
window.location.href = '/login';
}


return (
<AuthContext.Provider value={{ user, token, loading, setUser, setToken, logout }}>
{children}
</AuthContext.Provider>
);
}