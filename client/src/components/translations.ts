// i18next
import i18n from 'i18next';
import { useTranslation, initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from 'i18next-http-backend';

import deDE from './locales/de-DE.json';
import enUK from './locales/en-UK.json';

i18n
  .use(initReactI18next)
  .use(Backend)
  .use(LanguageDetector)
  .init({
    lng: "de-DE",
    fallbackLng: "en-UK",
    resources: {
      'en-UK': {
        translation: enUK
      },
      'de-DE': {
        translation: deDE
      }
    },
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });

export { useTranslation }