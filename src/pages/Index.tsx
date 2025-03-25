import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import ChatBot from "@/components/ChatBot";
import { ArrowRight, Search, ShoppingBag, Zap, MessageCircle, ShieldCheck } from "lucide-react";
import { Product } from "@/types";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Casual Shirt",
    description: "Comfortable cotton shirt for casual occasions",
    price: 29.99,
    imageUrl: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2hpcnR8ZW58MHx8MHx8fDA%3D",
    category: "Clothing",
    tags: ["shirt", "casual", "cotton"],
    inStock: true
  },
  {
    id: "2",
    name: "Formal Blazer",
    description: "Elegant blazer for formal events",
    price: 89.99,
    imageUrl: "https://images.unsplash.com/photo-1555069519-127aadedf1ee?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxhemVyfGVufDB8fDB8fHww",
    category: "Clothing",
    tags: ["formal", "blazer", "elegant"],
    inStock: true
  },
  {
    id: "3",
    name: "Sneakers",
    description: "Comfortable sneakers for daily use",
    price: 59.99,
    imageUrl: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNuZWFrZXJzfGVufDB8fDB8fHww",
    category: "Footwear",
    tags: ["shoes", "sneakers", "comfortable"],
    inStock: true,
    discount: 15
  },
  {
    id: "8",
    name: "Leather Bag",
    description: "Handcrafted leather bag for everyday use",
    price: 149.99,
    imageUrl: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGVhdGhlciUyMGJhZ3xlbnwwfHwwfHx8MA%3D%3D",
    category: "Accessories",
    tags: ["bag", "leather", "handcrafted"],
    inStock: true,
    discount: 20
  }
];

const Index = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-transparent to-indigo-50" />
          <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
          <div className="absolute top-[40%] right-[10%] w-[400px] h-[400px] bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
        </div>
        
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
              <Badge className="inline-block mb-2">AI-Powered Shopping Assistant</Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight">
                Shop Smarter with <span className="text-primary">Personal Assistance</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl">
                Our AI-powered shopping assistant helps you find exactly what you need with personalized recommendations and real-time support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
                <Button asChild size="lg" className="gap-2">
                  <Link to="/products">
                    Shop Now
                    <ShoppingBag className="h-5 w-5" />
                  </Link>
                </Button>
                {!isAuthenticated && (
                  <Button asChild variant="outline" size="lg" className="gap-2">
                    <Link to="/signin">
                      Sign In
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                )}
              </div>
            </div>
            
            <div className="lg:w-1/2 relative">
              <div className="relative z-10 aspect-square mx-auto max-w-md overflow-hidden rounded-2xl shadow-xl animate-fade-in">
                <img 
                  src="https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2hpcnR8ZW58MHx8MHx8fDA%3D" 
                  alt="Shopping" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-1/4 -left-10 z-20 transform -translate-y-1/2 animate-fade-in animation-delay-300">
                <Card className="glass-panel p-4 max-w-[200px] shadow-lg">
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                      <Zap className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Smart Search</p>
                      <p className="text-xs text-muted-foreground">
                        Find products faster
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="absolute bottom-10 -right-5 z-20 animate-fade-in animation-delay-500">
                <Card className="glass-panel p-4 max-w-[220px] shadow-lg">
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center text-white">
                      <MessageCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Personal Assistant</p>
                      <p className="text-xs text-muted-foreground">
                        Get recommendations in real-time
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose ShopAssist?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Our platform combines AI and human expertise to provide a seamless shopping experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 border bg-background hover:shadow-md transition-shadow duration-300">
              <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                <MessageCircle className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Chatbot</h3>
              <p className="text-muted-foreground mb-4">
                Our intelligent chatbot can understand your needs and suggest the perfect products for any occasion.
              </p>
            </Card>
            
            <Card className="p-6 border bg-background hover:shadow-md transition-shadow duration-300">
              <div className="h-12 w-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Recommendations</h3>
              <p className="text-muted-foreground mb-4">
                Get personalized product suggestions based on your preferences, browsing history, and current needs.
              </p>
            </Card>
            
            <Card className="p-6 border bg-background hover:shadow-md transition-shadow duration-300">
              <div className="h-12 w-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-4">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Shopping</h3>
              <p className="text-muted-foreground mb-4">
                Your data is always protected with our secure payment processing and privacy-focused platform.
              </p>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Featured products section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold">Featured Products</h2>
              <p className="text-muted-foreground">
                Handpicked items that might interest you
              </p>
            </div>
            <Button asChild variant="outline" className="hidden sm:flex">
              <Link to="/products">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="mt-8 text-center sm:hidden">
            <Button asChild variant="outline">
              <Link to="/products">
                View All Products <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to transform your shopping experience?</h2>
          <p className="max-w-xl mx-auto mb-8 opacity-90">
            Create an account today and start enjoying personalized recommendations, exclusive deals, and real-time assistance.
          </p>
          <Button asChild size="lg" variant="secondary" className="gap-2">
            <Link to="/signin">
              Get Started
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-muted/50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">ShopAssist</h3>
              <p className="text-muted-foreground mb-4">
                AI-powered shopping assistant that helps you find exactly what you need.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link></li>
                <li><Link to="/products" className="text-muted-foreground hover:text-foreground">Products</Link></li>
                <li><Link to="/signin" className="text-muted-foreground hover:text-foreground">Sign In</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p className="text-muted-foreground">
                Email: info@shopassist.com<br />
                Phone: (123) 456-7890
              </p>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-muted-foreground/10 text-center text-muted-foreground text-sm">
            <p>© {new Date().getFullYear()} ShopAssist. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      {/* Chat Bot */}
      <ChatBot />
      
      {/* Quick scroll-to-top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={cn(
          "fixed bottom-6 left-6 z-40 h-12 w-12 rounded-full bg-primary text-white shadow-lg transition-all duration-300",
          isScrolled ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        )}
      >
        <div className="flex items-center justify-center h-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m18 15-6-6-6 6" />
          </svg>
        </div>
      </button>
    </div>
  );
};

export default Index;
