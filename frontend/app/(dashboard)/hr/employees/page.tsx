"use client";

import { useMemo, useState } from "react";
import styles from "./hrEmployees.module.css";

export default function HrDirectory() {
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("");
  const [role, setRole] = useState("");
  const [sort, setSort] = useState("asc");
  const [selected, setSelected] = useState<any>(null);

  const EMPLOYEES = [
    {
      id: "E101",
      name: "John Doe",
      role: "Software Engineer",
      department: "IT",
      phone: "9876543210",
      email: "john@example.com",
    },
    {
      id: "E102",
      name: "Sarah Khan",
      role: "HR Executive",
      department: "Human Resource",
      phone: "9822154760",
      email: "sarah@example.com",
    },
    {
      id: "E103",
      name: "Rohit Sharma",
      role: "Accountant",
      department: "Finance",
      phone: "9988776655",
      email: "rohit@example.com",
    },
    {
      id: "E104",
      name: "Ayesha Ali",
      role: "Marketing Manager",
      department: "Marketing",
      phone: "9123456789",
      email: "ayesha@example.com",
    },
    {
      id: "E105",
      name: "Vikram Patel",
      role: "Sales Executive",
      department: "Sales",
      phone: "9230012345",
      email: "vikram@example.com",
    },
  ];

  const filtered = useMemo(() => {
    let data = [...EMPLOYEES];

    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.email.toLowerCase().includes(q) ||
          e.role.toLowerCase().includes(q)
      );
    }

    if (dept) data = data.filter((e) => e.department === dept);
    if (role) data = data.filter((e) => e.role === role);

    data.sort((a, b) =>
      sort === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

    return data;
  }, [search, dept, role, sort]);

  return (
    <div className={styles.container}>
      <h2>Employee Directory</h2>

      {/* FILTERS */}
      <div className={styles.filters}>
        <input
          placeholder="Search employees..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={dept} onChange={(e) => setDept(e.target.value)}>
          <option value="">All Departments</option>
          <option value="IT">IT</option>
          <option value="Human Resource">Human Resource</option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
          <option value="Sales">Sales</option>
        </select>

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">All Roles</option>
          {EMPLOYEES.map((e) => (
            <option key={e.id} value={e.role}>
              {e.role}
            </option>
          ))}
        </select>

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="asc">Sort: A–Z</option>
          <option value="desc">Sort: Z–A</option>
        </select>
      </div>

      {/* EMPLOYEE CARDS */}
      <div className={styles.grid}>
        {filtered.map((emp) => (
          <div
            key={emp.id}
            className={styles.card}
            onClick={() => setSelected(emp)}
          >
            <div className={styles.avatar}>
              {emp.name.charAt(0)}
            </div>

            <h4>{emp.name}</h4>
            <p className={styles.role}>{emp.role}</p>
            <p className={styles.dept}>{emp.department}</p>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className={styles.empty}>No employees found.</p>
        )}
      </div>

      {/* VIEW PROFILE MODAL */}
      {selected && (
        <div className={styles.modal}>
          <div className={styles.modalBox}>
            <h3>{selected.name}</h3>

            <p>
              <b>Role:</b> {selected.role}
            </p>
            <p>
              <b>Department:</b> {selected.department}
            </p>
            <p>
              <b>Email:</b> {selected.email}
            </p>
            <p>
              <b>Phone:</b> {selected.phone}
            </p>

            <button className={styles.closeBtn} onClick={() => setSelected(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
