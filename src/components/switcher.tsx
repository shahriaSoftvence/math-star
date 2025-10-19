// components/Switcher.tsx
'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { updateLanguage, getCurrentLanguage } from "@/app/actions/setLanguage";
import flagDe from "@/asset/Flag.png";
import flagEn from "@/asset/usa.png";

const languages = [
  { name: "English", code: "en", flag: flagEn },
  { name: "German", code: "de", flag: flagDe },
];

export const LANGUAGE_CHANGED_EVENT = 'mathstar-language-changed';

export default function Switcher() {
  const router = useRouter();
  const [currentLocale, setCurrentLocale] = useState("de");
  const [isLoading, setIsLoading] = useState(false);

  const setCookieDirectly = (name: string, value: string, days = 365) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
  };

  useEffect(() => {
    const fetchCurrentLanguage = async () => {
      try {
        const storedLang = localStorage.getItem('mathstar-language');
        if (storedLang === 'en' || storedLang === 'de') {
          setCurrentLocale(storedLang);
          return;
        }

        const locale = await getCurrentLanguage();
        setCurrentLocale(locale);

        localStorage.setItem('mathstar-language', locale);
      } catch (error) {
        console.error('Failed to get current language:', error);
        setCurrentLocale('de');
        localStorage.setItem('mathstar-language', 'de');
      }
    };

    fetchCurrentLanguage();
  }, []);

  const changeLocale = async (newLocale: string) => {
    if (newLocale === currentLocale) return;

    setIsLoading(true);

    try {
      // Update server cookie
      await updateLanguage(newLocale);

      // Set client cookie
      setCookieDirectly('mathstar-language', newLocale);

      // Update localStorage
      localStorage.setItem('mathstar-language', newLocale);

      // Dispatch event to reload dictionaries
      window.dispatchEvent(new CustomEvent(LANGUAGE_CHANGED_EVENT, {
        detail: { locale: newLocale }
      }));

      setCurrentLocale(newLocale);

      // Refresh the page to update server components
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
      {isLoading ? (
        <div className="w-10 h-8 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      ) : currentLanguage.name === 'German' ? (
        <button
          className="cursor-pointer hover:scale-102 duration-200"
          disabled={isLoading}
          onClick={() => changeLocale('en')}
        >
          <Image
            alt="Deutsch"
            src={flagDe}
            width={44}
            height={35}
            className="w-10 h-auto rounded"
            title="Switch to English"
          />
        </button>
      ) : (
        <button
          className="cursor-pointer hover:scale-102 duration-200"
          disabled={isLoading}
          onClick={() => changeLocale('de')}
        >
          <Image
            alt="English"
            src={flagEn}
            width={44}
            height={35}
            className="w-10 h-auto rounded"
            title="Switch to Deutsch"
          />
        </button>
      )}
    </div>
  );
}