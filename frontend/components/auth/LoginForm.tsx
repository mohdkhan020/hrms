"use client";

import { useForm } from "react-hook-form";
import api from "../../utils/api";
import { useAuth } from "../../context/AuthContext";
import Link from "next/link";
import styles from "./login.module.css";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useState, useRef } from "react";
import { gsap } from "gsap";

type Form = { email: string; password: string };

export default function LoginForm() {
  const { register, handleSubmit } = useForm<Form>();
  const { user, setUser } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const boxRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    if (!boxRef.current) return;

    const ctx = gsap.context(() => {
      // Ensure box starts visible in case timeline gets interrupted
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
          { y: 20, opacity: 0, duration: 0.5, stagger: 0.12 },
          "-=0.25",
        )
        .from(
          `.${styles.submitBtn}`,
          { y: 20, opacity: 0, duration: 0.5 },
          "-=0.2",
        )
        .from(`.${styles.footerText}`, { opacity: 0, duration: 0.5 }, "-=0.2");

      // Failsafe: agar navigation/prefetch timing ki wajah se timeline atak jaye
      const failsafe = setTimeout(() => {
        tl.progress(1);
      }, 1500);

      return () => clearTimeout(failsafe);
    }, boxRef);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (errorMsg && boxRef.current) {
      gsap.fromTo(
        boxRef.current,
        { x: -10 },
        { x: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" },
      );
    }
  }, [errorMsg]);

  // magnetic button hover
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

  async function onSubmit(data: Form) {
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await api.post("/auth/login", data);
      const { user } = res.data;
      setUser(user);
    } catch (err: any) {
      const message =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Something went wrong";
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  }

  useLayoutEffect(() => {
    if (user) {
      switch (user.role) {
        case "admin":
          router.push("/admin/dashboard");
          break;
        case "hr":
          router.push("/hr/dashboard");
          break;
        case "employees":
          router.push("/employees/dashboard");
          break;
        default:
          router.push("/unauthorized");
      }
    }
  }, [user]);

  return (
    <div className={styles.loginBox} ref={boxRef}>
      <div className={styles.cardGlow} />

      <div className={styles.iconWrap}>
        <span className={styles.iconRing} />
        <span className={styles.iconEmoji}>🔐</span>
      </div>

      <h2 className={styles.title}>Welcome Back</h2>
      <p className={styles.subtitle}>Login to continue to your dashboard</p>

      {errorMsg && (
        <p className={styles.error}>
          <span>⚠</span> {errorMsg}
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.userBox}>
          <span className={styles.inputIcon}>✉</span>
          <input {...register("email")} placeholder=" " type="email" />
          <label>Email address</label>
          <span className={styles.inputUnderline} />
        </div>

        <div className={styles.userBox}>
          <span className={styles.inputIcon}>🔒</span>
          <input type="password" {...register("password")} placeholder=" " />
          <label>Password</label>
          <span className={styles.inputUnderline} />
        </div>

        <button
          ref={btnRef}
          type="submit"
          className={styles.submitBtn}
          disabled={loading}
          onMouseMove={magnetize}
          onMouseLeave={resetMagnet}
        >
          <span className={styles.btnShine} />
          {loading ? (
            <span className={styles.spinner} />
          ) : (
            <span className={styles.btnLabel}>
              Login <span className={styles.btnArrow}>→</span>
            </span>
          )}
        </button>
      </form>

      <div className={styles.divider}>
        <span />
        <p>or</p>
        <span />
      </div>

      <p className={styles.footerText}>
        Don&apos;t have an account?{" "}
        <Link href="/register" className={styles.signupLink}>
          Sign up
        </Link>
      </p>
    </div>
  );
}
