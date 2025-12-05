// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(req: NextRequest) {
//   const token = req.cookies.get("token")?.value;
//   const role = req.cookies.get("role")?.value;

//   const url = req.nextUrl.pathname;

//   // Public routes
//   if (
//     url.startsWith("/auth/login") ||
//     url.startsWith("/auth/register") ||
//     url.startsWith("/auth/forgot-password")
//   ) {
//     if (token) return NextResponse.redirect(new URL("/dashboard", req.url));
//     return NextResponse.next();
//   }

//   // Protected routes
//   if (url.startsWith("/dashboard")) {
//     if (!token) return NextResponse.redirect(new URL("/auth/login", req.url));
//   }

//   // Role based access
//   if (url.startsWith("/dashboard/admin") && role !== "ADMIN") {
//     return NextResponse.redirect(new URL("/dashboard", req.url));
//   }

//   if (url.startsWith("/dashboard/hr") && role !== "HR") {
//     return NextResponse.redirect(new URL("/dashboard", req.url));
//   }

//   if (url.startsWith("/dashboard/employee") && role !== "EMPLOYEE") {
//     return NextResponse.redirect(new URL("/dashboard", req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/dashboard/:path*",
//     "/auth/:path*"
//   ],
// };

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Temporary middleware that allows all routes
export function middleware(req: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/:path*" // apply to all routes, but no redirects
  ],
};

// import { NextResponse } from "next/server";

// export function middleware(req: {
//   cookies: { get: (arg0: string) => { (): any; new (): any; value: any } };
//   nextUrl: { pathname: any };
//   url: string | URL | undefined;
// }) {
//   const role = req.cookies.get("role")?.value;
//   const url = req.nextUrl.pathname;

//   if (url.startsWith("/dashboard/admin")) {
//     if (role !== "ADMIN") {
//       return NextResponse.redirect(new URL("/dashboard", req.url));
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/admin/:path*"],
// };

// app/
//  └── dashboard/
//         ├── admin/
//         │     ├── page.tsx      ← Admin Dashboard
//         │     ├── employees/
//         │     ├── attendance/
//         │     ├── leave/
//         │     ├── payroll/
//         │     └── settings/
//         │
//         ├── hr/
//         │     ├── page.tsx      ← HR Dashboard
//         │     ├── employees/
//         │     ├── attendance/
//         │     ├── leave/
//         │     ├── payroll/
//         │     └── settings/
//         │
//         ├── employee/
//         │     ├── page.tsx      ← Employee Dashboard
//         │     ├── attendance/
//         │     ├── leaves/
//         │     ├── payroll/
//         │     └── profile/
//         │
//         ├── page.tsx            ← Optional: General dashboard
//         ├── layout.tsx
