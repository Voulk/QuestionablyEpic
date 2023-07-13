import { convertPPMToUptime, processedValue, runGenericPPMTrinket, 
    getHighestStat, getLowestStat, runGenericOnUseTrinket, getDiminishedValue, runDiscOnUseTrinket, runGenericFlatProc } from "Retail/Engine/EffectFormulas/EffectUtilities";
  
import { getEstimatedHPS } from "General/Engine/ItemUtilities"

// Relevant Primordial Gems
import s204020 from "Images/Resources/PrimordialGems/s204020.jpg";
import s204010 from "Images/Resources/PrimordialGems/s204010.jpg";
import s204013 from "Images/Resources/PrimordialGems/s204013.jpg";
import s204027 from "Images/Resources/PrimordialGems/s204027.jpg";

/*
import s204002 from "Images/Resources/PrimordialGems/s204002.jpg";
import s204029 from "Images/Resources/PrimordialGems/s204029.jpg";
import s204012 from "Images/Resources/PrimordialGems/s204012.jpg";
import s204000 from "Images/Resources/PrimordialGems/s204000.jpg";
*/

// Onyx Annulet is handled in two steps.
// One works out the best combination of gems.
// The other does one calculation run where it computes the bonus stats of that combo.

export const getBestCombo = (player, contentType, itemLevel, setStats, settings, returnType="names") => {
    // Find the best possible set. There are only 2000 combinations so this isn't too bad. 
    // This could be optimized by separating out combinations that don't require other gems.
    // The sample set is so small though that we might find that rather unnecessary.
    // We can also just pre-prune combinations with no chance of being best. All of this is left as a TODO for now and the function is fast regardless.
    const data = ["Cold Frost Stone", "Deluging Water Stone", "Exuding Steam Stone", "Sparkling Mana Stone", "Gleaming Iron Stone", 
    "Freezing Ice Stone", "Desirous Blood Stone", "Humming Arcane Stone", "Indomitable Earth Stone", "Wild Spirit Stone",
    "Storm Infused Stone", "Flame Licked Stone", "Entropic Fel Stone", "Prophetic Twilight Stone"]
  
    // While the following combination code is very useful, it's unnecessary in our case since we know
    // which gems are best via running the code earlier and there is no secondary scenario where your choice would change.
    // Annulet code is also a little buggy so we're going to return a specific set instead.
    return [204020, 204010, 204013];
    /*
    const combinations = []

    for(let i = 0; i < data.length -2; i++){
        for(let j = i + 1; j < data.length -1; j++){
            for(let k = j + 1; k < data.length; k++){
                if (i !== j && i !== k && j !== k) combinations.push({dps: 0, hps: 0, gems: 
                                                    [convertGemNameToID(data[i]), convertGemNameToID(data[j]), convertGemNameToID(data[k])]})
                
            }
        }
    }

    combinations.forEach(set => {
        const bonus_stats = getOnyxAnnuletEffect(set.gems, player, contentType, itemLevel, setStats, settings);
        set.dps = bonus_stats.dps;
        set.hps = bonus_stats.hps;
    })
    combinations.sort((a, b) => (a.hps < b.hps ? 1 : -1))

    //console.log(combinations)
    return combinations[0].gems; */
}

export const convertGemNameToID = (gemName) => {
  const gem = annuletGemData.filter((gem) => gemName === gem.name)[0];
  return gem.id;
}

export const getAnnuletGemTag = (settings, saved) => {
  if (saved) return saved.toString()
  else if (settings.automatic) return "Wild Spirits, Exuding Steam, Deluging Water";
  else return settings.toString();
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

    const gems = gemNames.map(gemID => {
        return annuletGemData.find((effect) => effect.id === gemID);
    })

    
    gems.forEach((gem => {
        const gemStats = gem.runFunc(gem.effects, gems, player, itemLevel, contentType);
        temp.push(gem.name + " " /*+ JSON.stringify(gemStats) */ + " Est HPS: " + getEstimatedHPS(gemStats, player, contentType) + (gemStats.dps > 0 ? " Est DPS: " + gemStats.dps : ""))
        bonus_stats.hps += getEstimatedHPS(gemStats, player, contentType);
        bonus_stats.dps += gemStats.dps || 0;
    }))


    return bonus_stats;

}

export const getPrimordialImage = (id) => {
  const gem = annuletGemData.filter(gem => gem.id === id)[0];
  return gem.image;
}

