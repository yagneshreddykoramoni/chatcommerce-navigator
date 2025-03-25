
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Search, ShoppingCart, Menu, X, User, LogOut, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Products", path: "/products" },
    ...(user?.isAdmin ? [{ title: "Dashboard", path: "/dashboard" }] : []),
  ];

  const NavItems = () => (
    <>
      {navLinks.map((link) => (
        <li key={link.path}>
          <Link
            to={link.path}
            className={cn(
              "nav-link px-4 py-2 text-foreground/80 hover:text-foreground transition-colors",
              location.pathname === link.path && "font-medium text-primary"
            )}
          >
            {link.title}
          </Link>
        </li>
      ))}
    </>
  );

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-white/80 backdrop-blur-md shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 py-3">
        <nav className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold tracking-tight mr-8">
              ShopAssist
            </Link>
            
            {!isMobile && (
              <ul className="hidden md:flex space-x-2">
                <NavItems />
              </ul>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-foreground/80 hover:text-foreground">
              <Search className="h-5 w-5" />
            </Button>
            
            <Button variant="ghost" size="icon" className="text-foreground/80 hover:text-foreground">
              <ShoppingCart className="h-5 w-5" />
            </Button>

            {!isAuthenticated ? (
              <Link to="/signin">
                <Button variant="default" size="sm" className="animate-fade-in">
                  Sign In
                </Button>
              </Link>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8 transition-transform hover:scale-105">
                      <AvatarImage src={user?.profilePicture} alt={user?.name} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {user?.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 mt-1 glass-panel">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="font-medium">{user?.name}</p>
                      <p className="text-sm text-muted-foreground">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {isMobile && (
              <Button 
                variant="ghost" 
                size="icon"
                className="md:hidden text-foreground/80 hover:text-foreground"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            )}
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      {isMobile && (
        <div 
          className={cn(
            "fixed inset-0 bg-background z-40 transform transition-transform duration-300 ease-in-out pt-16",
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="container mx-auto px-4 py-8">
            <ul className="flex flex-col space-y-4">
              <NavItems />
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
