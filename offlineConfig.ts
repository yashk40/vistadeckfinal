
import { CONFIG } from './config';
import { products, brochures, galleryImages, projects, articles } from './data';

export interface OfflineAssetGroup {
    id: string;
    label: string;
    assets: string[];
}

/**
 * OFFLINE CONFIGURATION
 * Defines the sequence in which assets are cached for offline use.
 * This helps prioritize critical UI elements before heavy catalogs.
 */
export const OFFLINE_ASSET_GROUPS: OfflineAssetGroup[] = [
    {
        id: 'core',
        label: 'Core UI & Identity',
        assets: [
            CONFIG.hero.image,
            CONFIG.welcomePopup.image,
            CONFIG.welcomePopup.qrCode
        ].filter(Boolean) as string[]
    },
    {
        id: 'featured',
        label: 'Trending Products',
        assets: products.slice(0, 6).map(p => p.image)
    },
    {
        id: 'brochures',
        label: 'Digital Brochures',
        assets: brochures.map(b => b.image)
    },
    {
        id: 'portfolio',
        label: 'Case Studies',
        assets: projects.map(p => p.image)
    },
    {
        id: 'full_catalog',
        label: 'Full Product Catalog',
        assets: [
            ...products.slice(6).map(p => p.image),
            ...galleryImages,
            ...articles.map(a => a.image),
            ...products.flatMap(p => p.gallery || [])
        ]
    }
];
