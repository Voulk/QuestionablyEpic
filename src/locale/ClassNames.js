import { useTranslation } from "react-i18next";
// This can be cleaned up

export const classNameDB = [
  /* ---------------------------------------------------------------------------------------------- */
  /*                                             Paladin                                            */
  /* ---------------------------------------------------------------------------------------------- */
  {
    name: {
      en: "Holy Paladin",
      fr: "",
      de: "Heilig Paladin",
      ru: "Паладин Света",
      ch: "",
    },
    id: "HolyPaladin",
    color: "#F58CBA",
    icon: require("Images/Classes/Paladin/Specialisation/Holy/Icons/HolyPaladin.jpg").default,
    cooldownPlannerMenu: true,
  },
  {
    name: {
      en: "Holy Paladin",
      fr: "",
      de: "Heilig Paladin",
      ru: "Паладин Света",
      ch: "",
    },
    id: "Holy Paladin",
    color: "#F58CBA",
  },
  {
    name: {
      en: "Holy Paladin",
      fr: "",
      de: "Heilig Paladin",
      ru: "Паладин Света",
      ch: "",
    },
    id: "Holy Paladin BC",
    color: "#F58CBA",
  },
  /* ---------------------------------------------------------------------------------------------- */
  /*                                             Priest                                             */
  /* ---------------------------------------------------------------------------------------------- */
  {
    name: {
      en: "Discipline Priest",
      fr: "",
      de: "Disziplin Priester",
      ru: "Жрец Послушания",
      ch: "",
    },
    id: "DisciplinePriest",
    cooldownPlannerMenu: true,
    color: "#FFFFFF",
    icon: require("Images/Classes/Priest/Specialisation/Discipline/Icons/DisciplinePriest.jpg").default,
  },
  {
    name: {
      en: "Discipline Priest",
      fr: "",
      de: "Disziplin Priester",
      ru: "Жрец Послушания",
      ch: "",
    },
    id: "Discipline Priest",
  },
  /* ---------------------------------------------------------------------------------------------- */
  /*                                              Druid                                             */
  /* ---------------------------------------------------------------------------------------------- */
  {
    name: {
      en: "Restoration Druid",
      fr: "",
      de: "Wiederherstellung Druide",
      ru: "Друид Исцеления",
      ch: "",
    },
    id: "RestorationDruid",
    cooldownPlannerMenu: true,
    color: "#FF7D0A",
    icon: require("Images/Classes/Druid/Specialisation/Restoration/Icons/RestorationDruid.jpg").default,
  },
  {
    name: {
      en: "Restoration Druid",
      fr: "",
      de: "Wiederherstellung Druide",
      ru: "Друид Исцеления",
      ch: "",
    },
    id: "Restoration Druid",
  },
  {
    name: {
      en: "Restoration Druid",
      fr: "",
      de: "Wiederherstellung Druide",
      ru: "Друид Исцеления",
      ch: "",
    },
    id: "Restoration Druid BC",
  },
  {
    name: {
      en: "Druid",
      fr: "",
      de: "",
      ru: "",
      ch: "德鲁伊",
    },
    id: "Druid",
    cooldownPlannerMenu: true,
    color: "#FF7D0A",
    icon: require("Images/Classes/Druid/classicon_druid.jpg").default,
  },
  {
    name: {
      en: "Havoc Demon Hunter",
      fr: "",
      de: "Verwüstung Dämonenjäger",
      ru: "Охотник на демонов Истребления",
      ch: "",
    },
    id: "HavocDemonHunter",
    cooldownPlannerMenu: true,
    color: "#A330C9",
    icon: require("Images/Classes/DemonHunter/DemonHunterIcon.jpg").default,
  },
  {
    name: {
      en: "Havoc Demon Hunter",
      fr: "",
      de: "Verwüstung Dämonenjäger",
      ru: "Охотник на демонов Истребления",
      ch: "",
    },
    id: "HavocDemon Hunter",
  },
  {
    name: {
      en: "Warrior",
      fr: "",
      de: "Krieger",
      ru: "Воин",
      ch: "",
    },
    id: "Warrior",
    cooldownPlannerMenu: true,
    color: "#C79C6E",
    icon: require("Images/Classes/Warrior/WarriorIcon.jpg").default,
  },
  {
    name: {
      en: "Holy Priest",
      fr: "",
      de: "Heilig Priester",
      ru: "Жрец Света",
      ch: "",
    },
    id: "HolyPriest",
    cooldownPlannerMenu: true,
    color: "#FFFFFF",
    icon: require("Images/Classes/Priest/Specialisation/Holy/Icons/HolyPriest.jpg").default,
  },
  {
    name: {
      en: "Holy Priest",
      fr: "",
      de: "Heilig Priester",
      ru: "Жрец Света",
      ch: "",
    },
    id: "Holy Priest",
  },
  {
    name: {
      en: "Holy Priest",
      fr: "",
      de: "Heilig Priester",
      ru: "Жрец Света",
      ch: "",
    },
    id: "Holy Priest BC",
  },

  {
    name: {
      en: "Mistweaver Monk",
      fr: "",
      de: "Nebelwirker Mönch",
      ru: "Монах Ткач Туманов",
      ch: "",
    },
    id: "MistweaverMonk",
    cooldownPlannerMenu: true,
    color: "#00FF96",
    icon: require("Images/Classes/Monk/Specialisation/Mistweaver/Icons/MistWeaverMonk.jpg").default,
  },
  {
    name: {
      en: "Mistweaver Monk",
      fr: "",
      de: "Nebelwirker Mönch",
      ru: "Монах Ткач Туманов",
      ch: "",
    },
    id: "Mistweaver Monk",
  },
  {
    name: {
      en: "Restoration Shaman",
      fr: "",
      de: "Wiederherstellung Schamane",
      ru: "Шаман Исцеления",
      ch: "",
    },
    id: "RestorationShaman",
    cooldownPlannerMenu: true,
    color: "#0070DE",
    icon: require("Images/Classes/Shaman/Specialisation/Restoration/Icons/RestorationShaman.jpg").default,
  },
  {
    name: {
      en: "Restoration Shaman",
      fr: "",
      de: "Wiederherstellung Schamane",
      ru: "Шаман Исцеления",
      ch: "",
    },
    id: "Restoration Shaman",
  },
  {
    name: {
      en: "Restoration Shaman",
      fr: "",
      de: "Wiederherstellung Schamane",
      ru: "Шаман Исцеления",
      ch: "",
    },
    id: "Restoration Shaman BC",
  },

  {
    name: {
      en: "Death Knight",
      fr: "",
      de: "Todesritter",
      ru: "Рыцарь смерти",
      ch: "",
    },
    id: "DeathKnight",
    cooldownPlannerMenu: true,
    color: "#C41E3A",
    icon: require("Images/Classes/DeathKnight/DeathKnightIcon.jpg").default,
  },
  {
    name: {
      en: "Death Knight",
      fr: "",
      de: "",
      ru: "Рыцарь смерти",
      ch: "",
    },
    id: "Death Knight",
  },
  {
    name: {
      en: "Shadow Priest",
      fr: "",
      de: "",
      ru: "Жрец Тьмы",
      ch: "",
    },
    id: "ShadowPriest",
    cooldownPlannerMenu: true,
    color: "#FFFFFF",
    icon: require("Images/Classes/Priest/Specialisation/Shadow/ShadowPriest.jpg").default,
  },
  {
    name: {
      en: "Shadow Priest",
      fr: "",
      de: "Schattenpriester",
      ru: "Жрец Тьмы",
      ch: "",
    },
    id: "Shadow Priest",
  },
];

export const getTranslatedClassName = (className) => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  let name = classNameDB
    .filter((obj) => {
      return obj.id === className;
    })
    .map((obj) => obj.name[currentLanguage]);

  return name;
};
export const getClassColour = (className) => {
  let name = classNameDB
    .filter((obj) => {
      return obj.id === className;
    })
    .map((obj) => obj.color);

  return name;
};
export const getClassIcon = (className) => {
  let icon = classNameDB
    .filter((obj) => {
      return obj.id === className;
    })
    .map((obj) => obj.icon);

  return icon;
};
