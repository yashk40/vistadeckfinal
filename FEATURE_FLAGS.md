# Feature Flagging System Guide

This document outlines how to use, maintain, and extend the Feature Flagging system in VistaDeck.

## Overview

The Feature Flagging system allows specific modules of the application (Store, Portfolio, Blog, Expo Mode) to be enabled or disabled dynamically. This system is built using React Context and persists user preferences via `localStorage`.

**Key Benefits:**
1.  **Performance:** Disabled modules do not preload their assets or code bundles.
2.  **Customization:** Tenants can turn off features they don't need (e.g., a user who only wants a Portfolio can disable the Store).
3.  **Testing:** Developers can quickly toggle complex views on/off without changing code.

## Core Architecture

1.  **`config.ts`**: Defines the **default** state of features.
2.  **`contexts/SettingsContext.tsx`**: The "Brain". It loads defaults, checks LocalStorage, and provides the `toggleFeature` function to the rest of the app.
3.  **`App.tsx`**: The "Gatekeeper". It handles routing protection and conditional asset preloading.

## How to Add a New Feature Flag

To add a new module (e.g., `enableChat`):

### 1. Define the Default Configuration
Open `config.ts` and add the flag to the `features` object.

```typescript
// config.ts
export const CONFIG = {
  // ...
  features: {
    enableStore: true,
    // ...
    enableChat: false, // <-- Add this
  },
};
```

### 2. Update the Context Interface
Open `contexts/SettingsContext.tsx` and add the type definition.

```typescript
// contexts/SettingsContext.tsx
export interface FeatureFlags {
    enableStore: boolean;
    // ...
    enableChat: boolean; // <-- Add this
}
```

### 3. Add UI Toggle (Optional)
If users should be able to toggle this, open `components/SettingsModal.tsx` and add it to the list.

```typescript
// components/SettingsModal.tsx
const modules = [
    // ...
    { 
      id: 'enableChat', 
      label: 'Live Chat', 
      icon: ChatIcon, 
      desc: 'Customer support widget' 
    }
];
```

### 4. Consuming the Flag
You can now use the flag anywhere in the app using the `useSettings` hook.

**Example: Hiding a UI Component**
```tsx
import { useSettings } from '../contexts/SettingsContext';

const MyComponent = () => {
  const { features } = useSettings();

  if (!features.enableChat) return null;

  return <div>Chat Widget</div>;
};
```

**Example: Preventing Code Loading (App.tsx)**
```tsx
// App.tsx
// 1. Route Protection
if (currentView === 'chat' && !features.enableChat) setCurrentView('home');

// 2. Conditional Preloading
const initializeOfflineMode = async () => {
    const imports = [];
    if (features.enableChat) imports.push(import('./components/ChatWidget'));
    await Promise.all(imports);
};
```

## Performance Implications

The system is designed to work with React's `lazy` loading.

*   **Correct:**
    ```tsx
    const Store = lazy(() => import('./components/Store'));
    // ...
    {features.enableStore && <Store />}
    ```
    *Result:* The 'Store' code bundle is only downloaded if the feature is enabled.

*   **Incorrect:**
    ```tsx
    import Store from './components/Store';
    // ...
    {features.enableStore && <Store />}
    ```
    *Result:* The 'Store' code is downloaded immediately, even if the feature is disabled.

## Persistence

Flags are saved in the browser's `localStorage` under the key `vistadeck_features`.
To reset flags to their default state (defined in `config.ts`), you can:
1.  Clear the browser cache/application data.
2.  Use the "Clear App Data" button in the Settings Modal.