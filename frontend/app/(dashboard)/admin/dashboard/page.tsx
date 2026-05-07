// "use client";

// import { useState, useMemo, SetStateAction } from "react";
// import { jsPDF } from "jspdf";
// import {
//   LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip,
//   BarChart, Bar, Legend, ResponsiveContainer,
// } from "recharts";
// import {
//   Users, UserCheck, CalendarX, DollarSign,
//   Plus, CheckSquare, Banknote, Pencil, Trash2,
//   ChevronLeft, ChevronRight, X, Download, TrendingUp,
// } from "lucide-react";

// const DEPARTMENTS = ["HR", "Finance", "IT", "Sales", "Operations", "Support"];
// const PAGE_SIZE = 5;

// /* ── shared token ── */
// const T = {
//   bg:      "#080b12",
//   surface: "#0f1117",
//   border:  "#1e2130",
//   muted:   "#6b7280",
//   text:    "#f1f5f9",
//   subtext: "#94a3b8",
//   purple:  "#8b5cf6",
//   purpleL: "#a78bfa",
//   green:   "#22c55e",
//   amber:   "#f59e0b",
//   red:     "#ef4444",
//   blue:    "#3b82f6",
// };

// /* ── tiny helpers ── */
// const card: React.CSSProperties = {
//   background: T.surface, border: `1px solid ${T.border}`, borderRadius: 16,
//   padding: "20px 22px",
// };

// const pill = (color: string): React.CSSProperties => ({
//   display: "inline-flex", alignItems: "center", gap: 6,
//   background: color + "22", color, borderRadius: 99,
//   padding: "4px 12px", fontSize: 12, fontWeight: 600,
// });

// const btn = (bg: string, color = "#fff"): React.CSSProperties => ({
//   background: bg, color, border: "none", borderRadius: 10,
//   padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer",
//   display: "inline-flex", alignItems: "center", gap: 6,
//   fontFamily: "'DM Sans', sans-serif", transition: "opacity .15s",
// });

// /* ─────────────────────────────────────────── */
// export default function AdminDashboard() {

//   /* ── MOCK DATA ── */
//   const [employees, setEmployees] = useState([
//     { id: 1, name: "Adil Khan",     dept: "HR",         salary: 45000, photo: "" },
//     { id: 2, name: "Salma Sheikh",  dept: "Finance",    salary: 55000, photo: "" },
//     { id: 3, name: "Rahul Verma",   dept: "IT",         salary: 60000, photo: "" },
//     { id: 4, name: "Vikram Patel",  dept: "Sales",      salary: 52000, photo: "" },
//     { id: 5, name: "Sarah Khan",    dept: "HR",         salary: 48000, photo: "" },
//     { id: 6, name: "Rohit Sharma",  dept: "Operations", salary: 50000, photo: "" },
//   ]);

//   const [attendance, setAttendance] = useState([
//     { id: 1, name: "Adil Khan",    time: "09:42 AM", status: "Present" },
//     { id: 2, name: "Salma Sheikh", time: "-",        status: "Absent"  },
//     { id: 3, name: "Rahul Verma",  time: "10:05 AM", status: "Present" },
//   ]);

//   const [pendingLeaves, setPendingLeaves] = useState([
//     { id: 101, name: "Iram Fatima", type: "Sick Leave",   dates: "12–14 Dec" },
//     { id: 102, name: "Mohd Bilal",  type: "Casual Leave", dates: "05 Dec"    },
//   ]);

//   const [payroll, setPayroll] = useState([
//     { id: 1, name: "Sameer Ali",   month: "November", salary: 45000, status: "Paid"    },
//     { id: 2, name: "Ayesha Khan",  month: "November", salary: 55000, status: "Pending" },
//   ]);

//   /* ── MODAL ── */
//   const [showModal, setShowModal] = useState(false);
//   const [editingEmployee, setEditingEmployee] = useState<any>(null);
//   const [form, setForm] = useState({ name: "", dept: "", salary: "" });
//   const [photoPreview, setPhotoPreview] = useState("");

//   const openAddModal = () => {
//     setEditingEmployee(null);
//     setForm({ name: "", dept: DEPARTMENTS[0], salary: "" });
//     setPhotoPreview("");
//     setShowModal(true);
//   };
//   const openEditModal = (emp: any) => {
//     setEditingEmployee(emp);
//     setForm({ name: emp.name, dept: emp.dept, salary: emp.salary });
//     setPhotoPreview(emp.photo || "");
//     setShowModal(true);
//   };
//   const closeModal = () => { setShowModal(false); setEditingEmployee(null); setPhotoPreview(""); };

