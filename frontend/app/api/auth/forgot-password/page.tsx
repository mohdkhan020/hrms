"use client";

import { useState } from "react";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  const requestOtp = async () => {
    await fetch("/api/auth/request-otp", { method: "POST", body: JSON.stringify({ email }) });
    setStep(2);
  };

  const verifyOtp = async () => {
    await fetch("/api/auth/verify-otp", { method: "POST", body: JSON.stringify({ email, otp }) });
    setStep(3);
  };

  const resetPassword = async () => {
    await fetch("/api/auth/reset-password", { method: "POST", body: JSON.stringify({ email, password }) });
    alert("Password Reset Successful!");
  };

  return (
    <div style={{ padding: 40 }}>
      {step === 1 && (
        <>
          <h3>Forgot Password</h3>
          <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <button onClick={requestOtp}>Send OTP</button>
        </>
      )}

      {step === 2 && (
        <>
          <h3>Enter OTP</h3>
          <input placeholder="Enter OTP" onChange={(e) => setOtp(e.target.value)} />
          <button onClick={verifyOtp}>Verify OTP</button>
        </>
      )}

      {step === 3 && (
        <>
          <h3>Reset Password</h3>
          <input type="password" placeholder="New Password" onChange={(e) => setPassword(e.target.value)} />
          <button onClick={resetPassword}>Update Password</button>
        </>
      )}
    </div>
  );
}
