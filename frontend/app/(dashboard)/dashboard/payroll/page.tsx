// // Want Advanced Payroll Add-ons?

// // Main bana sakta hoon:

// // 🔹 Auto Salary Slip PDF generation
// // 🔹 Yearly Payroll Report
// // 🔹 TDS Calculation
// // 🔹 Loan / Advance Deduction System
// // 🔹 Overtime Calculation
// // 🔹 Bonus Calculation (performance-based)

// // Just say:

// // 👉 "Add Overtime System"
// // ya
// // 👉 "Generate Salary Slip PDF"

// "use client";

// import { useMemo, useState } from "react";
// import styles from "./payroll.module.css";

// const DEPARTMENTS = ["IT", "Human Resource", "Finance", "Marketing", "Sales"];
// const MONTHS = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];

// /* ----------------------------------------------------------
//    DUMMY EMPLOYEE PAYROLL DATA
// ---------------------------------------------------------- */
// const initialEmployees = [
//   {
//     id: "E1",
//     name: "John Doe",
//     department: "IT",
//     baseSalary: 45000,
//     leaves: 2,
//     lateMarks: 1,
//   },
//   {
//     id: "E2",
//     name: "Sarah Khan",
//     department: "Human Resource",
//     baseSalary: 40000,
//     leaves: 0,
//     lateMarks: 0,
//   },
//   {
//     id: "E3",
//     name: "Rohit Sharma",
//     department: "Finance",
//     baseSalary: 55000,
//     leaves: 1,
//     lateMarks: 2,
//   },
//   {
//     id: "E4",
//     name: "Ayesha Ali",
//     department: "Marketing",
//     baseSalary: 38000,
//     leaves: 3,
//     lateMarks: 1,
//   },
//   {
//     id: "E5",
//     name: "Vikram Patel",
//     department: "IT",
//     baseSalary: 60000,
//     leaves: 0,
//     lateMarks: 0,
//   },
// ];

// /* ----------------------------------------------------------
//    PAYROLL CALCULATION FUNCTION
// ---------------------------------------------------------- */
// function calculatePayroll(emp: {
//   id?: string;
//   name?: string;
//   department?: string;
//   baseSalary: any;
//   leaves: any;
//   lateMarks: any;
// }) {
//   const basic = emp.baseSalary * 0.5;
//   const hra = emp.baseSalary * 0.2;
//   const da = emp.baseSalary * 0.1;
//   const allowance = emp.baseSalary * 0.12;

//   // Deductions
//   const pf = emp.baseSalary * 0.12;
//   const esi = emp.baseSalary * 0.0075;
//   const professionalTax = 200;

//   // Leave Deduction (per day)
//   const leaveDeduction = emp.leaves * (emp.baseSalary / 30);

//   // Late Mark Deduction
//   const lateDeduction = emp.lateMarks * 100;

//   const gross = basic + hra + da + allowance;
//   const totalDeductions =
//     pf + esi + professionalTax + leaveDeduction + lateDeduction;

//   const net = gross - totalDeductions;

//   return {
//     basic: Math.round(basic),
//     hra: Math.round(hra),
//     da: Math.round(da),
//     allowance: Math.round(allowance),
//     pf: Math.round(pf),
//     esi: Math.round(esi),
//     professionalTax,
//     leaveDeduction: Math.round(leaveDeduction),
//     lateDeduction,
//     gross: Math.round(gross),
//     totalDeductions: Math.round(totalDeductions),
//     net: Math.round(net),
//   };
// }

// export default function AdminPayroll() {
//   const [employees, setEmployees] = useState(initialEmployees);
//   const [search, setSearch] = useState("");
//   const [dept, setDept] = useState("");
//   const [month, setMonth] = useState("February");
//   const [selected, setSelected] = useState<any>(null);

//   /* ----------------------------------------------------------
//      FILTER + SEARCH
//   ---------------------------------------------------------- */
//   const filtered = useMemo(() => {
//     let data = [...employees];

//     if (search.trim()) {
//       const q = search.toLowerCase();
//       data = data.filter((e) => e.name.toLowerCase().includes(q));
//     }

//     if (dept) data = data.filter((e) => e.department === dept);

//     return data;
//   }, [employees, search, dept]);

