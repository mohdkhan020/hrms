"use client";

import { useState } from "react";
import styles from "./adminProfile.module.css";

type Permissions = {
  manageEmployees: boolean;
  manageHR: boolean;
  managePayroll: boolean;
  manageDepartments: boolean;
  manageLeaves: boolean;
  manageAttendance: boolean;
  manageSettings: boolean;
};

type LoginEntry = {
  id: number;
  device: string;
  ip: string;
  time: string;
  location: string;
};

export default function AdminProfilePage() {
  // ---------------- PROFILE STATE ----------------
  const [profile, setProfile] = useState({
    name: "Mohd Adil Khan",
    email: "admin@hrms.com",
    phone: "+91-9876543210",
    role: "Super Admin",
    address: "Noida, Uttar Pradesh, India",
  });

  const [photo, setPhoto] = useState<string | null>(null);

  // ---------------- PERMISSIONS ----------------
  const [permissions, setPermissions] = useState<Permissions>({
    manageEmployees: true,
    manageHR: true,
    managePayroll: true,
    manageDepartments: true,
    manageLeaves: true,
    manageAttendance: true,
    manageSettings: true,
  });

  // ---------------- SECURITY / LOGIN ACTIVITY ----------------
  const [loginActivity] = useState<LoginEntry[]>([
    {
      id: 1,
      device: "Chrome on Windows",
      ip: "192.168.0.12",
      time: "Today • 10:12 AM",
      location: "Noida, IN",
    },
    {
      id: 2,
      device: "Chrome on Mobile",
      ip: "192.168.0.18",
      time: "Yesterday • 08:37 PM",
      location: "Delhi, IN",
    },
    {
      id: 3,
      device: "Edge on Windows",
      ip: "10.0.0.5",
      time: "28 Nov • 03:22 PM",
      location: "Noida, IN",
    },
  ]);

  // ---------------- TOAST ----------------
  const [toast, setToast] = useState<string>("");
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2200);
  };

  // ---------------- HANDLERS ----------------
  const handleProfileChange = (
    field: keyof typeof profile,
    value: string
  ) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPhoto(url);
    showToast("Profile photo updated");
    // NOTE: backend upload API hook yahan connect kar sakte ho
  };

  const togglePermission = (key: keyof Permissions) => {
    setPermissions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    showToast("Permissions updated (frontend only)");
    // NOTE: yahan actual API call lagani hogi
  };

  const handleSaveProfile = () => {
    // yahan actual update profile API call (PUT /admin/me) add kar sakte ho
    showToast("Profile updated");
  };

  // ---------------- PASSWORD MODAL ----------------
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChangePassword = () => {
    if (!passwordForm.currentPassword || !passwordForm.newPassword) {
      showToast("Please fill all password fields");
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      showToast("New password must be at least 6 characters");
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showToast("New password & confirm password do not match");
      return;
    }

    // yahan actual API call hoga: POST /admin/change-password
    showToast("Password changed (demo)");
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setShowPasswordModal(false);
  };

  return (
    <div className={styles.container}>
      <h2>Admin Profile</h2>

      {toast && <div className={styles.toast}>{toast}</div>}

      {/* PASSWORD MODAL */}
      {showPasswordModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Change Password</h3>

            <label>Current Password</label>
            <input
              type="password"
              value={passwordForm.currentPassword}
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  currentPassword: e.target.value,
                })
              }
            />

            <label>New Password</label>
            <input
              type="password"
              value={passwordForm.newPassword}
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  newPassword: e.target.value,
                })
              }
            />

            <label>Confirm New Password</label>
            <input
              type="password"
              value={passwordForm.confirmPassword}
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  confirmPassword: e.target.value,
                })
              }
            />

            <div className={styles.modalActions}>
              <button
                className={styles.saveBtn}
                onClick={handleChangePassword}
              >
                Update
              </button>
              <button
                className={styles.cancelBtn}
                onClick={() => setShowPasswordModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={styles.layout}>
        {/* LEFT PROFILE CARD */}
        <div className={styles.leftColumn}>
          <div className={styles.profileCard}>
            <div className={styles.avatarWrapper}>
              {photo ? (
                <img
                  src={photo}
                  alt={profile.name}
                  className={styles.avatar}
                />
              ) : (
                <div className={styles.avatarPlaceholder}>
                  {profile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </div>
              )}
            </div>

            <h3 className={styles.name}>{profile.name}</h3>
            <span className={styles.roleBadge}>{profile.role}</span>

            <div className={styles.infoText}>
              <p>{profile.email}</p>
              <p>{profile.phone}</p>
              <p>{profile.address}</p>
            </div>

            <label className={styles.uploadBtn}>
              Change Photo
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                hidden
              />
            </label>
          </div>

          <div className={styles.smallCard}>
            <h4>Quick Actions</h4>
            <button
              className={styles.actionBtn}
              onClick={() => setShowPasswordModal(true)}
            >
              🔐 Change Password
            </button>
            <button
              className={styles.actionBtn}
              onClick={() => showToast("Company Settings (hook to settings page)")}
            >
              ⚙ Company Settings
            </button>
          </div>
        </div>

        {/* RIGHT SECTIONS */}
        <div className={styles.rightColumn}>
          {/* PERSONAL INFO */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3>Personal Information</h3>
              <button
                className={styles.primaryBtn}
                onClick={handleSaveProfile}
              >
                Save Changes
              </button>
            </div>

            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) =>
                    handleProfileChange("name", e.target.value)
                  }
                />
              </div>

              <div className={styles.formGroup}>
                <label>Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) =>
                    handleProfileChange("email", e.target.value)
                  }
                />
              </div>

              <div className={styles.formGroup}>
                <label>Phone</label>
                <input
                  type="text"
                  value={profile.phone}
                  onChange={(e) =>
                    handleProfileChange("phone", e.target.value)
                  }
                />
              </div>

              <div className={styles.formGroup}>
                <label>Role</label>
                <input type="text" value={profile.role} disabled />
              </div>

              <div className={styles.formGroupFull}>
                <label>Address</label>
                <input
                  type="text"
                  value={profile.address}
                  onChange={(e) =>
                    handleProfileChange("address", e.target.value)
                  }
                />
              </div>
            </div>
          </div>

          {/* PERMISSIONS */}
          <div className={styles.card}>
            <h3>Access & Permissions</h3>
            <p className={styles.muted}>
              Control what this admin is allowed to manage inside the HRMS.
            </p>

            <div className={styles.permissionsGrid}>
              <PermissionToggle
                label="Manage Employees"
                checked={permissions.manageEmployees}
                onChange={() => togglePermission("manageEmployees")}
              />
              <PermissionToggle
                label="Manage HR Users"
                checked={permissions.manageHR}
                onChange={() => togglePermission("manageHR")}
              />
              <PermissionToggle
                label="Manage Payroll"
                checked={permissions.managePayroll}
                onChange={() => togglePermission("managePayroll")}
              />
              <PermissionToggle
                label="Manage Departments"
                checked={permissions.manageDepartments}
                onChange={() => togglePermission("manageDepartments")}
              />
              <PermissionToggle
                label="Manage Leaves"
                checked={permissions.manageLeaves}
                onChange={() => togglePermission("manageLeaves")}
              />
              <PermissionToggle
                label="Manage Attendance"
                checked={permissions.manageAttendance}
                onChange={() => togglePermission("manageAttendance")}
              />
              <PermissionToggle
                label="Manage System Settings"
                checked={permissions.manageSettings}
                onChange={() => togglePermission("manageSettings")}
              />
            </div>
          </div>

          {/* SECURITY / LOGIN ACTIVITY */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3>Security & Login Activity</h3>
              <button
                className={styles.linkBtn}
                onClick={() => setShowPasswordModal(true)}
              >
                Change Password
              </button>
            </div>

            <div className={styles.activityList}>
              {loginActivity.map((log) => (
                <div key={log.id} className={styles.activityRow}>
                  <div>
                    <b>{log.device}</b>
                    <p className={styles.smallText}>
                      {log.location} • {log.ip}
                    </p>
                  </div>
                  <span className={styles.activityTime}>{log.time}</span>
                </div>
              ))}
            </div>

            <p className={styles.mutedSmall}>
              If you see any suspicious login, immediately change your
              password and contact system support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------- REUSABLE PERMISSION TOGGLE ----------------

type PermissionToggleProps = {
  label: string;
  checked: boolean;
  onChange: () => void;
};

function PermissionToggle({ label, checked, onChange }: PermissionToggleProps) {
  return (
    <label className={styles.permissionItem}>
      <div>
        <span>{label}</span>
      </div>

      <div
        className={`${styles.switch} ${
          checked ? styles.switchOn : styles.switchOff
        }`}
        onClick={onChange}
      >
        <div className={styles.switchKnob} />
      </div>
    </label>
  );
}
