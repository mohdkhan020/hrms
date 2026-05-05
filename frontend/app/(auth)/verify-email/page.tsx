"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("Verifying your email...");

  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link.");
      return;
    }

    verifyEmail();
  }, [token]);

  const verifyEmail = async () => {
    try {
      console.log('NEXT_PUBLIC_AUTH_URL==>',process.env.NEXT_PUBLIC_AUTH_URL)
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_AUTH_URL}/auth/verify-email`,
        { token }
      );
      setStatus("success");
      setMessage(res.data.message || "Email verified successfully!");

      // ✅ redirect after 3 sec
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err: any) {
      setStatus("error");
      setMessage(
        err?.response?.data?.message || "Verification failed. Try again."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center w-[400px]">

        {/* 🔄 Loader */}
        {status === "loading" && (
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <h2 className="text-lg font-semibold">{message}</h2>
          </div>
        )}

        {/* ✅ Success */}
        {status === "success" && (
          <div className="flex flex-col items-center gap-4">
            <div className="text-green-500 text-5xl">✔</div>
            <h2 className="text-xl font-semibold">Success</h2>
            <p>{message}</p>
            <p className="text-sm text-gray-500">
              Redirecting to login...
            </p>
          </div>
        )}

        {/* ❌ Error */}
        {status === "error" && (
          <div className="flex flex-col items-center gap-4">
            <div className="text-red-500 text-5xl">✖</div>
            <h2 className="text-xl font-semibold">Error</h2>
            <p>{message}</p>

            <button
              onClick={() => router.push("/login")}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Go to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
