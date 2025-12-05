"use client";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";




export const useAuth = () => useContext(AuthContext);
// import { cookies } from "next/headers";

// export const useAuth = async() => {
//   const token = (await cookies()).get("token")?.value;
//   return { isAuthenticated: !!token, token };
// };


// export const logout = () => {
//   document.cookie = "token=; Max-Age=0; path=/";
//   document.cookie = "role=; Max-Age=0; path=/";
//   window.location.href = "/auth/login";
// };
