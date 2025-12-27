
export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  status: 'In Stock' | 'Out of Stock' | 'Pre-order';
  images: string[];
  colors: string[];
  sizes: string[];
  details: string[];
  care: string[];
}

export interface WishlistItem {
  wishlistId: string; // Composite key: productId-size-color
  productId: string;
  name: string;
  price: number;
  category: string;
  selectedSize: string;
  selectedColor: string;
  image: string;
}

export interface CartItem extends Product {
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface PolicyItem {
  heading: string;
  text: string;
}

export interface PolicySection {
  title: string;
  items: PolicyItem[];
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}
