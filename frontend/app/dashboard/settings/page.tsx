"use client";

import styles from "./settings.module.css";

export default function SettingsPage() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Settings</h2>

      {/* Profile Section */}
      <div className={styles.section}>
        <h3>Profile Information</h3>
        <div className={styles.formGroup}>
          <label>Name</label>
          <input type="text" placeholder="Your Name" />
        </div>

        <div className={styles.formGroup}>
          <label>Email</label>
          <input type="email" placeholder="Your Email" />
        </div>

        <div className={styles.formGroup}>
          <label>Phone</label>
          <input type="text" placeholder="Phone Number" />
        </div>

        <button className={styles.saveBtn}>Save Changes</button>
      </div>

      {/* Password Section */}
      <div className={styles.section}>
        <h3>Change Password</h3>

        <div className={styles.formGroup}>
          <label>Current Password</label>
          <input type="password" placeholder="Enter current password" />
        </div>

        <div className={styles.formGroup}>
          <label>New Password</label>
          <input type="password" placeholder="Enter new password" />
        </div>

        <div className={styles.formGroup}>
          <label>Confirm New Password</label>
          <input type="password" placeholder="Confirm password" />
        </div>

        <button className={styles.saveBtn}>Update Password</button>
      </div>

      {/* Notification Section */}
      <div className={styles.section}>
        <h3>Notifications</h3>

        <div className={styles.toggleRow}>
          <label>Email Notifications</label>
          <input type="checkbox" />
        </div>

        <div className={styles.toggleRow}>
          <label>SMS Notifications</label>
          <input type="checkbox" />
        </div>

        <button className={styles.saveBtn}>Save Preferences</button>
      </div>
    </div>
  );
}
