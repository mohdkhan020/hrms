"use client";

import React, { useEffect, useState } from "react";
import {
  Bell,
  Calendar,
  Clock,
  FileText,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  Briefcase,
  Award,
  Download,
  LogOut,
  Settings,
  Home,
  Users,
  DollarSign,
} from "lucide-react";
import api from "@/utils/api";
import { useAuth } from "@/context/AuthContext";

// ─── Mock Data ────────────────────────────────────────────────────────────────
// const employee = {
//   name: "Adil Khan",
//   role: "Full Stack Developer",
//   department: "Engineering",
//   employeeId: "EMP-2024-047",
//   avatar: "AK",
//   joinDate: "March 2022",
// };

const stats = [
  {
    label: "Present Days",
    value: "22",
    total: "26",
    icon: CheckCircle,
    color: "#22c55e",
  },
  {
    label: "Leaves Left",
    value: "8",
    total: "12",
    icon: Calendar,
    color: "#f59e0b",
  },
  {
    label: "Tasks Done",
    value: "34",
    total: "40",
    icon: Briefcase,
    color: "#3b82f6",
  },
  {
    label: "Overtime Hrs",
    value: "6",
    total: "",
    icon: Clock,
    color: "#a855f7",
  },
];

const recentActivity = [
  {
    type: "leave",
    msg: "Leave approved — May 3 to May 5",
    time: "2 days ago",
    status: "approved",
  },
  {
    type: "payslip",
    msg: "April 2025 payslip generated",
    time: "5 days ago",
    status: "info",
  },
  {
    type: "task",
    msg: "Task 'Dashboard redesign' marked complete",
    time: "1 week ago",
    status: "done",
  },
  {
    type: "alert",
    msg: "Attendance marked late on Apr 28",
    time: "1 week ago",
    status: "warning",
  },
];

const upcomingLeaves = [
  { name: "Rahul Verma", from: "May 10", to: "May 12", type: "Sick Leave" },
  { name: "Priya Singh", from: "May 14", to: "May 14", type: "Casual Leave" },
];

const tasks = [
  { label: "Complete Q2 performance review", due: "May 10", done: false },
  { label: "Submit timesheet for April", due: "May 5", done: true },
  { label: "Update project docs on Confluence", due: "May 15", done: false },
  { label: "Attend onboarding session", due: "May 8", done: true },
];

