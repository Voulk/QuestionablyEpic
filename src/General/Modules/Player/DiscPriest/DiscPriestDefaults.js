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
        oneMinute: 1,
        ninetySeconds: 1.4,
        twoMinutes: 1,
        twoMinutesOrb: 0.85,
        threeMinutes: 1.7,
      },
      rampData: {},
      HoldYourGroundUptime: 0.8
    };
  } else if (contentType === "Dungeon") {
    specialQueries = {
      OneManaHealing: 0,
      CastsPerMinute: 30,
      cooldownMult: {
        c60: 1,
        c90: 1.1,
        c120: 1.1,
        c180: 1.05,

        oneMinute: 1.2,
        ninetySeconds: 1.0,
        twoMinutes: 1.4,
        twoMinutesOrb: 1,
        threeMinutes: 1.1,
      },
      rampData: {},
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
    haste: 0.57,
    crit: 0.517,
    mastery: 0.455,
    versatility: 0.48,
    leech: 0.44,
  };
  statWeights.Dungeon = {
    intellect: 1,
    haste: 0.542,
    crit: 0.507,
    mastery: 0.38,
    versatility: 0.49,
    leech: 0.34,
  };

  return statWeights[contentType];
};
