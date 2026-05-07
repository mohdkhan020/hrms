"use client";

import React, { useState, useEffect } from "react";
import {
  CalendarDays,
  CheckCircle,
  Clock,
  XCircle,
  Plus,
  Loader2,
  Briefcase,
  Activity,
  ChevronRight,
  X
} from "lucide-react";
import api from "@/utils/api";

export default function LeaveManagementPage() {
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
    // Mocking API Data for the Premium UI
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
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return { bg: "rgba(34, 197, 94, 0.1)", text: "#22c55e", icon: <CheckCircle size={14} /> };
      case "Pending":
        return { bg: "rgba(245, 158, 11, 0.1)", text: "#f59e0b", icon: <Clock size={14} /> };
      case "Rejected":
        return { bg: "rgba(239, 68, 68, 0.1)", text: "#ef4444", icon: <XCircle size={14} /> };
      default:
        return { bg: "rgba(255,255,255,0.1)", text: "#fff", icon: <Clock size={14} /> };
    }
  };

  // Format Date to "DD MMM, YYYY"
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const options: Intl.DateTimeFormatOptions = { day: "2-digit", month: "short", year: "numeric" };
    return new Date(dateStr).toLocaleDateString("en-GB", options);
  };

  // Calculate Days between two dates
  const calculateDays = (start: string, end: string) => {
    if (!start || !end) return 0;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = endDate.getTime() - startDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays > 0 ? diffDays : 0;
  };

  // Handle Form Submission
  const handleApplyLeave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leaveForm.startDate || !leaveForm.endDate) return alert("Please select dates");

    setIsSubmitting(true);

    try {
      // API call simulation
      // await api.post("/employee/leave/apply", leaveForm);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const daysCount = calculateDays(leaveForm.startDate, leaveForm.endDate);
      const newLeave = {
        id: `REQ-00${leaveHistory.length + 4}`,
        dates: `${formatDate(leaveForm.startDate)} - ${formatDate(leaveForm.endDate)}`,
        days: daysCount,
        type: leaveForm.type,
        status: "Pending",
        appliedOn: formatDate(new Date().toISOString()),
      };

      // Optimistic update: Add to top of history
      setLeaveHistory([newLeave, ...leaveHistory]);

      // Reset form and close modal
      setLeaveForm({ type: "Paid Leave", startDate: "", endDate: "", reason: "" });
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
      <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#05070a" }}>
        <Loader2 className="animate-spin" color="#6366f1" size={40} />
      </div>
    );
  }

  return (
    <div style={{ padding: "40px 50px", background: "#05070a", minHeight: "100vh", color: "#f1f5f9", position: "relative", overflow: "hidden", fontFamily: "'DM Sans', sans-serif" }}>
      {/* Background Blurs */}
      <div style={{ position: "absolute", top: "10%", right: "10%", width: "300px", height: "300px", background: "rgba(168, 85, 247, 0.08)", filter: "blur(120px)", borderRadius: "50%", zIndex: 0 }} />
      <div style={{ position: "absolute", bottom: "10%", left: "5%", width: "400px", height: "400px", background: "rgba(59, 130, 246, 0.08)", filter: "blur(150px)", borderRadius: "50%", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#6366f1", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8 }}>
              <Briefcase size={14} /> Time Off Management
            </div>
            <h1 style={{ fontSize: 38, fontWeight: 800, fontFamily: "'DM Serif Display', serif", background: "linear-gradient(to right, #fff, #94a3b8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              My Leaves
            </h1>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            style={{ display: "flex", alignItems: "center", gap: 10, background: "linear-gradient(135deg, #6366f1, #4338ca)", border: "none", padding: "14px 24px", borderRadius: "14px", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.4)", transition: "all 0.3s ease" }}
          >
            <Plus size={18} /> Apply for Leave
          </button>
        </header>

        {/* Leave Balances Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginBottom: 40 }}>
          {leaveBalances.map((balance, index) => {
            const percentage = Math.round((balance.used / balance.total) * 100);
            return (
              <div key={index} style={{ background: "rgba(15, 17, 23, 0.5)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "24px", padding: "28px", backdropFilter: "blur(10px)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: "#e2e8f0" }}>{balance.type}</h3>
                  <div style={{ background: `${balance.color}15`, color: balance.color, padding: "6px 12px", borderRadius: "10px", fontSize: 12, fontWeight: 700 }}>
                    {balance.total - balance.used} Left
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "flex-end", gap: 8, marginBottom: 16 }}>
                  <span style={{ fontSize: 36, fontWeight: 800, fontFamily: "'DM Serif Display', serif", lineHeight: 1 }}>{balance.used}</span>
                  <span style={{ color: "#64748b", fontSize: 14, paddingBottom: 4 }}>/ {balance.total} Used</span>
                </div>

                {/* Premium Progress Bar */}
                <div style={{ height: 6, background: "rgba(255,255,255,0.05)", borderRadius: 10, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${percentage}%`, background: balance.color, borderRadius: 10, boxShadow: `0 0 10px ${balance.color}88` }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Leave History Table */}
        <div style={{ background: "rgba(15, 17, 23, 0.4)", borderRadius: "28px", border: "1px solid rgba(255,255,255,0.05)", overflow: "hidden" }}>
          <div style={{ padding: "28px 32px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, display: "flex", alignItems: "center", gap: 10 }}>
              <Activity size={18} color="#a5b4fc" /> Leave Request History
            </h3>
            <span style={{ color: "#6366f1", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
              View Policy <ChevronRight size={14} />
            </span>
          </div>

          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ background: "rgba(0,0,0,0.2)", color: "#64748b", fontSize: 12, textTransform: "uppercase", letterSpacing: 1 }}>
                <th style={{ padding: "20px 32px", fontWeight: 600 }}>Date Range</th>
                <th style={{ padding: "20px 32px", fontWeight: 600 }}>Leave Type</th>
                <th style={{ padding: "20px 32px", fontWeight: 600 }}>Duration</th>
                <th style={{ padding: "20px 32px", fontWeight: 600 }}>Applied On</th>
                <th style={{ padding: "20px 32px", fontWeight: 600 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {leaveHistory.map((req: any, i) => {
                const statusStyle = getStatusColor(req.status);
                return (
                  <tr key={i} className="leave-row" style={{ borderTop: "1px solid rgba(255,255,255,0.03)", transition: "all 0.2s ease" }}>
                    <td style={{ padding: "24px 32px" }}>
                      <div style={{ fontWeight: 600, color: "#f1f5f9", marginBottom: 4 }}>{req.dates}</div>
                      <div style={{ fontSize: 12, color: "#64748b" }}>ID: {req.id}</div>
                    </td>
                    <td style={{ padding: "24px 32px", color: "#e2e8f0", fontWeight: 500 }}>{req.type}</td>
                    <td style={{ padding: "24px 32px", color: "#94a3b8" }}>{req.days} Day{req.days > 1 ? "s" : ""}</td>
                    <td style={{ padding: "24px 32px", color: "#94a3b8", fontSize: 13 }}>{req.appliedOn}</td>
                    <td style={{ padding: "24px 32px" }}>
                      <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: statusStyle.bg, color: statusStyle.text, padding: "6px 14px", borderRadius: "10px", fontSize: 12, fontWeight: 700 }}>
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
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50, padding: 20 }}>
          <div style={{ background: "linear-gradient(165deg, #0f172a 0%, #05070a 100%)", border: "1px solid rgba(99, 102, 241, 0.3)", borderRadius: "24px", padding: "32px", width: "100%", maxWidth: "500px", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.8)", position: "relative" }}>

            <button onClick={() => setIsModalOpen(false)} style={{ position: "absolute", top: 24, right: 24, background: "transparent", border: "none", color: "#64748b", cursor: "pointer" }}>
              <X size={24} />
            </button>

            <h2 style={{ fontSize: 24, fontWeight: 700, fontFamily: "'DM Serif Display', serif", marginBottom: 8, color: "#f1f5f9" }}>Submit Leave Request</h2>
            <p style={{ color: "#94a3b8", fontSize: 14, marginBottom: 24 }}>Please fill in the details for your time off.</p>

            <form onSubmit={handleApplyLeave} style={{ display: "flex", flexDirection: "column", gap: 20 }}>

              <div>
                <label style={{ display: "block", color: "#e2e8f0", fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Leave Type</label>
                <select
                  className="modal-input"
                  value={leaveForm.type}
                  onChange={(e) => setLeaveForm({ ...leaveForm, type: e.target.value })}
                  style={{ width: "100%", background: "rgba(15, 17, 23, 0.8)", border: "1px solid rgba(255,255,255,0.1)", padding: "14px", borderRadius: "12px", color: "#fff", fontSize: 14, outline: "none" }}
                >
                  <option value="Paid Leave">Paid Leave (PL)</option>
                  <option value="Sick Leave">Sick Leave (SL)</option>
                  <option value="Casual Leave">Casual Leave (CL)</option>
                </select>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={{ display: "block", color: "#e2e8f0", fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Start Date</label>
                  <input
                    type="date"
                    required
                    className="modal-input"
                    value={leaveForm.startDate}
                    onChange={(e) => setLeaveForm({ ...leaveForm, startDate: e.target.value })}
                    style={{ width: "100%", background: "rgba(15, 17, 23, 0.8)", border: "1px solid rgba(255,255,255,0.1)", padding: "14px", borderRadius: "12px", color: "#fff", fontSize: 14, outline: "none", colorScheme: "dark" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", color: "#e2e8f0", fontSize: 13, fontWeight: 600, marginBottom: 8 }}>End Date</label>
                  <input
                    type="date"
                    required
                    className="modal-input"
                    value={leaveForm.endDate}
                    onChange={(e) => setLeaveForm({ ...leaveForm, endDate: e.target.value })}
                    style={{ width: "100%", background: "rgba(15, 17, 23, 0.8)", border: "1px solid rgba(255,255,255,0.1)", padding: "14px", borderRadius: "12px", color: "#fff", fontSize: 14, outline: "none", colorScheme: "dark" }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", color: "#e2e8f0", fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Reason (Optional)</label>
                <textarea
                  rows={3}
                  className="modal-input"
                  placeholder="Provide a brief reason..."
                  value={leaveForm.reason}
                  onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })}
                  style={{ width: "100%", background: "rgba(15, 17, 23, 0.8)", border: "1px solid rgba(255,255,255,0.1)", padding: "14px", borderRadius: "12px", color: "#fff", fontSize: 14, outline: "none", resize: "none" }}
                />
              </div>

              <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", padding: "14px", borderRadius: "12px", color: "#fff", fontWeight: 600, cursor: "pointer", transition: "0.2s" }}>
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting} style={{ flex: 1, background: "linear-gradient(135deg, #6366f1, #4338ca)", border: "none", padding: "14px", borderRadius: "12px", color: "#fff", fontWeight: 700, cursor: isSubmitting ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "0.2s" }}>
                  {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : "Submit Request"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      <style>{`
        .leave-row:hover { background: rgba(255,255,255,0.03) !important; transform: scale(1.002); }
        .modal-input:focus { border-color: #6366f1 !important; box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2); }
      `}</style>
    </div>
  );
}
