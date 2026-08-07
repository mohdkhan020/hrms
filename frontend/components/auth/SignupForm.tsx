"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Link from "next/link";
import { gsap } from "gsap";
import styles from "./signup.module.css";

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
  const boxRef = useRef<HTMLDivElement>(null);
  const [passwordFocused, setPasswordFocused] = useState(false);

  useLayoutEffect(() => {
    if (!boxRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(boxRef.current, { opacity: 1, clearProps: "opacity" });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(boxRef.current, {
        y: 50,
        opacity: 0,
        scale: 0.94,
        duration: 0.9,
        ease: "power4.out",
      })
        .from(
          `.${styles.iconWrap}`,
          { scale: 0, rotate: -90, duration: 0.6, ease: "back.out(1.8)" },
          "-=0.5",
        )
        .from(`.${styles.title}`, { y: 15, opacity: 0, duration: 0.5 }, "-=0.3")
        .from(
          `.${styles.subtitle}`,
          { y: 15, opacity: 0, duration: 0.5 },
          "-=0.35",
        )
        .from(
          `.${styles.userBox}`,
          { y: 18, opacity: 0, duration: 0.45, stagger: 0.1 },
          "-=0.25",
        )
        .from(
          `.${styles.termsRow}`,
          { y: 15, opacity: 0, duration: 0.45 },
          "-=0.15",
        )
        .from(
          `.${styles.submitBtn}`,
          { y: 20, opacity: 0, duration: 0.5 },
          "-=0.1",
        )
        .from(`.${styles.footerText}`, { opacity: 0, duration: 0.5 }, "-=0.15");

      const failsafe = setTimeout(() => tl.progress(1), 1500);
      return () => clearTimeout(failsafe);
    }, boxRef);

    return () => ctx.revert();
  }, []);

  const magnetize = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, { x: x * 0.2, y: y * 0.3, duration: 0.4, ease: "power2.out" });
  };
  const resetMagnet = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1,0.4)",
    });
  };

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
        },
      );

      console.log(res);

      actions.setStatus({
        success: true,
        message: "Signup successful! Please check your email to verify.",
      });

      actions.resetForm();

      setTimeout(() => {
        router.push("/verify-email-sent");
      }, 500);
    } catch (err: any) {
      actions.setStatus({
        success: false,
        message: err?.response?.data?.message || "Signup failed. Try again.",
      });
    } finally {
      actions.setSubmitting(false);
    }
  }

  return (
    <div className={styles.loginBox} ref={boxRef}>
      <div className={styles.cardGlow} />

      <div className={styles.iconWrap}>
        <span className={styles.iconRing} />
        <span className={styles.iconEmoji}>🚀</span>
      </div>

      <h2 className={styles.title}>Create Account</h2>
      <p className={styles.subtitle}>Start your HRMS.AI journey today</p>

      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form className={styles.form}>
            {status && status.message && (
              <p className={status.success ? styles.successMsg : styles.error}>
                <span>{status.success ? "✓" : "⚠"}</span> {status.message}
              </p>
            )}

            <div className={styles.userBox}>
              <span className={styles.inputIcon}>👤</span>
              <Field name="fullName" placeholder=" " />
              <label>Full name</label>
              <span className={styles.inputUnderline} />
              <div className={styles.fieldError}>
                <ErrorMessage name="fullName" />
              </div>
            </div>

            <div className={styles.userBox}>
              <span className={styles.inputIcon}>✉</span>
              <Field name="email" type="email" placeholder=" " />
              <label>Email address</label>
              <span className={styles.inputUnderline} />
              <div className={styles.fieldError}>
                <ErrorMessage name="email" />
              </div>
            </div>

            <div className={styles.userBox}>
              <span className={styles.inputIcon}>🔒</span>
              <Field name="password" type="password" placeholder=" " />
              <label>Password</label>
              <span className={styles.inputUnderline} />
              <div className={styles.fieldError}>
                <ErrorMessage name="password" />
              </div>
            </div>

            <div className={styles.userBox}>
              <span className={styles.inputIcon}>🔒</span>
              <Field name="confirmPassword" type="password" placeholder=" " />
              <label>Confirm password</label>
              <span className={styles.inputUnderline} />
              <div className={styles.fieldError}>
                <ErrorMessage name="confirmPassword" />
              </div>
            </div>

            <Field type="hidden" name="role" />

            <div className={styles.termsRow}>
              <label className={styles.checkboxWrap}>
                <Field type="checkbox" name="terms" />
                <span className={styles.checkboxCustom} />
                <span className={styles.termsText}>
                  I accept the <a>terms and conditions</a>
                </span>
              </label>
              <div className={styles.fieldError}>
                <ErrorMessage name="terms" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.submitBtn}
              onMouseMove={magnetize}
              onMouseLeave={resetMagnet}
            >
              <span className={styles.btnShine} />
              {isSubmitting ? (
                <span className={styles.spinner} />
              ) : (
                <span className={styles.btnLabel}>
                  Create account <span className={styles.btnArrow}>→</span>
                </span>
              )}
            </button>
          </Form>
        )}
      </Formik>

      <div className={styles.divider}>
        <span />
        <p>or</p>
        <span />
      </div>

      <p className={styles.footerText}>
        Already have an account?{" "}
        <Link href="/login" className={styles.signupLink}>
          Login
        </Link>
      </p>
    </div>
  );
}

