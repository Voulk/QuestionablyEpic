import Player from "General/Modules/Player/Player";

export const getDruidTierSet = (effectName: string, player: Player) => {
  // These are going to be moved to a proper file soon.


  let bonus_stats: Stats = {};

  /* ---------------------------------------------------------------------------------------------- */
  /*                                       Malorne Raiment T4                                       */
  /* ---------------------------------------------------------------------------------------------- */
  if (effectName === "Druid T11-2") {
    bonus_stats.mana = 29 * 0.05 * 120 / 12; // PH TODO
  }

  return bonus_stats;
};
