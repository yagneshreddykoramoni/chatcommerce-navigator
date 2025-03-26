
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ShoppingCart, Heart, Calendar, ChevronLeft, Minus, Plus, Share } from "lucide-react";
import { mockProducts } from "@/components/admin-mock-data";
import { cn } from "@/lib/utils";
import { useAppState } from "@/hooks/useAppState";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import ChatBot from "@/components/ChatBot";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  
  const {
    addToFavorites,
    isInFavorites,
    addToCart,
    getCartItemQuantity,
    bookProduct
  } = useAppState();
  
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  const product = mockProducts.find(p => p.id === productId);
  
  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 pb-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/products")}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
        </div>
      </div>
    );
  }
  
  const { name, description, price, imageUrl, category, tags, inStock, discount } = product;
  const discountedPrice = discount ? price - (price * discount) / 100 : price;
  const cartQuantity = getCartItemQuantity(product.id);
  
  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);
  
  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to add items to your cart.",
        variant: "destructive",
      });
      navigate("/signin");
      return;
    }
    
    addToCart(product, quantity);
  };
  
  const handleAddToFavorites = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to add items to your favorites.",
        variant: "destructive",
      });
      navigate("/signin");
      return;
    }
    
    addToFavorites(product);
  };
  
  const handleOpenBooking = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to book products.",
        variant: "destructive",
      });
      navigate("/signin");
      return;
    }
    
    setIsBookingOpen(true);
  };
  
  const handleBookProduct = () => {
    if (selectedDate) {
      bookProduct(product, selectedDate);
      setIsBookingOpen(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate("/products")}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
            <img 
              src={imageUrl} 
              alt={name} 
              className="object-cover w-full h-full"
            />
            {discount && (
              <Badge className="absolute top-4 right-4 bg-primary">
                {discount}% OFF
              </Badge>
            )}
          </div>
          
          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <Badge variant="outline">{category}</Badge>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className={cn(
                    isInFavorites(product.id) && "text-red-500"
                  )}
                  onClick={handleAddToFavorites}
                >
                  <Heart className="h-5 w-5" fill={isInFavorites(product.id) ? "currentColor" : "none"} />
                </Button>
              </div>
              <h1 className="text-3xl font-bold mt-2">{name}</h1>
              <div className="flex items-center mt-2">
                {discount ? (
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold">${discountedPrice.toFixed(2)}</span>
                    <span className="text-lg text-muted-foreground line-through">${price.toFixed(2)}</span>
                  </div>
                ) : (
                  <span className="text-2xl font-bold">${price.toFixed(2)}</span>
                )}
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-medium mb-2">Description</h2>
              <p className="text-muted-foreground">{description}</p>
            </div>
            
            <div>
              <h2 className="text-lg font-medium mb-2">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <h2 className="text-lg font-medium mb-4">Availability</h2>
              {inStock ? (
                <Badge variant="outline" className="bg-green-500/10 text-green-600 hover:bg-green-500/10">
                  In Stock
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-red-500/10 text-red-600 hover:bg-red-500/10">
                  Out of Stock
                </Badge>
              )}
            </div>
            
            {inStock && (
              <div className="pt-4 border-t">
                <h2 className="text-lg font-medium mb-4">Quantity</h2>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input 
                    type="number" 
                    min="1" 
                    className="w-20 text-center" 
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  />
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={increaseQuantity}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
            
            <div className="pt-6 flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="flex-1 gap-2" 
                onClick={handleAddToCart}
                disabled={!inStock}
              >
                <ShoppingCart className="h-5 w-5" />
                {cartQuantity > 0 ? 'Update Cart' : 'Add to Cart'}
              </Button>
              
              <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="flex-1 gap-2"
                  disabled={!inStock}
                  onClick={handleOpenBooking}
                >
                  <Calendar className="h-5 w-5" />
                  Book for Later
                </Button>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Book Product for Purchase</DialogTitle>
                    <DialogDescription>
                      Select a date to book {name} for purchase. We'll hold it for you until then.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="flex justify-center py-4">
                    <CalendarComponent
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date()}
                    />
                  </div>
                  
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsBookingOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleBookProduct}>
                      Confirm Booking
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <Button variant="outline" size="lg" className="flex-none" disabled={!inStock}>
                <Share className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <ChatBot />
    </div>
  );
};

export default ProductDetails;
