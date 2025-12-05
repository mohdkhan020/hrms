"use client";

import styles from "./leave.module.css";

export default function LeavePage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Leave Management</h2>
        <button className={styles.addBtn}>+ Apply Leave</button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Employee ID</th>
            <th>Leave Type</th>
            <th>From</th>
            <th>To</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>John Doe</td>
            <td>#EMP123</td>
            <td>Sick Leave</td>
            <td>2025-02-02</td>
            <td>2025-02-03</td>
            <td className={styles.approved}>Approved</td>
            <td>
              <button className={styles.viewBtn}>View</button>
              <button className={styles.rejectBtn}>Reject</button>
            </td>
          </tr>

          <tr>
            <td>Sara Khan</td>
            <td>#EMP552</td>
            <td>Casual Leave</td>
            <td>2025-02-10</td>
            <td>2025-02-12</td>
            <td className={styles.pending}>Pending</td>
            <td>
              <button className={styles.viewBtn}>View</button>
              <button className={styles.approveBtn}>Approve</button>
            </td>
          </tr>

          <tr>
            <td>Rohit Sharma</td>
            <td>#EMP885</td>
            <td>Annual Leave</td>
            <td>2025-02-15</td>
            <td>2025-02-20</td>
            <td className={styles.rejected}>Rejected</td>
            <td>
              <button className={styles.viewBtn}>View</button>
              <button className={styles.approveBtn}>Approve</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
