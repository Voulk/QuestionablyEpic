import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import XHR from "i18next-xhr-backend";
import languageEN from "./locale/en/translate.json";
// import languageCH from "./locale/ch/translate.json";
import languageRU from "./locale/ru/translate.json";
// import languageFR from "./locale/fr/translate.json";
import languageDE from "./locale/de/translate.json";
import ls from "local-storage";

i18n
  .use(XHR)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: languageEN,
      //cn: languageCH,
      ru: languageRU,
      //fr: languageFR,
      de: languageDE,
    },
    /* default language when load the website in browser */
    lng: "en",
    /* When react i18next not finding any language to as default in browser */
    fallbackLng: "en",
    /* debugger For Development environment */
    debug: false,
    ns: ["translations"],
    defaultNS: "translations",
    keySeparator: ".",
    interpolation: {
      escapeValue: false,
      formatSeparator: ",",
    },
    react: {
      //wait: true,
      bindI18n: "languageChanged loaded",
      bindStore: "added removed",
      nsMode: "default",
      useSuspense: true,
    },
  });

export default i18n;
