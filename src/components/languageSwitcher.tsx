"use client";


import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const changeLocale = (newLocale: string) => {
    // Extract current locale from pathname
    const segments = pathname.split("/").filter(Boolean);

    // Check if first segment is a locale
    const currentLocale = segments[0];
    const isLocaleInPath = /^[a-z]{2}(-[A-Z]{2})?$/.test(currentLocale);

    if (isLocaleInPath) {
      // Replace the locale
      segments[0] = newLocale;
      router.push(`/${segments.join("/")}`);
    } else {
      // No locale in path, add it
      router.push(`/${newLocale}${pathname}`);
    }
  };

  // Get current locale from pathname for display
  const getCurrentLocale = () => {
    const segments = pathname.split("/").filter(Boolean);
    const currentLocale = segments[0];
    return /^[a-z]{2}(-[A-Z]{2})?$/.test(currentLocale)
      ? currentLocale
      : "en-US";
  };

  const currentLocale = getCurrentLocale();
  const currentLanguage =
    languages.find((lang) => lang.code === currentLocale) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="size-[23px] cursor-pointer overflow-hidden rounded-full">
        <Image
          alt={currentLanguage.name}
          src={currentLanguage.flag}
          width={23}
          height={23}
          className="size-[23px] overflow-hidden rounded-full object-cover"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="relative top-6 space-y-2 border-none bg-white/20 text-white backdrop-blur-md">
        <DropdownMenuLabel hidden />
        <DropdownMenuSeparator hidden />
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => changeLocale(language.code)}
            className={
              currentLocale === language.code
                ? "bg-accent cursor-pointer text-black"
                : "cursor-pointer"
            }
          >
            <Image
              alt={language.name}
              src={language.flag}
              width={23}
              height={23}
              className="size-[23px] overflow-hidden rounded-full object-cover"
            />
            <span>{language.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// const locales = ["en", "it", "es", "de", "fr", "nl"]; // Added es-ES

const languages = [
  { name: "English", code: "en", flag: "/flags/us.svg" },
  { name: "German", code: "de", flag: "/flags/de.svg" },
];
