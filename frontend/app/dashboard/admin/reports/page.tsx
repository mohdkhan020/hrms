"use client";

import { useMemo, useState } from "react";
import { jsPDF } from "jspdf";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import styles from "./reports.module.css";

// Month & Department options (for filters)
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DEPARTMENTS = [
  "All Departments",
  "IT",
  "HR",
  "Finance",
  "Marketing",
  "Sales",
];

// Dummy analytics (replace later with real API data)
const attendanceStats = {
  totalWorkingDays: 22,
  avgAttendance: 87,
  latePercentage: 6,
  absentPercentage: 7,
};

const leaveStats = {
  totalLeaves: 58,
  sick: 20,
  casual: 25,
  earned: 13,
};

const payrollStats = {
  totalEmployees: 25,
  totalPayout: 835000,
  avgNetSalary: 33200,
};

const topPerformers = [
  { name: "John Doe", score: 95, department: "IT" },
  { name: "Sarah Khan", score: 92, department: "HR" },
  { name: "Rohit Sharma", score: 90, department: "Finance" },
];

// Department-wise attendance & leave dummy data
const departmentSummary = [
  {
    department: "IT",
    headcount: 8,
    avgAttendance: 90,
    avgLeaves: 1.2,
  },
  {
    department: "HR",
    headcount: 4,
    avgAttendance: 88,
    avgLeaves: 1.4,
  },
  {
    department: "Finance",
    headcount: 5,
    avgAttendance: 86,
    avgLeaves: 1.1,
  },
  {
    department: "Marketing",
    headcount: 4,
    avgAttendance: 84,
    avgLeaves: 1.6,
  },
  {
    department: "Sales",
    headcount: 4,
    avgAttendance: 83,
    avgLeaves: 1.8,
  },
];

// Daily trend (example week)
const dailyAttendanceTrend = [
  { day: "Mon", present: 88, absent: 12 },
  { day: "Tue", present: 90, absent: 10 },
  { day: "Wed", present: 86, absent: 14 },
  { day: "Thu", present: 89, absent: 11 },
  { day: "Fri", present: 92, absent: 8 },
  { day: "Sat", present: 80, absent: 20 },
];

// Weekly leave trend
const weeklyLeaveTrend = [
  { week: "Week 1", leaves: 12 },
  { week: "Week 2", leaves: 15 },
  { week: "Week 3", leaves: 18 },
  { week: "Week 4", leaves: 13 },
];

// Monthly trend dummy data
const monthlyTrend = [
  { month: "November", avgAttendance: 85, totalPayout: 810000 },
  { month: "December", avgAttendance: 87, totalPayout: 825000 },
  { month: "January", avgAttendance: 89, totalPayout: 835000 },
];

const engagementStats = {
  engagementScore: 82,
  satisfactionScore: 79,
  avgTenureYears: 3.2,
};

// Payroll by department for Pie chart
const payrollByDept = [
  { name: "IT", value: 320000 },
  { name: "HR", value: 150000 },
  { name: "Finance", value: 180000 },
  { name: "Marketing", value: 100000 },
  { name: "Sales", value: 85000 },
];

const PIE_COLORS = ["#2f54eb", "#52c41a", "#fa8c16", "#13c2c2", "#eb2f96"];

