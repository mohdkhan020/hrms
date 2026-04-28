"use client";

import { useMemo, useState } from "react";
import styles from "./hrLeave.module.css";

const LEAVE_TYPES = ["Sick Leave", "Casual Leave", "Earned Leave", "WFH"];
const STATUS_TYPES = ["Pending", "Approved", "Rejected"];
const DEPARTMENTS = ["IT", "HR", "Finance", "Marketing", "Sales"];

// Dummy leave data
const initialLeaves = [
  {
    id: "L1",
    empId: "E1",
    name: "John Doe",
    department: "IT",
    type: "Sick Leave",
    from: "2025-02-01",
    to: "2025-02-02",
    reason: "Fever",
    status: "Pending",
  },
  {
    id: "L2",
    empId: "E2",
    name: "Sarah Khan",
    department: "HR",
    type: "Casual Leave",
    from: "2025-02-05",
    to: "2025-02-05",
    reason: "Family Function",
    status: "Approved",
  },
  {
    id: "L3",
    empId: "E3",
    name: "Rohit Sharma",
    department: "Finance",
    type: "WFH",
    from: "2025-02-10",
    to: "2025-02-10",
    reason: "Internet Problem",
    status: "Pending",
  },
  {
    id: "L4",
    empId: "E4",
    name: "Ayesha Ali",
    department: "Marketing",
    type: "Earned Leave",
    from: "2025-02-15",
    to: "2025-02-17",
    reason: "Vacation",
    status: "Rejected",
  },
];

export default function HrLeave() {
  const [leaves] = useState(initialLeaves);
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [selected, setSelected] = useState<any>(null);
  const [showView, setShowView] = useState(false);

  /* --------------------------
     FILTERING & SEARCH
  -------------------------- */
  const filtered = useMemo(() => {
    let data = [...leaves];

    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter((e) => e.name.toLowerCase().includes(q));
    }

    if (dept) data = data.filter((e) => e.department === dept);
    if (leaveType) data = data.filter((e) => e.type === leaveType);
    if (statusFilter) data = data.filter((e) => e.status === statusFilter);

    return data;
  }, [search, dept, leaveType, statusFilter, leaves]);

  /* --------------------------
     EXPORT EXCEL
  -------------------------- */
  function exportExcel() {
    const rows = [
      ["Name", "Department", "Type", "From", "To", "Status"],
      ...filtered.map((e) => [
        e.name,
        e.department,
        e.type,
        e.from,
        e.to,
        e.status,
      ]),
    ];

    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "hr_leave_data.csv";
    a.click();
  }

  return (
    <div className={styles.container}>
      <h2>HR Leave Management</h2>

      {/* SUMMARY CARDS */}
      <div className={styles.cards}>
        <div className={styles.cardBox}>
          <h4>Total Leaves</h4>
          <p>{leaves.length}</p>
        </div>
        <div className={styles.cardBox}>
          <h4>Pending</h4>
          <p>{leaves.filter((l) => l.status === "Pending").length}</p>
        </div>
        <div className={styles.cardBox}>
          <h4>Approved</h4>
          <p>{leaves.filter((l) => l.status === "Approved").length}</p>
        </div>
        <div className={styles.cardBox}>
          <h4>Rejected</h4>
          <p>{leaves.filter((l) => l.status === "Rejected").length}</p>
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

        <select value={leaveType} onChange={(e) => setLeaveType(e.target.value)}>
          <option value="">All Leave Types</option>
          {LEAVE_TYPES.map((lt) => (
            <option key={lt}>{lt}</option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          {STATUS_TYPES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>

        <button className={styles.excelBtn} onClick={exportExcel}>
          ⬇ Export Excel
        </button>
      </div>

      {/* TABLE */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Department</th>
            <th>Type</th>
            <th>From</th>
            <th>To</th>
            <th>Status</th>
            <th style={{ textAlign: "center" }}>View</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.department}</td>
              <td>{item.type}</td>
              <td>{item.from}</td>
              <td>{item.to}</td>

              <td
                className={
                  item.status === "Approved"
                    ? styles.approved
                    : item.status === "Rejected"
                    ? styles.rejected
                    : styles.pending
                }
              >
                {item.status}
              </td>

              <td style={{ textAlign: "center" }}>
                <button
                  className={styles.viewBtn}
                  onClick={() => {
                    setSelected(item);
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

      {/* VIEW MODAL */}
      {showView && selected && (
        <div className={styles.modal}>
          <div className={styles.modalBox}>
            <h3>Leave Details</h3>
            <p><b>Name:</b> {selected.name}</p>
            <p><b>Department:</b> {selected.department}</p>
            <p><b>Leave Type:</b> {selected.type}</p>
            <p><b>From:</b> {selected.from}</p>
            <p><b>To:</b> {selected.to}</p>
            <p><b>Reason:</b> {selected.reason}</p>
            <p><b>Status:</b> {selected.status}</p>

            <button className={styles.closeBtn} onClick={() => setShowView(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
