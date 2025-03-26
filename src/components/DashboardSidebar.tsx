
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
      <Sidebar>
        <SidebarHeader>
          <h3 className="ml-2 text-lg font-semibold">Admin Controls</h3>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={activeView === "overview"}
                onClick={() => setActiveView("overview")}
              >
                <LayoutDashboard className="mr-2" />
                <span>Overview</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={activeView === "products"}
                onClick={() => setActiveView("products")}
              >
                <ShoppingBag className="mr-2" />
                <span>Products</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={activeView === "customers"}
                onClick={() => setActiveView("customers")}
              >
                <Users className="mr-2" />
                <span>Customers</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={activeView === "analytics"}
                onClick={() => setActiveView("analytics")}
              >
                <LineChart className="mr-2" />
                <span>Analytics</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={activeView === "settings"}
                onClick={() => setActiveView("settings")}
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
