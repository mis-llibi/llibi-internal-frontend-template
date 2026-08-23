"use client"

import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function NotificationMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <Bell />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-96 max-w-[calc(100vw-2rem)] p-0">
        <DropdownMenuLabel className="flex items-center justify-between px-3 py-2"><span>Notifications</span></DropdownMenuLabel>
        <DropdownMenuSeparator className="m-0" />
        <p className="px-3 py-8 text-center text-sm text-muted-foreground">You are all caught up.</p>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
