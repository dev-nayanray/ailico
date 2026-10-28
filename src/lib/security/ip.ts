/**
 * Client-IP extraction with a configurable trusted-proxy strategy.
 *
 * Default (TRUST_PROXY_HEADERS=true): trust platform-injected headers.
 * On Cloudflare, CF-Connecting-IP is set by the edge and cannot be spoofed
 * from the client, so it takes priority. On other proxies, the first hop of
 * X-Forwarded-For is the client as reported by the proxy.
 *
 * When TRUST_PROXY_HEADERS=false (e.g. direct exposure / debugging), headers
 * are ignored and all requests share a single bucket — safe, just coarse.
 */

export function clientIpFromHeaders(headers: Headers): string {
  const trustProxy = (process.env.TRUST_PROXY_HEADERS ?? "true") === "true";
  if (!trustProxy) return "unknown";

  const connectingIp = headers.get("cf-connecting-ip");
  if (connectingIp) return connectingIp.trim();

  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();

  return headers.get("x-real-ip")?.trim() ?? "unknown";
}
