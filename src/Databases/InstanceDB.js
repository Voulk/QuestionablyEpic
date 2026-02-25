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
  "1312": "World Bosses",
  "1314": "Dreamrift",
  "1307": "The Voidspire",
  "1308": "March on Quel'Danas",
  "1273": "Nerub-ar Palace",
  "1296": "Liberation of Undermine",

  "-4": "Crafted",
  "-12": "Reputation",
  "-14": "Timewalking",

  // Classic specific
  "369": "Siege of Orgrimmer",
  "362": "Throne of Thunder",
  "330": "Heart of Fear",
  "317": "Mogu'shan Vaults",
  "320": "Terrace of Endless Spring",
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

export const reputationDB = {
  1: "Klaxxi",
  2: "Golden Lotus",
  3: "Shado-Pan",
  4: "August Celestials",
}

export const timewalkingDB = {
  1: "Vanilla",
  2: "Burning Crusade",
  3: "Wrath of the Lich King",
  4: "Cataclysm",
  5: "Mists of Pandaria",
  6: "Warlords of Draenor",
  7: "Legion",
}


export const retailInstanceDB = {
  /* ---------------------------------------------------------------------------------------------- */
  /*                                              Raids                                             */
  /* ---------------------------------------------------------------------------------------------- */
  // Voidspire
  1307: {
    name: "The Voidspire",
    bossOrder: [2733, 2734, 2736, 2735, 2737, 2738],
    bosses: {
      2733: "Imperator Averzian",
      2734: "Vorasius",
      2736: "Fallen-King Salhadaar",
      2735: "Vaelgor & Ezzorak",
      2737: "Lightblinded Vanguard",
      2738: "Crown of the Cosmos",
    }
  },

  1314: {
    name: "Dreamrift",
    bossOrder: [2795],
    bosses: {
      2795: "Chimaerus",
    }
  },
  1308: {
    name: "March on Quel'Danas",
    bossOrder: [2739, 2740],
    bosses: {
      2739: "Belo'ren, Child of Al'ar",
      2740: "Midnight Falls",
    }
  },
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
    // Manaforge Omega
    1302: {
      name: "Manaforge Omega",
      bossOrder: [2684, 2686, 2685, 2687, 2688, 2747, 2690, 2691, 999],
      bosses: {
        2684: "Plexus Sentinel", 
        2686: "Loomithar", 
        2685: "Soulbinder Naazindhri", 
        2687: "Forgeweaver Araz", 
        2688: "Soul Hunters", 
        2747: "Fractillus",
        2690: "Nexus King", 
        2691: "Dimensius the All-Devouring", 
        999: "BoE Trash Drops & Catalyst",
      }
    },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                            Dungeons                                            */
  /* ---------------------------------------------------------------------------------------------- */
  "-1": {
    "Retail": {
      bossOrder: [], // Optionally used for M0s when we want to show both. Rare outside of the first season of a new expansion.
      bossOrderMythicPlus: [1315, 1316, 1300, 1299, 1201, 278, 476, 945], // Dungeon Order

      1315: "Maisara Cavern",
      1316: "Nexus-Point Xenas",
      1300: "Magisters Terrace",
      1299: "Windrunner Spire",

      1201: "Algeth'ar Academy", // Algethar Academy 
      278: "Pit of Saron", // Pit of Saron 
      476: "Skyreach", // Skyreach
      945: "Seat of the Triumvirate", // Seat of the Triumvirate


    },
    "Classic": {
      //# 316 = Scarlet Monastery, 313 = Jade Temple, 312 = Shadowpan Monastary, 311 = Scarlet Halls, 303 = Gate of Setting Sun, 302 = Stormstout, 324 = Siege of Niuzao.
      bossOrder: [],
      bossOrderMythicPlus: [246, 316, 313, 312, 311, 303, 302, 324, 321], // Dungeon Order
      // TODO
      246: "Scholomance",
      316: "Scarlet Monastery",
      313: "Temple of the Jade Serpent",
      312: "Shadowpan Monastery",
      311: "Scarlet Halls",
      303: "Gate of the Setting Sun",
      302: "Stormstout Brewery",
      324: "Siege of Niuzao Temple",
      321: "Mogu'shan Palace",
      
      },
  },
}


const classicInstanceDB = {
  317: {
    name: "Mogushan Vaults",
    bossOrder: [679, 689, 682, 687, 726, 677],
    bosses: {
      679: "The Stone Guard",
      689: "Feng the Accursed",
      682: "Gara'jal the Spiritbinder",
      687: "Spirit Kings",
      726: "Elegon",
      677: "Will of the Emperor",
    }
  },
  330: {
    name: "Heart of Fear",
    bossOrder: [745, 744, 713, 741, 737, 743],
    bosses: {
      745: "Imperial Vizier Zor'lok",
      744: "Blade Lord Ta'yak",
      713: "Garalon",
      741: "Wind Lord Mel'jarak",
      737: "Amber-Shaper Un'sok",
      743: "Grand Empress Shek'zeer",
    }
  },
  320: {
    name: "Terrace of Endless Spring",
    bossOrder: [683, 742, 729, 709],
    bosses: {
      683: "Protectors of the Endless",
      742: "Tsulong",
      729: "Lei Shi",
      709: "Sha of Fear",
    }
  },
  362: {
    name: "Throne of Thunder",
    bossOrder: [816, 817, 818, 819, 820, 821, 824, 825, 827, 828, 829, 831, 832],
    bosses: {
      816: "Council of Elders",
      817: "Iron Qon",
      818: "Durumu the Forgotten",
      819: "Horridon",
      820: "Primordius",
      821: "Megaera",
      824: "Dark Animus",
      825: "Tortos",
      827: "Jin'rokh the Breaker",
      828: "Ji-Kun",
      829: "Twin Empyreans",
      831: "Ra-den",
      832: "Lei Shen",
    }
  },

}

export const encounterDB = {
  ...classicInstanceDB,
  ...retailInstanceDB,
}