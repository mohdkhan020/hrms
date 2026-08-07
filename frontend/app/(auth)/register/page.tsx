// "use client";
// import styles from "../../home.module.css";
// import {SignupForm} from "@/components/auth/SignupForm";

// export default function Home() {
//   return (
//     <div className={styles.container}>
//       {/* LEFT SECTION */}
//       <div className={styles.left}>
//         <h1 className={styles.logo}>
//           HRMS<span>AI</span>
//         </h1>

//         <h2 className={styles.heading}>Meet Your Smart HR Assistant</h2>
//         <p className={styles.sub}>
//           Just Ask – chat or speak, AI handles everything.
//         </p>

//         <div className={styles.bottomText}>
//           <h3>HURRY UP! LOGIN</h3>
//           <h4>&</h4>
//           <h3>START USING NOW</h3>
//         </div>

//         <div className={styles.botIcon}>🤖</div>
//       </div>

//       {/* RIGHT SECTION (LOGIN) */}
//       <div className={styles.right}>
//         <SignupForm />
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useLayoutEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { SignupForm } from "@/components/auth/SignupForm";
// import styles from "../../home.module.css";

// export default function RegisterPage() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const particlesRef = useRef<HTMLDivElement>(null);

//   useLayoutEffect(() => {
//     const ctx = gsap.context(() => {
//       // ===== Floating particles =====
//       const particleContainer = particlesRef.current;
//       if (particleContainer) {
//         particleContainer.innerHTML = "";
//         for (let i = 0; i < 22; i++) {
//           const p = document.createElement("span");
//           p.className = styles.particle;
//           const size = gsap.utils.random(3, 7);
//           p.style.width = `${size}px`;
//           p.style.height = `${size}px`;
//           p.style.left = `${gsap.utils.random(0, 100)}%`;
//           p.style.top = `${gsap.utils.random(0, 100)}%`;
//           particleContainer.appendChild(p);

//           gsap.to(p, {
//             y: gsap.utils.random(-120, 120),
//             x: gsap.utils.random(-60, 60),
//             opacity: gsap.utils.random(0.2, 0.8),
//             duration: gsap.utils.random(4, 9),
//             repeat: -1,
//             yoyo: true,
//             ease: "sine.inOut",
//             delay: gsap.utils.random(0, 3),
//           });
//         }
//       }

//       gsap.set(containerRef.current, { opacity: 1, clearProps: "opacity" });

//       const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
//       tl.from(`.${styles.logoIcon}`, {
//         scale: 0,
//         rotate: -180,
//         opacity: 0,
//         duration: 0.8,
//         ease: "back.out(1.8)",
//       })
//         .from(
//           `.${styles.logoText}`,
//           { x: -20, opacity: 0, duration: 0.6 },
//           "-=0.4",
//         )
//         .from(`.${styles.badge}`, { y: 20, opacity: 0, duration: 0.6 }, "-=0.2")
//         .from(
//           `.${styles.headingWord}`,
//           {
//             y: 50,
//             opacity: 0,
//             rotateX: -40,
//             duration: 0.8,
//             stagger: 0.05,
//             transformOrigin: "50% 100%",
//           },
//           "-=0.2",
//         )
//         .from(`.${styles.sub}`, { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
//         .from(
//           `.${styles.statChip}`,
//           {
//             y: 25,
//             opacity: 0,
//             scale: 0.85,
//             duration: 0.5,
//             stagger: 0.12,
//             ease: "back.out(1.6)",
//           },
//           "-=0.3",
//         )
//         .from(
//           `.${styles.illustrationWrap}`,
//           { scale: 0.7, opacity: 0, duration: 1, ease: "elastic.out(1, 0.7)" },
//           "-=0.5",
//         )
//         .from(
//           `.${styles.right}`,
//           { x: 80, opacity: 0, duration: 0.9, ease: "power3.out" },
//           "-=0.9",
//         );

//       const failsafe = setTimeout(() => tl.progress(1), 2500);

