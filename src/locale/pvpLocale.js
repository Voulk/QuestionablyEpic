export const pvpLocale = [
  {
    name: {
      en: "Honor",
      fr: "Honneur",
      de: "Ehre",
      ru: "Честь",
      ch: "荣誉点数",
    },
    id: ["-30", -30, "Honor"],
  },
  {
    name: {
      en: "Conquest",
      fr: "Points de conquête",
      de: "Eroberung",
      ru: "Очки завоевания",
      ch: "征服点数",
    },
    id: ["-31", -31, "Conquest"],
  },
];

export const getTranslatedPvP = (pvp, currentLanguage) => {
  let name = pvpLocale
    .filter((obj) => {
      return obj.id.includes(pvp);
    })
    .map((obj) => obj.name[currentLanguage] ?? obj.name["en"]);

  return name;
};
