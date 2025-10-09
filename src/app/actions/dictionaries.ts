// app/actions/dictionaries.ts
import "server-only";
import { getCurrentLanguage } from './setLanguage';

const dictionaries = {
  en: () => import("../dictionaries/en.json").then((module) => module.default),
  de: () => import("../dictionaries/de.json").then((module) => module.default),
};

export const getDictionary = async () => {
  const locale = await getCurrentLanguage();
  const normalizedLocale = locale as keyof typeof dictionaries;
  
  // Check if locale is supported, fallback to 'de' if not
  if (!dictionaries[normalizedLocale]) {
    console.warn(`Locale '${locale}' not supported, falling back to 'de'`);
    return dictionaries.de();
  }
  
  return dictionaries[normalizedLocale]();
};