//   /* ----------------------------------------------------------
//      DOWNLOAD SALARY EXCEL
//   ---------------------------------------------------------- */
//   function exportPayroll() {
//     const rows = [
//       ["Name", "Department", "Gross Salary", "Deductions", "Net Salary"],
//       ...filtered.map((e) => {
//         const p = calculatePayroll(e);
//         return [e.name, e.department, p.gross, p.totalDeductions, p.net];
//       }),
//     ];

//     const csv = rows.map((r) => r.join(",")).join("\n");
//     const blob = new Blob([csv], { type: "text/csv" });
//     const url = URL.createObjectURL(blob);

//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "payroll.csv";
//     a.click();
//   }

//   return (
//     <div className={styles.container}>
//       <h2>Admin Payroll Management</h2>

//       {/* Summary Cards */}
//       <div className={styles.cards}>
//         <div className={styles.cardBox}>
//           <h4>Total Employees</h4>
//           <p>{employees.length}</p>
//         </div>
//         <div className={styles.cardBox}>
//           <h4>Payroll Month</h4>
//           <p>{month}</p>
//         </div>
//         <div className={styles.cardBox}>
//           <h4>Total Payroll Cost</h4>
//           <p>
//             ₹{filtered.reduce((acc, e) => acc + calculatePayroll(e).net, 0)}
//           </p>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className={styles.filters}>
//         <input
//           placeholder="Search employee..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />

//         <select value={dept} onChange={(e) => setDept(e.target.value)}>
//           <option value="">All Departments</option>
//           {DEPARTMENTS.map((d) => (
//             <option key={d}>{d}</option>
//           ))}
//         </select>

//         <select value={month} onChange={(e) => setMonth(e.target.value)}>
//           {MONTHS.map((m) => (
//             <option key={m}>{m}</option>
//           ))}
//         </select>

//         <button onClick={exportPayroll} className={styles.exportBtn}>
//           ⬇ Export Payroll
//         </button>
//       </div>

//       {/* Payroll Table */}
//       <table className={styles.table}>
//         <thead>
//           <tr>
//             <th>Employee</th>
//             <th>Department</th>
//             <th>Gross Salary</th>
//             <th>Deductions</th>
//             <th>Net Salary</th>
//             <th style={{ textAlign: "center" }}>Slip</th>
//           </tr>
//         </thead>

//         <tbody>
//           {filtered.map((e) => {
//             const p = calculatePayroll(e);

//             return (
//               <tr key={e.id}>
//                 <td>{e.name}</td>
//                 <td>{e.department}</td>
//                 <td>₹{p.gross}</td>
//                 <td>₹{p.totalDeductions}</td>
//                 <td className={styles.netSalary}>₹{p.net}</td>

//                 <td style={{ textAlign: "center" }}>
//                   <button
//                     className={styles.viewBtn}
//                     onClick={() => setSelected({ ...e, payroll: p })}
//                   >
//                     View Slip
//                   </button>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>

//       {/* Salary Slip Modal */}
//       {selected && (
//         <div className={styles.modal}>
//           <div className={styles.modalBox}>
//             <h3>Salary Slip — {selected.name}</h3>
//             <p>
//               <b>Month:</b> {month}
//             </p>

//             <div className={styles.section}>
//               <h4>Earnings</h4>
//               <p>Basic Salary: ₹{selected.payroll.basic}</p>
//               <p>HRA: ₹{selected.payroll.hra}</p>
//               <p>DA: ₹{selected.payroll.da}</p>
//               <p>Allowance: ₹{selected.payroll.allowance}</p>
//             </div>

//             <div className={styles.section}>
//               <h4>Deductions</h4>
//               <p>PF: ₹{selected.payroll.pf}</p>
//               <p>ESI: ₹{selected.payroll.esi}</p>
//               <p>Professional Tax: ₹{selected.payroll.professionalTax}</p>
//               <p>Leave Deduction: ₹{selected.payroll.leaveDeduction}</p>
//               <p>Late Marks: ₹{selected.payroll.lateDeduction}</p>
//             </div>

//             <div className={styles.section}>
//               <h4>Net Salary</h4>
//               <p className={styles.netAmount}>₹{selected.payroll.net}</p>
//             </div>

//             <button
//               className={styles.closeBtn}
//               onClick={() => setSelected(null)}
//             >
//               Close
//             </button>

          

//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


"use client";

import { useMemo, useState } from "react";
import { jsPDF } from "jspdf";
import styles from "./payroll.module.css";

