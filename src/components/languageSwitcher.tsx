'use client';

import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import Flag from '@/asset/Flag.png';   // German 🇩🇪
import usaFlag from '@/asset/usa.png'; // English 🇺🇸

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLang = pathname.split('/')[1] === 'de' ? 'de' : 'en';

  const handleSelectLanguage = (newLang: 'de' | 'en') => {
    const segments = pathname.split('/');
    segments[1] = newLang;
    router.push(segments.join('/'));
  };

  return (
    <button
      className="cursor-pointer"
      onClick={() => handleSelectLanguage(currentLang === 'de' ? 'en' : 'de')}
    >
      {currentLang === 'de' ? (
        <Image src={Flag} alt="German Flag" className="w-10 h-auto" />
      ) : (
        <Image src={usaFlag} alt="US Flag" className="w-10 h-auto rounded" />
      )}
    </button>
  );
}
