import { runMistweaverMonkCastProfile } from "Retail/Engine/EffectFormulas/Monk/MistweaverCastProfile";

export const chijiSpellData = (contentType) => {
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


export const runChijiCastModel = (itemSet, setStats, castModel, effectList) => {
  const settings = {masteryEfficiency: 1, includeOverheal: true, reporting: false};
  const playerData = { spec: "Mistweaver Monk", settings: settings, stats: setStats, tier: [] }
  const result = runMistweaverMonkCastProfile(playerData);

  return result;
}

export const chijiSpecialQueries = (contentType) => {
  let specialQueries = {};
  if (contentType === "Raid") {
    specialQueries = {
      OneManaHealing: 6.8,
      cooldownMult: {
        c60: 1.44,
        c90: 1,
        c120: 1.115,
        c180: 1,

        oneMinute: 1.48,
        ninetySeconds: 1,
        twoMinutes: 1.15,
        twoMinutesOrb: 1.11,
        threeMinutes: 1.2,
      },
      HoldYourGroundUptime: 0.6
    };
  } else if (contentType === "Dungeon") {
    specialQueries = {
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

export const chijiStatWeights = (contentType) => {
  let statWeights = {};

  statWeights.Raid = {
    intellect: 1,
    haste: 1.21,
    crit: 1.063,
    mastery: 1.012,
    versatility: 1.066,
    leech: 0.4,
  };
  statWeights.Dungeon = { // Unused
    intellect: 1,
    haste: 0.88,
    crit: 0.801,
    mastery: 0.66,
    versatility: 0.814,
    leech: 0.38,
  };

  return statWeights[contentType];
};
