export const holyPriestDefaultSpellData = (contentType) => {
  let spellList = {};
  if (contentType === "Raid") {
    spellList = {
    77489: { cpm: 0, avgcast: 2600, hps: 12421.9, overhealing: 0 }, // Echo of Light
    33076: { cpm: 5, avgcast: 12500, hps: 11684, overhealing: 0.342 }, // Prayer of Mending
    34861: { cpm: 21, avgcast: 25900, hps: 8021.7, overhealing: 0.312 }, // Holy Word: Sanctify
    596: { cpm: 9, avgcast: 10400, hps: 6808.2, overhealing: 0.343 }, // Prayer of Healing
    139: { cpm: 0, avgcast: 2500, hps: 6557.4, overhealing: 0.364 }, // Renew
    204883: { cpm: 28, avgcast: 12800, hps: 5315.1, overhealing: 0.31 }, // Circle of Healing
    120517: { cpm: 7, avgcast: 9200, hps: 4980.8, overhealing: 0.265 }, // Halo
    64843: { cpm: 8, avgcast: 8900, hps: 4904.6, overhealing: 0.332 }, // Divine Hymn
    2050: { cpm: 15, avgcast: 55600, hps: 2064, overhealing: 0.2 }, // Holy Word: Serenity
    238136: { cpm: 0, avgcast: 5000, hps: 1969.1, overhealing: 0.269 }, // Cosmic Ripple
    265202: { cpm: 2, avgcast: 8800, hps: 1570.5, overhealing: 0.222 }, // Holy Word: Salvation
    2061: { cpm: 19, avgcast: 19300, hps: 908.2, overhealing: 0.421 }, // Flash Heal
    };
  } else if (contentType === "Dungeon") {
    spellList = { // TODO
      77489: { cpm: 0, avgcast: 2600, hps: 12421.9, overhealing: 0 }, // Echo of Light
      33076: { cpm: 28, avgcast: 12500, hps: 11684, overhealing: 0.342 }, // Prayer of Mending
      34861: { cpm: 21, avgcast: 25900, hps: 8021.7, overhealing: 0.312 }, // Holy Word: Sanctify
      596: { cpm: 53, avgcast: 10400, hps: 6808.2, overhealing: 0.343 }, // Prayer of Healing
      139: { cpm: 0, avgcast: 2500, hps: 6557.4, overhealing: 0.364 }, // Renew
      204883: { cpm: 28, avgcast: 12800, hps: 5315.1, overhealing: 0.31 }, // Circle of Healing
      120517: { cpm: 7, avgcast: 9200, hps: 4980.8, overhealing: 0.265 }, // Halo
      64843: { cpm: 8, avgcast: 8900, hps: 4904.6, overhealing: 0.332 }, // Divine Hymn
      2050: { cpm: 15, avgcast: 55600, hps: 2064, overhealing: 0.2 }, // Holy Word: Serenity
      238136: { cpm: 0, avgcast: 5000, hps: 1969.1, overhealing: 0.269 }, // Cosmic Ripple
      265202: { cpm: 2, avgcast: 8800, hps: 1570.5, overhealing: 0.222 }, // Holy Word: Salvation
      2061: { cpm: 19, avgcast: 19300, hps: 908.2, overhealing: 0.421 }, // Flash Heal
    };
  } else {
    console.error("Unknown Content Type");
  }

  return spellList;
};

export const holyPriestDefaultSpecialQueries = (contentType) => {
  let specialQueries = {};
  if (contentType === "Raid") {
    specialQueries = {
      OneManaHealing: 6.8,
      CastsPerMinute: 28,
      cooldownMult: {
        c60: 1,
        c90: 1,
        c120: 1.44,
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
    haste: 0.78,
    crit: 0.945,
    mastery: 0.909,
    versatility: 0.875,
    leech: 0.32,
  };
  statWeights.Dungeon = {
    intellect: 1,
    haste: 0.740,
    crit: 0.754,
    mastery: 0.51,
    versatility: 0.72,
    leech: 0.367,
  };

  return statWeights[contentType];
};
