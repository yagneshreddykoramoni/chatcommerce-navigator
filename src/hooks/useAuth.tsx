
import { User } from "@/types";
import { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Mock login function - would connect to backend API in real implementation
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data - in real implementation, this would come from your backend
      if (email === "admin@example.com" && password === "admin123") {
        setUser({
          id: "1",
          name: "Admin User",
          email: "admin@example.com",
          isAdmin: true,
        });
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userRole", "admin");
        toast({
          title: "Welcome back, Admin!",
          description: "You have successfully logged in.",
        });
        return true;
      } else if (email === "user@example.com" && password === "user123") {
        setUser({
          id: "2",
          name: "Regular User",
          email: "user@example.com",
          isAdmin: false,
        });
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userRole", "user");
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
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
      setUser({
        id: "3",
        name,
        email,
        isAdmin: false,
      });
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userRole", "user");
      toast({
        title: "Registration successful!",
        description: "Welcome to our shopping assistant.",
      });
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