//   const handlePhotoChange = (e: any) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setPhotoPreview(URL.createObjectURL(file));
//   };

//   /* ── TOAST ── */
//   const [toast, setToast] = useState("");
//   const showToast = (msg: SetStateAction<string>) => {
//     setToast(msg); setTimeout(() => setToast(""), 2200);
//   };

//   /* ── CRUD ── */
//   const saveEmployee = () => {
//     if (!form.name.trim() || !form.dept.trim() || !form.salary) return showToast("All fields required");
//     if (editingEmployee) {
//       setEmployees(employees.map(e =>
//         e.id === editingEmployee.id ? { ...e, ...form, salary: Number(form.salary), photo: photoPreview } : e
//       ));
//       showToast("Employee Updated");
//     } else {
//       setEmployees([...employees, { id: Date.now(), ...form, salary: Number(form.salary), photo: photoPreview }]);
//       showToast("Employee Added");
//     }
//     closeModal();
//   };
//   const deleteEmployee = (id: number) => { setEmployees(employees.filter(e => e.id !== id)); showToast("Employee Deleted"); };
//   const approveLeave   = (id: number) => { setPendingLeaves(pendingLeaves.filter(l => l.id !== id)); showToast("Leave Approved"); };
//   const rejectLeave    = (id: number) => { setPendingLeaves(pendingLeaves.filter(l => l.id !== id)); showToast("Leave Rejected"); };
//   const markAllPresent = () => { setAttendance(attendance.map(a => ({ ...a, status: "Present", time: "09:00 AM" }))); showToast("All marked present"); };
//   const processPayroll = () => { setPayroll(payroll.map(p => ({ ...p, status: "Paid" }))); showToast("Payroll Processed"); };

//   /* ── PDF ── */
//   const generateSalarySlip = (p: any) => {
//     const doc = new jsPDF();
//     doc.setFontSize(18); doc.text("Salary Slip", 20, 20);
//     doc.setFontSize(12);
//     doc.text(`Employee: ${p.name}`, 20, 40);
//     doc.text(`Month: ${p.month}`, 20, 50);
//     doc.text(`Salary: ₹${p.salary.toLocaleString()}`, 20, 60);
//     doc.text(`Status: ${p.status}`, 20, 70);
//     doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 80);
//     doc.line(20, 85, 190, 85);
//     doc.text("System generated salary slip.", 20, 95);
//     doc.save(`salary-slip-${p.name}-${p.month}.pdf`);
//     showToast("Salary slip downloaded");
//   };

//   /* ── STATS ── */
//   const stats = [
//     { label: "Total Employees",    value: employees.length,                                                     icon: Users,      color: T.blue   },
//     { label: "Present Today",      value: attendance.filter(a => a.status === "Present").length,                icon: UserCheck,  color: T.green  },
//     { label: "Pending Leaves",     value: pendingLeaves.length,                                                 icon: CalendarX,  color: T.amber  },
//     { label: "Monthly Salary Cost",value: "₹" + employees.reduce((a, e) => a + e.salary, 0).toLocaleString(),  icon: DollarSign, color: T.purple },
//   ];

//   /* ── SEARCH / FILTER / SORT / PAGINATION ── */
//   const [searchTerm,  setSearchTerm]  = useState("");
//   const [filterDept,  setFilterDept]  = useState("All");
//   const [sortField,   setSortField]   = useState("name");
//   const [sortDir,     setSortDir]     = useState("asc");
//   const [currentPage, setCurrentPage] = useState(1);

//   const handleSortChange = (field: SetStateAction<string>) => {
//     if (sortField === field) setSortDir(d => d === "asc" ? "desc" : "asc");
//     else { setSortField(field); setSortDir("asc"); }
//   };

//   const filteredSortedEmployees = useMemo(() => {
//     let list = [...employees];
//     if (searchTerm.trim()) list = list.filter(e => e.name.toLowerCase().includes(searchTerm.toLowerCase()));
//     if (filterDept !== "All") list = list.filter(e => e.dept === filterDept);
//     list.sort((a, b) => sortField === "name"
//       ? (sortDir === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name))
//       : (sortDir === "asc" ? a.salary - b.salary : b.salary - a.salary)
//     );
//     return list;
//   }, [employees, searchTerm, filterDept, sortField, sortDir]);

