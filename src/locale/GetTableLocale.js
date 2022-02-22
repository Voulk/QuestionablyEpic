/* ------- Sets the localization of the table based on the users selected language in i18 ------- */
import { useTranslation } from "react-i18next";
import { localizationFR } from "locale/fr/TableLocale";
import { localizationEN } from "locale/en/TableLocale";
import { localizationRU } from "locale/ru/TableLocale";
import { localizationCH } from "locale/ch/TableLocale";

export const getTableLocale = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  if (currentLanguage === "en") {
    return localizationEN;
  } else if (currentLanguage === "ru") {
    return localizationRU;
  } else if (currentLanguage === "ch") {
    return localizationCH;
  } else if (currentLanguage === "fr") {
    return localizationFR;
  }

  // error handling
  return localizationEN;
};
