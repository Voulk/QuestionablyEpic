import { getGenericStatEffect, getGenericThroughputEffect, getEffectPPM, getEffectPPMWithHots, getGenericHealingIncrease, getGenericOnUseTrinket } from "./ClassicEffectUtilities";

export function getGenericEffectClassic(effectName, player, itemLevel, additionalData) {
  let bonus_stats = {};
  
  //let additionalData = {contentType: contentType, settings: userSettings, setStats: setStats, castModel: castModel, player: player, setVariables: setVariables};

  /* -------- Trinket Data holds a trinkets actual power values. Formulas here, data there. ------- */
  const effectsData = classicEffectData;
  let activeEffect = effectsData.find((effect) => effect.name === effectName);


  if (activeEffect !== undefined) {
    return activeEffect.runFunc(activeEffect.effects, player, itemLevel, additionalData);
  }
  else {
    return {};
  }

}

export const classicEffectData = [
  { 
    name: "Maw of the Dragonlord",
    effects: [
      {
        value: {390: (4677+7016)/2, 403: (5280+7920)/2, 416: (5960+8940)/2}, 
        secondaries: ["crit"],
        efficiency: 0.7, // 30% overheal
        targets: 9,
        stat: "hps",
        ppm: getEffectPPMWithHots(0.15, 17, 1.5),
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};
      //console.log(processedValue(data[0], 571));
      //return getGenericThroughputEffect(data[0], itemLevel, player, additionalData.setStats);
      return bonus_stats;

    },
  },

]
