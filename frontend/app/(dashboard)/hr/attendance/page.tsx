"use client";

import { useState, useMemo, useEffect } from "react";
import styles from "./hrAttendance.module.css";

// ---- Dummy employees ----
const EMPLOYEES = [
  { id: "E1", name: "John Doe", department: "IT" },
  { id: "E2", name: "Sarah Khan", department: "HR" },
  { id: "E3", name: "Rohit Sharma", department: "Finance" },
  { id: "E4", name: "Ayesha Ali", department: "Marketing" },
  { id: "E5", name: "Vikram Patel", department: "Sales" },
];

// ---- Dummy attendance generator ----
function generateDummy() {
  const arr:any = [];
  const today = new Date();

  EMPLOYEES.forEach((emp) => {
    for (let i = 0; i < 25; i++) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];

      const statuses = ["Present", "Late", "Leave", "Absent"];
      const status = statuses[Math.floor(Math.random() * statuses.length)];

      arr.push({
        id: Math.random().toString(36).slice(2, 9),
        empId: emp.id,
        name: emp.name,
        department: emp.department,
        date: dateStr,
        status,
      });
    }
  });

  return arr;
}

const initialData = generateDummy();

export default function HrAttendance() {
  const [list] = useState(initialData);

  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("");
  const [date, setDate] = useState("");

  const [page, setPage] = useState(1);
  const size = 10;

  const [calendarView, setCalendarView] = useState<any>(false);
  const [heatmapView, setHeatmapView] = useState<any>(false);

  const [showTimeline, setShowTimeline] = useState<any>(false);
  const [timeline, setTimeline] = useState<any>([]);
  const [selected, setSelected] = useState<any>(null);

  const departments = [...new Set(EMPLOYEES.map((e) => e.department))];

  // ---- Filters ----
  const filtered = useMemo(() => {
    let data = [...list];

    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter((e) => e.name.toLowerCase().includes(q));
    }

    if (dept) data = data.filter((e) => e.department === dept);
    if (date) data = data.filter((e) => e.date === date);

    return data;
  }, [list, search, dept, date]);

  const totalPages = Math.ceil(filtered.length / size);
  const paged = useMemo(() => {
    const start = (page - 1) * size;
    return filtered.slice(start, start + size);
  }, [filtered, page]);

  // ---- Timeline ----
  function getTimeline(empId:any) {
    return list.filter((e:any) => e.empId === empId);
  }

  // ---- Excel Export ----
  function downloadExcel() {
    const rows = [["Name", "Department", "Date", "Status"]];
    filtered.forEach((e) => {
      rows.push([e.name, e.department, e.date, e.status]);
    });

    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "hr_attendance.csv";
    a.click();
  }

  // ---- Heatmap Data ----
  const heatmap:any = {};
  list.forEach((e:any) => {
    if (!heatmap[e.date]) heatmap[e.date] = 0;
    if (e.status === "Present") heatmap[e.date] += 1;
  });

  return (
    <div className={styles.container}>
      <h2>HR Attendance Overview</h2>

      {/* ACTION BAR */}
      <div className={styles.topActions}>
        <button
          className={styles.toggleBtn}
          onClick={() => {
            setCalendarView(!calendarView);
            setHeatmapView(false);
          }}
        >
          {calendarView ? "📄 Table" : "🗓 Calendar"}
        </button>

        <button
          className={styles.toggleBtn}
          onClick={() => {
            setHeatmapView(!heatmapView);
            setCalendarView(false);
          }}
        >
          {heatmapView ? "📄 Table" : "🔥 Heatmap"}
        </button>

        <button className={styles.excelBtn} onClick={downloadExcel}>
          ⬇ Export Excel
        </button>
      </div>

      {/* FILTERS (table mode only) */}
      {!calendarView && !heatmapView && (
        <div className={styles.filters}>
          <input
            placeholder="Search employee..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select value={dept} onChange={(e) => setDept(e.target.value)}>
            <option value="">All Departments</option>
            {departments.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>

          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
      )}

      {/* HEATMAP VIEW */}
      {heatmapView && (
        <div className={styles.heatmap}>
          {Object.keys(heatmap).map((d) => (
            <div
              key={d}
              className={styles.heatBlock}
              title={`${d} — ${heatmap[d]} Present`}
              style={{
                background:
                  heatmap[d] > 10
                    ? "#006c47"
                    : heatmap[d] > 5
                    ? "#52b788"
                    : heatmap[d] > 0
                    ? "#b7e4c7"
                    : "#eee",
              }}
            />
          ))}
        </div>
      )}

      {/* CALENDAR VIEW */}
      {calendarView && (
        <div className={styles.calendar}>
          {Object.keys(heatmap).map((date) => {
            const day = Number(date.split("-")[2]);
            return (
              <div key={date} className={styles.dayBox}>
                <strong>{day}</strong>
                <span>{heatmap[date]} Present</span>
              </div>
            );
          })}
        </div>
      )}

      {/* TABLE VIEW */}
      {!calendarView && !heatmapView && (
        <>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>Date</th>
                <th>Status</th>
                <th style={{ textAlign: "center" }}>Timeline</th>
              </tr>
            </thead>

            <tbody>
              {paged.map((e) => (
                <tr key={e.id}>
                  <td>{e.name}</td>
                  <td>{e.department}</td>
                  <td>{e.date}</td>

                  <td
                    className={
                      e.status === "Present"
                        ? styles.present
                        : e.status === "Absent"
                        ? styles.absent
                        : e.status === "Leave"
                        ? styles.leave
                        : styles.late
                    }
                  >
                    {e.status}
                  </td>

                  <td style={{ textAlign: "center" }}>
                    <button
                      className={styles.timelineBtn}
                      onClick={() => {
                        setTimeline(getTimeline(e.empId));
                        setSelected(e);
                        setShowTimeline(true);
                      }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* PAGINATION */}
          <div className={styles.pagination}>
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>
              Prev
            </button>

            <span className={styles.current}>{page}</span>

            <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
              Next
            </button>
          </div>
        </>
      )}

      {/* TIMELINE MODAL */}
      {showTimeline && (
        <div className={styles.modal}>
          <div className={styles.modalBox}>
            <h3>{selected?.name} — Timeline</h3>

            {timeline.map((t:any, i:any) => (
              <div key={i} className={styles.timelineRow}>
                <span>{t.date}</span>
                <b>{t.status}</b>
              </div>
            ))}

            <button className={styles.closeBtn} onClick={() => setShowTimeline(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
