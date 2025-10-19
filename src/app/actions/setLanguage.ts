// app/actions/languageActions.ts
'use server';

import { cookies } from 'next/headers';

// Set default language cookie to 'de'
export async function setDefaultLanguage() {
  try {
    const cookieStore = await cookies();
    const existingLanguage = cookieStore.get('mathstar-language')?.value;
    // Always set to 'de' if no cookie exists
    if (!existingLanguage) {
      cookieStore.set({
        name: 'mathstar-language',
        value: 'de', // Force German as default
        path: '/',
        maxAge: 60 * 60 * 24 * 365, // 1 year
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });
      return { success: true, language: 'de', wasSet: true };
    }
    return { success: true, language: existingLanguage, wasSet: false };
  } catch (error) {
    console.error('Error setting default language:', error);
    return { success: false, language: 'de', wasSet: false, error: 'Failed to set language' };
  }
}

// Update language cookie
export async function updateLanguage(locale: string) {
  try {
    const cookieStore = await cookies();
    if (locale !== 'en' && locale !== 'de') {
      throw new Error('Invalid locale');
    }
    cookieStore.set({
      name: 'mathstar-language',
      value: locale,
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
    return { success: true, language: locale };
  } catch (error) {
    console.error('Error updating language:', error);
    throw new Error('Failed to update language');
  }
}

// Get current language - default to 'de'
export async function getCurrentLanguage() {
  try {
    const cookieStore = await cookies();
    return cookieStore.get('mathstar-language')?.value || 'de';
  } catch (error) {
    console.error('Error getting current language:', error);
    return 'de';
  }
}