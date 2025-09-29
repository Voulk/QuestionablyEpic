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
    haste: 1.38,
    crit: 1.155,
    mastery: 1.26,
    versatility: 1.112,
    leech: 0.6,
  };
  statWeights.Dungeon = {
    intellect: 1,
    haste: 1.38,
    crit: 1.165,
    mastery: 1.23,
    versatility: 1.121,
    leech: 0.45,
  };

  return statWeights[contentType];
};
