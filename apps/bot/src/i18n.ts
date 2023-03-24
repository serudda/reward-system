/* Dependencies */

import { readdirSync } from 'fs';
import path from 'path';
import i18n from 'i18next';
import LenguajeDetection from 'i18next-browser-languagedetector';
import i18nextMiddleware from 'i18next-http-middleware';

/**
 * This functions search translation files json,
 * and return the content of files.
 * @returns translations files
 */
const loadLocaleFiles = () => {
  const localesDir = path.join(__dirname, 'i18n');
  const locales = readdirSync(localesDir);
  const resources = {};
  for (const locale of locales) {
    const filepath = path.join(localesDir, locale);
    const fileContent: LanguageData = require(filepath);
    resources[locale.replace('.json', '')] = { translation: fileContent };
  }
  return resources;
};

/* i18n Setup */
/**
 * This configuration, set the default language,
 * and the order of detection of the language.
 * @returns i18n
 */
i18n
  .use(i18nextMiddleware.LanguageDetector)
  .use(LenguajeDetection)
  .init({
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['querystring', 'cookie', 'header'],
      caches: ['cookie'],
      lookupCookie: 'lenguaje',
    },
    resources: loadLocaleFiles(),
  });

export default i18n;
