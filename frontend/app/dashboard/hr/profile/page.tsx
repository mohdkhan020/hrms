"use client";

import { useState } from "react";
import styles from "./hrProfile.module.css";

export default function HrProfile() {
  const [profile, setProfile] = useState({
    name: "Mak HR",
    email: "mak.hr@example.com",
    phone: "9876543210",
    employeeId: "HR1023",
    department: "Human Resource",
    joinDate: "2023-05-10",
  });

  const [photo, setPhoto] = useState("/default-avatar.png");
  const [passwords, setPasswords] = useState({
    oldPass: "",
    newPass: "",
    confirmPass: "",
  });

  const [docs, setDocs] = useState({
    aadhar: null,
    pan: null,
  });

  function handlePhotoUpload(e: any) {
    const file = e.target.files[0];
    if (!file) return;
    setPhoto(URL.createObjectURL(file));
  }

  function saveProfile() {
    alert("Profile updated successfully!");
  }

  function changePassword() {
    if (passwords.newPass !== passwords.confirmPass) {
      alert("New passwords do not match!");
      return;
    }
    alert("Password changed successfully!");
  }

  function uploadDocument(type: string, file: File) {
    setDocs({ ...docs, [type]: file });
    alert(type.toUpperCase() + " uploaded successfully!");
  }

  return (
    <div className={styles.container}>
      <h2>My Profile</h2>

      {/* Profile Header */}
      <div className={styles.profileHeader}>
        <img src={photo} alt="Profile" className={styles.avatar} />

        <div>
          <h3>{profile.name}</h3>
          <p>{profile.email}</p>

          <label className={styles.uploadBtn}>
            📤 Upload Photo
            <input type="file" accept="image/*" onChange={handlePhotoUpload} />
          </label>
        </div>
      </div>

      {/* PERSONAL INFO */}
      <div className={styles.section}>
        <h3>Personal Information</h3>

        <div className={styles.row}>
          <div className={styles.fieldGroup}>
            <label>Name</label>
            <input
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
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
        </div>

        <div className={styles.row}>
          <div className={styles.fieldGroup}>
            <label>Phone</label>
            <input
              value={profile.phone}
              onChange={(e) =>
                setProfile({ ...profile, phone: e.target.value })
              }
            />
          </div>

          <div className={styles.fieldGroup}>
            <label>Employee ID</label>
            <input value={profile.employeeId} disabled />
          </div>
        </div>
      </div>

      {/* WORK INFO */}
      <div className={styles.section}>
        <h3>Work Information</h3>

        <div className={styles.row}>
          <div className={styles.fieldGroup}>
            <label>Department</label>
            <input value={profile.department} disabled />
          </div>

          <div className={styles.fieldGroup}>
            <label>Date of Joining</label>
            <input value={profile.joinDate} disabled />
          </div>
        </div>
      </div>

      {/* CHANGE PASSWORD */}
      <div className={styles.section}>
        <h3>Change Password</h3>

        <div className={styles.row}>
          <div className={styles.fieldGroup}>
            <label>Old Password</label>
            <input
              type="password"
              value={passwords.oldPass}
              onChange={(e) =>
                setPasswords({ ...passwords, oldPass: e.target.value })
              }
            />
          </div>

          <div className={styles.fieldGroup}>
            <label>New Password</label>
            <input
              type="password"
              value={passwords.newPass}
              onChange={(e) =>
                setPasswords({ ...passwords, newPass: e.target.value })
              }
            />
          </div>

          <div className={styles.fieldGroup}>
            <label>Confirm Password</label>
            <input
              type="password"
              value={passwords.confirmPass}
              onChange={(e) =>
                setPasswords({ ...passwords, confirmPass: e.target.value })
              }
            />
          </div>
        </div>

        <button className={styles.saveBtn} onClick={changePassword}>
          Update Password
        </button>
      </div>

      {/* DOCUMENTS */}
      <div className={styles.section}>
        <h3>Documents</h3>

        <div className={styles.docsRow}>
          <div className={styles.docCard}>
            <h4>Aadhar Card</h4>
            <label className={styles.uploadDocBtn}>
              Upload
              {/* <input
                type="file"
                onChange={(e) => uploadDocument("aadhar", e.target.files[0])}
              /> */}
              <input
                type="file"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return; // Prevent error
                  uploadDocument("aadhar", file);
                }}
              />
            </label>
            {docs.aadhar && <p className={styles.docSuccess}>Uploaded ✓</p>}
          </div>

          <div className={styles.docCard}>
            <h4>PAN Card</h4>
            <label className={styles.uploadDocBtn}>
              Upload
              {/* <input
                type="file"
                onChange={(e) => uploadDocument("pan", e.target.files[0])}
              /> */}
              <input
                type="file"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return; // Prevent error
                  uploadDocument("pan", file);
                }}
              />
            </label>
            {docs.pan && <p className={styles.docSuccess}>Uploaded ✓</p>}
          </div>
        </div>
      </div>

      {/* SAVE BUTTON */}
      <button className={styles.saveBtn} onClick={saveProfile}>
        Save Profile
      </button>
    </div>
  );
}
