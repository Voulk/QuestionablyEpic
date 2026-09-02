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
        c30: 1,
        c60: 1,
        c90: 1,
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
        c30: 1,
        c60: 1,
        c90: 1,
        c120: 1,
        c180: 1,

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
    haste: 0.861,
    crit: 0.568,
    mastery: 0.59,
    versatility: 0.56,
    leech: 0.2,
  };
  statWeights.Dungeon = {
    intellect: 1,
    haste: 0.75,
    crit: 0.572,
    mastery: 0.63,
    versatility: 0.56,
    leech: 0.15,
  };

  return statWeights[contentType];
};
