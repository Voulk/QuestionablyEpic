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
      haste: 1.014, 
      crit: 1.33, 
      mastery: 1.44, 
      versatility: 1.15, 
      leech: 0.6,
      defaults: true,
    };
    statWeights.Dungeon = {
      intellect: 1,
      haste: 1.35,
      crit: 1.14,
      mastery: 1.32,
      versatility: 1.15,
      leech: 0.45,
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
          c60: 1,
          c90: 1,
          c120: 1.15,
          c180: 1,
        },
      };
    } else if (contentType === "Dungeon") {
      specialQueries = {
        OneManaHealing: 1.2,
        CastsPerMinute: 30,
        cooldownMult: {
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
  