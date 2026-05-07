"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./attendance.module.css";

const DEPARTMENTS = ["IT", "Human Resource", "Finance", "Marketing", "Sales"];

// INSERT PART 1: ADVANCED ATTENDANCE GENERATOR
function generateAdvancedAttendance() {
  const employees = [
    {
      id: "E1",
      name: "John Doe",
      department: "IT",
      pattern: { monthlyLeave: 1, usuallyLate: true },
    },
    {
      id: "E2",
      name: "Sarah Khan",
      department: "Human Resource",
      pattern: { monthlyLeave: 2, usuallyLate: false },
    },
    {
      id: "E3",
      name: "Rohit Sharma",
      department: "Finance",
      pattern: { monthlyLeave: 1, usuallyLate: false },
    },
    {
      id: "E4",
      name: "Ayesha Ali",
      department: "Marketing",
      pattern: { monthlyLeave: 3, usuallyLate: false },
    },
    {
      id: "E5",
      name: "Vikram Patel",
      department: "IT",
      pattern: { monthlyLeave: 1, usuallyLate: true },
    },
  ];

  const holidays = ["2025-02-10", "2025-02-20"];

  function randomTime(baseHour = 9, delay = 60) {
    const t = new Date();
    t.setHours(baseHour);
    t.setMinutes(Math.floor(Math.random() * delay));
    return t.toTimeString().slice(0, 5);
  }

  const data: {
    id: number;
    empId: string;
    name: string;
    department: string;
    date: string;
    status: string;
    inTime: string | null;
    outTime: string | null;
  }[] = [];
  let counter = 1;

  for (let i = 0; i < 30; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];

    const day = d.getDay();
    const isWeekend = day === 0 || day === 6;
    const isHoliday = holidays.includes(dateStr);

    employees.forEach((emp) => {
      let status = "Present";
      let inTime = null;
      let outTime = null;

      if (isWeekend || isHoliday) {
        status = "Holiday";
      } else {
        if (Math.random() < emp.pattern.monthlyLeave / 30) {
          status = "Leave";
        } else if (emp.pattern.usuallyLate && Math.random() < 0.25) {
          status = "Late";
        } else if (Math.random() < 0.05) {
          status = "Absent";
        }

        if (status === "Present" || status === "Late") {
          inTime = randomTime(status === "Late" ? 10 : 9);
          outTime = randomTime(17);
        }
      }

      data.push({
        id: counter++,
        empId: emp.id,
        name: emp.name,
        department: emp.department,
        date: dateStr,
        status,
        inTime,
        outTime,
      });
    });
  }

  return data;
}

// 👇 Replace static data with dynamic data
const initialData = generateAdvancedAttendance();

