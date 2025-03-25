
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Settings, Package, CreditCard, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAppState } from "@/hooks/useAppState";

const Profile = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { favorites, cartItems, bookedItems } = useAppState();
  const [activeTab, setActiveTab] = useState("profile");
  
  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    });
  };
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings updated",
      description: "Your settings have been successfully updated.",
    });
  };
  
  const handleLogout = () => {
    logout();
    navigate("/signin");
  };
  
  if (!isAuthenticated) {
    navigate("/signin");
    return null;
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight">My Account</h1>
          <p className="text-muted-foreground">
            Manage your profile and settings
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <Card className="lg:col-span-1">
            <CardContent className="p-6">
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  {user?.profilePicture ? (
                    <img 
                      src={user.profilePicture} 
                      alt={user.name} 
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-12 w-12 text-primary" />
                  )}
                </div>
                <h2 className="text-xl font-medium">{user?.name}</h2>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
              
              <nav className="space-y-1">
                <Button 
                  variant={activeTab === "profile" ? "default" : "ghost"} 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab("profile")}
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
                <Button 
                  variant={activeTab === "orders" ? "default" : "ghost"} 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab("orders")}
                >
                  <Package className="mr-2 h-4 w-4" />
                  Orders
                  {cartItems.length > 0 && (
                    <span className="ml-auto bg-primary/10 text-primary text-xs rounded-full px-2 py-0.5">
                      {cartItems.length}
                    </span>
                  )}
                </Button>
                <Button 
                  variant={activeTab === "payments" ? "default" : "ghost"} 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab("payments")}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Payments
                </Button>
                <Button 
                  variant={activeTab === "settings" ? "default" : "ghost"} 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab("settings")}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </nav>
            </CardContent>
          </Card>
          
          {/* Content */}
          <div className="lg:col-span-3 space-y-6">
            {activeTab === "profile" && (
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your personal information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue={user?.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue={user?.email} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="Enter your phone number" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" placeholder="Enter your address" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveProfile}>Save Changes</Button>
                </CardFooter>
              </Card>
            )}
            
            {activeTab === "orders" && (
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                  <CardDescription>
                    View your recent orders and bookings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="orders">
                    <TabsList className="mb-4">
                      <TabsTrigger value="orders">Current Cart</TabsTrigger>
                      <TabsTrigger value="bookings">Bookings</TabsTrigger>
                      <TabsTrigger value="history">Order History</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="orders">
                      {cartItems.length === 0 ? (
                        <p className="text-muted-foreground text-center py-10">
                          Your cart is empty. Start shopping to add products.
                        </p>
                      ) : (
                        <div className="space-y-4">
                          {cartItems.map(item => (
                            <div key={item.product.id} className="flex items-center justify-between p-3 border rounded">
                              <div className="flex items-center">
                                <img 
                                  src={item.product.imageUrl} 
                                  alt={item.product.name} 
                                  className="h-12 w-12 object-cover rounded mr-3"
                                />
                                <div>
                                  <h4 className="font-medium">{item.product.name}</h4>
                                  <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                                </div>
                              </div>
                              <Button variant="outline" size="sm" onClick={() => navigate("/cart")}>
                                View in Cart
                              </Button>
                            </div>
                          ))}
                          <div className="flex justify-end">
                            <Button onClick={() => navigate("/cart")}>Go to Cart</Button>
                          </div>
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="bookings">
                      {bookedItems.length === 0 ? (
                        <p className="text-muted-foreground text-center py-10">
                          You haven't booked any products yet.
                        </p>
                      ) : (
                        <div className="space-y-4">
                          {bookedItems.map(item => (
                            <div key={item.product.id} className="flex items-center justify-between p-3 border rounded">
                              <div className="flex items-center">
                                <img 
                                  src={item.product.imageUrl} 
                                  alt={item.product.name} 
                                  className="h-12 w-12 object-cover rounded mr-3"
                                />
                                <div>
                                  <h4 className="font-medium">{item.product.name}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    Booked for: {item.date.toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              <Button variant="outline" size="sm" onClick={() => navigate(`/products/${item.product.id}`)}>
                                View Product
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="history">
                      <p className="text-muted-foreground text-center py-10">
                        No order history available yet.
                      </p>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}
            
            {activeTab === "payments" && (
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>
                    Manage your payment methods
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center py-10">
                    No payment methods added yet.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button>Add Payment Method</Button>
                </CardFooter>
              </Card>
            )}
            
            {activeTab === "settings" && (
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Update your account preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <select 
                      id="language" 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="theme">Theme</Label>
                    <select 
                      id="theme" 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                    >
                      <option value="system">System</option>
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                    </select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveSettings}>Save Settings</Button>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
