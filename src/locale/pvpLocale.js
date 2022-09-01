export const pvpLocale = [
  {
    name: {
      en: "Honor",
      fr: "Honneur",
      de: "Ehre",
      ru: "Честь",
      ch: "荣誉点数",
    },
    id: ["-16", -16, "Honor"],
  },
  {
    name: {
      en: "Conquest",
      fr: "Points de conquête",
      de: "Eroberung",
      ru: "Очки завоевания",
      ch: "征服点数",
    },
    id: ["-17", -17, "Conquest"],
  },
];

export const getTranslatedPvP = (pvp, currentLanguage) => {
  let name = pvpLocale
    .filter((obj) => {
      return obj.id.includes(pvp);
    })
    .map((obj) => obj.name[currentLanguage]);

  return name;
};
