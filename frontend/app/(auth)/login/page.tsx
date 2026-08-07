"use client";
import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import LoginForm from "@/components/auth/LoginForm";
import styles from "../../home.module.css";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

 useLayoutEffect(() => {
   const ctx = gsap.context(() => {
     // ===== Generate floating particles =====
     const particleContainer = particlesRef.current;
     if (particleContainer) {
       particleContainer.innerHTML = ""; // safety: purane particles clear karo agar re-mount ho
       for (let i = 0; i < 22; i++) {
         const p = document.createElement("span");
         p.className = styles.particle;
         const size = gsap.utils.random(3, 7);
         p.style.width = `${size}px`;
         p.style.height = `${size}px`;
         p.style.left = `${gsap.utils.random(0, 100)}%`;
         p.style.top = `${gsap.utils.random(0, 100)}%`;
         particleContainer.appendChild(p);

         gsap.to(p, {
           y: gsap.utils.random(-120, 120),
           x: gsap.utils.random(-60, 60),
           opacity: gsap.utils.random(0.2, 0.8),
           duration: gsap.utils.random(4, 9),
           repeat: -1,
           yoyo: true,
           ease: "sine.inOut",
           delay: gsap.utils.random(0, 3),
         });
       }
     }

     // ===== Master entrance timeline =====
     // Ab poore container ko opacity:0 se shuru nahi karte — sirf andar ke elements
     gsap.set(containerRef.current, { opacity: 1, clearProps: "opacity" });

     const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

     tl.from(`.${styles.logoIcon}`, {
       scale: 0,
       rotate: -180,
       opacity: 0,
       duration: 0.8,
       ease: "back.out(1.8)",
     })
       .from(
         `.${styles.logoText}`,
         { x: -20, opacity: 0, duration: 0.6 },
         "-=0.4",
       )
       .from(`.${styles.badge}`, { y: 20, opacity: 0, duration: 0.6 }, "-=0.2")
       .from(
         `.${styles.headingWord}`,
         {
           y: 50,
           opacity: 0,
           rotateX: -40,
           duration: 0.8,
           stagger: 0.05,
           transformOrigin: "50% 100%",
         },
         "-=0.2",
       )
       .from(`.${styles.sub}`, { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
       .from(
         `.${styles.statChip}`,
         {
           y: 25,
           opacity: 0,
           scale: 0.85,
           duration: 0.5,
           stagger: 0.12,
           ease: "back.out(1.6)",
         },
         "-=0.3",
       )
       .from(
         `.${styles.illustrationWrap}`,
         { scale: 0.7, opacity: 0, duration: 1, ease: "elastic.out(1, 0.7)" },
         "-=0.5",
       )
       .from(
         `.${styles.right}`,
         { x: 80, opacity: 0, duration: 0.9, ease: "power3.out" },
         "-=0.9",
       );

     // ===== FAILSAFE: agar kisi wajah se timeline stuck/incomplete reh jaye =====
     const failsafe = setTimeout(() => {
       tl.progress(1); // force-complete karo animation, chahe kahin bhi ruki ho
     }, 2500);

     // ===== Continuous floating illustration =====
     gsap.to(`.${styles.illustrationWrap}`, {
       y: -14,
       duration: 3,
       repeat: -1,
       yoyo: true,
       ease: "sine.inOut",
     });

     // ===== Orb parallax on mouse =====
     const left = containerRef.current?.querySelector(`.${styles.left}`);
     const orbs = gsap.utils.toArray<HTMLElement>(`.${styles.orb}`);
     const handleMouseMove = (e: MouseEvent) => {
       const { innerWidth, innerHeight } = window;
       const x = (e.clientX / innerWidth - 0.5) * 40;
       const y = (e.clientY / innerHeight - 0.5) * 40;
       orbs.forEach((o, i) => {
         gsap.to(o, {
           x: x * (i + 1) * 0.35,
           y: y * (i + 1) * 0.35,
           duration: 1.4,
           ease: "power2.out",
         });
       });
     };
     left?.addEventListener("mousemove", handleMouseMove as EventListener);

     // ===== Rotating conic ring behind illustration =====
     gsap.to(`.${styles.ringRotate}`, {
       rotate: 360,
       duration: 24,
       repeat: -1,
       ease: "none",
     });

     return () => {
       clearTimeout(failsafe);
       left?.removeEventListener("mousemove", handleMouseMove as EventListener);
     };
   }, containerRef);

   return () => ctx.revert();
 }, []);

  return (
    <div className={styles.container} ref={containerRef} >
      {/* LEFT SECTION */}
      <div className={styles.left}>
        <span
          className={styles.orb}
          style={{
            width: 320,
            height: 320,
            top: "-80px",
            right: "5%",
            background: "#ffd200",
          }}
        />
        <span
          className={styles.orb}
          style={{
            width: 260,
            height: 260,
            bottom: "-80px",
            left: "0%",
            background: "#ff6fd8",
          }}
        />
        <span
          className={styles.orb}
          style={{
            width: 180,
            height: 180,
            top: "45%",
            right: "35%",
            background: "#00e5ff",
          }}
        />

        <div className={styles.gridOverlay} />
        <div className={styles.particles} ref={particlesRef} />

        <div className={styles.leftInner}>
          <div className={styles.logoRow}>
            <div className={styles.logoIcon}>H</div>
            <span className={styles.logoText}>
              HRMS<span>.AI</span>
            </span>
          </div>

          <span className={styles.badge}>
            <span className={styles.badgeDot} /> AI-Powered HR Platform
          </span>

          <h1 className={styles.heading}>
            {"Meet Your Smart HR Assistant".split(" ").map((w, i) => (
              <span key={i} className={styles.headingWord}>
                {w}&nbsp;
              </span>
            ))}
          </h1>

          <p className={styles.sub}>
            Just ask — chat or speak, and let AI handle payroll, attendance &
            everything else.
          </p>

          <div className={styles.statRow}>
            <div className={styles.statChip}>
              <strong>500+</strong>
              <span>Companies</span>
            </div>
            <div className={styles.statChip}>
              <strong>50k+</strong>
              <span>Employees</span>
            </div>
            <div className={styles.statChip}>
              <strong>24/7</strong>
              <span>AI Support</span>
            </div>
          </div>

          <div className={styles.illustrationWrap}>
            <div className={styles.ringRotate}>
              <span className={styles.ringDot} />
            </div>
            <div className={styles.botCore}>
              <span className={styles.botPulse} />
              <span className={styles.botPulse2} />
              <span className={styles.botEmoji}>🤖</span>
            </div>
          </div>
        </div>

        <svg
          className={styles.wave}
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            fill="#ffffff"
            fillOpacity="0.05"
            d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,80C1120,85,1280,75,1360,69.3L1440,64L1440,120L0,120Z"
          />
        </svg>
      </div>

      {/* RIGHT SECTION (LOGIN) */}
      <div className={styles.right}>
        <LoginForm />
      </div>
    </div>
  );
}

// // "use client";
// // import LoginForm from "@/components/auth/LoginForm";
// // // import styles from "./home.module.css";
// // import styles from "../../home.module.css";

// // export default function Home() {
// //   return (
// //     <div className={styles.container}>
// //       {/* LEFT SECTION */}
// //       <div className={styles.left}>
// //         <h1 className={styles.logo}>
// //           HRMS<span>AI</span>
// //         </h1>

// //         <h2 className={styles.heading}>Meet Your Smart HR Assistant</h2>
// //         <p className={styles.sub}>
// //           Just Ask – chat or speak, AI handles everything.
// //         </p>

// //         <div className={styles.bottomText}>
// //           <h3>HURRY UP! LOGIN</h3>
// //           <h4>&</h4>
// //           <h3>START USING NOW</h3>
// //         </div>

// //         <div className={styles.botIcon}>🤖</div>
// //       </div>

// //       {/* RIGHT SECTION (LOGIN) */}
// //       <div className={styles.right}>
// //         <LoginForm />
// //       </div>
// //     </div>
// //   );
// // }
// "use client";

// import LoginForm from "@/components/auth/LoginForm";

// export default function LoginPage() {
//   return (
//     <div style={{ padding: 24 }}>
//       <LoginForm />
//     </div>
//   );
// }
