
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import AuthForm from "@/components/AuthForm";

const SignIn = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-indigo-50 p-4">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">ShopAssist</h1>
          <p className="text-muted-foreground">
            Sign in to your account or create a new one
          </p>
        </div>
        
        <AuthForm />
        
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>For demo purposes:</p>
          <p className="mt-1">Admin login: admin@example.com / admin123</p>
          <p>User login: user@example.com / user123</p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
