

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
        const effect = {
            duration: 20,
            cooldown: 120,
            value: 297,
        }
        bonus_stats.bonushealing = Math.round(effect.duration * effect.value / effect.cooldown);
    }




    return bonus_stats;
}