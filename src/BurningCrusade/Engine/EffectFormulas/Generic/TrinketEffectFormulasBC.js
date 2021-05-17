

// TODO: Write proper comments. See Lingering Sunmote for an example.
export function getTrinketEffectBC(effectName, player, contentType, itemLevel, userSettings = {}) {
    let bonus_stats = {};
  
    /* -------- Trinket Data holds a trinkets actual power values. Formulas here, data there. ------- */
    //let activeTrinket = trinket_data.find((trinket) => trinket.name === effectName);
    const activeTrinket = effectName;

    if (activeTrinket === undefined) {
      /* ---------------------------------------------------------------------------------------------- */
      /*                                         Error Handling                                         */
      /* ---------------------------------------------------------------------------------------------- */
      console.log("no trinket found");
      return bonus_stats;
    } else if (
      /* ---------------------------------------------------------------------------------------------- */
      /*                                        Essence of the Martyr                                       */
      /* ---------------------------------------------------------------------------------------------- */
      effectName === "Essence of the Martyr"
    ) {
        console.log("Essence of the Martyr");
        bonus_stats.intellect = 3213;
    }




    return bonus_stats;
}