import { Link } from "@tanstack/react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "./shadcn/ui/sidebar";
import { Image } from "@unpic/react";

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="flex flex-row gap-x-2 items-center">
                <Image
                  src="/main_logo.png"
                  alt="Pitstop Logo"
                  layout="constrained"
                  height={30}
                  width={30}
                />
                <Link to="/" className="font-semibold text-3xl">
                  Pitstop
                </Link>
              </div>
            </SidebarMenuItem>
            <SidebarMenuItem>Dashboard</SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default AppSidebar;
