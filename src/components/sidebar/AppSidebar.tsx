import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
  } from "@/components/ui/sidebar"
import { SidePanel } from "./SidePanel"
  
  export function AppSidebar() {
    return (
      <Sidebar>
        <SidebarHeader />
        <SidebarContent>
            <SidePanel />
        </SidebarContent>
        <SidebarFooter />
        <SidebarRail />
      </Sidebar>
    )
  }