//       gsap.to(`.${styles.illustrationWrap}`, {
//         y: -14,
//         duration: 3,
//         repeat: -1,
//         yoyo: true,
//         ease: "sine.inOut",
//       });

//       const left = containerRef.current?.querySelector(`.${styles.left}`);
//       const orbs = gsap.utils.toArray<HTMLElement>(`.${styles.orb}`);
//       const handleMouseMove = (e: MouseEvent) => {
//         const { innerWidth, innerHeight } = window;
//         const x = (e.clientX / innerWidth - 0.5) * 40;
//         const y = (e.clientY / innerHeight - 0.5) * 40;
//         orbs.forEach((o, i) => {
//           gsap.to(o, {
//             x: x * (i + 1) * 0.35,
//             y: y * (i + 1) * 0.35,
//             duration: 1.4,
//             ease: "power2.out",
//           });
//         });
//       };
//       left?.addEventListener("mousemove", handleMouseMove as EventListener);

//       gsap.to(`.${styles.ringRotate}`, {
//         rotate: 360,
//         duration: 24,
//         repeat: -1,
//         ease: "none",
//       });

//       return () => {
//         clearTimeout(failsafe);
//         left?.removeEventListener(
//           "mousemove",
//           handleMouseMove as EventListener,
//         );
//       };
//     }, containerRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <div className={styles.container} ref={containerRef}>
//       {/* LEFT SECTION */}
//       <div className={styles.left}>
//         <span
//           className={styles.orb}
//           style={{
//             width: 320,
//             height: 320,
//             top: "-80px",
//             right: "5%",
//             background: "#ffd200",
//           }}
//         />
//         <span
//           className={styles.orb}
//           style={{
//             width: 260,
//             height: 260,
//             bottom: "-80px",
//             left: "0%",
//             background: "#ff6fd8",
//           }}
//         />
//         <span
//           className={styles.orb}
//           style={{
//             width: 180,
//             height: 180,
//             top: "45%",
//             right: "35%",
//             background: "#00e5ff",
//           }}
//         />

//         <div className={styles.gridOverlay} />
//         <div className={styles.particles} ref={particlesRef} />

//         <div className={styles.leftInner}>
//           <div className={styles.logoRow}>
//             <div className={styles.logoIcon}>H</div>
//             <span className={styles.logoText}>
//               HRMS<span>.AI</span>
//             </span>
//           </div>

//           <span className={styles.badge}>
//             <span className={styles.badgeDot} /> AI-Powered HR Platform
//           </span>

//           <h1 className={styles.heading}>
//             {"Join Thousands of Smart Teams".split(" ").map((w, i) => (
//               <span key={i} className={styles.headingWord}>
//                 {w}&nbsp;
//               </span>
//             ))}
//           </h1>

//           <p className={styles.sub}>
//             Create your account and let AI simplify payroll, attendance &
//             performance — all in one place.
//           </p>

//           <div className={styles.statRow}>
//             <div className={styles.statChip}>
//               <strong>500+</strong>
//               <span>Companies</span>
//             </div>
//             <div className={styles.statChip}>
//               <strong>50k+</strong>
//               <span>Employees</span>
//             </div>
//             <div className={styles.statChip}>
//               <strong>24/7</strong>
//               <span>AI Support</span>
//             </div>
//           </div>

//           <div className={styles.illustrationWrap}>
//             <div className={styles.ringRotate}>
//               <span className={styles.ringDot} />
//             </div>
//             <div className={styles.botCore}>
//               <span className={styles.botPulse} />
//               <span className={styles.botPulse2} />
//               <span className={styles.botEmoji}>🚀</span>
//             </div>
//           </div>
//         </div>

//         <svg
//           className={styles.wave}
//           viewBox="0 0 1440 120"
//           preserveAspectRatio="none"
//         >
//           <path
//             fill="#ffffff"
//             fillOpacity="0.05"
//             d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,80C1120,85,1280,75,1360,69.3L1440,64L1440,120L0,120Z"
//           />
//         </svg>
//       </div>

