"use client";

import styles from "./payroll.module.css";

export default function PayrollPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Payroll</h2>
        <button className={styles.addBtn}>+ Generate Payroll</button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Employee ID</th>
            <th>Basic Salary</th>
            <th>Deductions</th>
            <th>Net Salary</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>John Doe</td>
            <td>#EMP123</td>
            <td>₹50,000</td>
            <td>₹2,000</td>
            <td>₹48,000</td>
            <td className={styles.paid}>Paid</td>
            <td>
              <button className={styles.viewBtn}>View</button>
              <button className={styles.downloadBtn}>Download</button>
            </td>
          </tr>

          <tr>
            <td>Sarah Khan</td>
            <td>#EMP552</td>
            <td>₹60,000</td>
            <td>₹5,000</td>
            <td>₹55,000</td>
            <td className={styles.pending}>Pending</td>
            <td>
              <button className={styles.viewBtn}>View</button>
              <button className={styles.generateBtn}>Generate</button>
            </td>
          </tr>

          <tr>
            <td>Rohit Sharma</td>
            <td>#EMP885</td>
            <td>₹45,000</td>
            <td>₹0</td>
            <td>₹45,000</td>
            <td className={styles.paid}>Paid</td>
            <td>
              <button className={styles.viewBtn}>View</button>
              <button className={styles.downloadBtn}>Download</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
