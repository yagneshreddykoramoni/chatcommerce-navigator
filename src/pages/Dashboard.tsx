
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import AdminPanel from "@/components/AdminPanel";
import DashboardSidebar from "@/components/DashboardSidebar";
import SalesOverview from "@/components/SalesOverview";
import { mockSalesReports } from "@/components/admin-mock-data";

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState("overview");
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    } else if (!user?.isAdmin) {
      navigate("/");
    }
  }, [isAuthenticated, user, navigate]);

  if (!isAuthenticated || !user?.isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex min-h-[calc(100vh-65px)] mt-16">
        <DashboardSidebar activeView={activeView} setActiveView={setActiveView} />
        <div className="flex-1 p-4 md:p-6 overflow-x-hidden">
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your products, view sales reports, and handle user accounts
            </p>
          </div>

          {activeView === "overview" && <SalesOverview salesData={mockSalesReports} />}
          {activeView === "products" && <AdminPanel />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
