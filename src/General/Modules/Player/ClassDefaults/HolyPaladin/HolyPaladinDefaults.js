// Unused Profile
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
      OneManaHealing: 6.4,
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
        oneMinute: 1.8,
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
    haste: 0.52,
    crit: 0.49,
    mastery: 0.42,
    versatility: 0.47,
    leech: 0.56,
  };
  statWeights.Dungeon = {
    intellect: 1,
    haste: 0.62,
    crit: 0.59,
    mastery: 0.38,
    versatility: 0.59,
    leech: 0.29,
  };

  return statWeights[contentType];
};
