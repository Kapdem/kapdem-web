import { cookies } from "next/headers";

export function getAuthCookie() {
  const cookieStore = cookies();
  return cookieStore.get("Authentication")?.value || null;
}
