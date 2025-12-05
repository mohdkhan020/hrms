// import jwt from "jsonwebtoken";
// import { NextResponse } from "next/server";

// export async function verifyRole(req: Request, allowedRoles: string[]) {
//   try {
//     const cookie = (req.headers as any).get("cookie");
//     const token = cookie?.split("token=")[1];
//     if (!token) {
//       return {
//         allowed: false,
//         response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
//       };
//     }

//     const user = jwt.verify(token, process.env.JWT_SECRET!) as any;

//     if (!allowedRoles.includes(user.role)) {
//       return {
//         allowed: false,
//         response: NextResponse.json({ error: "Forbidden" }, { status: 403 }),
//       };
//     }

//     return { allowed: true, user };
//   } catch (error) {
//     return {
//       allowed: false,
//       response: NextResponse.json({ error: "Invalid Token" }, { status: 401 }),
//     };
//   }
// }
