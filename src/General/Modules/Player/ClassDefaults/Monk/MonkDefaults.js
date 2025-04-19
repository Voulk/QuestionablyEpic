export const monkDefaultSpellData = (contentType) => {
  let spellList = {};
  if (contentType === "Raid") {
    spellList = { // Unused. Replaced with log data.
      196725: { cpm: 52.31, avgcast: 1742.69, hps: 1515.74, overhealing: 0.14 }, //Refreshing Jade Wind
      191840: { cpm: 3.5, avgcast: 33582.63, hps: 1316.39, overhealing: 0.27 }, // Essence Font
      325209: { cpm: 0, avgcast: 0, hps: 1076.62, overhealing: 0.48 }, // Enveloping Breath
      115310: { cpm: 0.31, avgcast: 168141.11, hps: 878.24, overhealing: 0.35 }, // Revival
      119611: { cpm: 5.41, avgcast: 6911.81, hps: 623.78, overhealing: 0.35 }, // Renewing Mist
      274909: { cpm: 0, avgcast: 0, hps: 409.03, overhealing: 0.47 }, // Rising Mist
      116670: { cpm: 2.49, avgcast: 9737.92, hps: 397.04, overhealing: 0.21 }, // Vivify
      191894: { cpm: 0, avgcast: 0, hps: 322.91, overhealing: 0.39 }, // Gust of Mists
      124682: { cpm: 2.01, avgcast: 7225.97, hps: 322.76, overhealing: 0.83 }, // Enveloping Mist
      116849: { cpm: 0.3, avgcast: 27710.02, hps: 137.51, overhealing: 0.75 }, // Life Cocoon
      /*
      124682: { casts: 9, healing: 165317, hps: 1183.8 }, // EnV
      116670: { casts: 13, healing: 143871, hps: 1030.2 }, // Vivify
      115310: { casts: 1, healing: 123536, hps: 884.6 }, // Revival
      191894: { casts: 0, healing: 123408, hps: 883.7 }, // Gust of Mists
      325209: { casts: 0, healing: 116780, hps: 836.2 }, // Enveloping Breath
      191840: { casts: 15, healing: 109532, hps: 784.3 }, // Essence Font
      119611: { casts: 14, healing: 106834, hps: 765 }, // Renewing Mist
      274909: { casts: 0, healing: 26087, hps: 186.8 }, // Rising Mist
      116849: { casts: 1, healing: 25454, hps: 182.3 }, // Life Cocoon
      0: { casts: 1, healing: 13857, hps: 99.2 }, // Weapons of Order
      115175: { casts: 4, healing: 11977, hps: 85.8 },
      */
    };
  } else if (contentType === "Dungeon") {
    spellList = {
      196725: { cpm: 52.31, avgcast: 1742.69, hps: 1515.74, overhealing: 0.14 }, //Refreshing Jade Wind
      191840: { cpm: 2.49, avgcast: 33582.63, hps: 1316.39, overhealing: 0.27 }, // Essence Font
      325209: { cpm: 0, avgcast: 0, hps: 1076.62, overhealing: 0.48 }, // Enveloping Breath
      115310: { cpm: 0.31, avgcast: 168141.11, hps: 878.24, overhealing: 0.35 }, // Revival
      119611: { cpm: 5.41, avgcast: 6911.81, hps: 623.78, overhealing: 0.35 }, // Renewing Mist
      274909: { cpm: 0, avgcast: 0, hps: 409.03, overhealing: 0.47 }, // Rising Mist
      116670: { cpm: 2.49, avgcast: 9737.92, hps: 397.04, overhealing: 0.21 }, // Vivify
      191894: { cpm: 0, avgcast: 0, hps: 322.91, overhealing: 0.39 }, // Gust of Mists
      124682: { cpm: 2.01, avgcast: 7225.97, hps: 322.76, overhealing: 0.83 }, // Enveloping Mist
      116849: { cpm: 0.3, avgcast: 27710.02, hps: 137.51, overhealing: 0.75 }, // Life Cocoon
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
    haste: 1.25,
    crit: 1.157,
    mastery: 0.453,
    versatility: 1.076,
    leech: 0.4,
  };
  statWeights.Dungeon = {
    intellect: 1,
    haste: 1.1,
    crit: 1.01,
    mastery: 0.95,
    versatility: 1.0,
    leech: 0.38,
  };

  return statWeights[contentType];
};
