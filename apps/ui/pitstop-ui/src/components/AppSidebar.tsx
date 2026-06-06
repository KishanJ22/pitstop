import { Link } from "@tanstack/react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuItem,
  SidebarSeparator,
} from "./shadcn/ui/sidebar";
import { Image } from "@unpic/react";
import type { PropsWithChildren } from "react";

interface AppSidebarNavItemProps {
  to: string;
  label: string;
}

const AppSidebarNavItem = ({
  to,
  label,
}: PropsWithChildren<AppSidebarNavItemProps>) => (
  <Link to={to}>
    <SidebarMenuItem className="mt-3 rounded-lg px-2 py-1 font-sans font-semibold text-lg border border-surface-lightest text-neutral-lightest hover:bg-surface-lightest data-[active=true]:bg-surface-lightest transition-colors">
      {label}
    </SidebarMenuItem>
  </Link>
);

const AppSidebar = () => {
  return (
    <Sidebar side="left" variant="floating">
      <SidebarHeader />
      <SidebarContent>
        <Link to="/" className="font-bold text-3xl pl-3">
          <div className="flex flex-row gap-x-1 items-center">
            <Image
              src="/main_logo.png"
              alt="Pitstop Logo"
              layout="constrained"
              height={30}
              width={30}
            />
            itstop
          </div>
        </Link>
        <SidebarGroup>
          <AppSidebarNavItem to="/overview" label="Overview" />
          <AppSidebarNavItem to="/projects" label="Projects" />
          <AppSidebarNavItem to="/vulnerabilities" label="Vulnerabilities" />
          <AppSidebarNavItem to="/deployments" label="Deployments" />
        </SidebarGroup>
        <SidebarGroup>
          <AppSidebarNavItem to="/settings" label="Settings" />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default AppSidebar;
