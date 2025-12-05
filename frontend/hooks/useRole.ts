import { cookies } from "next/headers";

export const useRole = async() => {
  return (await cookies()).get("role")?.value;
};
