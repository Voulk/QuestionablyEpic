const EMBRACE_OF_EARTH = 338329;
const NATURES_FOCUS = 338346;
const HEAVY_RAINFALL = 338343;
const SWIRLING_CURRENTS = 338339;
const ELYSIAN_DIRGE = 339182;
const LAVISH_HARVEST = 339185;
const TUMBING_WAVES = 339186;
const ESSENTIAL_EXTRACTION = 339183;
const ASTRAL_PROTECTION = 337964;
const REFRESHING_WATERS = 337974;
const VITAL_ACCRETION = 337981;

// Conduit Ranks
const SWIRLING_CURRENTS_RANKS = [20, 21, 23, 24, 26, 28, 29, 30, 31, 33, 34, 36, 37, 39, 40];
const HEAVY_RAINFALL_RANKS = [75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135, 140, 145];
const EMBRACE_OF_EARTH_RANKS = [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12];
const NATURES_FOCUS_RANKS = [10, 10.66, 11.33, 12, 12.66, 13.33, 14, 15, 16, 16.66, 17.33, 18, 18.66, 19.33, 20];

export const getShamanConduit = (conduitID, pl, contentType, conduitLevel) => {
  let bonus_stats = {};
  let expectedOverhealing = 0;

  if (conduitID === EMBRACE_OF_EARTH) {
    const trait_bonus = EMBRACE_OF_EARTH_RANKS[conduitLevel];
    const esHPS = pl.getSpellHPS("Healing on Earth Shield", contentType);
    bonus_stats.HPS = esHPS * (trait_bonus / 100);
  } else if (conduitID === HEAVY_RAINFALL) {
    const trait_bonus = HEAVY_RAINFALL_RANKS[conduitLevel];
    const hrHPS = pl.getSpellHPS("Healing Rain", contentType);
    const hrCasts = pl.getSpellCasts("Healing Rain", contentType);
    const httCasts = pl.getSpellCasts("Healing Tide Totem", contentType);
    const buffedCasts = httCasts * 2;
    const avgHRCast = hrHPS / hrCasts;
    bonus_stats.HPS = (buffedCasts * avgHRCast) * (trait_bonus / 100);
  } else if (conduitID === NATURES_FOCUS) {
    const trait_bonus = NATURES_FOCUS_RANKS[conduitLevel];
    const chHPS = pl.getSpellHPS("Chain Heal", contentType);
    const roughInitial = chHPS * 0.4; // 40% is about what the initial hit of the chain heal is doing
    bonus_stats.HPS = roughInitial * 0.1;
  } else if (conduitID === SWIRLING_CURRENTS) {
    const trait_bonus = SWIRLING_CURRENTS_RANKS[conduitLevel];
    const rtHPS = pl.getSpellHPS("Riptide", contentType);
    const rtCasts = pl.getSpellCasts("Riptide", contentType);
    const cbtCasts = pl.getSpellCasts("Cloudburst Totem", contentType);
    const avgRTCast = rtHPS / rtCasts;
    const buffedCasts = cbtCasts * 3;
    // add overhealing, efficiency
    bonus_stats.HPS = (buffedCasts * avgRTCast) * (trait_bonus / 100);
  } else if (conduitID === ELYSIAN_DIRGE) {
    // TODO
  } else if (conduitID === LAVISH_HARVEST) {
    // TODO
  } else if (conduitID === TUMBING_WAVES) {
    // TODO
  } else if (conduitID === ESSENTIAL_EXTRACTION) {
    // TODO
  } else if (conduitID === ASTRAL_PROTECTION) {
    // TODO
  } else if (conduitID === REFRESHING_WATERS) {
    // TODO
  } else if (conduitID === VITAL_ACCRETION) {
    // TODO
  }

  return bonus_stats;
};
