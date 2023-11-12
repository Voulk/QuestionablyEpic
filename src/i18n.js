import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import XHR from "i18next-xhr-backend";
import languageEN from "./locale/en/translate.json";
import languageCH from "./locale/ch/translate.json";
import languageRU from "./locale/ru/translate.json";
import languageFR from "./locale/fr/translate.json";
import languageDE from "./locale/de/translate.json";
import languageIT from "./locale/it/translate.json";
import ls from "local-storage";

var userLang = (navigator.language || navigator.userLanguage).slice(0,2);

i18n
  .use(XHR)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: languageEN,
      cn: languageCH,
      ru: languageRU,
      fr: languageFR,
      de: languageDE,
      it: languageIT
    },
    /* default language when load the website in browser */
    lng: userLang,
    /* When react i18next not finding any language to as default in browser */
    fallbackLng: "en",
    /* debugger For Development environment */
    debug: true,
    ns: ["translations"],
    defaultNS: "translations",
    keySeparator: ".",
    interpolation: {
      escapeValue: false,
      formatSeparator: ",",
    },
    react: {
      wait: true,
      bindI18n: "languageChanged loaded",
      bindStore: "added removed",
      nsMode: "default",
      useSuspense: false,
    },
  });

export default i18n;
