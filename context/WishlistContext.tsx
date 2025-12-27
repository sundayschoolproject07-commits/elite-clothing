
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, WishlistItem } from '../types';

interface WishlistContextType {
  wishlist: WishlistItem[];
  addToWishlist: (product: Product, size: string, color: string) => void;
  removeFromWishlist: (wishlistId: string) => void;
  isInWishlist: (productId: string, size?: string, color?: string) => boolean;
  toggleWishlist: (product: Product, size?: string, color?: string) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem('zonej_wishlist_v2');
    if (saved) {
      try {
        setWishlist(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse wishlist", e);
      }
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    localStorage.setItem('zonej_wishlist_v2', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (product: Product, size: string, color: string) => {
    const wishlistId = `${product.id}-${size}-${color}`;
    
    setWishlist((prev) => {
      if (prev.find((item) => item.wishlistId === wishlistId)) return prev;
      
      const newItem: WishlistItem = {
        wishlistId,
        productId: product.id,
        name: product.name,
        price: product.price,
        category: product.category,
        selectedSize: size,
        selectedColor: color,
        image: product.images[0]
      };
      
      return [...prev, newItem];
    });
  };

  const removeFromWishlist = (wishlistId: string) => {
    setWishlist((prev) => prev.filter((item) => item.wishlistId !== wishlistId));
  };

  const isInWishlist = (productId: string, size?: string, color?: string) => {
    if (size && color) {
      const wishlistId = `${productId}-${size}-${color}`;
      return wishlist.some((item) => item.wishlistId === wishlistId);
    }
    return wishlist.some((item) => item.productId === productId);
  };

  const toggleWishlist = (product: Product, size?: string, color?: string) => {
    const s = size || product.sizes[0];
    const c = color || product.colors[0];
    const wishlistId = `${product.id}-${s}-${c}`;

    if (isInWishlist(product.id, s, c)) {
      removeFromWishlist(wishlistId);
    } else {
      addToWishlist(product, s, c);
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
