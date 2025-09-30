const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY;
const GOOGLE_API_URL = process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_API_URL || 'https://translation.googleapis.com';

export const translateText = async (text, targetLang, sourceLang = 'en') => {
  try {
    if (sourceLang === targetLang) {
      return {
        success: true,
        translatedText: text,
        detectedSource: sourceLang,
      };
    }
    if (!text || !text.trim()) {
      return {
        success: true,
        translatedText: text,
        detectedSource: sourceLang,
      };
    }
    if (!GOOGLE_API_KEY) {
      console.warn('Google Translate API key not found. Using fallback method.');
      return await fallbackTranslation(text, targetLang, sourceLang);
    }

    const response = await fetch(
      `${GOOGLE_API_URL}/language/translate/v2?key=${GOOGLE_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          target: targetLang,
          source: sourceLang,
          format: 'text'
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.warn('Google Cloud Translation failed, trying fallback:', errorData);
      return await fallbackTranslation(text, targetLang, sourceLang);
    }

    const data = await response.json();

    if (data && data.data && data.data.translations && data.data.translations[0]) {
      return {
        success: true,
        translatedText: data.data.translations[0].translatedText,
        detectedSource: data.data.translations[0].detectedSourceLanguage || sourceLang,
      };
    }

    throw new Error('Invalid response format from Google Translate');

  } catch (error) {
    return await fallbackTranslation(text, targetLang, sourceLang);
  }
};

// ✅ Fallback method (no changes needed)
const fallbackTranslation = async (text, targetLang, sourceLang = 'en') => {
  try {
    const response = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Fallback translation failed with status: ${response.status}`);
    }

    const data = await response.json();

    if (data && Array.isArray(data) && data[0] && Array.isArray(data[0])) {
      const translatedText = data[0].map(item => item[0]).join('');

      return {
        success: true,
        translatedText: translatedText,
        detectedSource: data[2] || sourceLang,
      };
    }

    throw new Error('Invalid response format from fallback translation');

  } catch (fallbackError) {
    return {
      success: false,
      error: fallbackError.message,
      translatedText: text,
    };
  }
};

export const translateBatch = async (texts, targetLang, sourceLang = 'en') => {
  const results = await Promise.allSettled(
    texts.map(async (text) => {
      const result = await translateText(text, targetLang, sourceLang);
      return {
        original: text,
        translated: result.success ? result.translatedText : text,
        success: result.success,
        error: result.success ? undefined : result.error,
      };
    })
  );

  return results.map((result, index) => {
    if (result.status === "fulfilled") {
      return result.value;
    } else {
      return {
        original: texts[index],
        translated: texts[index],
        success: false,
        error: "Translation request failed",
      };
    }
  });
};

// ✅ Supported languages: English + German
export const getSupportedLanguages = () => {
  return {
    en: "English",
    de: "Deutsch",
  };
};

// ✅ Language support check
export const isLanguageSupported = (languageCode) => {
  const supported = getSupportedLanguages();
  return languageCode in supported;
};

// ✅ RTL languages — none apply here, but keep for future
export const isRTLLanguage = (languageCode) => {
  const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
  return rtlLanguages.includes(languageCode);
};
