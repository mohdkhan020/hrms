"use client";
import React from "react";
import { useAuth } from "@/hooks/useAuth";


export default function Navbar() {
const { user, logout } = useAuth();
return (
<div style={{ display: "flex", justifyContent: "space-between", padding: 12, borderBottom: "1px solid #eee" }}>
<div>HRMS</div>
<div>
{user ? (
<>
<span style={{ marginRight: 12 }}>{user.name} ({user.role})</span>
<button onClick={logout}>Logout</button>
</>
) : (
<a href="/login">Login</a>
)}
</div>
</div>
);
}