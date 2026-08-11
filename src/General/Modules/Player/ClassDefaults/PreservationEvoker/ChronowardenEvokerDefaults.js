export const chronoDefaultSpellData = (contentType) => {
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

  export const runChronoCastModel = (contentType) => {
    
  }
  
  export const chronoDefaultStatWeights = (contentType) => {
    let statWeights = {};
    // Generated 11/8
    statWeights.Raid = {
      intellect: 1,
      haste: 0.65, 
      crit: 0.78, 
      mastery: 0.8, 
      versatility: 0.53, 
      leech: 0.2,
      defaults: true,
    };
    statWeights.Dungeon = {
      intellect: 1,
      haste: 0.75,
      crit: 0.74,
      mastery: 0.7,
      versatility: 0.55,
      leech: 0.25,
      defaults: true,
    };
  
    return statWeights[contentType];
  };
  
  export const chronoDefaultSpecialQueries = (contentType) => {
    let specialQueries = {};
    if (contentType === "Raid") {
      specialQueries = {
        OneManaHealing: 11,
        CastsPerMinute: 22, // ONLY tracks spells with a mana cost.
        cooldownMult: {
          c30: 1.05,
          c60: 1,
          c90: 1.1,
          c120: 1.1,
          c180: 1,
        },
      };
    } else if (contentType === "Dungeon") {
      specialQueries = {
        OneManaHealing: 1.2,
        CastsPerMinute: 30,
        cooldownMult: {
          c30: 1,
          c60: 1,
          c90: 1,
          c120: 1,
          c180: 1,
        },
      };
    } else {
      console.error("Unknown Content Type");
    }
  
    return specialQueries;
  };
  