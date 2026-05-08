"use client";

import React, { useState, useEffect } from "react";
import {
  Clock,
  MapPin,
  CheckCircle,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Loader2,
  Zap,
  Timer,
  LayoutGrid,
  History,
} from "lucide-react";

export default function AttendancePage() {
  const [loading, setLoading] = useState(true);
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [attendanceData, setAttendanceData] = useState<any[]>([]);
  const [stats, setStats] = useState({
    avgHours: "0h 0m",
    onTimeRate: "0%",
    totalDays: "0",
  });

  // Real-time clock update
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch initial data
  useEffect(() => {
    // Simulating API Call
    setTimeout(() => {
      setStats({
        avgHours: "8h 15m",
        onTimeRate: "92%",
        totalDays: "22",
      });
      setAttendanceData([
        {
          date: "07 May, 2026",
          inTime: "09:25 AM",
          outTime: null,
          status: "Active",
          duration: "Ongoing",
        },
        {
          date: "06 May, 2026",
          inTime: "09:35 AM",
          outTime: "06:40 PM",
          status: "Late",
          duration: "9h 05m",
        },
        {
          date: "05 May, 2026",
          inTime: "09:15 AM",
          outTime: "06:10 PM",
          status: "On Time",
          duration: "8h 55m",
        },
        {
          date: "04 May, 2026",
          inTime: "09:28 AM",
          outTime: "06:30 PM",
          status: "On Time",
          duration: "9h 02m",
        },
        {
          date: "01 May, 2026",
          inTime: "10:05 AM",
          outTime: "07:15 PM",
          status: "Late",
          duration: "9h 10m",
        },
      ]);
      setIsClockedIn(true); // Default state for demo
      setLoading(false);
    }, 1000);
  }, []);

  const handleClockAction = async () => {
    try {
      // API call simulation
      // await api.post("/employee/attendance/mark", { type: isClockedIn ? "OUT" : "IN" });
      setIsClockedIn(!isClockedIn);

      // Optmistic update to top row if clocking out
      if (isClockedIn) {
        const newData = [...attendanceData];
        newData[0].outTime = currentTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        newData[0].status = "Completed";
        newData[0].duration = "8h 45m"; // Mock calculation
        setAttendanceData(newData);
      }
    } catch (err) {
      alert("Verification failed. Please try again.");
    }
  };

  if (loading) {
    return (
      <div
        style={{
          height: "100%",
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Loader2 className="animate-spin" color="#6366f1" size={40} />
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "32px",
        color: "#f1f5f9",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Header */}
      <header className="attendance-header">
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: "#22c55e",
              fontSize: 13,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 1.5,
              marginBottom: 8,
            }}
          >
            <Zap size={14} fill="#22c55e" /> Daily Log
          </div>
          <h1
            style={{
              fontSize: 32,
              fontWeight: 800,
              fontFamily: "'DM Serif Display', serif",
              color: "#fff",
            }}
          >
            Attendance Tracker
          </h1>
        </div>
        <button className="export-btn">
          <Download size={18} /> Export Log
        </button>
      </header>

      {/* Main Grid: Left (Stats + Table) | Right (Clock Widget) */}
      <div className="attendance-layout">
        {/* Left Column */}
        <div className="left-column">
          {/* Stats Section */}
          <div className="stats-grid">
            {[
              {
                label: "Avg Work Hours",
                value: stats.avgHours,
                icon: Timer,
                color: "#3b82f6",
                bg: "rgba(59, 130, 246, 0.1)",
              },
              {
                label: "On-Time Ratio",
                value: stats.onTimeRate,
                icon: CheckCircle,
                color: "#22c55e",
                bg: "rgba(34, 197, 94, 0.1)",
              },
              {
                label: "Present Days",
                value: stats.totalDays,
                icon: LayoutGrid,
                color: "#a855f7",
                bg: "rgba(168, 85, 247, 0.1)",
              },
            ].map((s, i) => (
              <div key={i} className="stat-card">
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: s.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 16,
                  }}
                >
                  <s.icon size={20} color={s.color} />
                </div>
                <p style={{ color: "#94a3b8", fontSize: 13, fontWeight: 600 }}>
                  {s.label}
                </p>
                <h3
                  style={{
                    fontSize: 26,
                    fontWeight: 700,
                    marginTop: 4,
                    color: "#f1f5f9",
                  }}
                >
                  {s.value}
                </h3>
              </div>
            ))}
          </div>

          {/* History Table */}
          <div className="history-section">
            <div className="history-header">
              <h3
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <History size={16} color="#a5b4fc" /> Recent Punches
              </h3>
            </div>
            <div className="table-responsive">
              <table className="premium-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Timeline</th>
                    <th>Status</th>
                    <th className="hide-mobile">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceData.map((row, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 600, color: "#f1f5f9" }}>
                        {row.date}
                      </td>
                      <td>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                          }}
                        >
                          <span
                            style={{
                              color: "#22c55e",
                              fontSize: 13,
                              display: "flex",
                              alignItems: "center",
                              gap: 4,
                              fontWeight: 600,
                            }}
                          >
                            <ArrowUpRight size={14} /> {row.inTime}
                          </span>
                          <span style={{ color: "#64748b" }}>—</span>
                          <span
                            style={{
                              color: row.outTime ? "#ef4444" : "#64748b",
                              fontSize: 13,
                              display: "flex",
                              alignItems: "center",
                              gap: 4,
                              fontWeight: row.outTime ? 600 : 400,
                            }}
                          >
                            <ArrowDownRight size={14} />{" "}
                            {row.outTime || "Active Now"}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span
                          style={{
                            background:
                              row.status === "Late"
                                ? "rgba(245, 158, 11, 0.1)"
                                : "rgba(34, 197, 94, 0.1)",
                            color:
                              row.status === "Late" ? "#f59e0b" : "#22c55e",
                            padding: "6px 12px",
                            borderRadius: "8px",
                            fontSize: 12,
                            fontWeight: 700,
                          }}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td className="hide-mobile" style={{ color: "#94a3b8" }}>
                        {row.duration}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Clock Widget */}
        <div className="right-column">
          {/* Interactive Clock Card */}
          <div className="clock-widget">
            <p
              style={{
                color: "#6366f1",
                fontWeight: 700,
                fontSize: 12,
                letterSpacing: 1.5,
                marginBottom: 8,
                textTransform: "uppercase",
              }}
            >
              Current Session
            </p>
            <h2
              style={{
                fontSize: 42,
                fontWeight: 800,
                fontFamily: "'DM Serif Display', serif",
                marginBottom: 32,
                color: isClockedIn ? "#22c55e" : "#f1f5f9",
                textShadow: isClockedIn
                  ? "0 0 20px rgba(34, 197, 94, 0.4)"
                  : "none",
                transition: "all 0.3s ease",
              }}
            >
              {currentTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </h2>

            {/* Glowing Orb Button */}
            <div className="orb-container">
              {/* Spinning borders */}
              <div
                className="orb-ring ring-1"
                style={{
                  borderColor: isClockedIn
                    ? "rgba(34, 197, 94, 0.3)"
                    : "rgba(99, 102, 241, 0.3)",
                }}
              ></div>
              <div
                className="orb-ring ring-2"
                style={{
                  borderColor: isClockedIn
                    ? "rgba(34, 197, 94, 0.5)"
                    : "rgba(99, 102, 241, 0.5)",
                }}
              ></div>

              <button
                onClick={handleClockAction}
                className={`orb-btn ${isClockedIn ? "clocked-in" : "clocked-out"}`}
              >
                <Clock size={36} />
                <span>{isClockedIn ? "Clock Out" : "Clock In"}</span>
              </button>
            </div>

            <div className="location-badge">
              <MapPin size={14} color="#6366f1" /> HQ - Sector 62 (Verified)
            </div>
          </div>

          {/* System Alert */}
          <div className="system-alert">
            <div
              style={{
                flexShrink: 0,
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "rgba(245, 158, 11, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AlertCircle size={18} color="#f59e0b" />
            </div>
            <p style={{ fontSize: 13, color: "#cbd5e1", lineHeight: 1.6 }}>
              <b style={{ color: "#f59e0b" }}>Note:</b> Regular punch-in time is
              09:30 AM. Repeated late entries may require manager approval.
            </p>
          </div>
        </div>
      </div>

      {/* --- CSS STYLING --- */}
      <style>{`
        /* Header */
        .attendance-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 32px;
        }
        .export-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 10px 16px;
          border-radius: 12px;
          color: #f1f5f9;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .export-btn:hover { background: rgba(255, 255, 255, 0.1); }

        /* Layout Grid */
        .attendance-layout {
          display: grid;
          grid-template-columns: 1fr 350px;
          gap: 32px;
        }
        .left-column { display: flex; flex-direction: column; gap: 32px; }
        .right-column { display: flex; flex-direction: column; gap: 24px; }

        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .stat-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          padding: 24px;
          backdrop-filter: blur(10px);
        }

        /* History Section */
        .history-section {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          overflow: hidden;
        }
        .history-header {
          padding: 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        .table-responsive { overflow-x: auto; }
        .premium-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }
        .premium-table th {
          padding: 16px 24px;
          background: rgba(0, 0, 0, 0.2);
          color: #64748b;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 600;
        }
        .premium-table td {
          padding: 20px 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.03);
          font-size: 14px;
        }
        .premium-table tr:hover td { background: rgba(255, 255, 255, 0.02); }

        /* Clock Widget (The Hero Element) */
        .clock-widget {
          background: linear-gradient(165deg, #0f172a 0%, #05070a 100%);
          border-radius: 28px;
          padding: 40px 24px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          text-align: center;
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.5);
          position: relative;
          overflow: hidden;
        }

        /* Orb Animation Setup */
        .orb-container {
          position: relative;
          width: 200px;
          height: 200px;
          margin: 0 auto 40px auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .orb-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 2px dashed transparent;
          transition: border-color 0.4s ease;
        }
        .ring-1 { animation: spin 15s linear infinite; }
        .ring-2 { inset: 10px; border-style: solid; opacity: 0.3; animation: spin 25s linear reverse infinite; }

        .orb-btn {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          border: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: #fff;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .orb-btn span { font-size: 18px; font-weight: 800; }

        .clocked-out {
          background: linear-gradient(135deg, #6366f1, #4338ca);
          box-shadow: 0 15px 35px rgba(99, 102, 241, 0.4);
        }
        .clocked-in {
          background: linear-gradient(135deg, #ef4444, #b91c1c);
          box-shadow: 0 15px 35px rgba(239, 68, 68, 0.4);
        }
        .orb-btn:active { transform: scale(0.9); }

        .location-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.03);
          padding: 8px 16px;
          border-radius: 12px;
          color: #94a3b8;
          font-size: 13px;
          font-weight: 600;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        /* Alert Box */
        .system-alert {
          background: rgba(245, 158, 11, 0.05);
          border: 1px solid rgba(245, 158, 11, 0.1);
          border-radius: 20px;
          padding: 20px;
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }

        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        /* --- RESPONSIVE MEDIA QUERIES --- */
        @media (max-width: 1024px) {
          .attendance-layout { grid-template-columns: 1fr; }
          .right-column { flex-direction: row; }
          .clock-widget { flex: 1; }
          .system-alert { flex: 1; }
        }

        @media (max-width: 768px) {
          .attendance-header { flex-direction: column; align-items: flex-start; gap: 16px; }
          .export-btn { width: 100%; justify-content: center; }
          .stats-grid { grid-template-columns: 1fr; }
          .right-column { flex-direction: column; }
          .hide-mobile { display: none; }
        }
      `}</style>
    </div>
  );
}
