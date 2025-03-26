import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import ProductCard from "@/components/ProductCard";
import ChatBot from "@/components/ChatBot";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useAppState } from "@/hooks/useAppState";

// Use the mock products data from admin-mock-data
import { mockProducts } from "@/components/admin-mock-data";

// Updated categories based on our new products
const categories = ["All", "Clothing", "Footwear", "Electronics", "Accessories", "Fitness", "Home"];

const Products = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [discountedOnly, setDiscountedOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Parse query parameters from URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchParam = queryParams.get("search");
    const categoryParam = queryParams.get("category");
    
    if (searchParam) {
      setSearchTerm(searchParam);
    }
    
    if (categoryParam && categories.includes(categoryParam)) {
      setCategory(categoryParam);
    }
  }, [location.search]);

  // Update URL when filters change
  useEffect(() => {
    const queryParams = new URLSearchParams();
    
    if (searchTerm) {
      queryParams.set("search", searchTerm);
    }
    
    if (category !== "All") {
      queryParams.set("category", category);
    }
    
    const queryString = queryParams.toString();
    const newUrl = queryString ? `?${queryString}` : "";
    
    navigate(`/products${newUrl}`, { replace: true });
  }, [searchTerm, category, navigate]);

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
    const matchesCategory = category === "All" || product.category === category;
    
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    const matchesInStock = inStockOnly ? product.inStock : true;
    
    const matchesDiscount = discountedOnly ? !!product.discount : true;
    
    return matchesSearch && matchesCategory && matchesPrice && matchesInStock && matchesDiscount;
  });

  const resetFilters = () => {
    setSearchTerm("");
    setCategory("All");
    setPriceRange([0, 200]);
    setInStockOnly(false);
    setDiscountedOnly(false);
    
    // Update URL
    navigate("/products", { replace: true });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The URL will be updated via useEffect
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight">All Products</h1>
          <p className="text-muted-foreground">
            Browse our collection of products
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter sidebar - desktop */}
          <div className="hidden lg:block w-64 shrink-0 space-y-6">
            <div className="space-y-4">
              <h2 className="font-medium">Categories</h2>
              <div className="space-y-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    className={`block px-2 py-1 rounded-md w-full text-left ${
                      category === cat 
                        ? "bg-primary/10 text-primary font-medium" 
                        : "hover:bg-muted"
                    }`}
                    onClick={() => setCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="font-medium">Price Range</h2>
              <Slider 
                value={priceRange} 
                min={0} 
                max={200} 
                step={1} 
                onValueChange={setPriceRange}
              />
              <div className="flex items-center justify-between text-sm">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <h2 className="font-medium">Filter By</h2>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="in-stock" 
                  checked={inStockOnly} 
                  onCheckedChange={(checked) => setInStockOnly(checked as boolean)}
                />
                <Label htmlFor="in-stock">In Stock Only</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="discounted" 
                  checked={discountedOnly} 
                  onCheckedChange={(checked) => setDiscountedOnly(checked as boolean)}
                />
                <Label htmlFor="discounted">Discounted Only</Label>
              </div>
            </div>
            
            <Button onClick={resetFilters} variant="outline" className="w-full">
              Reset Filters
            </Button>
          </div>
          
          {/* Main content */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row gap-3 justify-between mb-6">
              <div className="relative flex-1 max-w-md">
                <form onSubmit={handleSearch}>
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    className="pl-9 pr-12"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && (
                    <Button 
                      type="button"
                      variant="ghost" 
                      size="icon" 
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
                      onClick={() => setSearchTerm("")}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </form>
              </div>
              
              <div className="flex gap-3">
                <Select 
                  value={category} 
                  onValueChange={setCategory}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Button 
                  variant="outline" 
                  className="lg:hidden"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
            </div>
            
            {/* Mobile filters */}
            {showFilters && (
              <div className="lg:hidden mb-6 p-4 border rounded-lg space-y-4">
                <div className="space-y-3">
                  <h2 className="font-medium">Price Range</h2>
                  <Slider 
                    value={priceRange} 
                    min={0} 
                    max={200} 
                    step={1} 
                    onValueChange={setPriceRange}
                  />
                  <div className="flex items-center justify-between text-sm">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h2 className="font-medium">Filter By</h2>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="mobile-in-stock" 
                      checked={inStockOnly} 
                      onCheckedChange={(checked) => setInStockOnly(checked as boolean)}
                    />
                    <Label htmlFor="mobile-in-stock">In Stock Only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="mobile-discounted" 
                      checked={discountedOnly} 
                      onCheckedChange={(checked) => setDiscountedOnly(checked as boolean)}
                    />
                    <Label htmlFor="mobile-discounted">Discounted Only</Label>
                  </div>
                </div>
                
                <Button onClick={resetFilters} variant="outline" className="w-full">
                  Reset Filters
                </Button>
              </div>
            )}
            
            {filteredProducts.length === 0 ? (
              <div className="min-h-[300px] flex flex-col items-center justify-center text-center p-8">
                <h3 className="text-lg font-medium mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <Button onClick={resetFilters} variant="outline">
                  Reset Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <ChatBot />
    </div>
  );
};

export default Products;
