export function authenticatedRedirectTo(returnTo: string | null, defaultRoute?: string): string {
  return returnTo ?? defaultRoute ?? "/";
}
