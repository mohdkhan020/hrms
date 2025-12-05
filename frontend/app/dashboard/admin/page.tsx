"use client";

import { useState, useMemo, SetStateAction } from "react";
import { jsPDF } from "jspdf";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styles from "./admin.module.css";

const DEPARTMENTS = ["HR", "Finance", "IT", "Sales", "Operations", "Support"];

const PAGE_SIZE = 5;

export default function AdminDashboard() {
  // -----------------------------
  // MOCK DATABASE
  // -----------------------------
  const [employees, setEmployees] = useState([
    { id: 1, name: "Adil Khan", dept: "HR", salary: 45000, photo: "" },
    { id: 2, name: "Salma Sheikh", dept: "Finance", salary: 55000, photo: "" },
    { id: 3, name: "Rahul Verma", dept: "IT", salary: 60000, photo: "" },
    { id: 4, name: "Vikram Patel", dept: "Sales", salary: 52000, photo: "" },
    { id: 5, name: "Sarah Khan", dept: "HR", salary: 48000, photo: "" },
    { id: 6, name: "Rohit Sharma", dept: "Operations", salary: 50000, photo: "" },
  ]);

  const [attendance, setAttendance] = useState([
    { id: 1, name: "Adil Khan", time: "09:42 AM", status: "Present" },
    { id: 2, name: "Salma Sheikh", time: "-", status: "Absent" },
    { id: 3, name: "Rahul Verma", time: "10:05 AM", status: "Present" },
  ]);

  const [pendingLeaves, setPendingLeaves] = useState([
    { id: 101, name: "Iram Fatima", type: "Sick Leave", dates: "12–14 Dec" },
    { id: 102, name: "Mohd Bilal", type: "Casual Leave", dates: "05 Dec" },
  ]);

  const [payroll, setPayroll] = useState([
    { id: 1, name: "Sameer Ali", month: "November", salary: 45000, status: "Paid" },
    { id: 2, name: "Ayesha Khan", month: "November", salary: 55000, status: "Pending" },
  ]);

  // -----------------------------
  // MODAL & FORM STATE
  // -----------------------------
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<any>(null);
  const [form, setForm] = useState({ name: "", dept: "", salary: "" });
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");

  const openAddModal = () => {
    setEditingEmployee(null);
    setForm({ name: "", dept: DEPARTMENTS[0], salary: "" });
    setPhotoFile(null);
    setPhotoPreview("");
    setShowModal(true);
  };

  const openEditModal = (emp: { id?: number; name: any; dept: any; salary: any; photo: any; }) => {
    setEditingEmployee(emp);
    setForm({
      name: emp.name,
      dept: emp.dept,
      salary: emp.salary,
    });
    setPhotoFile(null);
    setPhotoPreview(emp.photo || "");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingEmployee(null);
    setPhotoFile(null);
    setPhotoPreview("");
  };

  const handlePhotoChange = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    const url = URL.createObjectURL(file);
    setPhotoPreview(url);
  };

  // -----------------------------
  // TOAST
  // -----------------------------
  const [toast, setToast] = useState("");
  const showToast = (msg: SetStateAction<string>) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2200);
  };

  // -----------------------------
  // EMPLOYEE CRUD
  // -----------------------------
  const saveEmployee = () => {
    if (!form.name.trim() || !form.dept.trim() || !form.salary) {
      return showToast("All fields are required");
    }

    let finalPhoto = photoPreview;
    if (!finalPhoto && editingEmployee?.photo) {
      finalPhoto = editingEmployee.photo;
    }

    if (editingEmployee) {
      const updated = employees.map((e) =>
        e.id === editingEmployee.id
          ? { ...e, ...form, salary: Number(form.salary), photo: finalPhoto }
          : e
      );
      setEmployees(updated);
      showToast("Employee Updated");
    } else {
      const newEmp = {
        id: Date.now(),
        ...form,
        salary: Number(form.salary),
        photo: finalPhoto,
      };
      setEmployees([...employees, newEmp]);
      showToast("Employee Added");
    }

    closeModal();
  };

  const deleteEmployee = (id: number) => {
    setEmployees(employees.filter((e) => e.id !== id));
    showToast("Employee Deleted");
  };

  // -----------------------------
  // LEAVES / ATTENDANCE / PAYROLL
  // -----------------------------
  const approveLeave = (id: number) => {
    setPendingLeaves(pendingLeaves.filter((l) => l.id !== id));
    showToast("Leave Approved");
  };

  const rejectLeave = (id: number) => {
    setPendingLeaves(pendingLeaves.filter((l) => l.id !== id));
    showToast("Leave Rejected");
  };

  const markAllPresent = () => {
    const updated = attendance.map((a) => ({
      ...a,
      status: "Present",
      time: "09:00 AM",
    }));
    setAttendance(updated);
    showToast("All employees marked present");
  };

  const processPayroll = () => {
    const updated = payroll.map((p) => ({ ...p, status: "Paid" }));
    setPayroll(updated);
    showToast("Payroll Processed");
  };

  // -----------------------------
  // SALARY SLIP (PDF)
  // -----------------------------
  const generateSalarySlip = (p: { id?: number; name: any; month: any; salary: any; status: any; }) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Salary Slip", 20, 20);

    doc.setFontSize(12);
    doc.text(`Employee Name: ${p.name}`, 20, 40);
    doc.text(`Month: ${p.month}`, 20, 50);
    doc.text(`Salary: ₹${p.salary.toLocaleString()}`, 20, 60);
    doc.text(`Status: ${p.status}`, 20, 70);
    doc.text(`Generated On: ${new Date().toLocaleDateString()}`, 20, 80);

    doc.line(20, 85, 190, 85);
    doc.text("This is a system generated salary slip.", 20, 95);

    doc.save(`salary-slip-${p.name}-${p.month}.pdf`);
    showToast("Salary slip downloaded");
  };

  // -----------------------------
  // STATS
  // -----------------------------
  const stats = {
    totalEmployees: employees.length,
    presentToday: attendance.filter((a) => a.status === "Present").length,
    pendingLeaves: pendingLeaves.length,
    monthlySalary:
      "₹" +
      employees.reduce((acc, e) => acc + e.salary, 0).toLocaleString(),
  };

  // -----------------------------
  // SEARCH / FILTER / SORT / PAGINATION
  // -----------------------------
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDept, setFilterDept] = useState("All");
  const [sortField, setSortField] = useState("name"); // name | salary
  const [sortDir, setSortDir] = useState("asc"); // asc | desc
  const [currentPage, setCurrentPage] = useState(1);

  const handleSortChange = (field: SetStateAction<string>) => {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const filteredSortedEmployees = useMemo(() => {
    let list = [...employees];

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter((e) => e.name.toLowerCase().includes(q));
    }

    if (filterDept !== "All") {
      list = list.filter((e) => e.dept === filterDept);
    }

    list.sort((a, b) => {
      if (sortField === "name") {
        return sortDir === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else {
        // salary
        return sortDir === "asc" ? a.salary - b.salary : b.salary - a.salary;
      }
    });

    return list;
  }, [employees, searchTerm, filterDept, sortField, sortDir]);

  const totalPages = Math.ceil(filteredSortedEmployees.length / PAGE_SIZE) || 1;

  const paginatedEmployees = filteredSortedEmployees.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const changePage = (newPage:any) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  // reset page when filters change
  const onSearchChange = (val: SetStateAction<string>) => {
    setSearchTerm(val);
    setCurrentPage(1);
  };
  const onFilterDeptChange = (val: SetStateAction<string>) => {
    setFilterDept(val);
    setCurrentPage(1);
  };

  // -----------------------------
  // CHART DATA
  // -----------------------------
  const attendanceTrend = [
    { day: "Mon", present: 90, absent: 10 },
    { day: "Tue", present: 95, absent: 5 },
    { day: "Wed", present: 88, absent: 12 },
    { day: "Thu", present: 92, absent: 8 },
    { day: "Fri", present: 94, absent: 6 },
  ];

  const payrollTrend = [
    { month: "Jan", payout: 780000 },
    { month: "Feb", payout: 800000 },
    { month: "Mar", payout: 820000 },
    { month: "Apr", payout: 810000 },
    { month: "May", payout: 830000 },
  ];

  return (
    <div className={styles.container}>
      <h2>Admin Dashboard</h2>

      {/* TOAST */}
      {toast && <div className={styles.toast}>{toast}</div>}

      {/* MODAL */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>{editingEmployee ? "Edit Employee" : "Add Employee"}</h3>

            <label>Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <label>Department</label>
            <select
              value={form.dept}
              onChange={(e) => setForm({ ...form, dept: e.target.value })}
              className={styles.select}
            >
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>

            <label>Salary</label>
            <input
              type="number"
              value={form.salary}
              onChange={(e) => setForm({ ...form, salary: e.target.value })}
            />

            <label>Photo</label>
            <input type="file" accept="image/*" onChange={handlePhotoChange} />
            {photoPreview && (
              <div className={styles.photoPreviewWrapper}>
                <img
                  src={photoPreview}
                  alt="preview"
                  className={styles.photoPreview}
                />
              </div>
            )}

            <div className={styles.modalActions}>
              <button className={styles.saveBtn} onClick={saveEmployee}>
                Save
              </button>
              <button className={styles.cancelBtn} onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOP STATS */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h4>Total Employees</h4>
          <p>{stats.totalEmployees}</p>
        </div>
        <div className={styles.statCard}>
          <h4>Present Today</h4>
          <p>{stats.presentToday}</p>
        </div>
        <div className={styles.statCard}>
          <h4>Pending Leaves</h4>
          <p>{stats.pendingLeaves}</p>
        </div>
        <div className={styles.statCard}>
          <h4>Monthly Salary Cost</h4>
          <p>{stats.monthlySalary}</p>
        </div>
      </div>

      {/* CHARTS */}
      <div className={styles.chartsGrid}>
        <div className={styles.chartCard}>
          <h3>Attendance Trend</h3>
          <div className={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={attendanceTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="present" stroke="#2f54eb" />
                <Line type="monotone" dataKey="absent" stroke="#ff4d4f" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={styles.chartCard}>
          <h3>Payroll Trend</h3>
          <div className={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={payrollTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="payout" fill="#2f54eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* EMPLOYEE MANAGEMENT */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3>Employee Management</h3>

          <div className={styles.controlsRow}>
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className={styles.searchInput}
            />

            <select
              value={filterDept}
              onChange={(e) => onFilterDeptChange(e.target.value)}
              className={styles.select}
            >
              <option value="All">All Departments</option>
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>

            <button
              className={styles.sortBtn}
              onClick={() => handleSortChange("name")}
            >
              Sort Name {sortField === "name" ? (sortDir === "asc" ? "↑" : "↓") : ""}
            </button>

            <button
              className={styles.sortBtn}
              onClick={() => handleSortChange("salary")}
            >
              Sort Salary {sortField === "salary" ? (sortDir === "asc" ? "↑" : "↓") : ""}
            </button>
          </div>
        </div>

        {paginatedEmployees.map((e) => (
          <div key={e.id} className={styles.listRow}>
            <div className={styles.employeeInfo}>
              {e.photo ? (
                <img src={e.photo} alt={e.name} className={styles.avatar} />
              ) : (
                <div className={styles.avatarPlaceholder}>
                  {e.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </div>
              )}

              <div>
                <b>{e.name}</b> — {e.dept}
                <br />
                <small>Salary: ₹{e.salary.toLocaleString()}</small>
              </div>
            </div>

            <div>
              <button
                className={styles.approveBtn}
                onClick={() => openEditModal(e)}
              >
                Edit
              </button>
              <button
                className={styles.rejectBtn}
                onClick={() => deleteEmployee(e.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {/* PAGINATION */}
        <div className={styles.pagination}>
          <button
            className={styles.pageBtn}
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          <span className={styles.pageInfo}>
            Page {currentPage} of {totalPages}
          </span>

          <button
            className={styles.pageBtn}
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {/* LEAVES */}
      <div className={styles.section}>
        <h3>Pending Leave Requests</h3>
        {pendingLeaves.map((l) => (
          <div key={l.id} className={styles.listRow}>
            <div>
              <b>{l.name}</b> — {l.type}
              <br />
              <small>{l.dates}</small>
            </div>

            <div>
              <button
                className={styles.approveBtn}
                onClick={() => approveLeave(l.id)}
              >
                Approve
              </button>
              <button
                className={styles.rejectBtn}
                onClick={() => rejectLeave(l.id)}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PAYROLL */}
      <div className={styles.section}>
        <h3>Payroll Summary</h3>

        {payroll.map((p) => (
          <div key={p.id} className={styles.listRow}>
            <div>
              <b>{p.name}</b> — {p.month}
              <br />
              <small>₹{p.salary.toLocaleString()}</small>
            </div>

            <div className={styles.payrollActions}>
              <span
                className={
                  p.status === "Paid" ? styles.paidBadge : styles.pendingBadge
                }
              >
                {p.status}
              </span>
              <button
                className={styles.salarySlipBtn}
                onClick={() => generateSalarySlip(p)}
              >
                Salary Slip
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* QUICK ACTIONS */}
      <div className={styles.quickActions}>
        <button className={styles.actionBtn} onClick={markAllPresent}>
          ✔ Mark All Present
        </button>

        <button className={styles.actionBtn} onClick={openAddModal}>
          ➕ Add Employee
        </button>

        <button className={styles.actionBtn} onClick={processPayroll}>
          💰 Process Payroll
        </button>
      </div>
    </div>
  );
}
