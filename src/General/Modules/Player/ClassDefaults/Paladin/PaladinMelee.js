export const paladinMeleeSpellData = (contentType) => {
  let spellList = {};
  if (contentType === "Raid") {
    spellList = {
      225311: { cpm: 8.71, avgcast: 16173, hps: 2575, overhealing: 0.39 }, // Light of Dawn
      25914: { cpm: 8.87, avgcast: 10172, hps: 1668, overhealing: 0.31 }, // Holy Shock
      53652: { cpm: 0.08, avgcast: 52446, hps: 1080, overhealing: 0.59 }, // Beacon of Light
      337824: { cpm: 0, avgcast: 0, hps: 968, overhealing: 0.22 }, // Shock Barrier
      119952: { cpm: 0, avgcast: 0, hps: 501, overhealing: 0.41 }, // Arcing Light
      183778: { cpm: 0, avgcast: 0, hps: 435, overhealing: 0.05 }, // Judgment of Light
      85673: { cpm: 1.59, avgcast: 10780, hps: 342, overhealing: 0.4 }, // Word of Glory
      223306: { cpm: 3.16, avgcast: 4766, hps: 277, overhealing: 0.49 }, // Bestow Faith
      183998: { cpm: 0.35, avgcast: 4057, hps: 100, overhealing: 0.08 }, // Light of the Martyr
      633: { cpm: 0.14, avgcast: 33064, hps: 79, overhealing: 0.54 }, // Lay on Hands
      82326: { cpm: 0.44, avgcast: 4664, hps: 39, overhealing: 0.48 }, // Holy Light
      19750: { cpm: 0.38, avgcast: 5331, hps: 32, overhealing: 0.29 }, // Flash of Light
    };
  } else if (contentType === "Dungeon") {
    spellList = {
      225311: { cpm: 8.71, avgcast: 16173, hps: 2575, overhealing: 0.39 }, // Light of Dawn
      85673: { cpm: 5.4, avgcast: 9420, hps: 961, overhealing: 0.18 }, // Word of Glory
      25914: { cpm: 7.94, avgcast: 8242, hps: 1406, overhealing: 0.19 }, // Holy Shock
      337824: { cpm: 0, avgcast: 0, hps: 793, overhealing: 0.21 }, // Shock Barrier
      53652: { cpm: 0.04, avgcast: 107423, hps: 1083, overhealing: 0.39 }, // Beacon of Light
    };
  } else {
    console.error("Unknown Content Type");
  }

  return spellList;
};

export const paladinMeleeSpecialQueries = (contentType) => {
  let specialQueries = {};
  if (contentType === "Raid") {
    specialQueries = {
      OneManaHealing: 6.9,
      chilledClarityExtension: 28000,
      CastsPerMinute: 27,
      cooldownMult: {
        c60: 1,
        c90: 1,
        c120: 1.2,
        c180: 1,

        oneMinute: 1,
        ninetySeconds: 1,
        twoMinutes: 1.2,
        twoMinutesOrb: 1.07,
        threeMinutes: 1,
      },
      HoldYourGroundUptime: 0.4
    };
  } else if (contentType === "Dungeon") {
    specialQueries = {
      OneManaHealing: 0.7,
      CastsPerMinute: 30,
      cooldownMult: {
        c60: 1,
        c90: 1,
        c120: 1.2,
        c180: 1,

        oneMinute: 1,
        ninetySeconds: 1,
        twoMinutes: 1.25,
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

export const paladinMeleeStatWeights = (contentType) => {
  let statWeights = {};

  statWeights.Raid = {
    intellect: 1,
    haste: 0.74,
    crit: 0.76,
    mastery: 0.71,
    versatility: 0.67,
    leech: 0.54,
    defaults: true,
  };
  statWeights.Dungeon = {
    intellect: 1,
    haste: 0.7,
    crit: 0.77,
    mastery: 0.51,
    versatility: 0.69,
    leech: 0.41,
    defaults: true,
  };

  return statWeights[contentType];
};
