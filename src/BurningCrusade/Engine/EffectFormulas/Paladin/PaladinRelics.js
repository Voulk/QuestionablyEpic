
export const getPaladinRelic = (effectName, player) => {
    // These are going to be moved to a proper file soon.

    let bonus_stats = {};


    if (effectName === undefined) {
        /* ---------------------------------------------------------------------------------------------- */
        /*                                         Error Handling                                         */
        /* ---------------------------------------------------------------------------------------------- */
        console.log("no Libram found");
        return bonus_stats;
      } else if ( 
        /* ---------------------------------------------------------------------------------------------- */
        /*                                     Tome of Absolute Truth                                     */
        /* ---------------------------------------------------------------------------------------------- */
        effectName === "Tome of Absolute Truth" // Holy Light mana cost -34
      ) {
          const effect = {

          }
          bonus_stats.bonushealing = 0;
      }
    else if (
      /* ---------------------------------------------------------------------------------------------- */
      /*                                        Libram of Mending                                             */
      /* ---------------------------------------------------------------------------------------------- */
      effectName === "Libram of Mending" // Holy Light gives 22 MP5 for 30 seconds.
    ) {
        const effect = {
    
        }
        bonus_stats.bonushealing = 0
    }
    else if (
      /* ---------------------------------------------------------------------------------------------- */
      /*                                   Libram of Souls Redeemed                                   */
      /* ---------------------------------------------------------------------------------------------- */
      effectName === "Libram of Souls Redeemed" // Blessing of Light gives HL +120 healing and FoL +60 healing.
    ) {
        const effect = {
    
        }
        bonus_stats.bonushealing = 0
    }
    else if (
        /* ---------------------------------------------------------------------------------------------- */
        /*                                    Libram of the Lightbringer                                  */
        /* ---------------------------------------------------------------------------------------------- */
        effectName === "Libram of the Lightbringer" // Holy Light +87 healing
      ) {
          const effect = {
      
          }
          bonus_stats.bonushealing = 0
      }
    else if (
        /* ---------------------------------------------------------------------------------------------- */
        /*                                   Blessed Book of Nagrand                                 */
        /* ---------------------------------------------------------------------------------------------- */
        effectName === "Blessed Book of Nagrand" // Flash healing +79.
        ) {
            const effect = {
        
            }
            bonus_stats.bonushealing = 0
        }
    else if (
        /* ---------------------------------------------------------------------------------------------- */
        /*                                       Libram of Light                                     */
        /* ---------------------------------------------------------------------------------------------- */
        effectName === "Libram of Light" // Flash healing +83.
        ) {
            const effect = {
        
            }
            bonus_stats.bonushealing = 0
        }
    

    return bonus_stats;
  
}