import { readFileSync, readdirSync } from 'fs';
import path from 'path';
import i18n from 'i18next';
import LenguajeDetection from 'i18next-browser-languagedetector';
import i18nextMiddleware from 'i18next-http-middleware';

//This interface, define the generic type of the json files.
interface JsonInterface<T> {
  [key: string]: T;
}

/**
 * This functions search translation files json,
 * and return the content of files.
 * @returns json content
 */
const loadLocaleFiles = () => {
  const localesDir = path.join(__dirname, 'i18n');
  const locales = readdirSync(localesDir);
  const resources: { [key: string]: JsonInterface<string> } = {};
  for (const locale of locales) {
    const filepath = path.join(localesDir, locale);
    const fileContent: string = readFileSync(filepath, 'utf-8');
    const tempResource = { translation: JSON.parse(fileContent) as string };
    resources[locale.replace('.json', '')] = tempResource;
  }
  return resources;
};

/**
 * i18n Configuration
 * This configuration, set the default language
 * and the detection user languages.
 * @returns i18n object
 */

void i18n
  .use(i18nextMiddleware.LanguageDetector)
  .use(LenguajeDetection)
  .init({
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // This line, pemit the injection of discord markdown in the translations.
    },
    detection: {
      order: ['querystring', 'cookie', 'header'],
      caches: ['cookie'],
      lookupCookie: 'lenguaje',
    },
    resources: loadLocaleFiles(),
  });

export default i18n;
