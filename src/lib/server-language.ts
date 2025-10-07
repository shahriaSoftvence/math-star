// lib/server-language.ts
import { cookies, headers } from 'next/headers';
import { defaultLanguage, type Language } from './languages';

export function getLanguageFromRequest(): Language {
  const headersList = headers();
  const pathname = headersList.get('x-invoke-path') || '';
  const urlLanguage = pathname.split('/')[1] as Language;
  
  if (urlLanguage === 'en' || urlLanguage === 'de') {
    return urlLanguage;
  }

  const cookieStore = cookies();
  const cookieLanguage = cookieStore.get('preferred-language')?.value as Language;
  
  if (cookieLanguage === 'en' || cookieLanguage === 'de') {
    return cookieLanguage;
  }

  return defaultLanguage;
}