const DEPARTMENTS = ["IT", "Human Resource", "Finance", "Marketing", "Sales"];

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

type EmployeePayroll = {
  id: string;
  name: string;
  department: string;
  baseSalary: number;
  leaves: number;
  lateMarks: number;
  overtimeHours: number;
  bonus: number;
  loanEMI: number;
};

type CalculatedPayroll = {
  basic: number;
  hra: number;
  da: number;
  allowance: number;
  pf: number;
  esi: number;
  professionalTax: number;
  leaveDeduction: number;
  lateDeduction: number;
  overtimePay: number;
  bonus: number;
  loanDeduction: number;
  tds: number;
  gross: number;
  totalDeductions: number;
  net: number;
};

/* ----------------------------------------------------------
   DUMMY EMPLOYEE PAYROLL DATA (ADVANCED)
---------------------------------------------------------- */
const initialEmployees: EmployeePayroll[] = [
  {
    id: "E1",
    name: "John Doe",
    department: "IT",
    baseSalary: 45000,
    leaves: 2,
    lateMarks: 1,
    overtimeHours: 5,
    bonus: 2000,
    loanEMI: 1500,
  },
  {
    id: "E2",
    name: "Sarah Khan",
    department: "Human Resource",
    baseSalary: 40000,
    leaves: 0,
    lateMarks: 0,
    overtimeHours: 0,
    bonus: 3000,
    loanEMI: 0,
  },
  {
    id: "E3",
    name: "Rohit Sharma",
    department: "Finance",
    baseSalary: 55000,
    leaves: 1,
    lateMarks: 2,
    overtimeHours: 3,
    bonus: 0,
    loanEMI: 2000,
  },
  {
    id: "E4",
    name: "Ayesha Ali",
    department: "Marketing",
    baseSalary: 38000,
    leaves: 3,
    lateMarks: 1,
    overtimeHours: 2,
    bonus: 1500,
    loanEMI: 0,
  },
  {
    id: "E5",
    name: "Vikram Patel",
    department: "IT",
    baseSalary: 60000,
    leaves: 0,
    lateMarks: 0,
    overtimeHours: 6,
    bonus: 5000,
    loanEMI: 3000,
  },
];

/* ----------------------------------------------------------
   PAYROLL CALCULATION FUNCTION (ADVANCED)
---------------------------------------------------------- */
function calculatePayroll(emp: EmployeePayroll): CalculatedPayroll {
  const basic = emp.baseSalary * 0.5;
  const hra = emp.baseSalary * 0.2;
  const da = emp.baseSalary * 0.1;
  const allowance = emp.baseSalary * 0.12;

  // Overtime
  const perDay = emp.baseSalary / 30;
  const hourlyRate = perDay / 8;
  const overtimePay = Math.round(emp.overtimeHours * hourlyRate * 1.5); // 1.5x rate

  // Bonus (directly from field)
  const bonus = emp.bonus;

  // Deductions
  const pf = emp.baseSalary * 0.12;
  const esi = emp.baseSalary * 0.0075;
  const professionalTax = 200;
  const leaveDeduction = emp.leaves * (emp.baseSalary / 30);
  const lateDeduction = emp.lateMarks * 100;
  const loanDeduction = emp.loanEMI;

  const grossBase = basic + hra + da + allowance + overtimePay + bonus;

  // Simple TDS calculation:
  // Annualised gross -> if > 5L then 5% of grossBase
  const annualGross = grossBase * 12;
  let tds = 0;
  if (annualGross > 500000) {
    tds = grossBase * 0.05;
  }

  const gross = grossBase;
  const totalDeductions =
    pf + esi + professionalTax + leaveDeduction + lateDeduction + loanDeduction + tds;

  const net = gross - totalDeductions;

  return {
    basic: Math.round(basic),
    hra: Math.round(hra),
    da: Math.round(da),
    allowance: Math.round(allowance),
    pf: Math.round(pf),
    esi: Math.round(esi),
    professionalTax: Math.round(professionalTax),
    leaveDeduction: Math.round(leaveDeduction),
    lateDeduction: Math.round(lateDeduction),
    overtimePay: Math.round(overtimePay),
    bonus: Math.round(bonus),
    loanDeduction: Math.round(loanDeduction),
    tds: Math.round(tds),
    gross: Math.round(gross),
    totalDeductions: Math.round(totalDeductions),
    net: Math.round(net),
  };
}

