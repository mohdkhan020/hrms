// // If you want, I can also add:

// // 🔥 JWT Refresh Token System
// // 🔥 Device-based Login Limit
// // 🔥 Google / Microsoft SSO Login
// // 🔥 Full UI for all Auth Screens (Material UI or Tailwind)
// // 🔥 User Activity Logs
// // 🔥 Permissions Matrix (per-module access control)

// "use client";

// import Link from "next/link";
// import { useAuth } from "@/hooks/useAuth";
// import styles from "./sidebarmenu.module.css";
// import { usePathname } from "next/navigation";


// export default function Sidebar() {
//   const { user } = useAuth();
//   console.log("USER FROM AUTH →", user);
//   const path = usePathname();

//   // If user not loaded yet, show skeleton or nothing
//   if (!user) return null;

//   // ROLE-BASED MENU CONFIG
//   const menuByRole: Record<string, Array<{ label: string; href: string }>> = {
//     admin: [
//       { label: "Dashboard", href: "/dashboard" },
//       { label: "Employees", href: "/dashboard/employees" },
//       { label: "Departments", href: "/dashboard/departments" },
//       { label: "Attendance", href: "/dashboard/attendance" },
//       { label: "Leave", href: "/dashboard/leave" },
//       { label: "Payroll", href: "/dashboard/payroll" },
//       { label: "Reports", href: "/dashboard/reports" },
//       { label: "HR Dashboard", href: "/dashboard/hr" },
//       { label: "Settings", href: "/dashboard/settings" },
//     ],

//     hr: [
//       { label: "HR Dashboard", href: "/dashboard/hr" },
//       { label: "Employees", href: "/dashboard/employees" },
//       { label: "Attendance", href: "/dashboard/attendance" },
//       { label: "Leave Requests", href: "/dashboard/leave" },
//       { label: "Reports", href: "/dashboard/reports" },
//     ],

//     employee: [
//       { label: "My Dashboard", href: "/dashboard/employee" },
//       { label: "My Attendance", href: "/dashboard/employee/attendance" },
//       { label: "My Leaves", href: "/dashboard/employee/leave" },
//       { label: "My Payroll", href: "/dashboard/employee/payroll" },
//       { label: "Profile", href: "/dashboard/employee/profile" },
//     ],
//   };

//   // Fall back safely if role missing
//   const sidebarMenu = menuByRole[user.role] || [];

//   return (
//     <aside className={styles.sidebar}>
//       <h2 className={styles.logo}>
//         HRMS<span>AI</span>
//       </h2>

//       <nav className={styles.menu}>
//         {sidebarMenu.map((item) => (
//           <Link
//             key={item.href}
//             href={item.href}
//             className={path.startsWith(item.href) ? styles.active : ""}
//           >
//             {item.label}
//           </Link>
//         ))}
//       </nav>
//     </aside>
//   );
// }




"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { usePathname } from "next/navigation";
import axios from "axios";
import router from "next/router";
// import "bootstrap/dist/css/bootstrap.min.css";

export default function Sidebar() {
  const { user,setUser } = useAuth();
  const path = usePathname();
console.log("user====>>>",user)
  if (!user) return null;

  const menuByRole: Record<
    string,
    Array<{ label: string; href: string; icon: string }>
  > = {
    admin: [
      { label: "Dashboard", href: "/admin", icon: "bi-speedometer2" },
      { label: "Employees", href: "/dashboard/employees", icon: "bi-people" },
      {
        label: "Departments",
        href: "/dashboard/departments",
        icon: "bi-diagram-3",
      },
      {
        label: "Attendance",
        href: "/dashboard/attendance",
        icon: "bi-calendar-check",
      },
      { label: "Leave", href: "/dashboard/leave", icon: "bi-calendar-x" },
      { label: "Payroll", href: "/dashboard/payroll", icon: "bi-cash-stack" },
      { label: "Reports", href: "/dashboard/reports", icon: "bi-bar-chart" },
      { label: "HR Dashboard", href: "/dashboard/hr", icon: "bi-person-badge" },
      { label: "Settings", href: "/dashboard/settings", icon: "bi-gear" },
    ],

    hr: [
      { label: "HR Dashboard", href: "/dashboard/hr", icon: "bi-person-badge" },
      { label: "Employees", href: "/dashboard/employees", icon: "bi-people" },
      {
        label: "Attendance",
        href: "/dashboard/attendance",
        icon: "bi-calendar-check",
      },
      {
        label: "Leave Requests",
        href: "/dashboard/leave",
        icon: "bi-calendar-x",
      },
      { label: "Reports", href: "/dashboard/reports", icon: "bi-bar-chart" },
    ],

    employee: [
      { label: "My Dashboard", href: "/dashboard/employee", icon: "bi-house" },
      {
        label: "My Attendance",
        href: "/dashboard/employee/attendance",
        icon: "bi-calendar-check",
      },
      {
        label: "My Leaves",
        href: "/dashboard/employee/leave",
        icon: "bi-calendar-x",
      },
      {
        label: "My Payroll",
        href: "/dashboard/employee/payroll",
        icon: "bi-cash-stack",
      },
      {
        label: "Profile",
        href: "/dashboard/employee/profile",
        icon: "bi-person",
      },
    ],
  };

  const sidebarMenu = menuByRole[user.role] || [];

const  logout = async() => {
  await axios.post(
    "http://localhost:7000/auth/logout",
    {},
    { withCredentials: true },
  );

  // router.push("/login");
  setUser(null);

  router.replace("/login"); // 👈 IMPORTANT
}

  return (
    <aside
      className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark"
      style={{ width: "260px", height: "100vh", position: "fixed" }}
    >
      {/* LOGO */}
      <Link
        href="/dashboard"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <span className="fs-4 fw-bold">
          HRMS<span className="text-primary">AI</span>
        </span>
      </Link>

      <hr />

      {/* USER INFO */}
      <div className="mb-3">
        <div className="fw-semibold">{user?.fullName}</div>
        <small className="text-secondary text-capitalize">{user?.role}</small>
      </div>

      {/* MENU */}
      <ul className="nav nav-pills flex-column mb-auto">
        {sidebarMenu.map((item) => (
          <li className="nav-item" key={item.href}>
            <Link
              href={item.href}
              className={`nav-link d-flex align-items-center gap-2 text-white ${
                path.startsWith(item.href) ? "active bg-primary" : ""
              }`}
            >
              <i className={`bi ${item.icon}`}></i>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <hr />

      {/* FOOTER ACTIONS */}
      <div>
        <button className="btn btn-outline-light w-100 mb-2" onClick={logout}>Logout</button>
        <small className="text-secondary">© 2026 HRMS AI</small>
      </div>
    </aside>
  );
}
