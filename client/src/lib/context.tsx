import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "@shared/schema";

// Types
interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
}

interface WishlistContextType {
  items: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  clearWishlist: () => void;
  isInWishlist: (productId: number) => boolean;
}

interface UserInteraction {
  productId: number;
  type: 'view' | 'wishlist' | 'cart' | 'purchase';
  timestamp?: Date;
}

interface UserInteractionContextType {
  interactions: UserInteraction[];
  trackInteraction: (interaction: UserInteraction) => void;
  clearInteractions: () => void;
}

// Create contexts
const CartContext = createContext<CartContextType | undefined>(undefined);
const WishlistContext = createContext<WishlistContextType | undefined>(undefined);
const UserInteractionContext = createContext<UserInteractionContextType | undefined>(undefined);

// Provider components
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState(0);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setItems(parsedCart);
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
    
    // Calculate cart total
    const total = items.reduce((sum, item) => {
      return sum + (Number(item.price) * item.quantity);
    }, 0);
    
    setCartTotal(total);
  }, [items]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setItems(prevItems => {
      // Check if the product is already in the cart
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Product exists, update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        };
        return updatedItems;
      } else {
        // Product doesn't exist, add it
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setItems(prevItems => {
      return prevItems.map(item => {
        if (item.id === productId) {
          return { ...item, quantity };
        }
        return item;
      });
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<Product[]>([]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      try {
        const parsedWishlist = JSON.parse(savedWishlist);
        setItems(parsedWishlist);
      } catch (error) {
        console.error('Failed to parse wishlist from localStorage:', error);
      }
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(items));
  }, [items]);

  const addToWishlist = (product: Product) => {
    setItems(prevItems => {
      // Check if the product is already in the wishlist
      if (prevItems.some(item => item.id === product.id)) {
        return prevItems;
      }
      return [...prevItems, product];
    });
  };

  const removeFromWishlist = (productId: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const clearWishlist = () => {
    setItems([]);
  };

  const isInWishlist = (productId: number) => {
    return items.some(item => item.id === productId);
  };

  return (
    <WishlistContext.Provider value={{ items, addToWishlist, removeFromWishlist, clearWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const UserInteractionProvider = ({ children }: { children: ReactNode }) => {
  const [interactions, setInteractions] = useState<UserInteraction[]>([]);

  // Load user interactions from localStorage on mount
  useEffect(() => {
    const savedInteractions = localStorage.getItem('userInteractions');
    if (savedInteractions) {
      try {
        const parsedInteractions = JSON.parse(savedInteractions);
        setInteractions(parsedInteractions);
      } catch (error) {
        console.error('Failed to parse user interactions from localStorage:', error);
      }
    }
  }, []);

  // Save user interactions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('userInteractions', JSON.stringify(interactions));
  }, [interactions]);

  const trackInteraction = (interaction: UserInteraction) => {
    const newInteraction = {
      ...interaction,
      timestamp: new Date(),
    };
    
    setInteractions(prevInteractions => [...prevInteractions, newInteraction]);
  };

  const clearInteractions = () => {
    setInteractions([]);
  };

  return (
    <UserInteractionContext.Provider value={{ interactions, trackInteraction, clearInteractions }}>
      {children}
    </UserInteractionContext.Provider>
  );
};

// Custom hooks
export const useCartStore = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCartStore must be used within a CartProvider');
  }
  return context;
};

export const useWishlistStore = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlistStore must be used within a WishlistProvider');
  }
  return context;
};

export const useUserStore = () => {
  const context = useContext(UserInteractionContext);
  if (context === undefined) {
    throw new Error('useUserStore must be used within a UserInteractionProvider');
  }
  return context;
};
