import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { HeaderTitle } from "@/components/header-title"
import { NotificationMenu } from "@/components/notification-menu"
import { RouteGuard } from "@/components/route-guard"

export default function AuthorizedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 border-b border-transparent px-4 backdrop-blur-md transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
           <HeaderTitle />
           <div className="ml-auto">
             <NotificationMenu />
           </div>
        </header>
        <main className="flex-1">
          <RouteGuard>{children}</RouteGuard>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
