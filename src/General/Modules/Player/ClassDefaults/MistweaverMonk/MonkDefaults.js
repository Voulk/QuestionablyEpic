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
    haste: 0.74,
    crit: 0.58,
    mastery: 0.3,
    versatility: 0.54,
    leech: 0.2,
  };
  statWeights.Dungeon = {
    intellect: 1,
    haste: 0.7,
    crit: 0.548,
    mastery: 0.59,
    versatility: 0.54,
    leech: 0.2,
  };

  return statWeights[contentType];
};
