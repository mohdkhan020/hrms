"use client";

import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <section
        className="d-flex align-items-center justify-content-center text-white"
        style={{
          height: "90vh",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1551836022-d5d88e9218df')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-center bg-dark bg-opacity-75 p-5 rounded">
          <h1 className="display-4 fw-bold">HRMS AI</h1>
          <p className="lead">Smart HR Management System for Modern Teams</p>
          <Link href="/login" className="underline">
            {/* Login */}
            <button className="btn btn-primary btn-lg mt-3">Get Started</button>
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section className="container py-5">
        <h2 className="text-center mb-5">Our Features</h2>
        <div className="row g-4">
          {[
            "Employee Management",
            "Payroll System",
            "Attendance Tracking",
            "AI Chat Assistant",
            "Performance Tracking",
            "Leave Management",
          ].map((item, i) => (
            <div key={i} className="col-md-4">
              <div className="card shadow h-100 border-0">
                <div className="card-body text-center">
                  <h5 className="card-title">{item}</h5>
                  <p className="card-text">
                    Efficiently manage {item.toLowerCase()} with automation.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="bg-light py-5">
        <div className="container text-center">
          <h2>Why Choose HRMS AI?</h2>
          <p className="mt-3">
            Our AI-powered system simplifies HR operations, boosts productivity,
            and enhances employee experience.
          </p>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="container py-5">
        <h2 className="text-center mb-5">Testimonials</h2>
        <div className="row">
          {[
            "Best HR tool I've used!",
            "Amazing automation features",
            "Saved our company hours",
          ].map((text, i) => (
            <div key={i} className="col-md-4">
              <div className="card shadow border-0 p-3">
                <p>"{text}"</p>
                <h6 className="mt-2">- User {i + 1}</h6>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-dark text-white py-4">
        <div className="container text-center">
          <h5>HRMS AI</h5>
          <p>© 2026 All Rights Reserved</p>
        </div>
      </footer>
    </>
  );
}
