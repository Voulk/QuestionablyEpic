
interface ClassData {
  names: Record<SupportedLanguages, string>;
  color: string;
  icon: any; // 
}

const specData: Record<string, ClassData> = {
  "HolyPaladin": {
    names: { en: "Holy Paladin", fr: "Holy Paladin", de: "Heilig Paladin", ru: "Паладин Света", ch: "Holy Paladin" },
    color: "#F58CBA",
    icon: require("Images/Classes/Paladin/Specialisation/Holy/Icons/HolyPaladin.jpg"),
  },
  "DisciplinePriest": {
    names: { en: "Discipline Priest", fr: "Discipline Priest", de: "Disziplin Priester", ru: "Жрец Послушания", ch: "Discipline Priest" },
    color: "#FFFFFF",
    icon: require("Images/Classes/Priest/Specialisation/Discipline/Icons/DisciplinePriest.jpg"),
  },
  "RestorationDruid": {
    names: { en: "Restoration Druid", fr: "Restoration Druid", de: "Wiederherstellung Druide", ru: "Друид Исцеления", ch: "Restoration Druid" },
    color: "#FF7D0A",
    icon: require("Images/Classes/Druid/Specialisation/Restoration/Icons/RestorationDruid.jpg"),
  },
  "PreservationEvoker": {
    names: { en: "Preservation Evoker", fr: "Preservation Evoker", de: "Preservation Evoker", ru: "Preservation Evoker", ch: "Preservation Evoker" },
    color: "#33937F",
    icon: require("Images/Classes/Evoker/classicon_evoker_preservation.jpg"),
  },
  "HolyPriest": {
    names: { en: "Holy Priest", fr: "Holy Priest", de: "Heilig Priester", ru: "Жрец Света", ch: "Holy Priest" },
    color: "#FFFFFF",
    icon: require("Images/Classes/Priest/Specialisation/Holy/Icons/HolyPriest.jpg"),
  },
  "MistweaverMonk": {
    names: { en: "Mistweaver Monk", fr: "Mistweaver Monk", de: "Nebelwirker Mönch", ru: "Монах Ткач Туманов", ch: "Mistweaver Monk" },
    color: "#00FF96",
    icon: require("Images/Classes/Monk/Specialisation/Mistweaver/Icons/MistWeaverMonk.jpg"),
  },
  "RestorationShaman": {
    names: { en: "Restoration Shaman", fr: "Restoration Shaman", de: "Wiederherstellung Schamane", ru: "Шаман Исцеления", ch: "Restoration Shaman" },
    color: "#0070DE",
    icon: require("Images/Classes/Shaman/Specialisation/Restoration/Icons/RestorationShaman.jpg"),
  },
};

/**
 * Map Classic and Retail specs to the same Key.
 */
const getSpecKey: Record<string, string> = {
  "Holy Paladin": "HolyPaladin", "Holy Paladin Classic": "HolyPaladin",
  "Discipline Priest": "DisciplinePriest", "Discipline Priest Classic": "DisciplinePriest",
  "Restoration Druid": "RestorationDruid", "Restoration Druid Classic": "RestorationDruid",
  "Preservation Evoker": "PreservationEvoker",
  "Holy Priest": "HolyPriest", "Holy Priest Classic": "HolyPriest",
  "Mistweaver Monk": "MistweaverMonk",
  "Restoration Shaman": "RestorationShaman", "Restoration Shaman Classic": "RestorationShaman",
};

/**
 * Grab a key from a class name.
 */
const resolveClassKey = (input: string): string => getSpecKey[input] || input;


// Exports
export const getTranslatedClassName = (className: string, currentLanguage: SupportedLanguages = "en"): string => {
  const key = resolveClassKey(className);
  return specData[key]?.names[currentLanguage] ?? className;
};

export const getClassColour = (className: string): string => {
  const key = resolveClassKey(className);
  return specData[key]?.color ?? "#FFFFFF"; // Default to white if not found
};

export const getClassIcon = (className: string): any => {
  const key = resolveClassKey(className);
  return specData[key]?.icon ?? "";
};