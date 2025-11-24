
/**
 * Service Worker for VistaDeck
 */

const APP_SHELL_CACHE = 'vistadeck-app-shell-v4';
const PRODUCT_IMAGES_CACHE = 'vistadeck-product-images-v4';
const BROCHURES_CACHE = 'vistadeck-brochures-v4';

// Core assets required for the app to boot offline
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/index.tsx',
  '/manifest.json'
];

// --- LIFECYCLE EVENTS ---

self.addEventListener('install', (event) => {
  self.skipWaiting(); 
  event.waitUntil(
    caches.open(APP_SHELL_CACHE).then((cache) => {
      console.log('[ServiceWorker] Pre-caching App Shell');
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

self.addEventListener('activate', (event) => {
  const allowedCaches = [APP_SHELL_CACHE, PRODUCT_IMAGES_CACHE, BROCHURES_CACHE];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!allowedCaches.includes(cacheName)) {
            console.log('[ServiceWorker] Removing old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim(); 
});

// --- FETCH HANDLER ---

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // STRATEGY: CacheFirst for Heavy Documents (PDFs)
  if (url.pathname.endsWith('.pdf')) {
    event.respondWith(
      cacheFirstStrategy(event.request, BROCHURES_CACHE, 10)
    );
    return;
  }

  // STRATEGY: CacheFirst for Images (Optimization)
  if (
    event.request.destination === 'image' ||
    url.pathname.match(/\.(jpg|jpeg|png|webp|avif|svg)$/i) ||
    url.hostname.includes('unsplash.com') ||
    url.hostname.includes('flaticon.com')
  ) {
    event.respondWith(
      cacheFirstStrategy(event.request, PRODUCT_IMAGES_CACHE, 300)
    );
    return;
  }

  // STRATEGY: StaleWhileRevalidate for App Shell
  if (
    event.request.mode === 'navigate' ||
    event.request.destination === 'script' ||
    event.request.destination === 'style' ||
    url.pathname.match(/\.(js|css|json|tsx|ts)$/i) ||
    url.pathname === '/' ||
    url.pathname === '/index.html'
  ) {
    if (event.request.mode === 'navigate') {
      event.respondWith(staleWhileRevalidateNavigation(event.request));
    } else {
      event.respondWith(staleWhileRevalidateStrategy(event.request, APP_SHELL_CACHE));
    }
    return;
  }

  event.respondWith(fetch(event.request));
});

// --- STRATEGY IMPLEMENTATIONS ---

async function cacheFirstStrategy(request, cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok || networkResponse.type === 'opaque') {
      cache.put(request, networkResponse.clone());
      if (maxEntries) {
        trimCache(cacheName, maxEntries);
      }
    }
    return networkResponse;
  } catch (error) {
    return new Response('', { status: 408, statusText: 'Request timed out' });
  }
}

async function staleWhileRevalidateStrategy(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);

  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch((err) => {
    console.log('[ServiceWorker] Background cache update failed:', err);
  });

  return cachedResponse || fetchPromise;
}

async function staleWhileRevalidateNavigation(request) {
  const cache = await caches.open(APP_SHELL_CACHE);
  const cachedResponse = await cache.match(request) || await cache.match('/index.html');

  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch((err) => {
    console.log('[ServiceWorker] Navigation fetch failed:', err);
  });

  return cachedResponse || fetchPromise;
}

async function trimCache(cacheName, maxItems) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length > maxItems) {
    await cache.delete(keys[0]); 
    trimCache(cacheName, maxItems);
  }
}
