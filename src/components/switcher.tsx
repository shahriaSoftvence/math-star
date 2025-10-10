// app/components/LanguageSwitcher.tsx
'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { updateLanguage, getCurrentLanguage } from "@/app/actions/setLanguage";
import flagDe from "@/asset/Flag.png";
import flagEn from "@/asset/usa.png";

// Define languages
const languages = [
  { name: "English", code: "en", flag: flagEn },
  { name: "German", code: "de", flag: flagDe },
];

// Custom event for language changes
export const LANGUAGE_CHANGED_EVENT = 'mathstar-language-changed';

export default function Switcher() {
  const router = useRouter();
  const [currentLocale, setCurrentLocale] = useState("de");
  const [isLoading, setIsLoading] = useState(false);

  // Helper to set cookie directly (for immediate client-side access)
  const setCookieDirectly = (name: string, value: string, days = 365) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
  };

  // Get current language on mount
  useEffect(() => {
    const fetchCurrentLanguage = async () => {
      try {
        // Try to get from localStorage first (fastest)
        const storedLang = localStorage.getItem('mathstar-language');
        if (storedLang === 'en' || storedLang === 'de') {
          setCurrentLocale(storedLang);
          return;
        }

        // Fallback to server cookie
        const locale = await getCurrentLanguage();
        setCurrentLocale(locale);

        // Sync to localStorage
        localStorage.setItem('mathstar-language', locale);
      } catch (error) {
        console.error('Failed to get current language:', error);
        setCurrentLocale('de');
        localStorage.setItem('mathstar-language', 'de');
      }
    };

    fetchCurrentLanguage();
  }, []);

  // Change language handler
  const changeLocale = async (newLocale: string) => {
    if (newLocale === currentLocale) return;

    setIsLoading(true);

    try {
      // 1. Update server cookie (for server components)
      await updateLanguage(newLocale);

      // 2. Update client cookie immediately (for other client components)
      setCookieDirectly('mathstar-language', newLocale);

      // 3. Update localStorage (for useDictionary hook)
      localStorage.setItem('mathstar-language', newLocale);

      // 4. Dispatch event to notify all client components
      window.dispatchEvent(new CustomEvent(LANGUAGE_CHANGED_EVENT, {
        detail: { locale: newLocale }
      }));

      // 5. Update local state
      setCurrentLocale(newLocale);

      // 6. Refresh the page to apply language changes to all server components
      router.refresh();

    } catch (error) {
      console.error('Failed to change language:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const currentLanguage = languages.find((lang) => lang.code === currentLocale) || languages[1];

  return (
    <div className="flex items-center">
      <button className="cursor-pointer hover:scale-102 duration-200" disabled={isLoading} onClick={() => changeLocale(currentLanguage.code === 'en' ? 'de' : 'en')}>
        <Image
          alt={currentLanguage.name}
          src={currentLanguage.flag}
          width={44}
          height={35}
          className="w-10 h-auto rounded"
        />
      </button>
    </div>
  );
}