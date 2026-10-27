'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Language = 'id' | 'en';

const LanguageContext = createContext<{ lang: Language; setLang: (lang: Language) => void } | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('id');

  useEffect(() => {
    const saved = window.localStorage.getItem('portfolio-language');
    if (saved === 'id' || saved === 'en') setLang(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    window.localStorage.setItem('portfolio-language', lang);
  }, [lang]);

  return <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider');
  return context;
}
