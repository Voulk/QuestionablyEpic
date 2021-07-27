export const paladinMaraadsSpellData = (contentType) => {
    let spellList = {};
    if (contentType === "Raid") {
      spellList = {
        225311: { cpm: 8.21, avgcast: 14452, hps: 2498, overhealing: 0.23 }, // Light of Dawn
        85673: { cpm: 1.03, avgcast: 8679, hps: 188, overhealing: 0.28 }, // Word of Glory
        25914: { cpm: 8.94, avgcast: 8242, hps: 1606, overhealing: 0.18 }, // Holy Shock
        82326: { cpm: 0.67, avgcast: 5886, hps: 93, overhealing: 0.5 }, // Holy Light
        337824: { cpm: 0, avgcast: 0, hps: 863, overhealing: 0.21 }, // Shock Barrier
        53652: { cpm: 0.04, avgcast: 127103, hps: 1279, overhealing: 0.44 }, // Beacon of Light
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
          oneMinute: 1.75,
          ninetySeconds: 1,
          twoMinutes: 1.39,
          twoMinutesOrb: 1.31,
          threeMinutes: 1,
        },
        HoldYourGroundUptime: 0.4
      };
    } else if (contentType === "Dungeon") {
      specialQueries = {
        OneManaHealing: 0.7,
        CastsPerMinute: 30,
        cooldownMult: {
          oneMinute: 1.76,
          ninetySeconds: 1,
          twoMinutes: 1.2,
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
  
  export const paladinDefaultStatWeights = (contentType) => {
    let statWeights = {};
  
    statWeights.Raid = {
      intellect: 1,
      haste: 0.41,
      crit: 0.29,
      mastery: 0.39,
      versatility: 0.36,
      leech: 0.57,
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
  