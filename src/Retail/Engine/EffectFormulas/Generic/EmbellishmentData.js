

export const getEmbellishmentEffect = (effectName, player, contentType, itemLevel, effect) => {

    let activeEffect = embellishmentData.find((effect) => effect.name === effectName);
    let additionalData = {};

    if (activeEffect !== undefined) {
      return activeEffect.runFunc(activeEffect.effects, player, itemLevel, additionalData);
    }
    else {
      return {};
    }

}

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
      {
        /* -------------------- */
        /* Elemental Lariat                       
        /* -------------------- */
        /* Gain X of a secondary stat on one of your gems.
        */
        name: "Elemental Lariat",
        effects: [
          { 
            coefficient: 0.722681,
            table: -7,
            duration: 10,
            ppm: 2,
          },
        ],
        runFunc: function(data, player, itemLevel, additionalData) {
          let bonus_stats = {};
          // TODO
          bonus_stats.haste = 300; // Testing
          return bonus_stats;
        }
      },
]