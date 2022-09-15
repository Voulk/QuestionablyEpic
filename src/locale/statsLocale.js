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
      fr: "Score de crit",
      de: "Kritische Trefferwertung",
      ru: "Критический удар",
      ch: "",
    },
    id: ["Crit", "crit"],
  },
  {
    name: {
      en: "Haste",
      fr: "Hâte",
      de: "Tempo",
      ru: "Скорость",
      ch: "",
    },
    id: ["Haste", "haste"],
  },
  {
    name: {
      en: "Intellect",
      fr: "Intelligence",
      de: "Intelligenz",
      ru: "Интеллект",
      ch: "",
    },
    id: ["Intellect", "intellect"],
  },
  {
    name: {
      en: "Leech",
      fr: "Leech",
      de: "Lebensraub",
      ru: "Самоисцеление",
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
      fr: "Maîtrise",
      de: "Meisterschaft",
      ru: "Искусность",
      ch: "",
    },
    id: ["Mastery", "mastery"],
  },
  {
    name: {
      en: "Versatility",
      fr: "Versatilité",
      de: "Vielseitigkeit",
      ru: "универсальность",
      ch: "",
    },
    id: ["Versatility", "versatility"],
  },
];

export const getTranslatedStats = (stat, currentLanguage) => {
  let stats = statsLocale
    .filter((obj) => {
      return obj.id.includes(stat);
    })
    .map((obj) => obj.name[currentLanguage]);

  return stats;
};