export default function AdminPayroll() {
  const [employees] = useState<EmployeePayroll[]>(initialEmployees);
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("");
  const [month, setMonth] = useState("February");
  const [selected, setSelected] = useState<{
    emp: EmployeePayroll;
    payroll: CalculatedPayroll;
  } | null>(null);

  /* ----------------------------------------------------------
     FILTER + SEARCH
  ---------------------------------------------------------- */
  const filtered = useMemo(() => {
    let data = [...employees];

    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter((e) => e.name.toLowerCase().includes(q));
    }

    if (dept) data = data.filter((e) => e.department === dept);

    return data;
  }, [employees, search, dept]);

  /* ----------------------------------------------------------
     EXPORT MONTHLY PAYROLL CSV
  ---------------------------------------------------------- */
  function exportPayroll() {
    const rows = [
      [
        "Name",
        "Department",
        "Gross Salary",
        "Total Deductions",
        "Net Salary",
        "Overtime Pay",
        "Bonus",
        "Loan EMI",
        "TDS",
      ],
      ...filtered.map((e) => {
        const p = calculatePayroll(e);
        return [
          e.name,
          e.department,
          p.gross,
          p.totalDeductions,
          p.net,
          p.overtimePay,
          p.bonus,
          p.loanDeduction,
          p.tds,
        ];
      }),
    ];

    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `payroll-${month}.csv`;
    a.click();
  }

  /* ----------------------------------------------------------
     EXPORT YEARLY PAYROLL CSV
  ---------------------------------------------------------- */
  function exportYearlyReport() {
    const rows = [
      ["Name", "Department", "Annual Gross", "Annual Deductions", "Annual Net"],
      ...employees.map((e) => {
        const p = calculatePayroll(e);
        return [
          e.name,
          e.department,
          p.gross * 12,
          p.totalDeductions * 12,
          p.net * 12,
        ];
      }),
    ];

    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "yearly-payroll-report.csv";
    a.click();
  }

  /* ----------------------------------------------------------
     GENERATE SALARY SLIP PDF
  ---------------------------------------------------------- */
  function downloadSalarySlip(
    emp: EmployeePayroll,
    p: CalculatedPayroll,
    monthName: string
  ) {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Salary Slip", 20, 20);

    doc.setFontSize(11);
    doc.text(`Employee Name: ${emp.name}`, 20, 35);
    doc.text(`Employee ID: ${emp.id}`, 20, 42);
    doc.text(`Department: ${emp.department}`, 20, 49);
    doc.text(`Month: ${monthName}`, 20, 56);

    doc.line(20, 60, 190, 60);

    doc.setFontSize(12);
    doc.text("Earnings", 20, 70);
    doc.setFontSize(11);
    doc.text(`Basic            : ₹${p.basic}`, 20, 80);
    doc.text(`HRA              : ₹${p.hra}`, 20, 87);
    doc.text(`DA               : ₹${p.da}`, 20, 94);
    doc.text(`Allowance        : ₹${p.allowance}`, 20, 101);
    doc.text(`Overtime Pay     : ₹${p.overtimePay}`, 20, 108);
    doc.text(`Bonus            : ₹${p.bonus}`, 20, 115);

    doc.setFontSize(12);
    doc.text("Deductions", 120, 70);
    doc.setFontSize(11);
    doc.text(`PF               : ₹${p.pf}`, 120, 80);
    doc.text(`ESI              : ₹${p.esi}`, 120, 87);
    doc.text(`Professional Tax : ₹${p.professionalTax}`, 120, 94);
    doc.text(`Leave Deduction  : ₹${p.leaveDeduction}`, 120, 101);
    doc.text(`Late Deduction   : ₹${p.lateDeduction}`, 120, 108);
    doc.text(`Loan EMI         : ₹${p.loanDeduction}`, 120, 115);
    doc.text(`TDS              : ₹${p.tds}`, 120, 122);

    doc.line(20, 130, 190, 130);

    doc.setFontSize(12);
    doc.text(`Gross Salary     : ₹${p.gross}`, 20, 140);
    doc.text(`Total Deductions : ₹${p.totalDeductions}`, 20, 147);
    doc.setFontSize(14);
    doc.text(`Net Salary (In Hand): ₹${p.net}`, 20, 158);

    doc.setFontSize(10);
    doc.text(
      "This is a system generated salary slip and does not require a signature.",
      20,
      175
    );

    doc.save(`salary-slip-${emp.id}-${monthName}.pdf`);
  }

  const totalMonthlyNet = filtered.reduce(
    (acc, e) => acc + calculatePayroll(e).net,
    0
  );

  const totalAnnualNet = employees.reduce(
    (acc, e) => acc + calculatePayroll(e).net * 12,
    0
  );

  return (
    <div className={styles.container}>
      <h2>Advanced Payroll Management</h2>

      {/* Summary Cards */}
      <div className={styles.cards}>
        <div className={styles.cardBox}>
          <h4>Total Employees</h4>
          <p>{employees.length}</p>
        </div>
        <div className={styles.cardBox}>
          <h4>Payroll Month</h4>
          <p>{month}</p>
        </div>
        <div className={styles.cardBox}>
          <h4>Monthly Payroll Cost</h4>
          <p>₹{totalMonthlyNet}</p>
        </div>
        <div className={styles.cardBox}>
          <h4>Estimated Annual Payroll</h4>
          <p>₹{totalAnnualNet}</p>
        </div>
      </div>

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

        <select value={month} onChange={(e) => setMonth(e.target.value)}>
          {MONTHS.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>

        <button onClick={exportPayroll} className={styles.exportBtn}>
          ⬇ Export Monthly Payroll
        </button>

        <button onClick={exportYearlyReport} className={styles.exportSecondary}>
          📊 Yearly Report
        </button>
      </div>

      {/* Payroll Table */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Department</th>
            <th>Overtime (hrs)</th>
            <th>Bonus</th>
            <th>Loan EMI</th>
            <th>Gross Salary</th>
            <th>Deductions</th>
            <th>Net Salary</th>
            <th style={{ textAlign: "center" }}>Slip</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((e) => {
            const p = calculatePayroll(e);

            return (
              <tr key={e.id}>
                <td>{e.name}</td>
                <td>{e.department}</td>
                <td>{e.overtimeHours}</td>
                <td>₹{p.bonus}</td>
                <td>₹{p.loanDeduction}</td>
                <td>₹{p.gross}</td>
                <td>₹{p.totalDeductions}</td>
                <td className={styles.netSalary}>₹{p.net}</td>

                <td style={{ textAlign: "center" }}>
                  <button
                    className={styles.viewBtn}
                    onClick={() => setSelected({ emp: e, payroll: p })}
                  >
                    View Slip
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Salary Slip Modal */}
      {selected && (
        <div className={styles.modal}>
          <div className={styles.modalBox}>
            <h3>Salary Slip — {selected.emp.name}</h3>
            <p>
              <b>Month:</b> {month}
            </p>
            <p>
              <b>Employee ID:</b> {selected.emp.id} |{" "}
              <b>Department:</b> {selected.emp.department}
            </p>

            <div className={styles.slipGrid}>
              <div className={styles.section}>
                <h4>Earnings</h4>
                <p>Basic Salary: ₹{selected.payroll.basic}</p>
                <p>HRA: ₹{selected.payroll.hra}</p>
                <p>DA: ₹{selected.payroll.da}</p>
                <p>Allowance: ₹{selected.payroll.allowance}</p>
                <p>Overtime Pay: ₹{selected.payroll.overtimePay}</p>
                <p>Bonus: ₹{selected.payroll.bonus}</p>
              </div>

              <div className={styles.section}>
                <h4>Deductions</h4>
                <p>PF: ₹{selected.payroll.pf}</p>
                <p>ESI: ₹{selected.payroll.esi}</p>
                <p>Professional Tax: ₹{selected.payroll.professionalTax}</p>
                <p>Leave Deduction: ₹{selected.payroll.leaveDeduction}</p>
                <p>Late Marks: ₹{selected.payroll.lateDeduction}</p>
                <p>Loan EMI: ₹{selected.payroll.loanDeduction}</p>
                <p>TDS: ₹{selected.payroll.tds}</p>
              </div>
            </div>

            <div className={styles.section}>
              <h4>Net Salary</h4>
              <p className={styles.netAmount}>₹{selected.payroll.net}</p>
            </div>

            <div className={styles.modalActions}>
              <button
                className={styles.exportBtn}
                onClick={() =>
                  downloadSalarySlip(selected.emp, selected.payroll, month)
                }
              >
                ⬇ Download PDF
              </button>

              <button
                className={styles.closeBtn}
                onClick={() => setSelected(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
