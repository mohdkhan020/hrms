// "use client";
// import RoleGuard from "@/components/layout/RoleGuard";


// export default function EmployeePage() {
// return (
// <RoleGuard allowedRoles={["EMPLOYEE"]}>
// <div>
// <h1>Employee Dashboard</h1>
// </div>
// </RoleGuard>
// );
// }


"use client";

import styles from "./employees.module.css";

export default function EmployeesPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Employees</h2>
        <button className={styles.addBtn}>+ Add Employee</button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Employee ID</th>
            <th>Role</th>
            <th>Department</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>John Doe</td>
            <td>#EMP123</td>
            <td>Software Engineer</td>
            <td>IT</td>
            <td className={styles.active}>Active</td>
            <td>
              <button className={styles.viewBtn}>View</button>
              <button className={styles.editBtn}>Edit</button>
              <button className={styles.deleteBtn}>Delete</button>
            </td>
          </tr>

          <tr>
            <td>Sarah Khan</td>
            <td>#EMP552</td>
            <td>HR Manager</td>
            <td>Human Resource</td>
            <td className={styles.inactive}>Inactive</td>
            <td>
              <button className={styles.viewBtn}>View</button>
              <button className={styles.editBtn}>Edit</button>
              <button className={styles.deleteBtn}>Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
