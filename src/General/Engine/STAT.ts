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

// Mostly unused now.
export const BASESTAT = {
  CRIT: 0.05,
  MASTERY: {
    "Preservation Evoker": 0,
    "Restoration Druid": 0.04,
    "Mistweaver Monk": 0.336,
    "Holy Paladin": 0.12,
    "Holy Priest": 0.1,
    "Discipline Priest": 0.108,
    "Restoration Shaman": 0.25,
  },
};

export const STATDIMINISHINGRETURNS: Record<string, number[]> = {
  CRIT: [5400, 7200, 9000, 10800, 12600],
  MASTERY: [5400, 7200, 9000, 10800, 12600],
  VERSATILITY: [6150, 8200, 10250, 12300, 14350],
  HASTE: [5100, 6800, 8500, 10200, 11900],
  LEECH: [1100, 1100, 1650, 1650, 2200, 2200],
};

export const getMasteryPercentage = (statQuantity: number, spec: string) => {
  return statQuantity / STATCONVERSION.MASTERY * STATCONVERSION.MASTERYMULT[spec];
}

export const STATCONVERSION = {
    LEECH: 110,
    HASTE: 170,
    CRIT: 180,
    VERSATILITY: 205,
    MASTERY: 180,
    VERSATILITY_DR: 410,
    MASTERYMULT: {
      "Preservation Evoker": 1.8,
      "Restoration Druid": 0.5,
      "Mistweaver Monk": 4.2,
      "Holy Paladin": 1.5,
      "Holy Priest": 1.125,
      "Discipline Priest": 1.35,
      "Restoration Shaman": 3,
    } as Record<string, number>,

}

/**
 * @deprecated
 */
export const STATPERONEPERCENT = {
  Retail: {
    LEECH: 110,
    HASTE: 170,
    CRIT: 180,
    VERSATILITY: 205,
    MASTERY: 180,
    VERSATILITY_DR: 410,
    MASTERYMULT: {
      "Preservation Evoker": 1.8,
      "Restoration Druid": 0.5,
      "Mistweaver Monk": 4.2,
      "Holy Paladin": 1.5,
      "Holy Priest": 1.125,
      "Discipline Priest": 1.35,
      "Restoration Shaman": 3,
    },

  },
  Classic: {
    HASTE: 15.8,
    CRIT: 22.1, // Keep in mind Spell and melee crit are separated, but both cost 22.1 per 1% gain.
    MELEEHIT: 15.8, // Not used for healing specifically, but we'll store it just in case.
    SPELLHIT: 12.6, // Not used for healing specifically, but we'll store it just in case.
    INTCRIT: {
      "Restoration Druid": 80,
      "Restoration Shaman": 80,
      "Holy Paladin": 80.5,
      "Holy Priest": 80,
    },
    MANAINT: 15, // You get 15 mana per point of intellect.
  }


};


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
};
