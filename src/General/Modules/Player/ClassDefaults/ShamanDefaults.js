export const shamanDefaultSpellData = (contentType) => {
  let spellList = {};
  if (contentType === "Raid") {
    spellList = {
      61295: { cpm: 8.54, avgcast: 13669.07, hps: 1946.6, overhealing: 0.31 }, // Riptide
      73921: { cpm: 3.04, avgcast: 28172.53, hps: 1427.49, overhealing: 0.14 }, // Healing Rain
      157153: { cpm: 0, avgcast: 0, hps: 1124.54, overhealing: 0.29 }, // Cloudburst
      77472: { cpm: 4.9, avgcast: 13123.05, hps: 1041.2, overhealing: 0.4 }, // Healing Wave
      197995: { cpm: 1.75, avgcast: 31505.65, hps: 916.64, overhealing: 0.2 }, // Wellspring
      108280: { cpm: 0.32, avgcast: 153509.64, hps: 809.93, overhealing: 0.48 }, // Healing Tide Totem
      198838: { cpm: 0.86, avgcast: 45491.99, hps: 652.06, overhealing: 0 }, // Earthen Wall Totem
      114083: { cpm: 0, avgcast: 0, hps: 376.65, overhealing: 0.48 }, // Restorative Mists
      1064: { cpm: 4.6, avgcast: 17707.14, hps: 340.07, overhealing: 0.11 }, // Chain Heal
      73685: { cpm: 2.51, avgcast: 5801.98, hps: 244.09, overhealing: 0.13 }, // Unleash Life
      20473: { cpm: 0.98, avgcast: 10982.28, hps: 177.17, overhealing: 0.16 }, // Healing Surge
      974: { cpm: 0.96, avgcast: 10973.11, hps: 167.69, overhealing: 0.1 }, // Earth Shield

      /*
      61295: { casts: 66, healing: 693600, hps: 1491 }, // Riptide
      157153: { casts: 14, healing: 0, hps: 0 }, // Cloudburst
      73921: { casts: 18, healing: 450000, hps: 967 }, // Healing Rain
      108280: { casts: 2, healing: 0, hps: 0 }, // Healing Tide Totem
      85222: { casts: 16, healing: 288000, hps: 621 }, // Chain Heal
      16191: { casts: 2, healing: 0, hps: 0 }, // Mana Tide Totem
      20473: { casts: 20, healing: 0, hps: 0 }, // Healing Surge
      */
    };
  } else if (contentType === "Dungeon") {
    spellList = {
      /*
      61295: { casts: 66, healing: 693600, hps: 1491 },
      157153: { casts: 14, healing: 0, hps: 0 },
      73921: { casts: 18, healing: 450000, hps: 967 },
      108280: { casts: 2, healing: 0, hps: 0 },
      85222: { casts: 4, healing: 74000, hps: 141 },
      16191: { casts: 2, healing: 0, hps: 0 },
      20473: { casts: 40, healing: 0, hps: 0 }, // Healing Surge
      */

      61295: { cpm: 8.54, avgcast: 13669.07, hps: 1946.6, overhealing: 0.31 }, // Riptide
      73921: { cpm: 3.04, avgcast: 28172.53, hps: 1427.49, overhealing: 0.14 }, // Healing Rain
      157153: { cpm: 0, avgcast: 0, hps: 1124.54, overhealing: 0.29 }, // Cloudburst
      77472: { cpm: 4.9, avgcast: 13123.05, hps: 1041.2, overhealing: 0.4 }, // Healing Wave
      197995: { cpm: 1.75, avgcast: 31505.65, hps: 916.64, overhealing: 0.2 }, // Wellspring
      108280: { cpm: 0.32, avgcast: 153509.64, hps: 809.93, overhealing: 0.48 }, // Healing Tide Totem
      198838: { cpm: 0.86, avgcast: 45491.99, hps: 652.06, overhealing: 0 }, // Earthen Wall Totem
      114083: { cpm: 0, avgcast: 0, hps: 376.65, overhealing: 0.48 }, // Restorative Mists
      85222: { cpm: 1.12, avgcast: 17707.14, hps: 340.07, overhealing: 0.11 }, // Chain Heal
      73685: { cpm: 2.51, avgcast: 5801.98, hps: 244.09, overhealing: 0.13 }, // Unleash Life
      20473: { cpm: 0.98, avgcast: 10982.28, hps: 177.17, overhealing: 0.16 }, // Healing Surge
      974: { cpm: 0.96, avgcast: 10973.11, hps: 167.69, overhealing: 0.1 }, // Earth Shield
    };
  } else {
    console.error("Unknown Content Type");
  }

  return spellList;
};

export const shamanDefaultSpecialQueries = (contentType) => {
  let specialQueries = {};
  if (contentType === "Raid") {
    specialQueries = {
      HPSOnEarthShield: 456,
      OneManaHealing: 1.2,
      CastsPerMinute: 24,
      cooldownMult: {
        c60: 1,
        c90: 1,
        c120: 1,
        c180: 1.1,

        oneMinute: 1.1,
        ninetySeconds: 1,
        twoMinutes: 1.18,
        twoMinutesOrb: 1.06,
        threeMinutes: 1.25,
      },
      HoldYourGroundUptime: 0.8
    };
  } else if (contentType === "Dungeon") {
    specialQueries = {
      HPSOnEarthShield: 456,
      OneManaHealing: 0.4,
      CastsPerMinute: 30,
      cooldownMult: {
        c60: 1,
        c90: 1,
        c120: 1,
        c180: 1,

        oneMinute: 1.1,
        ninetySeconds: 1,
        twoMinutes: 1.1,
        twoMinutesOrb: 1.1,
        threeMinutes: 1.1,
      },
      HoldYourGroundUptime: 0.8
    };
  } else {
    console.error("Unknown Content Type");
  }

  return specialQueries;
};

export const shamanDefaultStatWeights = (contentType) => {
  let statWeights = {};

  statWeights.Raid = {
    intellect: 1,
    haste: 0.85,
    crit: 1.05,
    mastery: 0.7,
    versatility: 0.95,
    leech: 0.48,
  };
  statWeights.Dungeon = {
    intellect: 1,
    haste: 0.83,
    crit: 1.03,
    mastery: 0.5,
    versatility: 0.97,
    leech: 0.34,
  };

  return statWeights[contentType];
};
