
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Product } from "@/types";
import ProductCard from "@/components/ProductCard";
import ChatBot from "@/components/ChatBot";
import { Search, SlidersHorizontal, X } from "lucide-react";

// Mock products data
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
    id: "4",
    name: "Dress Shoes",
    description: "Classic black dress shoes for formal occasions",
    price: 79.99,
    imageUrl: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHJlc3MlMjBzaG9lc3xlbnwwfHwwfHx8MA%3D%3D",
    category: "Footwear",
    tags: ["shoes", "formal", "dress"],
    inStock: true
  },
  {
    id: "5",
    name: "Summer Dress",
    description: "Light and comfortable dress for summer days",
    price: 39.99,
    imageUrl: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZHJlc3N8ZW58MHx8MHx8fDA%3D",
    category: "Clothing",
    tags: ["dress", "summer", "casual"],
    inStock: true,
    discount: 10
  },
  {
    id: "6",
    name: "Denim Jeans",
    description: "Classic blue denim jeans, perfect fit",
    price: 49.99,
    imageUrl: "https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8amVhbnN8ZW58MHx8MHx8fDA%3D",
    category: "Clothing",
    tags: ["jeans", "denim", "casual"],
    inStock: true
  },
  {
    id: "7",
    name: "Watch",
    description: "Elegant wristwatch with leather strap",
    price: 129.99,
    imageUrl: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2F0Y2h8ZW58MHx8MHx8fDA%3D",
    category: "Accessories",
    tags: ["watch", "accessories", "elegant"],
    inStock: false
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

const categories = ["All", "Clothing", "Footwear", "Accessories"];

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [discountedOnly, setDiscountedOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

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
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  className="pl-9 pr-4"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
                    onClick={() => setSearchTerm("")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
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
