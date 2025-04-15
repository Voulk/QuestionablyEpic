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
      haste: 0.54, 
      crit: 0.74, 
      mastery: 0.83, 
      versatility: 0.685, 
      leech: 0.44,
      defaults: true,
    };
    statWeights.Dungeon = {
      intellect: 1,
      haste: 0.79,
      crit: 0.75,
      mastery: 0.88,
      versatility: 0.71,
      leech: 0.42,
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
  