// "use client";

// import React from "react";
// import { useRouter } from "next/navigation";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import axios from "axios";
// import Link from "next/link";

// type Values = {
//   fullName: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
//   role: string;
//   terms: boolean;
// };

// const SignupSchema = Yup.object().shape({
//   fullName: Yup.string()
//     .min(2, "Please enter at least 2 characters for your name")
//     .required("Full name is required"),
// });

// export function SignupForm() {
//   const router = useRouter();

//   const initialValues: Values = {
//     fullName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     role: "Admin",
//     terms: false,
//   };

//   async function handleSubmit(values: Values, actions: any) {
//     actions.setSubmitting(true);

//     try {
//       const res = await axios.post(
//         `${process.env.NEXT_PUBLIC_AUTH_URL}/auth/signup`,
//         values,
//         {
//           headers: { "Content-Type": "application/json" },
//           withCredentials: true,
//         }
//       );

//       console.log(res);

//       // ✅ Success message
//       actions.setStatus({
//         success: true,
//         message: "Signup successful! Please check your email to verify.",
//       });

//       actions.resetForm();

//       // 🔥 IMPORTANT CHANGE (login → verify page)
//       setTimeout(() => {
//         router.push("/verify-email-sent");
//       }, 500);

//     } catch (err: any) {
//       actions.setStatus({
//         success: false,
//         message:
//           err?.response?.data?.message || "Signup failed. Try again.",
//       });
//     } finally {
//       actions.setSubmitting(false);
//     }
//   }

//   return (
//     <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-2xl shadow-lg">
//       <h2 className="text-2xl font-semibold mb-4">Sign up</h2>

//       <Formik
//         initialValues={initialValues}
//         validationSchema={SignupSchema}
//         onSubmit={handleSubmit}
//       >
//         {({ isSubmitting, status, values }) => (
//           <Form className="space-y-4">
//             {status && status.message && (
//               <div
//                 className={`p-2 rounded text-sm ${
//                   status.success
//                     ? "bg-green-100 text-green-800"
//                     : "bg-red-100 text-red-800"
//                 }`}
//               >
//                 {status.message}
//               </div>
//             )}

//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 Full name
//               </label>
//               <Field
//                 name="fullName"
//                 placeholder="Your name"
//                 className="w-full px-3 py-2 border rounded"
//               />
//               <div className="text-xs text-red-600 mt-1">
//                 <ErrorMessage name="fullName" />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1">Email</label>
//               <Field
//                 name="email"
//                 type="email"
//                 placeholder="you@example.com"
//                 className="w-full px-3 py-2 border rounded"
//               />
//               <div className="text-xs text-red-600 mt-1">
//                 <ErrorMessage name="email" />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1">Password</label>
//               <Field
//                 name="password"
//                 type="password"
//                 placeholder="Password"
//                 className="w-full px-3 py-2 border rounded"
//               />
//               <div className="text-xs text-red-600 mt-1">
//                 <ErrorMessage name="password" />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 Confirm Password
//               </label>
//               <Field
//                 name="confirmPassword"
//                 type="password"
//                 placeholder="Confirm password"
//                 className="w-full px-3 py-2 border rounded"
//               />
//               <div className="text-xs text-red-600 mt-1">
//                 <ErrorMessage name="confirmPassword" />
//               </div>
//             </div>

//             <Field type="hidden" name="role" />

//             <div className="flex items-start gap-2">
//               <Field type="checkbox" name="terms" id="terms" className="mt-1" />
//               <label htmlFor="terms" className="text-sm">
//                 I accept the <a className="underline">terms and conditions</a>
//               </label>
//             </div>

//             <div className="text-xs text-red-600 mt-1">
//               <ErrorMessage name="terms" />
//             </div>

//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full py-2 rounded-2xl bg-black text-white font-medium disabled:opacity-60"
//             >
//               {isSubmitting ? "Creating..." : "Create account"}
//             </button>

//             <div className="text-center text-sm text-gray-600">
//               Already have an account?{" "}
//               <Link href="/login" className="underline">
//                 Login
//               </Link>
//             </div>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// }
