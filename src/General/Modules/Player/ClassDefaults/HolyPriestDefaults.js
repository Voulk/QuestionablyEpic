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
      OneManaHealing: 7.6,
      CastsPerMinute: 28,
      cooldownMult: {
        c60: 1,
        c90: 1,
        c120: 1,
        c180: 1,

        oneMinute: 1,
        ninetySeconds: 1,
        twoMinutes: 1,
        twoMinutesOrb: 1,
        threeMinutes: 1,
      },
      HoldYourGroundUptime: 0.8
    };
  } else if (contentType === "Dungeon") {
    specialQueries = {
      OneManaHealing: 0.4,
      CastsPerMinute: 30,
      cooldownMult: {
        c60: 1,
        c90: 1,
        c120: 1.2,
        c180: 1,

        oneMinute: 1,
        ninetySeconds: 1,
        twoMinutes: 1,
        twoMinutesOrb: 1,
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
    haste: 0.27,
    crit: 0.32,
    mastery: 0.33,
    versatility: 0.3,
    leech: 0.81,
  };
  statWeights.Dungeon = {
    intellect: 1,
    haste: 0.3,
    crit: 0.32,
    mastery: 0.27,
    versatility: 0.32,
    leech: 0.42,
  };

  return statWeights[contentType];
};
