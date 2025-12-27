
import { Product, TeamMember, PolicySection } from './types';

export interface ReelItem {
  id: string;
  videoUrl: string;
  poster: string;
  title: string;
  subtitle?: string;
  productId: string;
}

// High-end neutral fallback image matching brand tone
export const BRAND_PLACEHOLDER = "https://images.unsplash.com/photo-1594932224828-b4b05a832fe3?auto=format&fit=crop&q=80&w=1200";

export const REELS: ReelItem[] = [
  {
    id: 'reel-1',
    videoUrl: 'https://cdn.pixabay.com/video/2023/11/13/188836-883737035_large.mp4',
    poster: 'https://images.unsplash.com/photo-1617135671685-dd0df3cab3c8?auto=format&fit=crop&q=80&w=800',
    title: 'The Modern Executive',
    subtitle: 'Fall Collection 2024',
    productId: 'db-blazer-01'
  },
  {
    id: 'reel-2',
    videoUrl: 'https://cdn.pixabay.com/video/2021/04/12/70860-537494635_large.mp4',
    poster: 'https://images.unsplash.com/photo-1594932224828-b4b05a832fe3?auto=format&fit=crop&q=80&w=800',
    title: 'Midnight Mastery',
    subtitle: 'Bespoke Tuxedos',
    productId: '2'
  },
  {
    id: 'reel-3',
    videoUrl: 'https://cdn.pixabay.com/video/2020/07/07/43977-438404746_large.mp4',
    poster: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&q=80&w=800',
    title: 'Precision in Every Stitch',
    subtitle: 'Atelier Process',
    productId: '1'
  },
  {
    id: 'reel-4',
    videoUrl: 'https://cdn.pixabay.com/video/2021/09/16/88741-606059294_large.mp4',
    poster: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800',
    title: 'Heritage Threads',
    subtitle: 'Linen Essentials',
    productId: '4'
  },
  {
    id: 'reel-5',
    videoUrl: 'https://cdn.pixabay.com/video/2023/11/13/188836-883737035_large.mp4',
    poster: 'https://images.unsplash.com/photo-1555069519-048a85750dc1?auto=format&fit=crop&q=80&w=800',
    title: 'The Art of Presence',
    subtitle: 'Signature Suits',
    productId: '1'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'db-blazer-01',
    name: 'Zone J – Modern Executive Double-Breasted Blazer',
    price: 7999,
    category: 'Suits',
    status: 'Pre-order',
    description: 'This is not a traditional blazer. This is modern authority stitched into structure. Designed for men who don’t chase trends but set presence, this double-breasted blazer balances sharp tailoring with relaxed modern proportions. Minimal, architectural, and intentional—every line is there for a reason. No loud branding. No gimmicks. Just clean power.',
    images: [
      'https://images.unsplash.com/photo-1617135671685-dd0df3cab3c8?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1594932224828-b4b05a832fe3?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: ['Black', 'Dark Brown', 'Maroon'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    details: [
      'Architectural Double-Breasted Construction',
      'Modern Executive Fit',
      'Matte Resin buttons',
      'Breathable Silk-Wool blend',
      'Occasion: Executive/Modern Formal',
      'Minimalist Lapel Design'
    ],
    care: [
      'Professional dry clean only',
      'Store on wide-shoulder hangers',
      'Steam iron at low setting',
      'Avoid high-heat pressing'
    ]
  },
  {
    id: '1',
    name: 'Royal Navy Solid Slim Fit Two-Piece Suit',
    price: 18999,
    category: 'Suits',
    status: 'In Stock',
    description: 'Elevate your formal wardrobe with this Zone J two-piece suit in a classic royal navy hue. Tailored in a slim fit, this suit offers a sharp, contemporary silhouette perfect for high-stakes boardrooms and evening galas.',
    images: [
      'https://images.unsplash.com/photo-1594932224828-b4b05a832fe3?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1493106640113-98bb1483c50f?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: ['Navy Blue', 'Charcoal', 'Jet Black'],
    sizes: ['36', '38', '40', '42', '44', '46', '48'],
    details: [
      'Premium 120s Italian Wool Blend',
      'Modern Slim Fit silhouette',
      'Classic Notch Lapel with AMF stitching',
      'Four-button non-functioning cuffs',
      'Double-vented back for ease of movement',
      'Occasion: Formal/Corporate/Wedding'
    ],
    care: [
      'Dry clean only',
      'Steam iron at low temperature',
      'Store in the provided breathable garment bag',
      'Avoid continuous wear to let the wool breathe'
    ]
  },
  {
    id: '2',
    name: 'Signature Midnight Peak Lapel Tuxedo',
    price: 24999,
    category: 'Suits',
    status: 'In Stock',
    description: 'The ultimate statement in evening elegance. Our signature tuxedo features a deep midnight silk-wool blend that glows subtly under ballroom lights.',
    images: [
      'https://images.unsplash.com/photo-1598808503746-f34c53b9323e?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1555069519-048a85750dc1?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: ['Midnight Blue', 'Jet Black'],
    sizes: ['38', '40', '42', '44', '46'],
    details: [
      'Silk Satin Peak Lapels',
      'Covered silk buttons',
      'Jetted pockets for a sleek profile',
      'Silk-blend lining for ultimate comfort'
    ],
    care: ['Professional dry clean only']
  },
  {
    id: '4',
    name: 'Heritage Linen Shirt',
    price: 3499,
    category: 'Shirts',
    status: 'In Stock',
    description: 'Breathable luxury for the modern traveler. Crafted from the finest Irish linen.',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1621072156002-e2fcced0b170?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: ['Off-White', 'Soft Beige', 'Sky Blue'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    details: [
      '100% Belgian Linen',
      'Mother of pearl buttons',
      'Relaxed spread collar',
      'Signature Zone J tailoring'
    ],
    care: ['Machine wash cold', 'Hang dry', 'Warm iron while damp']
  }
];

export const TEAM: TeamMember[] = [
  {
    name: 'Jith (Nishajith)',
    role: 'Founder & Head Designer',
    bio: 'With over 4+ years of experience in 3D fashion design, tailoring, and brand development, Jith redefines luxury through the lens of modern technology and traditional craftsmanship.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800'
  }
];

export const POLICIES: Record<string, PolicySection> = {
  privacy: {
    title: 'Privacy Policy',
    items: [
      {
        heading: 'Data Privacy Commitment',
        text: 'We respect customer privacy. All personal information, measurements, and contact details shared with Zone J are kept confidential and used only for order processing and communication.'
      }
    ]
  },
  shipping: {
    title: 'Shipping Policy',
    items: [
      {
        heading: 'Quality Assurance',
        text: 'Orders are shipped only after a rigorous final quality check by our head tailor.'
      }
    ]
  },
  returns: {
    title: 'Returns & Refunds',
    items: [
      {
        heading: 'Custom Garment Policy',
        text: 'Custom-made products are non-returnable as they are crafted specifically to your unique measurements and design preferences.'
      }
    ]
  },
  terms: {
    title: 'Terms & Conditions',
    items: [
      {
        heading: 'Order Processing',
        text: 'All custom orders are made-to-measure and processed only after confirmation and receipt of the requisite advance payment.'
      }
    ]
  }
};
