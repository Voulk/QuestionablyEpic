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

export const bossAbilities = [
  /* -------------------------------------------------------------------------- */
  /*                                 Shriekwing                                 */
  /* -------------------------------------------------------------------------- */

  /* ---------------------------- Active Abilities ---------------------------- */
  {
    bossID: 2398,
    ability: "Bloodlight",
    guid: 343384,
    cooldownPlannerActive: true,
    icon: require("Images/Bosses/CastleNathria/Shriekwing/Icons/BloodlightIcon.jpg").default,
  },
  {
    bossID: 2398,
    ability: "Earsplitting Shriek",
    guid: 330711,
    cooldownPlannerActive: true,
    icon: require("Images/Bosses/CastleNathria/Shriekwing/Icons/EarsplittingShriekIcon.jpg").default,
  },
  {
    bossID: 2398,
    ability: "Wave of Blood",
    guid: 345397,
    cooldownPlannerActive: true,
    icon: require("Images/Bosses/CastleNathria/Shriekwing/Icons/WaveOfBlood.jpg").default,
  },

  /* --------------------------- Inactive Abilities --------------------------- */
  {
    bossID: 2398,
    ability: "Reverberating Scream",
    guid: 344112,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/Shriekwing/Icons/ReverberatingScreamIcon.jpg").default,
  },
  {
    bossID: 2398,
    ability: "Reverberating Scream",
    guid: 344114,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/Shriekwing/Icons/ReverberatingScreamIcon.jpg").default,
  },
  {
    bossID: 2398,
    ability: "Deadly Descent",
    guid: 343021,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/Shriekwing/Icons/DeadlyDescentIcon.jpg").default,
  },
  {
    bossID: 2398,
    ability: "Echoing Sonar",
    guid: 343022,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/Shriekwing/Icons/EchoingSonarIcon.jpg").default,
  },
  {
    bossID: 2398,
    ability: "Bloodcurdling Shriek",
    guid: 330712,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/Shriekwing/Icons/BloodcurdlingShriekIcon.jpg").default,
  },
  {
    bossID: 2398,
    ability: "Bloodcurdling Shriek",
    guid: 336005,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/Shriekwing/Icons/BloodcurdlingShriekIcon.jpg").default,
  },
  {
    bossID: 2398,
    ability: "Sonar Shriek",
    guid: 343023,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/Shriekwing/Icons/SonarShriekIcon.jpg").default,
  },
  {
    bossID: 2398,
    ability: "Blind Swipe",
    guid: 343005,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/Shriekwing/Icons/BlindSwipeIcon.jpg").default,
  },
  {
    bossID: 2398,
    ability: "Sanguine Ichor",
    guid: 340324,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/Shriekwing/Icons/SanguineIchorIcon.jpg").default,
  },
  {
    bossID: 2398,
    ability: "Descent",
    guid: 342923,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/Shriekwing/Icons/DescentIcon.jpg").default,
  },
  {
    bossID: 2398,
    ability: "Exsanguinating Bite",
    guid: 328887,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/Shriekwing/Icons/ExsanguinatingBiteIcon.jpg").default,
  },
  {
    bossID: 2398,
    ability: "Echoing Screech",
    guid: 342866,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/Shriekwing/Icons/EchoingScreechIcon.jpg").default,
  },
  {
    bossID: 2398,
    ability: "Exsanguinated",
    guid: 328897,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/Shriekwing/Icons/ExsanguinatedIcon.jpg").default,
  },

  /* -------------------------------------------------------------------------- */
  /*                              Huntsman Altimor                              */
  /* -------------------------------------------------------------------------- */

  /* ---------------------------- Active Abilities ---------------------------- */
  {
    bossID: 2418,
    ability: "Crushing Stone",
    guid: 334860,
    cooldownPlannerActive: true,
    icon: require("Images/Bosses/CastleNathria/HuntsmanAltimor/Icons/CrushingStoneIcon.jpg").default,
  },
  {
    bossID: 2418,
    ability: "Rip Soul",
    guid: 334797,
    cooldownPlannerActive: true,
    icon: require("Images/Bosses/CastleNathria/HuntsmanAltimor/Icons/RipSoulIcon.jpg").default,
  },
  {
    bossID: 2418,
    ability: "Sinseeker",
    guid: 335114,
    cooldownPlannerActive: true,
    icon: require("Images/Bosses/CastleNathria/HuntsmanAltimor/Icons/SinseekerIcon.jpg").default,
  },

  /* --------------------------- Inactive Abilities --------------------------- */
  {
    bossID: 2418,
    ability: "Vicious Lunge",
    guid: 334939,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/HuntsmanAltimor/Icons/ViciousLungeIcon.jpg").default,
  },
  {
    bossID: 2418,
    ability: "Vicious Bolt",
    guid: 338615,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/HuntsmanAltimor/Icons/ViciousBoltIcon.jpg").default,
  },
  {
    bossID: 2418,
    ability: "Pierce Soul",
    guid: 338609,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/HuntsmanAltimor/Icons/PierceSoulIcon.jpg").default,
  },
  {
    bossID: 2418,
    ability: "Shatter Shot",
    guid: 338593,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/HuntsmanAltimor/Icons/ShatterShotIcon.jpg").default,
  },
  {
    bossID: 2418,
    ability: "Spreadshot",
    guid: 334404,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/HuntsmanAltimor/Icons/SpreadshotIcon.jpg").default,
  },
  {
    bossID: 2418,
    ability: "Vicious Wound",
    guid: 334960,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/HuntsmanAltimor/Icons/ViciousWoundIcon.jpg").default,
  },
  {
    bossID: 2418,
    ability: "Jagged Claws",
    guid: 334971,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/HuntsmanAltimor/Icons/JaggedClawsIcon.jpg").default,
  },
  {
    bossID: 2418,
    ability: "Deathly Roar",
    guid: 334708,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/HuntsmanAltimor/Icons/DeathlyRoarIcon.jpg").default,
  },
  {
    bossID: 2418,
    ability: "Unstable Soul",
    guid: 339639,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/HuntsmanAltimor/Icons/UnstableSoulIcon.jpg").default,
  },
  {
    bossID: 2418,
    ability: "Petrifying Howl",
    guid: 334852,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/HuntsmanAltimor/Icons/PetrifyingHowlIcon.jpg").default,
  },
  {
    bossID: 2418,
    ability: "Stone Shards",
    guid: 334893,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/HuntsmanAltimor/Icons/StoneShardsIcon.jpg").default,
  },
  {
    bossID: 2418,
    ability: "Shoot",
    guid: 335016,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/HuntsmanAltimor/Icons/ShootIcon.jpg").default,
  },

  /* -------------------------------------------------------------------------- */
  /*                             Hungering Destroyer                            */
  /* -------------------------------------------------------------------------- */

  /* ---------------------------- Active Abilities ---------------------------- */
  {
    bossID: 2383,
    ability: "Consume",
    guid: 334522,
    cooldownPlannerActive: true,
    icon: require("Images/Bosses/CastleNathria/HungeringDestroyer/Icons/ConsumeIcon.jpg").default,
  },
  {
    bossID: 2383,
    ability: "Expunge",
    guid: 329742,
    cooldownPlannerActive: true,
    icon: require("Images/Bosses/CastleNathria/HungeringDestroyer/Icons/ExpungeIcon.jpg").default,
  },
  {
    bossID: 2383,
    ability: "Desolate",
    guid: 329455,
    cooldownPlannerActive: true,
    icon: require("Images/Bosses/CastleNathria/HungeringDestroyer/Icons/DesolateIcon.jpg").default,
  },
  {
    bossID: 2383,
    ability: "Gluttonous Miasma",
    guid: 329298,
    cooldownPlannerActive: true,
    icon: require("Images/Bosses/CastleNathria/HungeringDestroyer/Icons/GluttonousMiasmaIcon.jpg").default,
  },

  // Inactive Abilities
  {
    bossID: 2383,
    ability: "Obliterating Rift",
    guid: 329835,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/HungeringDestroyer/Icons/ObliteratingRiftIcon.jpg").default,
  },
  {
    bossID: 2383,
    ability: "Volatile Ejection",
    guid: 334064,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/HungeringDestroyer/Icons/VolatileEjectionIcon.jpg").default,
  },
  {
    bossID: 2383,
    ability: "Hungering Strikes",
    guid: 332294,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/HungeringDestroyer/Icons/HungeringStrikesIcon.jpg").default,
  },
  {
    bossID: 2383,
    ability: "Overwhelm",
    guid: 329774,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/HungeringDestroyer/Icons/OverwhelmIcon.jpg").default,
  },

  /* -------------------------------------------------------------------------- */
  /*                               Artificer Xymox                              */
  /* -------------------------------------------------------------------------- */

  /* ---------------------------- Active Abilities ---------------------------- */
  {
    bossID: 2405,
    ability: "Glyph of Destruction",
    guid: 325361,
    cooldownPlannerActive: true,
    icon: require("Images/Bosses/CastleNathria/ArtificerXymox/Icons/GlyphOfDestructionIcon.jpg").default,
  },
  {
    bossID: 2405,
    ability: "Hyperlight Spark",
    guid: 325399,
    cooldownPlannerActive: true,
    icon: require("Images/Bosses/CastleNathria/ArtificerXymox/Icons/HyperlightSparkIcon.jpg").default,
  },
  {
    bossID: 2405,
    ability: "Aura of Dread",
    guid: 340870,
    cooldownPlannerActive: true,
    icon: require("Images/Bosses/CastleNathria/ArtificerXymox/Icons/AuraOfDreadIcon.jpg").default,
  },
  {
    bossID: 2405,
    ability: "Soul Singe",
    guid: 340842,
    cooldownPlannerActive: true,
    icon: require("Images/Bosses/CastleNathria/ArtificerXymox/Icons/SoulSingeIcon.jpg").default,
  },

  /* --------------------------- Inactive Abilities --------------------------- */
  {
    bossID: 2405,
    ability: "Dimensional Tear",
    guid: 328437,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/ArtificerXymox/Icons/DimensionalTearIcon.jpg").default,
  },
  {
    bossID: 2405,
    ability: "Stasis Trap",
    guid: 326271,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/ArtificerXymox/Icons/StasisTrapIcon.jpg").default,
  },
  {
    bossID: 2405,
    ability: "Rift Blast",
    guid: 329458,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/ArtificerXymox/Icons/RiftBlastIcon.jpg").default,
  },
  {
    bossID: 2405,
    ability: "Root of Extinction",
    guid: 329770,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/ArtificerXymox/Icons/RootOfExtinctionIcon.jpg").default,
  },
  {
    bossID: 2405,
    ability: "Withering Touch",
    guid: 340860,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/ArtificerXymox/Icons/WitheringTouchIcon.jpg").default,
  },
  {
    bossID: 2405,
    ability: "Edge of Annihilation",
    guid: 328880,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/ArtificerXymox/Icons/EdgeOfAnnihilationIcon.jpg").default,
  },

  /* -------------------------------------------------------------------------- */
  /*                            Sun King's Salvation                            */
  /* -------------------------------------------------------------------------- */

  /* ---------------------------- Active Abilities ---------------------------- */
  /* --------------------------- Inactive Abilities --------------------------- */
  {
    bossID: 2402,
    ability: "Smoldering Remnants",
    guid: 328579,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/SunKingsSalvation/Icons/SmolderingRemnantsIcon.jpg").default,
  },
  {
    bossID: 2402,
    ability: "Smoldering Plumage",
    guid: 328659,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/SunKingsSalvation/Icons/SmolderingPlumageIcon.jpg").default,
  },
  {
    bossID: 2402,
    ability: "Fiery Strike",
    guid: 326455,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/SunKingsSalvation/Icons/FieryStrikeIcon.jpg").default,
  },
  {
    bossID: 2402,
    ability: "Burning Remnants",
    guid: 326456,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/SunKingsSalvation/Icons/BurningRemnantsIcon.jpg").default,
  },
  {
    bossID: 2402,
    ability: "Ember Blast",
    guid: 325877,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/SunKingsSalvation/Icons/EmberBlastIcon.jpg").default,
  },
  {
    bossID: 2402,
    ability: "Lingering Embers",
    guid: 326430,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/SunKingsSalvation/Icons/LingeringEmbersIcon.jpg").default,
  },
  {
    bossID: 2402,
    ability: "Blazing Surge",
    guid: 329518,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/SunKingsSalvation/Icons/BlazingSurgeIcon.jpg").default,
  },
  {
    bossID: 2402,
    ability: "Vanquishing Strike",
    guid: 325440,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/SunKingsSalvation/Icons/VanquishingStrikeIcon.jpg").default,
  },
  {
    bossID: 2402,
    ability: "Vanquished",
    guid: 325442,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/SunKingsSalvation/Icons/VanquishedIcon.jpg").default,
  },
  {
    bossID: 2402,
    ability: "Concussive Smash",
    guid: 325506,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/SunKingsSalvation/Icons/ConcussiveSmashIcon.jpg").default,
  },
  {
    bossID: 2402,
    ability: "Crimson Flurry",
    guid: 341473,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/SunKingsSalvation/Icons/CrimsonFlurryIcon.jpg").default,
  },
  {
    bossID: 2402,
    ability: "Vulgar Brand",
    guid: 333002,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/SunKingsSalvation/Icons/VulgarBrandIcon.jpg").default,
  },
  {
    bossID: 2402,
    ability: "Scornful Blast",
    guid: 325590,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/SunKingsSalvation/Icons/ScornfulBlastIcon.jpg").default,
  },
  {
    bossID: 2402,
    ability: "Shattering Ruby",
    guid: 335540,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/SunKingsSalvation/Icons/ShatteringRubyIcon.jpg").default,
  },
  {
    bossID: 2402,
    ability: "Fragmentation",
    guid: 336398,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/SunKingsSalvation/Icons/FragmentationIcon.jpg").default,
  },
  {
    bossID: 2402,
    ability: "Greater Castigation",
    guid: 328890,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/SunKingsSalvation/Icons/GreaterCastigationIcon.jpg").default,
  },
  {
    bossID: 2402,
    ability: "Soul Infusion",
    guid: 339232,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/SunKingsSalvation/Icons/SoulInfusionIcon.jpg").default,
  },

  /* -------------------------------------------------------------------------- */
  /*                            Lady Inerva Darkvein                            */
  /* -------------------------------------------------------------------------- */

  /* ---------------------------- Active Abilities ---------------------------- */
  {
    bossID: 2406,
    ability: "Change of Heart",
    guid: 325384,
    cooldownPlannerActive: true,
    icon: require("Images/Bosses/CastleNathria/LadyInervaDarkvein/Icons/ChangeOfHeartIcon.jpg").default,
  },

  /* --------------------------- Inactive Abilities --------------------------- */
  {
    bossID: 2406,
    ability: "Condemn",
    guid: 331550,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/LadyInervaDarkvein/Icons/CondemnIcon.jpg").default,
  },
  {
    bossID: 2406,
    ability: "Unconscionable Guilt",
    guid: 331573,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/LadyInervaDarkvein/Icons/UnconscionableGuiltIcon.jpg").default,
  },
  {
    bossID: 2406,
    ability: "Sins and Suffering",
    guid: 342288,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/LadyInervaDarkvein/Icons/SinsAndSufferingIcon.jpg").default,
  },
  {
    bossID: 2406,
    ability: "Indemnification",
    guid: 331527,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/LadyInervaDarkvein/Icons/IndemnificationIcon.jpg").default,
  },
  {
    bossID: 2406,
    ability: "Shared Cognition",
    guid: 325908,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/LadyInervaDarkvein/Icons/SharedCognitionIcon.jpg").default,
  },
  {
    bossID: 2406,
    ability: "Bottled Anima",
    guid: 325769,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/LadyInervaDarkvein/Icons/BottledAnimaIcon.jpg").default,
  },
  {
    bossID: 2406,
    ability: "Unleashed Volatility",
    guid: 329618,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/LadyInervaDarkvein/Icons/UnleashedVolatilityIcon.jpg").default,
  },
  {
    bossID: 2406,
    ability: "Container Breach",
    guid: 325225,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/LadyInervaDarkvein/Icons/ContainerBreachIcon.jpg").default,
  },
  {
    bossID: 2406,
    ability: "Loose Anima",
    guid: 325184,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/LadyInervaDarkvein/Icons/LooseAnimaIcon.jpg").default,
  },
  {
    bossID: 2406,
    ability: "Expose Desires",
    guid: 341621,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/LadyInervaDarkvein/Icons/ExposeDesiresIcon.jpg").default,
  },
  {
    bossID: 2406,
    ability: "Warped Desires",
    guid: 325382,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/LadyInervaDarkvein/Icons/WarpedDesiresIcon.jpg").default,
  },
  {
    bossID: 2406,
    ability: "Hidden Desire",
    guid: 335322,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/LadyInervaDarkvein/Icons/HiddenDesireIcon.jpg").default,
  },
  {
    bossID: 2406,
    ability: "Expose Cognition",
    guid: 341623,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/LadyInervaDarkvein/Icons/ExposeCognitionIcon.jpg").default,
  },
  {
    bossID: 2406,
    ability: "Expose Heart",
    guid: 341625,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/LadyInervaDarkvein/Icons/ExposeHeartIcon.jpg").default,
  },
  {
    bossID: 2406,
    ability: "Lingering Anima",
    guid: 342281,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/LadyInervaDarkvein/Icons/LingeringAnimaIcon.jpg").default,
  },
  {
    bossID: 2406,
    ability: "Shared Suffering",
    guid: 324983,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/LadyInervaDarkvein/Icons/SharedSufferingIcon.jpg").default,
  },
  {
    bossID: 2406,
    ability: "Anima Web",
    guid: 326538,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/LadyInervaDarkvein/Icons/AnimaWebIcon.jpg").default,
  },
  {
    bossID: 2406,
    ability: "Greater Sins and Suffering",
    guid: 342290,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/LadyInervaDarkvein/Icons/GreaterSinsAndSufferingIcon.jpg").default,
  },
  {
    bossID: 2406,
    ability: "Unleashed Shadow",
    guid: 341590,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/LadyInervaDarkvein/Icons/UnleashedShadowIcon.jpg").default,
  },
  {
    bossID: 2406,
    ability: "Lightly Concentrated Anima",
    guid: 342320,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/LadyInervaDarkvein/Icons/LightlyConcentratedAnimaIcon.jpg").default,
  },
  {
    bossID: 2406,
    ability: "Concentrated Anima",
    guid: 342321,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/LadyInervaDarkvein/Icons/ConcentratedAnimaIcon.jpg").default,
  },
  {
    bossID: 2406,
    ability: "Highly Concentrated Anima",
    guid: 342322,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/LadyInervaDarkvein/Icons/HighlyConcentratedAnimaIcon.jpg").default,
  },
  {
    bossID: 2406,
    ability: "Condemn",
    guid: 334017,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/LadyInervaDarkvein/Icons/CondemnIcon.jpg").default,
  },
  {
    bossID: 2406,
    ability: "Fragments of Shadow",
    guid: 325596,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/LadyInervaDarkvein/Icons/FragmentsOfShadowIcon.jpg").default,
  },

  /* -------------------------------------------------------------------------- */
  /*                              Council of Blood                              */
  /* -------------------------------------------------------------------------- */

  /* ---------------------------- Active Abilities ---------------------------- */
  {
    bossID: 2412,
    ability: "Dancing Fever",
    guid: 347350,
    cooldownPlannerActive: true,
    icon: require("Images/Bosses/CastleNathria/TheCouncilOfBlood/Icons/DancingFeverIcon.jpg").default,
  },

  /* --------------------------- Inactive Abilities --------------------------- */
  {
    bossID: 2412,
    ability: "Oppressive Atmosphere",
    guid: 334909,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/TheCouncilOfBlood/Icons/OppressiveAtmosphereIcon.jpg").default,
  },
  {
    bossID: 2412,
    ability: "Prideful Eruption",
    guid: 346660,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/TheCouncilOfBlood/Icons/PridefulEruption.jpg").default,
  },
  {
    bossID: 2412,
    ability: "Tactical Advance",
    guid: 328334,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/TheCouncilOfBlood/Icons/TacticalAdvanceIcon.jpg").default,
  },
  {
    bossID: 2412,
    ability: "Unstoppable Charge",
    guid: 334948,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/TheCouncilOfBlood/Icons/UnstoppableChargeIcon.jpg").default,
  },
  {
    bossID: 2412,
    ability: "Bolt of Power",
    guid: 337110,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/TheCouncilOfBlood/Icons/BoltOfPowerIcon.jpg").default,
  },
  {
    bossID: 2412,
    ability: "Anima Fountain",
    guid: 327475,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/TheCouncilOfBlood/Icons/AnimaFountainIcon.jpg").default,
  },
  {
    bossID: 2412,
    ability: "Scarlet Letter",
    guid: 331708,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/TheCouncilOfBlood/Icons/ScarletLetterIcon.jpg").default,
  },
  {
    bossID: 2412,
    ability: "Throw Food",
    guid: 330968,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/TheCouncilOfBlood/Icons/ThrowFoodIcon.jpg").default,
  },
  {
    bossID: 2412,
    ability: "Evasive Lunge",
    guid: 327503,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/TheCouncilOfBlood/Icons/EvasiveLungeIcon.jpg").default,
  },
  {
    bossID: 2412,
    ability: "Waltz of Blood",
    guid: 327619,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/TheCouncilOfBlood/Icons/WaltzOfBloodIcon.jpg").default,
  },
  {
    bossID: 2412,
    ability: "Waltz of Blood",
    guid: 342852,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/TheCouncilOfBlood/Icons/WaltzOfBlood2Icon.jpg").default,
  },
  {
    bossID: 2412,
    ability: "Dark Recital",
    guid: 331634,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/TheCouncilOfBlood/Icons/DarkRecitalIcon.jpg").default,
  },

  /* -------------------------------------------------------------------------- */
  /*                            Stone Legion Generals                           */
  /* -------------------------------------------------------------------------- */

  /* ---------------------------- Active Abilities ---------------------------- */
  {
    bossID: 2417,
    ability: "Pulverizing Meteor",
    guid: 339728,
    cooldownPlannerActive: true,
    icon: require("Images/Bosses/CastleNathria/StoneLegionGenerals/Icons/PulverizingMeteorIcon.jpg").default,
  },

  /* --------------------------- Inactive Abilities --------------------------- */
  {
    bossID: 2417,
    ability: "Wicked Laceration",
    guid: 333913,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/StoneLegionGenerals/Icons/WickedLacerationIcon.jpg").default,
  },
  {
    bossID: 2417,
    ability: "Heart Hemorrhage",
    guid: 334771,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/StoneLegionGenerals/Icons/HeartHemorrhageIcon.jpg").default,
  },

  {
    bossID: 2417,
    ability: "Wicked Blast",
    guid: 333716,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/StoneLegionGenerals/Icons/WickedBlastIcon.jpg").default,
  },
  {
    bossID: 2417,
    ability: "Heart Rend",
    guid: 334765,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/StoneLegionGenerals/Icons/HeartRendIcon.jpg").default,
  },
  {
    bossID: 2417,
    ability: "Stone Spike",
    guid: 343063,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/StoneLegionGenerals/Icons/StoneSpikeIcon.jpg").default,
  },
  {
    bossID: 2417,
    ability: "Ravenous Feast",
    guid: 342733,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/StoneLegionGenerals/Icons/RavenousFeastIcon.jpg").default,
  },
  {
    bossID: 2417,
    ability: "Wicked Slaughter",
    guid: 342253,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/StoneLegionGenerals/Icons/WickedSlaughterIcon.jpg").default,
  },
  {
    bossID: 2417,
    ability: "Serrated Swipe",
    guid: 334929,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/StoneLegionGenerals/Icons/SerratedSwipeIcon.jpg").default,
  },
  {
    bossID: 2417,
    ability: "Crystalline Burst",
    guid: 339693,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/StoneLegionGenerals/Icons/CrystallineBurstIcon.jpg").default,
  },
  {
    bossID: 2417,
    ability: "Crystalize",
    guid: 339690,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/StoneLegionGenerals/Icons/CrystalizeIcon.jpg").default,
  },
  {
    bossID: 2417,
    ability: "Ravenous Swipe",
    guid: 342740,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/StoneLegionGenerals/Icons/RavenousSwipeIcon.jpg").default,
  },

  /* -------------------------------------------------------------------------- */
  /*                                 Sludgefist                                 */
  /* -------------------------------------------------------------------------- */

  /* ---------------------------- Active Abilities ---------------------------- */
  {
    bossID: 2399,
    ability: "Colossal Roar",
    guid: 332687,
    cooldownPlannerActive: true,
    icon: require("Images/Bosses/CastleNathria/Sludgefist/Icons/ColossalRoarIcon.jpg").default,
  },
  {
    bossID: 2399,
    ability: "Destructive Impact",
    guid: 332969,
    cooldownPlannerActive: true,
    icon: require("Images/Bosses/CastleNathria/Sludgefist/Icons/DestructiveImpactIcon.jpg").default,
  },
  {
    bossID: 2399,
    ability: "Seismic Shift",
    guid: 340803,
    cooldownPlannerActive: true,
    icon: require("Images/Bosses/CastleNathria/Sludgefist/Icons/SeismicShiftIcon.jpg").default,
  },

  /* --------------------------- Inactive Abilities --------------------------- */
  {
    bossID: 2399,
    ability: "Crumbling Foundation",
    guid: 332443,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/Sludgefist/Icons/CrumblingFoundationIcon.jpg").default,
  },
  {
    bossID: 2399,
    ability: "Fractured Impact",
    guid: 341482,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/Sludgefist/Icons/FracturedImpactIcon.jpg").default,
  },
  {
    bossID: 2399,
    ability: "Collapsing Foundation",
    guid: 332197,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/Sludgefist/Icons/CollapsingFoundationIcon.jpg").default,
  },
  {
    bossID: 2399,
    ability: "Destructive Stomp",
    guid: 332318,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/Sludgefist/Icons/DestructiveStompIcon.jpg").default,
  },
  {
    bossID: 2399,
    ability: "Heedless Charge",
    guid: 331212,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/Sludgefist/Icons/HeedlessChargeIcon.jpg").default,
  },
  {
    bossID: 2399,
    ability: "Fractured Boulder",
    guid: 341102,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/Sludgefist/Icons/FracturedBoulderIcon.jpg").default,
  },
  {
    bossID: 2399,
    ability: "Chain Link",
    guid: 335300,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/Sludgefist/Icons/ChainLinkIcon.jpg").default,
  },
  {
    bossID: 2399,
    ability: "Shattering Chain",
    guid: 335295,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/Sludgefist/Icons/ShatteringChainIcon.jpg").default,
  },
  {
    bossID: 2399,
    ability: "Falling Rubble",
    guid: 332572,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/Sludgefist/Icons/FallingRubbleIcon.jpg").default,
  },
  {
    bossID: 2399,
    ability: "Stonequake",
    guid: 335361,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/Sludgefist/Icons/StonequakeIcon.jpg").default,
  },
  {
    bossID: 2399,
    ability: "Chain Slam",
    guid: 335354,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/Sludgefist/Icons/ChainSlamIcon.jpg").default,
  },
  {
    bossID: 2399,
    ability: "Chain Bleed",
    guid: 339189,
    cooldownPlannerActive: false,
    icon: require("Images/Bosses/CastleNathria/Sludgefist/Icons/ChainBleedIcon.jpg").default,
  },

  /* -------------------------------------------------------------------------- */
  /*                                 Denathrius                                 */
  /* -------------------------------------------------------------------------- */

  {
    bossID: 2407,
    ability: "Hand of Destruction",
    guid: 330627,
    cooldownPlannerActive: true,
    icon: require("Images/Bosses/CastleNathria/SireDenathrius/Icons/spell_shadow_unholystrength.jpg").default,
  },
  {
    bossID: 2407,
    ability: "Crescendo",
    guid: 336162,
    cooldownPlannerActive: true,
    icon: require("Images/Bosses/CastleNathria/SireDenathrius/Icons/spell_animarevendreth_missile.jpg").default,
  },
  {
    bossID: 2407,
    ability: "Cleansing Pain",
    guid: 326707,
    cooldownPlannerActive: true,
    icon: require("Images/Bosses/CastleNathria/SireDenathrius/Icons/spell_animarevendreth_wave.jpg").default,
  },
  {
    bossID: 2407,
    ability: "Blood Price",
    guid: 326858,
    cooldownPlannerActive: true,
    icon: require("Images/Bosses/CastleNathria/SireDenathrius/Icons/ability_ironmaidens_whirlofblood.jpg").default,
  },
  {
    bossID: 2407,
    ability: "Night Hunter",
    guid: 327810,
    cooldownPlannerActive: true,
    icon: require("Images/Bosses/CastleNathria/SireDenathrius/Icons/sha_ability_rogue_bloodyeye_nightmare.jpg").default,
  },
  {
    bossID: 2407,
    ability: "Painful Memories",
    guid: 326833,
    cooldownPlannerActive: true,
    icon: require("Images/Bosses/CastleNathria/SireDenathrius/Icons/spell_misc_emotionsad.jpg").default,
  },
  {
    bossID: 2407,
    ability: "Shattering Pain",
    guid: 332626,
    cooldownPlannerActive: true,
    icon: require("Images/Bosses/CastleNathria/SireDenathrius/Icons/sha_spell_fire_blueflamestrike_nightmare.jpg").default,
  },
  {
    bossID: 2407,
    ability: "Nathrian Hymn",
    guid: 338687,
    cooldownPlannerActive: true,
    icon: require("Images/Bosses/CastleNathria/SireDenathrius/Icons/70_inscription_vantus_rune_odyn.jpg").default,
  },
  {
    bossID: 2407,
    ability: "Crimson Chorus",
    guid: 329785,
    cooldownPlannerActive: true,
    icon: require("Images/Bosses/CastleNathria/SireDenathrius/Icons/spell_animarevendreth_buff.jpg").default,
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                          The Tarragrue                                         */
  /* ---------------------------------------------------------------------------------------------- */

  {
    bossID: 2423,
    ability: "Grasp of Death",
    guid: 347668,
    cooldownPlannerActive: true,
    icon: require("Images/Bosses/SanctumOfDomination/TheTarragrue/Icons/spell_animamaw_buff.jpg").default,
  },
  {
    bossID: 2423,
    ability: "Remnant: Soulforge Heat",
    guid: 352392,
    cooldownPlannerActive: true,
    icon: require("Images/Bosses/SanctumOfDomination/TheTarragrue/Icons/ability_mage_fierypayback.jpg").default,
  },
  {
    bossID: 2423,
    ability: "Chains of Eternity",
    guid: 354173,
    cooldownPlannerActive: true,
    icon: require("Images/Bosses/SanctumOfDomination/TheTarragrue/Icons/spell_frost_stun.jpg").default,
  },
  {
    bossID: 2423,
    ability: "Hungering Mist",
    guid: 347737,
    cooldownPlannerActive: true,
    icon: require("Images/Bosses/SanctumOfDomination/TheTarragrue/Icons/ability_argus_soulburst.jpg").default,
  },
  {
    bossID: 2423,
    ability: "Overpower",
    guid: 346985,
    cooldownPlannerActive: true,
    icon: require("Images/Bosses/SanctumOfDomination/TheTarragrue/Icons/ability_titankeeper_titanicsmash.jpg").default,
  },
  {
    bossID: 2423,
    ability: "Annihilating Smash",
    guid: 347274,
    cooldownPlannerActive: true,
    icon: require("Images/Bosses/SanctumOfDomination/TheTarragrue/Icons/inv_misc_powder_tin.jpg").default,
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                      The Eye of the Jailer                                     */
  /* ---------------------------------------------------------------------------------------------- */
  {
    bossID: 2433,
    ability: "Ire",
    guid: 355245,
    cooldownPlannerActive: true,
    icon: require("Images/Bosses/SanctumOfDomination/TheEyeOfTheJailer/Icons/spell_shadow_gathershadows.jpg").default,
  },
  {
    bossID: 2433,
    ability: "Scorn",
    guid: 355240,
    cooldownPlannerActive: true,
    icon: require("Images/Bosses/SanctumOfDomination/TheEyeOfTheJailer/Icons/ability_xavius_darkruination.jpg").default,
  },
  {
    bossID: 2433,
    ability: "Titanic Death Gaze",
    guid: 349028,
    cooldownPlannerActive: true,
    icon: require("Images/Bosses/SanctumOfDomination/TheEyeOfTheJailer/Icons/ability_argus_deathfog.jpg").default,
  },
  {
    bossID: 2433,
    ability: "Deathlink",
    guid: 351155,
    cooldownPlannerActive: true,
    icon: require("Images/Bosses/SanctumOfDomination/TheEyeOfTheJailer/Icons/ability_felarakkoa_eyeofterrok.jpg").default,
  },
  {
    bossID: 2433,
    ability: "Spreading Misery",
    guid: 351827,
    cooldownPlannerActive: true,
    icon: require("Images/Bosses/SanctumOfDomination/TheEyeOfTheJailer/Icons/spell_animamaw_missile.jpg").default,
  },
  {
    bossID: 2433,
    ability: "Eye Bolt",
    guid: 348054,
    cooldownPlannerActive: true,
    icon: require("Images/Bosses/SanctumOfDomination/TheEyeOfTheJailer/Icons/spell_animamaw_missile.jpg").default,
  },
  {
    bossID: 2433,
    ability: "Hopeless Lethargy",
    guid: 350606,
    cooldownPlannerActive: true,
    icon: require("Images/Bosses/SanctumOfDomination/TheEyeOfTheJailer/Icons/spell_nature_slow.jpg").default,
  },
  {
    bossID: 2433,
    ability: "Assailing Lance",
    guid: 348074,
    cooldownPlannerActive: true,
    icon: require("Images/Bosses/SanctumOfDomination/TheEyeOfTheJailer/Icons/inv_sword_2h_maw_c_01.jpg").default,
  },
  {
    bossID: 2433,
    ability: "Soul Shatter",
    guid: 350028,
    cooldownPlannerActive: true,
    icon: require("Images/Bosses/SanctumOfDomination/TheEyeOfTheJailer/Icons/sha_spell_shadow_shadesofdarkness.jpg").default,
  },
  {
    bossID: 2433,
    ability: "Piercing Lens",
    guid: 350453,
    cooldownPlannerActive: true,
    icon: require("Images/Bosses/SanctumOfDomination/TheEyeOfTheJailer/Icons/ability_hunter_aspectoftheviper.jpg").default,
  },
  {
    bossID: 2433,
    ability: "Shattered Soul",
    guid: 350034,
    cooldownPlannerActive: true,
    icon: require("Images/Bosses/SanctumOfDomination/TheEyeOfTheJailer/Icons/sha_spell_shadow_shadesofdarkness.jpg").default,
  },
  {
    bossID: 2433,
    ability: "Immediate Extermination",
    guid: 353591,
    cooldownPlannerActive: true,
    icon: require("Images/Bosses/SanctumOfDomination/TheEyeOfTheJailer/Icons/ability_blackhand_marked4death.jpg").default,
  },
  {
    bossID: 2433,
    ability: "Dragging Chains",
    guid: 349979,
    cooldownPlannerActive: true,
    icon: require("Images/Bosses/SanctumOfDomination/TheEyeOfTheJailer/Icons/inv_misc_steelweaponchain.jpg").default,
  },
  {
    bossID: 2433,
    ability: "Jailer's Misery",
    guid: 350809,
    cooldownPlannerActive: true,
    icon: require("Images/Bosses/SanctumOfDomination/TheEyeOfTheJailer/Icons/spell_animamaw_groundstate.jpg").default,
  },
  {
    bossID: 2433,
    ability: "Desolation Beam",
    guid: 350847,
    cooldownPlannerActive: true,
    icon: require("Images/Bosses/SanctumOfDomination/TheEyeOfTheJailer/Icons/achievement_boss_cthun.jpg").default,
  },
  {
    bossID: 2433,
    ability: "Slothful Corruption",
    guid: 350713,
    cooldownPlannerActive: true,
    icon: require("Images/Bosses/SanctumOfDomination/TheEyeOfTheJailer/Icons/warlock_spelldrain.jpg").default,
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                            The Nine                                            */
  /* ---------------------------------------------------------------------------------------------- */

  {
    bossID: 2429,
    ability: "Resentment",
    guid: 351399,
    cooldownPlannerActive: true,
    icon: require("Images/Bosses/SanctumOfDomination/TheNine/Icons/spell_animamaw_buff.jpg").default,
  },
  {
    bossID: 2429,
    ability: "Repeating Slash",
    guid: 350206,
    cooldownPlannerActive: true,
    icon: require("Images/Bosses/SanctumOfDomination/TheNine/Icons/ability_rogue_bladetwisting.jpg").default,
  },
  {
    bossID: 2429,
    ability: "Song of Dissolution",
    guid: 350287,
    cooldownPlannerActive: true,
    icon: require("Images/Bosses/SanctumOfDomination/TheNine/Icons/spell_animamaw_debuff.jpg").default,
  },
  {
    bossID: 2429,
    ability: "Arthura's Crushing Gaze",
    guid: 350040,
    cooldownPlannerActive: true,
    icon: require("Images/Bosses/SanctumOfDomination/TheNine/Icons/spell_ice_lament.jpg").default,
  },
  {
    bossID: 2429,
    ability: "Fragments of Destiny",
    guid: 350542,
    cooldownPlannerActive: true,
    icon: require("Images/Bosses/SanctumOfDomination/TheNine/Icons/spell_frost_ice-shards.jpg").default,
  },
  {
    bossID: 2429,
    ability: "Unending Strike",
    guid: 350202,
    cooldownPlannerActive: true,
    icon: require("Images/Bosses/SanctumOfDomination/TheNine/Icons/inv_weapon_shortblade_84.jpg").default,
  },
  {
    bossID: 2429,
    ability: "Link Essence",
    guid: 350486,
    cooldownPlannerActive: true,
    icon: require("Images/Bosses/SanctumOfDomination/TheNine/Icons/ability_warlock_soullink.jpg").default,
  },
  {
    bossID: 2429,
    ability: "Soulful Blast",
    guid: 350283,
    cooldownPlannerActive: true,
    icon: require("Images/Bosses/SanctumOfDomination/TheNine/Icons/spell_animamaw_missile.jpg").default,
  },
  {
    bossID: 2429,
    ability: "Pierce Soul",
    guid: 350475,
    cooldownPlannerActive: true,
    icon: require("Images/Bosses/SanctumOfDomination/TheNine/Icons/ability_demonhunter_soulcleave2.jpg").default,
  },
  {
    bossID: 2429,
    ability: "Aradne's Falling Strike",
    guid: 350098,
    cooldownPlannerActive: true,
    icon: require("Images/Bosses/SanctumOfDomination/TheNine/Icons/inv_icon_wingbroken05c.jpg").default,
  },
  {
    bossID: 2429,
    ability: "Daschla's Mighty Anvil",
    guid: 350185,
    cooldownPlannerActive: true,
    icon: require("Images/Bosses/SanctumOfDomination/TheNine/Icons/ability_smash.jpg").default,
  },
];

export const raidList = [
  // { id: 0, zoneID: 2217, raidName: "Ny’alotha" },
  { id: 0, zoneID: 2296, raidName: "Castle Nathria" },
  { id: 1, zoneID: 2450, raidName: "Sanctum of Domination" },
];
export const bossList = [
  {
    DungeonEncounterID: 2344,
    ID: 2375,
    name: "N'zoth",
    zoneID: 2217,
  },
  {
    DungeonEncounterID: 2398,
    ID: 2393,
    name: "Shriekwing",
    zoneID: 2296,
  },
  {
    DungeonEncounterID: 2418,
    ID: 2429,
    name: "Huntsman Altimor",
    zoneID: 2296,
  },
  {
    DungeonEncounterID: 2402,
    ID: 2422,
    name: "Sun King's Salvation",
    zoneID: 2296,
  },
  {
    DungeonEncounterID: 2405,
    ID: 2418,
    name: "Artificer Xy'mox",
    zoneID: 2296,
  },
  {
    DungeonEncounterID: 2383,
    ID: 2428,
    name: "Hungering Destroyer",
    zoneID: 2296,
  },
  {
    DungeonEncounterID: 2406,
    ID: 2420,
    name: "Lady Inerva Darkvein",
    zoneID: 2296,
  },
  {
    DungeonEncounterID: 2412,
    ID: 2426,
    name: "The Council of Blood",
    zoneID: 2296,
  },
  {
    DungeonEncounterID: 2399,
    ID: 2394,
    name: "Sludgefist",
    zoneID: 2296,
  },
  {
    DungeonEncounterID: 2417,
    ID: 2425,
    name: "Stone Legion Generals",
    zoneID: 2296,
  },
  {
    DungeonEncounterID: 2407,
    ID: 2424,
    name: "Sire Denathrius",
    zoneID: 2296,
  },
  {
    DungeonEncounterID: 2423,
    ID: 2435,
    name: "The Tarragrue",
    zoneID: 2450,
  },
  {
    DungeonEncounterID: 2429,
    ID: 2439,
    name: "The Nine",
    zoneID: 2450,
  },
  {
    DungeonEncounterID: 2422,
    ID: 2440,
    name: "Kel'Thuzad",
    zoneID: 2450,
  },
  {
    DungeonEncounterID: 2435,
    ID: 2441,
    name: "Sylvanas Windrunner",
    zoneID: 2450,
  },
  {
    DungeonEncounterID: 2433,
    ID: 2442,
    name: "The Eye of the Jailer",
    zoneID: 2450,
  },
  {
    DungeonEncounterID: 2430,
    ID: 2443,
    name: "Painsmith Raznal",
    zoneID: 2450,
  },
  {
    DungeonEncounterID: 2432,
    ID: 2444,
    name: "Remnant of Ner'zhul",
    zoneID: 2450,
  },
  {
    DungeonEncounterID: 2434,
    ID: 2445,
    name: "Soulrender Dormazain",
    zoneID: 2450,
  },
  {
    DungeonEncounterID: 2436,
    ID: 2446,
    name: "Guardian of the First Ones",
    zoneID: 2450,
  },
  {
    DungeonEncounterID: 2431,
    ID: 2447,
    name: "Fatescribe Roh-Kalo",
    zoneID: 2450,
  },
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

// Boss Notes?
// Shriekwing - Reverberating Scream consists of large damage on hit, follwoed by a dot.

// Contains the list of races localization IDs for each class's available races.
export const classRaceList = {
  "Holy Paladin": {
    races: ["Races.Draenei", "Races.Dwarf", "Races.Human", "Races.Lightforged Draenei", "Races.Dark Iron Dwarf", "Races.Blood Elf", "Races.Tauren", "Races.Zandalari Troll"],
  },
  "Restoration Druid": {
    races: ["Races.Night Elf", "Races.Worgen", "Races.Kul Tiran", "Races.Tauren", "Races.Troll", "Races.Highmountain Tauren", "Races.Zandalari Troll"],
  },
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
  },
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
  },
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
  },
};
