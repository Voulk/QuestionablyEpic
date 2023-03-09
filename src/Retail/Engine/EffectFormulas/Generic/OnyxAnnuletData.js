import { convertPPMToUptime, processedValue, runGenericPPMTrinket, 
    getHighestStat, getLowestStat, runGenericOnUseTrinket, getDiminishedValue, runDiscOnUseTrinket } from "Retail/Engine/EffectFormulas/EffectUtilities";
  

// Onyx Annulet is handled in two steps.
// One works out the best combination of gems.
// The other does one calculation run where it computes the bonus stats of that combo.

export const getBestCombo = () => {
// Find the best possible set. There are only 2000 combinations so this isn't too bad. 
// This could be optimized by separating out combinations that don't require other gems.
// The sample set is so small though that we might find that rather unnecessary.
// We can also just pre-prune combinations with no chance of being best. All of this is left as a TODO for now.


// For each combination:
// We will run each gems function, sending the data from all three gems through. This will mean they can play off each other when required.

// 
}
  
/**
 * 
 * @param {} effectName 
 * @param {*} player 
 * @param {*} contentType 
 * @param {*} itemLevel 
 * @param {*} setStats 
 * @param {*} settings 
 * @returns the bonus_effects data from one specific set of gems.
 */
export const getOnyxAnnuletEffect = (effectName, player, contentType, itemLevel, setStats, settings) => {
    //const gems = effectName.split(",");
    const gemNames = ["Cold Frost Stone"]
    let bonus_effects = {};

    const gems = gemNames.map(gemName => {
        return annuletGemData.find((effect) => effect.name === gemName);
    })

    console.log(gems);


    gems.forEach((gem => {
        const gemStats = gem.runFunc(gem.effects, gems, player, itemLevel, settings);
        console.log(gemStats);
    }))

    /*
    let activeEffect = embellishmentData.find((effect) => effect.name === effectName);
    let additionalData = {contentType: contentType, setStats: setStats, settings: settings};
    if (activeEffect !== undefined) {
    return activeEffect.runFunc(activeEffect.effects, player, itemLevel, additionalData);
    }
    else {
    return {};
    } */

}

export const annuletGemData = [
    {
        /* ---------------------------------------------------------------------------------------------- */
        /*                                   Cold Frost Stone                                             */
        /* ---------------------------------------------------------------------------------------------- */
        /* Gain a frost shield every 20 seconds that absorbs damage.
        */
        name: "Cold Frost Stone",
        school: "Frost",
        effects: [
          { 
            coefficient: 39.38435,
            table: -9,
            ppm: 3,
            efficiency: 0.9,
            secondaries: ['versatility'],
          },
        ],
        runFunc: function(data, gemData, player, itemLevel, settings, ) {
            let bonus_stats = {};
            console.log(processedValue(data[0], itemLevel, data[0].efficiency))
            bonus_stats.hps = processedValue(data[0], itemLevel, data[0].efficiency) * player.getStatMults(data[0].secondaries) * data[0].ppm / 60;
      
            return bonus_stats;
        }
      },
      {
        /* ---------------------------------------------------------------------------------------------- */
        /*                                   Deluging Water Stone                                         */
        /* ---------------------------------------------------------------------------------------------- */
        /* Abilities have a chance to heal a nearby ally. (Smart? Dumb?). Spell data appears to apply to the entire heal, but double check it's not one tick of the HoT.
        */
        name: "Deluging Water Stone",
        school: "Frost",
        effects: [
          { 
            coefficient: 7.878238,
            table: -9,
            ppm: 2.5,
            efficiency: 0.65,
            secondaries: ['crit', 'versatility'],
          },
        ],
        runFunc: function(data, gemData, player, itemLevel, settings, ) {
            let bonus_stats = {};
            console.log(processedValue(data[0], itemLevel, data[0].efficiency))
            bonus_stats.hps = processedValue(data[0], itemLevel, data[0].efficiency) * player.getStatMults(data[0].secondaries) * data[0].ppm / 60;
      
            return bonus_stats;
        }
      },

]