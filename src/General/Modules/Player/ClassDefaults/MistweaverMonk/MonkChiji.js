import { runMistweaverMonkCastProfile } from "./MistweaverCastProfile";

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

// Run an on-use trinket through our model to get the amount of HPS it adds. Top Gear can just do this directly,
// but trinket charts need a stronger way to approximate value.
export const modelChijiOnUseTrinket = (setStats, trinketName, trinketLevel ) => {
  const baseline = runChijiCastModel(null, {...setStats, critMult: 2}, null, []).hps;
  const withTrinket = runChijiCastModel(null, {...setStats, critMult: 2}, null, [{name: trinketName, level: trinketLevel}]).hps;
  return withTrinket - baseline
}


export const runChijiCastModel = (itemSet, setStats, castModel, effectList) => {
  const settings = {masteryEfficiency: 1, includeOverheal: true, reporting: false};
  const playerData = { spec: "Mistweaver Monk", settings: settings, stats: setStats, tier: [], effects: effectList }
  const result = runMistweaverMonkCastProfile(playerData);

  return result;
}

export const chijiSpecialQueries = (contentType) => {
  let specialQueries = {};
  if (contentType === "Raid") {
    specialQueries = {
      OneManaHealing: 6.8,
      cooldownMult: {
        c60: 1.16,
        c90: 1,
        c120: 1.75, // This is to match the results from our cast profile.
        c180: 1,
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
    haste: 1.31,
    crit: 1.17,
    mastery: 1.145,
    versatility: 1.1,
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