export const annuletGemData = [
    {
        /* ---------------------------------------------------------------------------------------------- */
        /*                                   Cold Frost Stone                                             */
        /* ---------------------------------------------------------------------------------------------- */
        /* Gain a frost shield every 20 seconds that absorbs damage. Does not proc Wild Spirit Stone.
        */
        name: "Cold Frost Stone",
        id: 204012,
        school: "Frost",
        type: "Absorb",
        effects: [
          { 
            coefficient: 49.23086,
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
        id: 204010,
        image: s204010,
        school: "Frost",
        type: "Heal",
        effects: [
          { 
            coefficient: 11.029875,
            table: -9,
            ppm: 2.5,
            efficiency: {Raid: 0.45, Dungeon: 0.35},
            ticks: 6,
            secondaries: ['crit', 'versatility'], // Was fixed to scale with crit.
          },
        ],
        runFunc: function(data, gemData, player, itemLevel, contentType) {
            let bonus_stats = {};
            //bonus_stats.hps = processedValue(data[0], itemLevel, data[0].efficiency) * data[0].ticks * player.getStatMults(data[0].secondaries) * data[0].ppm / 60;
            bonus_stats.hps = runGenericFlatProc(data[0], itemLevel, player, contentType)

            return bonus_stats;
        }
      },
      {
        /* ---------------------------------------------------------------------------------------------- */
        /*                                   Exuding Steam Stone                                          */
        /* ---------------------------------------------------------------------------------------------- */
        /* Check range. At least appears to be smart healing. 
        */
        name: "Exuding Steam Stone",
        id: 204013,
        image: s204013,
        school: "Frost",
        type: "Heal",
        effects: [
          { 
            coefficient: 27.350668, //36.759411,
            table: -9,
            ppm: 3,
            targets: 3,
            efficiency: {Raid: 0.75, Dungeon: 0.5},
            secondaries: ['crit', 'versatility'], // Crit confirmed in game.
          },
        ],
        runFunc: function(data, gemData, player, itemLevel, contentType) {
            let bonus_stats = {};

            //bonus_stats.hps = processedValue(data[0], itemLevel, data[0].efficiency) * player.getStatMults(data[0].secondaries) * data[0].targets * data[0].ppm / 60;
            bonus_stats.hps = runGenericFlatProc(data[0], itemLevel, player, contentType)

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
        id: 0,
        school: "Frost",
        type: "Damage",
        effects: [
          { 
            coefficient: 36.73718,
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
        id: 0,
        school: "Arcane",
        type: "Damage",
        effects: [
            { 
                coefficient: 19.13384,
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
        id: 0,
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
        id: 204002,
        school: "Fire",
        type: "Damage",
        effects: [
          { 
            coefficient: 5.624381,
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
        id: 0,
        school: "Fire",
        type: "N/A",
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
        id: 0,
        school: "Earth",
        type: "Absorb",
        effects: [
            { 
                coefficient: 36.925285,
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
        /* 
        */
        name: "Indomitable Earth Stone",
        id: 0,
        school: "Earth",
        type: "Absorb",
        effects: [
          { 
            coefficient: 73.84715,
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
        id: 204027,
        image: s204027,
        school: "Necromantic",
        type: "Heal", 
        effects: [
            { 
                coefficient: 27.55246,
                table: -9,
                ppm: 2.25, 
                efficiency: 0.6,
                secondaries: ['crit', 'versatility'],
              },
        ],
        runFunc: function(data, gemData, player, itemLevel, settings, ppmOverride) {
            let bonus_stats = {};
            const ppm = ppmOverride || data[0].ppm;
            bonus_stats.hps = processedValue(data[0], itemLevel, data[0].efficiency) * player.getStatMults(data[0].secondaries) * ppm / 60;
            bonus_stats.dps = processedValue(data[0], itemLevel) * player.getStatMults(data[0].secondaries) * ppm / 60;

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
        id: 204020,
        image: s204020,
        type: "Heal",
        school: "Nature",
        effects: [
          { 
            coefficient: 1.954597,// 2.188874,//1.975117 * 0.97, // Off by 3% in-game regardless of spec.
            table: -9,
            targets: 5,
            efficiency: {Raid: 0.65, Dungeon: 0.4},
            ticks: 7,
            secondaries: ['crit', 'versatility'], // Was fixed to scale with Crit.
          },
        ],
        runFunc: function(data, gemData, player, itemLevel, contentType) {
            let bonus_stats = {};

            let ppm = 0;

            gemData.forEach(gem => {
                const procCandidate = gem.name !== "Wild Spirit Stone" && (gem.school === "Nature" || gem.type === "Heal");
                if (procCandidate) ppm += gem.effects[0].ppm || 0;
            })
            
            bonus_stats.hps = processedValue(data[0], itemLevel, data[0].efficiency[contentType]) * data[0].targets * data[0].ticks * player.getStatMults(data[0].secondaries) * (1.13 * ppm) / 60;
            
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
        id: 204000,
        school: "Nature",
        type: "Damage", 
        effects: [
            { 
                coefficient: 21.12777,
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
      {
        /* ---------------------------------------------------------------------------------------------- */
        /*                                      Wild Spirit Stone                                         */
        /* ---------------------------------------------------------------------------------------------- */
        /* AoE heal when you have a heal or nature effect proc. 
        /* Does proc from Desirous Blood Stone, 
        /* Will double proc if you have Twilight + a corresponding stone. Double procs can overwrite each other.
        /*
        */
        name: "Prophetic Twilight Stone",
        id: 204029,
        type: "N/A",
        school: "Shadow",
        effects: [
          { 
          },
        ],
        runFunc: function(data, gemData, player, itemLevel, settings, ) {
            let bonus_stats = {dps: 0, hps: 0};



            const canProc = gemData.some(gem => {return gem.type === "Damage" || gem.name === "Desirous Blood Stone"}) && gemData.some(gem => {return gem.type === "Heal"}) && !gemData.some(gem => {return gem.type === "Absorb" || gem.type === "Mana" || gem.name === "Entropic Fel Stone"})

            if (!canProc) return bonus_stats;

            const newGemData = gemData.filter(gem => (gem.type === "Damage" || gem.type === "Heal"));

            for (let i = 0; i < newGemData.length; i++) {
              const otherGemID = (i === 0 ? 1 : 0);
              const gem = JSON.parse(JSON.stringify(newGemData[i]));
              gem.runFunc = newGemData[i].runFunc;

              const gemPPM = newGemData[otherGemID].effects[0].ppm || 0//('effects' in newGemData[otherGemID] ? newGemData[otherGemID].effects[0].ppm : 0);
              gem.effects[0].ppm = gemPPM;

              const gemStats = gem.runFunc(gem.effects, gemData, player, itemLevel, settings);

              bonus_stats.dps += gemStats.dps || 0;
              bonus_stats.hps += gemStats.hps || 0;
            }

            
            return bonus_stats;
        }
      },

]