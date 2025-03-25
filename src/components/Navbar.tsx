
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bell,
  Heart,
  Menu,
  Search,
  ShoppingCart,
  User,
  LogIn,
  LogOut,
  Package,
  Settings,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAppState } from "@/hooks/useAppState";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileSearchVisible, setMobileSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const { cartItems, favorites } = useAppState();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-200",
        isScrolled
          ? "bg-background/95 backdrop-blur-sm shadow-sm py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-bold tracking-tight flex items-center"
          >
            <ShoppingCart className="mr-2 h-5 w-5 text-primary" />
            ShopAssist
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/">
                    <NavigationMenuLink
                      className={cn(
                        "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                        location.pathname === "/" && "font-bold text-primary"
                      )}
                    >
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/products">
                    <NavigationMenuLink
                      className={cn(
                        "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                        location.pathname === "/products" &&
                          "font-bold text-primary"
                      )}
                    >
                      Products
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {["Clothing", "Footwear", "Accessories"].map(
                        (category) => (
                          <li key={category}>
                            <NavigationMenuLink asChild>
                              <Link
                                to={`/products?category=${category}`}
                                className="block select-none rounded-md p-3 hover:bg-accent hover:text-accent-foreground"
                              >
                                <div className="font-medium">{category}</div>
                                <div className="line-clamp-2 text-sm text-muted-foreground">
                                  Browse our {category.toLowerCase()} collection
                                </div>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        )
                      )}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                {user?.isAdmin && (
                  <NavigationMenuItem>
                    <Link to="/dashboard">
                      <NavigationMenuLink
                        className={cn(
                          "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                          location.pathname === "/dashboard" &&
                            "font-bold text-primary"
                        )}
                      >
                        Dashboard
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Desktop Search and Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="w-[200px] pl-9 rounded-full bg-background"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>

            <Link to="/favorites">
              <Button
                variant="outline"
                size="icon"
                className="relative"
                title="Favorites"
              >
                <Heart className="h-5 w-5" />
                {favorites.length > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center font-bold"
                  >
                    {favorites.length}
                  </Badge>
                )}
              </Button>
            </Link>

            <Link to="/cart">
              <Button
                variant="outline"
                size="icon"
                className="relative"
                title="Cart"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItems.length > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center font-bold"
                  >
                    {cartItems.length}
                  </Badge>
                )}
              </Button>
            </Link>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full h-9 w-9 overflow-hidden"
                  >
                    <Avatar>
                      <AvatarImage
                        src={user?.profilePicture}
                        alt={user?.name || "User"}
                      />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {user?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span>{user?.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {user?.email}
                      </span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link to="/profile" className="flex items-center w-full">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/favorites" className="flex items-center w-full">
                      <Heart className="mr-2 h-4 w-4" />
                      <span>Favorites</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/cart" className="flex items-center w-full">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      <span>Cart</span>
                    </Link>
                  </DropdownMenuItem>
                  {user?.isAdmin && (
                    <DropdownMenuItem>
                      <Link to="/dashboard" className="flex items-center w-full">
                        <Package className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <button
                      className="flex items-center w-full"
                      onClick={() => logout()}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild size="sm">
                <Link to="/signin">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile Icons */}
          <div className="flex md:hidden items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileSearchVisible(!mobileSearchVisible)}
            >
              <Search className="h-5 w-5" />
            </Button>

            <Link to="/favorites">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5" />
                {favorites.length > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center font-bold"
                  >
                    {favorites.length}
                  </Badge>
                )}
              </Button>
            </Link>

            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItems.length > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center font-bold"
                  >
                    {cartItems.length}
                  </Badge>
                )}
              </Button>
            </Link>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle className="text-xl font-bold tracking-tight flex items-center">
                    <ShoppingCart className="mr-2 h-5 w-5 text-primary" />
                    ShopAssist
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-1">
                  <Link to="/">
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      asChild
                    >
                      <div className="flex items-center">
                        Home
                        <ChevronRight className="ml-auto h-4 w-4" />
                      </div>
                    </Button>
                  </Link>
                  <Link to="/products">
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      asChild
                    >
                      <div className="flex items-center">
                        Products
                        <ChevronRight className="ml-auto h-4 w-4" />
                      </div>
                    </Button>
                  </Link>
                  <Link to="/favorites">
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      asChild
                    >
                      <div className="flex items-center">
                        Favorites
                        <ChevronRight className="ml-auto h-4 w-4" />
                      </div>
                    </Button>
                  </Link>
                  <Link to="/cart">
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      asChild
                    >
                      <div className="flex items-center">
                        Cart
                        <ChevronRight className="ml-auto h-4 w-4" />
                      </div>
                    </Button>
                  </Link>
                  {user?.isAdmin && (
                    <Link to="/dashboard">
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        asChild
                      >
                        <div className="flex items-center">
                          Dashboard
                          <ChevronRight className="ml-auto h-4 w-4" />
                        </div>
                      </Button>
                    </Link>
                  )}
                  <div className="pt-4 border-t mt-4">
                    {isAuthenticated ? (
                      <>
                        <div className="mb-4 flex items-center">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage
                              src={user?.profilePicture}
                              alt={user?.name || "User"}
                            />
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              {user?.name?.charAt(0) || "U"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user?.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {user?.email}
                            </p>
                          </div>
                        </div>
                        <Link to="/profile">
                          <Button
                            variant="ghost"
                            className="w-full justify-start"
                            asChild
                          >
                            <div className="flex items-center">
                              <User className="mr-2 h-4 w-4" />
                              Profile
                              <ChevronRight className="ml-auto h-4 w-4" />
                            </div>
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                          onClick={() => logout()}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Logout
                        </Button>
                      </>
                    ) : (
                      <Link to="/signin">
                        <Button className="w-full">
                          <LogIn className="mr-2 h-4 w-4" />
                          Sign In
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {mobileSearchVisible && (
          <div className="md:hidden mt-2 animate-fade-in">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            </form>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
