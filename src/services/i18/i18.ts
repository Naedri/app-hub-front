import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import { Language } from '../../utils/enums/languages';

const i18nextOptions = {
  //debug: true,
  fallbackLng: Language.en,
  preload: [Language.en],
  ns: ['common'],
  defaultNS: 'common',
  fallbackNS: ['common'],
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
};

i18n
  // i18next-http-backend
  // loads translations from your server
  // https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init(i18nextOptions);

export default i18n;
