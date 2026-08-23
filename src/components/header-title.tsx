"use client"

import { usePathname } from "next/navigation"

export function HeaderTitle() {
  const pathname = usePathname()

  const title = getTitleFromPathname(pathname)

  return (
    <span className="text-sm font-medium text-muted-foreground">
      {title}
    </span>
  )
}

function getTitleFromPathname(pathname: string): string {
  if (!pathname) {
    return "LLIBI Portal Template"
  }

  if (pathname === "/dashboard") {
    return "Dashboard"
  }

  if (pathname === "/activity") {
    return "Activity Explorer"
  }

  if (pathname === "/system") {
    return "System Telemetry"
  }

  if (pathname === "/components") {
    return "UI Components Kit"
  }

  if (pathname === "/profile") {
    return "Profile"
  }

  if (pathname === "/settings/theme") {
    return "Theme Settings"
  }

  return "LLIBI Portal Template"
}
