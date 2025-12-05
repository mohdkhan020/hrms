import Sidebar from "@/components/layout/Sidebar";
import styles from "./dashboardLayout.module.css";

export default function DashboardLayout({ children }:any) {
  return (
    <div className={styles.container}>
      {/* Sidebar fixed for all dashboard routes */}
      <Sidebar />
      {/* Page content */}
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}
