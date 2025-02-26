export const druidDefaultSpellData = (contentType) => {
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

export const druidDefaultStatWeights = (contentType) => {
  let statWeights = {};

  statWeights.Raid = {
    intellect: 1,
    haste: 1.06, 
    crit: 0.59, 
    mastery: 0.91, 
    versatility: 0.78,
    leech: 0.42,
    defaults: true,
  };
  statWeights.Dungeon = {
    intellect: 1,
    haste: 1.03,
    crit: 0.734,
    mastery: 0.87,
    versatility: 0.77,
    leech: 0.35,
    defaults: true,
  };

  return statWeights[contentType];
};

export const druidDefaultSpecialQueries = (contentType) => {
  let specialQueries = {};
  if (contentType === "Raid") {
    specialQueries = {
      chilledClarityExtension: 33000,
      ConvokeChannelHPS: 480,
      OneManaHealing: 38, // This is an upper bound already.
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
