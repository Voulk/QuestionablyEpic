export const monkDefaultSpellData = (contentType) => {
  let spellList = {};
  if (contentType === "Raid") {
    spellList = {
      124682: { casts: 9, healing: 165317, hps: 1183.8 }, // EnV
      116670: { casts: 13, healing: 143871, hps: 1030.2 }, // Vivify
      115310: { casts: 1, healing: 123536, hps: 884.6 }, // Revival
      117907: { casts: 0, healing: 123408, hps: 883.7 }, // Gust of Mists
      343655: { casts: 0, healing: 116780, hps: 836.2 }, // Enveloping Breath
      191840: { casts: 15, healing: 109532, hps: 784.3 }, // Essence Font
      119611: { casts: 14, healing: 106834, hps: 765 }, // Renewing Mist
      274909: { casts: 0, healing: 26087, hps: 186.8 }, // Rising Mist
      116849: { casts: 1, healing: 25454, hps: 182.3 }, // Life Cocoon
      0: { casts: 1, healing: 13857, hps: 99.2 }, // Weapons of Order
      115175: { casts: 4, healing: 11977, hps: 85.8 },
    };
  } else if (contentType === "Dungeon") {
    spellList = {
      124682: { casts: 11, healing: 165317, hps: 1183.8 }, // EnV
      116670: { casts: 13, healing: 143871, hps: 1030.2 }, // Vivify
      115310: { casts: 1, healing: 123536, hps: 884.6 }, // Revival
      117907: { casts: 0, healing: 123408, hps: 883.7 }, // Gust of Mists
      343655: { casts: 0, healing: 116780, hps: 836.2 }, // Enveloping Breath
      191840: { casts: 14, healing: 109532, hps: 784.3 }, // Essence Font
      119611: { casts: 14, healing: 106834, hps: 765 }, // Renewing Mist
      274909: { casts: 0, healing: 26087, hps: 186.8 }, // Rising Mist
      116849: { casts: 1, healing: 25454, hps: 182.3 }, // Life Cocoon
      0: { casts: 1, healing: 13857, hps: 99.2 }, // Weapons of Order
      115175: { casts: 4, healing: 11977, hps: 85.8 },
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
      OneManaHealing: 4.2,
      cooldownMult: {
        oneMinute: 1.4,
        twoMinutes: 1,
        threeMinutes: 1.2,
      }
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
        oneMinute: 1.4,
        twoMinutes: 1,
        threeMinutes: 1.2,
      }
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
    haste: 0.29,
    crit: 0.35,
    mastery: 0.28,
    versatility: 0.34,
    leech: 0.54,
  };
  statWeights.Dungeon = {
    intellect: 1,
    haste: 0.34,
    crit: 0.35,
    mastery: 0.29,
    versatility: 0.35,
    leech: 0.25,
  };

  return statWeights[contentType];
};
