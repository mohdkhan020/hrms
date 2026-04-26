"use client";

export default function VerifyEmailSent() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 text-center w-[400px]">

        <div className="text-5xl mb-4">📩</div>

        <h2 className="text-xl font-semibold mb-2">
          Check your email
        </h2>

        <p className="text-gray-600 text-sm mb-4">
          We've sent you a verification link. Please verify your email to continue.
        </p>

        <p className="text-xs text-gray-400">
          Didn’t receive the email? Check spam folder.
        </p>

      </div>
    </div>
  );
}