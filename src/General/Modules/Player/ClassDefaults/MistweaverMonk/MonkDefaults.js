// Yu'lon build. Chi-Ji has its own profile.
export const monkDefaultSpellData = (contentType) => {
  let spellList = {};
  if (contentType === "Raid") {
    spellList = { // Unused. Replaced with log data.

    };
  } else if (contentType === "Dungeon") {
    spellList = {
    };
  } else {
    console.error("Unknown Content Type");
  }

  return spellList;
};

export const monkDefaultSpecialQueries = (contentType) => {
  let specialQueries = {};
  if (contentType === "Raid") {
    specialQueries = {
      HPSChijiGusts: 674,
      percentVivifyOnRemTargets: 0.15,
      HPSDuringCelestial: 9800,
      HPSHotHealingDuringLC: 98,
      HPSHotHealingAfterLC: 0,
      HPSExpelHarmOnSelf: 0,
      OneManaHealing: 5.6,
      cooldownMult: {
        c60: 1,
        c90: 1,
        c120: 1,
        c180: 1,
      },
      HoldYourGroundUptime: 0.6
    };
  } else if (contentType === "Dungeon") {
    specialQueries = {
      HPSChijiGusts: 674,
      percentVivifyOnRemTargets: 0.75,
      HPSDuringCelestial: 9400,
      HPSHotHealingDuringLC: 98,
      HPSHotHealingAfterLC: 0,
      HPSExpelHarmOnSelf: 0,
      OneManaHealing: 1.4,
      cooldownMult: {
        c60: 1,
        c90: 1,
        c120: 1,
        c180: 1,

      },
      HoldYourGroundUptime: 0.6
    };
  } else {
    console.error("Unknown Content Type");
  }

  return specialQueries;
};

export const monkDefaultStatWeights = (contentType) => {
  let statWeights = {};

  statWeights.Raid = {
    intellect: 1,
    haste: 0.57,
    crit: 0.489,
    mastery: 0.32,
    versatility: 0.428,
    leech: 0.25,
  };
  statWeights.Dungeon = {
    intellect: 1,
    haste: 0.55,
    crit: 0.49,
    mastery: 0.35,
    versatility: 0.431,
    leech: 0.2,
  };

  return statWeights[contentType];
};
