"use client";

import { useState } from "react";
import styles from "./hrSettings.module.css";

export default function HrSettings() {
  const [profile, setProfile] = useState({
    name: "Mak HR",
    email: "mak.hr@example.com",
    phone: "9876543210"
  });

  const [workShift, setWorkShift] = useState({
    start: "09:00",
    end: "18:00"
  });

  const [notifications, setNotifications] = useState({
    attendanceAlerts: true,
    leaveAlerts: true,
    payrollAlerts: false
  });

  const [preferences, setPreferences] = useState({
    allowWFH: true,
    autoApproveShortLeave: false,
  });

  const [attendanceRules, setAttendanceRules] = useState({
    lateAfter: "09:15",
    halfDayAfter: "13:00",
  });

  function saveSettings() {
    alert("HR Settings updated successfully!");
  }

  return (
    <div className={styles.container}>
      <h2>HR Settings</h2>

      {/* Profile Section */}
      <div className={styles.section}>
        <h3>Profile Information</h3>

        <div className={styles.fieldGroup}>
          <label>Name</label>
          <input
            value={profile.name}
            onChange={(e) =>
              setProfile({ ...profile, name: e.target.value })
            }
          />
        </div>

        <div className={styles.fieldGroup}>
          <label>Email</label>
          <input
            value={profile.email}
            onChange={(e) =>
              setProfile({ ...profile, email: e.target.value })
            }
          />
        </div>

        <div className={styles.fieldGroup}>
          <label>Phone</label>
          <input
            value={profile.phone}
            onChange={(e) =>
              setProfile({ ...profile, phone: e.target.value })
            }
          />
        </div>
      </div>

      {/* Work Shift Settings */}
      <div className={styles.section}>
        <h3>Work Shift Settings</h3>

        <div className={styles.row}>
          <div className={styles.fieldGroup}>
            <label>Start Time</label>
            <input
              type="time"
              value={workShift.start}
              onChange={(e) =>
                setWorkShift({ ...workShift, start: e.target.value })
              }
            />
          </div>

          <div className={styles.fieldGroup}>
            <label>End Time</label>
            <input
              type="time"
              value={workShift.end}
              onChange={(e) =>
                setWorkShift({ ...workShift, end: e.target.value })
              }
            />
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className={styles.section}>
        <h3>Notifications</h3>

        <div className={styles.toggle}>
          <input
            type="checkbox"
            checked={notifications.attendanceAlerts}
            onChange={() =>
              setNotifications({
                ...notifications,
                attendanceAlerts: !notifications.attendanceAlerts,
              })
            }
          />
          <label>Attendance Alerts</label>
        </div>

        <div className={styles.toggle}>
          <input
            type="checkbox"
            checked={notifications.leaveAlerts}
            onChange={() =>
              setNotifications({
                ...notifications,
                leaveAlerts: !notifications.leaveAlerts,
              })
            }
          />
          <label>Leave Request Alerts</label>
        </div>

        <div className={styles.toggle}>
          <input
            type="checkbox"
            checked={notifications.payrollAlerts}
            onChange={() =>
              setNotifications({
                ...notifications,
                payrollAlerts: !notifications.payrollAlerts,
              })
            }
          />
          <label>Payroll Processing Alerts</label>
        </div>
      </div>

      {/* Preferences */}
      <div className={styles.section}>
        <h3>Preferences</h3>

        <div className={styles.toggle}>
          <input
            type="checkbox"
            checked={preferences.allowWFH}
            onChange={() =>
              setPreferences({
                ...preferences,
                allowWFH: !preferences.allowWFH,
              })
            }
          />
          <label>Allow Work From Home (WFH)</label>
        </div>

        <div className={styles.toggle}>
          <input
            type="checkbox"
            checked={preferences.autoApproveShortLeave}
            onChange={() =>
              setPreferences({
                ...preferences,
                autoApproveShortLeave: !preferences.autoApproveShortLeave,
              })
            }
          />
          <label>Auto-Approve Short Leaves</label>
        </div>
      </div>

      {/* Attendance Rules */}
      <div className={styles.section}>
        <h3>Attendance Rules</h3>

        <div className={styles.row}>
          <div className={styles.fieldGroup}>
            <label>Late Mark After</label>
            <input
              type="time"
              value={attendanceRules.lateAfter}
              onChange={(e) =>
                setAttendanceRules({
                  ...attendanceRules,
                  lateAfter: e.target.value,
                })
              }
            />
          </div>

          <div className={styles.fieldGroup}>
            <label>Half Day After</label>
            <input
              type="time"
              value={attendanceRules.halfDayAfter}
              onChange={(e) =>
                setAttendanceRules({
                  ...attendanceRules,
                  halfDayAfter: e.target.value,
                })
              }
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <button className={styles.saveBtn} onClick={saveSettings}>
        Save Settings
      </button>
    </div>
  );
}
