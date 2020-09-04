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
  32379,
];

export const paladinCooldownNames = [
  "Avenging Wrath",
  "Aura Mastery",
  "Divine Toll",
  "Ashen Hallow",
  "Vanquisher's Hammer",
  "Blessing of the Seasons",
];

export const shamanCooldownNames = [
  "Healing Tide Totem",
  "Vesper Totem",
  "Chain Harvest",
  "Primordial Wave",
  "Fae Transfusion",
];

export const priestCooldownNames = [
  "Power Word: Barrier",
  "Evangelism",
  "Divine Hymn",
  "Boon of the Ascended",
  "Mindgames",
  "Unholy Nova",
  "Fae Blessings",
];

export const druidCooldownNames = [
  "Incarnation: Tree of Life",
  "Tranquility",
  "Kindred Spirits",
  "Ravenous Frenzy",
  "Adaptive Swarm",
  "Convoke the Spirits",
];

export const monkCooldownNames = [
  "Revival",
  "Weapons of Order",
  "Fallen Order",
  "Bonedust Brew",
  "Faeline Stomp",
];

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
  {
    name: "Divine Toll",
    guid: 304971,
    duration: 1,
    cooldown: 60,
  },
  {
    name: "Ashen Hallow",
    guid: 316958,
    duration: 30,
    cooldown: 240,
  },
  {
    name: "Vanquisher's Hammer",
    guid: 328204,
    duration: 1,
    cooldown: 30,
  },
  {
    name: "Blessing of the Seasons",
    guid: 328278,
    duration: 1,
    cooldown: 30,
  },
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
  // --------------Covenant Abilities---------------
  {
    name: "Boon of the Ascended",
    guid: 325013,
    duration: 10,
    cooldown: 180,
  },
  {
    name: "Mindgames",
    guid: 323673,
    duration: 5,
    cooldown: 45,
  },
  {
    name: "Unholy Nova",
    guid: 324724,
    duration: 15,
    cooldown: 60,
  },
  {
    name: "Fae Blessings",
    guid: 327661,
    duraton: 1,
    cooldown: 90,
  },
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
  // --------------Covenant Abilities---------------
  {
    name: "Kindred Spirits",
    guid: 326434,
    duration: 10,
    cooldown: 60,
  },
  {
    name: "Ravenous Frenzy",
    guid: 323546,
    duration: 20,
    cooldown: 180,
  },
  {
    name: "Adaptive Swarm",
    guid: 325727,
    duration: 12,
    cooldown: 25,
  },
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
  {
    name: "Weapons of Order",
    guid: 310454,
    duration: 30,
    cooldown: 120,
  },
  {
    name: "Fallen Order",
    guid: 326860,
    duration: 24,
    cooldown: 180,
  },
  {
    name: "Bonedust Brew",
    guid: 325216,
    duration: 10,
    cooldown: 60,
  },
  {
    name: "Faeline Stomp",
    guid: 327104,
    duration: 30,
    cooldown: 30,
  },
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
  // --------------Covenant Abilities---------------
  {
    name: "Vesper Totem",
    guid: 324386,
    duration: 30,
    cooldown: 60,
  },
  {
    name: "Chain Harvest",
    guid: 320674,
    duration: 1,
    cooldown: 90,
  },
  {
    name: "Primordial Wave",
    guid: 326059,
    duration: 1,
    cooldown: 45,
  },
  {
    name: "Fae Transfusion",
    guid: 328923,
    duration: 3,
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
  // Hungering Destroyer
  // Note Gluttonous Miasma Seems to have 2 GUID
  { ability: "Gluttonous Miasma", guid: 330537 },
  { ability: "Gluttonous Miasma", guid: 330590 },
  { ability: "Volatile Ejection", guid: 334228 },
  { ability: "Expunge", guid: 329742 },
  { ability: "Desolate", guid: 329455 },
  { ability: "Hungering Strikes", guid: 332296 },
  { ability: "Overwhelm", guid: 329774 },
  { ability: "Obliterating Rift", guid: 329835 },

  // Lady Inerva Darkvein
  // Note Condemn Seems to have 2 GUID
  { ability: "Condemn", guid: 331550 },
  { ability: "Condemn", guid: 334017 },
  { ability: "Loose Anima", guid: 325184 },
  { ability: "Warped Desires", guid: 325382 },
  { ability: "Bottled Anima", guid: 325769 },
  { ability: "Shared Suffering", guid: 325004 },
  { ability: "Shared Cognition", guid: 325908 },
  { ability: "Unleashed Shadow", guid: 332668 },
  { ability: "Expose Desires", guid: 325379 },
  { ability: "Sins of the Past", guid: 326040 },
  { ability: "Unconscionable Guilt", guid: 331573 },
  { ability: "Concentrated Anima", guid: 332664 },
  { ability: "Highly Concentrated Anima", guid: 340477 },

  // Shriekwing
  //
  // Bloodcurdling Shriek
  // Blind Swipe
  // Deadly Descent
  // Echoing Sonar
  // Sonar Shriek
  //
  // Note Earsplitting Shriek, Desdent Seems to have 2 GUID
  { ability: "Sanguine Ichor", guid: 340324 },
  { ability: "Earsplitting Shriek", guid: 330712 },
  { ability: "Earsplitting Shriek", guid: 336005 },
  { ability: "Descent", guid: 342923 },
  { ability: "Descent", guid: 342078 },
  { ability: "Bloodlight", guid: 343384 },
  { ability: "Echoing Screech", guid: 342866 },
  { ability: "Exsanguinating Bite", guid: 328887 },
  { ability: "Exsanguinated", guid: 328897 },

  // Stone Born Generals
  //
  { ability: "Wicked Laceration", guid: 333913 },
  { ability: "Rended Heart", guid: 334771 },
  { ability: "Pulverizing Meteor", guid: 339728 },
  { ability: "Wicked Blast", guid: 333716 },
  { ability: "Heart Rend", guid: 334765 },
  { ability: "Stone Spike", guid: 343063 },
  { ability: "Ravenous Feast", guid: 342733 },
  { ability: "Wicked Slaughter", guid: 342253 },
  { ability: "Serrated Swipe", guid: 334929 },
  { ability: "Crystalline Burst", guid: 339693 },
  { ability: "Crystalize", guid: 339690 },
  { ability: "Ravenous Swipe", guid: 342740 },

  // Sun King's Salvation
  //
  // unleashed pyroclasm
  // fiery strike
  // vanquished
  //
  //
  { ability: "Crimson Flurry", guid: 326586 },
  { ability: "Greater Castigation", guid: 328890 },
  { ability: "Fragmentation", guid: 336398 },
  { ability: "Shattering Ruby", guid: 335540 },
  { ability: "Smoldering Remnants", guid: 328579 },
  { ability: "Blazing Surge", guid: 329518 },
  { ability: "Soul Infusion", guid: 339244 },
  { ability: "Smoldering Plumage", guid: 341254 },
  { ability: "Ember Blast", guid: 325877 },
  { ability: "Scornful Blast", guid: 325590 },
  { ability: "Lingering Embers", guid: 326430 },
  { ability: "Burning Remnants", guid: 326456 },
  { ability: "Concussive Smash", guid: 325506 },
  { ability: "Fiery Strike", guid: 326455 },
  { ability: "Vanquishing Strike", guid: 325440 },
  { ability: "Vulgar Brand", guid: 333002 },

  // Huntsman Altimor
  //
  // vicious bolt
  // shatter shot
  // vicious wound
  // crushing stone / shattering stone
  // petrifying howl
  // stone shards
  { ability: "Deathly Roar", guid: 334708 },
  { ability: "Shoot", guid: 335016 },
  { ability: "Sinseeker", guid: 335304 },
  { ability: "Unstable Soul", guid: 339639 },
  { ability: "Jagged Claws", guid: 334971 },
  { ability: "Spreadshot", guid: 334404 },
  { ability: "Rip Soul", guid: 334797 },
  { ability: "Vicious Lunge", guid: 334939 },

  // Xymox
  //
  //
  //
  //
  //
  //
  // Note Glyph of Destruction Seems to have 2 GUID
  { ability: "Soul Singe", guid: 340842 },
  { ability: "Hyperlight Spark", guid: 325399 },
  { ability: "Annihilate", guid: 328789 },
  { ability: "Glyph of Destruction", guid: 325324 },
  { ability: "Glyph of Destruction", guid: 325331 },
  { ability: "Withering Touch", guid: 340860 },
  { ability: "Arcane Vulnerability", guid: 340533 },
  { ability: "Aura of Dread", guid: 340870 },
  { ability: "Rift Blast", guid: 329256 },
  { ability: "Dimensional Tear", guid: 328545 },
  { ability: "Stasis Trap", guid: 326302 },

  // Council of Blood
  //
  { ability: "Oppressive Atmosphere", guid: 334909 },
  { ability: "Dark Recital", guid: 331638 },
  { ability: "Dark Recital", guid: 334743 },
  { ability: "Anima Fountain", guid: 327475 },
  { ability: "Evasive Lunge", guid: 327503 },
  { ability: "Evasive Lunge", guid: 327610 },
  { ability: "Waltz of Blood", guid: 327619 },
  { ability: "Waltz of Blood", guid: 342853 },
  { ability: "Bolt of Power", guid: 337110 },
  { ability: "Tactical Advance", guid: 328334 },
];