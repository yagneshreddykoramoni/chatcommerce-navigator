
import { User } from "@/types";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  showAuthDialog: boolean;
  setShowAuthDialog: (show: boolean) => void;
  authRedirectPath: string;
  setAuthRedirectPath: (path: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showAuthDialog, setShowAuthDialog] = useState<boolean>(false);
  const [authRedirectPath, setAuthRedirectPath] = useState<string>("/");
  const navigate = useNavigate();
  
  // Check for saved authentication on mount
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const userRole = localStorage.getItem("userRole");
    
    if (isAuthenticated) {
      // Retrieve user data from localStorage or a token
      if (userRole === "admin") {
        setUser({
          id: "1",
          name: "Admin User",
          email: "admin@example.com",
          isAdmin: true,
        });
      } else {
        setUser({
          id: "2",
          name: "Regular User",
          email: "user@example.com",
          isAdmin: false,
        });
      }
    }
  }, []);

  // Mock login function - would connect to backend API in real implementation
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data - in real implementation, this would come from your backend
      if (email === "admin@example.com" && password === "admin123") {
        const userData = {
          id: "1",
          name: "Admin User",
          email: "admin@example.com",
          isAdmin: true,
        };
        setUser(userData);
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userRole", "admin");
        toast({
          title: "Welcome back, Admin!",
          description: "You have successfully logged in.",
        });
        setShowAuthDialog(false);
        if (authRedirectPath) {
          navigate(authRedirectPath);
          setAuthRedirectPath("/");
        }
        return true;
      } else if (email === "user@example.com" && password === "user123") {
        const userData = {
          id: "2",
          name: "Regular User",
          email: "user@example.com",
          isAdmin: false,
        };
        setUser(userData);
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userRole", "user");
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
        setShowAuthDialog(false);
        if (authRedirectPath) {
          navigate(authRedirectPath);
          setAuthRedirectPath("/");
        }
        return true;
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: "An error occurred during login. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock registration - in real implementation, this would connect to your backend
      const userData = {
        id: "3",
        name,
        email,
        isAdmin: false,
      };
      setUser(userData);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userRole", "user");
      toast({
        title: "Registration successful!",
        description: "Welcome to our shopping assistant.",
      });
      setShowAuthDialog(false);
      if (authRedirectPath) {
        navigate(authRedirectPath);
        setAuthRedirectPath("/");
      }
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration failed",
        description: "An error occurred during registration. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    // Redirect to home page after logout
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        showAuthDialog,
        setShowAuthDialog,
        authRedirectPath,
        setAuthRedirectPath
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
