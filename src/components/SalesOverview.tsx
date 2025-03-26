
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SalesReport } from "@/types";
import { TrendingUp, TrendingDown, DollarSign, ShoppingBag } from "lucide-react";

interface SalesOverviewProps {
  salesData: SalesReport[];
}

const SalesOverview = ({ salesData }: SalesOverviewProps) => {
  // Calculate total revenue and products sold from the sales data
  const totalRevenue = salesData.reduce((sum, report) => sum + report.totalSales, 0);
  const totalProducts = salesData.reduce((sum, report) => sum + report.productsSold, 0);
  
  // Calculate revenue trend (positive or negative)
  const revenueChange = salesData.length > 1 
    ? ((salesData[salesData.length - 1].totalSales - salesData[0].totalSales) / salesData[0].totalSales) * 100
    : 0;
  
  // Get top selling products across all days
  const topProductsMap = new Map();
  salesData.forEach(day => {
    day.topSellingProducts.forEach(product => {
      const currentCount = topProductsMap.get(product.productName) || 0;
      topProductsMap.set(product.productName, currentCount + product.quantity);
    });
  });
  
  // Convert to array and sort by quantity
  const topProducts = Array.from(topProductsMap.entries())
    .map(([name, quantity]) => ({ name, quantity }))
    .sort((a, b) => (b.quantity as number) - (a.quantity as number))
    .slice(0, 3);
  
  return (
    <div className="grid gap-6 grid-cols-1 lg:grid-cols-4">
      {/* Revenue Overview Card */}
      <Card className="col-span-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <DollarSign className="w-5 h-5 mr-2 text-muted-foreground" />
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
          </div>
          <div className="flex items-center mt-2 text-xs">
            {revenueChange >= 0 ? (
              <>
                <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
                <span className="text-green-500">+{revenueChange.toFixed(1)}%</span>
              </>
            ) : (
              <>
                <TrendingDown className="w-4 h-4 mr-1 text-red-500" />
                <span className="text-red-500">{revenueChange.toFixed(1)}%</span>
              </>
            )}
            <span className="ml-1 text-muted-foreground">from first day</span>
          </div>
        </CardContent>
      </Card>

      {/* Products Sold Card */}
      <Card className="col-span-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Products Sold</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <ShoppingBag className="w-5 h-5 mr-2 text-muted-foreground" />
            <div className="text-2xl font-bold">{totalProducts}</div>
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            Across all product categories
          </div>
        </CardContent>
      </Card>

      {/* Top Products Card */}
      <Card className="col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Top Selling Products</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {topProducts.map((product, index) => (
              <li key={index} className="flex justify-between items-center">
                <span className="font-medium">{product.name}</span>
                <span className="text-muted-foreground">{product.quantity} units</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Sales Chart */}
      <Card className="col-span-1 lg:col-span-4">
        <CardHeader>
          <CardTitle>Sales Overview</CardTitle>
          <CardDescription>Daily sales for the last period</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={salesData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`$${value}`, 'Sales']}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Bar dataKey="totalSales" fill="#8884d8" name="Sales" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesOverview;
