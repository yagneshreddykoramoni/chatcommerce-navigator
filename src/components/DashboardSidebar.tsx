
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Settings,
  LineChart,
} from "lucide-react";

interface DashboardSidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const DashboardSidebar = ({ activeView, setActiveView }: DashboardSidebarProps) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar 
        className="border-r border-border w-64 min-w-64 max-w-64"
        side="left" 
        variant="sidebar"
        collapsible="icon"
      >
        <SidebarHeader className="pt-4">
          <h3 className="ml-2 text-lg font-semibold">Admin Controls</h3>
        </SidebarHeader>
        <SidebarContent className="mt-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={activeView === "overview"}
                onClick={() => setActiveView("overview")}
                tooltip="Overview"
              >
                <LayoutDashboard className="mr-2" />
                <span className="truncate">Overview</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={activeView === "products"}
                onClick={() => setActiveView("products")}
                tooltip="Products"
              >
                <ShoppingBag className="mr-2" />
                <span className="truncate">Products</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={activeView === "customers"}
                onClick={() => setActiveView("customers")}
                tooltip="Customers"
              >
                <Users className="mr-2" />
                <span className="truncate">Customers</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={activeView === "analytics"}
                onClick={() => setActiveView("analytics")}
                tooltip="Analytics"
              >
                <LineChart className="mr-2" />
                <span className="truncate">Analytics</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={activeView === "settings"}
                onClick={() => setActiveView("settings")}
                tooltip="Settings"
              >
                <Settings className="mr-2" />
                <span className="truncate">Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
};

export default DashboardSidebar;
