
export const embellishmentData = [
    {
        /* ---------------------------------------------------------------------------------------------- */
        /*                         Potent Venom (Venom-Steeped Stompers)                                  */
        /* ---------------------------------------------------------------------------------------------- */
        /* Chance to gain X of your highest secondary stat, and lose X of your lowest secondary stat. 
        */
        name: "Potent Venom",
        effects: [
          { 
            coefficient: 0.722681,
            table: -7,
            duration: 10,
            ppm: 2,
          },
          { 
            coefficient:-0.2887,
            table: -7,
            duration: 10,
            ppm: 2,
          },
        ],
        runFunc: function(data, player, itemLevel, additionalData) {
          let bonus_stats = {};
          // TODO
          return bonus_stats;
        }
      },
]