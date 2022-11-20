export const paladinVenthyrSpellData = (contentType) => {
  let spellList = {};
  if (contentType === "Raid") {
    spellList = {
      225311: { cpm: 7.93, avgcast: 15229, hps: 2225, overhealing: 0.4 }, // Light of Dawn
      316958: { cpm: 0.25, avgcast: 233896, hps: 1097, overhealing: 0.7 }, // Ashen Hallow
      25914: { cpm: 8.76, avgcast: 6606, hps: 1065, overhealing: 0.31 }, // Holy Shock
      53652: { cpm: 0.05, avgcast: 41331, hps: 970, overhealing: 0.62 }, // Beacon of Light
      337824: { cpm: 0, avgcast: 0, hps: 748, overhealing: 0.25 }, // Shock Barrier
      287268: { cpm: 0, avgcast: 0, hps: 708, overhealing: 0.41 }, // Glimmer of Light
      119952: { cpm: 0, avgcast: 0, hps: 547, overhealing: 0.33 }, // Arcing Light
      183778: { cpm: 0, avgcast: 0, hps: 441, overhealing: 0.06 }, // Judgment of Light
      85673: { cpm: 1.23, avgcast: 10378, hps: 239, overhealing: 0.24 }, // Word of Glory
      223306: { cpm: 3.1, avgcast: 3377, hps: 200, overhealing: 0.74 }, // Bestow Faith
      633: { cpm: 0.14, avgcast: 30251, hps: 78, overhealing: 1 }, // Lay on Hands
      183998: { cpm: 0.41, avgcast: 3578, hps: 56, overhealing: 0.07 }, // Light of the Martyr
      19750: { cpm: 0.44, avgcast: 5896, hps: 48, overhealing: 0.2 }, // Flash of Light

    };
  } else if (contentType === "Dungeon") {
    spellList = {
        225311: { cpm: 7.93, avgcast: 15229, hps: 2225, overhealing: 0.4 }, // Light of Dawn
        25914: { cpm: 8.76, avgcast: 6606, hps: 1065, overhealing: 0.31 }, // Holy Shock
        53652: { cpm: 0.05, avgcast: 41331, hps: 970, overhealing: 0.62 }, // Beacon of Light
        337824: { cpm: 0, avgcast: 0, hps: 748, overhealing: 0.25 }, // Shock Barrier
        287268: { cpm: 0, avgcast: 0, hps: 708, overhealing: 0.41 }, // Glimmer of Light
        119952: { cpm: 0, avgcast: 0, hps: 547, overhealing: 0.33 }, // Arcing Light
        183778: { cpm: 0, avgcast: 0, hps: 441, overhealing: 0.06 }, // Judgment of Light
        85673: { cpm: 1.23, avgcast: 10378, hps: 239, overhealing: 0.24 }, // Word of Glory
        223306: { cpm: 3.1, avgcast: 3377, hps: 200, overhealing: 0.74 }, // Bestow Faith
        633: { cpm: 0.14, avgcast: 30251, hps: 78, overhealing: 1 }, // Lay on Hands
        183998: { cpm: 0.41, avgcast: 3578, hps: 56, overhealing: 0.07 }, // Light of the Martyr
        19750: { cpm: 0.44, avgcast: 5896, hps: 48, overhealing: 0.2 }, // Flash of Light
      };
  } else {
    console.error("Unknown Content Type");
  }

  return spellList;
};

export const paladinVenthyrSpecialQueries = (contentType) => {
  let specialQueries = {};
  if (contentType === "Raid") {
    specialQueries = {
      OneManaHealing: 1.9,
      CastsPerMinute: 27,
      cooldownMult: {
        oneMinute: 1,
        ninetySeconds: 1,
        twoMinutes: 1.2,
        twoMinutesOrb: 1.12,
        threeMinutes: 1,
      },
      HoldYourGroundUptime: 0.4
    };
  } else if (contentType === "Dungeon") {
    specialQueries = {
      OneManaHealing: 0.7,
      CastsPerMinute: 30,
      cooldownMult: {
        oneMinute: 1,
        ninetySeconds: 1,
        twoMinutes: 1.1,
        twoMinutesOrb: 1,
        threeMinutes: 1,
      },
      HoldYourGroundUptime: 0.35
    };
  } else {
    console.error("Unknown Content Type");
  }

  return specialQueries;
};

export const paladinVenthyrStatWeights = (contentType) => {
  let statWeights = {};

  statWeights.Raid = {
    intellect: 1,
    haste: 0.35,
    crit: 0.26,
    mastery: 0.34,
    versatility: 0.3,
    leech: 0.8,
    defaults: true,
  };
  statWeights.Dungeon = {
    intellect: 1,
    haste: 0.59,
    crit: 0.55,
    mastery: 0.27,
    versatility: 0.58,
    leech: 0.52,
    defaults: true,
  };

  return statWeights[contentType];
};
