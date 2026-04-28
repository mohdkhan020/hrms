"use client";

import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout({ children }: any) {
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

// "use client";

// import { useState } from "react";
// import Sidebar from "@/components/layout/Sidebar";
// // import "bootstrap/dist/css/bootstrap.min.css";

// export default function DashboardLayout({ children }: any) {
//   const [show, setShow] = useState(true);

//   return (
//     <div className="d-flex">
//       {/* SIDEBAR */}
//       <div
//         className={`bg-dark ${show ? "d-block" : "d-none d-md-block"}`}
//         style={{ width: "260px", minHeight: "100vh" }}
//       >
//         <Sidebar />
//       </div>

//       {/* MAIN */}
//       <div className="flex-grow-1">
//         {/* TOP NAV */}
//         <nav className="navbar navbar-light bg-white shadow-sm px-3">
//           <button
//             className="btn btn-outline-primary d-md-none"
//             onClick={() => setShow(!show)}
//           >
//             ☰
//           </button>

//           <h5 className="mb-0">Dashboard</h5>

//           <div className="d-flex gap-2">
//             <button className="btn btn-outline-primary btn-sm">
//               Notifications
//             </button>
//             <button className="btn btn-primary btn-sm">Profile</button>
//           </div>
//         </nav>

//         {/* CONTENT */}
//         <div className="p-4 bg-light" style={{ minHeight: "100vh" }}>
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// }
