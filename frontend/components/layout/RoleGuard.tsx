"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";


export default function RoleGuard({ allowedRoles, children }: { allowedRoles: string[]; children: React.ReactNode }) {
const { user, loading } = useAuth();
const router = useRouter();


useEffect(() => {
if (!loading) {
if (!user) router.push("/login");
else if (!allowedRoles.includes(user.role)) router.push("/unauthorized");
}
}, [user, loading, router, allowedRoles]);


if (loading) return <p>Loading...</p>;
return <>{children}</>;
}