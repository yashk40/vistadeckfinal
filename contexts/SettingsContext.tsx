
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CONFIG } from '../config';

// Define Feature Keys based on CONFIG
export interface FeatureFlags {
    enableStore: boolean;
    enablePortfolio: boolean;
    enableBlog: boolean;
    enableExpo: boolean;
    enableMultilingual: boolean;
}

interface SettingsContextType {
  features: FeatureFlags;
  toggleFeature: (key: keyof FeatureFlags) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize with defaults from CONFIG
  const [features, setFeatures] = useState<FeatureFlags>(CONFIG.features);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Hydrate from LocalStorage on mount
    try {
        const savedFeatures = localStorage.getItem('vistadeck_features');
        if (savedFeatures) {
            const parsed = JSON.parse(savedFeatures);
            // Merge to ensure we don't lose keys if config updates
            setFeatures(prev => ({ ...prev, ...parsed }));
        }
    } catch (e) {
        console.error("Failed to load settings", e);
    } finally {
        setIsHydrated(true);
    }
  }, []);

  const toggleFeature = (key: keyof FeatureFlags) => {
    setFeatures(prev => {
        const newFeatures = { ...prev, [key]: !prev[key] };
        localStorage.setItem('vistadeck_features', JSON.stringify(newFeatures));
        return newFeatures;
    });
  };

  return (
    <SettingsContext.Provider value={{ features, toggleFeature }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
