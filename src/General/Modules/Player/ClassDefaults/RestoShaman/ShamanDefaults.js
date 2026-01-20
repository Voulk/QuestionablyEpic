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
          c120: 1.25,
          c180: 1.1,
  
          oneMinute: 1.1,
          ninetySeconds: 1,
          twoMinutes: 1.18,
          twoMinutesOrb: 1.06,
          threeMinutes: 1.25,
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
          c120: 1.2,
          c180: 1,
  
          oneMinute: 1.1,
          ninetySeconds: 1,
          twoMinutes: 1.1,
          twoMinutesOrb: 1.1,
          threeMinutes: 1.1,
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
      haste: 0.64,
      crit: 0.62,
      mastery: 0.45,
      versatility: 0.51,
      leech: 0.24,
    };
    statWeights.Dungeon = {
      intellect: 1,
      haste: 0.64,
      crit: 0.62,
      mastery: 0.45,
      versatility: 0.51,
      leech: 0.24,
    };
  
    return statWeights[contentType];
  };