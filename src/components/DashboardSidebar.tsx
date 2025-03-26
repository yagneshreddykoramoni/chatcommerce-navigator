
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
        className="border-r border-border"
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
                <span>Overview</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={activeView === "products"}
                onClick={() => setActiveView("products")}
                tooltip="Products"
              >
                <ShoppingBag className="mr-2" />
                <span>Products</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={activeView === "customers"}
                onClick={() => setActiveView("customers")}
                tooltip="Customers"
              >
                <Users className="mr-2" />
                <span>Customers</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={activeView === "analytics"}
                onClick={() => setActiveView("analytics")}
                tooltip="Analytics"
              >
                <LineChart className="mr-2" />
                <span>Analytics</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={activeView === "settings"}
                onClick={() => setActiveView("settings")}
                tooltip="Settings"
              >
                <Settings className="mr-2" />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
};

export default DashboardSidebar;
