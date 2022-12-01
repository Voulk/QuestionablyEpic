import { convertPPMToUptime, processedValue, runGenericPPMTrinket } from "../EffectUtilities";

export const effectData = [
{
    /* -------------------- */
    /* Assembly Preserver's Band                       
    /* -------------------- */
    /* Heal proc on a Cobolt Assembly ring.
    */
    name: "Assembly Preserver's Band",
    effects: [
      { 
        coefficient: 98.46344,
        table: -9,
        efficiency: 0.7,
        ppm: 2,
        secondaries: ['crit', 'versatility'],
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};
      bonus_stats.hps = processedValue(data[0], itemLevel, data[0].efficiency) * player.getStatMults(data[0].secondaries) * data[0].ppm / 60;
      console.log(bonus_stats.hps);
      return bonus_stats;
    }
  },

]