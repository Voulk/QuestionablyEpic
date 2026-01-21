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
        c60: 1.16,
        c90: 1,
        c120: 1.36,
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
        c60: 1.1,
        c90: 1,
        c120: 1.1,
        c180: 1,

        oneMinute: 1.2,
        ninetySeconds: 1,
        twoMinutes: 1.2,
        twoMinutesOrb: 1.1,
        threeMinutes: 1.2,
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
    haste: 0.6,
    crit: 0.59,
    mastery: 0.34,
    versatility: 0.52,
    leech: 0.24,
  };
  statWeights.Dungeon = {
    intellect: 1,
    haste: 0.6,
    crit: 0.59,
    mastery: 0.5,
    versatility: 0.52,
    leech: 0.4,
  };

  return statWeights[contentType];
};
