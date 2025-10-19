// hooks/useDictionary.ts
'use client';

import { useEffect, useState } from 'react';
import { LanguageType } from '../../type/language';

export const LANGUAGE_CHANGED_EVENT = 'mathstar-language-changed';

export function useDictionary() {
  const [dictionary, setDictionary] = useState<LanguageType | null>(null);
  const [locale, setLocale] = useState<'en' | 'de'>('de');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDictionary = async (language: 'en' | 'de') => {
      try {
        setLoading(true);
        setError(null);
        const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API}languages/?lang=${language}`;
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch dictionary: ${response.status}`);
        }

        const apiResponse = await response.json();
        // Extract content from API response
        if (apiResponse.status === 'success' && apiResponse.data && apiResponse.data.content) {
          setDictionary(apiResponse.data.content as LanguageType);
          setLocale(language);
        } else {
          throw new Error('Invalid API response structure');
        }
      } catch (error) {
        console.error('Failed to load dictionary from API:', error);
        setError('Failed to load translations');
        // Fallback to local files
        try {
          console.warn('Falling back to local dictionary files');
          const fallback = await import(`@/app/dictionaries/${language}.json`);
          setDictionary(fallback.default as unknown as LanguageType);
          setLocale(language);
        } catch (fallbackError) {
          console.error('Fallback also failed:', fallbackError);
          // Set empty dictionary to avoid breaking the app
          setDictionary({} as LanguageType);
        }
      } finally {
        setLoading(false);
      }
    };

    const getStoredLanguage = (): 'en' | 'de' => {
      // Try localStorage first (client preference)
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('mathstar-language');
        if (stored === 'en' || stored === 'de') return stored;
      }
      return 'de';
    };

    const initialLanguage = getStoredLanguage();
    fetchDictionary(initialLanguage);

    const handleLanguageChange = () => {
      const newLanguage = getStoredLanguage();
      console.log('Language change event received, loading:', newLanguage);
      fetchDictionary(newLanguage);
    };

    window.addEventListener(LANGUAGE_CHANGED_EVENT, handleLanguageChange);

    return () => {
      window.removeEventListener(LANGUAGE_CHANGED_EVENT, handleLanguageChange);
    };
  }, []);

  return { dictionary, locale, loading, error };
}