// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// // Temporary middleware that allows all routes
// export function middleware(req: NextRequest) {
//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/:path*" // apply to all routes, but no redirects
//   ],
// };
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req:any) {
  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const { payload } = await jwtVerify(token, secret);

    const role = payload.role;

    // Admin routes
    if (pathname.startsWith("/admin") && role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    // HR routes
    if (pathname.startsWith("/hr") && role !== "hr") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    // Employee routes
    if (pathname.startsWith("/employee") && role !== "employee") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/hr/:path*", "/employee/:path*"],
};
