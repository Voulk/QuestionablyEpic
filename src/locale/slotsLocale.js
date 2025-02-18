export const slotNameLocale = [
  {
    name: {
      en: "Cape",
      fr: "Dos",
      de: "Rücken",
      ru: "Спина",
      ch: "",
    },
    id: "back",
  },
  {
    name: {
      en: "Chest",
      fr: "Torse",
      de: "Brust",
      ru: "Грудь",
      ch: "",
    },
    id: "chest",
  },
  {
    name: {
      en: "Boots",
      fr: "Pieds",
      de: "Füße",
      ru: "Ступни",
      ch: "",
    },
    id: "feet",
  },
  {
    name: {
      en: "Ring",
      fr: "Doigt",
      de: "Finger",
      ru: "Палец",
      ch: "",
    },
    id: "finger",
  },
  {
    name: {
      en: "Gloves",
      fr: "Mains",
      de: "Hände",
      ru: "Кисти рук",
      ch: "",
    },
    id: "hands",
  },
  {
    name: {
      en: "Helm",
      fr: "Tête",
      de: "Kopf",
      ru: "Голова",
      ch: "头部",
    },
    id: "head",
  },
  {
    name: {
      en: "Legs",
      fr: "Jambes",
      de: "Beine",
      ru: "Ноги",
      ch: "",
    },
    id: "legs",
  },
  {
    name: {
      en: "Weapons",
      fr: "Armes",
      de: "Waffen",
      ru: "Оружие",
      ch: "",
    },
    id: "mainHands",
  },
  {
    name: {
      en: "Neck",
      fr: "Cou",
      de: "Hals",
      ru: "Шея",
      ch: "",
    },
    id: "neck",
  },
  {
    name: {
      en: "Off-Hands",
      fr: "Lié quand ramassé",
      de: "Schildhand",
      ru: "Левая рука",
      ch: "",
    },
    id: "offhands",
  },
  {
    name: {
      en: "Offhand",
      fr: "Lié quand ramassé",
      de: "Schildhand",
      ru: "Левая рука",
      ch: "",
    },
    id: "offhand",
  },
  {
    name: {
      en: "Relics & Wands",
      fr: "Relique",
      de: "Relikt",
      ru: "Реликвия",
      ch: "圣物",
    },
    id: "relics",
  },
  {
    name: {
      en: "Shoulders",
      fr: "Épaule",
      de: "Schulter",
      ru: "Плечо",
      ch: "肩部",
    },
    id: "shoulder",
  },
  {
    name: {
      en: "Trinkets",
      fr: "Bijou",
      de: "Schmuck",
      ru: "Аксессуар",
      ch: "",
    },
    id: "trinket",
  },
  {
    name: {
      en: "Belt",
      fr: "Taille",
      de: "Taille",
      ru: "Пояс",
      ch: "腰部",
    },
    id: "waist",
  },
  {
    name: {
      en: "Weapon Combos",
      fr: "Combos d'armes",
      de: "Waffenkombinationen",
      ru: "Наборы оружия",
      ch: "",
    },
    id: "weaponCombos",
  },
  {
    name: {
      en: "Weapons",
      fr: "Main Gauche",
      de: "Waffen",
      ru: "Оружие",
      ch: "",
    },
    id: "weapons",
  },
  {
    name: {
      en: "Bracers",
      fr: "Poignets",
      de: "Handgelenk",
      ru: "Запястья",
      ch: "",
    },
    id: "wrists",
  },
  {
    name: {
      en: "Bracers",
      fr: "Poignets",
      de: "Handgelenk",
      ru: "Запястья",
      ch: "",
    },
    id: "wrist",
  },
  {
    name: {
      en: "1h Weapon",
      fr: "",
      de: "",
      ru: "",
      ch: "",
    },
    id: "1h weapon",
  },
  {
    name: {
      en: "2h Weapon",
      fr: "",
      de: "",
      ru: "",
      ch: "",
    },
    id: "2h weapon",
  },
];

export const getTranslatedSlotName = (slot, currentLanguage) => {
  let name = slotNameLocale
    .filter((obj) => {
      return obj.id === slot.toLowerCase();
    })
    .map((obj) => obj.name[currentLanguage]);

  return name;
};
