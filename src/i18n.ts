import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en.json';
import kaTranslation from './locales/ka.json';

// Detect language from URL path synchronously so there is no race condition
// e.g. /ka/about  →  "ka",  /en/projects  →  "en",  /  →  "en"
const supportedLngs = ['en', 'ka'] as const;
const pathSegment = window.location.pathname.split('/')[1];
const detectedLng = supportedLngs.includes(pathSegment as 'en' | 'ka')
  ? (pathSegment as 'en' | 'ka')
  : 'en';

// Configure i18n — no LanguageDetector plugin needed; language is resolved above
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      ka: { translation: kaTranslation },
    },
    lng: detectedLng,          // set synchronously — no async detection
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });


export const resources = {
  en: {
    translation: enTranslation,
  },
  ka: {
    translation: kaTranslation,
  }
}
export const defaultNS = enTranslation;

export default i18n;