//   const totalPages         = Math.ceil(filteredSortedEmployees.length / PAGE_SIZE) || 1;
//   const paginatedEmployees = filteredSortedEmployees.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
//   const changePage = (p: number) => { if (p >= 1 && p <= totalPages) setCurrentPage(p); };

//   /* ── CHART DATA ── */
//   const attendanceTrend = [
//     { day: "Mon", present: 90, absent: 10 },
//     { day: "Tue", present: 95, absent: 5  },
//     { day: "Wed", present: 88, absent: 12 },
//     { day: "Thu", present: 92, absent: 8  },
//     { day: "Fri", present: 94, absent: 6  },
//   ];
//   const payrollTrend = [
//     { month: "Jan", payout: 780000 },
//     { month: "Feb", payout: 800000 },
//     { month: "Mar", payout: 820000 },
//     { month: "Apr", payout: 810000 },
//     { month: "May", payout: 830000 },
//   ];

//   /* ─── initials helper ─── */
//   const initials = (name: string) => name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

//   /* ─────────────── RENDER ─────────────── */
//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap');
//         *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

//         .adm { background: ${T.bg}; min-height: 100vh; padding: 32px 36px; font-family: 'DM Sans', sans-serif; color: ${T.text}; }

//         /* toast */
//         .adm-toast {
//           position: fixed; bottom: 28px; right: 28px; z-index: 9999;
//           background: #1a1f2e; border: 1px solid ${T.border}; border-left: 3px solid ${T.purple};
//           color: ${T.text}; padding: 12px 22px; border-radius: 12px; font-size: 14px; font-weight: 500;
//           animation: slideUp .25s ease;
//         }
//         @keyframes slideUp { from { transform: translateY(12px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

//         /* modal */
//         .adm-overlay {
//           position: fixed; inset: 0; background: rgba(0,0,0,.7); z-index: 1000;
//           display: flex; align-items: center; justify-content: center;
//         }
//         .adm-modal {
//           background: ${T.surface}; border: 1px solid ${T.border}; border-radius: 20px;
//           padding: 28px 30px; width: 420px; max-width: 95vw;
//         }
//         .adm-modal h3 { font-family: 'DM Serif Display', serif; font-size: 20px; color: ${T.text}; margin-bottom: 20px; }
//         .adm-modal label { display: block; font-size: 12px; font-weight: 600; color: ${T.muted}; margin-bottom: 5px; margin-top: 14px; text-transform: uppercase; letter-spacing: .5px; }
//         .adm-modal input, .adm-modal select {
//           width: 100%; background: ${T.bg}; border: 1px solid ${T.border}; border-radius: 10px;
//           color: ${T.text}; padding: 10px 14px; font-size: 14px; font-family: 'DM Sans', sans-serif;
//           outline: none; transition: border-color .2s;
//         }
//         .adm-modal input:focus, .adm-modal select:focus { border-color: ${T.purple}; }
//         .adm-modal select option { background: ${T.surface}; }
//         .adm-modal-actions { display: flex; gap: 10px; margin-top: 22px; }

//         /* section */
//         .adm-section { background: ${T.surface}; border: 1px solid ${T.border}; border-radius: 16px; padding: 22px 24px; margin-bottom: 24px; }
//         .adm-section-title { font-family: 'DM Serif Display', serif; font-size: 18px; color: ${T.text}; margin-bottom: 18px; }

//         /* list rows */
//         .adm-list-row {
//           display: flex; align-items: center; justify-content: space-between;
//           padding: 14px 16px; background: ${T.bg}; border: 1px solid ${T.border};
//           border-radius: 12px; margin-bottom: 10px; gap: 12px;
//         }
//         .adm-list-row:last-child { margin-bottom: 0; }

//         /* employee avatar */
//         .adm-avatar {
//           width: 40px; height: 40px; border-radius: 10px; flex-shrink: 0;
//           display: flex; align-items: center; justify-content: center;
//           font-size: 14px; font-weight: 700; color: #fff;
//           background: linear-gradient(135deg, ${T.purple}99, ${T.purple}55);
//         }

