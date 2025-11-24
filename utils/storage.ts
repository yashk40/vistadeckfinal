
import { OfflineAssetGroup } from '../offlineConfig';

/**
 * Sequential Asset Downloader
 * 
 * This triggers a fetch for assets. Because the Service Worker is installed,
 * these fetches will automatically be cached by the browser's Cache API.
 * We do not need to manually store Blobs in IndexedDB.
 */
export const preloadAssetGroups = async (
    groups: OfflineAssetGroup[], 
    onGroupStart: (label: string) => void,
    onComplete: () => void
) => {
    
    for (const group of groups) {
        if (group.assets.length === 0) continue;
        
        onGroupStart(group.label);
        
        // Process current group in parallel
        const promises = group.assets.map(async (url) => {
            try {
                // We use 'no-cors' to handle external images (Unsplash) gracefully
                // The Service Worker will intercept and cache opaque responses if configured
                await fetch(url, { mode: 'no-cors' });
            } catch (e) {
                // Ignore failures to keep queue moving
                console.warn(`Failed to pre-cache: ${url}`);
            }
        });

        await Promise.all(promises);
    }

    onComplete();
};

/**
 * Simple Preloader (Legacy Wrapper)
 */
export const preloadImages = (urls: string[]) => {
    const dummyGroup = [{ id: 'legacy', label: 'Assets', assets: urls }];
    preloadAssetGroups(dummyGroup, () => {}, () => {});
};

/**
 * Hook: useCachedAsset
 * 
 * DEPRECATED: Optimization Strategy
 * We now rely on the Service Worker for caching. This hook simply returns the original URL.
 * This removes the heavy memory overhead of converting IDB Blobs to ObjectURLs.
 */
export const useCachedAsset = (url: string) => {
  return url;
};
