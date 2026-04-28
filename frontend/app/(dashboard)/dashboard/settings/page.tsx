"use client";

import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from "react";
import styles from "./settings.module.css";

export default function AdminSettings() {
  /* --------------------------
      PROFILE SETTINGS
  --------------------------- */
  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@company.com",
    phone: "9876543210",
  });

  /* --------------------------
      COMPANY SETTINGS
  --------------------------- */
  const [company, setCompany] = useState({
    name: "My Company Pvt Ltd",
    address: "Delhi, India",
    hours: "9:00 AM – 6:00 PM",
    logo: "/logo.png",
  });

  /* --------------------------
      THEME SETTINGS
  --------------------------- */
  const [themeMode, setThemeMode] = useState("light");
  const [themeColor, setThemeColor] = useState("#3559E0");

  /* --------------------------
      NOTIFICATION SETTINGS
  --------------------------- */
  const [notify, setNotify] = useState({
    email: true,
    sms: false,
  });

  /* --------------------------
      ROLE PERMISSIONS
  --------------------------- */
  const [permissions, setPermissions] = useState<any>({
    ADMIN: { employees: true, attendance: true, payroll: true, reports: true },
    HR: { employees: true, attendance: true, payroll: false, reports: false },
    EMPLOYEE: { employees: false, attendance: true, payroll: false, reports: false },
  });

  function togglePermission(role: string, key: string) {
    setPermissions({
      ...permissions,
      [role]: {
        ...permissions[role],
        [key]: !permissions[role][key],
      },
    });

    addLog(`Permission changed: ${role} → ${key}`);
  }

  /* --------------------------
      FEATURE TOGGLES
  --------------------------- */
  const [features, setFeatures] = useState<any>({
    employees: true,
    attendance: true,
    leave: true,
    payroll: true,
    reports: true,
    settings: true,
  });

  const toggleFeature = (key:any) => {
    setFeatures({ ...features, [key]: !features[key] });
    addLog(`Feature toggled: ${key}`);
  };

  /* --------------------------
      ADMIN AUDIT LOGS
  --------------------------- */
  const [logs, setLogs] = useState<any>([]);

  function addLog(message:any) {
    setLogs((prev:any) => [
      { message, time: new Date().toLocaleString() },
      ...prev,
    ]);
  }

  /* --------------------------
      LOGO UPLOAD
  --------------------------- */
  function handleLogoUpload(e: any) {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setCompany({ ...company, logo: url });

    addLog("Company Logo Updated");
  }

  /* --------------------------
      PASSWORD SETTINGS
  --------------------------- */
  const [password, setPassword] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  function updatePassword() {
    if (password.newPass !== password.confirm) {
      alert("New passwords do not match!");
      return;
    }

    addLog("Admin updated password");
    alert("Password updated successfully!");
  }

  /* --------------------------
      RETURN UI
  --------------------------- */
  return (
    <div className={styles.container}>
      <h2>Admin Settings</h2>

      {/* ============================
          COMPANY LOGO UPLOAD
      ============================ */}
      <section className={styles.section}>
        <h3>Company Branding</h3>

        <div className={styles.logoRow}>
          <img src={company.logo} className={styles.logoPreview} />
          <label className={styles.uploadBtn}>
            Upload Logo
            <input type="file" accept="image/*" onChange={handleLogoUpload} />
          </label>
        </div>
      </section>

      {/* ============================
          PROFILE SETTINGS
      ============================ */}
      <section className={styles.section}>
        <h3>Profile Settings</h3>

        <div className={styles.grid2}>
          <div className={styles.inputBox}>
            <label>Name</label>
            <input
              value={profile.name}
              onChange={(e) =>
                setProfile({ ...profile, name: e.target.value })
              }
            />
          </div>

          <div className={styles.inputBox}>
            <label>Email</label>
            <input
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
            />
          </div>

          <div className={styles.inputBox}>
            <label>Phone</label>
            <input
              value={profile.phone}
              onChange={(e) =>
                setProfile({ ...profile, phone: e.target.value })
              }
            />
          </div>
        </div>

        <button className={styles.saveBtn} onClick={() => addLog("Profile Updated")}>
          Save Profile
        </button>
      </section>

      {/* ============================
          COMPANY DETAILS
      ============================ */}
      <section className={styles.section}>
        <h3>Company Settings</h3>

        <div className={styles.grid2}>
          <div className={styles.inputBox}>
            <label>Name</label>
            <input
              value={company.name}
              onChange={(e) =>
                setCompany({ ...company, name: e.target.value })
              }
            />
          </div>

          <div className={styles.inputBox}>
            <label>Address</label>
            <input
              value={company.address}
              onChange={(e) =>
                setCompany({ ...company, address: e.target.value })
              }
            />
          </div>

          <div className={styles.inputBox}>
            <label>Working Hours</label>
            <input
              value={company.hours}
              onChange={(e) =>
                setCompany({ ...company, hours: e.target.value })
              }
            />
          </div>
        </div>

        <button className={styles.saveBtn} onClick={() => addLog("Company Settings Updated")}>
          Save Company Settings
        </button>
      </section>

      {/* ============================
          THEME CUSTOMIZATION
      ============================ */}
      <section className={styles.section}>
        <h3>Theme Customization</h3>

        <div className={styles.themeToggle}>
          <label>
            <input
              type="radio"
              checked={themeMode === "light"}
              onChange={() => {
                setThemeMode("light");
                addLog("Theme set to Light");
              }}
            />
            Light
          </label>

          <label>
            <input
              type="radio"
              checked={themeMode === "dark"}
              onChange={() => {
                setThemeMode("dark");
                addLog("Theme set to Dark");
              }}
            />
            Dark
          </label>
        </div>

        <div className={styles.colorRow}>
          <label>Primary Color</label>
          <input
            type="color"
            value={themeColor}
            onChange={(e) => {
              setThemeColor(e.target.value);
              addLog("Theme Color Updated");
            }}
          />
        </div>
      </section>

      {/* ============================
          FEATURE TOGGLES
      ============================ */}
      <section className={styles.section}>
        <h3>Feature Toggles</h3>

        <div className={styles.toggleGrid}>
          {Object.keys(features).map((key) => (
            <label key={key} className={styles.toggleRow}>
              <input
                type="checkbox"
                checked={features[key]}
                onChange={() => toggleFeature(key)}
              />
              {key.toUpperCase()}
            </label>
          ))}
        </div>
      </section>

      {/* ============================
          ROLE PERMISSIONS
      ============================ */}
      <section className={styles.section}>
        <h3>Role Permissions</h3>

        <table className={styles.permissionTable}>
          <thead>
            <tr>
              <th>Role</th>
              <th>Employees</th>
              <th>Attendance</th>
              <th>Payroll</th>
              <th>Reports</th>
            </tr>
          </thead>

          <tbody>
            {Object.keys(permissions).map((role) => (
              <tr key={role}>
                <td>{role}</td>

                {Object.keys(permissions[role]).map((perm) => (
                  <td key={perm}>
                    <input
                      type="checkbox"
                      checked={permissions[role][perm]}
                      onChange={() => togglePermission(role, perm)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* ============================
          PASSWORD CHANGE
      ============================ */}
      <section className={styles.section}>
        <h3>Change Password</h3>

        <div className={styles.grid2}>
          <div className={styles.inputBox}>
            <label>Current Password</label>
            <input
              type="password"
              value={password.current}
              onChange={(e) =>
                setPassword({ ...password, current: e.target.value })
              }
            />
          </div>

          <div className={styles.inputBox}>
            <label>New Password</label>
            <input
              type="password"
              value={password.newPass}
              onChange={(e) =>
                setPassword({ ...password, newPass: e.target.value })
              }
            />
          </div>

          <div className={styles.inputBox}>
            <label>Confirm Password</label>
            <input
              type="password"
              value={password.confirm}
              onChange={(e) =>
                setPassword({ ...password, confirm: e.target.value })
              }
            />
          </div>
        </div>

        <button className={styles.saveBtn} onClick={updatePassword}>
          Update Password
        </button>
      </section>

      {/* ============================
          AUDIT LOGS
      ============================ */}
      <section className={styles.section}>
        <h3>Admin Audit Logs</h3>

        <div className={styles.logBox}>
          {logs.length === 0 && <p>No actions yet…</p>}

          {logs.map((l: { message: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; time: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }, i: Key | null | undefined) => (
            <div key={i} className={styles.logItem}>
              <p>{l.message}</p>
              <span>{l.time}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
