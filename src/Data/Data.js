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
]

export const paladinCooldownNames = [
  'Avenging Wrath',
  'Aura Mastery',
  'Divine Toll',
  'Ashen Hallow',
  "Vanquisher's Hammer",
  'Blessing of the Seasons'
]

export const shamanCooldownNames = [
  'Healing Tide Totem',
  'Vesper Totem',
  'Chain Harvest',
  'Primordial Wave',
  'Fae Transfusion'
]

export const priestCooldownNames = [
  'Power Word: Barrier',
  'Evangelism',
  'Divine Hymn',
  'Boon of the Ascended',
  'Mindgames',
  'Unholy Nova',
  'Fae Blessings'  
]


export const druidCooldownNames = [
  'Incarnation: Tree of Life',
  'Tranquility',
  'Kindred Spirits',
  'Ravenous Frenzy',
  'Adaptive Swarm',
  'Convoke the Spirits'
]


export const monkCooldownNames = [
  'Revival',
  'Weapons of Order',
  'Fallen Order',
  'Bonedust Brew',
  'Faeline Stomp',
]


export const healerCooldownsDetailed = [
  // --------------------Paladin--------------------
  // ----------------Base Abilities-----------------
  { name: 'Avenging Wrath', guid: 31884, duration: 20, cooldown: 120 },
  { name: 'Aura Mastery', guid: 31821, duration: 8, cooldown: 180 },
  // --------------Covenant Abilities---------------
  { name: 'Divine Toll', guid: 304971, duration: 1, cooldown: 60 },
  { name: 'Ashen Hallow', guid: 316958, duration: 30, cooldown: 240 },
  { name: "Vanquisher's Hammer", guid: 328204, duration: 1, cooldown: 30 }, 
  { name: 'Blessing of the Seasons', guid: 328278, duration: 1, cooldown: 30},

  // --------------------Priest---------------------
  // ----------------Base Abilities-----------------
  { name: 'Power Word: Barrier', guid: 62618, duartion: 10, cooldown: 180 },
  { name: 'Evangelism', guid: 246287, duration: 6, cooldown: 90 },
  { name: 'Divine Hymn', guid: 64843, duration: 8, cooldown: 180 },
  { name: 'Holy Word: Salvation', guid: 265202, duration: 1, cooldown: 720 },
  // --------------Covenant Abilities---------------
  { name: 'Boon of the Ascended', guid: 325013, duration: 10, cooldown: 180 },
  { name: 'Mindgames', guid: 323673, duration: 5, cooldown: 45 },
  { name: 'Unholy Nova', guid: 324724, duration: 15, cooldown: 60 },
  { name: 'Fae Blessings', guid: 327661, duraton: 1, cooldown: 90 },

  // ---------------------Druid---------------------
  { name: 'Incarnation: Tree of Life', guid: 33891, duration: 30, cooldown: 180 },
  { name: 'Tranquility', guid: 740, duration: 8, cooldown: 180},
  // --------------Covenant Abilities---------------
  { name: 'Kindred Spirits', guid: 326434, duration: 10, cooldown: 60 },
  { name: 'Ravenous Frenzy', guid: 323546, duration: 20, cooldown: 180 },
  { name: 'Adaptive Swarm', guid: 325727, duration: 12, cooldown: 25 },
  { name: 'Convoke the Spirits', guid: 323764, duration: 4, cooldown: 120 },

  // --------------------Monk-----------------------
  // ----------------Base Abilities-----------------
  { name: 'Revival', guid: 115310, duration: 1, cooldown: 180 },
  // --------------Covenant Abilities---------------
  { name: 'Weapons of Order', guid: 310454, duration: 30, cooldown: 120 },
  { name: 'Fallen Order', guid: 326860, duration: 24, cooldown: 180 },
  { name: 'Bonedust Brew', guid: 325216, duration: 10, cooldown: 60 },
  { name: 'Faeline Stomp', guid: 327104, duration: 30, cooldown: 30 },

  // -------------------Shaman----------------------
  // ----------------Base Abilities-----------------
  { name: 'Healing Tide Totem', guid: 108280, duration: 10, cooldown: 180 },
  { name: 'Spirit Link Totem', guid: 98008, duration: 6, cooldown: 180 },
  // --------------Covenant Abilities---------------
  { name: 'Vesper Totem', guid: 324386, duration: 30, cooldown: 60 },
  { name: 'Chain Harvest', guid: 320674, duration: 1, cooldown: 90 },
  { name: 'Primordial Wave', guid: 326059, duration: 1, cooldown: 45 },
  { name: 'Fae Transfusion', guid: 328923, duration: 3, cooldown: 120 }
]

export const bossIds = [
  { id: 2327, name: 'Maut', raid: "Ny'alotha, the Waking City" },
  { id: 2328, name: 'Dark Inquisitor Xanesh', raid: "Ny'alotha, the Waking City" },
  { id: 2329, name: 'Wrathion', raid: "Ny'alotha, the Waking City" },
  { id: 2331, name: 'Ra-den the Despoiled', raid: "Ny'alotha, the Waking City" },
  { id: 2333, name: 'The Hivemind', raid: "Ny'alotha, the Waking City" },
  { id: 2334, name: 'Prophet Skitra', raid: "Ny'alotha, the Waking City" },
  { id: 2335, name: "Shad'har the Insatiable", raid: "Ny'alotha, the Waking City" },
  { id: 2336, name: 'Vexiona', raid: "Ny'alotha, the Waking City" },
  { id: 2337, name: "Carapace of N'Zoth", raid: "Ny'alotha, the Waking City" },
  { id: 2343, name: "Drest'agath", raid: "Ny'alotha, the Waking City" },
  { id: 2344, name: "N'Zoth the Corruptor", raid: "Ny'alotha, the Waking City" },
  { id: 2345, name: "Il'gynoth, Corruption Reborn", raid: "Ny'alotha, the Waking City" },
  
  { id: 2398, name: 'Shriekwing', raid: 'Castle Nathria' },
  { id: 2418, name: 'Huntsman Altimor', raid: 'Castle Nathria' },
  { id: 2402, name: "Sun King's Salvation", raid: 'Castle Nathria' },
  { id: 2405, name: "Artificer Xy'mox", raid: 'Castle Nathria' },
  { id: 2383, name: 'Hungering Destroyer', raid: 'Castle Nathria' },
  { id: 2406, name: 'Lady Inerva Darkvein', raid: 'Castle Nathria' },
  { id: 2412, name: 'The Council of Blood', raid: 'Castle Nathria' },
  { id: 2399, name: 'Sludgefist', raid: 'Castle Nathria' },
  { id: 2417, name: 'Stone Legion Generals', raid: 'Castle Nathria' },
  { id: 2407, name: 'Sire Denathrius', raid: 'Castle Nathria' },
]