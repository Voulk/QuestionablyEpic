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
        oneMinute: 1,
        ninetySeconds: 2.4,
        twoMinutes: 1,
        twoMinutesOrb: 0.85,
        threeMinutes: 2.32,
      },
      HoldYourGroundUptime: 0.8
    };
  } else if (contentType === "Dungeon") {
    specialQueries = {
      OneManaHealing: 0,
      CastsPerMinute: 30,
      cooldownMult: {
        oneMinute: 1.1,
        ninetySeconds: 1.1,
        twoMinutes: 1.1,
        twoMinutesOrb: 1,
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
    haste: 0.41,
    crit: 0.39,
    mastery: 0.37,
    versatility: 0.37,
    leech: 0.25,
  };
  statWeights.Dungeon = {
    intellect: 1,
    haste: 0.4,
    crit: 0.38,
    mastery: 0.31,
    versatility: 0.37,
    leech: 0.26,
  };

  return statWeights[contentType];
};
