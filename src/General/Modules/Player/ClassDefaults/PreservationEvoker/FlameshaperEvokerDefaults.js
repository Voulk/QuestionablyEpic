import { scoreEvokerSet } from "General/Modules/Player/ClassDefaults/PreservationEvoker/PreservationEvokerProfile"

export const evokerDefaultSpellData = (contentType) => {
    let spellList = {};
    if (contentType === "Raid") {
      spellList = {

      };
    } else if (contentType === "Dungeon") {
      spellList = {

      };
    } else {
      console.error("Unknown Content Type");
    }
  
    return spellList;
  };

  export const runFlameshaperCastModel = (itemSet, setStats, castModel, effectList) => {
    const settings = {masteryEfficiency: 0.85, includeOverheal: true, reporting: false};
    const playerData = { spec: "Preservation Evoker", heroTree: "Chronowarden", settings: settings, stats: setStats, tierSets: ["S1-2", "S1-4"], effectList: effectList,
      masteryEffectiveness: 0.9};

    const result = scoreEvokerSet(setStats, playerData, settings);

    return result;
  }
  
  export const evokerDefaultStatWeights = (contentType) => {
    let statWeights = {};
  
    statWeights.Raid = {
      intellect: 1,
      haste: 0.4, 
      crit: 0.37, 
      mastery: 0.5, 
      versatility: 0.33, 
      leech: 0.55,
      defaults: true,
    };
    statWeights.Dungeon = {
      intellect: 1,
      haste: 0.695,
      crit: 0.735,
      mastery: 0.74,
      versatility: 0.68,
      leech: 0.48,
      defaults: true,
    };
  
    return statWeights[contentType];
  };
  
  export const evokerDefaultSpecialQueries = (contentType) => {
    let specialQueries = {};
    if (contentType === "Raid") {
      specialQueries = {
        OneManaHealing: 11,
        chilledClarityExtension: 32000,
        CastsPerMinute: 22, // ONLY tracks spells with a mana cost.
        cooldownMult: {
          c30: 1.1,
          c60: 1,
          c90: 1.3,
          c120: 1.1,
          c180: 1,

          oneMinute: 1, 
          ninetySeconds: 1,
          twoMinutes: 1,
          twoMinutesOrb: 0.85, // It is tough to get value in Prepatch.
          threeMinutes: 1,
        },
        HoldYourGroundUptime: 0.8
      };
    } else if (contentType === "Dungeon") {
      specialQueries = {
        ConvokeChannelHPS: 460,
        OneManaHealing: 1.2,
        CastsPerMinute: 30,
        cooldownMult: {
          c30: 1.1,
          c60: 1,
          c90: 1.15,
          c120: 1,
          c180: 1,

          oneMinute: 1,
          ninetySeconds: 1,
          twoMinutes: 1,
          twoMinutesOrb: 0.7, 
          threeMinutes: 1,
        },
        HoldYourGroundUptime: 0.8
      };
    } else {
      console.error("Unknown Content Type");
    }
  
    return specialQueries;
  };
  