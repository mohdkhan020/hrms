"use client";

import { useState } from "react";
import styles from "./hrReports.module.css";

// Dummy analytics (Replace later with API)
const attendanceStats = {
  totalWorkingDays: 22,
  avgAttendance: 88,
  latePercentage: 7,
  absentPercentage: 5,
};

const leaveStats = {
  totalLeaves: 52,
  sick: 18,
  casual: 20,
  earned: 14,
};

const payrollStats = {
  employees: 24,
  totalPayout: 820000,
  avgSalary: 34100,
};

const departmentStats = [
  { name: "IT", count: 10 },
  { name: "HR", count: 4 },
  { name: "Finance", count: 5 },
  { name: "Marketing", count: 3 },
  { name: "Sales", count: 2 },
];

const performers = [
  { name: "John Doe", score: 92 },
  { name: "Sarah Khan", score: 89 },
  { name: "Rohit Sharma", score: 86 },
];

export default function HrReports() {
  const [selected, setSelected] = useState<any>(null);

  function exportCSV() {
    const rows = [
      ["Category", "Metric", "Value"],

      // Attendance
      ["Attendance", "Avg Attendance", attendanceStats.avgAttendance],
      ["Attendance", "Late %", attendanceStats.latePercentage],
      ["Attendance", "Absent %", attendanceStats.absentPercentage],

      // Leave
      ["Leave", "Total Leaves", leaveStats.totalLeaves],
      ["Leave", "Sick", leaveStats.sick],
      ["Leave", "Casual", leaveStats.casual],
      ["Leave", "Earned", leaveStats.earned],

      // Payroll
      ["Payroll", "Total Employees", payrollStats.employees],
      ["Payroll", "Total Payout", payrollStats.totalPayout],
      ["Payroll", "Avg Salary", payrollStats.avgSalary],
    ];

    const csv = rows.map((r) => r.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "hr_report.csv";
    a.click();
  }

  return (
    <div className={styles.container}>
      <h2>HR Reports & Analytics</h2>

      <button className={styles.exportBtn} onClick={exportCSV}>
        ⬇ Export Full Report (CSV)
      </button>

      {/* GRID */}
      <div className={styles.grid}>
        {/* Attendance */}
        <div className={styles.box}>
          <h3>Attendance Summary</h3>
          <p>Avg Attendance: <b>{attendanceStats.avgAttendance}%</b></p>
          <p>Late: <b>{attendanceStats.latePercentage}%</b></p>
          <p>Absent: <b>{attendanceStats.absentPercentage}%</b></p>

          <div className={styles.barChart}>
            <div className={styles.bar} style={{ height: attendanceStats.avgAttendance + "%" }} />
            <div className={styles.barLate} style={{ height: attendanceStats.latePercentage + "%" }} />
            <div className={styles.barAbsent} style={{ height: attendanceStats.absentPercentage + "%" }} />
          </div>
        </div>

        {/* Leave */}
        <div className={styles.box}>
          <h3>Leave Summary</h3>
          <p>Total Leaves: <b>{leaveStats.totalLeaves}</b></p>
          <p>Sick: <b>{leaveStats.sick}</b></p>
          <p>Casual: <b>{leaveStats.casual}</b></p>
          <p>Earned: <b>{leaveStats.earned}</b></p>

          <div className={styles.pieChart}>
            <div className={styles.slice1}></div>
            <div className={styles.slice2}></div>
            <div className={styles.slice3}></div>
          </div>
        </div>

        {/* Payroll */}
        <div className={styles.box}>
          <h3>Payroll Summary</h3>
          <p>Total Employees: <b>{payrollStats.employees}</b></p>
          <p>Total Payout: <b>₹{payrollStats.totalPayout}</b></p>
          <p>Avg Salary: <b>₹{payrollStats.avgSalary}</b></p>
        </div>

        {/* Department-wise */}
        <div className={styles.box}>
          <h3>Department Strength</h3>
          {departmentStats.map((d) => (
            <div key={d.name} className={styles.deptRow}>
              <span>{d.name}</span>
              <b>{d.count}</b>
            </div>
          ))}
        </div>

        {/* Top Performers */}
        <div className={styles.box}>
          <h3>Top Performers ⭐</h3>
          {performers.map((p) => (
            <p key={p.name}>
              {p.name} — <b>{p.score}%</b>
            </p>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className={styles.modal}>
          <div className={styles.modalBox}>
            <h3>{selected.title}</h3>
            <p>{selected.text}</p>
            <button className={styles.closeBtn} onClick={() => setSelected(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
