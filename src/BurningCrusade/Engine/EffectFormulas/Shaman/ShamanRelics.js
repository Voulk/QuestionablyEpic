
export const getShamanRelic = (effectName, player) => {
    // These are going to be moved to a proper file soon.
    let bonus_stats = {};

    if (effectName === undefined) {
        /* ---------------------------------------------------------------------------------------------- */
        /*                                         Error Handling                                         */
        /* ---------------------------------------------------------------------------------------------- */
        console.log("no trinket found");
        return bonus_stats;
      } else if ( 
        /* ---------------------------------------------------------------------------------------------- */
        /*                                      Totem of Living Water                                     */
        /* ---------------------------------------------------------------------------------------------- */
        effectName === "Totem of Living Water" // Chain Heal Mana Cost -20
      ) {
          const effect = {

          }
          bonus_stats.bonushealing = Math.round(effect.duration * effect.value / effect.cooldown);
      }
    else if (
      /* ---------------------------------------------------------------------------------------------- */
      /*                                 Totem of the Maelstrom                                         */
      /* ---------------------------------------------------------------------------------------------- */
      effectName === "Totem of the Maelstrom" // Healing Wave Mana Cost -24
    ) {
        const effect = {
    
        }
        bonus_stats.bonushealing = 0
    }
    else if (
      /* ---------------------------------------------------------------------------------------------- */
      /*                                   Totem of Healing Rains                                  */
      /* ---------------------------------------------------------------------------------------------- */
      effectName === "Totem of Healing Rains" // Chain Heal +87
    ) {
        const effect = {
    
        }
        bonus_stats.hps = player.getSpellCPM(25423, "Raid") * 87 * 3 / 60
    }
    else if (
      /* ---------------------------------------------------------------------------------------------- */
      /*                                        Totem of Spontaneous Regrowth                               */
      /* ---------------------------------------------------------------------------------------------- */
      effectName === "Totem of Spontaneous Regrowth" // Healing Wave +88
    ) {
        const effect = {
    
        }
        bonus_stats.bonushealing = 0
    }
    else if (
      /* ---------------------------------------------------------------------------------------------- */
      /*                                          Totem of the Plains                                   */
      /* ---------------------------------------------------------------------------------------------- */
      effectName === "Totem of the Plains" // Lesser Healing Wave +79
    ) {
        const effect = {
    
        }
        bonus_stats.bonushealing = 0
    }
    else if (
      /* ---------------------------------------------------------------------------------------------- */
      /*                                   Totem of the Thunderhead                                     */
      /* ---------------------------------------------------------------------------------------------- */
      effectName === "Totem of the Thunderhead" // Water Shield gives +27 mana on trigger, and +2 MP5
    ) {
        const effect = {
    
        }
        bonus_stats.bonushealing = 0
    }
    
    return bonus_stats;
  
}