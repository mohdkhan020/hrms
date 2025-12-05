// "use client";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import { useAuth } from "@/hooks/useAuth";
// import Link from "next/link";
// import styles from "./login.module.css";
// // import router from "next/router";
// import { useRouter } from "next/navigation";

// type Form = { email: string; password: string };

// export default function LoginForm() {
//   const { register, handleSubmit } = useForm<Form>();
//   const { setUser, setToken } = useAuth();
//    const router = useRouter(); // ✅ correct hook

//   async function onSubmit(data: Form) {
//     // data.preventDefault();
//     router.push('/dashboard')
//     try {
//       console.log("hello", process.env.NEXT_PUBLIC_AUTH_URL);
//       // const res = await axios.post("/api/auth/login", data);
//       // const res = await axios.post("http://localhost:5001/api/auth/login", data);
//       debugger;
//       const res = await axios.post(
//         `${process.env.NEXT_PUBLIC_AUTH_URL}/api/auth/login`,
//         data,
//         {
//           headers: { "Content-Type": "application/json" },
//           withCredentials: true,
//         }
//         //        { headers: {
//         //     "Content-Type": "application/json",
//         //     Authorization: `Bearer ${token}`
//         //   },
//         //   withCredentials: true,
//         //   params: { lang: "en" },
//         //   timeout: 5000,
//         //   responseType: "json"
//         // }
//       );
//       debugger;

//       const { token, user } = res.data;
//       setToken(token);
//       setUser(user);
//       // navigate depending on role
//       if (user.role === "ADMIN") window.location.href = "/admin";
//       else if (user.role === "HR") window.location.href = "/hr";
//       else window.location.href = "/employee";
//     } catch (err) {
//       alert("Login failed");
//     }
//   }

//   return (
//     <div className={styles.loginBox}>
//       <p>Login</p>

// <form onSubmit={handleSubmit(onSubmit)}>
//   <div className={styles.userBox}>
//     {/* <input required type="text" name="email" /> */}
//     <input {...register("email")} placeholder="Email" />

//     <label>Email</label>
//   </div>

//   <div className={styles.userBox}>
//     {/* <input required type="text" name="email" /> */}
//     <input
//       type="password"
//       {...register("password")}
//       placeholder="Password"
//     />

//     <label>Password</label>
//   </div>
//   {/* <button type="submit" className={styles.submitButton}>
//     <span></span>
//     <span></span>
//     <span></span>
//     <span></span>
//     Submit
//   </button> */}

//   <a className={styles.submitButton}>
//     <span></span>
//     <span></span>
//     <span></span>
//     <span></span>
//     {/* Submit */}
//     <button type="submit">Submit</button>
//   </a>
// </form>
//       <p>
//         Don't have an account?
//         <Link href="/register" style={{ background: "transparent" }}>
//           <button type="submit" className={styles.a2}>
//             Sign up!
//           </button>
//         </Link>
//       </p>
//     </div>
//   );
// }

"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import styles from "./login.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Form = { email: string; password: string };

export default function LoginForm() {
  const { register, handleSubmit } = useForm<Form>();
  const { setUser, setToken } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(data: Form) {
    debugger
    setLoading(true);
    setErrorMsg("");

    try {
      debugger
      console.log(`------------>>>>>>>>url--------->>>>>${process.env.NEXT_PUBLIC_AUTH_URL}`)
       const res = await axios.post(
        `${process.env.NEXT_PUBLIC_AUTH_URL}/auth/login`,
        data,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
        //        { headers: {
        //     "Content-Type": "application/json",
        //     Authorization: `Bearer ${token}`
        //   },
        //   withCredentials: true,
        //   params: { lang: "en" },
        //   timeout: 5000,
        //   responseType: "json"
        // }
      );
debugger
      const { token, user } = res.data;

      // save login info
      setToken(token);
      setUser(user);

      // redirect based on role
      if (user.role === "admin") router.push("/dashboard/admin");
      else if (user.role === "hr") router.push("/dashboard/hr");
      else router.push("/dashboard/employee");
    } catch (err: any) {
      setErrorMsg("Invalid email or password"),err;
    }

    setLoading(false);
  }

  return (
    <div className={styles.loginBox}>
      <p>Login</p>

      {errorMsg && <p className={styles.error}>{errorMsg}</p>}
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
        {/* <button type="submit" className={styles.submitButton}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Submit
        </button> */}

        <a className={styles.submitButton}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          {/* Submit */}
          {/* <button type="submit">Submit</button> */}
          <button type="submit">
            {loading ? "Logging in..." : "Submit"}
          </button>
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

// <form onSubmit={handleSubmit(onSubmit)}>

//   {/* EMAIL */}
//   <div className={styles.userBox}>
//     <input {...register("email")} required placeholder="Email" />
//     <label>Email</label>
//   </div>

//   {/* PASSWORD */}
//   <div className={styles.userBox}>
//     <input
//       type="password"
//       {...register("password")}
//       required
//       placeholder="Password"
//     />
//     <label>Password</label>
//   </div>

//   {/* FIXED BUTTON */}
// <button type="submit" className={styles.submitButton}>
//   {loading ? "Logging in..." : "Submit"}
// </button>
// </form>
