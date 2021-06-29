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

export const paladinCooldownNames = ["Avenging Wrath", "Aura Mastery", "Divine Toll", "Ashen Hallow", "Vanquisher's Hammer", "Blessing of the Seasons"];

export const shamanCooldownNames = ["Healing Tide Totem", "Vesper Totem", "Chain Harvest", "Primordial Wave", "Fae Transfusion"];

export const priestCooldownNames = ["Power Word: Barrier", "Evangelism", "Divine Hymn", "Boon of the Ascended", "Mindgames", "Unholy Nova", "Fae Blessings"];

export const druidCooldownNames = ["Incarnation: Tree of Life", "Tranquility", "Kindred Spirits", "Ravenous Frenzy", "Adaptive Swarm", "Convoke the Spirits"];

export const monkCooldownNames = ["Revival", "Weapons of Order", "Fallen Order", "Bonedust Brew", "Faeline Stomp"];

export const healerCooldownsDetailed = [
  // --------------------Paladin--------------------
  // ----------------Base Abilities-----------------
  {
    name: "Avenging Wrath",
    guid: 31884,
    duration: 20,
    cooldown: 120,
  },
  {
    name: "Aura Mastery",
    guid: 31821,
    duration: 8,
    cooldown: 180,
  },
  // --------------Covenant Abilities---------------
  // {
  //   name: "Divine Toll",
  //   guid: 304971,
  //   duration: 1,
  //   cooldown: 60,
  // },
  {
    name: "Ashen Hallow",
    guid: 316958,
    duration: 30,
    cooldown: 240,
  },
  // {
  //   name: "Vanquisher's Hammer",
  //   guid: 328204,
  //   duration: 1,
  //   cooldown: 30,
  // },
  // {
  //   name: "Blessing of the Seasons",
  //   guid: 328278,
  //   duration: 1,
  //   cooldown: 30,
  // },
  // --------------------Priest---------------------
  // ----------------Base Abilities-----------------
  {
    name: "Power Word: Barrier",
    guid: 62618,
    duration: 10,
    cooldown: 180,
  },
  {
    name: "Evangelism",
    guid: 246287,
    duration: 6,
    cooldown: 90,
  },
  {
    name: "Divine Hymn",
    guid: 64843,
    duration: 8,
    cooldown: 180,
  },
  {
    name: "Holy Word: Salvation",
    guid: 265202,
    duration: 1,
    cooldown: 720,
  },
  {
    name: "Rapture",
    guid: 47536,
    duration: 8,
    cooldown: 90,
  },
  {
    name: "Spirit Shell",
    guid: 109964,
    duration: 10,
    cooldown: 60,
  },
  // --------------Covenant Abilities---------------
  // {
  //   name: "Boon of the Ascended",
  //   guid: 325013,
  //   duration: 10,
  //   cooldown: 180,
  // },
  // {
  //   name: "Mindgames",
  //   guid: 323673,
  //   duration: 5,
  //   cooldown: 45,
  // },
  // {
  //   name: "Unholy Nova",
  //   guid: 324724,
  //   duration: 15,
  //   cooldown: 60,
  // },
  // {
  //   name: "Fae Blessings",
  //   guid: 327661,
  //   duraton: 1,
  //   cooldown: 90,
  // },
  // ---------------------Druid---------------------
  {
    name: "Incarnation: Tree of Life",
    guid: 33891,
    duration: 30,
    cooldown: 180,
  },
  {
    name: "Tranquility",
    guid: 740,
    duration: 8,
    cooldown: 180,
  },
  {
    name: "Flourish",
    guid: 197721,
    duration: 8,
    cooldown: 90,
  },
  // --------------Covenant Abilities---------------
  // {
  //   name: "Kindred Spirits",
  //   guid: 326434,
  //   duration: 10,
  //   cooldown: 60,
  // },
  // {
  //   name: "Ravenous Frenzy",
  //   guid: 323546,
  //   duration: 20,
  //   cooldown: 180,
  // },
  // {
  //   name: "Adaptive Swarm",
  //   guid: 325727,
  //   duration: 12,
  //   cooldown: 25,
  // },
  {
    name: "Convoke the Spirits",
    guid: 323764,
    duration: 4,
    cooldown: 120,
  },
  // --------------------Monk-----------------------
  // ----------------Base Abilities-----------------
  {
    name: "Revival",
    guid: 115310,
    duration: 1,
    cooldown: 180,
  },
  // --------------Covenant Abilities---------------
  // {
  //   name: "Weapons of Order",
  //   guid: 310454,
  //   duration: 30,
  //   cooldown: 120,
  // },
  // {
  //   name: "Fallen Order",
  //   guid: 326860,
  //   duration: 24,
  //   cooldown: 180,
  // },
  // {
  //   name: "Bonedust Brew",
  //   guid: 325216,
  //   duration: 10,
  //   cooldown: 60,
  // },
  // {
  //   name: "Faeline Stomp",
  //   guid: 327104,
  //   duration: 30,
  //   cooldown: 30,
  // },
  // -------------------Shaman----------------------
  // ----------------Base Abilities-----------------
  {
    name: "Healing Tide Totem",
    guid: 108280,
    duration: 10,
    cooldown: 180,
  },
  {
    name: "Spirit Link Totem",
    guid: 98008,
    duration: 6,
    cooldown: 180,
  },
  {
    guid: 207399,
    name: "Ancestral Protection Totem",
    wowhead: "https://www.wowhead.com/spell=207399/ancestral-protection-totem",
    icon: "spell_nature_reincarnation",
    duration: 30,
    cooldown: 300,
  },
  // --------------Covenant Abilities---------------
  // {
  //   name: "Vesper Totem",
  //   guid: 324386,
  //   duration: 30,
  //   cooldown: 60,
  // },
  // {
  //   name: "Chain Harvest",
  //   guid: 320674,
  //   duration: 1,
  //   cooldown: 90,
  // },
  // {
  //   name: "Primordial Wave",
  //   guid: 326059,
  //   duration: 1,
  //   cooldown: 45,
  // },
  // {
  //   name: "Fae Transfusion",
  //   guid: 328923,
  //   duration: 3,
  //   cooldown: 120,
  // },

  // Utility Cooldowns
  {
    name: "Darkness",
    guid: 196718,
    duration: 8,
    cooldown: 180,
  },

  {
    name: "Rallying Cry",
    guid: 97462,
    duration: 10,
    cooldown: 180,
  },

  {
    guid: 15286,
    name: "Vampiric Embrace",
    wowhead: "https://www.wowhead.com/spell=15286/vampiric-embrace",
    icon: "spell_shadow_unsummonbuilding",
    duration: 15,
    cooldown: 120,
  },

  {
    guid: 51052,
    name: "Anti-Magic Zone",
    wowhead: "https://www.wowhead.com/spell=51052/anti-magic-zone",
    icon: "spell_deathknight_antimagiczone",
    duration: 10,
    cooldown: 120,
  },
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
    races: [
      "Races.Draenei",
      "Races.Orc",
      "Races.Tauren",
      "Races.Troll",
    ],
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