export default function AdminAttendance() {
  const [list, setList] = useState(initialData);

  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");

  const [dept, setDept] = useState("");
  const [date, setDate] = useState("");

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(6);

  const [sort, setSort] = useState("asc");

  const [calendarView, setCalendarView] = useState(false);
  const [heatmapView, setHeatmapView] = useState(false);

  const [showView, setShowView] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [showTimeline, setShowTimeline] = useState(false);
  const [timeline, setTimeline] = useState<any>([]);

  const [selected, setSelected] = useState<any>(null);

  /** ========================
   * 1️⃣ Debounce Search
   ========================== */
  useEffect(() => {
    const t = setTimeout(() => setDebounced(search.trim()), 250);
    return () => clearTimeout(t);
  }, [search]);

  /** ========================
   * 2️⃣ Filters + Sorting
   ========================== */
  const filtered = useMemo(() => {
    let data = [...list];

    if (debounced) {
      const q = debounced.toLowerCase();
      data = data.filter((e) => e.name.toLowerCase().includes(q));
    }

    if (dept) data = data.filter((e) => e.department === dept);
    if (date) data = data.filter((e) => e.date === date);

    data.sort((a, b) =>
      sort === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

    return data;
  }, [list, debounced, dept, date, sort]);

  /** ========================
   * 3️⃣ Pagination
   ========================== */
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / size));

  const paged = useMemo(() => {
    const start = (page - 1) * size;
    return filtered.slice(start, start + size);
  }, [filtered, page, size]);

  /** ========================
   * 4️⃣ Mark All Present
   ========================== */
  function markAllPresent() {
    const updated = list.map((e) => ({ ...e, status: "Present" }));
    setList(updated);
  }

  /** ========================
   * 5️⃣ Excel Export
   ========================== */
  function downloadExcel() {
    const rows = [
      ["Name", "Department", "Date", "Status"],
      ...list.map((e) => [e.name, e.department, e.date, e.status]),
    ];

    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "attendance.csv";
    a.click();
  }

  /** ========================
   * 6️⃣ Bulk Upload CSV
   ========================== */
  function handleUpload(e: any) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt: any) => {
      const lines = evt.target.result.split("\n");

      const newRows = lines.slice(1).map((line: any) => {
        const [name, department, date, status] = line.split(",");
        return {
          id: Math.random().toString(),
          name,
          department,
          date,
          status,
        };
      });

      setList((prev) => [...prev, ...newRows]);
    };

    reader.readAsText(file);
  }

  /** ========================
   * 7️⃣ Auto Highlight Late
   ========================== */
  const getRowClass = (status: any) =>
    status === "Late" ? styles.highlightLate : "";

  /** ========================
   * 8️⃣ Calendar View
   ========================== */
  // function generateCalendar(year, month) {
  //   const dateObj = new Date(year, month, 1);
  //   const days = [];

  //   while (dateObj.getMonth() === month) {
  //     const dayStr = dateObj.toISOString().split("T")[0];

  //     const presentCount = list.filter(
  //       (e) => e.date === dayStr && e.status === "Present"
  //     ).length;

  //     days.push({
  //       day: dateObj.getDate(),
  //       date: dayStr,
  //       present: presentCount,
  //     });

  //     dateObj.setDate(dateObj.getDate() + 1);
  //   }

  //   return days;
  // }

  // const calendarDays = generateCalendar(2025, 1);

  // /** ========================
  //  * 9️⃣ Heatmap View
  //  ========================== */
  // const heatmap = {};
  // list.forEach((e) => {
  //   if (!heatmap[e.date]) heatmap[e.date] = 0;
  //   if (e.status === "Present") heatmap[e.date] += 1;
  // });

  function generateCalendar() {
    const output = [];
    const start = new Date();
    start.setDate(start.getDate() - 29);

    for (let i = 0; i < 30; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);

      const dateStr = d.toISOString().split("T")[0];

      const presentCount = list.filter(
        (e) => e.date === dateStr && e.status === "Present"
      ).length;

      output.push({
        day: d.getDate(),
        date: dateStr,
        present: presentCount,
      });
    }
    return output;
  }

  const calendarDays = generateCalendar();

  // INSERT PART 3: HEATMAP DATA
  const heatmap: any = {};
  list.forEach((e) => {
    if (!heatmap[e.date]) heatmap[e.date] = 0;
    if (e.status === "Present") heatmap[e.date] += 1;
  });

  /** ========================
   * 🔟 Timeline
   ========================== */
  function getTimeline(empId: number) {
    return list.filter((e) => e.id === empId);
  }

  /** ========================
   * 1️⃣1️⃣ Edit Attendance
   ========================== */
  function updateStatus(newStatus: any) {
    const updated = list.map((e) =>
      e.id === selected.id ? { ...e, status: newStatus } : e
    );
    setList(updated);
    setShowEdit(false);
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h2>Admin Attendance</h2>

        <div className={styles.headerActions}>
          <button onClick={markAllPresent} className={styles.markAll}>
            ✔ Mark All Present
          </button>

          <button onClick={downloadExcel} className={styles.exportBtn}>
            ⬇ Export Excel
          </button>

          <label className={styles.uploadLabel}>
            📤 Upload CSV
            <input type="file" accept=".csv" onChange={handleUpload} />
          </label>

          <button
            className={styles.toggleBtn}
            onClick={() => {
              setCalendarView(!calendarView);
              setHeatmapView(false);
            }}
          >
            {calendarView ? "📄 Table View" : "🗓 Calendar"}
          </button>

          <button
            className={styles.toggleBtn}
            onClick={() => {
              setHeatmapView(!heatmapView);
              setCalendarView(false);
            }}
          >
            {heatmapView ? "📄 Table View" : "🔥 Heatmap"}
          </button>
        </div>
      </div>

      {/* Filters */}
      {!calendarView && !heatmapView && (
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

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <select
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
          >
            <option value="6">6 rows</option>
            <option value="10">10 rows</option>
            <option value="15">15 rows</option>
          </select>
        </div>
      )}

      {/* CALENDAR VIEW */}
      {calendarView && (
        <div className={styles.calendar}>
          {calendarDays.map((d) => (
            <div key={d.date} className={styles.dayBox}>
              <strong>{d.day}</strong>
              <span>{d.present} Present</span>
            </div>
          ))}
        </div>
      )}

      {/* HEATMAP VIEW */}
      {heatmapView && (
        <div className={styles.heatmap}>
          {Object.keys(heatmap).map((date) => (
            <div
              key={date}
              className={styles.heatBlock}
              title={`${date} — ${heatmap[date]} Present`}
              style={{
                background:
                  heatmap[date] > 15
                    ? "#006c47"
                    : heatmap[date] > 10
                    ? "#38a169"
                    : heatmap[date] > 5
                    ? "#9ae6b4"
                    : heatmap[date] > 0
                    ? "#c6f6d5"
                    : "#eee",
              }}
            />
          ))}
        </div>
      )}

      {/* TABLE VIEW */}
      {!calendarView && !heatmapView && (
        <>
          <table className={styles.table}>
            <thead>
              <tr>
                <th onClick={() => setSort(sort === "asc" ? "desc" : "asc")}>
                  Employee {sort === "asc" ? "↑" : "↓"}
                </th>
                <th>Department</th>
                <th>Date</th>
                {/* <th>Status</th>
                <th style={{ textAlign: "center" }}>Actions</th> */}
                <th>Status</th>
                <th>Punch In</th>
                <th>Punch Out</th>
                <th style={{ textAlign: "center" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {paged.map((item) => (
                <tr key={item.id} className={getRowClass(item.status)}>
                  <td>{item.name}</td>
                  <td>{item.department}</td>
                  <td>{item.date}</td>

                  <td
                    className={
                      item.status === "Present"
                        ? styles.present
                        : item.status === "Late"
                        ? styles.late
                        : item.status === "Leave"
                        ? styles.leave
                        : item.status === "Absent"
                        ? styles.absent
                        : styles.holiday
                    }
                  >
                    {item.status}
                  </td>
                  <td>{item.inTime || "-"}</td>
                  <td>{item.outTime || "-"}</td>
                  <td className={styles.actionBtns}>
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
                      className={styles.timelineBtn}
                      onClick={() => {
                        setSelected(item);
                        setTimeline(getTimeline(item.id));
                        setShowTimeline(true);
                      }}
                    >
                      Timeline
                    </button>

                    <button
                      className={styles.editBtn}
                      onClick={() => {
                        setSelected(item);
                        setShowEdit(true);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}

              {paged.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", padding: 20 }}>
                    No Records Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className={styles.pagination}>
            <button disabled={page === 1} onClick={() => setPage(1)}>
              {"<<"}
            </button>

            <button disabled={page === 1} onClick={() => setPage(page - 1)}>
              Prev
            </button>

            <span className={styles.current}>{page}</span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(totalPages)}
            >
              {">>"}
            </button>
          </div>
        </>
      )}

      {/* VIEW MODAL */}
      {showView && selected && (
        <div className={styles.modal}>
          <div className={styles.modalBox}>
            <h3>Attendance Details</h3>

            <p>
              <b>Name:</b> {selected.name}
            </p>
            <p>
              <b>Department:</b> {selected.department}
            </p>
            <p>
              <b>Date:</b> {selected.date}
            </p>
            <p>
              <b>Status:</b> {selected.status}
            </p>

            <button
              className={styles.closeBtn}
              onClick={() => setShowView(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {showEdit && selected && (
        <div className={styles.modal}>
          <div className={styles.modalBox}>
            <h3>Edit Attendance</h3>

            <div className={styles.editBtns}>
              <button
                onClick={() => updateStatus("Present")}
                className={styles.greenBtn}
              >
                Present
              </button>
              <button
                onClick={() => updateStatus("Absent")}
                className={styles.redBtn}
              >
                Absent
              </button>
              <button
                onClick={() => updateStatus("Leave")}
                className={styles.yellowBtn}
              >
                Leave
              </button>
              <button
                onClick={() => updateStatus("Late")}
                className={styles.orangeBtn}
              >
                Late
              </button>
            </div>

            <button
              className={styles.closeBtn}
              onClick={() => setShowEdit(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* TIMELINE MODAL */}
      {showTimeline && selected && (
        <div className={styles.modal}>
          <div className={styles.modalBox}>
            <h3>{selected.name} — Timeline</h3>

            {timeline.map((t: any, i: any) => (
              <div key={i} className={styles.timelineRow}>
                <span>{t.date}</span>
                <b>{t.status}</b>
              </div>
            ))}

            <button
              className={styles.closeBtn}
              onClick={() => setShowTimeline(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
