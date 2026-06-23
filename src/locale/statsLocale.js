export const statsLocale = [
  {
    name: {
      en: "Avoidance",
      fr: "Évitement",
      de: "",
      ru: "",
      ch: "",
    },
    id: ["Avoidance", "avoidance"],
  },
  {
    name: {
      en: "Crit",
      fr: "Coup critique",
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
      fr: "Ponction",
      de: "Lebensraub",
      ru: "Самоисцеление",
      ch: "",
    },
    id: ["Leech", "leech"],
  },
  {
    name: {
      en: "Mana",
      fr: "Mana",
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
      fr: "Polyvalence",
      de: "Vielseitigkeit",
      ru: "универсальность",
      ch: "",
    },
    id: ["Versatility", "versatility"],
  },
  {
    name: {
      en: "Stamina",
      fr: "Endurance",
      de: "",
      ru: "",
      ch: "",
    },
    id: ["Stamina", "stamina"],
  },
  {
    name: {
      en: "Armor",
      fr: "Armure",
      de: "",
      ru: "",
      ch: "",
    },
    id: ["Armor", "armor"],
  },
  {
    name: {
      en: "Absorb",
      fr: "Absorption",
      de: "",
      ru: "",
      ch: "",
    },
    id: ["Absorb", "absorb"],
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
