import React from "react";

const HRMSLoader = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "rgb(33 37 41)",
        }}
      >
        <style>{`
        .dash {
          stroke-dasharray: 1 360;
          stroke-dashoffset: 0;
          opacity: 1;
          animation: dash-anim 4s ease-in-out infinite;
        }
        @keyframes dash-anim {
          0%   { stroke-dasharray: 1 360;   stroke-dashoffset: 0;   opacity: 1; }
          25%  { stroke-dasharray: 300 360; stroke-dashoffset: -30; opacity: 1; }
          50%  { stroke-dasharray: 300 360; stroke-dashoffset: -30; opacity: 1; }
          57%  { stroke-dasharray: 300 360; stroke-dashoffset: -30; opacity: 0; }
          58%  { stroke-dasharray: 1 360;   stroke-dashoffset: 0;   opacity: 0; }
          78%  { stroke-dasharray: 1 360;   stroke-dashoffset: 0;   opacity: 0; }
          83%  { stroke-dasharray: 1 360;   stroke-dashoffset: 0;   opacity: 1; }
          100% { stroke-dasharray: 1 360;   stroke-dashoffset: 0;   opacity: 1; }
        }
      `}</style>

        <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
          {/* Hidden Defs SVG */}
          <svg
            height="0"
            width="0"
            viewBox="0 0 64 64"
            style={{ position: "absolute" }}
          >
            <defs>
              <linearGradient
                gradientUnits="userSpaceOnUse"
                y2="2"
                x2="0"
                y1="62"
                x1="0"
                id="g-h"
              >
                <stop stopColor="#973BED" />
                <stop stopColor="#007CFF" offset="1" />
              </linearGradient>
              <linearGradient
                gradientUnits="userSpaceOnUse"
                y2="0"
                x2="0"
                y1="64"
                x1="0"
                id="g-r"
              >
                <stop stopColor="#FFC800" />
                <stop stopColor="#FF00FF" offset="1" />
                <animateTransform
                  repeatCount="indefinite"
                  keySplines=".42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1"
                  keyTimes="0;0.125;0.25;0.375;0.5;0.625;0.75;0.875;1"
                  dur="8s"
                  values="0 32 32;-270 32 32;-270 32 32;-540 32 32;-540 32 32;-810 32 32;-810 32 32;-1080 32 32;-1080 32 32"
                  type="rotate"
                  attributeName="gradientTransform"
                />
              </linearGradient>
              <linearGradient
                gradientUnits="userSpaceOnUse"
                y2="2"
                x2="0"
                y1="62"
                x1="0"
                id="g-m"
              >
                <stop stopColor="#00E0ED" />
                <stop stopColor="#00DA72" offset="1" />
              </linearGradient>
              <linearGradient
                gradientUnits="userSpaceOnUse"
                y2="2"
                x2="0"
                y1="62"
                x1="0"
                id="g-s"
              >
                <stop stopColor="#FF6B35" />
                <stop stopColor="#FF1744" offset="1" />
              </linearGradient>
            </defs>
          </svg>

          {/* H */}
          <svg
            fill="none"
            viewBox="0 0 64 64"
            height="64"
            width="64"
            style={{ display: "inline-block" }}
          >
            <path
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="8"
              stroke="url(#g-h)"
              d="M 10,4 L 10,60 M 10,32 L 54,32 M 54,4 L 54,60"
              className="dash"
              pathLength="360"
            />
          </svg>

          {/* R */}
          <svg
            fill="none"
            viewBox="0 0 64 64"
            height="64"
            width="64"
            style={{ display: "inline-block" }}
          >
            <path
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="8"
              stroke="url(#g-r)"
              d="M 10,60 L 10,4 L 36,4 Q 54,4 54,20 Q 54,36 36,36 L 10,36 M 30,36 L 54,60"
              className="dash"
              pathLength="360"
              style={{ animationDelay: "0.15s" }}
            />
          </svg>

          {/* M */}
          <svg
            fill="none"
            viewBox="0 0 64 64"
            height="64"
            width="64"
            style={{ display: "inline-block" }}
          >
            <path
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="8"
              stroke="url(#g-m)"
              d="M 4,60 L 4,4 L 32,34 L 60,4 L 60,60"
              className="dash"
              pathLength="360"
              style={{ animationDelay: "0.3s" }}
            />
          </svg>

          {/* S */}
          <svg
            fill="none"
            viewBox="0 0 64 64"
            height="64"
            width="64"
            style={{ display: "inline-block" }}
          >
            <path
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="8"
              stroke="url(#g-s)"
              d="M 52,16 Q 50,4 36,4 L 26,4 Q 10,4 10,18 Q 10,32 32,32 Q 54,32 54,46 Q 54,60 38,60 L 28,60 Q 10,60 10,48"
              className="dash"
              pathLength="360"
              style={{ animationDelay: "0.45s" }}
            />
          </svg>
        </div>
      </div>
    </>
  );
};

export default HRMSLoader;
