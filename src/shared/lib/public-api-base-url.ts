/** API origin for browser requests (axios, fetch). From NEXT_PUBLIC_API_BASE_URL, no trailing slash. */
export function getPublicApiBaseUrl(): string {
  return (process.env.NEXT_PUBLIC_API_BASE_URL ?? "").trim().replace(/\/+$/, "");
}
