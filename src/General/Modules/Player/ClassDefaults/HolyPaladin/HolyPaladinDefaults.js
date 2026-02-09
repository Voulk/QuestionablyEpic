import { scorePaladinSet } from "./HolyPaladinProfile";

export const paladinDefaultSpellData = (contentType) => {
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

  export const runPaladinCastModel = (itemSet, setStats, castModel, effectList) => {
    const settings = {masteryEfficiency: 0.85, includeOverheal: true, reporting: false};
    const playerData = { spec: "Holy Paladin", settings: settings, stats: setStats, tier: ["Holy Paladin S1-2", "Holy Paladin S1-4"], effectList: effectList }
    const result = scorePaladinSet(setStats, playerData, settings);

    return result;
  }
  
  export const paladinDefaultStatWeights = (contentType) => {
    let statWeights = {};
  
    statWeights.Raid = {
      intellect: 1,
      haste: 1.27, 
      crit: 1.3, 
      mastery: 1.45, 
      versatility: 1.10, 
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
  
  export const paladinDefaultSpecialQueries = (contentType) => {
    let specialQueries = {};
    if (contentType === "Raid") {
      specialQueries = {
        OneManaHealing: 11,
        CastsPerMinute: 22, // ONLY tracks spells with a mana cost.
        cooldownMult: {
          c30: 1.1,
          c60: 1,
          c90: 1.37,
          c120: 1.1,
          c180: 1,
        },
      };
    } else if (contentType === "Dungeon") {
      specialQueries = {
        OneManaHealing: 1.2,
        CastsPerMinute: 30,
        cooldownMult: {
          c30: 1.1,
          c60: 1,
          c90: 1.15,
          c120: 1,
          c180: 1,
        },
      };
    } else {
      console.error("Unknown Content Type");
    }
  
    return specialQueries;
  };
  