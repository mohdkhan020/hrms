"use client";

import React, { useState, useEffect } from "react";
import {
  Calendar,
  Search,
  PartyPopper,
  Snowflake,
  Sun,
  Loader2,
  Sparkles,
  MapPin,
  ArrowRight,
} from "lucide-react";
import api from "@/utils/api";

export default function PremiumHolidays() {
  const [loading, setLoading] = useState(true);
  const [holidays, setHolidays] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        setLoading(true);
        // Mocking data for visual demo - replace with your actual API call
        setTimeout(() => {
          setHolidays([
            {
              name: "New Year's Day",
              date: "2026-01-01",
              fullDate: "01 Jan, 2026",
              day: "Thursday",
              type: "Public",
              daysLeft: 0,
            },
            {
              name: "Holi Festival",
              date: "2026-03-04",
              fullDate: "04 Mar, 2026",
              day: "Wednesday",
              type: "Festival",
              daysLeft: 0,
            },
            {
              name: "Independence Day",
              date: "2026-08-15",
              fullDate: "15 Aug, 2026",
              day: "Saturday",
              type: "National",
              daysLeft: 100,
            },
            {
              name: "Diwali",
              date: "2026-11-08",
              fullDate: "08 Nov, 2026",
              day: "Sunday",
              type: "Festival",
              daysLeft: 185,
            },
            {
              name: "Christmas",
              date: "2026-12-25",
              fullDate: "25 Dec, 2026",
              day: "Friday",
              type: "Public",
              daysLeft: 232,
            },
          ]);
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchHolidays();
  }, []);

  const filteredHolidays = holidays.filter((h) =>
    h.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const nextHoliday =
    holidays.find((h) => new Date(h.date) >= new Date()) || holidays[0];

  if (loading) {
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
      }}
    >
      {/* Premium Background Blurs */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          right: "-5%",
          width: "400px",
          height: "400px",
          background: "rgba(99, 102, 241, 0.15)",
          filter: "blur(120px)",
          borderRadius: "50%",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "-5%",
          width: "300px",
          height: "300px",
          background: "rgba(168, 85, 247, 0.1)",
          filter: "blur(100px)",
          borderRadius: "50%",
          zIndex: 0,
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Header Area */}
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 48,
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                color: "#6366f1",
                marginBottom: 8,
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              <Sparkles size={16} /> 2026 Corporate Calendar
            </div>
            <h1
              style={{
                fontSize: 42,
                fontWeight: 800,
                fontFamily: "'DM Serif Display', serif",
                background: "linear-gradient(to right, #fff, #94a3b8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Annual Holidays
            </h1>
          </div>

          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ position: "relative" }}>
              <Search
                size={18}
                color="#4b5563"
                style={{
                  position: "absolute",
                  left: 14,
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />
              <input
                type="text"
                placeholder="Find a holiday..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  background: "rgba(15, 17, 23, 0.6)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "14px",
                  padding: "12px 20px 12px 45px",
                  color: "#fff",
                  width: "320px",
                  outline: "none",
                  backdropFilter: "blur(10px)",
                  transition: "all 0.3s",
                }}
              />
            </div>
          </div>
        </header>

        <div
          style={{ display: "grid", gridTemplateColumns: "400px 1fr", gap: 40 }}
        >
          {/* LEFT COLUMN: The Hero Spotlight */}
          <section>
            <div
              style={{
                background: "linear-gradient(165deg, #1e1b4b 0%, #0f172a 100%)",
                borderRadius: "32px",
                padding: "40px",
                border: "1px solid rgba(99, 102, 241, 0.3)",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 20,
                  right: 20,
                  background: "rgba(255,255,255,0.05)",
                  padding: "8px 16px",
                  borderRadius: "12px",
                  fontSize: 12,
                  color: "#a5b4fc",
                }}
              >
                FEATURED
              </div>

              <div
                style={{
                  width: "60px",
                  height: "60px",
                  background: "rgba(99, 102, 241, 0.2)",
                  borderRadius: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 24,
                }}
              >
                <PartyPopper color="#818cf8" size={30} />
              </div>

              <h2
                style={{
                  fontSize: "32px",
                  fontWeight: 700,
                  marginBottom: 8,
                  fontFamily: "'DM Serif Display', serif",
                }}
              >
                {nextHoliday?.name}
              </h2>
              <p
                style={{
                  color: "#94a3b8",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 32,
                }}
              >
                <Calendar size={16} /> {nextHoliday?.fullDate} •{" "}
                {nextHoliday?.day}
              </p>

              <div
                style={{
                  background: "rgba(255,255,255,0.03)",
                  borderRadius: "24px",
                  padding: "24px",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    color: "#6366f1",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    marginBottom: 4,
                  }}
                >
                  Time to Celebration
                </div>
                <div style={{ fontSize: 28, fontWeight: 800 }}>
                  {nextHoliday?.daysLeft}{" "}
                  <span
                    style={{ fontSize: 16, fontWeight: 400, color: "#64748b" }}
                  >
                    Days Remaining
                  </span>
                </div>
              </div>

              <button
                style={{
                  width: "100%",
                  marginTop: "24px",
                  padding: "16px",
                  borderRadius: "16px",
                  border: "none",
                  background: "linear-gradient(to right, #6366f1, #a855f7)",
                  color: "#fff",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  boxShadow: "0 10px 20px -5px rgba(99, 102, 241, 0.4)",
                }}
              >
                View Policy Details <ArrowRight size={18} />
              </button>
            </div>

            <div
              style={{
                marginTop: 30,
                padding: 24,
                borderRadius: 24,
                border: "1px dashed rgba(255,255,255,0.1)",
                background: "rgba(15, 17, 23, 0.2)",
              }}
            >
              <p
                style={{
                  fontSize: 13,
                  color: "#64748b",
                  lineHeight: 1.6,
                  textAlign: "center",
                }}
              >
                Need to plan a personal leave? Use our{" "}
                <b>Leave Management System</b> to sync with these holidays.
              </p>
            </div>
          </section>

          {/* RIGHT COLUMN: The Luxury List */}
          <section
            style={{
              background: "rgba(15, 17, 23, 0.4)",
              borderRadius: "32px",
              border: "1px solid rgba(255,255,255,0.05)",
              backdropFilter: "blur(20px)",
              padding: "10px",
            }}
          >
            <div
              style={{
                maxHeight: "700px",
                overflowY: "auto",
                paddingRight: "10px",
              }}
            >
              {filteredHolidays.map((h, i) => {
                const isPast = new Date(h.date) < new Date();
                return (
                  <div
                    key={i}
                    className="holiday-row"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "24px 30px",
                      borderRadius: "24px",
                      marginBottom: "8px",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                      background: isPast
                        ? "transparent"
                        : "rgba(255,255,255,0.02)",
                      opacity: isPast ? 0.4 : 1,
                      border: "1px solid transparent",
                    }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 24 }}
                    >
                      <div
                        style={{
                          width: "56px",
                          height: "56px",
                          borderRadius: "18px",
                          background:
                            h.type === "National"
                              ? "linear-gradient(135deg, #3b82f610, #3b82f630)"
                              : "linear-gradient(135deg, #a855f710, #a855f730)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: "1px solid rgba(255,255,255,0.05)",
                        }}
                      >
                        {h.type === "National" ? (
                          <Sun size={24} color="#3b82f6" />
                        ) : (
                          <Snowflake size={24} color="#a855f7" />
                        )}
                      </div>
                      <div>
                        <h4
                          style={{
                            fontSize: 17,
                            fontWeight: 700,
                            color: "#fff",
                            marginBottom: 4,
                          }}
                        >
                          {h.name}
                        </h4>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            color: "#64748b",
                            fontSize: 13,
                          }}
                        >
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 4,
                            }}
                          >
                            <Calendar size={14} /> {h.fullDate}
                          </span>
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 4,
                            }}
                          >
                            <MapPin size={14} /> All Locations
                          </span>
                        </div>
                      </div>
                    </div>

                    <div style={{ textAlign: "right" }}>
                      <div
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          letterSpacing: 1,
                          padding: "6px 12px",
                          borderRadius: "8px",
                          background:
                            h.type === "National" ? "#3b82f620" : "#a855f720",
                          color: h.type === "National" ? "#60a5fa" : "#c084fc",
                          display: "inline-block",
                          marginBottom: 8,
                        }}
                      >
                        {h.type.toUpperCase()}
                      </div>
                      {isPast ? (
                        <div
                          style={{
                            color: "#ef4444",
                            fontSize: 12,
                            fontWeight: 600,
                          }}
                        >
                          Archived
                        </div>
                      ) : (
                        <div
                          style={{
                            color: "#22c55e",
                            fontSize: 12,
                            fontWeight: 600,
                          }}
                        >
                          Active
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>

      <style>{`
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(99, 102, 241, 0.2); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(99, 102, 241, 0.4); }
        .holiday-row:hover {
          background: rgba(255,255,255,0.05) !important;
          border: 1px solid rgba(99, 102, 241, 0.2) !important;
          transform: translateX(10px);
        }
      `}</style>
    </div>
  );
}
