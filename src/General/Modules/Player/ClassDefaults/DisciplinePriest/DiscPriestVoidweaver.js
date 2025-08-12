export const discPriestDefaultSpellData = (contentType) => {
  let spellList = {};
  if (contentType === "Raid") {
    spellList = {};
  } else if (contentType === "Dungeon") {
    spellList = {};
  } else {
    console.error("Unknown Content Type");
  }

  return spellList;
};

export const discPriestDefaultSpecialQueries = (contentType) => {
  let specialQueries = {};
  if (contentType === "Raid") {
    specialQueries = {
      OneManaHealing: 8.1,
      CastsPerMinute: 36,
      cooldownMult: {
        c30: 1.4,
        c60: 1,
        c90: 1.9,
        c120: 1,
        c180: 1,
      },
      rampData: {},
    };
  } else if (contentType === "Dungeon") {
    specialQueries = {
      OneManaHealing: 0,
      CastsPerMinute: 30,
      cooldownMult: {
        c30: 1.15,
        c60: 1,
        c90: 1.1,
        c120: 1.1,
        c180: 1.05,

      },
      rampData: {},
    };
  } else {
    console.error("Unknown Content Type");
  }

  return specialQueries;
};

export const discPriestDefaultStatWeights = (contentType) => {
  let statWeights = {};

  statWeights.Raid = {
    intellect: 1,
    haste: 1.35,
    crit: 1.15,
    mastery: 1.24,
    versatility: 1.11,
    leech: 0.6,
  };
  statWeights.Dungeon = {
    intellect: 1,
    haste: 1.36,
    crit: 1.16,
    mastery: 1.21,
    versatility: 1.12,
    leech: 0.45,
  };

  return statWeights[contentType];
};
