export const MONK_HERO_TREES = {
  CONDUIT: "Conduit of the Celestials",
  MOH: "Master of Harmony",
};

const baseTalents = 
"C4QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAghx2MwmFzYmllZshZmhZW22mZswMaGzAGMYMLzMzMMbDGsYCAAAAgAsYZmlZbmBAAGwAMDYMMWkxMA";

// per-model talent imports. these will diverge, and might not want to live here, but for now they are defaulted.
export const monkTalentStrings = {
  "Yu'lon": baseTalents,
  "Chi-Ji": "C4QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgxMWmZZMLzmxMz2iBgZbMb2mZswMaGzAGMYMLzMzMMbDGsYCAAAAgAsYZmlZbmBAAGwAMDYMMWkxMA",
  "Dungeon Default": "C4QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMWmZZML2mxMjNjtllZMzmZ2WWmZswQzYGwgBjZZmZmhZDzwsMTAAAAAEgFbzsMbzMAAwAAMDYMwiMmBA",
}

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
        c120: 1.5,
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
    haste: 0.76,
    crit: 0.46,
    mastery: 0.24,
    versatility: 0.53,
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
