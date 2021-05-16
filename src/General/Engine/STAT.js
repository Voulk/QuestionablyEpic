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

export const BASESTAT = {
  CRIT: 0.05,
  MASTERY: {
    "Restoration Druid": 0.04,
    "Mistweaver Monk": 0.336,
    "Holy Paladin": 0.12,
    "Holy Priest": 0.1,
    "Discipline Priest": 0.108,
    "Restoration Shaman": 0.25,
  },
};

export const STATDIMINISHINGRETURNS = {
  CRIT: [1050, 1365, 1645, 1890, 2310],
  MASTERY: [1050, 1365, 1645, 1890, 2310],
  VERSATILITY: [1200, 1560, 1880, 2160, 2640],
  HASTE: [990, 1287, 1551, 1782, 2178],
  LEECH: [210, 210, 420, 420]

}

export const STATPERONEPERCENT = {
  Retail: {
    LEECH: 21,
    HASTE: 33,
    CRIT: 35,
    VERSATILITY: 40,
    VERSATILITY_DR: 80,
    MASTERYA: {
      "Restoration Druid": 70,
      "Mistweaver Monk": 8.33,
      "Holy Paladin": 23.33,
      "Holy Priest": 28,
      "Discipline Priest": 25.93,
      "Restoration Shaman": 11.66,
    },
    MASTERY: {
      "Druid-Restoration": 70,
      "Monk-Mistweaver": 8.33,
      "Paladin-Holy": 23.33,
      "Priest-Holy": 28,
      "Priest-Discipline": 25.93,
      "Shaman-Restoration": 11.66,
    },
  },
  BurningCrusade: {
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
    en: "Bonus Healing"
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
  bonusdamage: { // Classic
    en: "Bonus Damage"
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
  spelldamage: { // Classic
    en: "Spell Damage"
  },
};
