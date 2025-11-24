
/**
 * BRAND CONFIGURATION
 * 
 * VistaDeck Branding and Configuration
 */
export const CONFIG = {
  company: {
    name: "VistaDeck",
    shortName: "VistaDeck", 
    logoText: "VISTADECK", 
    logoSubText: "INTELLIGENT CATALOGS", 
    tagline: "Stop Sending PDFs. Start Closing Deals.",
    description: "VistaDeck is a premium digital catalog and showroom platform tailored for product-based businesses. Showcase unlimited products with speed and elegance.",
    url: "https://vistadeck.io"
  },
  // Feature Flags - Toggle modules to optimize memory and UI
  features: {
    enableStore: true,
    enablePortfolio: true,
    enableBlog: true,
    enableExpo: true,
    enableMultilingual: true
  },
  // Store Configuration
  store: {
    showOutOfStockFilter: true, // Toggle to show/hide the 'Show Out of Stock' filter in store
  },
  // Layout Configuration: Reorder these strings to change the page structure
  layout: {
    home: ['hero', 'stats', 'benefits', 'experience', 'cta']
  },
  // Homepage Section Content
  homepage: {
    benefits: [
      { 
        title: "Unlimited Uploads", 
        description: "Showcase your entire product range without limits.", 
        icon: "layers" 
      },
      { 
        title: "WhatsApp Enquiry", 
        description: "Get direct leads from clients instantly.", 
        icon: "message" 
      },
      { 
        title: "SEO Optimized", 
        description: "Rank higher on Google with our smart structure.", 
        icon: "search" 
      }
    ],
    experience: {
       title: "Platform Experience",
       subtitle: "See how VistaDeck handles various content types. This is the experience your customers will have."
    },
    cta: {
       titleLabel: "VistaDeck Live Demo",
       title: "Experience the \nDigital Showroom",
       description: "See how your products will look on VistaDeck. Try the cart, filters, and checkout flow yourself.",
       buttonText: "Launch Demo Store"
    }
  },
  hero: {
    headline: "The End of Static Catalogs.", 
    subheadline: "Replace clunky PDFs with a lightning-fast digital showroom. Give your clients the interactive experience they deserve and close deals faster.",
    ctaButton: "Get Your Digital Catalog",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
  },
  welcomePopup: {
    isOpen: true, // Master switch to enable/disable
    title: "Welcome to VistaDeck",
    message: "Enjoying the experience? Scan the QR code to leave us a 5-star review on Google, or continue to explore our digital catalog.",
    ctaText: "Continue to Site",
    // Optional: Advertisement Image (Left side)
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    // Optional: QR Code (Right side context) - Pointing to Google Review
    qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://search.google.com/local/writereview?placeid=VistaDeck&color=1e3a8a" 
  },
  contact: {
    phone: "+91 9923 9933 01",
    phoneRaw: "+919923993301", 
    email: "info@interactai.in",
    address: "Pune, MH, IN. 411048",
    addressMapLink: "https://maps.google.com",
    hours: "Digital Support 24/7",
    responseTime: "We reply within 2 hours"
  },
  social: {
    twitter: "#",
    github: "#",
    dribbble: "#"
  },
  stats: [
    { value: "Unlimited", label: "Uploads", icon: "layers" },
    { value: "Fast", label: "Performance", icon: "check" },
    { value: "SEO", label: "Optimized", icon: "diamond" },
    { value: "Global", label: "Reach", icon: "pin" },
  ]
};
