export const damageExclusions = [
  // Melee
  1,
  // Stagger - Monk
  124255,
  // Eye of Corruption
  315161,
  // Grand Delusions
  315197,
  // Burning Rush - Warlock
  111400,
  // Cauterize - Mage
  86949,
  // Light of the Martyr - Paladin
  183998,
  // Cauterize - Mage
  87023,
  // Conflagrate - Warlock
  17962,
  // Earth Shock - Shaman
  8042,
  // Infinite Stars
  317265,
  // Lethal Strikes
  311192,
  // Meteor - Mage
  153561,
  // Ignite - Mage
  12654,
  // Execute - Warrior
  260798,
  // Blessing of Sacrifice - Paladin
  6940,
  // Psyche Shredder
  313663,
  // Kindred Protection - Druid
  327037,
  // Shadow Mend - Priest
  186263,
  // Shadow Word: Death - Priest
  32409,
  // Splintered Heart of Al'ar
  344909,
  // Soul Ignition
  345211,
];



export const bossIds = [
  {
    id: 2327,
    name: "Maut",
    raid: "Ny'alotha, the Waking City",
  },
  {
    id: 2328,
    name: "Dark Inquisitor Xanesh",
    raid: "Ny'alotha, the Waking City",
  },
  {
    id: 2329,
    name: "Wrathion",
    raid: "Ny'alotha, the Waking City",
  },
  {
    id: 2331,
    name: "Ra-den the Despoiled",
    raid: "Ny'alotha, the Waking City",
  },
  {
    id: 2333,
    name: "The Hivemind",
    raid: "Ny'alotha, the Waking City",
  },
  {
    id: 2334,
    name: "Prophet Skitra",
    raid: "Ny'alotha, the Waking City",
  },
  {
    id: 2335,
    name: "Shad'har the Insatiable",
    raid: "Ny'alotha, the Waking City",
  },
  {
    id: 2336,
    name: "Vexiona",
    raid: "Ny'alotha, the Waking City",
  },
  {
    id: 2337,
    name: "Carapace of N'Zoth",
    raid: "Ny'alotha, the Waking City",
  },
  {
    id: 2343,
    name: "Drest'agath",
    raid: "Ny'alotha, the Waking City",
  },
  {
    id: 2344,
    name: "N'Zoth the Corruptor",
    raid: "Ny'alotha, the Waking City",
  },
  {
    id: 2345,
    name: "Il'gynoth, Corruption Reborn",
    raid: "Ny'alotha, the Waking City",
  },

  {
    id: 2398,
    name: "Shriekwing",
    raid: "Castle Nathria",
  },
  {
    id: 2418,
    name: "Huntsman Altimor",
    raid: "Castle Nathria",
  },
  {
    id: 2402,
    name: "Sun King's Salvation",
    raid: "Castle Nathria",
  },
  {
    id: 2405,
    name: "Artificer Xy'mox",
    raid: "Castle Nathria",
  },
  {
    id: 2383,
    name: "Hungering Destroyer",
    raid: "Castle Nathria",
  },
  {
    id: 2406,
    name: "Lady Inerva Darkvein",
    raid: "Castle Nathria",
  },
  {
    id: 2412,
    name: "The Council of Blood",
    raid: "Castle Nathria",
  },
  {
    id: 2399,
    name: "Sludgefist",
    raid: "Castle Nathria",
  },
  {
    id: 2417,
    name: "Stone Legion Generals",
    raid: "Castle Nathria",
  },
  {
    id: 2407,
    name: "Sire Denathrius",
    raid: "Castle Nathria",
  },
];

export const raidList = [
  // { id: 0, zoneID: 2217, raidName: "Ny’alotha" },
  { id: 0, zoneID: 2296, raidName: "Castle Nathria" },
  { id: 1, zoneID: 2450, raidName: "Sanctum of Domination" },
  { id: 3, zoneID: 2481, raidName: "Sepulcher of the First Ones" },
];

export const dungeonList = [
  {
    name: "Halls of Atonement",
    zoneID: 12831,
  },
  {
    name: "Mists of Tirna Scithe",
    zoneID: 13334,
  },
  {
    name: "The Necrotic Wake",
    zoneID: 12916,
  },
  {
    name: "Plaguefall",
    zoneID: 13228,
  },
  {
    name: "Sanguine Depths",
    zoneID: 12842,
  },
  {
    name: "Theater of Pain",
    zoneID: 12841,
  },
  {
    name: "De Other Side",
    zoneID: 13309,
  },
  {
    name: "Spires of Ascension",
    zoneID: 12837,
  },
];

export const pvpCurrency = [
  {
    name: "Honor",
    icon: require("Images/Bosses/HonorIcon.jpg").default,
  },
  {
    name: "Conquest",
    icon: require("Images/Bosses/ConquestIcon.jpg").default,
  },
];

export const worldBosses = [
  {
    name: "Valinor",
    id: 167524,
  },
  {
    name: "Mortanis",
    id: 173104,
  },
  {
    name: "Oranomonos",
    id: 167527,
  },
  {
    name: "Nurgash ",
    id: 167526,
  },
];

