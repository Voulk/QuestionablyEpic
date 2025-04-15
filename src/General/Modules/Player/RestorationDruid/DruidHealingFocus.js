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
    crit: 0.565, 
    mastery: 0.972, 
    versatility: 0.82,
    leech: 0.41,
    defaults: true,
  };
  statWeights.Dungeon = {
    intellect: 1,
    haste: 1.03,
    crit: 0.704,
    mastery: 0.872,
    versatility: 0.78,
    leech: 0.35,
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
