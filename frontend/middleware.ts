
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
