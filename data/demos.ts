
import { Product } from './types';

// Industry Specific Demos for VistaDeck
export const products: Product[] = [
  {
    id: 1,
    name: "Laminate & Surface Catalog",
    category: "Laminates",
    price: 249,
    originalPrice: 399,
    image: "https://images.unsplash.com/photo-1611486212557-88be5ff6f941?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "A specialized digital catalog for laminate manufacturers and distributors. Features high-resolution texture zooming, finish filtering (Matte, Gloss, Texture), and full-sheet viewing capabilities.",
    gallery: [
      "https://images.unsplash.com/photo-1611486212557-88be5ff6f941?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Texture
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Interior use
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"  // Furniture application
    ],
    features: ["Texture Zoom (4K)", "Finish Filters", "Sheet Size Variants", "Distributor Login"],
    inStock: true,
    createdAt: "2024-03-01",
    demoUrl: "https://chintamanidecor.in"
  },
  {
    id: 2,
    name: "Architect Portfolio Suite",
    category: "Designers",
    price: 199,
    originalPrice: 299,
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Premium portfolio platform for Architects and Interior Designers. Showcase projects with before/after sliders, blueprint downloads, and private client presentation modes.",
    gallery: [
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    features: ["Project Case Studies", "Client Mode", "Blueprint Secure View", "Consultation Booking"],
    inStock: true,
    createdAt: "2024-02-20",
    demoUrl: "https://vistadeck.io"
  },
  {
    id: 3,
    name: "B2B Wholesale Hub",
    category: "Wholesale",
    price: 499,
    originalPrice: 799,
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Powerful wholesale ordering system. Handles thousands of SKUs with ease. Includes Excel/CSV order uploads, tiered pricing based on quantity, and inventory synchronization.",
    gallery: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1566576912902-48f6d9e5d644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    features: ["Bulk Ordering Table", "Tiered Pricing", "Inventory Sync", "Gatekeeper Login"],
    inStock: true,
    createdAt: "2024-01-15",
    demoUrl: "https://vistadeck.io"
  },
  {
    id: 4,
    name: "Home Decor Boutique",
    category: "Decor",
    price: 299,
    image: "https://i.ibb.co/BKtcb4DN/How-to-furnish-your-home-on-a-budget.jpg",
    description: "Visual-first catalog for decor brands. Features 'Shop the Look' functionality, lifestyle image sliders, and seamless Instagram/WhatsApp integration for direct sales.",
    gallery: [
      "https://i.ibb.co/BKtcb4DN/How-to-furnish-your-home-on-a-budget.jpg",
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    features: ["Shop The Look", "Lifestyle Gallery", "Social Integration", "Gift Wrapping Options"],
    inStock: true,
    createdAt: "2024-02-10",
    demoUrl: "https://vistadeck.io"
  },
  {
    id: 5,
    name: "Architectural Hardware Pro",
    category: "Hardware",
    price: 349,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Technical catalog for hardware fittings, handles, and locks. Supports technical drawing downloads, finish comparison (Chrome vs. Matte Black), and dimension specifications.",
    gallery: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1532323544230-7191fd51bc1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1601055903647-87e16e36fa64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    features: ["Tech Spec Downloads", "Finish Comparator", "Dimension Filters", "Bulk Quote Request"],
    inStock: true,
    createdAt: "2024-03-05",
    demoUrl: "https://vistadeck.io"
  },
  {
    id: 6,
    name: "Real Estate Showcase",
    category: "Real Estate",
    price: 449,
    image: "https://i.ibb.co/d06S3gFs/photo-1593696140826-c58b021acf8b.jpg",
    description: "Immersive property catalog for developers and agents. Features Virtual Tour (360) embedding, Google Maps integration, floor plan viewers, and unit availability tracking.",
    gallery: [
      "https://i.ibb.co/d06S3gFs/photo-1593696140826-c58b021acf8b.jpg",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    features: ["360° Virtual Tours", "Interactive Map", "Floor Plans", "Brochure Download"],
    inStock: true,
    createdAt: "2024-01-25",
    demoUrl: "https://vistadeck.io"
  }
];
