// 🚀 OPTIONAL FEATURES (free add-ons)

// Agar chaho to main:

// 🔹 Add Leave Quota System
// 🔹 Auto Earned Leave Generator (monthly EL credit)
// 🔹 Carry Forward System (unused leaves → next year)
// 🔹 Half-Day Leave Support
// 🔹 Sandwich Leave Rule (Sat-Sun counted)
// 🔹 Leave Calendar (colored events)
// 🔹 Hierarchy-based approval (HR → Manager → Admin)

"use client";

import { useMemo, useState } from "react";
import styles from "./leave.module.css";

const LEAVE_TYPES = ["Sick Leave", "Casual Leave", "Earned Leave", "WFH", "Maternity Leave"];
const STATUS_TYPES = ["Pending", "Approved", "Rejected"];
const DEPARTMENTS = ["IT", "Human Resource", "Finance", "Marketing", "Sales"];

/* ----------------------------------------------------
   SAMPLE LEAVE DATA
---------------------------------------------------- */
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
    department: "Human Resource",
    type: "Casual Leave",
    from: "2025-02-05",
    to: "2025-02-05",
    reason: "Family Event",
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
    reason: "Laptop Issue",
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

export default function AdminLeave() {
  const [leaves, setLeaves] = useState(initialLeaves);
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [showAnalytics, setShowAnalytics] = useState(false);

  const [showView, setShowView] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  /* ----------------------------------------------------
     FILTERED DATA
  ---------------------------------------------------- */
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
  }, [leaves, search, dept, leaveType, statusFilter]);

  /* ----------------------------------------------------
     UPDATE STATUS
  ---------------------------------------------------- */
  function updateStatus(newStatus: string) {
    const updated = leaves.map((l) =>
      l.id === selected.id ? { ...l, status: newStatus } : l
    );
    setLeaves(updated);
    setShowEdit(false);
  }

  /* ----------------------------------------------------
     ANALYTICS DATA
  ---------------------------------------------------- */
  const total = leaves.length;
  const approved = leaves.filter((l) => l.status === "Approved").length;
  const pending = leaves.filter((l) => l.status === "Pending").length;
  const rejected = leaves.filter((l) => l.status === "Rejected").length;

  const approvalRate = total ? Math.round((approved / total) * 100) : 0;

  // Leave Type Breakdown
  const typeBreakdown: any = {};
  leaves.forEach((l) => {
    typeBreakdown[l.type] = (typeBreakdown[l.type] || 0) + 1;
  });

  const deptBreakdown: any = {};
  leaves.forEach((l) => {
    deptBreakdown[l.department] = (deptBreakdown[l.department] || 0) + 1;
  });

  const topEmployees = Object.entries(
    leaves.reduce((acc: any, l) => {
      acc[l.name] = (acc[l.name] || 0) + 1;
      return acc;
    }, {})
  ).sort((a: any, b: any) => b[1] - a[1]);

  const heatmap: any = {};
  leaves.forEach((l) => {
    heatmap[l.from] = (heatmap[l.from] || 0) + 1;
  });

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h2>Admin Leave Management</h2>
        <button
          className={styles.analyticsBtn}
          onClick={() => setShowAnalytics(!showAnalytics)}
        >
          {showAnalytics ? "Back to Leaves" : "📊 View Analytics"}
        </button>
      </div>

      {/* ----------------------------------------------------
          ANALYTICS VIEW
      ---------------------------------------------------- */}
      {showAnalytics && (
        <div className={styles.analyticsContainer}>

          {/* Summary */}
          <div className={styles.analyticsCards}>
            <div className={styles.card}><h4>Total Leaves</h4><p>{total}</p></div>
            <div className={styles.card}><h4>Approved</h4><p>{approved}</p></div>
            <div className={styles.card}><h4>Pending</h4><p>{pending}</p></div>
            <div className={styles.card}><h4>Rejected</h4><p>{rejected}</p></div>
            <div className={styles.card}><h4>Approval Rate</h4><p>{approvalRate}%</p></div>
          </div>

          {/* Leave Type Chart */}
          <div className={styles.section}>
            <h3>Leave Type Distribution</h3>
            <div className={styles.pie}>
              {Object.entries(typeBreakdown).map(([type, count]:any, i) => (
                <div
                  key={type}
                  className={styles.pieSlice}
                  style={{
                    "--value": count,
                    "--color": `hsl(${i * 60}, 70%, 55%)`,
                  } as any}
                >
                  {type} ({count})
                </div>
              ))}
            </div>
          </div>

          {/* Department Chart */}
          <div className={styles.section}>
            <h3>Department Wise Leave Usage</h3>
            <div className={styles.barChart}>
              {Object.entries(deptBreakdown).map(([d, count]:any) => (
                <div key={d} className={styles.barRow}>
                  <span>{d}</span>
                  <div className={styles.bar}
                    style={{ width: `${count * 20}px` }}></div>
                  <b>{count}</b>
                </div>
              ))}
            </div>
          </div>

          {/* Top Employees */}
          <div className={styles.section}>
            <h3>Top Leave Takers</h3>
            <ul className={styles.list}>
              {topEmployees.map(([name, count]: any) => (
                <li key={name}>
                  {name} — <b>{count}</b>
                </li>
              ))}
            </ul>
          </div>

          {/* Heatmap */}
          <div className={styles.section}>
            <h3>Leave Heatmap</h3>
            <div className={styles.heatmap}>
              {Object.entries(heatmap).map(([date, count]: any) => (
                <div
                  key={date}
                  className={styles.heatBlock}
                  title={`${date} — ${count} leaves`}
                  style={{
                    background:
                      count > 3 ? "#8B0000" :
                      count > 1 ? "#E76F51" :
                      count > 0 ? "#F4A261" :
                                  "#EEE",
                  }}
                />
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ----------------------------------------------------
          TABLE VIEW
      ---------------------------------------------------- */}
      {!showAnalytics && (
        <>
          {/* Filters */}
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
              {LEAVE_TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>

            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="">All Status</option>
              {STATUS_TYPES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Leave Table */}
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>Type</th>
                <th>From</th>
                <th>To</th>
                <th>Status</th>
                <th style={{ textAlign: "center" }}>Actions</th>
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

                  <td className={styles.actions}>
                    <button
                      className={styles.viewBtn}
                      onClick={() => {
                        setSelected(item);
                        setShowView(true);
                      }}
                    >
                      View
                    </button>

                    <button
                      className={styles.editBtn}
                      onClick={() => {
                        setSelected(item);
                        setShowEdit(true);
                      }}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* VIEW MODAL */}
      {showView && selected && (
        <div className={styles.modal}>
          <div className={styles.modalBox}>
            <h3>Leave Details</h3>
            <p><b>Name:</b> {selected.name}</p>
            <p><b>Type:</b> {selected.type}</p>
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

      {/* EDIT MODAL */}
      {showEdit && selected && (
        <div className={styles.modal}>
          <div className={styles.modalBox}>
            <h3>Update Leave Status</h3>

            <div className={styles.editBtns}>
              <button onClick={() => updateStatus("Approved")} className={styles.green}>
                Approve
              </button>

              <button onClick={() => updateStatus("Rejected")} className={styles.red}>
                Reject
              </button>

              <button onClick={() => setShowEdit(false)} className={styles.closeBtn}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
