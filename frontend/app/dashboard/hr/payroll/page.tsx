"use client";

import { useMemo, useState } from "react";
import styles from "./hrPayroll.module.css";

const DEPARTMENTS = ["IT", "HR", "Finance", "Marketing", "Sales"];

// Dummy payroll data
const payrollData = [
  {
    id: "1",
    name: "John Doe",
    department: "IT",
    base: 35000,
    hra: 12000,
    bonus: 3000,
    deductions: 2000,
  },
  {
    id: "2",
    name: "Sarah Khan",
    department: "HR",
    base: 38000,
    hra: 15000,
    bonus: 4000,
    deductions: 2500,
  },
  {
    id: "3",
    name: "Rohit Sharma",
    department: "Finance",
    base: 42000,
    hra: 16000,
    bonus: 5000,
    deductions: 3000,
  },
  {
    id: "4",
    name: "Ayesha Ali",
    department: "Marketing",
    base: 30000,
    hra: 10000,
    bonus: 2000,
    deductions: 1500,
  },
];

export default function HrPayroll() {
  const [list] = useState(payrollData);
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("");

  const [selected, setSelected] = useState<any>(null);
  const [showView, setShowView] = useState(false);

  // Calculations
  const totalSalary = list.reduce(
    (sum, e) => sum + (e.base + e.hra + e.bonus - e.deductions),
    0
  );

  const avgSalary = Math.round(totalSalary / list.length);

  // Filtering
  const filtered = useMemo(() => {
    let data = [...list];

    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter((e) => e.name.toLowerCase().includes(q));
    }

    if (dept) data = data.filter((e) => e.department === dept);

    return data;
  }, [search, dept, list]);

  // Export CSV
  const exportPayroll = () => {
    const rows = [
      ["Name", "Department", "Base", "HRA", "Bonus", "Deductions", "Net Salary"],
      ...filtered.map((e) => [
        e.name,
        e.department,
        e.base,
        e.hra,
        e.bonus,
        e.deductions,
        e.base + e.hra + e.bonus - e.deductions,
      ]),
    ];

    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "hr_payroll.csv";
    a.click();
  };

  return (
    <div className={styles.container}>
      <h2>HR Payroll Overview</h2>

      {/* SUMMARY CARDS */}
      <div className={styles.cards}>
        <div className={styles.card}>
          <h4>Total Employees</h4>
          <p>{list.length}</p>
        </div>

        <div className={styles.card}>
          <h4>Total Payout</h4>
          <p>₹{totalSalary.toLocaleString()}</p>
        </div>

        <div className={styles.card}>
          <h4>Average Salary</h4>
          <p>₹{avgSalary.toLocaleString()}</p>
        </div>

        <div className={styles.card}>
          <h4>Payroll Status</h4>
          <p>✔ Processed</p>
        </div>
      </div>

      {/* FILTERS */}
      <div className={styles.filters}>
        <input
          placeholder="Search employee..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={dept} onChange={(e) => setDept(e.target.value)}>
          <option value="">All Departments</option>
          {DEPARTMENTS.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>

        <button className={styles.exportBtn} onClick={exportPayroll}>
          ⬇ Export CSV
        </button>
      </div>

      {/* TABLE */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Dept</th>
            <th>Base</th>
            <th>HRA</th>
            <th>Bonus</th>
            <th>Deductions</th>
            <th>Net Salary</th>
            <th style={{ textAlign: "center" }}>View</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((e) => (
            <tr key={e.id}>
              <td>{e.name}</td>
              <td>{e.department}</td>
              <td>₹{e.base}</td>
              <td>₹{e.hra}</td>
              <td>₹{e.bonus}</td>
              <td>₹{e.deductions}</td>
              <td className={styles.net}>
                ₹{e.base + e.hra + e.bonus - e.deductions}
              </td>
              <td style={{ textAlign: "center" }}>
                <button
                  className={styles.viewBtn}
                  onClick={() => {
                    setSelected(e);
                    setShowView(true);
                  }}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* VIEW PAYROLL MODAL */}
      {showView && selected && (
        <div className={styles.modal}>
          <div className={styles.modalBox}>
            <h3>Salary Breakdown</h3>
            <p><b>Name:</b> {selected.name}</p>
            <p><b>Department:</b> {selected.department}</p>
            <p><b>Base Salary:</b> ₹{selected.base}</p>
            <p><b>HRA:</b> ₹{selected.hra}</p>
            <p><b>Bonus:</b> ₹{selected.bonus}</p>
            <p><b>Deductions:</b> ₹{selected.deductions}</p>

            <p className={styles.netSalary}>
              <b>Net Salary:</b> ₹
              {selected.base + selected.hra + selected.bonus - selected.deductions}
            </p>

            <button className={styles.closeBtn} onClick={() => setShowView(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
