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
    "Mistweaver Monk": 1,
    "Holy Paladin": 0.12,
    "Holy Priest": 0.1,
    "Discipline Priest": 0.108,
    "Restoration Shaman": 0.25,
  }
}

export const STATPERONEPERCENT = {
  LEECH: 21,
  HASTE: 30,
  CRIT: 33,
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
};
