"use client";

import { useState, useMemo, useEffect } from "react";
import styles from "./department.module.css";

/**
 * Upgraded Department Management with:
 * - assign HR manager
 * - salary budget per dept
 * - auto-calc employees count from employees list
 * - department attendance/leave analytics (dummy)
 * - notes + document uploads (client-side preview)
 *
 * Replace existing page.tsx with this file.
 */

/* -------------------------
   Dummy employees (source of truth for counts)
   In real app -> fetch from API/DB
--------------------------*/
const EMPLOYEES = [
  { id: "E1", name: "John Doe", department: "IT" },
  { id: "E2", name: "Sarah Khan", department: "Human Resource" },
  { id: "E3", name: "Rohit Sharma", department: "Finance" },
  { id: "E4", name: "Ayesha Ali", department: "Marketing" },
  { id: "E5", name: "Vikram Patel", department: "Sales" },
  { id: "E6", name: "Rina Gupta", department: "IT" },
  { id: "E7", name: "Imran Ali", department: "Sales" },
  { id: "E8", name: "Meera Joshi", department: "Marketing" },
  { id: "E9", name: "Amit Verma", department: "Finance" },
  { id: "E10", name: "Nisha Rao", department: "Human Resource" },
];

/* -------------------------
   Default Departments (now include manager, budget, notes, docs)
--------------------------*/
const defaultList:any = [
  { id: "D1", name: "IT", manager: "E1", employees: 2, budget: 250000, notes: "", documents: [] },
  { id: "D2", name: "Human Resource", manager: "E2", employees: 2, budget: 120000, notes: "", documents: [] },
  { id: "D3", name: "Finance", manager: "E3", employees: 2, budget: 180000, notes: "", documents: [] },
  { id: "D4", name: "Marketing", manager: "E4", employees: 2, budget: 150000, notes: "", documents: [] },
  { id: "D5", name: "Sales", manager: "E5", employees: 2, budget: 200000, notes: "", documents: [] },
];

/* -------------------------
   Dummy attendance/leave records (for analytics)
   In production you'd use real data by department/month
--------------------------*/
function generateDummyAnalytics() {
  // returns {month: '2025-02', present: n, leaves: m, late: p}
  const months = ["2025-02", "2025-03", "2025-04", "2025-05", "2025-06", "2025-07"];
  return months.map((m) => ({
    month: m,
    present: Math.floor(Math.random() * 120) + 50,
    leaves: Math.floor(Math.random() * 20),
    late: Math.floor(Math.random() * 15),
  }));
}

