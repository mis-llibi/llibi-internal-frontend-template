"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Boxes,
  History,
  LayoutDashboard,
  LogIn,
  Palette,
  Server,
  UserRound,
  type LucideIcon,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

type NavChild = {
  title: string;
  url: string;
};

type NavItem = {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive?: boolean;
  items?: NavChild[];
};

function BrandHeader() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          tooltip="LLIBI Portal Template"
          asChild
          className="h-14 group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:p-0 transition-all duration-200"
        >
          <Link href="/dashboard" className="flex items-center justify-center w-full">
            {/* Expanded view: Horizontal logo provided by user */}
            <div className="flex h-11 w-full items-center justify-center rounded-xl bg-white px-3 py-1.5 group-data-[collapsible=icon]:hidden transition-all hover:bg-slate-50/80">
              <Image
                src="/llibi.png"
                alt="Lacson & Lacson Insurance Brokers Inc. Logo"
                width={1024}
                height={222}
                unoptimized
                priority
                className="h-8 w-auto max-w-full object-contain"
              />
            </div>

            {/* Collapsed view: Icon mark logo provided by user */}
            <div className="hidden group-data-[collapsible=icon]:flex h-9 w-9 items-center justify-center rounded-xl bg-white p-1 shadow-xs border border-slate-200/90 transition-all">
              <Image
                src="/llibi-icon.png"
                alt="LLIBI Icon"
                width={1024}
                height={1024}
                unoptimized
                priority
                className="h-7 w-7 object-contain"
              />
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navMain: NavItem[] = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
      items: [{ title: "Overview", url: "/dashboard" }],
    },
    {
      title: "Activity Explorer",
      url: "/activity",
      icon: History,
      isActive: true,
      items: [{ title: "Audit Log", url: "/activity" }],
    },
    {
      title: "System Health",
      url: "/system",
      icon: Server,
      isActive: true,
      items: [{ title: "Telemetry & Sync", url: "/system" }],
    },
    {
      title: "UI Components",
      url: "/components",
      icon: Boxes,
      isActive: true,
      items: [{ title: "UI Kit & Inputs", url: "/components" }],
    },
    {
      title: "Profile",
      url: "/profile",
      icon: UserRound,
      isActive: true,
      items: [{ title: "User Profile", url: "/profile" }],
    },
    {
      title: "Appearance",
      url: "/settings/theme",
      icon: Palette,
      isActive: true,
      items: [{ title: "Theme Settings", url: "/settings/theme" }],
    },
    {
      title: "Authentication",
      url: "/login",
      icon: LogIn,
      items: [{ title: "Login Preview", url: "/login" }],
    },
  ];

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-slate-200/80 dark:border-slate-800"
      {...props}
    >
      <SidebarHeader className="pt-3 pb-2 px-3">
        <BrandHeader />
      </SidebarHeader>
      <SidebarContent className="px-1 justify-center">
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter className="p-3 border-t border-slate-200/60 dark:border-slate-800/60">
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
