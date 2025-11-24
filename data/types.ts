
export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  gallery?: string[];
  features?: string[];
  inStock: boolean;
  stockLevel?: number;
  createdAt: string;
  demoUrl?: string;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  features: string[];
}

export interface Testimonial {
  quote: string;
  authorName: string;
  authorTitle: string;
  avatarUrl: string;
}

export interface Feature {
  iconName: 'sofa' | 'building' | 'layers';
  title: string;
  description: string;
}

export interface Brochure {
  id: number;
  title: string;
  size: string;
  image: string;
}

export interface Article {
  category: string;
  title: string;
  excerpt: string;
  image: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface PricingPlan {
  id: string;
  category: string;
  planName: string;
  price: {
    monthly: string;
    yearly: string;
  };
  description: string;
  features: string[];
  isFeatured: boolean;
  buttonText: string;
}
