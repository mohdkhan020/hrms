export async function api(url: string, options = {}) {
  const res = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + url, {
    credentials: "include",
    ...options,
  });

  if (!res.ok) throw new Error("Failed API: " + url);

  return res.json();
}
