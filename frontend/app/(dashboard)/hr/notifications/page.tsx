"use client";

import { useState, useMemo } from "react";
import styles from "./hrNotifications.module.css";

export default function HrNotifications() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "leave",
      title: "Leave Request Pending",
      message: "Sarah Khan requested Casual Leave for Feb 15.",
      time: "10 mins ago",
      unread: true,
    },
    {
      id: 2,
      type: "attendance",
      title: "Late Mark Alert",
      message: "Rohit Sharma marked Late today.",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      type: "payroll",
      title: "Payroll Reminder",
      message: "Payroll processing pending for 1 employee.",
      time: "Yesterday",
      unread: false,
    },
    {
      id: 4,
      type: "birthday",
      title: "Birthday Reminder",
      message: "Ayesha Ali has a birthday tomorrow.",
      time: "2 days ago",
      unread: false,
    },
    {
      id: 5,
      type: "system",
      title: "System Update",
      message: "New HRMS version 2.4 has been deployed.",
      time: "2 days ago",
      unread: false,
    },
  ]);

  // FILTER + SEARCH
  const filtered = useMemo(() => {
    return notifications.filter((n) => {
      const matchesSearch =
        n.title.toLowerCase().includes(search.toLowerCase()) ||
        n.message.toLowerCase().includes(search.toLowerCase());

      const matchesFilter = filter ? n.type === filter : true;

      return matchesSearch && matchesFilter;
    });
  }, [notifications, search, filter]);

  // MARK SINGLE AS READ
  function markRead(id: number) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  }

  // MARK ALL AS READ
  function markAll() {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  }

  return (
    <div className={styles.container}>
      <h2>Notifications</h2>

      {/* Actions */}
      <div className={styles.topBar}>
        <input
          className={styles.search}
          placeholder="Search notifications..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className={styles.filter}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="leave">Leave</option>
          <option value="attendance">Attendance</option>
          <option value="payroll">Payroll</option>
          <option value="birthday">Birthday</option>
          <option value="system">System</option>
        </select>

        <button className={styles.markAllBtn} onClick={markAll}>
          Mark All as Read
        </button>
      </div>

      {/* Notification List */}
      <div className={styles.list}>
        {filtered.map((n) => (
          <div
            key={n.id}
            className={`${styles.card} ${n.unread ? styles.unread : ""}`}
            onClick={() => markRead(n.id)}
          >
            <div className={styles.left}>
              <h4>{n.title}</h4>
              <p>{n.message}</p>
              <span className={styles.time}>{n.time}</span>
            </div>

            <span
              className={`${styles.typeTag} ${
                styles[n.type] || styles.system
              }`}
            >
              {n.type.toUpperCase()}
            </span>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className={styles.empty}>No notifications found.</p>
        )}
      </div>
    </div>
  );
}
