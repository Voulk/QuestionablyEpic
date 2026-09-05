export const MONK_HERO_TREES = {
  CONDUIT: "Conduit of the Celestials",
  MOH: "Master of Harmony",
};

const baseTalents = 
"C4QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAghx2MwmFzYmllZshZmhZW22mZswMaGzAGMYMLzMzMMbDGsYCAAAAgAsYZmlZbmBAAGwAMDYMMWkxMA";

// per-model talent imports. these will diverge, and might not want to live here, but for now they are defaulted.
export const monkTalentStrings = {
  "Yu'lon": baseTalents,
  "Chi-Ji": "C4QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMWmZZML2MmZ22MzGGmNzsZbmxCDNjZADGMmlZmZGmNMDzyMBAAAAQAWsNz2sNzAAADYAmBMGYRGzA",
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
    haste: 0.76,
    crit: 0.56,
    mastery: 0.27,
    versatility: 0.53,
    leech: 0.25,
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
