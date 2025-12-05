// Hook this to your backend API (POST/PUT/DELETE) — I’ll add fetch/axios calls and error handling.

// Add confirmation modal for delete with nicer UI.

// Add export (CSV) or bulk upload for employees.



"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./employees.module.css";

/**
 * Admin Employees Page
 * - Dummy data
 * - Add / Edit / View / Delete
 * - Photo upload (dataURL preview)
 * - Debounced search
 * - Pagination + page size
 * - Sorting (A-Z / Z-A)
 */

type Employee = {
  id: string;
  name: string;
  employeeId: string;
  department: string;
  role: string;
  status: "Active" | "Inactive";
  photo?: string; // data URL
};

const initialData: Employee[] = [
  {
    id: "1",
    name: "John Doe",
    employeeId: "EMP101",
    department: "IT",
    role: "Software Engineer",
    status: "Active",
  },
  {
    id: "2",
    name: "Sarah Khan",
    employeeId: "EMP215",
    department: "Human Resource",
    role: "HR Manager",
    status: "Active",
  },
  {
    id: "3",
    name: "Rohit Sharma",
    employeeId: "EMP332",
    department: "Finance",
    role: "Accountant",
    status: "Inactive",
  },
  {
    id: "4",
    name: "Ayesha Ali",
    employeeId: "EMP512",
    department: "Marketing",
    role: "SEO Specialist",
    status: "Active",
  },
  {
    id: "5",
    name: "Vikram Patel",
    employeeId: "EMP613",
    department: "IT",
    role: "DevOps",
    status: "Active",
  },
  {
    id: "6",
    name: "Anita Singh",
    employeeId: "EMP714",
    department: "Finance",
    role: "Analyst",
    status: "Active",
  },
  {
    id: "7",
    name: "Rita Verma",
    employeeId: "EMP815",
    department: "Human Resource",
    role: "Recruiter",
    status: "Active",
  },
];

const DEPARTMENTS = ["IT", "Human Resource", "Finance", "Marketing", "Sales"];
const ROLES = [
  "Software Engineer",
  "HR Manager",
  "Accountant",
  "SEO Specialist",
  "DevOps",
  "Analyst",
  "Recruiter",
];

