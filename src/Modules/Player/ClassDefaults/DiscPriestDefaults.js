export const discPriestDefaultSpellData = (contentType) => {
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

export const discPriestDefaultSpecialQueries = (contentType) => {
  let specialQueries = {};
  if (contentType === "Raid") {
    specialQueries = {
      OneManaHealing: 3.4,
      CastsPerMinute: 36,
    };
  } else if (contentType === "Dungeon") {
    specialQueries = {
      OneManaHealing: 0,
      CastsPerMinute: 30,
    };
  } else {
    console.error("Unknown Content Type");
  }

  return specialQueries;
};

export const discPriestDefaultStatWeights = (contentType) => {
  let statWeights = {};

  statWeights.Raid = {
    intellect: 1,
    haste: 0.36,
    crit: 0.34,
    mastery: 0.34,
    versatility: 0.32,
    leech: 0.4,
  };
  statWeights.Dungeon = {
    intellect: 1,
    haste: 0.38,
    crit: 0.34,
    mastery: 0.3,
    versatility: 0.33,
    leech: 0.21,
  };

  return statWeights[contentType];
};
