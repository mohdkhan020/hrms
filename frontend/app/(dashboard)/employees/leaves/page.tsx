"use client";

import React, { useState, useEffect } from "react";
import {
  CalendarDays,
  CheckCircle,
  Clock,
  XCircle,
  Plus,
  Loader2,
  Umbrella,
  Activity,
  ChevronRight,
  X,
  Calendar as CalendarIcon,
} from "lucide-react";

export default function LeavesPage() {
  const [loading, setLoading] = useState(true);
  const [leaveBalances, setLeaveBalances] = useState<any[]>([]);
  const [leaveHistory, setLeaveHistory] = useState<any[]>([]);

  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leaveForm, setLeaveForm] = useState({
    type: "Paid Leave",
    startDate: "",
    endDate: "",
    reason: "",
  });

  useEffect(() => {
    // Simulate fetching data from backend
    setTimeout(() => {
      setLeaveBalances([
        { type: "Paid Leaves (PL)", total: 15, used: 4, color: "#3b82f6" },
        { type: "Sick Leaves (SL)", total: 7, used: 2, color: "#22c55e" },
        { type: "Casual Leaves (CL)", total: 7, used: 5, color: "#a855f7" },
      ]);
      setLeaveHistory([
        {
          id: "REQ-001",
          dates: "12 May - 14 May, 2026",
          days: 3,
          type: "Sick Leave",
          status: "Approved",
          appliedOn: "10 May, 2026",
        },
        {
          id: "REQ-002",
          dates: "20 Jun - 20 Jun, 2026",
          days: 1,
          type: "Casual Leave",
          status: "Pending",
          appliedOn: "18 Jun, 2026",
        },
        {
          id: "REQ-003",
          dates: "01 Apr - 05 Apr, 2026",
          days: 5,
          type: "Paid Leave",
          status: "Approved",
          appliedOn: "15 Mar, 2026",
        },
        {
          id: "REQ-004",
          dates: "14 Feb - 15 Feb, 2026",
          days: 2,
          type: "Casual Leave",
          status: "Rejected",
          appliedOn: "10 Feb, 2026",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return {
          bg: "rgba(34, 197, 94, 0.1)",
          text: "#22c55e",
          icon: <CheckCircle size={14} />,
        };
      case "Pending":
        return {
          bg: "rgba(245, 158, 11, 0.1)",
          text: "#f59e0b",
          icon: <Clock size={14} />,
        };
      case "Rejected":
        return {
          bg: "rgba(239, 68, 68, 0.1)",
          text: "#ef4444",
          icon: <XCircle size={14} />,
        };
      default:
        return {
          bg: "rgba(255,255,255,0.1)",
          text: "#fff",
          icon: <Clock size={14} />,
        };
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    return new Date(dateStr).toLocaleDateString("en-GB", options);
  };

  const calculateDays = (start: string, end: string) => {
    if (!start || !end) return 0;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = endDate.getTime() - startDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays > 0 ? diffDays : 0;
  };

  const handleApplyLeave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leaveForm.startDate || !leaveForm.endDate)
      return alert("Please select dates");

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const daysCount = calculateDays(leaveForm.startDate, leaveForm.endDate);
      const newLeave = {
        id: `REQ-00${leaveHistory.length + 1}`,
        dates: `${formatDate(leaveForm.startDate)} - ${formatDate(leaveForm.endDate)}`,
        days: daysCount,
        type: leaveForm.type,
        status: "Pending",
        appliedOn: formatDate(new Date().toISOString()),
      };

      setLeaveHistory([newLeave, ...leaveHistory]);
      setLeaveForm({
        type: "Paid Leave",
        startDate: "",
        endDate: "",
        reason: "",
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      alert("Failed to apply leave");
    } finally {
      setIsSubmitting(false);
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
      <header className="leaves-header">
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: "#6366f1",
              fontSize: 13,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 1.5,
              marginBottom: 8,
            }}
          >
            <Umbrella size={14} /> Time Off Management
          </div>
          <h1
            style={{
              fontSize: 32,
              fontWeight: 800,
              fontFamily: "'DM Serif Display', serif",
              color: "#fff",
            }}
          >
            My Leaves
          </h1>
        </div>

        <button onClick={() => setIsModalOpen(true)} className="apply-btn">
          <Plus size={18} /> Apply Leave
        </button>
      </header>

      {/* Leave Balances Grid */}
      <div className="leaves-grid">
        {leaveBalances.map((balance, index) => {
          const percentage = Math.round((balance.used / balance.total) * 100);
          return (
            <div key={index} className="balance-card">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 24,
                }}
              >
                <h3 style={{ fontSize: 15, fontWeight: 600, color: "#e2e8f0" }}>
                  {balance.type}
                </h3>
                <div
                  style={{
                    background: `${balance.color}15`,
                    color: balance.color,
                    padding: "4px 10px",
                    borderRadius: "8px",
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  {balance.total - balance.used} Left
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: 8,
                  marginBottom: 16,
                }}
              >
                <span
                  style={{
                    fontSize: 32,
                    fontWeight: 800,
                    fontFamily: "'DM Serif Display', serif",
                    lineHeight: 1,
                  }}
                >
                  {balance.used}
                </span>
                <span
                  style={{ color: "#64748b", fontSize: 13, paddingBottom: 4 }}
                >
                  / {balance.total} Used
                </span>
              </div>

              <div
                style={{
                  height: 6,
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: 10,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${percentage}%`,
                    background: balance.color,
                    borderRadius: 10,
                    boxShadow: `0 0 10px ${balance.color}88`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Leave History Table */}
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
            <Activity size={16} color="#a5b4fc" /> Leave Request History
          </h3>
          <span
            style={{
              color: "#6366f1",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            View Policy <ChevronRight size={14} />
          </span>
        </div>

        <div className="table-responsive">
          <table className="premium-table">
            <thead>
              <tr>
                <th>Date Range</th>
                <th>Leave Type</th>
                <th>Duration</th>
                <th className="hide-mobile">Applied On</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {leaveHistory.map((req, i) => {
                const statusStyle = getStatusColor(req.status);
                return (
                  <tr key={i}>
                    <td>
                      <div
                        style={{
                          fontWeight: 600,
                          color: "#f1f5f9",
                          marginBottom: 4,
                        }}
                      >
                        {req.dates}
                      </div>
                      <div style={{ fontSize: 12, color: "#64748b" }}>
                        ID: {req.id}
                      </div>
                    </td>
                    <td style={{ color: "#e2e8f0", fontWeight: 500 }}>
                      {req.type}
                    </td>
                    <td style={{ color: "#94a3b8" }}>
                      {req.days} Day{req.days > 1 ? "s" : ""}
                    </td>
                    <td
                      className="hide-mobile"
                      style={{ color: "#94a3b8", fontSize: 13 }}
                    >
                      {req.appliedOn}
                    </td>
                    <td>
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          background: statusStyle.bg,
                          color: statusStyle.text,
                          padding: "6px 12px",
                          borderRadius: "8px",
                          fontSize: 12,
                          fontWeight: 700,
                        }}
                      >
                        {statusStyle.icon} {req.status}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- Apply Leave Modal --- */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setIsModalOpen(false)}
            >
              <X size={20} />
            </button>

            <h2
              style={{
                fontSize: 22,
                fontWeight: 700,
                fontFamily: "'DM Serif Display', serif",
                marginBottom: 8,
              }}
            >
              Apply for Leave
            </h2>
            <p style={{ color: "#94a3b8", fontSize: 13, marginBottom: 24 }}>
              Submit your time-off request for manager approval.
            </p>

            <form
              onSubmit={handleApplyLeave}
              style={{ display: "flex", flexDirection: "column", gap: 20 }}
            >
              <div>
                <label className="input-label">Leave Type</label>
                <select
                  className="premium-input"
                  value={leaveForm.type}
                  onChange={(e) =>
                    setLeaveForm({ ...leaveForm, type: e.target.value })
                  }
                >
                  <option value="Paid Leave">Paid Leave (PL)</option>
                  <option value="Sick Leave">Sick Leave (SL)</option>
                  <option value="Casual Leave">Casual Leave (CL)</option>
                </select>
              </div>

              <div className="date-grid">
                <div>
                  <label className="input-label">Start Date</label>
                  <div style={{ position: "relative" }}>
                    <CalendarIcon
                      size={16}
                      color="#64748b"
                      style={{
                        position: "absolute",
                        left: 14,
                        top: "50%",
                        transform: "translateY(-50%)",
                        pointerEvents: "none",
                      }}
                    />
                    <input
                      type="date"
                      required
                      className="premium-input date-input"
                      value={leaveForm.startDate}
                      onChange={(e) =>
                        setLeaveForm({
                          ...leaveForm,
                          startDate: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div>
                  <label className="input-label">End Date</label>
                  <div style={{ position: "relative" }}>
                    <CalendarIcon
                      size={16}
                      color="#64748b"
                      style={{
                        position: "absolute",
                        left: 14,
                        top: "50%",
                        transform: "translateY(-50%)",
                        pointerEvents: "none",
                      }}
                    />
                    <input
                      type="date"
                      required
                      className="premium-input date-input"
                      value={leaveForm.endDate}
                      onChange={(e) =>
                        setLeaveForm({ ...leaveForm, endDate: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="input-label">Reason (Optional)</label>
                <textarea
                  rows={3}
                  className="premium-input"
                  placeholder="Provide a brief reason..."
                  value={leaveForm.reason}
                  onChange={(e) =>
                    setLeaveForm({ ...leaveForm, reason: e.target.value })
                  }
                  style={{ resize: "none" }}
                />
              </div>

              <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-cancel"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-submit"
                >
                  {isSubmitting ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    "Submit Request"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- CSS STYLING --- */}
      <style>{`
        /* Header */
        .leaves-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 32px;
        }
        .apply-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #6366f1, #4338ca);
          border: none;
          padding: 12px 20px;
          border-radius: 12px;
          color: #fff;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.4);
          transition: all 0.3s ease;
        }
        .apply-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 30px -5px rgba(99, 102, 241, 0.5);
        }

        /* Grid */
        .leaves-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 32px;
        }
        .balance-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          padding: 24px;
          transition: transform 0.2s ease, border-color 0.2s ease;
        }
        .balance-card:hover {
          transform: translateY(-4px);
          border-color: rgba(255, 255, 255, 0.1);
        }

        /* Table Section */
        .history-section {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          overflow: hidden;
        }
        .history-header {
          padding: 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .table-responsive {
          overflow-x: auto;
        }
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
          transition: background 0.2s ease;
        }
        .premium-table tr:hover td {
          background: rgba(255, 255, 255, 0.02);
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
          animation: fadeIn 0.2s ease;
        }
        .modal-content {
          background: linear-gradient(165deg, #1e2130 0%, #0f1117 100%);
          border: 1px solid rgba(99, 102, 241, 0.3);
          border-radius: 24px;
          padding: 32px;
          width: 100%;
          max-width: 480px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8);
          position: relative;
        }
        .modal-close {
          position: absolute;
          top: 24px;
          right: 24px;
          background: transparent;
          border: none;
          color: #64748b;
          cursor: pointer;
          transition: color 0.2s;
        }
        .modal-close:hover { color: #f1f5f9; }

        /* Form Inputs */
        .input-label {
          display: block;
          color: #e2e8f0;
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        .premium-input {
          width: 100%;
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 12px 14px;
          border-radius: 12px;
          color: #fff;
          font-size: 14px;
          outline: none;
          transition: 0.2s;
        }
        .premium-input:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
        }
        .date-input {
          padding-left: 40px; /* Space for calendar icon */
          color-scheme: dark; /* Native dark mode calendar popup */
        }
        .date-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        /* Modal Buttons */
        .btn-cancel {
          flex: 1;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 12px;
          border-radius: 12px;
          color: #fff;
          font-weight: 600;
          cursor: pointer;
          transition: 0.2s;
        }
        .btn-cancel:hover { background: rgba(255, 255, 255, 0.1); }

        .btn-submit {
          flex: 1;
          background: linear-gradient(135deg, #6366f1, #4338ca);
          border: none;
          padding: 12px;
          border-radius: 12px;
          color: #fff;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: 0.2s;
        }
        .btn-submit:disabled { opacity: 0.7; cursor: not-allowed; }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        /* --- RESPONSIVE MEDIA QUERIES --- */
        @media (max-width: 1024px) {
          .leaves-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 768px) {
          .leaves-header { flex-direction: column; align-items: flex-start; gap: 16px; }
          .apply-btn { width: 100%; justify-content: center; }
          .leaves-grid { grid-template-columns: 1fr; }
          .date-grid { grid-template-columns: 1fr; }
          .hide-mobile { display: none; } /* Hide 'Applied On' column on small phones */
        }
      `}</style>
    </div>
  );
}
