export const itemLevels: {raid: number[]; dungeon: number[]; pvp: number[]; crafted: number[];} = {
  raid: [
    /* ----------------------------------------- Raid Finder ---------------------------------------- */
    // Slider Value = 0
    623, // LFR Base
    645, // LFR Max
    /* ------------------------------------------- Normal ------------------------------------------- */
    636, // Normal Base
    658, // Normal Max
    /* ------------------------------------------- Heroic ------------------------------------------- */
    649, // Heroic Base
    665, // Heroic Max
    /* ------------------------------------------- Mythic ------------------------------------------- */
    662, // Mythic Base
    678, // Mythic Max
  ],
  dungeon: [
    636,
    639,
    642,
    645,
    649,
    652,
    655,
    658,
    665,
    671,
    678
  ],
  pvp: [], // We aren't supporting PVP gear right now. If it becomes widely relevant we can re-add it.
  crafted: [606, 629, 636, 658, 675] // We don't really need to support *every* crafted level. Just the 5* crafts. Config is too messy otherwise.
};
