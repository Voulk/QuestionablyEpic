export const paladinNecrolordSpellData = (contentType) => {
    let spellList = {};
    if (contentType === "Raid") {
      spellList = {
        225311: { cpm: 3.75, avgcast: 51763, hps: 3434, overhealing: 0.46 }, // Light of Dawn
        325983: { cpm: 0.01, avgcast: 57756, hps: 3233, overhealing: 0.59 }, // Beacon of Light
        183998: { cpm: 7.6, avgcast: 14550, hps: 1950, overhealing: 0.23 }, // Light of the Martyr
        85673: { cpm: 3.64, avgcast: 14422, hps: 984, overhealing: 0.27 }, // Word of Glory
        25914: { cpm: 6.14, avgcast: 7758, hps: 881, overhealing: 0.29 }, // Holy Shock
        119952: { cpm: 0, avgcast: 0, hps: 520, overhealing: 0.44 }, // Arcing Light
        183778: { cpm: 0, avgcast: 0, hps: 431, overhealing: 0.07 }, // Judgment of Light
        223306: { cpm: 2.66, avgcast: 5472, hps: 269, overhealing: 0.57 }, // Bestow Faith
        633: { cpm: 0.15, avgcast: 46928, hps: 133, overhealing: 0.42 }, // Lay on Hands
        19750: { cpm: 0.36, avgcast: 10594, hps: 65, overhealing: 0.07 }, // Flash of Light
        82326: { cpm: 0.36, avgcast: 6572, hps: 52, overhealing: 0.64 }, // Holy Light
      };
    } else if (contentType === "Dungeon") {
      spellList = {
        225311: { cpm: 3.75, avgcast: 51763, hps: 3434, overhealing: 0.46 }, // Light of Dawn
        325983: { cpm: 0.01, avgcast: 57756, hps: 3233, overhealing: 0.59 }, // Beacon of Light
        183998: { cpm: 3.76, avgcast: 8179, hps: 1134, overhealing: 0.23 }, // Light of the Martyr
        85673: { cpm: 3.64, avgcast: 14422, hps: 984, overhealing: 0.27 }, // Word of Glory
        25914: { cpm: 6.14, avgcast: 7758, hps: 881, overhealing: 0.29 }, // Holy Shock
        119952: { cpm: 0, avgcast: 0, hps: 520, overhealing: 0.44 }, // Arcing Light
        183778: { cpm: 0, avgcast: 0, hps: 431, overhealing: 0.07 }, // Judgment of Light
        223306: { cpm: 2.66, avgcast: 5472, hps: 269, overhealing: 0.57 }, // Bestow Faith
        633: { cpm: 0.15, avgcast: 46928, hps: 133, overhealing: 0.42 }, // Lay on Hands
        19750: { cpm: 0.36, avgcast: 10594, hps: 65, overhealing: 0.07 }, // Flash of Light
        82326: { cpm: 0.36, avgcast: 6572, hps: 52, overhealing: 0.64 }, // Holy Light
      };
    } else {
      console.error("Unknown Content Type");
    }
  
    return spellList;
  };
  
  export const paladinNecrolordSpecialQueries = (contentType) => {
    let specialQueries = {};
    if (contentType === "Raid") {
      specialQueries = {
        OneManaHealing: 1.9,
        CastsPerMinute: 27,
        cooldownMult: {
          oneMinute: 1.1,
          ninetySeconds: 1.1,
          twoMinutes: 1.12,
          twoMinutesOrb: 1.04,
          threeMinutes: 1,
        },
        HoldYourGroundUptime: 0.4
      };
    } else if (contentType === "Dungeon") {
      specialQueries = {
        OneManaHealing: 0.7,
        CastsPerMinute: 30,
        cooldownMult: {
          oneMinute: 1.2,
          ninetySeconds: 1,
          twoMinutes: 1.04,
          twoMinutesOrb: 1,
          threeMinutes: 1,
        },
        HoldYourGroundUptime: 0.35
      };
    } else {
      console.error("Unknown Content Type");
    }
  
    return specialQueries;
  };
  
  export const paladinNecrolordStatWeights = (contentType) => {
    let statWeights = {};
  
    statWeights.Raid = {
      intellect: 1,
      haste: 0.62,
      crit: 0.51,
      mastery: 0.61,
      versatility: 0.56,
      leech: 0.96,
      defaults: true,
    };
    statWeights.Dungeon = {
      intellect: 1,
      haste: 0.41,
      crit: 0.33,
      mastery: 0.24,
      versatility: 0.38,
      leech: 0.38,
      defaults: true,
    };
  
    return statWeights[contentType];
  };
  