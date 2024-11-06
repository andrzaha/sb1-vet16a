"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

type FontSize = 'small' | 'medium' | 'large';

interface SettingsContextType {
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [fontSize, setFontSize] = useState<FontSize>('medium');

  useEffect(() => {
    const savedSize = localStorage.getItem('font-size') as FontSize || 'medium';
    setFontSize(savedSize);
    document.documentElement.setAttribute('data-font-size', savedSize);
  }, []);

  const handleFontSizeChange = (size: FontSize) => {
    setFontSize(size);
    localStorage.setItem('font-size', size);
    document.documentElement.setAttribute('data-font-size', size);
  };

  return (
    <SettingsContext.Provider value={{ fontSize, setFontSize: handleFontSizeChange }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}; 