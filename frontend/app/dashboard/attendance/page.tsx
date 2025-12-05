"use client";

import styles from "./attendance.module.css";

export default function AttendancePage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Attendance</h2>

        <div className={styles.filterBox}>
          <input type="date" className={styles.dateInput} />
          <select className={styles.filterSelect}>
            <option value="">Filter: All Employees</option>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
            <option value="late">Late</option>
          </select>
        </div>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Employee ID</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>John Doe</td>
            <td>#EMP123</td>
            <td>09:10 AM</td>
            <td>06:15 PM</td>
            <td className={styles.present}>Present</td>
          </tr>

          <tr>
            <td>Sarah Khan</td>
            <td>#EMP552</td>
            <td>—</td>
            <td>—</td>
            <td className={styles.absent}>Absent</td>
          </tr>

          <tr>
            <td>Rohit Sharma</td>
            <td>#EMP201</td>
            <td>10:05 AM</td>
            <td>06:30 PM</td>
            <td className={styles.late}>Late</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
