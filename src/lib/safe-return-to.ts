export function safeReturnTo(value: string | null, origin: string): string | null {
  if (!value) return null;

  try {
    const url = new URL(value, origin);
    if (url.origin !== origin || !url.pathname.startsWith("/")) return null;

    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return null;
  }
}
