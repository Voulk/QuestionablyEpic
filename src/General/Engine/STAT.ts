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


export const STATDIMINISHINGRETURNS: Record<string, number[]> = {
  CRIT: [21000, 28000, 35000, 42000, 49000],
  MASTERY: [21000, 28000, 35000, 42000, 49000],
  VERSATILITY: [23400, 31200, 39000, 46800, 54600],
  HASTE: [19800, 26400, 33000, 39600, 46200],
  LEECH: [10800, 10800, 21600, 21600, 32400, 32400],
};

export const getMasteryPercentage = (statQuantity: number, spec: string) => {
  return statQuantity / STATCONVERSION.MASTERY * STATCONVERSION.MASTERYMULT[spec];
}

export const STATCONVERSION = {
    LEECH: 1020,
    HASTE: 660,
    CRIT: 700,
    VERSATILITY: 780,
    MASTERY: 700,
    VERSATILITY_DR: 1560,
    MASTERYMULT: {
      "Preservation Evoker": 1.8,
      "Restoration Druid": 0.728,
      "Mistweaver Monk": 6.93,
      "Holy Paladin": 1.5,
      "Holy Priest": 0.95625,
      "Discipline Priest": 1.35,
      "Restoration Shaman": 3,
    } as Record<string, number>,
}

export const STATCONVERSIONCLASSIC = {
  HASTE: 425,
  CRIT: 600,
  INTCRIT: 2168,
  MASTERY: 600,
  MASTERYMULT: {
    "Restoration Druid": 1.25,
    "Mistweaver Monk": 1.25,
    "Holy Paladin": 1.5,
    "Holy Priest": 1.25,
    "Discipline Priest": 2.5,
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
