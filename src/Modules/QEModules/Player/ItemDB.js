

// Experimental and not likely to see use.
const allItemsArray = 
[   // [ID, "Name, "Armor Type", "Slot", int, stamina, BaseHaste, BaseCrit, BaseVers, BaseMastery, BaseItemLevel, DropLocation, Selectable],
    [163891, "7th Legionnaires Aegis", "Shield", "Shield", 666, 382, 0, 54, 0, 83, 280, "World Quest", true]


]

// Much more likely to see use.
export const itemDB = [
  {
    id: 163891,
    name: "7th Legionnaires Aegis",
    names: {
      ch: "第七军团士兵屏障",
      en: "7th Legionnaires Aegis",
      ru: "Эгида бойца 7-го легиона",
      es: "Égida de legionario de la Séptima Legión",
      pt: "Égide do Legionário da 7ª",
      kr: "7군단 용사의 아이기스",
      fr: "Égide de légionnaire de la 7e",
    },
    icon: "inv_shield_1h_warfrontsalliance_c_01",
    itemClass: 2,
    itemSubClass: 7,
    itemLevel: 280,
    selectable: true,
    stats: {
      int: 666,
      stamina: 382,
      haste: 0,
      crit: 54,
      vers: 0,
      mastery: 83,
    },
    dropLoc: "World Quest",
    effect: "",
  },
  {
    id: 161403,
    name: "Avian Clutch Belt",
    names: {
      ch: "第七军团士兵屏障",
      en: "Avian Clutch Belt",
      ru: "Эгида бойца 7-го легиона",
      es: "Égida de legionario de la Séptima Legión",
      pt: "Égide do Legionário da 7ª",
      kr: "7군단 용사의 아이기스",
      fr: "Égide de légionnaire de la 7e",
    },
    icon: "inv_leather_nazmirraid_d_01buckle",
    itemClass: 4,
    itemSubClass: 2,
    itemSlot: "Waist",
    itemLevel: 350,
    selectable: true,
    stats: {
      int: 326,
      stamina: 574,
      haste: 0,
      crit: 125,
      vers: 81,
      mastery: 0,
    },
    dropLoc: "Boss A (Raid)",
    effect: "",
  },
];