export const covenantLocale = [
  {
    name: {
      en: "Kyrian",
      fr: "Kyrians",
      de: "Kyrianer",
      ru: "Кирии",
      ch: "格里恩",
    },
    id: ["Kyrian", "kyrian"],
  },
  {
    name: {
      en: "Venthyr",
      fr: "Venthyrs",
      de: "Venthyr",
      ru: "Вентиры",
      ch: "温西尔",
    },
    id: ["Venthyr", "venthyr"],
  },
  {
    name: {
      en: "Necrolords",
      fr: "Nécro-seigneurs",
      de: "Nekrolords",
      ru: "Некролорды",
      ch: "通灵领主",
    },
    id: ["Necrolords", "necrolords", "necrolord"],
  },
  {
    name: {
      en: "Night Fae",
      fr: "Faë nocturnes",
      de: "Nachtfae",
      ru: "Ночной народец",
      ch: "法夜",
    },
    id: ["NightFae", "night_fae"],
  },
];

export const getTranslatedCovenantName = (covenant, currentLanguage) => {
  let name = covenantLocale
    .filter((obj) => {
      return obj.id.includes(covenant);
    })
    .map((obj) => obj.name[currentLanguage]);

  return name;
};
