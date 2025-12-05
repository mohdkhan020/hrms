"use client";

import { useState } from "react";
import styles from "./hrDashboard.module.css";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";

const PIE_COLORS = ["#52c41a", "#ff4d4f", "#faad14"];

export default function HrDashboard() {
  const [selectedRange, setSelectedRange] = useState<"today" | "week" | "month">(
    "today"
  );

  // HR OVERVIEW METRICS
  const summary = {
    present: 92,
    absent: 5,
    onLeave: 8,
    pendingApprovals: 6,
    newJoiners: 3,
    resignations: 1,
  };

  const birthdays = [
    { name: "Rohit Sharma", date: "12 Feb" },
    { name: "Sarah Khan", date: "15 Feb" },
  ];

  const pendingLeaves = [
    { id: "L101", name: "John Doe", type: "Sick Leave", days: 2 },
    { id: "L102", name: "Ayesha Ali", type: "Casual Leave", days: 1 },
  ];

  const pendingRegularization = [
    {
      id: "R301",
      name: "Rohit Sharma",
      reason: "Missed Punch-in",
      date: "10 Feb",
    },
  ];

  const hrTasks = [
    { task: "Verify documents for new joiners", due: "Today" },
    { task: "Prepare monthly attendance sheet", due: "Tomorrow" },
    { task: "Schedule probation review", due: "This Week" },
  ];

  const probationEmployees = [
    { name: "Vikram Patel", dept: "Sales", endDate: "30 Mar 2025" },
    { name: "Aditi Singh", dept: "IT", endDate: "15 Apr 2025" },
  ];

  const newJoiners = [
    {
      name: "Imran Khan",
      dept: "IT",
      doj: "01 Feb 2025",
      status: "In Onboarding",
    },
    {
      name: "Priya Verma",
      dept: "HR",
      doj: "05 Feb 2025",
      status: "Documents Pending",
    },
    {
      name: "Kunal Mehta",
      dept: "Finance",
      doj: "10 Feb 2025",
      status: "Onboarded",
    },
  ];

  const resignations = [
    {
      name: "Neha Sharma",
      dept: "Marketing",
      lwd: "28 Feb 2025",
      stage: "Notice Period",
    },
    {
      name: "Rajesh Kumar",
      dept: "Operations",
      lwd: "15 Mar 2025",
      stage: "Under Discussion",
    },
  ];

  const announcements = [
    {
      title: "New Work From Home Policy",
      date: "10 Feb 2025",
      category: "Policy Update",
      desc: "WFH allowed twice a week for eligible employees effective from 1st March.",
    },
    {
      title: "Annual Engagement Survey",
      date: "08 Feb 2025",
      category: "Survey",
      desc: "Employees are requested to fill the survey by 20th Feb.",
    },
    {
      title: "New Health Insurance Provider",
      date: "03 Feb 2025",
      category: "Benefits",
      desc: "Upgraded health insurance policy with better coverage.",
    },
  ];

  // ========== CHART DATA ==========

  const attendancePieData = [
    { name: "Present", value: summary.present },
    { name: "Absent", value: summary.absent },
    { name: "On Leave", value: summary.onLeave },
  ];

  const attendanceTrend = [
    { day: "Mon", present: 88, absent: 12 },
    { day: "Tue", present: 90, absent: 10 },
    { day: "Wed", present: 86, absent: 14 },
    { day: "Thu", present: 89, absent: 11 },
    { day: "Fri", present: 92, absent: 8 },
  ];

  const deptHeadcount = [
    { dept: "IT", headcount: 18 },
    { dept: "HR", headcount: 6 },
    { dept: "Finance", headcount: 10 },
    { dept: "Marketing", headcount: 9 },
    { dept: "Sales", headcount: 12 },
  ];

  return (
    <div className={styles.container}>
      <h2>HR Dashboard</h2>
      <p className={styles.subtitle}>
        Real-time view of attendance, approvals, onboarding & HR operations
      </p>

      {/* TOP METRICS */}
      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <h4>Present Today</h4>
          <p>{summary.present}</p>
        </div>
        <div className={styles.metricCard}>
          <h4>Absent</h4>
          <p>{summary.absent}</p>
        </div>
        <div className={styles.metricCard}>
          <h4>On Leave</h4>
          <p>{summary.onLeave}</p>
        </div>
        <div className={styles.metricCardPending}>
          <h4>Pending Approvals</h4>
          <p>{summary.pendingApprovals}</p>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className={styles.actionsRow}>
        <button className={styles.actionBtn}>Approve Leaves</button>
        <button className={styles.actionBtn}>Attendance Regularization</button>
        <button className={styles.actionBtn}>New Joiner Checklist</button>
        <button className={styles.actionBtn}>HR Announcements</button>
      </div>

      {/* CHARTS SECTION */}
      <div className={styles.chartsRow}>
        {/* Today Attendance Pie */}
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h3>Today&apos;s Attendance</h3>
            <span className={styles.chartRange}>Today</span>
          </div>
          <div className={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={attendancePieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  label
                >
                  {attendancePieData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Attendance Trend Line */}
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h3>Weekly Attendance Trend</h3>
            <div className={styles.rangeTabs}>
              <button
                className={
                  selectedRange === "week"
                    ? styles.rangeTabActive
                    : styles.rangeTab
                }
                onClick={() => setSelectedRange("week")}
              >
                Week
              </button>
              <button
                className={
                  selectedRange === "month"
                    ? styles.rangeTabActive
                    : styles.rangeTab
                }
                onClick={() => setSelectedRange("month")}
              >
                Month
              </button>
            </div>
          </div>
          <div className={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={attendanceTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="present"
                  stroke="#2f54eb"
                  name="Present %"
                />
                <Line
                  type="monotone"
                  dataKey="absent"
                  stroke="#ff4d4f"
                  name="Absent %"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Headcount Bar */}
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h3>Department-wise Headcount</h3>
            <span className={styles.chartRange}>Current</span>
          </div>
          <div className={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptHeadcount}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dept" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="headcount" fill="#13c2c2" name="Headcount" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* HR SECTIONS GRID */}
      <div className={styles.sectionGrid}>
        {/* PENDING LEAVES */}
        <div className={styles.sectionBox}>
          <h3>Pending Leave Requests</h3>

          {pendingLeaves.length === 0 && (
            <p className={styles.empty}>No pending requests</p>
          )}

          {pendingLeaves.map((req) => (
            <div key={req.id} className={styles.listItem}>
              <div>
                <b>{req.name}</b> — {req.type} ({req.days} days)
              </div>
              <div className={styles.listActions}>
                <button className={styles.approveBtn}>Approve</button>
                <button className={styles.rejectBtn}>Reject</button>
              </div>
            </div>
          ))}
        </div>

        {/* REGULARIZATION */}
        <div className={styles.sectionBox}>
          <h3>Attendance Regularizations</h3>

          {pendingRegularization.length === 0 && (
            <p className={styles.empty}>No requests</p>
          )}

          {pendingRegularization.map((req) => (
            <div key={req.id} className={styles.listItem}>
              <div>
                <b>{req.name}</b> — {req.reason}
                <br />
                <small>{req.date}</small>
              </div>
              <div className={styles.listActions}>
                <button className={styles.approveBtn}>Approve</button>
                <button className={styles.rejectBtn}>Reject</button>
              </div>
            </div>
          ))}
        </div>

        {/* BIRTHDAYS */}
        <div className={styles.sectionBox}>
          <h3>Upcoming Birthdays 🎉</h3>
          {birthdays.map((b, i) => (
            <div key={i} className={styles.birthdayRow}>
              <span>{b.name}</span>
              <b>{b.date}</b>
            </div>
          ))}
        </div>

        {/* HR TASKS */}
        <div className={styles.sectionBox}>
          <h3>HR Tasks</h3>

          {hrTasks.map((t, i) => (
            <div key={i} className={styles.taskRow}>
              <span>{t.task}</span>
              <small className={styles.taskDue}>{t.due}</small>
            </div>
          ))}
        </div>

        {/* PROBATION EMPLOYEES */}
        <div className={styles.sectionBox}>
          <h3>Employees on Probation</h3>
          {probationEmployees.map((e, i) => (
            <div key={i} className={styles.listItem}>
              <div>
                <b>{e.name}</b> — {e.dept}
                <br />
                <small>Probation end: {e.endDate}</small>
              </div>
              <span className={`${styles.tag} ${styles.tagWarning}`}>
                On Probation
              </span>
            </div>
          ))}
        </div>

        {/* NEW JOINERS ONBOARDING */}
        <div className={styles.sectionBox}>
          <h3>New Joiners — Onboarding</h3>
          {newJoiners.map((j, i) => (
            <div key={i} className={styles.listItem}>
              <div>
                <b>{j.name}</b> — {j.dept}
                <br />
                <small>DOJ: {j.doj}</small>
              </div>
              <span
                className={`${styles.tag} ${
                  j.status === "Onboarded"
                    ? styles.tagSuccess
                    : j.status === "Documents Pending"
                    ? styles.tagDanger
                    : styles.tagInfo
                }`}
              >
                {j.status}
              </span>
            </div>
          ))}
        </div>

        {/* RESIGNATION PIPELINE */}
        <div className={styles.sectionBox}>
          <h3>Resignation Pipeline</h3>
          {resignations.map((r, i) => (
            <div key={i} className={styles.listItem}>
              <div>
                <b>{r.name}</b> — {r.dept}
                <br />
                <small>LWD: {r.lwd}</small>
              </div>
              <span
                className={`${styles.tag} ${
                  r.stage === "Notice Period"
                    ? styles.tagWarning
                    : styles.tagInfo
                }`}
              >
                {r.stage}
              </span>
            </div>
          ))}
        </div>

        {/* HR ANNOUNCEMENTS */}
        <div className={styles.sectionBox}>
          <h3>HR Announcements</h3>
          {announcements.map((a, i) => (
            <div key={i} className={styles.announcementItem}>
              <div className={styles.announcementHeader}>
                <span className={styles.announcementTitle}>{a.title}</span>
                <span className={styles.announcementMeta}>
                  {a.category} • {a.date}
                </span>
              </div>
              <p className={styles.announcementDesc}>{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
