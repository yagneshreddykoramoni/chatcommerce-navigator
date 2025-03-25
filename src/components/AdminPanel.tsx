
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Product, SalesReport } from "@/types";
import { BarChart, LineChart } from "@/components/ui/chart";
import { PlusCircle, Edit, Trash2, Search, ArrowUpDown, Download } from "lucide-react";
import { mockProducts, mockUsers, mockSalesReports } from "./admin-mock-data";
import { toast } from "@/hooks/use-toast";

// Let's define the mock data here since we don't have a separate file for it
const mockUsers = [
  { id: "1", name: "John Doe", email: "john@example.com", isAdmin: false, orders: 5, lastActive: "2023-07-15" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", isAdmin: false, orders: 12, lastActive: "2023-07-20" },
  { id: "3", name: "Admin User", email: "admin@example.com", isAdmin: true, orders: 0, lastActive: "2023-07-22" },
];

const mockSalesReports: SalesReport[] = [
  {
    date: "2023-07-16",
    totalSales: 1250.75,
    productsSold: 18,
    topSellingProducts: [
      { productId: "1", productName: "Casual Shirt", quantity: 5 },
      { productId: "2", productName: "Formal Blazer", quantity: 3 },
      { productId: "3", productName: "Sneakers", quantity: 4 }
    ]
  },
  {
    date: "2023-07-17",
    totalSales: 980.50,
    productsSold: 15,
    topSellingProducts: [
      { productId: "3", productName: "Sneakers", quantity: 6 },
      { productId: "1", productName: "Casual Shirt", quantity: 4 },
      { productId: "2", productName: "Formal Blazer", quantity: 2 }
    ]
  },
  {
    date: "2023-07-18",
    totalSales: 1350.25,
    productsSold: 22,
    topSellingProducts: [
      { productId: "1", productName: "Casual Shirt", quantity: 8 },
      { productId: "3", productName: "Sneakers", quantity: 7 },
      { productId: "2", productName: "Formal Blazer", quantity: 4 }
    ]
  },
  {
    date: "2023-07-19",
    totalSales: 875.60,
    productsSold: 14,
    topSellingProducts: [
      { productId: "3", productName: "Sneakers", quantity: 5 },
      { productId: "2", productName: "Formal Blazer", quantity: 4 },
      { productId: "1", productName: "Casual Shirt", quantity: 3 }
    ]
  },
  {
    date: "2023-07-20",
    totalSales: 1420.30,
    productsSold: 24,
    topSellingProducts: [
      { productId: "1", productName: "Casual Shirt", quantity: 9 },
      { productId: "3", productName: "Sneakers", quantity: 8 },
      { productId: "2", productName: "Formal Blazer", quantity: 5 }
    ]
  },
  {
    date: "2023-07-21",
    totalSales: 1050.75,
    productsSold: 17,
    topSellingProducts: [
      { productId: "3", productName: "Sneakers", quantity: 7 },
      { productId: "1", productName: "Casual Shirt", quantity: 6 },
      { productId: "2", productName: "Formal Blazer", quantity: 3 }
    ]
  },
  {
    date: "2023-07-22",
    totalSales: 1680.90,
    productsSold: 28,
    topSellingProducts: [
      { productId: "1", productName: "Casual Shirt", quantity: 11 },
      { productId: "3", productName: "Sneakers", quantity: 10 },
      { productId: "2", productName: "Formal Blazer", quantity: 6 }
    ]
  }
];

const AdminPanel = () => {
  const [products] = useState<Product[]>(mockProducts);
  const [users] = useState(mockUsers);
  const [salesReports] = useState<SalesReport[]>(mockSalesReports);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data for charts
  const salesData = salesReports.map(report => ({
    name: report.date.substring(5), // Format as MM-DD
    total: report.totalSales
  }));

  const productData = salesReports.map(report => ({
    name: report.date.substring(5),
    products: report.productsSold
  }));

  const handleAddProduct = () => {
    toast({
      title: "Feature not implemented",
      description: "This would open a form to add a new product",
    });
  };

  const handleEditProduct = (productId: string) => {
    toast({
      title: "Feature not implemented",
      description: `This would edit product with ID: ${productId}`,
    });
  };

  const handleDeleteProduct = (productId: string) => {
    toast({
      title: "Feature not implemented",
      description: `This would delete product with ID: ${productId}`,
    });
  };

  const handleDownloadReport = () => {
    toast({
      title: "Feature not implemented",
      description: "This would download the sales report",
    });
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full p-4 space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="reports">Sales Reports</TabsTrigger>
        </TabsList>
        
        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Revenue</CardTitle>
                <CardDescription>Last 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${salesReports.reduce((sum, report) => sum + report.totalSales, 0).toFixed(2)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Products Sold</CardTitle>
                <CardDescription>Last 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {salesReports.reduce((sum, report) => sum + report.productsSold, 0)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Active Users</CardTitle>
                <CardDescription>Total registered users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{users.length}</div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sales Overview</CardTitle>
                <CardDescription>Daily revenue for the last 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <LineChart
                  data={salesData}
                  categories={["total"]}
                  index="name"
                  colors={["#0ea5e9"]}
                  valueFormatter={(value) => `$${value.toFixed(2)}`}
                  className="h-[300px]"
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Products Sold</CardTitle>
                <CardDescription>Daily units sold for the last 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={productData}
                  categories={["products"]}
                  index="name"
                  colors={["#10b981"]}
                  valueFormatter={(value) => `${value} units`}
                  className="h-[300px]"
                />
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Top Selling Products</CardTitle>
              <CardDescription>Most popular items in the last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product Name</TableHead>
                    <TableHead className="text-right">Units Sold</TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Calculate top products across all reports */}
                  {Object.values(
                    salesReports.flatMap(report => report.topSellingProducts)
                      .reduce((acc, product) => {
                        if (!acc[product.productId]) {
                          acc[product.productId] = {
                            productId: product.productId,
                            productName: product.productName,
                            quantity: 0,
                            revenue: 0
                          };
                        }
                        acc[product.productId].quantity += product.quantity;
                        // Estimated revenue based on quantity and a product from our products array
                        const productPrice = products.find(p => p.id === product.productId)?.price || 0;
                        acc[product.productId].revenue += product.quantity * productPrice;
                        return acc;
                      }, {} as Record<string, { productId: string; productName: string; quantity: number; revenue: number }>)
                  )
                    .sort((a, b) => b.quantity - a.quantity)
                    .slice(0, 5)
                    .map(product => (
                      <TableRow key={product.productId}>
                        <TableCell>{product.productName}</TableCell>
                        <TableCell className="text-right">{product.quantity}</TableCell>
                        <TableCell className="text-right">${product.revenue.toFixed(2)}</TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Products Tab */}
        <TabsContent value="products" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative w-64">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search products..." 
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={handleAddProduct}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map(product => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>${product.price.toFixed(2)}</TableCell>
                      <TableCell>
                        {product.inStock ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            In Stock
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Out of Stock
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleEditProduct(product.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <Card className="p-4">
            <CardTitle className="text-lg mb-4">Add New Product</CardTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="product-name">Product Name</Label>
                <Input id="product-name" placeholder="Enter product name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-category">Category</Label>
                <Input id="product-category" placeholder="Enter category" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-price">Price</Label>
                <Input id="product-price" type="number" placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-image">Image URL</Label>
                <Input id="product-image" placeholder="Enter image URL" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="product-description">Description</Label>
                <Textarea id="product-description" placeholder="Enter product description" />
              </div>
              <div className="space-y-2 md:col-span-2 flex justify-end">
                <Button className="w-full md:w-auto">Add Product</Button>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        {/* Users Tab */}
        <TabsContent value="users" className="space-y-4">
          <div className="relative w-64">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search users..." 
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        Orders
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>Last Active</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map(user => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        {user.isAdmin ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            Admin
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Customer
                          </span>
                        )}
                      </TableCell>
                      <TableCell>{user.orders}</TableCell>
                      <TableCell>{user.lastActive}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Sales Reports Tab */}
        <TabsContent value="reports" className="space-y-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Sales Reports</CardTitle>
            <Button onClick={handleDownloadReport}>
              <Download className="h-4 w-4 mr-2" />
              Download CSV
            </Button>
          </div>
          
          <Card>
            <CardContent>
              <LineChart
                data={salesData}
                categories={["total"]}
                index="name"
                colors={["#0ea5e9"]}
                valueFormatter={(value) => `$${value.toFixed(2)}`}
                className="h-[300px]"
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Products Sold</TableHead>
                    <TableHead className="text-right">Total Sales</TableHead>
                    <TableHead>Top Selling Product</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salesReports.map(report => (
                    <TableRow key={report.date}>
                      <TableCell>{report.date}</TableCell>
                      <TableCell className="text-right">{report.productsSold}</TableCell>
                      <TableCell className="text-right">${report.totalSales.toFixed(2)}</TableCell>
                      <TableCell>{report.topSellingProducts[0]?.productName}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;
