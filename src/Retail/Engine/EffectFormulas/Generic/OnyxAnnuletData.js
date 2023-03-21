import { convertPPMToUptime, processedValue, runGenericPPMTrinket, 
    getHighestStat, getLowestStat, runGenericOnUseTrinket, getDiminishedValue, runDiscOnUseTrinket } from "Retail/Engine/EffectFormulas/EffectUtilities";
  
import { getEstimatedHPS } from "General/Engine/ItemUtilities"

// Onyx Annulet is handled in two steps.
// One works out the best combination of gems.
// The other does one calculation run where it computes the bonus stats of that combo.

export const getBestCombo = (player, contentType, itemLevel, setStats, settings) => {
    // Find the best possible set. There are only 2000 combinations so this isn't too bad. 
    // This could be optimized by separating out combinations that don't require other gems.
    // The sample set is so small though that we might find that rather unnecessary.
    // We can also just pre-prune combinations with no chance of being best. All of this is left as a TODO for now and the function is fast regardless.
    const data = ["Cold Frost Stone", "Deluging Water Stone", "Exuding Steam Stone", "Sparkling Mana Stone", "Gleaming Iron Stone", 
    "Freezing Ice Stone", "Desirous Blood Stone", "Humming Arcane Stone", "Indomitable Earth Stone", "Wild Spirit Stone",
    "Storm Infused Stone", "Flame Licked Stone", "Entropic Fel Stone"]

    const combinations = []

    for(let i = 0; i < data.length -2; i++){
        for(let j = i + 1; j < data.length -1; j++){
            for(let k = j + 1; k < data.length; k++){
                if (i !== j && i !== k && j !== k) combinations.push({dps: 0, hps: 0, gems: [data[i],data[j],data[k]]})
                
            }
        }
    }

    combinations.forEach(set => {
        const bonus_stats = getOnyxAnnuletEffect(set.gems, player, contentType, itemLevel, setStats, settings);
        set.dps = bonus_stats.dps;
        set.hps = bonus_stats.hps;
    })
    combinations.sort((a, b) => (a.dps < b.dps ? 1 : -1))

    console.log(combinations);


    return combinations[0].gems;
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
export const getOnyxAnnuletEffect = (gemNames, player, contentType, itemLevel, setStats, settings) => {

    let bonus_stats = {hps: 0, dps: 0};
    let temp = [];

    const gems = gemNames.map(gemName => {
        return annuletGemData.find((effect) => effect.name === gemName);
    })

    
    gems.forEach((gem => {
        const gemStats = gem.runFunc(gem.effects, gems, player, itemLevel, settings);
        temp.push(gem.name + " " /*+ JSON.stringify(gemStats) */ + " Est HPS: " + getEstimatedHPS(gemStats, player, contentType) + (gemStats.dps > 0 ? " Est DPS: " + gemStats.dps : ""))
        bonus_stats.hps += getEstimatedHPS(gemStats, player, contentType);
        bonus_stats.dps += gemStats.dps || 0;
    }))


    return bonus_stats;


}

export const annuletGemData = [
    {
        /* ---------------------------------------------------------------------------------------------- */
        /*                                   Cold Frost Stone                                             */
        /* ---------------------------------------------------------------------------------------------- */
        /* Gain a frost shield every 20 seconds that absorbs damage. Does not proc Wild Spirit Stone.
        */
        name: "Cold Frost Stone",
        school: "Frost",
        type: "Absorb",
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
            
            bonus_stats.hps = processedValue(data[0], itemLevel, data[0].efficiency) * player.getStatMults(data[0].secondaries) * data[0].ppm / 60;
      
            return bonus_stats;
        }
      },
      {
        /* ---------------------------------------------------------------------------------------------- */
        /*                                   Deluging Water Stone                                         */
        /* ---------------------------------------------------------------------------------------------- */
        /* Abilities have a chance to heal a nearby ally. (Smart? Dumb?). Spell data is for one tick of the HoT.
        */
        name: "Deluging Water Stone",
        school: "Frost",
        type: "Heal",
        effects: [
          { 
            coefficient: 7.878238,
            table: -9,
            ppm: 2.5,
            efficiency: 0.65,
            ticks: 6,
            secondaries: ['versatility'], // Assumed no crit scaling. TODO: Confirm.
          },
        ],
        runFunc: function(data, gemData, player, itemLevel, settings, ) {
            let bonus_stats = {};
            bonus_stats.hps = processedValue(data[0], itemLevel, data[0].efficiency) * data[0].ticks * player.getStatMults(data[0].secondaries) * data[0].ppm / 60;
      
            return bonus_stats;
        }
      },
      {
        /* ---------------------------------------------------------------------------------------------- */
        /*                                   Exuding Steam Stone                                          */
        /* ---------------------------------------------------------------------------------------------- */
        /* Check range. 
        */
        name: "Exuding Steam Stone",
        school: "Frost",
        type: "Heal",
        effects: [
          { 
            coefficient: 21.88019,
            table: -9,
            ppm: 3,
            targets: 3,
            efficiency: 0.65,
            secondaries: ['crit', 'versatility'], // Crit confirmed in game.
          },
        ],
        runFunc: function(data, gemData, player, itemLevel, settings, ) {
            let bonus_stats = {};
            bonus_stats.hps = processedValue(data[0], itemLevel, data[0].efficiency) * player.getStatMults(data[0].secondaries) * data[0].targets * data[0].ppm / 60;

            return bonus_stats;
        }
      },
      {
        /* ---------------------------------------------------------------------------------------------- */
        /*                                   Freezing Ice Stone                                           */
        /* ---------------------------------------------------------------------------------------------- */
        /* 
        */
        name: "Freezing Ice Stone",
        school: "Frost",
        type: "Damage",
        effects: [
          { 
            coefficient: 29.38906,
            table: -9,
            ppm: 2.5,
            secondaries: ['crit', 'versatility'],
          },
        ],
        runFunc: function(data, gemData, player, itemLevel, settings, ) {
            let bonus_stats = {};
            bonus_stats.dps = processedValue(data[0], itemLevel, data[0].efficiency) * player.getStatMults(data[0].secondaries) * data[0].ppm / 60;

            return bonus_stats;
        }
      },
      {
        /* ---------------------------------------------------------------------------------------------- */
        /*                                   Humming Arcane Stone                                         */
        /* ---------------------------------------------------------------------------------------------- */
        /* Damage based on the number of stone families you have. It's assumed this also includes the Arcane family this stone is in, but TODO.
        */
        name: "Humming Arcane Stone",
        school: "Arcane",
        type: "Damage",
        effects: [
            { 
                coefficient: 15.30673,
                table: -9,
                ppm: 2,
                secondaries: ['crit', 'versatility'],
            },
        ],
        runFunc: function(data, gemData, player, itemLevel, settings, ) {
            let bonus_stats = {};

            // Convert our gemData schools into a Set which will auto-remove duplicates.
            // The max is mostly for easier testing, since 3 should be a natural cap due to only having 3 gems.
            const categories = Math.min(3, new Set(gemData.map(g => g.school)).size);

            bonus_stats.dps = processedValue(data[0], itemLevel) * player.getStatMults(data[0].secondaries) * data[0].ppm * categories / 60;

            return bonus_stats;
        }
      },
      {
        /* ---------------------------------------------------------------------------------------------- */
        /*                                   Sparkling Mana Stone                                         */
        /* ---------------------------------------------------------------------------------------------- */
        /* Mana stone based off PPM of Frost effects.
        */
        name: "Sparkling Mana Stone",
        school: "Arcane",
        type: "Mana",
        effects: [
          { 
            coefficient: 0.315707,
            table: -7,
            ticks: 3,
          },
        ],
        runFunc: function(data, gemData, player, itemLevel, settings, ) {
            let bonus_stats = {};

            let ppm = 0;

            gemData.forEach(gem => {
                if (gem.school === "Frost") ppm += gem.effects[0].ppm || 0;
            })

            bonus_stats.mana = processedValue(data[0], itemLevel, data[0].efficiency) * data[0].ticks * ppm / 60;

            return bonus_stats;
        }
      },
      {
        /* ---------------------------------------------------------------------------------------------- */
        /*                                  Flame Licked Stone                                            */
        /* ---------------------------------------------------------------------------------------------- */
        /* 
        */
        name: "Flame Licked Stone",
        school: "Fire",
        type: "Damage",
        effects: [
          { 
            coefficient: 4.499163,
            table: -9,
            ppm: 2.5,
            secondaries: ['crit', 'versatility'],
            ticks: 7,
          },
        ],
        runFunc: function(data, gemData, player, itemLevel, settings, ) {
            let bonus_stats = {};

            const mult = gemData.map(g => g.name).includes("Entropic Fel Stone") ? 1.6 : 1;

            bonus_stats.dps = processedValue(data[0], itemLevel, 1) * mult * data[0].ticks * player.getStatMults(data[0].secondaries) * data[0].ppm / 60;

            return bonus_stats;
        }
      },
      {
        /* ---------------------------------------------------------------------------------------------- */
        /*                                  Entropic Fel Stone                                            */
        /* ---------------------------------------------------------------------------------------------- */
        /* Entropic Fel Stone buffs our other stones fire damage by 60%. We've chosen to include this in their own formulas rather than here.
        /* This stone thus has no value or function of its own. It still gets a stub so that it's counted in other formulas.
        */
        name: "Entropic Fel Stone",
        school: "Fire",
        type: "Damage",
        effects: [
          { 
          },
        ],
        runFunc: function(data, gemData, player, itemLevel, settings, ) {
            let bonus_stats = {};

            return bonus_stats;
        }
      },
      {
        /* ---------------------------------------------------------------------------------------------- */
        /*                                   Gleaming Iron Stone                                          */
        /* ---------------------------------------------------------------------------------------------- */
        /* Shield when you stand still for 3s. ICD of 25s + 3s charge time after ICD for maximum ppm of 2.14.
        */
        name: "Gleaming Iron Stone",
        school: "Earth",
        type: "Absorb",
        effects: [
            { 
                coefficient: 29.53954,
                table: -9,
                ppm: 1.8, // Max of 2.14.
                efficiency: 0.95,
                secondaries: ['versatility'],
              },
        ],
        runFunc: function(data, gemData, player, itemLevel, settings, ) {
            let bonus_stats = {};
            
            bonus_stats.hps = processedValue(data[0], itemLevel, data[0].efficiency) * player.getStatMults(data[0].secondaries) * data[0].ppm / 60;
      
            return bonus_stats;
        }
      },
      {
        /* ---------------------------------------------------------------------------------------------- */
        /*                                   Indomitable Earth Stone                                      */
        /* ---------------------------------------------------------------------------------------------- */
        /* Gain a frost shield every 20 seconds that absorbs damage.
        */
        name: "Indomitable Earth Stone",
        school: "Earth",
        type: "Absorb",
        effects: [
          { 
            coefficient: 59.07738,
            table: -9,
            ppm: 2,
            efficiency: 0.9,
            secondaries: ['versatility'],
          },
        ],
        runFunc: function(data, gemData, player, itemLevel, settings, ) {
            let bonus_stats = {};
            
            bonus_stats.hps = processedValue(data[0], itemLevel, data[0].efficiency) * player.getStatMults(data[0].secondaries) * data[0].ppm / 60;
      
            return bonus_stats;
        }
      },
      {
        /* ---------------------------------------------------------------------------------------------- */
        /*                                   Desirous Blood Stone                                         */
        /* ---------------------------------------------------------------------------------------------- */
        /* Lifesteal damage effect. DOES count as healing for Wild Spirits.
        */
        name: "Desirous Blood Stone",
        school: "Necromantic",
        type: "Heal", 
        effects: [
            { 
                coefficient: 22.04094,
                table: -9,
                ppm: 2.5, 
                efficiency: 0.6,
                secondaries: ['crit', 'versatility'],
              },
        ],
        runFunc: function(data, gemData, player, itemLevel, settings, ) {
            let bonus_stats = {};
            
            bonus_stats.hps = processedValue(data[0], itemLevel, data[0].efficiency) * player.getStatMults(data[0].secondaries) * data[0].ppm / 60;
            bonus_stats.dps = processedValue(data[0], itemLevel) * player.getStatMults(data[0].secondaries) * data[0].ppm / 60;

            return bonus_stats;
        }
      },
      {
        /* ---------------------------------------------------------------------------------------------- */
        /*                                      Wild Spirit Stone                                         */
        /* ---------------------------------------------------------------------------------------------- */
        /* AoE heal when you have a heal or nature effect proc. 
        /* Does proc from Desirous Blood Stone, 
        /* Will double proc if you have Twilight + a corresponding stone. Double procs can overwrite each other.
        /*
        */
        name: "Wild Spirit Stone",
        type: "Heal",
        school: "Nature",
        effects: [
          { 
            coefficient: 1.26373,//1.975117 * 0.97, // Off by 3% in-game regardless of spec.
            table: -9,
            targets: 5,
            efficiency: 0.67,
            ticks: 7,
            secondaries: ['versatility'], // Does not currently scale with crit. Check on release.
          },
        ],
        runFunc: function(data, gemData, player, itemLevel, settings, ) {
            let bonus_stats = {};

            let ppm = 0;

            gemData.forEach(gem => {
                const procCandidate = gem.name !== "Wild Spirit Stone" && (gem.school === "Nature" || gem.type === "Heal");
                if (procCandidate) ppm += gem.effects[0].ppm || 0;
            })

            bonus_stats.hps = processedValue(data[0], itemLevel, data[0].efficiency) * data[0].targets * data[0].ticks * player.getStatMults(data[0].secondaries) * ppm / 60;

            return bonus_stats;
        }
      },
      {
        /* ---------------------------------------------------------------------------------------------- */
        /*                                   Storm Infused Stone                                          */
        /* ---------------------------------------------------------------------------------------------- */
        /* Crits strike an enemy and two nearby enemies. 
        */
        name: "Storm Infused Stone",
        school: "Nature",
        type: "Damage", 
        effects: [
            { 
                coefficient: 22.04094,
                table: -9,
                ppm: 2.25, 
                targets: 2.2, // TODO: Swap for content type.
                secondaries: ['haste', 'crit', 'versatility'],
              },
        ],
        runFunc: function(data, gemData, player, itemLevel, settings, ) {
            let bonus_stats = {};
            
            bonus_stats.dps = processedValue(data[0], itemLevel) * data[0].targets * player.getStatMults(data[0].secondaries) * data[0].ppm / 60;

            return bonus_stats;
        }
      },

]