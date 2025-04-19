import { runPreservationEvokerCastProfileEchoshaper } from "General/Modules/Player/ClassDefaults/PreservationEvoker/PreservationEvokerProfileEchoshaper"

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
    const playerData = { spec: "Preservation Evoker", settings: settings, stats: setStats, tier: ["S1-2", "S1-4"] }
    const result = runPreservationEvokerCastProfileEchoshaper(playerData);

    return result;
  }
  
  export const evokerDefaultStatWeights = (contentType) => {
    let statWeights = {};
  
    statWeights.Raid = {
      intellect: 1,
      haste: 0.87, 
      crit: 0.94, 
      mastery: 1.04, 
      versatility: 0.82, 
      leech: 0.5,
      defaults: true,
    };
    statWeights.Dungeon = {
      intellect: 1,
      haste: 0.695,
      crit: 0.735,
      mastery: 0.74,
      versatility: 0.68,
      leech: 0.42,
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
          c60: 1,
          c90: 1.25,
          c120: 1.15,
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
  