export default function AdminEmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>(initialData);

  // UI states
  const [showAdd, setShowAdd] = useState(false);
  const [showView, setShowView] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [selected, setSelected] = useState<Employee | null>(null);

  // search + debounce
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query.trim()), 300);
    return () => clearTimeout(t);
  }, [query]);

  // filters
  const [deptFilter, setDeptFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // sorting
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // derived filtered list
  const filtered = useMemo(() => {
    let list = [...employees];

    if (debouncedQuery) {
      const q = debouncedQuery.toLowerCase();
      list = list.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.employeeId.toLowerCase().includes(q) ||
          e.role.toLowerCase().includes(q)
      );
    }

    if (deptFilter) list = list.filter((e) => e.department === deptFilter);
    if (statusFilter) list = list.filter((e) => e.status === statusFilter);

    list.sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

    return list;
  }, [employees, debouncedQuery, deptFilter, statusFilter, sortOrder]);

  // pagination slice
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages, page]);

  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  // helper: read file to dataURL
  const readFileAsDataUrl = (file?: File) =>
    new Promise<string | undefined>((resolve) => {
      if (!file) return resolve(undefined);
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => resolve(undefined);
      reader.readAsDataURL(file);
    });

  // Add employee handler
  async function handleAdd(ev: React.FormEvent) {
    ev.preventDefault();
    const form = ev.target as HTMLFormElement;
    const formData = new FormData(form);

    const name = String(formData.get("name") || "").trim();
    const employeeId = String(formData.get("employeeId") || "").trim();
    const department = String(formData.get("department") || "");
    const role = String(formData.get("role") || "");
    const status = String(formData.get("status") || "Active") as
      | "Active"
      | "Inactive";
    const file = formData.get("photo") as File | null;

    if (!name || !employeeId) {
      alert("Name and Employee ID are required");
      return;
    }

    const photo = await readFileAsDataUrl(file ?? undefined);

    const newEmployee: Employee = {
      id: String(Date.now()),
      name,
      employeeId,
      department,
      role,
      status,
      photo,
    };

    setEmployees((s) => [newEmployee, ...s]);
    setShowAdd(false);
    form.reset();
    setPage(1);
  }

  // View
  function handleOpenView(emp: Employee) {
    setSelected(emp);
    setShowView(true);
  }

  // Delete
  function handleDelete(emp: Employee) {
    if (!confirm(`Delete ${emp.name}? This cannot be undone.`)) return;
    setEmployees((s) => s.filter((e) => e.id !== emp.id));
  }

  // Edit
  async function handleEditSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!selected) return;
    const form = ev.target as HTMLFormElement;
    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const employeeId = String(formData.get("employeeId") || "").trim();
    const department = String(formData.get("department") || "");
    const role = String(formData.get("role") || "");
    const status = String(formData.get("status") || "Active") as
      | "Active"
      | "Inactive";
    const file = formData.get("photo") as File | null;

    const photo = file ? await readFileAsDataUrl(file) : selected.photo;

    const updated: Employee = {
      ...selected,
      name,
      employeeId,
      department,
      role,
      status,
      photo,
    };

    setEmployees((s) => s.map((e) => (e.id === selected.id ? updated : e)));
    setShowEdit(false);
    setSelected(null);
  }

  // sorting toggle
  function toggleSort() {
    setSortOrder((s) => (s === "asc" ? "desc" : "asc"));
  }

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <div className={styles.header}>
        <h2>Employees</h2>

        <div className={styles.headerRight}>
          <div className={styles.sortWrap}>
            <button className={styles.sortBtn} onClick={toggleSort}>
              Sort: {sortOrder === "asc" ? "A → Z" : "Z → A"}
            </button>
          </div>

          <button
            className={styles.addBtn}
            onClick={() => {
              setShowAdd(true);
            }}
          >
            + Add Employee
          </button>
        </div>
      </div>

      {/* FILTERS */}
      <div className={styles.filters}>
        <input
          placeholder="Search by name, id or role..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <select
          value={deptFilter}
          onChange={(e) => {
            setDeptFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Departments</option>
          {DEPARTMENTS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <div className={styles.pageSizeWrap}>
          <label>Rows</label>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
          >
            <option value={5}>5</option>
            <option value={8}>8</option>
            <option value={12}>12</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Employee ID</th>
            <th>Department</th>
            <th>Role</th>
            <th>Status</th>
            <th style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {paged.map((emp) => (
            <tr key={emp.id}>
              <td className={styles.empCell}>
                <div className={styles.avatarWrap}>
                  {emp.photo ? (
                    <img src={emp.photo} alt={emp.name} />
                  ) : (
                    <div className={styles.avatarPlaceholder}>
                      {emp.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <div className={styles.empName}>{emp.name}</div>
                  <div className={styles.empSub}>{emp.role}</div>
                </div>
              </td>

              <td>{emp.employeeId}</td>
              <td>{emp.department}</td>
              <td>{emp.role}</td>
              <td
                className={emp.status === "Active" ? styles.active : styles.inactive}
              >
                {emp.status}
              </td>

              <td className={styles.actionBtns}>
                <button
                  className={styles.viewBtn}
                  onClick={() => handleOpenView(emp)}
                  title="View"
                >
                  View
                </button>

                <button
                  className={styles.editBtn}
                  onClick={() => {
                    setSelected(emp);
                    setShowEdit(true);
                  }}
                  title="Edit"
                >
                  Edit
                </button>

                <button
                  className={styles.deleteBtn}
                  onClick={() => handleDelete(emp)}
                  title="Delete"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {paged.length === 0 && (
            <tr>
              <td colSpan={6} style={{ textAlign: "center", padding: 30 }}>
                No employees found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div className={styles.pagination}>
        <div>
          Showing <b>{Math.min((page - 1) * pageSize + 1, total)}</b> -
          <b> {Math.min(page * pageSize, total)}</b> of <b>{total}</b>
        </div>

        <div className={styles.pageControls}>
          <button
            onClick={() => setPage(1)}
            disabled={page === 1}
            className={styles.pageBtn}
          >
            {"<<"}
          </button>
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className={styles.pageBtn}
          >
            Prev
          </button>

          <span className={styles.currentPage}>{page}</span>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className={styles.pageBtn}
          >
            Next
          </button>
          <button
            onClick={() => setPage(totalPages)}
            disabled={page === totalPages}
            className={styles.pageBtn}
          >
            {">>"}
          </button>
        </div>
      </div>

      {/* ===== ADD Modal ===== */}
      {showAdd && (
        <div className={styles.modal}>
          <div className={styles.modalBox}>
            <h3>Add Employee</h3>

            <form onSubmit={handleAdd}>
              <input name="name" placeholder="Full name" required />
              <input name="employeeId" placeholder="Employee ID (eg EMP999)" required />
              <select name="department" defaultValue={DEPARTMENTS[0]}>
                {DEPARTMENTS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>

              <select name="role" defaultValue={ROLES[0]}>
                {ROLES.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>

              <select name="status" defaultValue="Active">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              <label className={styles.fileLabel}>
                Photo (optional)
                <input name="photo" type="file" accept="image/*" />
              </label>

              <button type="submit" className={styles.saveBtn}>
                Save
              </button>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={() => setShowAdd(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ===== VIEW Modal ===== */}
      {showView && selected && (
        <div className={styles.modal}>
          <div className={styles.modalBox}>
            <h3>Employee Details</h3>

            <div className={styles.viewRow}>
              <div className={styles.viewAvatar}>
                {selected.photo ? (
                  <img src={selected.photo} alt={selected.name} />
                ) : (
                  <div className={styles.avatarPlaceholderLarge}>
                    {selected.name.charAt(0)}
                  </div>
                )}
              </div>

              <div>
                <p><b>{selected.name}</b></p>
                <p>{selected.employeeId}</p>
                <p>{selected.department} • {selected.role}</p>
                <p>Status: {selected.status}</p>
              </div>
            </div>

            <button className={styles.closeBtn} onClick={() => setShowView(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* ===== EDIT Modal ===== */}
      {showEdit && selected && (
        <div className={styles.modal}>
          <div className={styles.modalBox}>
            <h3>Edit Employee</h3>

            <form onSubmit={handleEditSubmit}>
              <input name="name" defaultValue={selected.name} required />
              <input name="employeeId" defaultValue={selected.employeeId} required />
              <select name="department" defaultValue={selected.department}>
                {DEPARTMENTS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>

              <select name="role" defaultValue={selected.role}>
                {ROLES.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>

              <select name="status" defaultValue={selected.status}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              <label className={styles.fileLabel}>
                Replace Photo
                <input name="photo" type="file" accept="image/*" />
              </label>

              <button type="submit" className={styles.saveBtn}>
                Update
              </button>

              <button
                type="button"
                className={styles.closeBtn}
                onClick={() => {
                  setShowEdit(false);
                  setSelected(null);
                }}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
