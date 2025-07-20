export const paladinMaraadsSpellData = (contentType) => {
    let spellList = {};
    if (contentType === "Raid") {
      spellList = {
        225311: { cpm: 7.07, avgcast: 15575, hps: 2040, overhealing: 0.37 }, // Light of Dawn
        53652: { cpm: 0.04, avgcast: 87621, hps: 1837, overhealing: 0.58 }, // Beacon of Light
        316958: { cpm: 0.26, avgcast: 230885, hps: 1101, overhealing: 0.69 }, // Ashen Hallow
        25914: { cpm: 6.97, avgcast: 6413, hps: 829, overhealing: 0.28 }, // Holy Shock
        183998: { cpm: 3.65, avgcast: 5801, hps: 1746, overhealing: 0.22 }, // Light of the Martyr
        287268: { cpm: 0, avgcast: 0, hps: 604, overhealing: 0.33 }, // Glimmer of Light
        119952: { cpm: 0, avgcast: 0, hps: 557, overhealing: 0.35 }, // Arcing Light
        183778: { cpm: 0, avgcast: 0, hps: 375, overhealing: 0.06 }, // Judgment of Light
        223306: { cpm: 2.62, avgcast: 4319, hps: 199, overhealing: 0.55 }, // Bestow Faith
        633: { cpm: 0.14, avgcast: 32166, hps: 82, overhealing: 0.44 }, // Lay on Hands
        85673: { cpm: 0.32, avgcast: 10543, hps: 62, overhealing: 0.15 }, // Word of Glory
        82326: { cpm: 0.4, avgcast: 5426, hps: 42, overhealing: 0.35 }, // Holy Light
        19750: { cpm: 0.32, avgcast: 6687, hps: 38, overhealing: 0.21 }, // Flash of Light    
      };
    } else if (contentType === "Dungeon") {
      spellList = {
        225311: { cpm: 1.1, avgcast: 12501, hps: 229, overhealing: 0.29 }, // Light of Dawn
        85673: { cpm: 5.4, avgcast: 9420, hps: 961, overhealing: 0.18 }, // Word of Glory
        25914: { cpm: 7.94, avgcast: 8242, hps: 1406, overhealing: 0.19 }, // Holy Shock
        337824: { cpm: 0, avgcast: 0, hps: 793, overhealing: 0.21 }, // Shock Barrier
        53652: { cpm: 0.04, avgcast: 107423, hps: 1083, overhealing: 0.39 }, // Beacon of Light
      };
    } else {
      console.error("Unknown Content Type");
    }
  
    return spellList;
  };
  
  export const paladinMaraadsSpecialQueries = (contentType) => {
    let specialQueries = {};
    if (contentType === "Raid") {
      specialQueries = {
        OneManaHealing: 1.9,
        CastsPerMinute: 27,
        cooldownMult: {
          oneMinute: 1.2,
          ninetySeconds: 1,
          twoMinutes: 1.22,
          twoMinutesOrb: 1.2,
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
          twoMinutes: 1.24,
          twoMinutesOrb: 1.1,
          threeMinutes: 1,
        },
        HoldYourGroundUptime: 0.35
      };
    } else {
      console.error("Unknown Content Type");
    }
  
    return specialQueries;
  };
  
  export const paladinMaraadsStatWeights = (contentType) => {
    let statWeights = {};
  
    statWeights.Raid = {
      intellect: 1,
      haste: 0.61,
      crit: 0.56,
      mastery: 0.554,
      versatility: 0.54,
      leech: 0.98,
      defaults: true,
    };
    statWeights.Dungeon = {
      intellect: 1,
      haste: 0.41,
      crit: 0.33,
      mastery: 0.24,
      versatility: 0.37,
      leech: 0.38,
      defaults: true,
    };
  
    return statWeights[contentType];
  };
  