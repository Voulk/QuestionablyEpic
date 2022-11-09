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
    id: ["HolyPaladin", "Holy Paladin", "Holy Paladin Classic"],
    color: "#F58CBA",
    icon: require("Images/Classes/Paladin/Specialisation/Holy/Icons/HolyPaladin.jpg").default,
    cooldownPlannerMenu: true,
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
    id: ["DisciplinePriest", "Discipline Priest"],
    cooldownPlannerMenu: true,
    color: "#FFFFFF",
    icon: require("Images/Classes/Priest/Specialisation/Discipline/Icons/DisciplinePriest.jpg").default,
  },
  /* ---------------------------------------------------------------------------------------------- */
  /*                                              Druid                                             */
  /* ---------------------------------------------------------------------------------------------- */
  {
    name: {
      en: "Preservation Evoker",
      fr: "",
      de: "",
      ru: "",
      ch: "",
    },
    id: ["PreservationEvoker", "Preservation Evoker"],
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
    id: ["RestorationDruid", "Restoration Druid", "Restoration Druid Classic"],
    cooldownPlannerMenu: true,
    color: "#FF7D0A",
    icon: require("Images/Classes/Druid/Specialisation/Restoration/Icons/RestorationDruid.jpg").default,
  },
  {
    name: {
      en: "Druid",
      fr: "",
      de: "",
      ru: "",
      ch: "德鲁伊",
    },
    id: ["Druid"],
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
    id: ["HavocDemonHunter", "HavocDemon Hunter"],
    cooldownPlannerMenu: true,
    color: "#A330C9",
    icon: require("Images/Classes/DemonHunter/DemonHunterIcon.jpg").default,
  },
  {
    name: {
      en: "Warrior",
      fr: "",
      de: "Krieger",
      ru: "Воин",
      ch: "",
    },
    id: ["Warrior"],
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
    id: ["HolyPriest", "Holy Priest", "Holy Priest Classic"],
    cooldownPlannerMenu: true,
    color: "#FFFFFF",
    icon: require("Images/Classes/Priest/Specialisation/Holy/Icons/HolyPriest.jpg").default,
  },
  {
    name: {
      en: "Mistweaver Monk",
      fr: "",
      de: "Nebelwirker Mönch",
      ru: "Монах Ткач Туманов",
      ch: "",
    },
    id: ["MistweaverMonk", "Mistweaver Monk"],
    cooldownPlannerMenu: true,
    color: "#00FF96",
    icon: require("Images/Classes/Monk/Specialisation/Mistweaver/Icons/MistWeaverMonk.jpg").default,
  },
  {
    name: {
      en: "Restoration Shaman",
      fr: "",
      de: "Wiederherstellung Schamane",
      ru: "Шаман Исцеления",
      ch: "",
    },
    id: ["RestorationShaman", "Restoration Shaman", "Restoration Shaman Classic"],
    cooldownPlannerMenu: true,
    color: "#0070DE",
    icon: require("Images/Classes/Shaman/Specialisation/Restoration/Icons/RestorationShaman.jpg").default,
  },
  {
    name: {
      en: "Death Knight",
      fr: "",
      de: "Todesritter",
      ru: "Рыцарь смерти",
      ch: "",
    },
    id: ["DeathKnight", "Death Knight"],
    cooldownPlannerMenu: true,
    color: "#C41E3A",
    icon: require("Images/Classes/DeathKnight/DeathKnightIcon.jpg").default,
  },
  {
    name: {
      en: "Shadow Priest",
      fr: "",
      de: "",
      ru: "Жрец Тьмы",
      ch: "",
    },
    id: ["ShadowPriest", "Shadow Priest"],
    cooldownPlannerMenu: true,
    color: "#FFFFFF",
    icon: require("Images/Classes/Priest/Specialisation/Shadow/ShadowPriest.jpg").default,
  },
];

export const getTranslatedClassName = (className, currentLanguage) => {
  let name = classNameDB
    .filter((obj) => {
      return obj.id.includes(className);
    })
    .map((obj) => obj.name[currentLanguage]);

  return name;
};
export const getClassColour = (className) => {
  let name = classNameDB
    .filter((obj) => {
      return obj.id.includes(className);
    })
    .map((obj) => obj.color);

  return name;
};
export const getClassIcon = (className) => {
  let icon = classNameDB
    .filter((obj) => {
      return obj.id.includes(className);
    })
    .map((obj) => obj.icon);

  return icon;
};
