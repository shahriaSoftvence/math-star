export {};

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
    googleTranslateElementInit: () => void;
  }
}