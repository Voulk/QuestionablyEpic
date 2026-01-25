export const STAT = {
  HEALTH: "health",
  STAMINA: "stamina",
  MANA: "mana",
  STRENGTH: "strength",
  AGILITY: "agility",
  INTELLECT: "intellect",
  CRITICAL_STRIKE: "crit",
  HASTE: "haste",
  HASTE_HPCT: "hastehpct",
  HASTE_HPM: "hastehpm",
  MASTERY: "mastery",
  VERSATILITY: "versatility",
  VERSATILITY_DR: "versatilitydr",
  LEECH: "leech",
  AVOIDANCE: "avoidance",
  SPEED: "speed",
};




export const getMasteryPercentage = (statQuantity: number, spec: string) => {
  return statQuantity / STATCONVERSION.MASTERY * STATCONVERSION.MASTERYMULT[spec];
}

export const STATCONVERSION = {
    LEECH: 69,
    HASTE: 44,
    CRIT: 46,
    VERSATILITY: 54,
    MASTERY: 46,
    VERSATILITY_DR: 108,
    MASTERYMULT: {
      "Preservation Evoker": 1.8,
      "Restoration Druid": 1.42,
      "Mistweaver Monk": 13.86,
      "Holy Paladin": 1.5,
      "Holy Priest": 0.908437,
      "Discipline Priest": 1.35,
      "Restoration Shaman": 3,
    } as Record<string, number>,
}

export const STATDIMINISHINGRETURNS: Record<string, number[]> = {
  CRIT: [STATCONVERSION.CRIT * 30, STATCONVERSION.CRIT * 40, STATCONVERSION.CRIT * 50, STATCONVERSION.CRIT * 60],
  MASTERY: [STATCONVERSION.MASTERY * 30, STATCONVERSION.MASTERY * 40, STATCONVERSION.MASTERY * 50, STATCONVERSION.MASTERY * 60],
  VERSATILITY: [STATCONVERSION.VERSATILITY * 30, STATCONVERSION.VERSATILITY * 40, STATCONVERSION.VERSATILITY * 50, STATCONVERSION.VERSATILITY * 60],
  HASTE: [STATCONVERSION.HASTE * 30, STATCONVERSION.HASTE * 40, STATCONVERSION.HASTE * 50, STATCONVERSION.HASTE * 60],
  LEECH: [STATCONVERSION.LEECH * 10, STATCONVERSION.LEECH * 10, STATCONVERSION.LEECH * 20, STATCONVERSION.LEECH * 20],
};

// These used to be different. Could potentially just be folded into a single variable now.
export const BASEMANA = 250000;

export const STATCONVERSIONCLASSIC = {
  HASTE: 425,
  CRIT: 600,
  INTCRIT: 2168,
  MASTERY: 600,
  MASTERYMULT: {
    "Restoration Druid": 1.25,
    "Mistweaver Monk": 1.25,
    "Holy Paladin": 1.5,
    "Holy Priest": 1.3,
    "Discipline Priest": 0.8, // 1.6 for Absorbs, 0.8 for Heals.
    "Restoration Shaman": 3,
  } as Record<string, number>,
}


  // Classic Stat percentages
  /*
  Classic: {
    HASTE: 128,
    CRIT: 179, // 
    MASTERY: 179, // 
    MELEEHIT: 15.8, // Not used for healing specifically, but we'll store it just in case.
    SPELLHIT: 12.6, // Not used for healing specifically, but we'll store it just in case.
    INTCRIT: {
      "Restoration Druid": 80,
      "Restoration Shaman": 80,
      "Holy Paladin": 80.5,
      "Holy Priest": 80,
    },
    MANAINT: 15, // You get 15 mana per point of intellect.
  } */


export const translatedStat = {
  haste: {
    en: "Haste",
    fr: "Hâte",
    de: "Tempo",
    cn: "CNHaste",
    ru: "к скорости",
  },
  crit: {
    en: "Crit",
    fr: "Score de crit",
    de: "Kritische Trefferwertung",
    cn: "CNCr",
    ru: "к критическому удару",
  },
  mastery: {
    en: "Mastery",
    fr: "Maîtrise",
    de: "Meisterschaft",
    cn: "CNCr",
    ru: "к искусности",
  },
  versatility: {
    en: "Vers",
    fr: "Versatilité",
    de: "Vielseitigkeit",
    cn: "CNCr",
    ru: "к универсальности",
  },
  intellect: {
    en: "Int",
    fr: "Int",
    de: "Int", // Intelligenz shortened
    cn: "智力",
    ru: "к интеллекту",
  },
  leech: {
    en: "Leech",
    fr: "Vol de Vie",
    de: "Lebensraub",
    cn: "吸血",
    ru: "Самоисцеление",
  },
  avoidance: {
    en: "Avoidance",
    fr: "Evitement",
    de: "Vermeidung",
    cn: "回避",
    ru: "Уклонение",
  },
  effect: {
    en: "Effect",
    fr: "Effect",
    de: "Effect",
    cn: "Effect",
    ru: "Эффект",
  },
  "bonus HPS": {
    en: "Bonus HPS",
    fr: "Bonus HPS",
    de: "Bonus HPS",
    cn: "Bonus HPS",
    ru: "Bonus HPS",
  },
  "bonus DPS": {
    en: "Bonus DPS",
    fr: "Bonus DPS",
    de: "Bonus DPS",
    cn: "Bonus DPS",
    ru: "Bonus DPS",
  },
  bonushealing: { // Classic
    en: "Healing"
  },
  mp5: { // Classic
    en: "MP5"
  },
  agility: { // Classic
    en: "Agility"
  },
  stamina: { // Classic
    en: "Stamina"
  },
  spelldamage: { // Classic
    en: "Healing"
  },
  spirit: { // Classic
    en: "Spirit"
  },
  strength: { // Classic
    en: "Strength"
  },
  hit: { // Classic
    en: "Hit"
  },
  defenserating: { // Classic
    en: "Defense"
  },
  blockrating: { // Classic
    en: "Block"
  },
  spellcrit: { // Classic
    en: "Crit"
  },
  dodge: { // Classic
    en: "Dodge"
  },
  attackpower: { // Classic
    en: "Attack Power"
  },
  expertise: { // Classic
    en: "Expertise"
  },
  hp5: { // Classic
    en: "HP5"
  },
  resilience: { // Classic
    en: "Resilience"
  },
  spellpower: { // Classic
    en: "Spell Power"
  },
};