// Contains the list of races localization IDs for each class's available races.
export const classRaceList = {
  /* ---------------------------------------------------------------------------------------------- */
  /*                                            Paladins                                            */
  /* ---------------------------------------------------------------------------------------------- */

  /* ------------------------------------------- Retail ------------------------------------------- */
  "Holy Paladin": {
    races: ["Races.Draenei", "Races.Dwarf", "Races.Human", "Races.Lightforged Draenei", "Races.Dark Iron Dwarf", "Races.Blood Elf", "Races.Tauren", "Races.Zandalari Troll"],
    gameType: "Retail",
  },

  /* --------------------------------------- Burning Crusade -------------------------------------- */
  "Holy Paladin BC": {
    races: ["Races.Draenei", "Races.Dwarf", "Races.Human", "Races.Blood Elf"],
    gameType: "BurningCrusade",
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                             Druids                                             */
  /* ---------------------------------------------------------------------------------------------- */

  /* ------------------------------------------- Retail ------------------------------------------- */
  "Restoration Druid": {
    races: ["Races.Night Elf", "Races.Worgen", "Races.Kul Tiran", "Races.Tauren", "Races.Troll", "Races.Highmountain Tauren", "Races.Zandalari Troll"],
    gameType: "Retail",
  },

  /* --------------------------------------- Burning Crusade -------------------------------------- */
  "Restoration Druid BC": {
    races: ["Races.Night Elf", "Races.Tauren"],
    gameType: "BurningCrusade",
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                             Priest                                             */
  /* ---------------------------------------------------------------------------------------------- */

  /* ------------------------------------------- Retail ------------------------------------------- */
  "Holy Priest": {
    races: [
      "Races.Draenei",
      "Races.Dwarf",
      "Races.Gnome",
      "Races.Human",
      "Races.Night Elf",
      "Races.Worgen",
      "Races.Void Elf",
      "Races.Lightforged Draenei",
      "Races.Dark Iron Dwarf",
      "Races.Kul Tiran",
      "Races.Mechagnome",
      "Races.Pandaren",
      "Races.Blood Elf",
      "Races.Goblin",
      "Races.Tauren",
      "Races.Troll",
      "Races.Undead",
      "Races.Nightborne",
      "Races.Mag'har Orc",
      "Races.Zandalari Troll",
      "Races.Vulpera",
    ],
    gameType: "Retail",
  },
  "Discipline Priest": {
    races: [
      "Races.Draenei",
      "Races.Dwarf",
      "Races.Gnome",
      "Races.Human",
      "Races.Night Elf",
      "Races.Worgen",
      "Races.Void Elf",
      "Races.Lightforged Draenei",
      "Races.Dark Iron Dwarf",
      "Races.Kul Tiran",
      "Races.Mechagnome",
      "Races.Pandaren",
      "Races.Blood Elf",
      "Races.Goblin",
      "Races.Tauren",
      "Races.Troll",
      "Races.Undead",
      "Races.Nightborne",
      "Races.Mag'har Orc",
      "Races.Zandalari Troll",
      "Races.Vulpera",
    ],
    gameType: "Retail",
  },

  /* --------------------------------------- Burning Crusade -------------------------------------- */
  "Holy Priest BC": {
    races: ["Races.Draenei", "Races.Dwarf", "Races.Human", "Races.Night Elf", "Races.Blood Elf", "Races.Troll", "Races.Undead"],
    gameType: "BurningCrusade",
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                             Shamans                                            */
  /* ---------------------------------------------------------------------------------------------- */

  /* ------------------------------------------- Retail ------------------------------------------- */
  "Restoration Shaman": {
    races: [
      "Races.Draenei",
      "Races.Dwarf",
      "Races.Dark Iron Dwarf",
      "Races.Kul Tiran",
      "Races.Pandaren",
      "Races.Goblin",
      "Races.Orc",
      "Races.Tauren",
      "Races.Troll",
      "Races.Highmountain Tauren",
      "Races.Mag'har Orc",
      "Races.Zandalari Troll",
      "Races.Vulpera",
    ],
    gameType: "Retail",
  },

  /* --------------------------------------- Burning Crusade -------------------------------------- */
  "Restoration Shaman BC": {
    races: ["Races.Draenei", "Races.Orc", "Races.Tauren", "Races.Troll"],
    gameType: "BurningCrusade",
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                              Monks                                             */
  /* ---------------------------------------------------------------------------------------------- */

  /* ------------------------------------------- Retail ------------------------------------------- */

  "Mistweaver Monk": {
    races: [
      "Races.Draenei",
      "Races.Dwarf",
      "Races.Gnome",
      "Races.Human",
      "Races.Night Elf",
      "Races.Void Elf",
      "Races.Dark Iron Dwarf",
      "Races.Kul Tiran",
      "Races.Mechagnome",
      "Races.Pandaren",
      "Races.Blood Elf",
      "Races.Orc",
      "Races.Tauren",
      "Races.Troll",
      "Races.Undead",
      "Races.Nightborne",
      "Races.Highmountain Tauren",
      "Races.Mag'har Orc",
      "Races.Zandalari Troll",
      "Races.Vulpera",
    ],
    gameType: "Retail",
  },
};
