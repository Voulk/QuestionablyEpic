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
    icon: require("Images/Classes/Paladin/Specialisation/Holy/Icons/HolyPaladin.jpg"),
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
    id: ["DisciplinePriest", "Discipline Priest", "Discipline Priest Classic"],
    cooldownPlannerMenu: true,
    color: "#FFFFFF",
    icon: require("Images/Classes/Priest/Specialisation/Discipline/Icons/DisciplinePriest.jpg"),
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
    icon: require("Images/Classes/Druid/Specialisation/Restoration/Icons/RestorationDruid.jpg"),
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
    icon: require("Images/Classes/Evoker/classicon_evoker_preservation.jpg"),
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
    icon: require("Images/Classes/Evoker/classicon_evoker_devastation.jpg"),
  },
  {
    name: {
      en: "Augmentation Evoker",
      fr: "Augmentation Evoker",
      de: "Augmentation Evoker",
      ru: "Augmentation Evoker",
      ch: "Augmentation Evoker",
    },
    id: ["AugmentationEvoker", "Augmentation Evoker"],
    cooldownPlannerMenu: true,
    color: "#33937F",
    icon: require("Images/Classes/Evoker/classicon_evoker_augmentation.jpg"),
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
    icon: require("Images/Classes/Druid/classicon_druid.jpg"),
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
    icon: require("Images/Classes/DemonHunter/DemonHunterIcon.jpg"),
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
    icon: require("Images/Classes/Warrior/WarriorIcon.jpg"),
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
    icon: require("Images/Classes/Priest/Specialisation/Holy/Icons/HolyPriest.jpg"),
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
    icon: require("Images/Classes/Monk/Specialisation/Mistweaver/Icons/MistWeaverMonk.jpg"),
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
    icon: require("Images/Classes/Shaman/Specialisation/Restoration/Icons/RestorationShaman.jpg"),
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
    icon: require("Images/Classes/Shaman/Icons/class_shaman.jpg"),
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
    icon: require("Images/Classes/DeathKnight/DeathKnightIcon.jpg"),
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
    icon: require("Images/Classes/Priest/Specialisation/Shadow/ShadowPriest.jpg"),
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

export const cdPlannerclassDB = [
  /* ---------------------------------------------------------------------------------------------- */
  /*                                             Paladin                                            */
  /* ---------------------------------------------------------------------------------------------- */
  {
    name: {
      en: "Paladin",
      fr: "Paladin",
      de: "Paladin",
      ru: "Паладин",
      ch: "",
    },
    id: ["Paladin", "paladin"],
    color: "#F58CBA",
    icon: require("Images/Classes/Paladin/classicon_paladin.jpg"),
  },
  /* ---------------------------------------------------------------------------------------------- */
  /*                                             Priest                                             */
  /* ---------------------------------------------------------------------------------------------- */
  {
    name: {
      en: "Priest",
      fr: "Prêtre",
      de: "Priester",
      ru: "Жрец",
      ch: "",
    },
    id: ["Priest", "priest"],
    cooldownPlannerMenu: true,
    color: "#FFFFFF",
    icon: require("Images/Classes/Priest/classicon_priest.jpg"),
  },
  /* ---------------------------------------------------------------------------------------------- */
  /*                                              Druid                                             */
  /* ---------------------------------------------------------------------------------------------- */

  {
    name: {
      en: "Druid",
      fr: "Druide",
      de: "Druide",
      ru: "Друид",
      ch: "德鲁伊",
    },
    id: ["Druid", "druid"],
    cooldownPlannerMenu: true,
    color: "#FF7D0A",
    icon: require("Images/Classes/Druid/classicon_druid.jpg"),
  },
  {
    name: {
      en: "Evoker",
      fr: "Évocateur",
      de: "Rufer",
      ru: "Пробудитель",
      ch: "唤魔师",
    },
    id: ["Evoker", "evoker"],
    cooldownPlannerMenu: true,
    color: "#33937F",
    icon: require("Images/Classes/Evoker/classicon_evoker.jpg"),
  },
  {
    name: {
      en: "Demon Hunter",
      fr: "Chasseur de démons",
      de: "Dämonenjäger",
      ru: "Охотник на демонов",
      ch: "恶魔猎手",
    },
    id: ["DemonHunter", "demonHunter", "demonhunter"],
    cooldownPlannerMenu: true,
    color: "#A330C9",
    icon: require("Images/Classes/DemonHunter/DemonHunterIcon.jpg"),
  },
  {
    name: {
      en: "Warrior",
      fr: "Guerrier",
      de: "Krieger",
      ru: "Воин",
      ch: "战士",
    },
    id: ["Warrior", "warrior"],
    cooldownPlannerMenu: true,
    color: "#C79C6E",
    icon: require("Images/Classes/Warrior/WarriorIcon.jpg"),
  },
  {
    name: {
      en: "Monk",
      fr: "Moine",
      de: "Mönch",
      ru: "Монах",
      ch: "武僧",
    },
    id: ["Monk", "monk"],
    cooldownPlannerMenu: true,
    color: "#00FF96",
    icon: require("Images/Classes/Monk/classicon_monk.jpg"),
  },
  {
    name: {
      en: "Shaman",
      fr: "Chaman",
      de: "Schamane",
      ru: "Шаман",
      ch: "萨满",
    },
    id: ["Shaman", "shaman"],
    cooldownPlannerMenu: true,
    color: "#0070DE",
    icon: require("Images/Classes/Shaman/Icons/class_shaman.jpg"),
  },

  {
    name: {
      en: "Death Knight",
      fr: "Chevalier de la mort",
      de: "Todesritter",
      ru: "Рыцарь смерти",
      ch: "死亡骑士",
    },
    id: ["DeathKnight", "deathknight"],
    cooldownPlannerMenu: true,
    color: "#C41E3A",
    icon: require("Images/Classes/DeathKnight/DeathKnightIcon.jpg"),
  },

  {
    name: {
      en: "Rogue",
      fr: "Voleur",
      de: "Schurke",
      ru: "Разбойник",
      ch: "潜行者",
    },
    id: ["Rogue", "rogue"],
    cooldownPlannerMenu: false,
    color: "#FFF468",
    icon: require("Images/Classes/Rogue/Icons/RogueIcon.jpg"),
  },

  {
    name: {
      en: "Warlock",
      fr: "Démoniste",
      de: "Hexenmeister",
      ru: "Чернокнижник",
      ch: "术士",
    },
    id: ["Warlock", "warlock"],
    cooldownPlannerMenu: false,
    color: "#8788EE",
    icon: require("Images/Classes/Warlock/Icons/WarlockIcon.jpg"),
  },

  {
    name: {
      en: "Hunter",
      fr: "Chasseur",
      de: "Jäger",
      ru: "Охотник",
      ch: "猎人",
    },
    id: ["Hunter", "hunter"],
    cooldownPlannerMenu: false,
    color: "#AAD372",
    icon: require("Images/Classes/Hunter/Icons/HunterIcon.jpg"),
  },

  {
    name: {
      en: "Mage",
      fr: "Mage",
      de: "Magier",
      ru: "Маг",
      ch: "法师",
    },
    id: ["Mage", "mage"],
    cooldownPlannerMenu: false,
    color: "#3FC7EB",
    icon: require("Images/Classes/Mage/Icons/MageIcon.jpg"),
  },
];

export const getTranslatedClassNameCD = (className, currentLanguage) => {
  let name = cdPlannerclassDB
    .filter((obj) => {
      return obj.id.includes(className);
    })
    .map((obj) => obj.name[currentLanguage]);
  return name;
};
export const getClassColourCD = (className) => {
  let name = cdPlannerclassDB
    .filter((obj) => {
      return obj.id.includes(className);
    })
    .map((obj) => obj.color);

  return name;
};
export const getClassIconCD = (className) => {
  let icon = cdPlannerclassDB
    .filter((obj) => {
      return obj.id.includes(className);
    })
    .map((obj) => obj.icon);

  return icon;
};

export const cdPlannerSpecDB = [
  /* ---------------------------------------------------------------------------------------------- */
  /*                                             Paladin                                            */
  /* ---------------------------------------------------------------------------------------------- */
  {
    name: {
      en: "Holy",
      fr: "Sacré",
      de: "Heilig",
      ru: "Свет",
      ch: "神圣",
    },
    id: ["holy paladin"],
    color: "#F58CBA",
    icon: require("Images/Classes/Paladin/Specialisation/spell_holy_holybolt.jpg"),
  },
  {
    name: {
      en: "Protection",
      fr: "Protection",
      de: "Schutz",
      ru: "Защита",
      ch: "防护",
    },
    id: ["protection paladin"],
    color: "#F58CBA",
    icon: require("Images/Classes/Paladin/Specialisation/ability_paladin_shieldofthetemplar.jpg"),
  },
  {
    name: {
      en: "Retribution",
      fr: "Vindicte",
      de: "Vergeltung",
      ru: "Воздаяние",
      ch: "惩戒",
    },
    id: ["retribution paladin"],
    color: "#F58CBA",
    icon: require("Images/Classes/Paladin/Specialisation/paladin_retribution.jpg"),
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                             Priest                                             */
  /* ---------------------------------------------------------------------------------------------- */
  {
    name: {
      en: "Holy",
      fr: "Sacré",
      de: "Heilig",
      ru: "Свет",
      ch: "神圣",
    },
    id: ["holy priest"],
    color: "#FFFFFF",
    icon: require("Images/Classes/Priest/Specialisation/spell_holy_guardianspirit.jpg"),
  },
  {
    name: {
      en: "Shadow",
      fr: "Ombre",
      de: "Schatten",
      ru: "Тьма",
      ch: "暗影",
    },
    id: ["shadow priest"],
    color: "#FFFFFF",
    icon: require("Images/Classes/Priest/Specialisation/spell_shadow_demonicfortitude.jpg"),
  },
  {
    name: {
      en: "Discipline",
      fr: "Discipline",
      de: "Disziplin",
      ru: "Послушание",
      ch: "戒律",
    },
    id: ["discipline priest", "discipline priest classic"],
    color: "#FFFFFF",
    icon: require("Images/Classes/Priest/Specialisation/spell_holy_powerwordshield.jpg"),
  },
  /* ---------------------------------------------------------------------------------------------- */
  /*                                              Druid                                             */
  /* ---------------------------------------------------------------------------------------------- */

  {
    name: {
      en: "Balance",
      fr: "Équilibre",
      de: "Gleichgewicht",
      ru: "Баланс",
      ch: "平衡",
    },
    id: ["balance druid"],
    color: "#FF7D0A",
    icon: require("Images/Classes/Druid/Specialisation/spell_nature_starfall.jpg"),
  },
  {
    name: {
      en: "Feral",
      fr: "Farouche",
      de: "Wildheit",
      ru: "Сила зверя",
      ch: "野性",
    },
    id: ["feral druid"],
    color: "#FF7D0A",
    icon: require("Images/Classes/Druid/Specialisation/ability_druid_catform.jpg"),
  },
  {
    name: {
      en: "Guardian",
      fr: "Gardien",
      de: "Wächter",
      ru: "Страж",
      ch: "守护",
    },
    id: ["guardian druid"],
    color: "#FF7D0A",
    icon: require("Images/Classes/Druid/Specialisation/ability_racial_bearform.jpg"),
  },
  {
    name: {
      en: "Restoration",
      fr: "Restauration",
      de: "Wiederherstellung",
      ru: "Исцеление",
      ch: "恢复",
    },
    id: ["restoration druid"],
    color: "#FF7D0A",
    icon: require("Images/Classes/Druid/Specialisation/spell_nature_healingtouch.jpg"),
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                             Evoker                                             */
  /* ---------------------------------------------------------------------------------------------- */
  {
    name: {
      en: "Devastation",
      fr: "Dévastation",
      de: "Verheerung",
      ru: "Опустошитель",
      ch: "湮灭",
    },
    id: ["Devastation", "devastation evoker"],
    color: "#33937F",
    icon: require("Images/Classes/Evoker/classicon_evoker_devastation.jpg"),
  },
  {
    name: {
      en: "Preservation",
      fr: "Préservation",
      de: "Bewahrung",
      ru: "Хранитель",
      ch: "恩护",
    },
    id: ["Preservation", "preservation evoker"],
    color: "#33937F",
    icon: require("Images/Classes/Evoker/classicon_evoker_preservation.jpg"),
  },
  {
    name: {
      en: "Augmentation",
      fr: "Augmentation",
      de: "Augmentation",
      ru: "Augmentation",
      ch: "Augmentation",
    },
    id: ["Augmenation Evoker", "augmentation evoker"],
    color: "#33937F",
    icon: require("Images/Classes/Evoker/classicon_evoker_augmentation.jpg"),
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                          Demon Hunter                                          */
  /* ---------------------------------------------------------------------------------------------- */
  {
    name: {
      en: "Havoc",
      fr: "Dévastation",
      de: "Verwüstung",
      ru: "Истребление",
      ch: "浩劫",
    },
    id: ["havoc demonhunter"],
    color: "#A330C9",
    icon: require("Images/Classes/DemonHunter/ability_demonhunter_specdps.jpg"),
  },
  {
    name: {
      en: "Vengeance",
      fr: "Vengeance",
      de: "Rachsucht",
      ru: "Месть",
      ch: "复仇",
    },
    id: ["vengeance demonhunter"],
    color: "#A330C9",
    icon: require("Images/Classes/DemonHunter/ability_demonhunter_spectank.jpg"),
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                             Warrior                                            */
  /* ---------------------------------------------------------------------------------------------- */
  {
    name: {
      en: "Arms",
      fr: "Armes",
      de: "Waffen",
      ru: "Оружие",
      ch: "武器",
    },
    id: ["arms warrior"],
    color: "#C79C6E",
    icon: require("Images/Classes/Warrior/ability_warrior_savageblow.jpg"),
  },

  {
    name: {
      en: "Fury",
      fr: "Fureur",
      de: "Furor",
      ru: "Неистовство",
      ch: "狂怒",
    },
    id: ["fury warrior"],
    color: "#C79C6E",
    icon: require("Images/Classes/Warrior/ability_warrior_innerrage.jpg"),
  },
  {
    name: {
      en: "Protection",
      fr: "Protection",
      de: "Schutz",
      ru: "Защита",
      ch: "防护",
    },
    id: ["protection warrior"],
    color: "#C79C6E",
    icon: require("Images/Classes/Warrior/ability_warrior_defensivestance.jpg"),
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                              Monk                                              */
  /* ---------------------------------------------------------------------------------------------- */
  {
    name: {
      en: "Mistweaver",
      fr: "Tisse-brume",
      de: "Nebelwirker",
      ru: "Ткач туманов",
      ch: "织雾",
    },
    id: ["mistweaver monk"],
    color: "#00FF96",
    icon: require("Images/Classes/Monk/Specialisation/spell_monk_mistweaver_spec.jpg"),
  },
  {
    name: {
      en: "Brewmaster",
      fr: "Maître brasseur",
      de: "Braumeister",
      ru: "Хмелевар",
      ch: "酒仙",
    },
    id: ["brewmaster monk"],
    color: "#00FF96",
    icon: require("Images/Classes/Monk/Specialisation/spell_monk_brewmaster_spec.jpg"),
  },
  {
    name: {
      en: "Windwalker",
      fr: "Marche-vent",
      de: "Windläufer",
      ru: "Танцующий с ветром",
      ch: "踏风",
    },
    id: ["windwalker monk"],
    color: "#00FF96",
    icon: require("Images/Classes/Monk/Specialisation/spell_monk_windwalker_spec.jpg"),
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                             Shaman                                             */
  /* ---------------------------------------------------------------------------------------------- */
  {
    name: {
      en: "Elemental",
      fr: "Élémentaire",
      de: "Elementar",
      ru: "Стихии",
      ch: "恢复",
    },
    id: ["elemental shaman"],
    color: "#0070DE",
    icon: require("Images/Classes/Shaman/Specialisation/spell_nature_lightning.jpg"),
  },
  {
    name: {
      en: "Enhancement",
      fr: "Amélioration",
      de: "Verstärkung",
      ru: "Совершенствование",
      ch: "增强",
    },
    id: ["enhancement shaman"],
    color: "#0070DE",
    icon: require("Images/Classes/Shaman/Specialisation/spell_shaman_improvedstormstrike.jpg"),
  },
  {
    name: {
      en: "Restoration",
      fr: "Restauration",
      de: "Wiederherstellung",
      ru: "Исцеление",
      ch: "恢复",
    },
    id: ["restoration shaman"],
    color: "#0070DE",
    icon: require("Images/Classes/Shaman/Specialisation/spell_nature_magicimmunity.jpg"),
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                          Death Knight                                          */
  /* ---------------------------------------------------------------------------------------------- */
  {
    name: {
      en: "Blood",
      fr: "Sang",
      de: "Blut",
      ru: "Кровь",
      ch: "鲜血",
    },
    id: ["blood deathknight"],
    color: "#C41E3A deathknight",
    icon: require("Images/Classes/DeathKnight/spell_deathknight_bloodpresence.jpg"),
  },
  {
    name: {
      en: "Frost",
      fr: "Givre",
      de: "Frost",
      ru: "Лед",
      ch: "冰霜",
    },
    id: ["frost deathknight"],
    color: "#C41E3A",
    icon: require("Images/Classes/DeathKnight/spell_deathknight_frostpresence.jpg"),
  },
  {
    name: {
      en: "Unholy",
      fr: "Impie",
      de: "Unheilig",
      ru: "Нечестивость",
      ch: "邪恶",
    },
    id: ["unholy deathknight"],
    color: "#C41E3A",
    icon: require("Images/Classes/DeathKnight/spell_deathknight_unholypresence.jpg"),
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                              Rogue                                             */
  /* ---------------------------------------------------------------------------------------------- */
  {
    name: {
      en: "Assassination",
      fr: "Assassinat",
      de: "Meucheln",
      ru: "Ликвидация",
      ch: "奇袭",
    },
    id: ["assassination rogue"],
    color: "#FFF468",
    icon: require("Images/Classes/Rogue/Icons/ability_rogue_deadlybrew.jpg"),
  },
  {
    name: {
      en: "Outlaw",
      fr: "Hors-la-loi",
      de: "Gesetzlosigkeit",
      ru: "Головорез",
      ch: "狂徒",
    },
    id: ["outlaw rogue"],
    color: "#FFF468",
    icon: require("Images/Classes/Rogue/Icons/ability_rogue_waylay.jpg"),
  },
  {
    name: {
      en: "Subtlety",
      fr: "Finesse",
      de: "Täuschung",
      ru: "Скрытность",
      ch: "敏锐",
    },
    id: ["subtlety rogue"],
    color: "#FFF468",
    icon: require("Images/Classes/Rogue/Icons/ability_stealth.jpg"),
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                             Warlock                                            */
  /* ---------------------------------------------------------------------------------------------- */
  {
    name: {
      en: "Affliction",
      fr: "Affliction",
      de: "Gebrechen",
      ru: "Колдовство",
      ch: "痛苦",
    },
    id: ["affliction warlock"],
    color: "#8788EE",
    icon: require("Images/Classes/Warlock/Icons/spell_shadow_deathcoil.jpg"),
  },
  {
    name: {
      en: "Demonology",
      fr: "Démonologie",
      de: "Dämonologie",
      ru: "Демонология",
      ch: "恶魔学识",
    },
    id: ["demonology warlock"],
    color: "#8788EE",
    icon: require("Images/Classes/Warlock/Icons/spell_shadow_metamorphosis.jpg"),
  },
  {
    name: {
      en: "Destruction",
      fr: "Destruction",
      de: "Zerstörung",
      ru: "Разрушение",
      ch: "毁灭",
    },
    id: ["destruction warlock"],
    color: "#8788EE",
    icon: require("Images/Classes/Warlock/Icons/spell_shadow_rainoffire.jpg"),
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                             Hunter                                             */
  /* ---------------------------------------------------------------------------------------------- */
  {
    name: {
      en: "Beast Mastery",
      fr: "Maîtrise des bêtes",
      de: "Tierherrschaft",
      ru: "Повелитель зверей",
      ch: "野兽控制",
    },
    id: ["beastmastery hunter"],
    color: "#AAD372",
    icon: require("Images/Classes/Hunter/Icons/ability_hunter_bestialdiscipline.jpg"),
  },
  {
    name: {
      en: "Marksmanship",
      fr: "Précision",
      de: "Treffsicherheit",
      ru: "Стрельба",
      ch: "射击",
    },
    id: ["marksmanship hunter"],
    color: "#AAD372",
    icon: require("Images/Classes/Hunter/Icons/ability_hunter_focusedaim.jpg"),
  },
  {
    name: {
      en: "Survival",
      fr: "Survie",
      de: "Überleben",
      ru: "Выживание",
      ch: "生存",
    },
    id: ["survival hunter"],
    color: "#AAD372",
    icon: require("Images/Classes/Hunter/Icons/ability_hunter_camouflage.jpg"),
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                              Mage                                              */
  /* ---------------------------------------------------------------------------------------------- */
  {
    name: {
      en: "Arcane",
      fr: "Arcanes",
      de: "Arkan",
      ru: "Тайная магия",
      ch: "奥术",
    },
    id: ["arcane mage"],
    color: "#3FC7EB",
    icon: require("Images/Classes/Mage/Icons/spell_holy_magicalsentry.jpg"),
  },
  {
    name: {
      en: "Fire",
      fr: "Feu",
      de: "Feuer",
      ru: "Огонь",
      ch: "火焰",
    },
    id: ["fire mage"],
    color: "#3FC7EB",
    icon: require("Images/Classes/Mage/Icons/spell_fire_firebolt02.jpg"),
  },
  {
    name: {
      en: "Frost",
      fr: "Givre",
      de: "Frost",
      ru: "Лед",
      ch: "冰霜",
    },
    id: ["frost mage"],
    color: "#3FC7EB",
    icon: require("Images/Classes/Mage/Icons/spell_frost_frostbolt02.jpg"),
  },
];

export const getTranslatedSpecNameCD = (specName, currentLanguage) => {
  let name = cdPlannerSpecDB
    .filter((obj) => {
      return obj.id.includes(specName);
    })
    .map((obj) => obj.name[currentLanguage]);
  return name;
};
export const getSpecColourCD = (specName) => {
  let name = cdPlannerSpecDB
    .filter((obj) => {
      return obj.id.includes(specName);
    })
    .map((obj) => obj.color);

  return name;
};
export const getSpecIconCD = (specName) => {
  let icon = cdPlannerSpecDB
    .filter((obj) => {
      return obj.id.includes(specName);
    })
    .map((obj) => obj.icon);

  return icon;
};
