// "use client";
// import Link from "next/link";
// import { useAuth } from "@/hooks/useAuth";
// import styles from "../../app/dashboard/dashboard.module.css";
// import { usePathname } from "next/navigation";

// export default function Sidebar() {
//   const { user } = useAuth();
//   const path = usePathname();
//   return (
//     <>
//       <aside className={styles.sidebar}>
//         <h2 className={styles.logo}>
//           HRMS<span>AI</span>
//         </h2>

//         <nav className={styles.menu}>
//           <Link
//             href="/dashboard"
//             className={path === "/dashboard" ? styles.active : ""}
//           >
//             Dashboard
//           </Link>
//           <Link
//             href="/dashboard/employees"
//             className={path.includes("employees") ? styles.active : ""}
//           >
//             Employees
//           </Link>
//           <Link
//             href="/dashboard/attendance"
//             className={path.includes("attendance") ? styles.active : ""}
//           >
//             Attendance
//           </Link>
//           <Link
//             href="/dashboard/leave"
//             className={path.includes("leave") ? styles.active : ""}
//           >
//             Leave
//           </Link>
//           <Link
//             href="/dashboard/payroll"
//             className={path.includes("payroll") ? styles.active : ""}
//           >
//             Payroll
//           </Link>

//           <Link
//             href="/dashboard/settings"
//             className={path.includes("settings") ? styles.active : ""}
//           >
//             Settings
//           </Link>
//         </nav>
//       </aside>
//     </>
//   );
// }






// If you want, I can also add:

// 🔥 JWT Refresh Token System
// 🔥 Device-based Login Limit
// 🔥 Google / Microsoft SSO Login
// 🔥 Full UI for all Auth Screens (Material UI or Tailwind)
// 🔥 User Activity Logs
// 🔥 Permissions Matrix (per-module access control)

"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import styles from "./sidebarmenu.module.css";
import { usePathname } from "next/navigation";


export default function Sidebar() {
  const { user } = useAuth();
  console.log("USER FROM AUTH →", user);
  const path = usePathname();

  // If user not loaded yet, show skeleton or nothing
  if (!user) return null;

  // ROLE-BASED MENU CONFIG
  const menuByRole: Record<string, Array<{ label: string; href: string }>> = {
    admin: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Employees", href: "/dashboard/employees" },
      { label: "Departments", href: "/dashboard/departments" },
      { label: "Attendance", href: "/dashboard/attendance" },
      { label: "Leave", href: "/dashboard/leave" },
      { label: "Payroll", href: "/dashboard/payroll" },
      { label: "Reports", href: "/dashboard/reports" },
      { label: "HR Dashboard", href: "/dashboard/hr" },
      { label: "Settings", href: "/dashboard/settings" },
    ],

    hr: [
      { label: "HR Dashboard", href: "/dashboard/hr" },
      { label: "Employees", href: "/dashboard/employees" },
      { label: "Attendance", href: "/dashboard/attendance" },
      { label: "Leave Requests", href: "/dashboard/leave" },
      { label: "Reports", href: "/dashboard/reports" },
    ],

    employee: [
      { label: "My Dashboard", href: "/dashboard/employee" },
      { label: "My Attendance", href: "/dashboard/employee/attendance" },
      { label: "My Leaves", href: "/dashboard/employee/leave" },
      { label: "My Payroll", href: "/dashboard/employee/payroll" },
      { label: "Profile", href: "/dashboard/employee/profile" },
    ],
  };

  // Fall back safely if role missing
  const sidebarMenu = menuByRole[user.role] || [];

  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.logo}>
        HRMS<span>AI</span>
      </h2>

      <nav className={styles.menu}>
        {sidebarMenu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={path.startsWith(item.href) ? styles.active : ""}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
