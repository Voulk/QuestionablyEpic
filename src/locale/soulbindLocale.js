export const soulbindLocale = [
  {
    name: {
      en: "Draven",
      fr: "Général Draven",
      de: "General Draven",
      ru: "Генерал Дрейвен",
      ch: "德莱文将军",
    },
    id: "Draven",
  },
  {
    name: {
      en: "Dreamweaver",
      fr: "Tisse-Rêves",
      de: "Traumweber",
      ru: "Творец Снов",
      ch: "织梦者",
    },
    id: "Dreamweaver",
  },
  {
    name: {
      en: "Emeni",
      fr: "Eméni",
      de: "Emeni",
      ru: "Эмени",
      ch: "艾米妮",
    },
    id: "Emeni",
  },
  {
    name: {
      en: "Heirmir",
      fr: "Forge-os Heirmir",
      de: "Knochenschmiedin Heirmir",
      ru: "Костоплав Гейрмир",
      ch: "骨匠海尔米尔",
    },
    id: "Heirmir",
  },
  {
    name: {
      en: "Kleia",
      fr: "Kléia",
      de: "Kleia",
      ru: "Клейя",
      ch: "克雷雅",
    },
    id: "Kleia",
  },
  {
    name: {
      en: "Korayn",
      fr: "Korayn",
      de: "Korayn",
      ru: "Корейн",
      ch: "柯莱恩",
    },
    id: "Korayn",
  },
  {
    name: {
      en: "Marileth",
      fr: "Marileth, catalyseur de peste",
      de: "Seuchenerfinder Marileth",
      ru: "Изобретатель чумы Марилет",
      ch: "魔药设计师马里莱斯",
    },
    id: "Marileth",
  },
  {
    name: {
      en: "Mikanikos",
      fr: "Premier forgelite Mikanikos",
      de: "Oberster Schmied Mikanikos",
      ru: "Верховный автоматург Миканикос",
      ch: "掌炉宗师米卡尼科斯",
    },
    id: "Mikanikos",
  },
  {
    name: {
      en: "Nadjia",
      fr: "Nadjia la Lame fantôme",
      de: "Nadjia Nebelklinge",
      ru: "Наджия, Клинок Туманов",
      ch: "娜德佳，迷雾之刃",
    },
    id: "Nadjia",
  },
  {
    name: {
      en: "Niya",
      fr: "Niya",
      de: "Niya",
      ru: "Ния",
      ch: "尼娅",
    },
    id: "Niya",
  },
  {
    name: {
      en: "Pelagos",
      fr: "Pélagos",
      de: "Pelagos",
      ru: "Пелагий",
      ch: "裴拉戈斯",
    },
    id: "Pelagos",
  },
  {
    name: {
      en: "Theotar",
      fr: "Théotar le duc fou",
      de: "Theotar, der Wahnsinnige Herzog",
      ru: "Безумный герцог Теотар",
      ch: "癫狂公爵西塔尔",
    },
    id: "Theotar",
  },
];

export const getTranslatedSoulbind = (soulbind, currentLanguage) => {
  let name = soulbindLocale
    .filter((obj) => {
      return obj.id === soulbind;
    })
    .map((obj) => obj.name[currentLanguage] ?? obj.name["en"]);

  return name;
};
