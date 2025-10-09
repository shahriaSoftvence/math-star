// hooks/useDictionary.ts
'use client';

import { useEffect, useState } from 'react';
import { LanguageType } from '../../type/language';

export const LANGUAGE_CHANGED_EVENT = 'mathstar-language-changed';

// hooks/useDictionary.ts
export function useDictionary() {
  const [dictionary, setDictionary] = useState<LanguageType | null>(null);
  const [locale, setLocale] = useState<'en' | 'de'>('de');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDictionary = async (language: 'en' | 'de') => {
      try {
        setLoading(true);
        const dictModule = await import(`@/app/dictionaries/${language}.json`);
        setDictionary(dictModule.default as LanguageType);
        setLocale(language);
      } catch (error) {
        console.error('Failed to load dictionary:', error);
        const fallback = await import('@/app/dictionaries/de.json');
        setDictionary(fallback.default as unknown as LanguageType);
        setLocale('de');
      } finally {
        setLoading(false);
      }
    };

    const getStoredLanguage = (): 'en' | 'de' => {
      const stored = localStorage.getItem('mathstar-language');
      if (stored === 'en' || stored === 'de') return stored;
      return 'de';
    };

    // Initial load
    const initialLanguage = getStoredLanguage();
    fetchDictionary(initialLanguage);

    // Listen for language change events
    const handleLanguageChange = () => {
      const newLanguage = getStoredLanguage();
      console.log('Language change event received, loading:', newLanguage);
      fetchDictionary(newLanguage);
    };

    window.addEventListener('mathstar-language-changed', handleLanguageChange);

    return () => {
      window.removeEventListener('mathstar-language-changed', handleLanguageChange);
    };
  }, []);

  return { dictionary, locale, loading };
}