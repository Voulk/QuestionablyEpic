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
      haste: 0.59,
      crit: 0.66,
      mastery: 0.84,
      versatility: 0.62,
      leech: 0.81,
      defaults: true,
    };
    statWeights.Dungeon = {
      intellect: 1,
      haste: 0.65,
      crit: 0.62,
      mastery: 0.52,
      versatility: 0.63,
      leech: 0.38,
      defaults: true,
    };
  
    return statWeights[contentType];
  };
  
  export const evokerDefaultSpecialQueries = (contentType) => {
    let specialQueries = {};
    if (contentType === "Raid") {
      specialQueries = {
        OneManaHealing: 14,
        CastsPerMinute: 22, // ONLY tracks spells with a mana cost.
        cooldownMult: {
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
  