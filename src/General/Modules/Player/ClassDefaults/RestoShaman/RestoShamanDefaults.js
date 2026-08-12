export const shamanDefaultSpellData = (contentType) => {
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
  
  export const shamanDefaultSpecialQueries = (contentType) => {
    let specialQueries = {};
    if (contentType === "Raid") {
      specialQueries = {
        HPSOnEarthShield: 456,
        OneManaHealing: 1.2,
        CastsPerMinute: 24,
        cooldownMult: {
          c60: 1,
          c90: 1,
          c120: 1,
          c180: 1,
  
        },
        HoldYourGroundUptime: 0.8
      };
    } else if (contentType === "Dungeon") {
      specialQueries = {
        HPSOnEarthShield: 456,
        OneManaHealing: 0.4,
        CastsPerMinute: 30,
        cooldownMult: {
          c60: 1,
          c90: 1,
          c120: 1,
          c180: 1,
  
        },
        HoldYourGroundUptime: 0.8
      };
    } else {
      console.error("Unknown Content Type");
    }
  
    return specialQueries;
  };
  
  export const shamanDefaultStatWeights = (contentType) => {
    let statWeights = {};
  
    statWeights.Raid = {
      intellect: 1,
      haste: 0.45,
      crit: 0.8,
      mastery: 0.55,
      versatility: 0.55,
      leech: 0.2,
    };
    statWeights.Dungeon = {
      intellect: 1,
      haste: 0.58,
      crit: 0.76,
      mastery: 0.54,
      versatility: 0.55,
      leech: 0.2,
    };
  
    return statWeights[contentType];
  };