export default function AdminDepartment() {
  const [list, setList] = useState(defaultList);

  /* UI states */
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  const [sort, setSort] = useState("asc");

  const [page, setPage] = useState(1);
  const size = 5;

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showDocs, setShowDocs] = useState(false);

  const [selected, setSelected] = useState<any>(null);

  /* add form */
  const [newDept, setNewDept] = useState({ name: "", manager: "", employees: 0, budget: 0, notes: "" });

  /* edit form state */
  const [editDept, setEditDept] = useState<any>(null);

  /* document upload temp */
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);

  /* debounce search */
  useEffect(() => {
    const t = setTimeout(() => setDebounced(search.trim()), 200);
    return () => clearTimeout(t);
  }, [search]);

  /* filtered + sorted */
  const filtered = useMemo(() => {
    let data = [...list];
    if (debounced) {
      const q = debounced.toLowerCase();
      data = data.filter((d) => d.name.toLowerCase().includes(q));
    }
    data.sort((a, b) => (sort === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)));
    return data;
  }, [list, debounced, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / size));
  const paged = useMemo(() => {
    const start = (page - 1) * size;
    return filtered.slice(start, start + size);
  }, [filtered, page]);

  /* -------------------------
     Add department
  --------------------------*/
  function addDepartment() {
    if (!newDept.name.trim()) return alert("Department name required");
    const id = "D" + (list.length + 1);
    const item = {
      id,
      name: newDept.name.trim(),
      manager: newDept.manager || "",
      employees: Number(newDept.employees || 0),
      budget: Number(newDept.budget || 0),
      notes: newDept.notes || "",
      documents: [],
    };
    setList((p:any) => [...p, item]);
    setNewDept({ name: "", manager: "", employees: 0, budget: 0, notes: "" });
    setShowAdd(false);
  }

  /* -------------------------
     open edit modal (prefill)
  --------------------------*/
  function openEdit(item: any) {
    setSelected(item);
    setEditDept({ ...item }); // clone
    setShowEdit(true);
  }

  function saveEdit() {
    setList((prev:any) => prev.map((d:any) => (d.id === editDept.id ? { ...d, ...editDept } : d)));
    setShowEdit(false);
  }

  function deleteDept(id: string) {
    if (!confirm("Delete this department?")) return;
    setList((prev:any) => prev.filter((d:any) => d.id !== id));
  }

  /* -------------------------
     Auto-calc employees counts from EMPLOYEES list
  --------------------------*/
  function syncEmployeeCounts() {
    setList((prev:any) =>
      prev.map((d:any) => {
        const count = EMPLOYEES.filter((e) => e.department === d.name).length;
        return { ...d, employees: count };
      })
    );
    alert("Employee counts synced from employee dataset.");
  }

  /* -------------------------
     Assign Manager (just set manager id)
  --------------------------*/
  function setManager(deptId: string, empId: string) {
    setList((prev:any) => prev.map((d:any) => (d.id === deptId ? { ...d, manager: empId } : d)));
  }

  /* -------------------------
     Salary budget update inline
  --------------------------*/
  function setBudget(deptId: string, value: number) {
    setList((prev:any) => prev.map((d:any) => (d.id === deptId ? { ...d, budget: value } : d)));
  }

  /* -------------------------
     Documents upload per department (client-side)
  --------------------------*/
  function handleDocsUpload(e: React.ChangeEvent<HTMLInputElement>, deptId: string) {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const arr = Array.from(files).map((f) => {
      return {
        id: Math.random().toString(36).slice(2, 9),
        name: f.name,
        url: URL.createObjectURL(f),
        size: f.size,
        type: f.type,
        uploadedAt: new Date().toLocaleString(),
      };
    });

    setList((prev:any) => prev.map((d:any) => (d.id === deptId ? { ...d, documents: [...(d.documents || []), ...arr] } : d)));
  }

  function removeDoc(deptId: string, docId: string) {
    setList((prev:any) => prev.map((d:any) => (d.id === deptId ? { ...d, documents: (d.documents || []).filter((x:any) => x.id !== docId) } : d)));
  }

  /* -------------------------
     Department analytics (dummy)
  --------------------------*/
  function openAnalytics(dept: any) {
    setSelected(dept);
    setShowAnalytics(true);
  }

  const analyticsData = useMemo(() => {
    if (!selected) return [];
    // generate deterministic-ish dummy analytics per department name
    const base = selected.name.length * 3;
    return generateDummyAnalytics().map((m) => ({
      month: m.month,
      present: Math.max(0, m.present + base - Math.floor(Math.random() * 20)),
      leaves: Math.max(0, m.leaves + Math.floor(Math.random() * 6)),
      late: Math.max(0, m.late + Math.floor(Math.random() * 4)),
    }));
  }, [selected]);

  return (
    <div className={styles.container}>
      <h2>Department Management (Upgraded)</h2>

      {/* top actions */}
      <div className={styles.topActions}>
        <input placeholder="Search department..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <div style={{ display: "flex", gap: 10 }}>
          <button className={styles.addBtn} onClick={() => setShowAdd(true)}>+ Add Department</button>
          <button className={styles.syncBtn} onClick={syncEmployeeCounts}>🔄 Sync Counts</button>
        </div>
      </div>

      {/* table */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th onClick={() => setSort(sort === "asc" ? "desc" : "asc")}>Department {sort === "asc" ? "↑" : "↓"}</th>
            <th>Manager</th>
            <th>Employees</th>
            <th>Budget (₹)</th>
            <th style={{ textAlign: "center" }}>Docs</th>
            <th style={{ textAlign: "center" }}>Analytics</th>
            <th style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {paged.map((d) => (
            <tr key={d.id}>
              <td>{d.name}</td>

              <td>
                <select
                  value={d.manager || ""}
                  onChange={(e) => setManager(d.id, e.target.value)}
                >
                  <option value="">— Select Manager —</option>
                  {EMPLOYEES.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name} ({emp.department})
                    </option>
                  ))}
                </select>
              </td>

              <td>
                {/* show auto-calculated value (live) based on EMPLOYEES source */}
                <div>
                  <span style={{ fontWeight: 700 }}>{EMPLOYEES.filter((e) => e.department === d.name).length}</span>
                  <div style={{ fontSize: 12, color: "#666" }}> (stored: {d.employees})</div>
                </div>
              </td>

              <td>
                <input
                  type="number"
                  className={styles.budgetInput}
                  value={d.budget}
                  onChange={(e) => setBudget(d.id, Number(e.target.value || 0))}
                />
              </td>

              <td style={{ textAlign: "center" }}>
                <button className={styles.smallBtn} onClick={() => { setSelected(d); setShowDocs(true); }}>
                  Documents ({(d.documents || []).length})
                </button>
              </td>

              <td style={{ textAlign: "center" }}>
                <button className={styles.smallBtn} onClick={() => openAnalytics(d)}>View</button>
              </td>

              <td className={styles.actions}>
                <button className={styles.editBtn} onClick={() => openEdit(d)}>Edit</button>
                <button className={styles.deleteBtn} onClick={() => deleteDept(d.id)}>Delete</button>
              </td>
            </tr>
          ))}

          {paged.length === 0 && (
            <tr>
              <td colSpan={7} style={{ textAlign: "center", padding: 20 }}>No departments found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* pagination */}
      <div className={styles.pagination}>
        <button disabled={page === 1} onClick={() => setPage(1)}>{"<<"}</button>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
        <span className={styles.current}>{page}</span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
        <button disabled={page === totalPages} onClick={() => setPage(totalPages)}>{">>"}</button>
      </div>

      {/* ADD MODAL */}
      {showAdd && (
        <div className={styles.modal}>
          <div className={styles.modalBox}>
            <h3>Add Department</h3>

            <input placeholder="Department Name" value={newDept.name} onChange={(e) => setNewDept({ ...newDept, name: e.target.value })} />
            <select value={newDept.manager} onChange={(e) => setNewDept({ ...newDept, manager: e.target.value })}>
              <option value="">— Select Manager —</option>
              {EMPLOYEES.map((emp) => <option key={emp.id} value={emp.id}>{emp.name} ({emp.department})</option>)}
            </select>
            <input type="number" placeholder="Employees (initial)" value={newDept.employees} onChange={(e) => setNewDept({ ...newDept, employees: Number(e.target.value) })} />
            <input type="number" placeholder="Salary Budget (₹)" value={newDept.budget} onChange={(e) => setNewDept({ ...newDept, budget: Number(e.target.value) })} />
            <textarea placeholder="Notes" value={newDept.notes} onChange={(e) => setNewDept({ ...newDept, notes: e.target.value })} />

            <div style={{ display: "flex", gap: 10 }}>
              <button className={styles.saveBtn} onClick={addDepartment}>Save</button>
              <button className={styles.closeBtn} onClick={() => setShowAdd(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {showEdit && editDept && (
        <div className={styles.modal}>
          <div className={styles.modalBox}>
            <h3>Edit Department</h3>

            <input value={editDept.name} onChange={(e) => setEditDept({ ...editDept, name: e.target.value })} />
            <select value={editDept.manager} onChange={(e) => setEditDept({ ...editDept, manager: e.target.value })}>
              <option value="">— Select Manager —</option>
              {EMPLOYEES.map((emp) => <option key={emp.id} value={emp.id}>{emp.name} ({emp.department})</option>)}
            </select>
            <input type="number" value={editDept.employees} onChange={(e) => setEditDept({ ...editDept, employees: Number(e.target.value) })} />
            <input type="number" value={editDept.budget} onChange={(e) => setEditDept({ ...editDept, budget: Number(e.target.value) })} />
            <textarea value={editDept.notes} onChange={(e) => setEditDept({ ...editDept, notes: e.target.value })} />

            <div style={{ display: "flex", gap: 10 }}>
              <button className={styles.saveBtn} onClick={saveEdit}>Save Changes</button>
              <button className={styles.closeBtn} onClick={() => setShowEdit(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* DOCUMENTS MODAL */}
      {showDocs && selected && (
        <div className={styles.modal}>
          <div className={styles.modalBox} style={{ width: 520 }}>
            <h3>Documents — {selected.name}</h3>

            <input type="file" multiple onChange={(e) => handleDocsUpload(e, selected.id)} />

            <div style={{ marginTop: 12 }}>
              {(selected.documents || []).length === 0 && <p>No documents uploaded yet.</p>}

              {(selected.documents || []).map((doc: any) => (
                <div key={doc.id} className={styles.docRow}>
                  <a href={doc.url} target="_blank" rel="noreferrer">{doc.name}</a>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ fontSize: 12, color: "#666" }}>{Math.round(doc.size / 1024)} KB</span>
                    <button className={styles.deleteBtn} onClick={() => removeDoc(selected.id, doc.id)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
              <button className={styles.closeBtn} onClick={() => setShowDocs(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* ANALYTICS MODAL */}
      {showAnalytics && selected && (
        <div className={styles.modal}>
          <div className={styles.modalBox} style={{ width: 640 }}>
            <h3>Analytics — {selected.name}</h3>

            <div className={styles.analyticsGrid}>
              <div className={styles.analyticCard}>
                <h4>Last Months (Present)</h4>
                <div className={styles.sparkRow}>
                  {analyticsData.map((a: any) => <div key={a.month} className={styles.sparkCol}><div className={styles.sparkBar} style={{ height: Math.min(160, a.present) }} /> <small>{a.month.slice(-2)}</small></div>)}
                </div>
              </div>

              <div className={styles.analyticCard}>
                <h4>Leaves</h4>
                <ul>
                  {analyticsData.map((a: any) => <li key={a.month}>{a.month}: <b>{a.leaves}</b> leaves</li>)}
                </ul>
              </div>

              <div className={styles.analyticCard}>
                <h4>Late Marks</h4>
                <ul>
                  {analyticsData.map((a: any) => <li key={a.month}>{a.month}: <b>{a.late}</b> late</li>)}
                </ul>
              </div>
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
              <button className={styles.closeBtn} onClick={() => setShowAnalytics(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
