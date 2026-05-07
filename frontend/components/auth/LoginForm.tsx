"use client";

import { useForm } from "react-hook-form";
// import axios from "axios";
import api from "../../utils/api"; // ✅ axios instance with interceptor
import { useAuth } from "../../context/AuthContext";
import Link from "next/link";
import styles from "./login.module.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Form = { email: string; password: string };

export default function LoginForm() {
  const { register, handleSubmit } = useForm<Form>();
  const { user,setUser } = useAuth();
  // const auth = useAuth();
  // console.log(auth);
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(data: Form) {
    setLoading(true);
    setErrorMsg("");
    try {
      // const res = await axios.post(
      //   `http://localhost:7000/auth/login`,
      //   data,
      //   {
      //     headers: { "Content-Type": "application/json" },
      //     withCredentials: true,
      //   }
      //   //        { headers: {
      //   //     "Content-Type": "application/json",
      //   //     Authorization: `Bearer ${token}`
      //   //   },
      //   //   withCredentials: true,
      //   //   params: { lang: "en" },
      //   //   timeout: 5000,
      //   //   responseType: "json"
      //   // }
      // );

      // ✅ use api (interceptor enabled)
      const res = await api.post("/auth/login", data);

      const { user } = res.data;

      // ✅ save user in context
      setUser(user);
      // router.push("/admin");

    } catch (err: any) {
      const errorMsg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Something went wrong";

      setErrorMsg(errorMsg);
    } finally {
      setLoading(false);
    }
  }

useEffect(() => {
  if (user) {
    console.log("user==>", user);

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
        router.push("/unauthorized"); // unknown role ke liye
    }
  }
}, [user]);


  return (
    <div className={styles.loginBox}>
      <p>Login</p>

      {errorMsg && (
        <p style={{ color: "red" }} className={styles.error}>
          {errorMsg}
        </p>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.userBox}>
          {/* <input required type="text" name="email" /> */}
          <input {...register("email")} placeholder="Email" />

          <label>Email</label>
        </div>

        <div className={styles.userBox}>
          {/* <input required type="text" name="email" /> */}
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
          />

          <label>Password</label>
        </div>
        <a className={styles.submitButton}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <button type="submit">{loading ? "Logging in..." : "Submit"}</button>
        </a>
      </form>

      <p>
        Don't have an account?
        <Link href="/register" style={{ background: "transparent" }}>
          <button className={styles.a2}>Sign up!</button>
        </Link>
      </p>
    </div>
  );
}
