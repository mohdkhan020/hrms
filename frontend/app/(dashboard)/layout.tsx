"use client";

import Sidebar from "@/components/layout/Sidebar";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({ children }: any) {
const { user, loading ,setUser } = useAuth();
const router = useRouter();


  // ✅ protect route
  useEffect(() => {
    if (!loading && !user) {
      // router.push("/login");
      router.replace("/login"); // 👈 replace use karo
    }
  }, [user, loading]);



  // 🔥 IMPORTANT: render block karo
  if (loading) return <p>Loading...</p>;
  if (!user) return null;

  return (
    <div className="d-flex">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div
        className="flex-grow-1"
        style={{ marginLeft: "260px", minHeight: "100vh" }}
      >
        {/* TOP NAVBAR */}
        <nav className="navbar navbar-expand-lg bg-white shadow-sm px-4">
          <div className="container-fluid">
            <h5 className="mb-0">Dashboard</h5>

            <div className="d-flex align-items-center gap-3">
              <button className="btn btn-outline-primary btn-sm">
                Notifications
              </button>
              <button className="btn btn-primary btn-sm">Profile</button>
            </div>
          </div>
        </nav>

        {/* PAGE CONTENT */}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
