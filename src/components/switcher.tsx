// app/components/LanguageSwitcher.tsx
'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
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
    <DropdownMenu>
      <DropdownMenuTrigger 
        disabled={isLoading}
        className="w-11 h-9 flex items-center justify-center rounded-full cursor-pointer overflow-hidden border border-transparent hover:border-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Image
          alt={currentLanguage.name}
          src={currentLanguage.flag}
          width={44}
          height={35}
          className="w-full h-full object-cover rounded-full"
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent 
        align="end"
        className="relative top-2 space-y-2 border border-gray-200 bg-white text-gray-800 shadow-lg rounded-md min-w-[140px]"
      >
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => changeLocale(language.code)}
            disabled={isLoading}
            className={
              `flex items-center px-3 py-2 cursor-pointer transition-colors rounded-sm ${
                currentLocale === language.code
                  ? "bg-blue-50 text-blue-600 border border-blue-200"
                  : "hover:bg-gray-50"
              } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`
            }
          >
            <Image
              alt={language.name}
              src={language.flag}
              width={24}
              height={18}
              className="w-6 h-4 object-cover rounded"
            />
            <span className="ml-2 text-sm font-medium">{language.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}