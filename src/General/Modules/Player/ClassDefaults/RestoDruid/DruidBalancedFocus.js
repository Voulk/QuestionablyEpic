export const druidBalancedSpellData = (contentType) => {
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

export const druidBalancedStatWeights = (contentType) => {
  let statWeights = {};

  statWeights.Raid = { // Unused.
    intellect: 1,
    haste: 0.663, 
    crit: 0.524, 
    mastery: 0.556, 
    versatility: 0.53,
    leech: 0.43,
    defaults: true,
  };
  statWeights.Dungeon = { // Balanced DPS / HPS focus.
    intellect: 1,
    haste: 0.9,
    crit: 0.72,
    mastery: 0.7,
    versatility: 0.74,
    leech: 0.34,
    defaults: true,
  };

  return statWeights[contentType];
};

export const druidBalancedSpecialQueries = (contentType) => {
  let specialQueries = {};
  if (contentType === "Raid") {
    specialQueries = {
      chilledClarityExtension: 33000,
      ConvokeChannelHPS: 480,
      OneManaHealing: 9.55,
      CastsPerMinute: 32, // ONLY tracks spells with a mana cost.
      cooldownMult: {
        c60: 1.1,
        c90: 1,
        c120: 1.05,
        c180: 1,

        oneMinute: 1.4, // 1.7 once 4pc,
        ninetySeconds: 1.12,
        twoMinutes: 1.4,
        twoMinutesOrb: 1.1,
        threeMinutes: 1.2,
      },
      HoldYourGroundUptime: 0.8
    };
  } else if (contentType === "Dungeon") {
    specialQueries = {
      ConvokeChannelHPS: 460,
      OneManaHealing: 1.2,
      CastsPerMinute: 30,
      cooldownMult: {
        c60: 1,
        c90: 1.1,
        c120: 1,
        c180: 1,

        oneMinute: 1.2,
        ninetySeconds: 1,
        twoMinutes: 1.35,
        twoMinutesOrb: 0.85, // There is no practical way to use Orb to it's maximum potential in dungeons.
        threeMinutes: 1,
      },
      HoldYourGroundUptime: 0.8
    };
  } else {
    console.error("Unknown Content Type");
  }

  return specialQueries;
};
