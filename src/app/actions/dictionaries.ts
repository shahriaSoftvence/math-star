// lib/dictionary.ts (or wherever your getDictionary is located)
import "server-only";
import { getCurrentLanguage } from './setLanguage';
import { LanguageType } from "../../../type/language";

// Cache for API responses
const dictionaryCache = new Map<string, LanguageType>();

export const getDictionary = async () => {
  const locale = await getCurrentLanguage();
  const normalizedLocale = (locale === 'en' ? 'en' : 'de') as 'en' | 'de';
  // Check cache first
  const cacheKey = normalizedLocale;
  if (dictionaryCache.has(cacheKey)) {
    return dictionaryCache.get(cacheKey);
  }

  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API}languages/?lang=${normalizedLocale}`;
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Cache for 1 hour
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const apiResponse = await response.json();
    // Extract the content from the API response
    if (apiResponse.status === 'success' && apiResponse.data && apiResponse.data.content) {
      const dictionaryData = apiResponse.data.content;
      // Cache the successful response
      dictionaryCache.set(cacheKey, dictionaryData);
      return dictionaryData;
    } else {
      throw new Error('Invalid API response structure');
    }
  } catch (error) {
    console.error(`Failed to fetch dictionary for locale '${normalizedLocale}':`, error);
  }
};