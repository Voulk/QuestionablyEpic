export const covenantLocale = [
  {
    name: {
      en: "Kyrian",
      fr: "",
      de: "",
      ru: "",
      ch: "",
    },
    id: ["Kyrian", "kyrian"],
  },
  {
    name: {
      en: "Venthyr",
      fr: "",
      de: "",
      ru: "",
      ch: "",
    },
    id: ["Venthyr", "venthyr"],
  },
  {
    name: {
      en: "Necrolords",
      fr: "",
      de: "",
      ru: "",
      ch: "",
    },
    id: ["Necrolords", "necrolords"],
  },
  {
    name: {
      en: "Night Fae",
      fr: "",
      de: "",
      ru: "",
      ch: "",
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
