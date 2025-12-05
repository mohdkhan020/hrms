import { NextResponse } from "next/server";


export async function GET(req: Request) {
const token = req.headers.get("authorization")?.replace("Bearer ", "");
if (!token) return NextResponse.json({ error: "No token" }, { status: 401 });


// simple decode mock
if (token.includes("mock-token-1"))
return NextResponse.json({ user: { id: "1", name: "Admin", role: "ADMIN", email: "admin@local" } });
if (token.includes("mock-token-2"))
return NextResponse.json({ user: { id: "2", name: "HR", role: "HR", email: "hr@local" } });
if (token.includes("mock-token-3"))
return NextResponse.json({ user: { id: "3", name: "Employee", role: "EMPLOYEE", email: "emp@local" } });


return NextResponse.json({ error: "Invalid token" }, { status: 401 });
}