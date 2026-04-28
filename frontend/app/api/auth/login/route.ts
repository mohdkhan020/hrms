// import { NextResponse } from "next/server";


// export async function POST(req: Request) {
// const data = await req.json();
// const { email, password } = data;


// // Simple mock auth — replace with real auth-service call
// if (!email || !password) {
// return NextResponse.json({ error: "Missing" }, { status: 400 });
// }


// // mock users
// const users = [
// { id: "1", name: "Admin", email: "admin@local", role: "ADMIN" },
// { id: "2", name: "HR", email: "hr@local", role: "HR" },
// { id: "3", name: "Employee", email: "emp@local", role: "EMPLOYEE" }
// ];


// const user = users.find((u) => u.email === email);
// if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });


// // return a mock token + user
// return NextResponse.json({ token: `mock-token-${user.id}`, user });
// }
