
import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

// Define the app state interface
interface AppState {
  favorites: Product[];
  cartItems: { product: Product; quantity: number }[];
  bookedItems: { product: Product; date: Date }[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: string) => void;
  isInFavorites: (productId: string) => boolean;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  getCartItemQuantity: (productId: string) => number;
  getCartTotal: () => number;
  bookProduct: (product: Product, date: Date) => void;
  removeBooking: (productId: string) => void;
  clearCart: () => void;
  requireAuth: (callback: Function, redirectPath?: string) => void;
}

const AppStateContext = createContext<AppState | undefined>(undefined);

export const AppStateProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<{ product: Product; quantity: number }[]>([]);
  const [bookedItems, setBookedItems] = useState<{ product: Product; date: Date }[]>([]);
  const { toast } = useToast();
  const { isAuthenticated, setShowAuthDialog, setAuthRedirectPath } = useAuth();

  // Helper function to require authentication before an action
  const requireAuth = (callback: Function, redirectPath?: string) => {
    if (isAuthenticated) {
      callback();
    } else {
      if (redirectPath) {
        setAuthRedirectPath(redirectPath);
      }
      setShowAuthDialog(true);
      toast({
        title: "Authentication required",
        description: "Please sign in to continue.",
      });
    }
  };

  const addToFavorites = (product: Product) => {
    requireAuth(() => {
      if (!isInFavorites(product.id)) {
        setFavorites([...favorites, product]);
        toast({
          title: "Added to favorites",
          description: `${product.name} has been added to your favorites.`,
        });
      } else {
        removeFromFavorites(product.id);
      }
    });
  };

  const removeFromFavorites = (productId: string) => {
    setFavorites(favorites.filter((item) => item.id !== productId));
    toast({
      title: "Removed from favorites",
      description: "Item has been removed from your favorites.",
    });
  };

  const isInFavorites = (productId: string) => {
    return favorites.some((item) => item.id === productId);
  };

  const addToCart = (product: Product, quantity = 1) => {
    requireAuth(() => {
      const existingItemIndex = cartItems.findIndex(
        (item) => item.product.id === product.id
      );

      if (existingItemIndex >= 0) {
        const updatedCartItems = [...cartItems];
        updatedCartItems[existingItemIndex].quantity += quantity;
        setCartItems(updatedCartItems);
      } else {
        setCartItems([...cartItems, { product, quantity }]);
      }

      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      });
    }, "/cart");
  };

  const removeFromCart = (productId: string) => {
    setCartItems(cartItems.filter((item) => item.product.id !== productId));
    toast({
      title: "Removed from cart",
      description: "Item has been removed from your cart.",
    });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const updatedCartItems = cartItems.map((item) =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    setCartItems(updatedCartItems);
  };

  const getCartItemQuantity = (productId: string) => {
    const item = cartItems.find((item) => item.product.id === productId);
    return item ? item.quantity : 0;
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.product.discount
        ? item.product.price - (item.product.price * item.product.discount) / 100
        : item.product.price;
      return total + price * item.quantity;
    }, 0);
  };
  
  const bookProduct = (product: Product, date: Date) => {
    requireAuth(() => {
      setBookedItems([...bookedItems, { product, date }]);
      toast({
        title: "Product booked",
        description: `${product.name} has been booked for ${date.toLocaleDateString()}.`,
      });
    }, `/products/${product.id}`);
  };
  
  const removeBooking = (productId: string) => {
    setBookedItems(bookedItems.filter((item) => item.product.id !== productId));
    toast({
      title: "Booking removed",
      description: "Your booking has been removed.",
    });
  };
  
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <AppStateContext.Provider
      value={{
        favorites,
        cartItems,
        bookedItems,
        addToFavorites,
        removeFromFavorites,
        isInFavorites,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        getCartItemQuantity,
        getCartTotal,
        bookProduct,
        removeBooking,
        clearCart,
        requireAuth,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error("useAppState must be used within an AppStateProvider");
  }
  return context;
};
