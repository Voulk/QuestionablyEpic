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
      OneManaHealing: 8.9,
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
    haste: 0.41,
    crit: 0.38,
    mastery: 0.335,
    versatility: 0.348,
    leech: 0.38,
  };
  statWeights.Dungeon = {
    intellect: 1,
    haste: 0.38,
    crit: 0.373,
    mastery: 0.25,
    versatility: 0.374,
    leech: 0.29,
  };

  return statWeights[contentType];
};
