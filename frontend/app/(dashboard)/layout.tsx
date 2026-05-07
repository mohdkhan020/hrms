// "use client";

// import Sidebar from "@/components/layout/Sidebar";
// import { useAuth } from "../../context/AuthContext";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";
// import HRMSLoader from "@/loader/HRMSLoader";

// export default function DashboardLayout({ children }: any) {
//   const { user, loading, setUser } = useAuth();
//   const router = useRouter();

//   // ✅ protect route
//   useEffect(() => {
//     if (!loading && !user) {
//       // router.push("/login");
//       router.replace("/login"); // 👈 replace use karo
//     }
//   }, [user, loading]);

//   // 🔥 IMPORTANT: render block karo
//   if (loading) return <HRMSLoader />;
//   if (!user) return null;

//   return (
//     <div className="d-flex">
//       {/* SIDEBAR */}
//       <Sidebar />

//       {/* MAIN CONTENT */}
//       <div
//         className="flex-grow-1"
//         // style={{ marginLeft: "260px", minHeight: "100vh" }}
//         style={{ marginLeft: "260px", minHeight: "100vh" }}
//       >

//         {/* PAGE CONTENT */}
//         <div className="">{children}</div>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import HRMSLoader from "@/loader/HRMSLoader";
import { Menu } from "lucide-react"; // Import Menu icon for mobile

export default function DashboardLayout({ children }: any) {
  const { user, loading } = useAuth();
  const router = useRouter();

  // ✅ State for Mobile Sidebar
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // ✅ protect route
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading]);

  // Close sidebar automatically when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🔥 IMPORTANT: render block karo
  if (loading) return <HRMSLoader />;
  if (!user) return null;

  return (
    <div className="ultra-app-shell">
      {/* 📱 MOBILE OVERLAY: Click to close sidebar on mobile */}
      <div
        className={`mobile-overlay ${isMobileOpen ? "active" : ""}`}
        onClick={() => setIsMobileOpen(false)}
      />

      {/* SIDEBAR WRAPPER */}
      <div className={`sidebar-wrapper ${isMobileOpen ? "open" : ""}`}>
        <Sidebar />
      </div>

      {/* MAIN CONTENT WRAPPER */}
      <div className="main-wrapper">
        {/* 📱 MOBILE HEADER (Visible only on small screens) */}
        <div className="mobile-header">
          <button
            onClick={() => setIsMobileOpen(true)}
            className="hamburger-btn"
          >
            <Menu size={24} color="#f1f5f9" />
          </button>
          <span
            style={{
              color: "#fff",
              fontWeight: 700,
              fontSize: "16px",
              fontFamily: "'DM Serif Display', serif",
            }}
          >
            HRMSTool
          </span>
          <div style={{ width: 24 }}></div> {/* For centering */}
        </div>

        {/* THE ULTRA PREMIUM CANVAS */}
        <main className="premium-canvas">
          <div className="canvas-glow"></div>
          <div className="canvas-content">{children}</div>
        </main>
      </div>

      {/* --- RESPONSIVE ULTRA PREMIUM STYLES --- */}
      <style>{`
        /* Base App Shell */
        .ultra-app-shell {
          display: flex;
          height: 100vh;
          width: 100vw;
          background: radial-gradient(circle at top left, #121420 0%, #030407 100%);
          overflow: hidden;
          position: relative;
        }

        /* Sidebar Wrapper */
        .sidebar-wrapper {
          width: 260px;
          height: 100vh;
          flex-shrink: 0;
          z-index: 100;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Main Wrapper */
        .main-wrapper {
          flex-grow: 1;
          height: 100vh;
          padding: 24px 32px 24px 12px;
          display: flex;
          flex-direction: column;
          width: calc(100vw - 260px);
          transition: padding 0.3s ease;
        }

        /* Mobile Header (Hidden on Desktop) */
        .mobile-header {
          display: none;
          align-items: center;
          justify-content: space-between;
          padding: 0 8px 16px 8px;
        }

        .hamburger-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.05);
        }

        /* The Premium Canvas */
        .premium-canvas {
          flex-grow: 1;
          background-color: #0a0c12;
          border-radius: 36px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.08);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .canvas-glow {
          position: absolute;
          top: 0;
          left: 10%;
          right: 10%;
          height: 150px;
          background: radial-gradient(ellipse at top, rgba(99, 102, 241, 0.08), transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .canvas-content {
          flex-grow: 1;
          overflow-y: auto;
          position: relative;
          z-index: 1;
          height: 100%;
          /* Add some bottom padding so content doesn't stick to the very edge */
          padding-bottom: 24px;
        }

        /* Scrollbar */
        .canvas-content::-webkit-scrollbar { width: 6px; }
        .canvas-content::-webkit-scrollbar-track { background: transparent; margin: 36px 0; }
        .canvas-content::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 10px; }
        .canvas-content::-webkit-scrollbar-thumb:hover { background: rgba(99, 102, 241, 0.4); }

        /* Mobile Overlay */
        .mobile-overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(4px);
          z-index: 90;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        /* =========================================
           📱 RESPONSIVE MEDIA QUERIES (TABLET & MOBILE)
           ========================================= */
        @media (max-width: 1024px) {
          .sidebar-wrapper {
            position: fixed;
            top: 0;
            left: 0;
            transform: translateX(-100%); /* Hide sidebar off-screen */
            background: #030407; /* Ensure background is solid when sliding over */
            box-shadow: 20px 0 50px rgba(0,0,0,0.5);
          }

          .sidebar-wrapper.open {
            transform: translateX(0); /* Slide in */
          }

          .main-wrapper {
            width: 100vw;
            padding: 16px; /* Reduce padding for smaller screens */
          }

          .premium-canvas {
            border-radius: 24px; /* Slightly less rounded on mobile */
          }

          .mobile-header {
            display: flex; /* Show mobile header */
          }

          .mobile-overlay {
            display: block;
            pointer-events: none; /* Can't click when hidden */
          }

          .mobile-overlay.active {
            opacity: 1;
            pointer-events: auto; /* Can click to close */
          }
        }

        @media (max-width: 768px) {
          .main-wrapper {
            padding: 12px; /* Even less padding for phones */
          }
          .premium-canvas {
            border-radius: 20px;
          }
        }
      `}</style>
    </div>
  );
}
