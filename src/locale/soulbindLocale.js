export const soulbindLocale = [
  {
    name: {
      en: "Draven",
      fr: "",
      de: "",
      ru: "",
      ch: "",
    },
    id: "Draven",
  },
  {
    name: {
      en: "Dreamweaver",
      fr: "",
      de: "",
      ru: "",
      ch: "",
    },
    id: "Dreamweaver",
  },
  {
    name: {
      en: "Emeni",
      fr: "",
      de: "",
      ru: "",
      ch: "",
    },
    id: "Emeni",
  },
  {
    name: {
      en: "Heirmir",
      fr: "",
      de: "",
      ru: "",
      ch: "",
    },
    id: "Heirmir",
  },
  {
    name: {
      en: "Kleia",
      fr: "",
      de: "",
      ru: "",
      ch: "",
    },
    id: "Kleia",
  },
  {
    name: {
      en: "Korayn",
      fr: "",
      de: "",
      ru: "",
      ch: "",
    },
    id: "Korayn",
  },
  {
    name: {
      en: "Marileth",
      fr: "",
      de: "",
      ru: "",
      ch: "",
    },
    id: "Marileth",
  },
  {
    name: {
      en: "Mikanikos",
      fr: "",
      de: "",
      ru: "",
      ch: "",
    },
    id: "Mikanikos",
  },
  {
    name: {
      en: "Nadjia",
      fr: "",
      de: "",
      ru: "",
      ch: "",
    },
    id: "Nadjia",
  },
  {
    name: {
      en: "Niya",
      fr: "",
      de: "",
      ru: "",
      ch: "",
    },
    id: "Niya",
  },
  {
    name: {
      en: "Pelagos",
      fr: "",
      de: "",
      ru: "",
      ch: "",
    },
    id: "Pelagos",
  },
  {
    name: {
      en: "Theotar",
      fr: "",
      de: "",
      ru: "",
      ch: "",
    },
    id: "Theotar",
  },
];

export const getTranslatedSoulbind = (soulbind, currentLanguage) => {
  let name = soulbindLocale
    .filter((obj) => {
      return obj.id === soulbind;
    })
    .map((obj) => obj.name[currentLanguage]);

  return name;
};
