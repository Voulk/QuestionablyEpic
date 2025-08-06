import { allRamps, allRampsHealing } from "./DiscRampUtilities";
import { DISCSPELLS, baseTalents } from "./DiscSpellDB";

export const discPriestOracleSpellData = (contentType) => {
  let spellList = {};
  if (contentType === "Raid") {
    spellList = {};
  } else if (contentType === "Dungeon") {
    spellList = {};
  } else {
    console.error("Unknown Content Type");
  }

  return spellList;
};

// Run an on-use trinket through our model to get the amount of HPS it adds. Top Gear can just do this directly,
// but trinket charts need a stronger way to approximate value.
export const modelOracleOnUseTrinket = (setStats, trinketName, trinketLevel ) => {
  const baseline = allRampsHealing([], setStats, {}, baseTalents, []);
  const withTrinket = allRampsHealing([], setStats, {}, baseTalents, [{name: trinketName, level: trinketLevel}])
  //const withTrinket = runChijiCastModel(null, {...setStats, critMult: 2}, null, [{name: trinketName, level: trinketLevel}]).hps;

  return (withTrinket - baseline) / 60;
}


export const runOracleCastModel = (itemSet, setStats, castModel, effectList) => {
  const settings = {masteryEfficiency: 1, includeOverheal: true, reporting: false};
  const playerData = { spec: "Discipline Priest", settings: settings, stats: setStats, tier: [], effects: effectList }
  const result = allRampsHealing([], setStats, {}, baseTalents, [])
  //const result = runMistweaverMonkCastProfile(playerData);
  return {hps: result};
}

export const discPriestOracleSpecialQueries = (contentType) => {
  let specialQueries = {};
  if (contentType === "Raid") {
    specialQueries = {
      OneManaHealing: 8.1,
      CastsPerMinute: 36,
      cooldownMult: {
        c60: 1,
        c90: 1.9,
        c120: 1,
        c180: 1,
      },
      rampData: {},
    };
  } else if (contentType === "Dungeon") {
    specialQueries = {
      OneManaHealing: 0,
      CastsPerMinute: 30,
      cooldownMult: {
        c60: 1,
        c90: 1.1,
        c120: 1.1,
        c180: 1.05,

      },
      rampData: {},
    };
  } else {
    console.error("Unknown Content Type");
  }

  return specialQueries;
};

export const discPriestOracleStatWeights = (contentType) => {
  let statWeights = {};

  statWeights.Raid = {
    intellect: 1,
    haste: 1.2,
    crit: 1.32,
    mastery: 1.275,
    versatility: 1.11,
    leech: 0.54,
  };
  statWeights.Dungeon = {
    intellect: 1,
    haste: 1.2163,
    crit: 1.314,
    mastery: 1.27,
    versatility: 1.101,
    leech: 0.45,
  };

  return statWeights[contentType];
};
