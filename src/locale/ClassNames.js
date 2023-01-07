import { useTranslation } from "react-i18next";
// This can be cleaned up

export const classNameDB = [
  /* ---------------------------------------------------------------------------------------------- */
  /*                                             Paladin                                            */
  /* ---------------------------------------------------------------------------------------------- */
  {
    name: {
      en: "Holy Paladin",
      fr: "Holy Paladin",
      de: "Heilig Paladin",
      ru: "Паладин Света",
      ch: "Holy Paladin",
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
      fr: "Discipline Priest",
      de: "Disziplin Priester",
      ru: "Жрец Послушания",
      ch: "Discipline Priest",
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
      en: "Restoration Druid",
      fr: "Restoration Druid",
      de: "Wiederherstellung Druide",
      ru: "Друид Исцеления",
      ch: "Restoration Druid",
    },
    id: ["RestorationDruid", "Restoration Druid", "Restoration Druid Classic"],
    cooldownPlannerMenu: true,
    color: "#FF7D0A",
    icon: require("Images/Classes/Druid/Specialisation/Restoration/Icons/RestorationDruid.jpg").default,
  },
  {
    name: {
      en: "Preservation Evoker",
      fr: "Preservation Evoker",
      de: "Preservation Evoker",
      ru: "Preservation Evoker",
      ch: "Preservation Evoker",
    },
    id: ["PreservationEvoker", "Preservation Evoker"],
    cooldownPlannerMenu: true,
    color: "#33937F",
    icon: require("Images/Classes/Evoker/classicon_evoker_preservation.jpg").default,
  },
  {
    name: {
      en: "Devastation Evoker",
      fr: "Devastation Evoker",
      de: "Devastation Evoker",
      ru: "Devastation Evoker",
      ch: "Devastation Evoker",
    },
    id: ["DevastationEvoker", "Devastation Evoker"],
    cooldownPlannerMenu: true,
    color: "#33937F",
    icon: require("Images/Classes/Evoker/classicon_evoker_devastation.jpg").default,
  },
  {
    name: {
      en: "Druid",
      fr: "Druid",
      de: "Druid",
      ru: "Druid",
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
      fr: "Havoc Demon Hunter",
      de: "Verwüstung Dämonenjäger",
      ru: "Охотник на демонов Истребления",
      ch: "Havoc Demon Hunter",
    },
    id: ["HavocDemonHunter", "HavocDemon Hunter"],
    cooldownPlannerMenu: true,
    color: "#A330C9",
    icon: require("Images/Classes/DemonHunter/DemonHunterIcon.jpg").default,
  },
  {
    name: {
      en: "Warrior",
      fr: "Warrior",
      de: "Krieger",
      ru: "Воин",
      ch: "Warrior",
    },
    id: ["Warrior"],
    cooldownPlannerMenu: true,
    color: "#C79C6E",
    icon: require("Images/Classes/Warrior/WarriorIcon.jpg").default,
  },
  {
    name: {
      en: "Holy Priest",
      fr: "Holy Priest",
      de: "Heilig Priester",
      ru: "Жрец Света",
      ch: "Holy Priest",
    },
    id: ["HolyPriest", "Holy Priest", "Holy Priest Classic"],
    cooldownPlannerMenu: true,
    color: "#FFFFFF",
    icon: require("Images/Classes/Priest/Specialisation/Holy/Icons/HolyPriest.jpg").default,
  },
  {
    name: {
      en: "Mistweaver Monk",
      fr: "Mistweaver Monk",
      de: "Nebelwirker Mönch",
      ru: "Монах Ткач Туманов",
      ch: "Mistweaver Monk",
    },
    id: ["MistweaverMonk", "Mistweaver Monk"],
    cooldownPlannerMenu: true,
    color: "#00FF96",
    icon: require("Images/Classes/Monk/Specialisation/Mistweaver/Icons/MistWeaverMonk.jpg").default,
  },
  {
    name: {
      en: "Restoration Shaman",
      fr: "Restoration Shaman",
      de: "Wiederherstellung Schamane",
      ru: "Шаман Исцеления",
      ch: "Restoration Shaman",
    },
    id: ["RestorationShaman", "Restoration Shaman", "Restoration Shaman Classic"],
    cooldownPlannerMenu: true,
    color: "#0070DE",
    icon: require("Images/Classes/Shaman/Specialisation/Restoration/Icons/RestorationShaman.jpg").default,
  },
  {
    name: {
      en: "Shaman",
      fr: "Chaman",
      de: "Schamane",
      ru: "Шаман",
      ch: "萨满",
    },
    id: ["ShamanDPS"],
    cooldownPlannerMenu: true,
    color: "#0070DE",
    icon: require("Images/Classes/Shaman/Icons/class_shaman.jpg").default,
  },

  {
    name: {
      en: "Death Knight",
      fr: "Death Knight",
      de: "Todesritter",
      ru: "Рыцарь смерти",
      ch: "Death Knight",
    },
    id: ["DeathKnight", "Death Knight"],
    cooldownPlannerMenu: true,
    color: "#C41E3A",
    icon: require("Images/Classes/DeathKnight/DeathKnightIcon.jpg").default,
  },
  {
    name: {
      en: "Shadow Priest",
      fr: "Shadow Priest",
      de: "Shadow Priest",
      ru: "Жрец Тьмы",
      ch: "Shadow Priest",
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