export default function AdvancedReportGenerator() {
  const [generating, setGenerating] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [selectedDepartment, setSelectedDepartment] =
    useState("All Departments");
  const [includeAttendance, setIncludeAttendance] = useState(true);
  const [includeLeaves, setIncludeLeaves] = useState(true);
  const [includePayroll, setIncludePayroll] = useState(true);
  const [includePerformance, setIncludePerformance] = useState(true);

  // ------------------------- FILTERED DATA ------------------------- //

  const filteredDepartmentSummary = useMemo(() => {
    if (selectedDepartment === "All Departments") return departmentSummary;
    return departmentSummary.filter(
      (d) => d.department === selectedDepartment
    );
  }, [selectedDepartment]);

  const filteredTopPerformers = useMemo(() => {
    if (selectedDepartment === "All Departments") return topPerformers;
    return topPerformers.filter(
      (p) => p.department === selectedDepartment
    );
  }, [selectedDepartment]);

  const currentTrend = useMemo(() => {
    const row = monthlyTrend.find((t) => t.month === selectedMonth);
    return (
      row || {
        month: selectedMonth,
        avgAttendance: attendanceStats.avgAttendance,
        totalPayout: payrollStats.totalPayout,
      }
    );
  }, [selectedMonth]);

  // ------------------------- EXPORT HELPERS (CSV) ------------------------- //

  function downloadCsv(filename: string, rows: (string | number)[][]) {
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  }

  function exportAttendanceCsv() {
    const rows: (string | number)[][] = [
      [
        "Department",
        "Headcount",
        "Average Attendance (%)",
        "Average Leaves / Employee",
      ],
      ...filteredDepartmentSummary.map((d) => [
        d.department,
        d.headcount,
        d.avgAttendance,
        d.avgLeaves,
      ]),
    ];
    downloadCsv(`attendance-report-${selectedMonth}.csv`, rows);
  }

  function exportLeavesCsv() {
    const rows: (string | number)[][] = [
      ["Type", "Count"],
      ["Total", leaveStats.totalLeaves],
      ["Sick", leaveStats.sick],
      ["Casual", leaveStats.casual],
      ["Earned", leaveStats.earned],
    ];
    downloadCsv(`leaves-report-${selectedMonth}.csv`, rows);
  }

  function exportPayrollCsv() {
    const rows: (string | number)[][] = [
      ["Metric", "Value"],
      ["Total Employees", payrollStats.totalEmployees],
      ["Total Monthly Payout", payrollStats.totalPayout],
      ["Average Net Salary", payrollStats.avgNetSalary],
      ...payrollByDept.map((d) => [`Dept: ${d.name}`, d.value]),
    ];
    downloadCsv(`payroll-report-${selectedMonth}.csv`, rows);
  }

  function exportPerformanceCsv() {
    const rows: (string | number)[][] = [
      ["Name", "Department", "Score"],
      ...filteredTopPerformers.map((p) => [p.name, p.department, p.score]),
    ];
    downloadCsv(`performance-report-${selectedMonth}.csv`, rows);
  }

  // ------------------------- PDF EXPORT (jsPDF) ------------------------- //

  function generatePDF() {
    setGenerating(true);

    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("HRMS Analytics Report", 20, 20);

    doc.setFontSize(11);
    doc.text(`Month: ${selectedMonth}`, 20, 30);
    doc.text(`Department: ${selectedDepartment}`, 20, 36);
    doc.text(
      `Generated: ${new Date().toLocaleDateString()}`,
      20,
      42
    );

    let y = 52;

    if (includeAttendance) {
      doc.setFontSize(13);
      doc.text("Attendance Summary", 20, y);
      y += 6;
      doc.setFontSize(11);
      doc.text(
        `Total Working Days: ${attendanceStats.totalWorkingDays}`,
        20,
        y
      );
      y += 5;
      doc.text(
        `Average Attendance: ${attendanceStats.avgAttendance}%`,
        20,
        y
      );
      y += 5;
      doc.text(`Late Percentage: ${attendanceStats.latePercentage}%`, 20, y);
      y += 5;
      doc.text(
        `Absenteeism: ${attendanceStats.absentPercentage}%`,
        20,
        y
      );
      y += 8;
    }

    if (includeLeaves) {
      doc.setFontSize(13);
      doc.text("Leave Summary", 20, y);
      y += 6;
      doc.setFontSize(11);
      doc.text(`Total Leaves: ${leaveStats.totalLeaves}`, 20, y);
      y += 5;
      doc.text(
        `Sick | Casual | Earned: ${leaveStats.sick} | ${leaveStats.casual} | ${leaveStats.earned}`,
        20,
        y
      );
      y += 8;
    }

    if (includePayroll) {
      doc.setFontSize(13);
      doc.text("Payroll Summary", 20, y);
      y += 6;
      doc.setFontSize(11);
      doc.text(
        `Total Employees: ${payrollStats.totalEmployees}`,
        20,
        y
      );
      y += 5;
      doc.text(
        `Total Payout: ₹${payrollStats.totalPayout.toLocaleString()}`,
        20,
        y
      );
      y += 5;
      doc.text(
        `Average Net Salary: ₹${payrollStats.avgNetSalary.toLocaleString()}`,
        20,
        y
      );
      y += 8;
    }

    if (includePerformance) {
      doc.setFontSize(13);
      doc.text("Engagement & Performance", 20, y);
      y += 6;
      doc.setFontSize(11);
      doc.text(
        `Engagement Score: ${engagementStats.engagementScore}%`,
        20,
        y
      );
      y += 5;
      doc.text(
        `Satisfaction Score: ${engagementStats.satisfactionScore}%`,
        20,
        y
      );
      y += 5;
      doc.text(
        `Average Tenure: ${engagementStats.avgTenureYears} years`,
        20,
        y
      );
      y += 8;
    }

    doc.setFontSize(9);
    doc.text(
      "This is an auto-generated summary report from the HRMS system.",
      20,
      290
    );

    doc.save(`hrms-report-${selectedMonth}.pdf`);
    setGenerating(false);
  }

  // ------------------------- AI-LIKE SUMMARY ------------------------- //

  const aiSummary = useMemo(() => {
    const attendanceComment =
      attendanceStats.avgAttendance > 90
        ? "Attendance levels are excellent with high consistency."
        : attendanceStats.avgAttendance > 80
        ? "Attendance is generally good but there is room to reduce absenteeism."
        : "Attendance requires attention due to lower than ideal presence.";

    const leaveComment =
      leaveStats.totalLeaves / payrollStats.totalEmployees > 2.5
        ? "Employees are utilising leaves heavily; review leave policies and workload."
        : "Leave usage seems balanced across employees.";

    const engagementComment =
      engagementStats.engagementScore >= 80
        ? "Overall engagement is healthy, indicating a positive work environment."
        : "Engagement is moderate; consider surveys and feedback sessions.";

    const performanceComment =
      filteredTopPerformers.length > 0
        ? `Top performers like ${filteredTopPerformers[0].name} are leading performance in ${filteredTopPerformers[0].department}.`
        : "No performance data available for current filter.";

    return `${attendanceComment} ${leaveComment} ${engagementComment} ${performanceComment}`;
  }, [filteredTopPerformers]);

  // ------------------------- RENDER ------------------------- //

  return (
    <div className={styles.container}>
      <h2>Advanced HR Reports</h2>

      <p className={styles.desc}>
        Generate a professional HRMS report including Attendance, Leave,
        Payroll, Productivity & Performance insights in a single PDF.
      </p>

      {/* TOP CONTROLS */}
      <div
        style={{
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          marginBottom: 16,
        }}
      >
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {MONTHS.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>

        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
        >
          {DEPARTMENTS.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>

        <label style={{ fontSize: 13 }}>
          <input
            type="checkbox"
            checked={includeAttendance}
            onChange={(e) => setIncludeAttendance(e.target.checked)}
          />{" "}
          Attendance
        </label>

        <label style={{ fontSize: 13 }}>
          <input
            type="checkbox"
            checked={includeLeaves}
            onChange={(e) => setIncludeLeaves(e.target.checked)}
          />{" "}
          Leaves
        </label>

        <label style={{ fontSize: 13 }}>
          <input
            type="checkbox"
            checked={includePayroll}
            onChange={(e) => setIncludePayroll(e.target.checked)}
          />{" "}
          Payroll
        </label>

        <label style={{ fontSize: 13 }}>
          <input
            type="checkbox"
            checked={includePerformance}
            onChange={(e) => setIncludePerformance(e.target.checked)}
          />{" "}
          Performance
        </label>
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button
          className={styles.generateBtn}
          onClick={generatePDF}
          disabled={generating}
        >
          {generating ? "Generating..." : "📄 Download PDF Report"}
        </button>

        <button
          className={styles.generateBtn}
          style={{ background: "#13c2c2" }}
          onClick={exportAttendanceCsv}
        >
          ⬇ Attendance CSV
        </button>
        <button
          className={styles.generateBtn}
          style={{ background: "#52c41a" }}
          onClick={exportLeavesCsv}
        >
          ⬇ Leaves CSV
        </button>
        <button
          className={styles.generateBtn}
          style={{ background: "#fa8c16" }}
          onClick={exportPayrollCsv}
        >
          ⬇ Payroll CSV
        </button>
        <button
          className={styles.generateBtn}
          style={{ background: "#eb2f96" }}
          onClick={exportPerformanceCsv}
        >
          ⬇ Performance CSV
        </button>
      </div>

      {/* REPORT PREVIEW (for visual + print if needed) */}
      <div className={styles.reportArea} id="report">
        {/* HEADER */}
        <div className={styles.reportHeader}>
          <h1>Company HRMS Full Report</h1>
          <p>
            Month: <b>{selectedMonth}</b> • Department:{" "}
            <b>{selectedDepartment}</b>
          </p>
          <p>Generated on: {new Date().toLocaleDateString()}</p>
        </div>

        {/* EXECUTIVE SUMMARY CARDS */}
        <div className={styles.analyticsRow}>
          <div className={styles.analyticsCard}>
            <h4>Average Attendance</h4>
            <div className={styles.analyticsValue}>
              {attendanceStats.avgAttendance}%
            </div>
            <div className={styles.analyticsSub}>
              Monthly trend: {currentTrend.avgAttendance}% in{" "}
              {currentTrend.month}
            </div>
          </div>

          <div className={styles.analyticsCard}>
            <h4>Total Monthly Payout</h4>
            <div className={styles.analyticsValue}>
              ₹{currentTrend.totalPayout.toLocaleString()}
            </div>
            <div className={styles.analyticsSub}>
              Employees covered: {payrollStats.totalEmployees}
            </div>
          </div>

          <div className={styles.analyticsCard}>
            <h4>Engagement Score</h4>
            <div className={styles.analyticsValue}>
              {engagementStats.engagementScore}%
            </div>
            <div className={styles.analyticsSub}>
              Avg tenure: {engagementStats.avgTenureYears} years
            </div>
          </div>
        </div>

        {/* CHARTS ROW: Daily Line + Weekly Bar + Payroll Pie */}
        <div className={styles.chartsRow}>
          <div className={styles.chartCard}>
            <h3>Daily Attendance Trend</h3>
            <div className={styles.chartWrapper}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyAttendanceTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="present"
                    stroke="#2f54eb"
                    name="Present %"
                  />
                  <Line
                    type="monotone"
                    dataKey="absent"
                    stroke="#ff4d4f"
                    name="Absent %"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className={styles.chartCard}>
            <h3>Weekly Leave Trend</h3>
            <div className={styles.chartWrapper}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyLeaveTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="leaves" fill="#fa8c16" name="Leaves" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className={styles.chartCard}>
            <h3>Payroll by Department</h3>
            <div className={styles.chartWrapper}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={payrollByDept}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    label
                  >
                    {payrollByDept.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={PIE_COLORS[index % PIE_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* ATTENDANCE SECTION */}
        {includeAttendance && (
          <section className={styles.section}>
            <h2>Attendance Summary</h2>
            <div className={styles.grid3}>
              <div className={styles.box}>
                Total Working Days:{" "}
                <b>{attendanceStats.totalWorkingDays}</b>
              </div>
              <div className={styles.box}>
                Avg Attendance:{" "}
                <b>{attendanceStats.avgAttendance}%</b>
              </div>
              <div className={styles.box}>
                Late Marks: <b>{attendanceStats.latePercentage}%</b>
              </div>
              <div className={styles.box}>
                Absenteeism:{" "}
                <b>{attendanceStats.absentPercentage}%</b>
              </div>
              <div className={styles.box}>
                Filtered Month Avg:{" "}
                <b>{currentTrend.avgAttendance}%</b>
              </div>
              <div className={styles.box}>
                Department filter: <b>{selectedDepartment}</b>
              </div>
            </div>

            {/* Department-wise attendance table */}
            <div style={{ marginTop: 14 }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: 13,
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        textAlign: "left",
                        padding: 8,
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      Department
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: 8,
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      Headcount
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: 8,
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      Avg Attendance
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: 8,
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      Avg Leaves / Employee
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDepartmentSummary.map((d) => (
                    <tr key={d.department}>
                      <td
                        style={{
                          padding: 8,
                          borderBottom: "1px solid #f5f5f5",
                        }}
                      >
                        {d.department}
                      </td>
                      <td
                        style={{
                          padding: 8,
                          borderBottom: "1px solid #f5f5f5",
                        }}
                      >
                        {d.headcount}
                      </td>
                      <td
                        style={{
                          padding: 8,
                          borderBottom: "1px solid #f5f5f5",
                        }}
                      >
                        {d.avgAttendance}%
                      </td>
                      <td
                        style={{
                          padding: 8,
                          borderBottom: "1px solid #f5f5f5",
                        }}
                      >
                        {d.avgLeaves}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* LEAVE SECTION */}
        {includeLeaves && (
          <section className={styles.section}>
            <h2>Leave Usage Summary</h2>
            <div className={styles.grid3}>
              <div className={styles.box}>
                Total Leaves: <b>{leaveStats.totalLeaves}</b>
              </div>
              <div className={styles.box}>
                Sick Leave: <b>{leaveStats.sick}</b>
              </div>
              <div className={styles.box}>
                Casual Leave: <b>{leaveStats.casual}</b>
              </div>
              <div className={styles.box}>
                Earned Leave: <b>{leaveStats.earned}</b>
              </div>
              <div className={styles.box}>
                Avg Leaves / Employee:{" "}
                <b>
                  {(
                    leaveStats.totalLeaves / payrollStats.totalEmployees
                  ).toFixed(1)}
                </b>
              </div>
              <div className={styles.box}>
                Filter Dept: <b>{selectedDepartment}</b>
              </div>
            </div>
          </section>
        )}

        {/* PAYROLL SECTION */}
        {includePayroll && (
          <section className={styles.section}>
            <h2>Payroll Summary</h2>
            <div className={styles.grid3}>
              <div className={styles.box}>
                Total Employees: <b>{payrollStats.totalEmployees}</b>
              </div>
              <div className={styles.box}>
                Total Monthly Payout:{" "}
                <b>₹{payrollStats.totalPayout.toLocaleString()}</b>
              </div>
              <div className={styles.box}>
                Avg Net Salary:{" "}
                <b>
                  ₹{payrollStats.avgNetSalary.toLocaleString()}
                </b>
              </div>
            </div>

            <p style={{ fontSize: 13, marginTop: 10 }}>
              In <b>{currentTrend.month}</b>, average attendance was{" "}
              <b>{currentTrend.avgAttendance}%</b> with an estimated total
              payout of{" "}
              <b>₹{currentTrend.totalPayout.toLocaleString()}</b>.
            </p>
          </section>
        )}

        {/* PERFORMANCE SECTION */}
        {includePerformance && (
          <section className={styles.section}>
            <h2>Performance & Engagement</h2>

            <div className={styles.grid3}>
              <div className={styles.box}>
                Engagement Score:{" "}
                <b>{engagementStats.engagementScore}%</b>
              </div>
              <div className={styles.box}>
                Satisfaction Score:{" "}
                <b>{engagementStats.satisfactionScore}%</b>
              </div>
              <div className={styles.box}>
                Avg Tenure:{" "}
                <b>{engagementStats.avgTenureYears} years</b>
              </div>
            </div>

            <h3
              style={{
                marginTop: 16,
                marginBottom: 8,
                fontSize: 16,
              }}
            >
              Top Performers
            </h3>

            <ul className={styles.performerList}>
              {filteredTopPerformers.map((p) => (
                <li key={p.name}>
                  {p.name} ({p.department}) —{" "}
                  <b>{p.score}%</b> Performance Score
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* AI-LIKE SUMMARY SECTION */}
        <section className={styles.section}>
          <h2>AI Summary Insight</h2>
          <div className={styles.summaryBox}>
            <p>{aiSummary}</p>
          </div>
        </section>

        {/* FOOTER */}
        <footer className={styles.footer}>
          <p>
            © {new Date().getFullYear()} HRMS System — Auto Generated
            Analytics Report
          </p>
        </footer>
      </div>
    </div>
  );
}
