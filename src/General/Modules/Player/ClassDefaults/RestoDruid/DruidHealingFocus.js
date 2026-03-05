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
    haste: 0.6, 
    crit: 0.39, 
    mastery: 0.565, 
    versatility: 0.43,
    leech: 0.25,
    defaults: true,
  };
  statWeights.Dungeon = {
    intellect: 1,
    haste: 0.56,
    crit: 0.4,
    mastery: 0.58,
    versatility: 0.441,
    leech: 0.2,
    defaults: true,
  };

  return statWeights[contentType];
};

export const druidDefaultSpecialQueries = (contentType) => {
  let specialQueries = {};
  if (contentType === "Raid") {
    specialQueries = {
      ConvokeChannelHPS: 480,
      OneManaHealing: 38, // This is an upper bound already.
      CastsPerMinute: 32, // ONLY tracks spells with a mana cost.
      cooldownMult: {
        c30: 1.1,
        c60: 1.1,
        c90: 1.2,
        c120: 1,
        c180: 1,

      },
    };
  } else if (contentType === "Dungeon") {
    specialQueries = {
      ConvokeChannelHPS: 460,
      OneManaHealing: 1.2,
      CastsPerMinute: 30,
      cooldownMult: {
        c30: 1.1,
        c60: 1,
        c90: 1.2,
        c120: 1,
        c180: 1,
      },
    };
  } else {
    console.error("Unknown Content Type");
  }

  return specialQueries;
};
