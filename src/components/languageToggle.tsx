import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import EnglishFlag from '@/asset/usa.png'; 
import GermanFlag from '@/asset/Flag.png';

declare global {
  interface Window {
    google: {
      translate: {
        TranslateElement: {
          new (config: {
            pageLanguage: string;
            includedLanguages?: string;
            layout?: number;
            autoDisplay?: boolean;
          }, elementId: string): void;
          InlineLayout: {
            SIMPLE: number;
            HORIZONTAL: number;
          };
        };
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

const LanguageToggle = () => {
  const [isEnglish, setIsEnglish] = useState<boolean>(true);
  const [translateLoaded, setTranslateLoaded] = useState<boolean>(false);
  const scriptAdded = useRef<boolean>(false);

  useEffect(() => {
    const initializeTranslate = () => {
      // Check if Google Translate is already available
      if (window.google?.translate) {
        setTranslateLoaded(true);
        return;
      }

      // Prevent duplicate script loading
      if (scriptAdded.current) return;
      scriptAdded.current = true;

      // Create and add the script
      const script = document.createElement('script');
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;

      script.onload = () => {
        console.log('Google Translate script loaded successfully');
      };

      script.onerror = () => {
        console.error('Failed to load Google Translate script');
        scriptAdded.current = false;
        setTranslateLoaded(false);
      };

      document.head.appendChild(script);

      // Define the callback function
      window.googleTranslateElementInit = (): void => {
        console.log('googleTranslateElementInit called');
        
        if (!window.google?.translate) {
          console.error('Google Translate API not available after script load');
          setTranslateLoaded(false);
          return;
        }

        try {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: 'en',
              includedLanguages: 'en,de',
              layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
              autoDisplay: false
            },
            'google_translate_element'
          );
          console.log('Google Translate initialized successfully');
          setTranslateLoaded(true);
        } catch (error) {
          console.error('Error initializing Google Translate:', error);
          setTranslateLoaded(false);
        }
      };
    };

    initializeTranslate();

    return () => {
      // Cleanup
      const script = document.querySelector('script[src*="translate.google.com"]');
      script?.remove();
      delete window.googleTranslateElementInit;
    };
  }, []);

  const toggleLanguage = (): void => {
    if (!translateLoaded) {
      console.warn('Google Translate not loaded yet');
      return;
    }

    setTimeout(() => {
      // Try multiple ways to find the Google Translate dropdown
      let select: HTMLSelectElement | null = null;
      
      // Method 1: Direct selection
      select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      
      // Method 2: Look in iframe
      if (!select) {
        const iframe = document.querySelector('.goog-te-menu-frame') as HTMLIFrameElement;
        if (iframe?.contentDocument) {
          select = iframe.contentDocument.querySelector('.goog-te-combo') as HTMLSelectElement;
        }
      }

      if (select) {
        const newLanguage = isEnglish ? 'de' : 'en';
        const newIsEnglish = !isEnglish;
        
        console.log(`Changing language from ${isEnglish ? 'EN' : 'DE'} to ${newIsEnglish ? 'EN' : 'DE'}`);
        
        select.value = newLanguage;
        select.dispatchEvent(new Event('change', { bubbles: true }));
        setIsEnglish(newIsEnglish);
      } else {
        console.warn('Google Translate dropdown not found. Available elements:');
        console.log('Google Translate frame:', document.querySelector('.goog-te-menu-frame'));
        console.log('All .goog-te-* elements:', document.querySelectorAll('[class*="goog-te"]'));
      }
    }, 500); // Increased timeout to ensure everything is loaded
  };

  return (
    <div className="flex items-center">
      {/* Google Translate Element - make it visible for debugging */}
      <div 
        id="google_translate_element" 
        style={{ 
          position: 'absolute',
          top: '-1000px',
          left: '-1000px',
          opacity: 0,
          pointerEvents: 'none'
        }}
      ></div>
      
      <button
        onClick={toggleLanguage}
        className="flex items-center justify-center p-2 rounded-lg border border-gray-300 hover:border-gray-400 transition-colors duration-200 bg-white shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        title={isEnglish ? 'Switch to German' : 'Switch to English'}
        disabled={!translateLoaded}
      >
        <Image 
          src={isEnglish ? EnglishFlag : GermanFlag} 
          alt={isEnglish ? 'English Flag' : 'German Flag'} 
          className="w-10 h-auto"
          width={40}
          height={25}
        />
      </button>
      
      <span className="ml-2 text-sm font-medium text-gray-700">
        {isEnglish ? 'EN' : 'DE'}
        {!translateLoaded && ' (loading...)'}
      </span>

      {/* Debug info - remove in production */}
      <div className="ml-4 text-xs text-gray-500">
        Status: {translateLoaded ? 'Loaded' : 'Loading...'}
      </div>
    </div>
  );
};

export default LanguageToggle;