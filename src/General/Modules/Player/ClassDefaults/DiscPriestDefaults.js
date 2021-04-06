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
      OneManaHealing: 3.4,
      CastsPerMinute: 36,
      cooldownMult: {
        oneMinute: 1.8,
        twoMinutes: 1.4,
        threeMinutes: 1.25,
      },
      HoldYourGroundUptime: 0.8
    };
  } else if (contentType === "Dungeon") {
    specialQueries = {
      OneManaHealing: 0,
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

export const discPriestDefaultStatWeights = (contentType) => {
  let statWeights = {};

  statWeights.Raid = {
    intellect: 1,
    haste: 0.4,
    crit: 0.39,
    mastery: 0.35,
    versatility: 0.38,
    leech: 0.22,
  };
  statWeights.Dungeon = {
    intellect: 1,
    haste: 0.38,
    crit: 0.34,
    mastery: 0.3,
    versatility: 0.33,
    leech: 0.18,
  };

  return statWeights[contentType];
};
