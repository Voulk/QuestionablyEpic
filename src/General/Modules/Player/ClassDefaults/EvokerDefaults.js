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
  
  export const evokerDefaultStatWeights = (contentType) => {
    let statWeights = {};
  
    statWeights.Raid = {
      intellect: 1,
      haste: 0.4, 
      crit: 0.51, 
      mastery: 0.682, 
      versatility: 0.501, 
      leech: 0.53,
      defaults: true,
    };
    statWeights.Dungeon = {
      intellect: 1,
      haste: 0.535,
      crit: 0.531,
      mastery: 0.454,
      versatility: 0.51,
      leech: 0.4,
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
          c90: 1.2,
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
  