// lib/translations.ts
import type { Language } from './languages';
import translationsData from '@/locales/language.json';

function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

export function getTranslation(
  key: string,
  language: Language,
  params: Record<string, any> = {}
): string {
  const translation = getNestedValue(translationsData.translations[language], key);
  
  if (typeof translation !== 'string') {
    return key;
  }

  return translation.replace(/\{(\w+)\}/g, (_, paramName) => {
    return params[paramName]?.toString() || `{${paramName}}`;
  });
}

export function getTranslations(language: Language, namespace: string) {
  return {
    t: (key: string, params?: Record<string, any>) => 
      getTranslation(`${namespace}.${key}`, language, params),
  };
}