function StatCard({ stat }: { stat: (typeof stats)[0] }) {
  const pct = stat.total ? Math.round((+stat.value / +stat.total) * 100) : null;
  return (
    <div
      style={{
        background: "#0f1117",
        border: "1px solid #1e2130",
        borderRadius: 16,
        padding: "20px 22px",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* glow */}
      <div
        style={{
          position: "absolute",
          top: -20,
          right: -20,
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: stat.color + "22",
          filter: "blur(20px)",
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div>
          <p
            style={{
              color: "#6b7280",
              fontSize: 13,
              fontFamily: "'DM Sans',sans-serif",
              margin: 0,
            }}
          >
            {stat.label}
          </p>
          <h3
            style={{
              color: "#f1f5f9",
              fontSize: 32,
              fontWeight: 800,
              fontFamily: "'DM Serif Display',serif",
              margin: "4px 0 0",
            }}
          >
            {stat.value}
            {stat.total && (
              <span
                style={{
                  fontSize: 16,
                  color: "#6b7280",
                  fontFamily: "'DM Sans',sans-serif",
                  fontWeight: 400,
                }}
              >
                /{stat.total}
              </span>
            )}
          </h3>
        </div>
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 12,
            background: stat.color + "22",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <stat.icon size={20} color={stat.color} />
        </div>
      </div>
      {pct !== null && (
        <div>
          <div
            style={{
              height: 6,
              background: "#1e2130",
              borderRadius: 99,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${pct}%`,
                background: stat.color,
                borderRadius: 99,
                transition: "width 1s ease",
              }}
            />
          </div>
          <p
            style={{
              color: "#6b7280",
              fontSize: 12,
              margin: "6px 0 0",
              fontFamily: "'DM Sans',sans-serif",
            }}
          >
            {pct}% of month
          </p>
        </div>
      )}
    </div>
  );
}

export default function EmployeeDashboard() {
  const [notifOpen, setNotifOpen] = useState(false);
  const [employee, setEmployee] = useState({
    name: "Adil Khan",
    role: "Full Stack Developer",
    department: "Engineering",
    employeeId: "EMP-2024-047",
    avatar: "AK",
    joinDate: "March 2022",
    profileImage: "",
  });

  const { user } = useAuth(); // AuthContext se
  const [profileImage, setProfileImage] = useState("");
  const [uploading, setUploading] = useState(false);

useEffect(() => {
  if (user?.profile_image) {
    setProfileImage(user.profile_image);
  }
}, [user]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];

      if (!file) return;

      // ✅ instant preview
      const previewUrl = URL.createObjectURL(file);
      setProfileImage(previewUrl);

      const formData = new FormData();
      formData.append("image", file);
      setUploading(true);
      const res = await fetch(
        `http://localhost:7001/api/upload/${user?._id}`,
        {
          method: "POST",
          body: formData,
        },
      );
      const data = await res.json();

      console.log("data===>", data);

      // ✅ final backend image url
      setProfileImage(data?.user?.profile_image);
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #080b12; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0f1117; }
        ::-webkit-scrollbar-thumb { background: #2a2f45; border-radius: 4px; }
      `}</style>

      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          background: "#080b12",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* <Sidebar /> */}

        {/* Main */}
        <main style={{ flex: 1, padding: "32px 36px", overflowY: "auto" }}>
          {/* Top Bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 36,
            }}
          >
            <div>
              <p style={{ color: "#6b7280", fontSize: 13 }}>
                Thursday, May 7, 2025
              </p>
              <h1
                style={{
                  color: "#f1f5f9",
                  fontSize: 26,
                  fontWeight: 700,
                  fontFamily: "'DM Serif Display',serif",
                  marginTop: 2,
                }}
              >
                Good morning, {employee.name.split(" ")[0]} 👋
              </h1>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              {/* Notif Bell */}
              <div
                style={{ position: "relative", cursor: "pointer" }}
                onClick={() => setNotifOpen(!notifOpen)}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 12,
                    background: "#0f1117",
                    border: "1px solid #1e2130",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Bell size={18} color="#a78bfa" />
                </div>
                <span
                  style={{
                    position: "absolute",
                    top: -4,
                    right: -4,
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    background: "#ef4444",
                    fontSize: 9,
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                  }}
                >
                  3
                </span>
              </div>

              {/* Avatar */}
              {/* <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 12,
                  background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 15, fontWeight: 700, color: "#fff",
                }}>{employee.avatar}</div>
                <div>
                  <p style={{ color: "#f1f5f9", fontSize: 14, fontWeight: 600 }}>{employee.name}</p>
                  <p style={{ color: "#6b7280", fontSize: 12 }}>{employee.role}</p>
                </div>
              </div> */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <label
                  htmlFor="profileUpload"
                  style={{
                    position: "relative",
                    cursor: "pointer",
                  }}
                >
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="profile"
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: 12,
                        objectFit: "cover",
                        border: "2px solid #6366f1",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: 12,
                        background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 15,
                        fontWeight: 700,
                        color: "#fff",
                      }}
                    >
                      {employee.avatar}
                    </div>
                  )}

                  {/* Upload Loader */}
                  {uploading && (
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "#00000099",
                        borderRadius: 12,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        fontSize: 10,
                      }}
                    >
                      Uploading...
                    </div>
                  )}
                </label>

                <input
                  id="profileUpload"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                />

                <div>
                  <p
                    style={{
                      color: "#f1f5f9",
                      fontSize: 14,
                      fontWeight: 600,
                    }}
                  >
                    {employee.name}
                  </p>

                  <p
                    style={{
                      color: "#6b7280",
                      fontSize: 12,
                    }}
                  >
                    {employee.role}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: 20,
              marginBottom: 32,
            }}
          >
            {stats.map((s) => (
              <StatCard key={s.label} stat={s} />
            ))}
          </div>

          {/* Middle Row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 24,
              marginBottom: 24,
            }}
          >
            {/* Recent Activity */}
            <div
              style={{
                background: "#0f1117",
                border: "1px solid #1e2130",
                borderRadius: 16,
                padding: "22px 24px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 20,
                }}
              >
                <h2 style={{ color: "#f1f5f9", fontSize: 16, fontWeight: 700 }}>
                  Recent Activity
                </h2>
                <span
                  style={{ color: "#6366f1", fontSize: 13, cursor: "pointer" }}
                >
                  View all
                </span>
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                {recentActivity.map((a, i) => {
                  const colorMap: Record<string, string> = {
                    approved: "#22c55e",
                    info: "#3b82f6",
                    done: "#22c55e",
                    warning: "#f59e0b",
                  };
                  return (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 14,
                      }}
                    >
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 10,
                          flexShrink: 0,
                          background: colorMap[a.status] + "22",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {a.status === "warning" ? (
                          <AlertCircle size={16} color={colorMap[a.status]} />
                        ) : (
                          <CheckCircle size={16} color={colorMap[a.status]} />
                        )}
                      </div>
                      <div style={{ flex: 1 }}>
                        <p
                          style={{
                            color: "#e2e8f0",
                            fontSize: 13,
                            lineHeight: 1.5,
                          }}
                        >
                          {a.msg}
                        </p>
                        <p
                          style={{
                            color: "#4b5563",
                            fontSize: 12,
                            marginTop: 3,
                          }}
                        >
                          {a.time}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* My Tasks */}
            <div
              style={{
                background: "#0f1117",
                border: "1px solid #1e2130",
                borderRadius: 16,
                padding: "22px 24px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 20,
                }}
              >
                <h2 style={{ color: "#f1f5f9", fontSize: 16, fontWeight: 700 }}>
                  My Tasks
                </h2>
                <span
                  style={{
                    background: "#6366f120",
                    color: "#a78bfa",
                    fontSize: 12,
                    fontWeight: 600,
                    padding: "3px 10px",
                    borderRadius: 99,
                  }}
                >
                  {tasks.filter((t) => !t.done).length} pending
                </span>
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 14 }}
              >
                {tasks.map((t, i) => (
                  <div
                    key={i}
                    style={{ display: "flex", alignItems: "center", gap: 12 }}
                  >
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 6,
                        flexShrink: 0,
                        border: t.done ? "none" : "2px solid #374151",
                        background: t.done ? "#22c55e" : "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {t.done && (
                        <CheckCircle size={13} color="#fff" strokeWidth={3} />
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p
                        style={{
                          color: t.done ? "#4b5563" : "#e2e8f0",
                          fontSize: 13,
                          textDecoration: t.done ? "line-through" : "none",
                        }}
                      >
                        {t.label}
                      </p>
                    </div>
                    <span
                      style={{
                        color: "#6b7280",
                        fontSize: 11,
                        whiteSpace: "nowrap",
                      }}
                    >
                      Due {t.due}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.4fr 1fr",
              gap: 24,
            }}
          >
            {/* Payslip Card */}
            <div
              style={{
                background: "linear-gradient(135deg, #312e81 0%, #1e1b4b 100%)",
                border: "1px solid #3730a3",
                borderRadius: 16,
                padding: "24px 26px",
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <p style={{ color: "#a5b4fc", fontSize: 13 }}>
                    Latest Payslip
                  </p>
                  <h2
                    style={{
                      color: "#f1f5f9",
                      fontSize: 22,
                      fontWeight: 800,
                      fontFamily: "'DM Serif Display',serif",
                      marginTop: 4,
                    }}
                  >
                    April 2025
                  </h2>
                </div>
                <TrendingUp size={28} color="#a78bfa" />
              </div>

              <div style={{ display: "flex", gap: 32 }}>
                {[
                  ["Gross Salary", "₹85,000"],
                  ["Deductions", "₹12,300"],
                  ["Net Pay", "₹72,700"],
                ].map(([l, v]) => (
                  <div key={l}>
                    <p style={{ color: "#818cf8", fontSize: 12 }}>{l}</p>
                    <p
                      style={{
                        color: "#f1f5f9",
                        fontSize: 16,
                        fontWeight: 700,
                        marginTop: 4,
                      }}
                    >
                      {v}
                    </p>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: 12 }}>
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    background: "#6366f1",
                    color: "#fff",
                    border: "none",
                    borderRadius: 10,
                    padding: "10px 20px",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "'DM Sans',sans-serif",
                  }}
                >
                  <Download size={15} /> Download PDF
                </button>
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    background: "transparent",
                    color: "#a5b4fc",
                    border: "1px solid #4338ca",
                    borderRadius: 10,
                    padding: "10px 20px",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "'DM Sans',sans-serif",
                  }}
                >
                  View History <ChevronRight size={15} />
                </button>
              </div>
            </div>

            {/* Team On Leave */}
            <div
              style={{
                background: "#0f1117",
                border: "1px solid #1e2130",
                borderRadius: 16,
                padding: "22px 24px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 20,
                }}
              >
                <h2 style={{ color: "#f1f5f9", fontSize: 16, fontWeight: 700 }}>
                  Team on Leave
                </h2>
                <Award size={18} color="#f59e0b" />
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 14 }}
              >
                {upcomingLeaves.map((l, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      background: "#080b12",
                      borderRadius: 12,
                      padding: "12px 14px",
                    }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 10,
                        background: `hsl(${i * 60 + 200},70%,30%)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#fff",
                      }}
                    >
                      {l.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p
                        style={{
                          color: "#e2e8f0",
                          fontSize: 13,
                          fontWeight: 600,
                        }}
                      >
                        {l.name}
                      </p>
                      <p style={{ color: "#6b7280", fontSize: 12 }}>
                        {l.from} — {l.to}
                      </p>
                    </div>
                    <span
                      style={{
                        background: "#1e2130",
                        color: "#9ca3af",
                        fontSize: 11,
                        padding: "3px 8px",
                        borderRadius: 6,
                      }}
                    >
                      {l.type}
                    </span>
                  </div>
                ))}
                <p
                  style={{
                    color: "#4b5563",
                    fontSize: 12,
                    textAlign: "center",
                    marginTop: 4,
                  }}
                >
                  <Users
                    size={13}
                    style={{
                      display: "inline",
                      marginRight: 4,
                      verticalAlign: "middle",
                    }}
                  />
                  2 teammates on leave this week
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