//         /* controls */
//         .adm-controls { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 18px; }
//         .adm-search {
//           background: ${T.bg}; border: 1px solid ${T.border}; border-radius: 10px;
//           color: ${T.text}; padding: 9px 14px; font-size: 13px; font-family: 'DM Sans', sans-serif;
//           outline: none; flex: 1; min-width: 160px;
//         }
//         .adm-search:focus { border-color: ${T.purple}; }
//         .adm-select {
//           background: ${T.bg}; border: 1px solid ${T.border}; border-radius: 10px;
//           color: ${T.subtext}; padding: 9px 14px; font-size: 13px; font-family: 'DM Sans', sans-serif;
//           outline: none; cursor: pointer;
//         }
//         .adm-select option { background: ${T.surface}; }
//         .adm-sort-btn {
//           background: ${T.bg}; border: 1px solid ${T.border}; border-radius: 10px;
//           color: ${T.subtext}; padding: 9px 14px; font-size: 13px; font-family: 'DM Sans', sans-serif;
//           cursor: pointer; transition: all .15s;
//         }
//         .adm-sort-btn:hover { border-color: ${T.purple}; color: ${T.purpleL}; }

//         /* pagination */
//         .adm-pagination { display: flex; align-items: center; justify-content: flex-end; gap: 10px; margin-top: 16px; }
//         .adm-page-btn {
//           background: ${T.bg}; border: 1px solid ${T.border}; border-radius: 8px;
//           color: ${T.subtext}; padding: 6px 12px; cursor: pointer; font-family: 'DM Sans', sans-serif;
//           transition: all .15s; display: flex; align-items: center;
//         }
//         .adm-page-btn:hover:not(:disabled) { border-color: ${T.purple}; color: ${T.purpleL}; }
//         .adm-page-btn:disabled { opacity: .35; cursor: not-allowed; }
//         .adm-page-info { color: ${T.muted}; font-size: 13px; }

//         /* charts */
//         .adm-charts { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px; }
//         @media (max-width: 860px) { .adm-charts { grid-template-columns: 1fr; } }

//         /* quick actions */
//         .adm-quick { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 4px; }

//         /* photo preview */
//         .adm-photo-preview { width: 72px; height: 72px; border-radius: 12px; object-fit: cover; margin-top: 10px; border: 2px solid ${T.border}; }

//         /* recharts dark theme overrides */
//         .recharts-cartesian-grid line { stroke: ${T.border} !important; }
//         .recharts-text { fill: ${T.muted} !important; font-family: 'DM Sans', sans-serif !important; font-size: 12px !important; }
//         .recharts-tooltip-wrapper .recharts-default-tooltip { background: ${T.surface} !important; border-color: ${T.border} !important; border-radius: 10px !important; }
//       `}</style>

//       <div className="adm">

//         {/* ── Header ── */}
//         <div style={{ marginBottom: 32 }}>
//           <p style={{ color: T.muted, fontSize: 13 }}>Thursday, May 7, 2025</p>
//           <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, color: T.text, marginTop: 4 }}>
//             Admin Dashboard
//           </h2>
//         </div>

//         {/* ── Toast ── */}
//         {toast && <div className="adm-toast">{toast}</div>}

//         {/* ── Modal ── */}
//         {showModal && (
//           <div className="adm-overlay">
//             <div className="adm-modal">
//               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
//                 <h3 style={{ margin: 0 }}>{editingEmployee ? "Edit Employee" : "Add Employee"}</h3>
//                 <button onClick={closeModal} style={{ background: "none", border: "none", color: T.muted, cursor: "pointer" }}>
//                   <X size={20} />
//                 </button>
//               </div>

//               <label>Name</label>
//               <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Full name" />

//               <label>Department</label>
//               <select value={form.dept} onChange={e => setForm({ ...form, dept: e.target.value })} className="adm-select" style={{ width: "100%" }}>
//                 {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
//               </select>

//               <label>Salary</label>
//               <input type="number" value={form.salary} onChange={e => setForm({ ...form, salary: e.target.value })} placeholder="Monthly salary" />

//               <label>Photo</label>
//               <input type="file" accept="image/*" onChange={handlePhotoChange} style={{ color: T.subtext }} />
//               {photoPreview && <img src={photoPreview} alt="preview" className="adm-photo-preview" />}

