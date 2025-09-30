// Translation API response interface
export interface TranslationResponse {
  status: boolean;
  message: string;
  data: {
    translatedText: string;
    detectedSource: string;
  };
  code: number;
}

// Translation request parameters
export interface TranslationParams {
  text: string;
  target: string;
  source: string;
}

// Error interface
export interface TranslationError {
  message: string;
  status: number;
}

/**
 * Translate text using backend API
 */
export const translateText = async (
  text: string,
  target: string,
  source: string
): Promise<
  | { success: true; translatedText: string; detectedSource: string }
  | { success: false; error: string }
> => {
  try {
    if (source === target || !text.trim()) {
      return { success: true, translatedText: text, detectedSource: source };
    }

    const response = await fetch(
      `/api/translate?text=${encodeURIComponent(text)}&target=${target}&source=${source}`,
      { method: "GET" }
    );

    if (!response.ok) return { success: false, error: "Translation failed" };

    const data = await response.json();

    if (!data.status) return { success: false, error: data.message || "Translation error" };

    return {
      success: true,
      translatedText: data.data.translatedText,
      detectedSource: data.data.detectedSource,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown translation error",
    };
  }
};

/**
 * Batch translate multiple texts
 */
export const translateBatch = async (
  texts: string[],
  target: string,
  source: string
): Promise<
  Array<{ original: string; translated: string; success: boolean; error?: string }>
> => {
  const results = await Promise.allSettled(
    texts.map(async (text) => {
      const result = await translateText(text, target, source);
      return {
        original: text,
        translated: result.success ? result.translatedText : text,
        success: result.success,
        error: result.success ? undefined : result.error,
      };
    })
  );

  return results.map((result, index) =>
    result.status === "fulfilled"
      ? result.value
      : { original: texts[index], translated: texts[index], success: false, error: "Translation request failed" }
  );
};

/**
 * Supported languages: English and German only
 */
export const getSupportedLanguages = () => ({
  en: "English",
  de: "German",
});

export const isLanguageSupported = (languageCode: string): boolean => {
  return languageCode === "en" || languageCode === "de";
};

/**
 * RTL functions (not needed for English/German)
 */
export const isRTLLanguage = (_languageCode: string): boolean => false;

export const getRTLLanguages = (): string[] => [];
