"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import {
  Home,
  Clock,
  Calendar,
  DollarSign,
  Users,
  FileText,
  LayoutDashboard,
  Building2,
  BarChart2,
  BadgeCheck,
  Settings,
  User,
  LogOut,
  LucideIcon,
} from "lucide-react";

type MenuItem = { label: string; href: string; icon: LucideIcon };

export default function Sidebar() {
  const { user, setUser } = useAuth();
  const path = usePathname();
  const router = useRouter();

  if (!user) return null;

  const menuByRole: Record<string, MenuItem[]> = {
    admin: [
      { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
      { label: "Employees", href: "/admin/employees", icon: Users },
      { label: "Departments", href: "/admin/departments", icon: Building2 },
      { label: "Attendance", href: "/admin/attendance", icon: Clock },
      { label: "Leave", href: "/admin/leave", icon: Calendar },
      { label: "Payroll", href: "/admin/payroll", icon: DollarSign },
      { label: "Reports", href: "/admin/reports", icon: BarChart2 },
      { label: "HR Dashboard", href: "/hr/dashboard", icon: BadgeCheck },
      { label: "Settings", href: "/admin/settings", icon: Settings },
    ],
    hr: [
      { label: "Dashboard", href: "/hr/dashboard", icon: BadgeCheck },
      { label: "Employees", href: "/hr/employees", icon: Users },
      { label: "Attendance", href: "/hr/attendance", icon: Clock },
      { label: "Leave Requests", href: "/hr/leave", icon: Calendar },
      { label: "Reports", href: "/hr/reports", icon: FileText },
    ],
    employees: [
      { label: "Dashboard", href: "/employees/dashboard", icon: Home },
      { label: "Holidays", href: "/employees/holidays", icon: Clock },
      { label: "Attendance", href: "/employees/attendance", icon: Clock },
      { label: "Leaves", href: "/employees/leaves", icon: Calendar },
      { label: "Payroll", href: "/employees/payroll", icon: DollarSign },
      { label: "Profile", href: "/employees/profile", icon: User },
    ],
  };

  const sidebarMenu = menuByRole[user.role] || [];

  // const roleColorMap: Record<string, string> = {
  //   admin: "#f59e0b",
  //   hr: "#22c55e",
  //   employees: "#a78bfa",
  // };
  // const roleColor = roleColorMap[user.role] ?? "#6366f1";

  // const initials =
  //   (user?.fullName as string)
  //     ?.split(" ")
  //     .map((n: string) => n[0])
  //     .join("")
  //     .slice(0, 2)
  //     .toUpperCase() ?? "U";

  const logout = async () => {
    await axios.post(
      "http://localhost:7000/auth/logout",
      {},
      { withCredentials: true },
    );
    setUser(null);
    router.replace("/login");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap');

        .hrms-sidebar {
          width: 250px; height: 100vh;
          position: fixed; top: 0; left: 0;
          background: #0f1117;
          border-right: 1px solid #1e2130;
          display: flex; flex-direction: column;
          font-family: 'DM Sans', sans-serif;
          z-index: 100; overflow: hidden;
        }
        .hrms-logo {
          display: flex; align-items: center; gap: 10px;
          padding: 26px 22px 22px;
          text-decoration: none;
          border-bottom: 1px solid #1e2130;
          flex-shrink: 0;
        }
        .hrms-logo-icon {
          width: 38px; height: 38px; border-radius: 10px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          display: flex; align-items: center; justify-content: center;
          font-size: 17px; font-weight: 800; color: #fff;
          font-family: 'DM Serif Display', serif; flex-shrink: 0;
        }
        .hrms-logo-text { color: #f1f5f9; font-size: 18px; font-weight: 700; }
        .hrms-logo-text span { color: #a78bfa; }

        .hrms-user {
          display: flex; align-items: center; gap: 12px;
          margin: 18px 16px 14px;
          background: #080b12; border: 1px solid #1e2130;
          border-radius: 14px; padding: 12px 14px; flex-shrink: 0;
        }
        .hrms-avatar {
          width: 40px; height: 40px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; font-weight: 700; color: #fff; flex-shrink: 0;
        }
        .hrms-user-name {
          color: #f1f5f9; font-size: 13px; font-weight: 600;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          max-width: 140px;
        }
        .hrms-user-role {
          display: inline-block; margin-top: 3px;
          font-size: 11px; font-weight: 600;
          padding: 2px 8px; border-radius: 20px; text-transform: capitalize;
        }

        .hrms-nav {
          flex: 1; overflow-y: auto;
          padding: 6px 12px; list-style: none; margin: 0;
          scrollbar-width: none;
        }
        .hrms-nav::-webkit-scrollbar { display: none; }
        .hrms-nav-item { margin-bottom: 3px; }

        .hrms-nav-link {
          display: flex; align-items: center; gap: 11px;
          padding: 10px 13px; border-radius: 11px;
          text-decoration: none; color: #6b7280;
          font-size: 13.5px; font-weight: 500;
          border-left: 3px solid transparent;
          transition: all 0.18s ease;
        }
        .hrms-nav-link:hover { background: #1e2130; color: #c4b5fd; }
        .hrms-nav-link.active {
          background: linear-gradient(135deg, #6366f115, #8b5cf615);
          color: #a78bfa; border-left: 3px solid #8b5cf6; font-weight: 600;
        }

        .hrms-footer {
          padding: 14px 16px 20px;
          border-top: 1px solid #1e2130; flex-shrink: 0;
        }
        .hrms-logout-btn {
          width: 100%; padding: 10px 0;
          background: transparent; border: 1px solid #2a2f45;
          border-radius: 11px; color: #9ca3af;
          font-size: 13px; font-weight: 600;
          font-family: 'DM Sans', sans-serif; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: all 0.18s ease; margin-bottom: 10px;
        }
        .hrms-logout-btn:hover {
          background: #ef444415; border-color: #ef4444; color: #ef4444;
        }
        .hrms-copyright { color: #374151; font-size: 11px; text-align: center; }
      `}</style>

      <aside className="hrms-sidebar">
        <Link href="/dashboard" className="hrms-logo">
          <div className="hrms-logo-icon">H</div>
          <span className="hrms-logo-text">
            {/* HRMS<span>AI</span> */}
            HRMS<span>Tool</span>
          </span>
        </Link>
{/*
        <div className="hrms-user">
          <div
            className="hrms-avatar"
            style={{
              background: `linear-gradient(135deg, ${roleColor}99, ${roleColor}55)`,
            }}
          >
            {initials}
          </div>
          <div style={{ overflow: "hidden" }}>
            <div className="hrms-user-name">{user?.fullName}</div>
            <span
              className="hrms-user-role"
              style={{ background: roleColor + "22", color: roleColor }}
            >
              {user?.role}
            </span>
          </div>
        </div> */}

        <ul className="hrms-nav">
          {sidebarMenu.map((item) => (
            <li className="hrms-nav-item" key={item.href}>
              <Link
                href={item.href}
                className={`hrms-nav-link ${path.startsWith(item.href) ? "active" : ""}`}
              >
                <item.icon size={17} strokeWidth={1.8} />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hrms-footer">
          <button className="hrms-logout-btn" onClick={logout}>
            <LogOut size={15} strokeWidth={2} />
            Logout
          </button>
          <p className="hrms-copyright">© 2026 HRMS Tool</p>
        </div>
      </aside>
    </>
  );
}

// "use client";

// import Link from "next/link";
// import { useAuth } from "@/hooks/useAuth";
// import { usePathname } from "next/navigation";
// import axios from "axios";
// import router from "next/router";
// // import "bootstrap/dist/css/bootstrap.min.css";

// export default function Sidebar() {
//   const { user,setUser } = useAuth();
//   const path = usePathname();
// console.log("user====>>>",user)
//   if (!user) return null;

//   const menuByRole: Record<
//     string,
//     Array<{ label: string; href: string; icon: string }>
//   > = {
//     admin: [
//       { label: "Dashboard", href: "/admin/dashboard", icon: "bi-speedometer2" },
//       { label: "Employees", href: "/admin/employees", icon: "bi-people" },
//       {
//         label: "Departments",
//         href: "/admin/departments",
//         icon: "bi-diagram-3",
//       },
//       {
//         label: "Attendance",
//         href: "/admin/attendance",
//         icon: "bi-calendar-check",
//       },
//       { label: "Leave", href: "/admin/leave", icon: "bi-calendar-x" },
//       { label: "Payroll", href: "/admin/payroll", icon: "bi-cash-stack" },
//       { label: "Reports", href: "/admin/reports", icon: "bi-bar-chart" },
//       { label: "HR Dashboard", href: "/hr/dashboard", icon: "bi-person-badge" },
//       { label: "Settings", href: "/admin/settings", icon: "bi-gear" },
//     ],

//     hr: [
//       { label: "Dashboard", href: "/hr/dashboard", icon: "bi-person-badge" },
//       { label: "Employees", href: "/hr/employees", icon: "bi-people" },
//       {
//         label: "Attendance",
//         href: "/hr/attendance",
//         icon: "bi-calendar-check",
//       },
//       {
//         label: "Leave Requests",
//         href: "/hr/leave",
//         icon: "bi-calendar-x",
//       },
//       { label: "Reports", href: "/hr/reports", icon: "bi-bar-chart" },
//     ],

//     employees: [
//       { label: "Dashboard", href: "/employees/dashboard", icon: "bi-house" },
//       {
//         label: "Attendance",
//         href: "/employees/holidays",
//         icon: "bi-calendar-check",
//       },
//       {
//         label: "Leaves",
//         href: "/employees/leaves",
//         icon: "bi-calendar-x",
//       },
//       {
//         label: "Payroll",
//         href: "/employees/payroll",
//         icon: "bi-cash-stack",
//       },
//       {
//         label: "Profile",
//         href: "/employees/profile",
//         icon: "bi-person",
//       },
//     ],
//   };

//   const sidebarMenu = menuByRole[user.role] || [];

// const  logout = async() => {
//   await axios.post(
//     "http://localhost:7000/auth/logout",
//     {},
//     { withCredentials: true },
//   );

//   setUser(null);

//   router.replace("/login"); // 👈 IMPORTANT
// }

//   return (
//     <aside
//       className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark"
//       style={{ width: "260px", height: "100vh", position: "fixed" }}
//     >
//       {/* LOGO */}
//       <Link
//         href="/dashboard"
//         className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
//       >
//         <span className="fs-4 fw-bold">
//           HRMS<span className="text-primary">AI</span>
//         </span>
//       </Link>

//       <hr />

//       {/* USER INFO */}
//       <div className="mb-3">
//         <div className="fw-semibold">{user?.fullName}</div>
//         <small className="text-secondary text-capitalize">{user?.role}</small>
//       </div>

//       {/* MENU */}
//       <ul className="nav nav-pills flex-column mb-auto">
//         {sidebarMenu.map((item) => (
//           <li className="nav-item" key={item.href}>
//             <Link
//               href={item.href}
//               className={`nav-link d-flex align-items-center gap-2 text-white ${
//                 path.startsWith(item.href) ? "active bg-primary" : ""
//               }`}
//             >
//               <i className={`bi ${item.icon}`}></i>
//               {item.label}
//             </Link>
//           </li>
//         ))}
//       </ul>

//       <hr />

//       {/* FOOTER ACTIONS */}
//       <div>
//         <button className="btn btn-outline-light w-100 mb-2" onClick={logout}>Logout</button>
//         <small className="text-secondary">© 2026 HRMS AI</small>
//       </div>
//     </aside>
//   );
// }