//               <div className="adm-modal-actions">
//                 <button style={btn("linear-gradient(135deg,#6366f1,#8b5cf6)")} onClick={saveEmployee}>Save</button>
//                 <button style={btn(T.bg, T.muted)} onClick={closeModal}>Cancel</button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* ── Stats ── */}
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20, marginBottom: 28 }}>
//           {stats.map(s => (
//             <div key={s.label} style={{ ...card, position: "relative", overflow: "hidden" }}>
//               <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, borderRadius: "50%", background: s.color + "22", filter: "blur(18px)" }} />
//               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
//                 <div>
//                   <p style={{ color: T.muted, fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".5px" }}>{s.label}</p>
//                   <h3 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 30, color: T.text, marginTop: 6 }}>{s.value}</h3>
//                 </div>
//                 <div style={{ width: 42, height: 42, borderRadius: 12, background: s.color + "22", display: "flex", alignItems: "center", justifyContent: "center" }}>
//                   <s.icon size={20} color={s.color} />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* ── Charts ── */}
//         <div className="adm-charts">
//           <div style={card}>
//             <h3 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 17, color: T.text, marginBottom: 18, display: "flex", alignItems: "center", gap: 8 }}>
//               <TrendingUp size={18} color={T.blue} /> Attendance Trend
//             </h3>
//             <ResponsiveContainer width="100%" height={210}>
//               <LineChart data={attendanceTrend}>
//                 <CartesianGrid strokeDasharray="3 3" stroke={T.border} />
//                 <XAxis dataKey="day" stroke={T.muted} />
//                 <YAxis stroke={T.muted} />
//                 <Tooltip contentStyle={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 10, color: T.text }} />
//                 <Legend />
//                 <Line type="monotone" dataKey="present" stroke={T.blue}  strokeWidth={2} dot={{ fill: T.blue,  r: 4 }} />
//                 <Line type="monotone" dataKey="absent"  stroke={T.red}   strokeWidth={2} dot={{ fill: T.red,   r: 4 }} />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>

//           <div style={card}>
//             <h3 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 17, color: T.text, marginBottom: 18, display: "flex", alignItems: "center", gap: 8 }}>
//               <Banknote size={18} color={T.purple} /> Payroll Trend
//             </h3>
//             <ResponsiveContainer width="100%" height={210}>
//               <BarChart data={payrollTrend}>
//                 <CartesianGrid strokeDasharray="3 3" stroke={T.border} />
//                 <XAxis dataKey="month" stroke={T.muted} />
//                 <YAxis stroke={T.muted} />
//                 <Tooltip contentStyle={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 10, color: T.text }} />
//                 <Legend />
//                 <Bar dataKey="payout" fill={T.purple} radius={[6, 6, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* ── Employee Management ── */}
//         <div className="adm-section" style={{ marginBottom: 24 }}>
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, flexWrap: "wrap", gap: 12 }}>
//             <h3 className="adm-section-title" style={{ margin: 0 }}>Employee Management</h3>
//             <button style={btn("linear-gradient(135deg,#6366f1,#8b5cf6)")} onClick={openAddModal}>
//               <Plus size={15} /> Add Employee
//             </button>
//           </div>

//           <div className="adm-controls">
//             <input className="adm-search" placeholder="Search by name…" value={searchTerm} onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }} />
//             <select className="adm-select" value={filterDept} onChange={e => { setFilterDept(e.target.value); setCurrentPage(1); }}>
//               <option value="All">All Departments</option>
//               {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
//             </select>
//             <button className="adm-sort-btn" onClick={() => handleSortChange("name")}>
//               Name {sortField === "name" ? (sortDir === "asc" ? "↑" : "↓") : ""}
//             </button>
//             <button className="adm-sort-btn" onClick={() => handleSortChange("salary")}>
//               Salary {sortField === "salary" ? (sortDir === "asc" ? "↑" : "↓") : ""}
//             </button>
//           </div>

//           {paginatedEmployees.map(e => (
//             <div key={e.id} className="adm-list-row">
//               <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
//                 {e.photo
//                   ? <img src={e.photo} alt={e.name} style={{ width: 40, height: 40, borderRadius: 10, objectFit: "cover" }} />
//                   : <div className="adm-avatar">{initials(e.name)}</div>
//                 }
//                 <div>
//                   <p style={{ color: T.text, fontWeight: 600, fontSize: 14 }}>{e.name}</p>
//                   <p style={{ color: T.muted, fontSize: 12, marginTop: 2 }}>{e.dept} · ₹{e.salary.toLocaleString()}</p>
//                 </div>
//               </div>
//               <div style={{ display: "flex", gap: 8 }}>
//                 <button style={btn("#1e2130", T.purpleL)} onClick={() => openEditModal(e)}><Pencil size={13} /> Edit</button>
//                 <button style={btn(T.red + "22", T.red)}  onClick={() => deleteEmployee(e.id)}><Trash2 size={13} /> Delete</button>
//               </div>
//             </div>
//           ))}

