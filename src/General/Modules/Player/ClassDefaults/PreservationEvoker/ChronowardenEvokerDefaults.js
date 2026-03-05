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
  
    statWeights.Raid = {
      intellect: 1,
      haste: 0.534, 
      crit: 0.451, 
      mastery: 0.66, 
      versatility: 0.429, 
      leech: 0.25,
      defaults: true,
    };
    statWeights.Dungeon = {
      intellect: 1,
      haste: 0.546,
      crit: 0.434,
      mastery: 0.62,
      versatility: 0.429,
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
  