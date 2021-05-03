export const holyPriestDefaultSpellData = (contentType) => {
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

export const holyPriestDefaultSpecialQueries = (contentType) => {
  let specialQueries = {};
  if (contentType === "Raid") {
    specialQueries = {
      OneManaHealing: 3.5,
      CastsPerMinute: 28,
      cooldownMult: {
        oneMinute: 1,
        twoMinutes: 1,
        threeMinutes: 1,
      },
      HoldYourGroundUptime: 0.8
    };
  } else if (contentType === "Dungeon") {
    specialQueries = {
      OneManaHealing: 0.4,
      CastsPerMinute: 30,
      cooldownMult: {
        oneMinute: 1,
        twoMinutes: 1,
        threeMinutes: 1,
      },
      HoldYourGroundUptime: 0.8
    };
  } else {
    console.error("Unknown Content Type");
  }

  return specialQueries;
};

export const holyPriestDefaultStatWeights = (contentType) => {
  let statWeights = {};

  statWeights.Raid = {
    intellect: 1,
    haste: 0.29,
    crit: 0.38,
    mastery: 0.38,
    versatility: 0.35,
    leech: 0.56,
  };
  statWeights.Dungeon = {
    intellect: 1,
    haste: 0.34,
    crit: 0.35,
    mastery: 0.28,
    versatility: 0.34,
    leech: 0.36,
  };

  return statWeights[contentType];
};
