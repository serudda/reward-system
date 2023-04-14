import i18n from 'i18next';
import LenguajeDetection from 'i18next-browser-languagedetector';
import i18nextMiddleware from 'i18next-http-middleware';
import resourcesToBackend from 'i18next-resources-to-backend';

/**
 * i18n Configuration
 * This configuration, set the default language
 * and the detection user languages.
 * @returns i18n object
 */

const fallbackLng = 'en';
const availableLanguages = ['en'];

void i18n
  .use(i18nextMiddleware.LanguageDetector)
  .use(LenguajeDetection)
  .use(
    resourcesToBackend(async (language: string, _, callback) => {
      import(`./locale/${language}.json`)
        .then(({ default: resources }) => {
          // with dynamic import, you have to use the "default" key of the module ( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#importing_defaults )
          callback(null, resources);
        })
        .catch((error) => {
          callback(error, null);
        });
    }),
  )
  .init({
    fallbackLng: fallbackLng,
    preload: availableLanguages,
    supportedLngs: availableLanguages,
    interpolation: {
      escapeValue: false, // This line, pemit the injection of discord markdown in the translations.
    },
    detection: {
      order: ['querystring', 'cookie', 'header'],
      caches: ['cookie'],
      lookupCookie: 'lenguaje',
    },
    debug: false,
  });

export default i18n;