//       {/* RIGHT SECTION (SIGNUP) */}
//       <div className={styles.right}>
//         <SignupForm />
//       </div>
//     </div>
//   );
// }





"use client";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { SignupForm } from "@/components/auth/SignupForm";
import styles from "../../home.module.css";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

export default function RegisterPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const rocketEmojiRef = useRef<HTMLSpanElement>(null);
  const isLaunchingRef = useRef(false);

  useLayoutEffect(() => {
      gsap.registerPlugin(MotionPathPlugin);
    const ctx = gsap.context(() => {
      // ===== Floating particles =====
      const particleContainer = particlesRef.current;
      if (particleContainer) {
        particleContainer.innerHTML = "";
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

      const failsafe = setTimeout(() => tl.progress(1), 2500);

      gsap.to(`.${styles.illustrationWrap}`, {
        y: -14,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

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

      gsap.to(`.${styles.ringRotate}`, {
        rotate: 360,
        duration: 24,
        repeat: -1,
        ease: "none",
      });

      return () => {
        clearTimeout(failsafe);
        left?.removeEventListener(
          "mousemove",
          handleMouseMove as EventListener,
        );
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

function spawnParticle(
  x: number,
  y: number,
  type: "fire" | "smoke",
  intensity = 1,
) {
  const el = document.createElement("div");
  const isFire = type === "fire";
  const size = isFire
    ? gsap.utils.random(6, 12) * intensity
    : gsap.utils.random(14, 26);

  el.style.position = "fixed";
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  el.style.width = `${size}px`;
  el.style.height = `${size}px`;
  el.style.borderRadius = "50%";
  el.style.pointerEvents = "none";
  el.style.zIndex = "9998";
  el.style.transform = "translate(-50%, -50%)";

  if (isFire) {
    el.style.background =
      "radial-gradient(circle, #fff5cc 0%, #ffb347 40%, #ff5722 75%, transparent 100%)";
    el.style.boxShadow = "0 0 14px rgba(255,140,0,0.85)";
  } else {
    el.style.background =
      "radial-gradient(circle, rgba(230,230,230,0.85) 0%, rgba(150,150,150,0.4) 60%, transparent 100%)";
    el.style.filter = "blur(1px)";
  }

  document.body.appendChild(el);

  gsap.to(el, {
    x: gsap.utils.random(-20, 20),
    y: gsap.utils.random(15, isFire ? 35 : 55) * intensity,
    scale: isFire ? gsap.utils.random(0.3, 0.6) : gsap.utils.random(1.8, 2.6),
    opacity: 0,
    duration: isFire
      ? gsap.utils.random(0.35, 0.6)
      : gsap.utils.random(0.8, 1.3),
    ease: "power1.out",
    onComplete: () => el.remove(),
  });
}

function spawnScreenSmoke(originX: number, originY: number) {
  const puffs: HTMLDivElement[] = [];
  const totalPuffs = 100; // 55 → 90 (zyada puffs = zyada dense)
  const w = window.innerWidth;
  const h = window.innerHeight;
  const maxSpread = Math.max(w, h) * 0.95; // 0.75 → 0.85 (thoda zyada spread)

  for (let i = 0; i < totalPuffs; i++) {
    const puff = document.createElement("div");
    const size = gsap.utils.random(180, 420); // 120-320 → 180-420 (bade puffs)
    const grey = gsap.utils.random(215, 248);

    puff.style.position = "fixed";
    puff.style.left = "0px";
    puff.style.top = "0px";
    puff.style.width = `${size}px`;
    puff.style.height = `${size}px`;
    puff.style.borderRadius = "50%";
    puff.style.pointerEvents = "none";
    puff.style.zIndex = "9997";
    puff.style.background = `radial-gradient(circle, rgba(${grey},${grey},${grey},1) 0%, rgba(${grey - 20},${grey - 20},${grey - 20},0.75) 45%, transparent 75%)`;
    puff.style.filter = "blur(6px)"; // 8px → 6px (thoda zyada solid, kam blur)
    puff.style.transform = `translate(${originX}px, ${originY}px) translate(-50%, -50%) scale(0.2)`;
    puff.style.opacity = "0";
    document.body.appendChild(puff);
    puffs.push(puff);

    const angle = Math.random() * Math.PI * 2;
    const distance = gsap.utils.random(maxSpread * 0.15, maxSpread);
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance - distance * 0.25;

    const delay = gsap.utils.random(0, 0.35);
    const riseDelay = gsap.utils.random(0, 0.3);

    const tl = gsap.timeline({ delay, onComplete: () => puff.remove() });

    tl.to(puff, {
      x: originX + dx,
      y: originY + dy,
      scale: gsap.utils.random(1.8, 3.2), // 1.4-2.6 → 1.8-3.2 (zyada bade ho jate hain)
      opacity: gsap.utils.random(0.75, 0.98), // 0.55-0.85 → 0.75-0.98 (zyada dense/opaque)
      duration: gsap.utils.random(0.6, 1.1),
      ease: "power2.out",
    })
      .to(
        puff,
        {
          y: `-=${gsap.utils.random(40, 90)}`,
          scale: `+=${gsap.utils.random(0.3, 0.7)}`,
          duration: gsap.utils.random(2, 2.8),
          ease: "sine.out",
        },
        riseDelay,
      )
      .to(
        puff,
        {
          opacity: 0,
          duration: gsap.utils.random(1.8, 2.6),
          ease: "power1.out",
        },
        ">-1.5",
      );
  }

  return puffs;
}

function launchRocket() {
  if (isLaunchingRef.current) return;
  const emoji = rocketEmojiRef.current;
  if (!emoji) return;

  isLaunchingRef.current = true;

  const rect = emoji.getBoundingClientRect();
  const startX = rect.left + rect.width / 2;
  const startY = rect.top + rect.height / 2;

  gsap.set(emoji, { opacity: 0 });

  const clone = document.createElement("div");
  clone.textContent = "🚀";
  clone.style.position = "fixed";
  clone.style.left = "0px";
  clone.style.top = "0px";
  clone.style.fontSize = "2.2rem";
  clone.style.zIndex = "9999";
  clone.style.pointerEvents = "none";
  clone.style.transformOrigin = "50% 50%";
  document.body.appendChild(clone);

  gsap.set(clone, {
    x: startX,
    y: startY,
    xPercent: -50,
    yPercent: -50,
    rotate: 0,
  });


  // launch burst — screen-wide smoke + local fire particles
  spawnScreenSmoke(startX, startY);
  for (let i = 0; i < 12; i++) spawnParticle(startX, startY, "fire");
  for (let i = 0; i < 8; i++) spawnParticle(startX, startY, "smoke", 1.5);

  const w = window.innerWidth;
  const h = window.innerHeight;
  const cx = w / 2;
  const cy = h / 2;
  const rx = Math.min(w, h) * 0.34;
  const ry = Math.min(w, h) * 0.28;

  // Loop path — do baar screen ghoomega (slow + total ~6s flight ke liye)
  const loopPath = [
    { x: startX, y: startY - 140 },
    { x: cx - rx, y: cy - ry * 0.5 },
    { x: cx - rx * 0.5, y: cy - ry },
    { x: cx + rx * 0.5, y: cy - ry },
    { x: cx + rx, y: cy },
    { x: cx + rx * 0.5, y: cy + ry },
    { x: cx - rx * 0.5, y: cy + ry },
    { x: cx - rx, y: cy },
    { x: cx - rx * 0.3, y: cy - ry * 0.6 },
    { x: cx + rx * 0.3, y: cy - ry * 0.8 },
    { x: cx + rx * 0.9, y: cy + ry * 0.2 },
    { x: cx, y: cy + ry * 0.5 },
    { x: startX + 20, y: startY - 200 },
  ];

  let flying = true;
  let thrusterIntensity = 1;
  const trailInterval = setInterval(() => {
    if (!flying) return;
    const r = clone.getBoundingClientRect();
    const cxNow = r.left + r.width / 2;
    const cyNow = r.top + r.height / 2;
    spawnParticle(cxNow, cyNow, "smoke", thrusterIntensity);
    spawnParticle(cxNow, cyNow, "fire", thrusterIntensity);
  }, 60);

  const tl = gsap.timeline({
    onComplete: () => {
      flying = false;
      clearInterval(trailInterval);

      for (let i = 0; i < 10; i++) spawnParticle(startX, startY, "fire", 1.3);

      gsap.to(clone, {
        scale: 0.6,
        opacity: 0,
        duration: 0.25,
        onComplete: () => {
          clone.remove();
          gsap.fromTo(
            emoji,
            { opacity: 0, scale: 0.5 },
            { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2)" },
          );
          isLaunchingRef.current = false;
        },
      });
    },
  });

  // ===== PHASE 1: LAUNCH (slower) =====
  tl.to(clone, {
    motionPath: {
      path: [
        { x: startX, y: startY },
        { x: startX, y: startY - 140 },
      ],
    },
    rotate: -8,
    duration: 0.7,
    ease: "power2.in",
  });

  // ===== PHASE 2: LOOP THE SCREEN (slow, ~4 seconds — total flight ≈6s) =====
  tl.to(clone, {
    motionPath: {
      path: loopPath,
      curviness: 1.4,
      autoRotate: 80,
    },
    duration: 4,
    ease: "sine.inOut",
  });

  // ===== PHASE 3: FLIP MANEUVER (vertical, tail-down) =====
  tl.to(clone, {
    rotate: 0,
    duration: 0.5,
    ease: "power2.inOut",
    onStart: () => {
      thrusterIntensity = 1.8;
    },
  });

  // Halka hover-hold before descent
  tl.to(clone, {
    y: "+=6",
    duration: 0.3,
    ease: "sine.inOut",
    yoyo: true,
    repeat: 1,
  });

  // ===== PHASE 4: SLOW-MOTION LANDING (3 sec, spiral wobble + slow descent) =====
  const landingStartX = () => {
    const r = clone.getBoundingClientRect();
    return r.left + r.width / 2;
  };

  tl.to(clone, { x: landingStartX() - 18, duration: 1.0, ease: "sine.inOut" })
    .to(clone, { x: landingStartX() + 18, duration: 1.0, ease: "sine.inOut" })
    .to(clone, { x: startX, duration: 1.0, ease: "sine.inOut" }, "<");

  tl.to(
    clone,
    {
      y: startY,
      duration: 3.0,
      ease: "power4.out",
      onUpdate: () => {
        thrusterIntensity = 1.5;
      },
    },
    "<",
  );
}

  return (
    <div className={styles.container} ref={containerRef}>
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
            {"Join Thousands of Smart Teams".split(" ").map((w, i) => (
              <span key={i} className={styles.headingWord}>
                {w}&nbsp;
              </span>
            ))}
          </h1>

          <p className={styles.sub}>
            Create your account and let AI simplify payroll, attendance &
            performance — all in one place.
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

          <div
            className={styles.illustrationWrap}
            onClick={launchRocket}
            style={{ cursor: "pointer" }}
          >
            <div className={styles.ringRotate}>
              <span className={styles.ringDot} />
            </div>
            <div className={styles.botCore}>
              <span className={styles.botPulse} />
              <span className={styles.botPulse2} />
              <span ref={rocketEmojiRef} className={styles.botEmoji}>
                🚀
              </span>
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

      {/* RIGHT SECTION (SIGNUP) */}
      <div className={styles.right}>
        <SignupForm />
      </div>
    </div>
  );
}
