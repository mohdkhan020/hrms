"use client";
import LoginForm from "../components/auth/LoginForm";
import styles from "./home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      {/* LEFT SECTION */}
      <div className={styles.left}>
        <h1 className={styles.logo}>HRMS<span>AI</span></h1>

        <h2 className={styles.heading}>Meet Your Smart HR Assistant</h2>
        <p className={styles.sub}>
          Just Ask – chat or speak, AI handles everything.
        </p>

        <div className={styles.bottomText}>
          <h3>HURRY UP! LOGIN</h3>
          <h4>&</h4>
          <h3>START USING NOW</h3>
        </div>

        <div className={styles.botIcon}>🤖</div>
      </div>

      {/* RIGHT SECTION (LOGIN) */}
      <div className={styles.right}>
        <LoginForm />
      </div>
    </div>
  );
}
