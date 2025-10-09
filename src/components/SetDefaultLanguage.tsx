// app/components/SetDefaultLanguage.tsx
'use client';

import { setDefaultLanguage } from '@/app/actions/setLanguage';
import { useEffect } from 'react';

export default function SetDefaultLanguage() {
  useEffect(() => {
    // Force set German as default language when component mounts
    const setGermanDefault = async () => {
      try {
        const result = await setDefaultLanguage();
        console.log('Language set to:', result.language);
      } catch (error) {
        console.error('Failed to set default language:', error);
      }
    };

    setGermanDefault();
  }, []);

  return null;
}