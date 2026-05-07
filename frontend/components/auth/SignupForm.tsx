"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Link from "next/link";

type Values = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  terms: boolean;
};

const SignupSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Please enter at least 2 characters for your name")
    .required("Full name is required"),
});

export function SignupForm() {
  const router = useRouter();

  const initialValues: Values = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Admin",
    terms: false,
  };

  async function handleSubmit(values: Values, actions: any) {
    actions.setSubmitting(true);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_AUTH_URL}/auth/signup`,
        values,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log(res);

      // ✅ Success message
      actions.setStatus({
        success: true,
        message: "Signup successful! Please check your email to verify.",
      });

      actions.resetForm();

      // 🔥 IMPORTANT CHANGE (login → verify page)
      setTimeout(() => {
        router.push("/verify-email-sent");
      }, 500);

    } catch (err: any) {
      actions.setStatus({
        success: false,
        message:
          err?.response?.data?.message || "Signup failed. Try again.",
      });
    } finally {
      actions.setSubmitting(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Sign up</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status, values }) => (
          <Form className="space-y-4">
            {status && status.message && (
              <div
                className={`p-2 rounded text-sm ${
                  status.success
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {status.message}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1">
                Full name
              </label>
              <Field
                name="fullName"
                placeholder="Your name"
                className="w-full px-3 py-2 border rounded"
              />
              <div className="text-xs text-red-600 mt-1">
                <ErrorMessage name="fullName" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Field
                name="email"
                type="email"
                placeholder="you@example.com"
                className="w-full px-3 py-2 border rounded"
              />
              <div className="text-xs text-red-600 mt-1">
                <ErrorMessage name="email" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <Field
                name="password"
                type="password"
                placeholder="Password"
                className="w-full px-3 py-2 border rounded"
              />
              <div className="text-xs text-red-600 mt-1">
                <ErrorMessage name="password" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Confirm Password
              </label>
              <Field
                name="confirmPassword"
                type="password"
                placeholder="Confirm password"
                className="w-full px-3 py-2 border rounded"
              />
              <div className="text-xs text-red-600 mt-1">
                <ErrorMessage name="confirmPassword" />
              </div>
            </div>

            <Field type="hidden" name="role" />

            <div className="flex items-start gap-2">
              <Field type="checkbox" name="terms" id="terms" className="mt-1" />
              <label htmlFor="terms" className="text-sm">
                I accept the <a className="underline">terms and conditions</a>
              </label>
            </div>

            <div className="text-xs text-red-600 mt-1">
              <ErrorMessage name="terms" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 rounded-2xl bg-black text-white font-medium disabled:opacity-60"
            >
              {isSubmitting ? "Creating..." : "Create account"}
            </button>

            <div className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="underline">
                Login
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
