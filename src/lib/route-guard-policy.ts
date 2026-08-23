import type { User } from "@/types/UserTypes";

type RouteRule = {
  prefix: string;
  allowed: (user: User) => boolean;
  redirectTo: (user: User) => string;
};

const defaultRedirect = (user: User) => user.default_route ?? "/dashboard";

const ROUTE_RULES: RouteRule[] = [
  {
    prefix: "/dashboard",
    allowed: () => true,
    redirectTo: defaultRedirect,
  },
  {
    prefix: "/activity",
    allowed: () => true,
    redirectTo: defaultRedirect,
  },
  {
    prefix: "/system",
    allowed: () => true,
    redirectTo: defaultRedirect,
  },
  {
    prefix: "/components",
    allowed: () => true,
    redirectTo: defaultRedirect,
  },
  {
    prefix: "/profile",
    allowed: () => true,
    redirectTo: defaultRedirect,
  },
  {
    prefix: "/settings",
    allowed: () => true,
    redirectTo: defaultRedirect,
  },
];

export function routeRuleFor(pathname: string): RouteRule | null {
  return ROUTE_RULES.find((rule) => pathname === rule.prefix || pathname.startsWith(`${rule.prefix}/`)) ?? null;
}
