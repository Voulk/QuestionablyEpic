export const statsLocale = [
  {
    name: {
      en: "Avoidance",
      fr: "",
      de: "",
      ru: "",
      ch: "",
    },
    id: ["Avoidance", "avoidance"],
  },
  {
    name: {
      en: "Crit",
      fr: "",
      de: "",
      ru: "",
      ch: "",
    },
    id: ["Crit", "crit"],
  },
  {
    name: {
      en: "Haste",
      fr: "",
      de: "",
      ru: "",
      ch: "",
    },
    id: ["Haste", "haste"],
  },
  {
    name: {
      en: "Intellect",
      fr: "",
      de: "",
      ru: "",
      ch: "",
    },
    id: ["Intellect", "intellect"],
  },
  {
    name: {
      en: "Leech",
      fr: "",
      de: "",
      ru: "",
      ch: "",
    },
    id: ["Leech", "leech"],
  },
  {
    name: {
      en: "Mana",
      fr: "",
      de: "",
      ru: "",
      ch: "",
    },
    id: ["Mana", "mana"],
  },
  {
    name: {
      en: "Mastery",
      fr: "",
      de: "",
      ru: "",
      ch: "",
    },
    id: ["Mastery", "mastery"],
  },
  {
    name: {
      en: "Versatility",
      fr: "",
      de: "",
      ru: "",
      ch: "",
    },
    id: ["Versatility", "versatility"],
  },
];

export const getTranslatedStats = (stat, currentLanguage) => {
  let stats = classNameDB
    .filter((obj) => {
      return obj.id.includes(stat);
    })
    .map((obj) => obj.name[currentLanguage]);

  return stats;
};
