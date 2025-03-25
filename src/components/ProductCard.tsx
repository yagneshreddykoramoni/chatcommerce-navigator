
import { Product } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, Calendar, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useAppState } from "@/hooks/useAppState";
import { useAuth } from "@/hooks/useAuth";

interface ProductCardProps {
  product: Product;
  className?: string;
  showActions?: boolean;
}

const ProductCard = ({ product, className, showActions = true }: ProductCardProps) => {
  const { name, description, price, imageUrl, category, tags, inStock, discount } = product;
  const { addToFavorites, isInFavorites, addToCart } = useAppState();
  const { isAuthenticated } = useAuth();
  
  const discountedPrice = discount ? price - (price * discount) / 100 : price;
  
  return (
    <Card className={cn("overflow-hidden group hover-scale", className)}>
      <div className="relative aspect-square overflow-hidden">
        <Link to={`/products/${product.id}`}>
          <img 
            src={imageUrl} 
            alt={name} 
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        {discount && (
          <Badge className="absolute top-2 right-2 bg-primary">
            {discount}% OFF
          </Badge>
        )}
        {showActions && (
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn(
              "absolute top-2 left-2 text-white bg-black/30 hover:bg-black/50",
              isInFavorites(product.id) && "text-red-500 bg-white/80 hover:bg-white/90"
            )}
            onClick={() => addToFavorites(product)}
          >
            <Heart className="h-4 w-4" fill={isInFavorites(product.id) ? "currentColor" : "none"} />
          </Button>
        )}
        {!inStock && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <span className="text-white font-medium">Out of Stock</span>
          </div>
        )}
      </div>
      
      <CardContent className="pt-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <Link to={`/products/${product.id}`} className="hover:underline">
              <h3 className="font-medium line-clamp-1">{name}</h3>
            </Link>
            <p className="text-sm text-muted-foreground line-clamp-1">{category}</p>
          </div>
          <div className="flex flex-col items-end">
            {discount ? (
              <>
                <span className="text-sm font-medium">${discountedPrice.toFixed(2)}</span>
                <span className="text-xs text-muted-foreground line-through">${price.toFixed(2)}</span>
              </>
            ) : (
              <span className="text-sm font-medium">${price.toFixed(2)}</span>
            )}
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{description}</p>
        
        <div className="flex flex-wrap gap-1">
          {tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {tags.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{tags.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>
      
      {showActions && (
        <CardFooter className="pt-0 flex gap-2">
          <Button 
            className="flex-1" 
            onClick={() => addToCart(product)} 
            disabled={!inStock}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
          <Link to={`/products/${product.id}`} className="flex-none">
            <Button variant="outline" size="icon">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </Link>
        </CardFooter>
      )}
    </Card>
  );
};

export default ProductCard;
