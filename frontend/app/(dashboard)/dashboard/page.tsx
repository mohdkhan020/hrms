"use client";
import styles from "../dashboard/dashboard.module.css";
import { useEffect, useState } from "react";
import api from "../../../utils/api";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function Dashboard() {

const { user, setUser } = useAuth();
const router = useRouter();

const [stats, setStats] = useState<any>(null);
const [loading, setLoading] = useState(true);

// ✅ protect route
useEffect(() => {
  if (!user) {
    router.push("/login");
  }
}, [user]);

// ✅ fetch dashboard data
useEffect(() => {
  async function fetchData() {
    try {
      const res = await api.get("/dashboard");
      setStats(res.data);
    } catch (err) {
      console.error("Dashboard error", err);
    } finally {
      setLoading(false);
    }
  }

  fetchData();
}, []);

// ✅ loading UI
if (loading) {
  return <p>Loading dashboard...</p>;
}

// if (!stats) {
//   return <p>Failed to load data</p>;
// }

  return (
    <div className={styles.container}>

      {/* MAIN CONTENT */}
      <main className={styles.main}>
        {/* TOP NAV */}
        <header className={styles.header}>
          <h3>Dashboard Overview</h3>
          <div className={styles.userBox}>
            <span>👤</span> Mak
          </div>
        </header>

        {/* STATS CARDS */}
        <section className={styles.cards}>
          <div className={styles.card}>
            <h4>Total Employees</h4>
            <p>120</p>
          </div>

          <div className={styles.card}>
            <h4>Present Today</h4>
            <p>98</p>
          </div>

          <div className={styles.card}>
            <h4>On Leave</h4>
            <p>12</p>
          </div>

          <div className={styles.card}>
            <h4>Pending Requests</h4>
            <p>7</p>
          </div>
        </section>

        {/* BIG WHITE BOX FOR GRAPH / DATA */}
        {/* <section className={styles.bigSection}>
          <h3>Attendance Summary</h3>
          <div className={styles.placeholder}>[Graph here]</div>
        </section> */}
        <section className={styles.bigSection}>
  <h3>Attendance Summary</h3>

  <div className={styles.attendanceSummary}>

    {/* LEFT BOX – TODAY STATUS */}
    <div className={styles.todayBox}>
      <h4>Today's Attendance</h4>
      <div className={styles.todayStats}>
        <div>
          <span className={styles.presentDot}></span> Present: <b>98</b>
        </div>
        <div>
          <span className={styles.absentDot}></span> Absent: <b>8</b>
        </div>
        <div>
          <span className={styles.lateDot}></span> Late: <b>14</b>
        </div>
      </div>
    </div>

    {/* RIGHT BOX – MONTH SUMMARY */}
    <div className={styles.monthBox}>
      <h4>Monthly Summary</h4>

      <div className={styles.monthRow}>
        <span>Total Working Days</span>
        <b>22</b>
      </div>

      <div className={styles.monthRow}>
        <span>Present</span>
        <b>19</b>
      </div>

      <div className={styles.monthRow}>
        <span>Absent</span>
        <b>1</b>
      </div>

      <div className={styles.monthRow}>
        <span>Leave</span>
        <b>2</b>
      </div>
    </div>

  </div>
</section>

      </main>
    </div>
  );
}
