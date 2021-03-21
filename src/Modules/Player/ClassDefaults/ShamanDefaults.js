export const shamanDefaultSpellData = (contentType) => {
  let spellList = {};
  if (contentType === "Raid") {
    spellList = {
      61295: { casts: 66, healing: 693600, hps: 1491 }, // Riptide
      157153: { casts: 14, healing: 0, hps: 0 }, // Cloudburst
      73921: { casts: 18, healing: 450000, hps: 967 }, // Healing Rain
      108280: { casts: 2, healing: 0, hps: 0 }, // Healing Tide Totem
      85222: { casts: 16, healing: 288000, hps: 621 }, // Chain Heal
      16191: { casts: 2, healing: 0, hps: 0 }, // Mana Tide Totem
      20473: { casts: 20, healing: 0, hps: 0 }, // Healing Surge
    };
  } else if (contentType === "Dungeon") {
    spellList = {
      61295: { casts: 66, healing: 693600, hps: 1491 },
      157153: { casts: 14, healing: 0, hps: 0 },
      73921: { casts: 18, healing: 450000, hps: 967 },
      108280: { casts: 2, healing: 0, hps: 0 },
      85222: { casts: 4, healing: 74000, hps: 141 },
      16191: { casts: 2, healing: 0, hps: 0 },
      20473: { casts: 40, healing: 0, hps: 0 }, // Healing Surge
    };
  } else {
    console.error("Unknown Content Type");
  }

  return spellList;
};

export const shamanDefaultSpecialQueries = (contentType) => {
  let specialQueries = {};
  if (contentType === "Raid") {
    specialQueries = {
      HPSOnEarthShield: 456,
      OneManaHealing: 1.9,
      CastsPerMinute: 24,
      cooldownMult: {
        oneMinute: 1.1,
        twoMinutes: 1.1,
        threeMinutes: 1.3,
      },
      HoldYourGroundUptime: 0.8
    };
  } else if (contentType === "Dungeon") {
    specialQueries = {
      HPSOnEarthShield: 456,
      OneManaHealing: 0.4,
      CastsPerMinute: 30,
      cooldownMult: {
        oneMinute: 1.1,
        twoMinutes: 1.1,
        threeMinutes: 1.1,
      },
      HoldYourGroundUptime: 0.8
    };
  } else {
    console.error("Unknown Content Type");
  }

  return specialQueries;
};

export const shamanDefaultStatWeights = (contentType) => {
  let statWeights = {};

  statWeights.Raid = {
    intellect: 1,
    haste: 0.32,
    crit: 0.36,
    mastery: 0.32,
    versatility: 0.36,
    leech: 0.42,
  };
  statWeights.Dungeon = {
    intellect: 1,
    haste: 0.33,
    crit: 0.33,
    mastery: 0.29,
    versatility: 0.34,
    leech: 0.19,
  };

  return statWeights[contentType];
};