//           <div className="adm-pagination">
//             <button className="adm-page-btn" onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}><ChevronLeft size={16} /></button>
//             <span className="adm-page-info">Page {currentPage} of {totalPages}</span>
//             <button className="adm-page-btn" onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages}><ChevronRight size={16} /></button>
//           </div>
//         </div>

//         {/* ── Pending Leaves ── */}
//         <div className="adm-section" style={{ marginBottom: 24 }}>
//           <h3 className="adm-section-title">Pending Leave Requests</h3>
//           {pendingLeaves.length === 0
//             ? <p style={{ color: T.muted, fontSize: 14 }}>No pending requests.</p>
//             : pendingLeaves.map(l => (
//               <div key={l.id} className="adm-list-row">
//                 <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
//                   <div className="adm-avatar" style={{ background: `linear-gradient(135deg,${T.amber}99,${T.amber}44)` }}>
//                     {initials(l.name)}
//                   </div>
//                   <div>
//                     <p style={{ color: T.text, fontWeight: 600, fontSize: 14 }}>{l.name}</p>
//                     <p style={{ color: T.muted, fontSize: 12, marginTop: 2 }}>{l.type} · {l.dates}</p>
//                   </div>
//                 </div>
//                 <div style={{ display: "flex", gap: 8 }}>
//                   <button style={btn(T.green + "22", T.green)} onClick={() => approveLeave(l.id)}>Approve</button>
//                   <button style={btn(T.red + "22", T.red)}    onClick={() => rejectLeave(l.id)}>Reject</button>
//                 </div>
//               </div>
//             ))
//           }
//         </div>

//         {/* ── Payroll ── */}
//         <div className="adm-section" style={{ marginBottom: 24 }}>
//           <h3 className="adm-section-title">Payroll Summary</h3>
//           {payroll.map(p => (
//             <div key={p.id} className="adm-list-row">
//               <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
//                 <div className="adm-avatar" style={{ background: `linear-gradient(135deg,${T.purple}99,${T.purple}44)` }}>
//                   {initials(p.name)}
//                 </div>
//                 <div>
//                   <p style={{ color: T.text, fontWeight: 600, fontSize: 14 }}>{p.name}</p>
//                   <p style={{ color: T.muted, fontSize: 12, marginTop: 2 }}>{p.month} · ₹{p.salary.toLocaleString()}</p>
//                 </div>
//               </div>
//               <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//                 <span style={pill(p.status === "Paid" ? T.green : T.amber)}>
//                   {p.status}
//                 </span>
//                 <button style={btn("#1e2130", T.subtext)} onClick={() => generateSalarySlip(p)}>
//                   <Download size={13} /> Slip
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* ── Quick Actions ── */}
//         <div className="adm-quick">
//           <button style={btn("linear-gradient(135deg,#065f4699,#022c2299)", T.green)} onClick={markAllPresent}>
//             <CheckSquare size={15} /> Mark All Present
//           </button>
//           <button style={btn("linear-gradient(135deg,#6366f1,#8b5cf6)")} onClick={openAddModal}>
//             <Plus size={15} /> Add Employee
//           </button>
//           <button style={btn("linear-gradient(135deg,#78350f99,#45220099)", T.amber)} onClick={processPayroll}>
//             <Banknote size={15} /> Process Payroll
//           </button>
//         </div>

//       </div>
//     </>
//   );
// }



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
      <div className="d-flex flex-right">
        <h2>Dashboard</h2>
      </div>
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
              Sort Name{" "}
              {sortField === "name" ? (sortDir === "asc" ? "↑" : "↓") : ""}
            </button>

            <button
              className={styles.sortBtn}
              onClick={() => handleSortChange("salary")}
            >
              Sort Salary{" "}
              {sortField === "salary" ? (sortDir === "asc" ? "↑" : "↓") : ""}
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
