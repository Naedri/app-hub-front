import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import { Language } from '../../utils/enums/languages';

import enTranslation from './translations/i18-en';
import frTranslation from './translations/i18-fr';
import noTranslation from './translations/i18-no';

//TODO Translate from i18-en in English to i18-fr in French and i18-no in Norwegian

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: Language.En, // English will be first supported
    fallbackNS: 'common', // common namespaces will be used if none is indicated
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        ...enTranslation,
      },
      fr: {
        ...frTranslation,
      },
      no: {
        ...noTranslation,
      },
    },
  });

export default i18n;
