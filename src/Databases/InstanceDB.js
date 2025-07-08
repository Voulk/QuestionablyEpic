import { CONSTANTS } from "General/Engine/CONSTANTS"

export const getSeasonalDungeons = () => {
  //return encounterDB['-1']['Retail']['bossOrderMythicPlus']
  return CONSTANTS.currentDungeonIDs;
}

export const getMoPDungeons = () => {
  //return encounterDB['-1']['Retail']['bossOrderMythicPlus']
  return [246, 316, 313, 312, 311, 303, 302, 324, 321];
}

export const instanceDB = {
  "0": "Test Instance",
  "-31": "PVP Season 1 (Conquest)",
  "-30": "PVP Season 1 (Honor)",
  "-1": "Dungeons",
  "1278": "World Bosses",
  "1273": "Nerub-ar Palace",
  "1296": "Liberation of Undermine",

  "-4": "Crafted",

  // Classic specific
  "369": "Siege of Orgrimmer",
  "362": "Throne of Thunder",
  "330": "Heart of Fear",
  "321": "Mogu'shan Vaults",
  "324": "Terrace of Endless Spring",
  "-5": "Justice",
  "-6": "Valor",
  "-8": "Elemental Rune Twilight",
};

export const craftedDB = {
  1: "Tailoring",
  2: "Leatherworking",
  3: "Blacksmithing",
  4: "Engineering",
  5: "Inscription",
  6: "Alchemy",
  7: "Jewelcrafting",
}


export const retailInstanceDB = {
  /* ---------------------------------------------------------------------------------------------- */
  /*                                              Raids                                             */
  /* ---------------------------------------------------------------------------------------------- */
  // Nerub'ar Palace
  1273: {
    name: "Nerub'ar Palace",
    bossOrder: [2607, 2611, 2599, 2609, 2612, 2601, 2608, 2602, -54],
    bosses: {
      2607: "Ulgrax the Devourer",
      2611: "Bloodbound Horror",
      2599: "Sikran, Captain of the Sureki",
      2609: "Rasha'nan",
      2612: "Broodtwister Ovi'nax",
      2601: "Nexus-Princess Ky'veza",
      2608: "The Silken Court",
      2602: "Queen Ansurek",
    }
  },
    // Undermine
    1296: {
      name: "Liberation of Undermine",
      bossOrder: [2639, 2640, 2641, 2642, 2653, 2644, 2645, 2646, 999],
      bosses: {
        2639: "Vexie and the Geargrinders", // Vexie and the Geargrinders.
        2640: "Cauldron of Carnage", // Cauldron of Carnage
        2641: "Rik Reverb", // Rik Reverb
        2642: "Stix Bunkjunker", // Stix Bunkjunker
        2653: "Sprocketmonger Lockenstock", // Sprocketmonger Lockenstock
        2644: "One Armed Bandit", // One Armed Bandit
        2645: "Mug'zee", // Mug'Zee
        2646: "Chrome King Gallywix", // Chrome King Gallywix
        999: "BoE Trash Drops & Catalyst",
      }
    },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                            Dungeons                                            */
  /* ---------------------------------------------------------------------------------------------- */
  "-1": {
    "Retail": {
      bossOrder: [], // Optionally used for M0s when we want to show both. Rare outside of the first season of a new expansion.
      bossOrderMythicPlus: [1178, 1012, 1187, 1298, 1210, 1267, 1272, 1268],

      // M+ season 2
      1210: "Darkflame Cleft",
      1272: "Cinderbrew Meadery",
      1268: "The Rookery",
      1267: "Priory of the Sacred Flame",
      1012: "Motherlode",
      1178: "Mechagon: Workshop",
      1298: "Operation Floodgate",
      1187: "Theater of Pain",

      // M+ Season 1 - Keep around in case they re-use.
      1271: "Ara-kara, City of Echoes", 
      1274: "City of Threads", 
      1270: "The Dawnbreaker",
      1269: "The Stonevault",
      1184: "Mists of Tirna Scithe",
      1182: "The Necrotic Wake",
      1023: "Siege of Boralus",
      71: "Grim Batol",

    "Classic": {
      //# 316 = Scarlet Monastery, 313 = Jade Temple, 312 = Shadowpan Monastary, 311 = Scarlet Halls, 303 = Gate of Setting Sun, 302 = Stormstout, 324 = Siege of Niuzao.
      bossOrderMythicPlus: [246, 316, 313, 312, 311, 303, 302, 324, 321], // Dungeon Order
      // TODO
      316: "Scarlet Monastery",
      313: "Temple of the Jade Serpent",
      312: "Shadowpan Monastery",
      311: "Scarlet Halls",
      303: "Gate of the Setting Sun",
      302: "Stormstout Brewery",
      324: "Siege of Niuzao Temple",
      321: "Mogu'shan Palace",
      246: "Scholomance",
      },
    }
  },
}

const classicInstanceDB = {
  330: {
    name: "Heart of Fear",
    bossOrder: [745],
    bosses: {
      745: "Imperial Vizier Zor'lok",
    }
  },
}

export const encounterDB = {
  ...classicInstanceDB,
  ...retailInstanceDB,
}