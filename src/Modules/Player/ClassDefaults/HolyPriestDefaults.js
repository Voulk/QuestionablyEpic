export const holyPriestDefaultSpellData = (contentType) => {
  let spellList = {};
  if (contentType === "Raid") {
    spellList = {};
  } else if (contentType === "Dungeon") {
    spellList = {};
  } else {
    console.error("Unknown Content Type");
  }

  return spellList;
};

export const holyPriestDefaultSpecialQueries = (contentType) => {
  let specialQueries = {};
  if (contentType === "Raid") {
    specialQueries = {
      OneManaHealing: 3.5,
      CastsPerMinute: 28,
    };
  } else if (contentType === "Dungeon") {
    specialQueries = {
      OneManaHealing: 0.4,
      CastsPerMinute: 30,
    };
  } else {
    console.error("Unknown Content Type");
  }

  return specialQueries;
};

export const holyPriestDefaultStatWeights = (contentType) => {
  let statWeights = {};

  statWeights.Raid = {
    intellect: 1,
    haste: 0.28,
    crit: 0.35,
    mastery: 0.35,
    versatility: 0.34,
    leech: 0.56,
  };
  statWeights.Dungeon = {
    intellect: 1,
    haste: 0.32,
    crit: 0.35,
    mastery: 0.28,
    versatility: 0.35,
    leech: 0.25,
  };

  return statWeights[contentType];
};
