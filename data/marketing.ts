
import { Feature, Testimonial, FAQ, PricingPlan } from './types';

export const features: Feature[] = [
  {
    iconName: 'sofa', 
    title: "Premium Showroom",
    description: "Give your products the stage they deserve. Our layouts are designed for elegance and maximum visual impact."
  },
  {
    iconName: 'layers', 
    title: "Unlimited Uploads",
    description: "No limits on your growth. Upload unlimited products, images, and brochures. Your catalog grows with you."
  },
  {
    iconName: 'building', 
    title: "Business Intelligence",
    description: "Includes a free admin dashboard, lead generation tools, and direct WhatsApp enquiry integration."
  },
];

export const testimonials: Testimonial[] = [
  {
    quote: "VistaDeck is a game changer. We stopped sending heavy PDFs and started sending sleek digital links.",
    authorName: "Michael Ross",
    authorTitle: "Director, Ross Furniture",
    avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80"
  },
  {
    quote: "The speed is incredible. Our clients love how fast the catalog loads on their phones. Highly recommended.",
    authorName: "Sarah Jenkins",
    authorTitle: "Owner, Chic Boutique",
    avatarUrl: "https://images.unsplash.com/photo-1573496359-7013c53bcae4?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80"
  },
  {
    quote: "Finally, a platform that understands distributors. The bulk upload and enquiry system saved us weeks of work.",
    authorName: "David Chen",
    authorTitle: "Manager, Chen Exports",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80"
  }
];

export const faqs: FAQ[] = [
    {
      question: "Is there a limit on product uploads?",
      answer: "No! VistaDeck is engineered for scale. You can upload unlimited products, images, and videos on our platform."
    },
    {
      question: "Do I need technical skills?",
      answer: "Not at all. VistaDeck comes with a user-friendly admin dashboard. It's as easy as updating your social media."
    },
    {
      question: "Can I use my own domain?",
      answer: "Yes, we support custom domain mapping so your digital showroom sits on your own website address (e.g., catalog.yourbrand.com)."
    },
    {
      question: "How do I manage leads?",
      answer: "Enquiries are sent directly to your WhatsApp and Email. You also get a built-in lead management system in your dashboard."
    }
];

export const pricingPlans: PricingPlan[] = [
    {
        id: "starter",
        category: "Individuals",
        planName: "Starter",
        price: {
            monthly: "0",
            yearly: "0"
        },
        description: "Perfect to start your digital journey.",
        features: ["Up to 50 Products", "Basic Analytics", "Standard Support", "VistaDeck.io Subdomain", "One-time Setup Fee"],
        isFeatured: false,
        buttonText: "Start Now"
    },
    {
        id: "pro",
        category: "Professionals",
        planName: "Pro",
        price: {
            monthly: "1500",
            yearly: "1200"
        },
        description: "For growing brands & designers.",
        features: ["Unlimited Products", "Custom Domain", "WhatsApp Integration", "Priority Support", "Remove Branding", "Lead Gen Forms"],
        isFeatured: true,
        buttonText: "Get Started"
    },
    {
        id: "business",
        category: "Teams & Agencies",
        planName: "Business",
        price: {
            monthly: "2500",
            yearly: "2000"
        },
        description: "Advanced tools for distributors.",
        features: ["Everything in Pro", "5 Admin Users", "Bulk CSV Upload", "Inventory Sync", "API Access", "Dedicated Manager"],
        isFeatured: false,
        buttonText: "Contact Sales"
    }
];
