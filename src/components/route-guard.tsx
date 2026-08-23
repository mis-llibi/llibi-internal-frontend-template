"use client";

import { useEffect, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { MoonLoader } from "react-spinners";
import { useAuth } from "@/hooks/auth";
import { routeRuleFor } from "@/lib/route-guard-policy";

const CONSENT_PAGES = ["/privacy-consent", "/unable-to-access"];

export function RouteGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, isLoading } = useAuth({ middleware: "auth" });
  const router = useRouter();

  const rule = useMemo(() => routeRuleFor(pathname), [pathname]);

  const isBlocked = useMemo(() => {
    if (!user || !rule) return false;
    return !rule.allowed(user);
  }, [user, rule]);

  useEffect(() => {
    if (!user || !rule) return;
    if (!rule.allowed(user)) {
      router.replace(rule.redirectTo(user));
    }
  }, [user, rule, router]);

  useEffect(() => {
    if (!user || isLoading) return;
    if (CONSENT_PAGES.includes(pathname)) return;

    if (user.privacy_consent?.required) {
      const returnTo = `${pathname}${window.location.search}${window.location.hash}`;
      router.replace(`/privacy-consent?returnTo=${encodeURIComponent(returnTo)}`);
    }
  }, [user, isLoading, pathname, router]);

  if (isLoading || (user && isBlocked)) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <MoonLoader size={32} color="hsl(var(--primary))" />
      </div>
    );
  }

  return <>{children}</>;
}
