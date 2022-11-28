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
      haste: 0.32,
      crit: 0.4,
      mastery: 0.42,
      versatility: 0.34,
      leech: 0.64,
      defaults: true,
    };
    statWeights.Dungeon = {
      intellect: 1,
      haste: 0.4,
      crit: 0.32,
      mastery: 0.37,
      versatility: 0.34,
      leech: 0.38,
      defaults: true,
    };
  
    return statWeights[contentType];
  };
  
  export const evokerDefaultSpecialQueries = (contentType) => {
    let specialQueries = {};
    if (contentType === "Raid") {
      specialQueries = {
        OneManaHealing: 11,
        CastsPerMinute: 22, // ONLY tracks spells with a mana cost.
        cooldownMult: {
          c60: 1,
          c90: 1,
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
  