"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Camera,
  Edit2,
  Save,
  Loader2,
  Calendar,
  Shield,
  X,
  Award,
} from "lucide-react";
import api from "@/utils/api";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Profile State
  const [profile, setProfile] = useState({
    id: "EMP-2024-047",
    firstName: "Adil",
    lastName: "Khan",
    email: "adil.khan@nic.com",
    phone: "+91 8188908320",
    dob: "1996-06-06",
    address: "Block B, Sector 15, Noida",
    role: "Senior Full Stack Developer",
    department: "Engineering",
    joinDate: "07 Nov, 2026",
    manager: "Trident Mak",
    avatar: "",
    emergencyContact: "Iru Khan (Wife) - +91 98765 00000",
  });

  // Form State (used when editing)
  const [formData, setFormData] = useState({ ...profile });

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel edit, revert changes
      setFormData({ ...profile });
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate API Save
      // await api.put("/employee/profile/update", formData);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setProfile({ ...formData });
      setIsEditing(false);
    } catch (err) {
      alert("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setProfile({ ...profile, avatar: previewUrl });
      setFormData({ ...formData, avatar: previewUrl });
      // Here you would typically upload the file to your backend immediately
    }
  };

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

  // Helper to render input or text based on edit mode
  const renderField = (
    label: string,
    name: keyof typeof formData,
    icon: any,
    type = "text",
    isTextArea = false,
  ) => {
    return (
      <div style={{ marginBottom: 20 }}>
        <label
          style={{
            display: "block",
            color: "#64748b",
            fontSize: 13,
            fontWeight: 600,
            marginBottom: 8,
          }}
        >
          {label}
        </label>
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 14,
              color: "#6366f1",
              opacity: 0.8,
            }}
          >
            {icon}
          </div>
          {isEditing ? (
            isTextArea ? (
              <textarea
                name={name}
                value={formData[name]}
                onChange={handleInputChange}
                rows={3}
                style={{
                  width: "100%",
                  background: "rgba(15, 17, 23, 0.8)",
                  border: "1px solid rgba(99, 102, 241, 0.3)",
                  borderRadius: "12px",
                  padding: "12px 14px 12px 42px",
                  color: "#fff",
                  fontSize: 14,
                  outline: "none",
                  resize: "none",
                  transition: "0.2s",
                }}
              />
            ) : (
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  background: "rgba(15, 17, 23, 0.8)",
                  border: "1px solid rgba(99, 102, 241, 0.3)",
                  borderRadius: "12px",
                  padding: "12px 14px 12px 42px",
                  color: "#fff",
                  fontSize: 14,
                  outline: "none",
                  transition: "0.2s",
                }}
              />
            )
          ) : (
            <div
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.05)",
                borderRadius: "12px",
                padding: "12px 14px 12px 42px",
                color: "#f1f5f9",
                fontSize: 14,
              }}
            >
              {profile[name] || "Not provided"}
            </div>
          )}
        </div>
      </div>
    );
  };

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
          top: "-5%",
          left: "-5%",
          width: "400px",
          height: "400px",
          background: "rgba(99, 102, 241, 0.08)",
          filter: "blur(120px)",
          borderRadius: "50%",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "10%",
          width: "300px",
          height: "300px",
          background: "rgba(168, 85, 247, 0.08)",
          filter: "blur(120px)",
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
                color: "#a855f7",
                fontSize: 13,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 1.5,
                marginBottom: 8,
              }}
            >
              <Shield size={14} /> Employee Identity
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
              My Profile
            </h1>
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            {isEditing ? (
              <>
                <button
                  onClick={handleEditToggle}
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    padding: "12px 20px",
                    borderRadius: "12px",
                    color: "#fff",
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    transition: "0.2s",
                  }}
                >
                  <X size={16} /> Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  style={{
                    background: "linear-gradient(135deg, #22c55e, #16a34a)",
                    border: "none",
                    padding: "12px 24px",
                    borderRadius: "12px",
                    color: "#fff",
                    fontWeight: 700,
                    cursor: isSaving ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    boxShadow: "0 10px 25px -5px rgba(34, 197, 94, 0.4)",
                    transition: "0.2s",
                  }}
                >
                  {isSaving ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Save size={16} />
                  )}{" "}
                  Save Changes
                </button>
              </>
            ) : (
              <button
                onClick={handleEditToggle}
                style={{
                  background: "linear-gradient(135deg, #6366f1, #4338ca)",
                  border: "none",
                  padding: "12px 24px",
                  borderRadius: "12px",
                  color: "#fff",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.4)",
                  transition: "0.2s",
                }}
              >
                <Edit2 size={16} /> Edit Profile
              </button>
            )}
          </div>
        </header>

        <div
          style={{ display: "grid", gridTemplateColumns: "350px 1fr", gap: 40 }}
        >
          {/* LEFT SIDEBAR: Identity Card */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div
              style={{
                background: "linear-gradient(165deg, #0f172a 0%, #05070a 100%)",
                borderRadius: "32px",
                padding: "40px 30px",
                border: "1px solid rgba(99, 102, 241, 0.2)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 100,
                  background:
                    "linear-gradient(135deg, rgba(99, 102, 241, 0.2), transparent)",
                }}
              />

              {/* Profile Image with Upload Overlay */}
              <div
                style={{ position: "relative", marginBottom: 24, zIndex: 2 }}
              >
                <div
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    border: "4px solid rgba(15, 23, 42, 0.8)",
                    background: "linear-gradient(135deg, #6366f1, #a855f7)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
                  }}
                >
                  {profile.avatar ? (
                    <img
                      src={profile.avatar}
                      alt="Profile"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <span style={{ fontSize: 40, fontWeight: 800 }}>
                      {profile.firstName[0]}
                      {profile.lastName[0]}
                    </span>
                  )}
                </div>

                {isEditing && (
                  <label
                    style={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      width: 36,
                      height: 36,
                      background: "#fff",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                      color: "#000",
                      transition: "transform 0.2s",
                    }}
                    className="hover-scale"
                  >
                    <Camera size={18} />
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleImageUpload}
                    />
                  </label>
                )}
              </div>

              <h2
                style={{
                  fontSize: 24,
                  fontWeight: 800,
                  fontFamily: "'DM Serif Display', serif",
                  marginBottom: 4,
                  zIndex: 2,
                }}
              >
                {profile.firstName} {profile.lastName}
              </h2>
              <p
                style={{
                  color: "#a5b4fc",
                  fontSize: 14,
                  fontWeight: 600,
                  marginBottom: 16,
                  zIndex: 2,
                }}
              >
                {profile.role}
              </p>

              <div
                style={{
                  background: "rgba(255,255,255,0.05)",
                  padding: "6px 14px",
                  borderRadius: "99px",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#94a3b8",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  zIndex: 2,
                }}
              >
                <Briefcase size={12} /> {profile.id}
              </div>
            </div>

            {/* Profile Completion Widget */}
            <div
              style={{
                background: "rgba(15, 17, 23, 0.4)",
                borderRadius: "24px",
                padding: "24px",
                border: "1px solid rgba(255,255,255,0.05)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 12,
                }}
              >
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#e2e8f0",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <Award size={16} color="#a855f7" /> Profile Completion
                </span>
                <span
                  style={{ fontSize: 14, fontWeight: 700, color: "#a855f7" }}
                >
                  85%
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
                    width: "85%",
                    background: "linear-gradient(to right, #6366f1, #a855f7)",
                    borderRadius: 10,
                    boxShadow: "0 0 10px rgba(168, 85, 247, 0.5)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* RIGHT MAIN AREA: Tabbed Details */}
          <div
            style={{
              background: "rgba(15, 17, 23, 0.5)",
              borderRadius: "32px",
              border: "1px solid rgba(255,255,255,0.05)",
              backdropFilter: "blur(10px)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Tabs */}
            <div
              style={{
                display: "flex",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                padding: "0 10px",
              }}
            >
              <button
                onClick={() => setActiveTab("personal")}
                style={{
                  padding: "24px 32px",
                  background: "transparent",
                  border: "none",
                  borderBottom:
                    activeTab === "personal"
                      ? "2px solid #6366f1"
                      : "2px solid transparent",
                  color: activeTab === "personal" ? "#fff" : "#64748b",
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                Personal Information
              </button>
              <button
                onClick={() => setActiveTab("work")}
                style={{
                  padding: "24px 32px",
                  background: "transparent",
                  border: "none",
                  borderBottom:
                    activeTab === "work"
                      ? "2px solid #6366f1"
                      : "2px solid transparent",
                  color: activeTab === "work" ? "#fff" : "#64748b",
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                Work Details
              </button>
            </div>

            {/* Form Content */}
            <div style={{ padding: "40px", flex: 1, overflowY: "auto" }}>
              {activeTab === "personal" && (
                <div style={{ animation: "fadeIn 0.3s ease" }}>
                  <h3
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      marginBottom: 24,
                      color: "#f1f5f9",
                    }}
                  >
                    Basic Details
                  </h3>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "0 24px",
                    }}
                  >
                    {renderField("First Name", "firstName", <User size={16} />)}
                    {renderField("Last Name", "lastName", <User size={16} />)}
                    {renderField(
                      "Email Address",
                      "email",
                      <Mail size={16} />,
                      "email",
                    )}
                    {renderField("Phone Number", "phone", <Phone size={16} />)}
                    {renderField(
                      "Date of Birth",
                      "dob",
                      <Calendar size={16} />,
                      "date",
                    )}
                  </div>

                  <h3
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      margin: "16px 0 24px",
                      color: "#f1f5f9",
                    }}
                  >
                    Location & Emergency
                  </h3>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr",
                      gap: "0 24px",
                    }}
                  >
                    {renderField(
                      "Current Address",
                      "address",
                      <MapPin size={16} />,
                      "text",
                      true,
                    )}
                    {renderField(
                      "Emergency Contact",
                      "emergencyContact",
                      <Shield size={16} />,
                    )}
                  </div>
                </div>
              )}

              {activeTab === "work" && (
                <div style={{ animation: "fadeIn 0.3s ease" }}>
                  <h3
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      marginBottom: 24,
                      color: "#f1f5f9",
                    }}
                  >
                    Employment Details
                  </h3>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "0 24px",
                    }}
                  >
                    {renderField("Job Title", "role", <Briefcase size={16} />)}
                    {renderField(
                      "Department",
                      "department",
                      <Briefcase size={16} />,
                    )}
                    {renderField(
                      "Date of Joining",
                      "joinDate",
                      <Calendar size={16} />,
                    )}
                    {renderField(
                      "Reporting Manager",
                      "manager",
                      <User size={16} />,
                    )}
                  </div>

                  {/* Read-only block to show system locked fields */}
                  <div
                    style={{
                      marginTop: 24,
                      padding: 20,
                      background: "rgba(99, 102, 241, 0.05)",
                      border: "1px dashed rgba(99, 102, 241, 0.2)",
                      borderRadius: 16,
                    }}
                  >
                    <p
                      style={{
                        fontSize: 13,
                        color: "#94a3b8",
                        lineHeight: 1.6,
                      }}
                    >
                      <b>Note:</b> Employment details like Joining Date,
                      Employee ID, and Department are strictly managed by the HR
                      department. If you spot any discrepancies, please raise a
                      ticket in the helpdesk module.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
        .hover-scale:hover { transform: scale(1.1); }
        ::-webkit-calendar-picker-indicator { filter: invert(1); cursor: pointer; }
      `}</style>
    </div>
  );
}
