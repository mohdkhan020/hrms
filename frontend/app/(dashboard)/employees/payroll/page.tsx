"use client";

import React, { useState, useEffect } from "react";
import {
  Download,
  IndianRupee,
  FileText,
  TrendingUp,
  TrendingDown,
  Eye,
  Loader2,
  Calendar,
  Wallet,
} from "lucide-react";
import api from "@/utils/api";

export default function PayrollPage() {
  const [loading, setLoading] = useState(true);
  const [payslips, setPayslips] = useState<any[]>([]);
  const [selectedSlip, setSelectedSlip] = useState<any>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  useEffect(() => {
    // Mocking API call for Payroll Data
    setTimeout(() => {
      const mockData = [
        {
          id: "PAY-2026-04",
          month: "April",
          year: 2026,
          date: "01 May, 2026",
          status: "Paid",
          earnings: { basic: 45000, hra: 20000, special: 15000 },
          deductions: { pf: 1800, tax: 5200 },
          grossPay: 80000,
          totalDeductions: 7000,
          netPay: 73000,
        },
        {
          id: "PAY-2026-03",
          month: "March",
          year: 2026,
          date: "01 Apr, 2026",
          status: "Paid",
          earnings: { basic: 45000, hra: 20000, special: 15000 },
          deductions: { pf: 1800, tax: 5200 },
          grossPay: 80000,
          totalDeductions: 7000,
          netPay: 73000,
        },
        {
          id: "PAY-2026-02",
          month: "February",
          year: 2026,
          date: "01 Mar, 2026",
          status: "Paid",
          earnings: { basic: 40000, hra: 18000, special: 12000 }, // Pre-appraisal
          deductions: { pf: 1800, tax: 4200 },
          grossPay: 70000,
          totalDeductions: 6000,
          netPay: 64000,
        },
      ];
      setPayslips(mockData);
      setSelectedSlip(mockData[0]); // Select latest month by default
      setLoading(false);
    }, 1000);
  }, []);

  const handleDownload = (id: string) => {
    setDownloadingId(id);
    // Simulate PDF generation delay
    setTimeout(() => {
      setDownloadingId(null);
      alert("Payslip downloaded successfully!");
    }, 1500);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading || !selectedSlip) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#05070a",
        }}
      >
        <Loader2 className="animate-spin" color="#6366f1" size={40} />
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "40px 50px",
        background: "#05070a",
        minHeight: "100vh",
        color: "#f1f5f9",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Background Ambience */}
      <div
        style={{
          position: "absolute",
          top: "5%",
          left: "40%",
          width: "500px",
          height: "500px",
          background: "rgba(34, 197, 94, 0.05)",
          filter: "blur(150px)",
          borderRadius: "50%",
          zIndex: 0,
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 40,
          }}
        >
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
              <Wallet size={14} /> Payroll & Compensation
            </div>
            <h1
              style={{
                fontSize: 38,
                fontWeight: 800,
                fontFamily: "'DM Serif Display', serif",
                background: "linear-gradient(to right, #fff, #94a3b8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              My Payslips
            </h1>
          </div>

          <button
            onClick={() => handleDownload(selectedSlip.id)}
            disabled={downloadingId === selectedSlip.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "linear-gradient(135deg, #10b981, #059669)",
              border: "none",
              padding: "14px 24px",
              borderRadius: "14px",
              color: "#fff",
              fontSize: 14,
              fontWeight: 700,
              cursor:
                downloadingId === selectedSlip.id ? "not-allowed" : "pointer",
              boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.4)",
              transition: "all 0.3s ease",
            }}
          >
            {downloadingId === selectedSlip.id ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Download size={18} />
            )}
            {downloadingId === selectedSlip.id
              ? "Generating PDF..."
              : "Download Selected"}
          </button>
        </header>

        {/* Selected Month Highlight */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr",
            gap: 32,
            marginBottom: 40,
          }}
        >
          {/* Main Net Pay Card */}
          <div
            style={{
              background: "linear-gradient(165deg, #0f172a 0%, #020617 100%)",
              borderRadius: "32px",
              padding: "40px",
              border: "1px solid rgba(34, 197, 94, 0.2)",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-10%",
                right: "-10%",
                width: "200px",
                height: "200px",
                background: "rgba(34, 197, 94, 0.1)",
                filter: "blur(60px)",
                borderRadius: "50%",
              }}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 30,
              }}
            >
              <div
                style={{
                  background: "rgba(255,255,255,0.05)",
                  padding: "8px 16px",
                  borderRadius: "12px",
                  color: "#a5b4fc",
                  fontSize: 14,
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Calendar size={16} /> {selectedSlip.month} {selectedSlip.year}
              </div>
              <span
                style={{
                  color: "#22c55e",
                  background: "rgba(34, 197, 94, 0.1)",
                  padding: "6px 14px",
                  borderRadius: "8px",
                  fontSize: 12,
                  fontWeight: 700,
                  textTransform: "uppercase",
                }}
              >
                {selectedSlip.status} on {selectedSlip.date}
              </span>
            </div>

            <p
              style={{
                color: "#94a3b8",
                fontSize: 14,
                textTransform: "uppercase",
                letterSpacing: 1,
                marginBottom: 4,
              }}
            >
              Take Home Salary (Net Pay)
            </p>
            <h2
              style={{
                fontSize: 56,
                fontWeight: 800,
                fontFamily: "'DM Serif Display', serif",
                color: "#fff",
                marginBottom: 32,
              }}
            >
              {formatCurrency(selectedSlip.netPay)}
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 24,
                borderTop: "1px solid rgba(255,255,255,0.05)",
                paddingTop: 24,
              }}
            >
              <div>
                <p
                  style={{
                    color: "#64748b",
                    fontSize: 13,
                    marginBottom: 6,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <TrendingUp size={14} color="#3b82f6" /> Gross Earnings
                </p>
                <p style={{ fontSize: 20, fontWeight: 700, color: "#f1f5f9" }}>
                  {formatCurrency(selectedSlip.grossPay)}
                </p>
              </div>
              <div>
                <p
                  style={{
                    color: "#64748b",
                    fontSize: 13,
                    marginBottom: 6,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <TrendingDown size={14} color="#ef4444" /> Total Deductions
                </p>
                <p style={{ fontSize: 20, fontWeight: 700, color: "#f1f5f9" }}>
                  {formatCurrency(selectedSlip.totalDeductions)}
                </p>
              </div>
            </div>
          </div>

          {/* Salary Breakdown (Earnings vs Deductions) */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Earnings Box */}
            <div
              style={{
                background: "rgba(15, 17, 23, 0.6)",
                borderRadius: "24px",
                padding: "24px",
                border: "1px solid rgba(255,255,255,0.05)",
                backdropFilter: "blur(10px)",
              }}
            >
              <h3
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  marginBottom: 16,
                  color: "#e2e8f0",
                }}
              >
                Earnings Breakdown
              </h3>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 14,
                  }}
                >
                  <span style={{ color: "#94a3b8" }}>Basic Salary</span>
                  <span style={{ fontWeight: 600 }}>
                    {formatCurrency(selectedSlip.earnings.basic)}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 14,
                  }}
                >
                  <span style={{ color: "#94a3b8" }}>House Rent Allowance</span>
                  <span style={{ fontWeight: 600 }}>
                    {formatCurrency(selectedSlip.earnings.hra)}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 14,
                  }}
                >
                  <span style={{ color: "#94a3b8" }}>Special Allowance</span>
                  <span style={{ fontWeight: 600 }}>
                    {formatCurrency(selectedSlip.earnings.special)}
                  </span>
                </div>
              </div>
            </div>

            {/* Deductions Box */}
            <div
              style={{
                background: "rgba(15, 17, 23, 0.6)",
                borderRadius: "24px",
                padding: "24px",
                border: "1px solid rgba(255,255,255,0.05)",
                backdropFilter: "blur(10px)",
              }}
            >
              <h3
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  marginBottom: 16,
                  color: "#e2e8f0",
                }}
              >
                Deductions Breakdown
              </h3>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 14,
                  }}
                >
                  <span style={{ color: "#94a3b8" }}>Provident Fund (PF)</span>
                  <span style={{ fontWeight: 600, color: "#ef4444" }}>
                    -{formatCurrency(selectedSlip.deductions.pf)}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 14,
                  }}
                >
                  <span style={{ color: "#94a3b8" }}>Income Tax (TDS)</span>
                  <span style={{ fontWeight: 600, color: "#ef4444" }}>
                    -{formatCurrency(selectedSlip.deductions.tax)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* History Table */}
        <div
          style={{
            background: "rgba(15, 17, 23, 0.4)",
            borderRadius: "28px",
            border: "1px solid rgba(255,255,255,0.05)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "24px 32px",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <h3 style={{ fontSize: 18, fontWeight: 700 }}>Payslip History</h3>
          </div>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left",
            }}
          >
            <thead>
              <tr
                style={{
                  background: "rgba(0,0,0,0.2)",
                  color: "#64748b",
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                }}
              >
                <th style={{ padding: "20px 32px", fontWeight: 600 }}>
                  Month / Year
                </th>
                <th style={{ padding: "20px 32px", fontWeight: 600 }}>
                  Date Paid
                </th>
                <th style={{ padding: "20px 32px", fontWeight: 600 }}>
                  Net Pay
                </th>
                <th style={{ padding: "20px 32px", fontWeight: 600 }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {payslips.map((slip) => (
                <tr
                  key={slip.id}
                  style={{
                    borderTop: "1px solid rgba(255,255,255,0.03)",
                    background:
                      selectedSlip.id === slip.id
                        ? "rgba(99, 102, 241, 0.05)"
                        : "transparent",
                    transition: "all 0.2s ease",
                  }}
                >
                  <td style={{ padding: "20px 32px" }}>
                    <div
                      style={{
                        fontWeight: 600,
                        color:
                          selectedSlip.id === slip.id ? "#818cf8" : "#f1f5f9",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <FileText
                        size={16}
                        color={
                          selectedSlip.id === slip.id ? "#818cf8" : "#64748b"
                        }
                      />
                      {slip.month} {slip.year}
                    </div>
                  </td>
                  <td style={{ padding: "20px 32px", color: "#94a3b8" }}>
                    {slip.date}
                  </td>
                  <td
                    style={{
                      padding: "20px 32px",
                      fontWeight: 700,
                      color: "#e2e8f0",
                    }}
                  >
                    {formatCurrency(slip.netPay)}
                  </td>
                  <td style={{ padding: "20px 32px" }}>
                    <div style={{ display: "flex", gap: 12 }}>
                      <button
                        onClick={() => setSelectedSlip(slip)}
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "none",
                          color: "#fff",
                          padding: "8px 12px",
                          borderRadius: "8px",
                          fontSize: 12,
                          fontWeight: 600,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          transition: "0.2s",
                        }}
                      >
                        <Eye size={14} /> View
                      </button>
                      <button
                        onClick={() => handleDownload(slip.id)}
                        disabled={downloadingId === slip.id}
                        style={{
                          background: "rgba(99, 102, 241, 0.1)",
                          border: "1px solid rgba(99, 102, 241, 0.2)",
                          color: "#818cf8",
                          padding: "8px 12px",
                          borderRadius: "8px",
                          fontSize: 12,
                          fontWeight: 600,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          transition: "0.2s",
                        }}
                      >
                        {downloadingId === slip.id ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <Download size={14} />
                        )}
                        PDF
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
