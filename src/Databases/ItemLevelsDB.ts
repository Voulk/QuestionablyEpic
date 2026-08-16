export const itemLevels: {raid: number[]; dungeon: number[]; pvp: number[]; crafted: number[];} = {
  // Midnight Season 2 spreadsheet: drop bases, then track caps (LFR/Veteran, Normal/Champion, Heroic/Hero, Mythic/Myth).
  raid: [
    /* ----------------------------------------- Drop bases ---------------------------------------- */
    279, // LFR (Veteran)
    292, // Normal (Champion)
    305, // Heroic (Hero)
    318, // Mythic (Myth) — most bosses; last 2 override higher in engine

    /* --------------------------------------- Fully upgraded -------------------------------------- */
    295, // Veteran max
    308, // Champion max
    321, // Hero max
    334, // Myth 6/6; some bosses drop above this (engine overrides last 2 to 344)
  ],
  // End-of-run dungeon drops (UF uses MPlusKeyRewards for key → vault/bonus mapping).
  dungeon: [
    292, // M0
    295, // +2/3
    298, // +4
    302, // +5
    305, // +6/7
    308, // +8/9
    311, // +10
  ],
  pvp: [
    /* ------------------------------------------ Unranked ------------------------------------------ */
    // Slider Value = 0
    382,
    /* ------------------------------------------ Combatant ----------------------------------------- */
    // Slider Value = 1
    385,
    /* ----------------------------------------- Challenger ----------------------------------------- */
    // Slider Value = 2
    389,
    /* -------------------------------------------- Rival ------------------------------------------- */
    // Slider Value = 3
    392,
    /* ------------------------------------------- Duelist ------------------------------------------ */
    // Slider Value = 4
    395,
    /* -------------------------------------------- Elite ------------------------------------------- */
    // Slider Value = 5
    398,
    // Slider Value = 6
    402,
    // Slider Value = 7
    405,
    // Slider Value = 8
    408,
  ],
  crafted: [
    305, // R5 Champion
    318, // R5 Hero
    331, // R5 Mythic
  ]
};
