// lib/languages.ts
export type Language = 'en' | 'de';

export const languages: { code: Language; name: string; }[] = [
  { code: 'de', name: 'Deutsch'},
  { code: 'en', name: 'English'}
];

export const defaultLanguage: Language = 'de';