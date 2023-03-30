import { convertPPMToUptime, processedValue, runGenericPPMTrinket, 
  getHighestStat, getLowestStat, runGenericOnUseTrinket, getDiminishedValue, runDiscOnUseTrinket } from "Retail/Engine/EffectFormulas/EffectUtilities";


export const getEmbellishmentEffect = (effectName, player, contentType, itemLevel, setStats, settings) => {

    let activeEffect = embellishmentData.find((effect) => effect.name === effectName);
    let additionalData = {contentType: contentType, setStats: setStats, settings: settings};
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
        name: "Venom-Steeped Stompers",
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
          const highestSecondary = getHighestStat(additionalData.setStats);
          const lowestSecondary = getLowestStat(additionalData.setStats);

          bonus_stats[highestSecondary] = runGenericPPMTrinket(data[0], itemLevel);
          bonus_stats[lowestSecondary] = runGenericPPMTrinket(data[1], itemLevel);

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
            coefficient: 0.482408 * 0.95,
            table: -7,
            duration: 12,
            ppm: 2,
          },
        ],
        runFunc: function(data, player, itemLevel, additionalData) {
          let bonus_stats = {};
          // TODO
          
          const playerBestSecondary = player.getHighestStatWeight(additionalData.contentType);
          bonus_stats[playerBestSecondary] = runGenericPPMTrinket(data[0], itemLevel); // Testing

          return bonus_stats;
        }
      },
      {
        /* -------------------- */
        /* Magazine of Healing Darts                       
        /* -------------------- */
        /* Sometimes fire a healing dart on heals.
        */
        name: "Magazine of Healing Darts",
        effects: [
          { 
            coefficient: 44.02832,
            table: -8,
            ppm: 2,
            secondaries: ['haste', 'crit', 'versatility'],
            efficiency: 0.69,
          },
        ],
        runFunc: function(data, player, itemLevel, additionalData) {
          let bonus_stats = {};
          // TODO

          bonus_stats.hps = processedValue(data[0], itemLevel, data[0].efficiency) * player.getStatMults(data[0].secondaries) * data[0].ppm / 60;
          return bonus_stats;
        }
      },
      {
        /* -------------------- */
        /* Bronzed Grip Wrappings                      
        /* -------------------- */
        /* 
        */
        name: "Bronzed Grip Wrappings",
        effects: [
          { 
            coefficient: 3.268828,
            table: -7,
            ppm: 4,
            secondaries: ['haste', 'crit', 'versatility'],
            efficiency: 0.84,
          },
        ],
        runFunc: function(data, player, itemLevel, additionalData) {
          let bonus_stats = {};
          // TODO

          bonus_stats.hps = processedValue(data[0], itemLevel, data[0].efficiency) * player.getStatMults(data[0].secondaries) * data[0].ppm / 60;
          return bonus_stats;
        }
      },
      {
        /* -------------------- */
        /* Blue Silken Lining                    
        /* -------------------- */
        /* Mastery while above 90% health.
        */
        name: "Blue Silken Lining",
        effects: [
          { 
            coefficient: 0.20209,
            table: -7,
            uptime: 0.4,
          },
        ],
        runFunc: function(data, player, itemLevel, additionalData) {
          let bonus_stats = {};
          // TODO

          bonus_stats.mastery = processedValue(data[0], itemLevel) * data[0].uptime;
          return bonus_stats;
        }
      },
      {
        /* -------------------- */
        /* Shield of the Hearth                       
        /* -------------------- */
        /* Vers proc on damage taken
        */
        name: "Shield of the Hearth",
        effects: [
          { 
            coefficient: 0.350165,
            table: -7,
            duration: 15,
            ppm: 2.2,
          },
        ],
        runFunc: function(data, player, itemLevel, additionalData) {
          let bonus_stats = {};
          // TODO
          bonus_stats.versatility = runGenericPPMTrinket(data[0], itemLevel); // Testing
          return bonus_stats;
        }
      },
      {
        /* -------------------- */
        /* Allied Wristguard of Companionship                  
        /* -------------------- */
        /* Mastery while above 90% health.
        */
        name: "Allied Wristguard of Companionship",
        effects: [
          { 
            coefficient: 0.052152,
            table: -7,
            stacks: 3.9,
          },
        ],
        runFunc: function(data, player, itemLevel, additionalData) {
          let bonus_stats = {};
          // TODO

          bonus_stats.versatility = processedValue(data[0], itemLevel) * data[0].stacks;

          return bonus_stats;
        }
      },
      {
        /* -------------------- */
        /* Toxic Thorn Footwraps (Thriving Thorns)               
        /* -------------------- */
        /* 
        */
        name: "Toxic Thorn Footwraps",
        effects: [
          { // Healing Effect
            coefficient: 15.34544,
            table: -9,
            secondaries: ['haste', 'crit', 'versatility'],
            efficiency: 0.8,
            ppm: 2, // 4 / 2
          },
          { // Damage Effect
            coefficient: 6.820023,
            table: -9,
            secondaries: ['haste', 'crit', 'versatility'],
            ppm: 2, // 4 / 2
          },
        ],
        runFunc: function(data, player, itemLevel, additionalData) {
          let bonus_stats = {};
          // TODO

          bonus_stats.hps = processedValue(data[0], itemLevel, data[0].efficiency) * player.getStatMults(data[0].secondaries) * data[0].ppm / 60;
          bonus_stats.dps = processedValue(data[1], itemLevel, data[1].efficiency) * player.getStatMults(data[1].secondaries) * data[1].ppm / 60;

          return bonus_stats;
        }
      },
      {
        /* -------------------- */
        /* Frostfire Legguards of Preparation (Prepared Time)            
        /* -------------------- */
        /* 
        */
        name: "Prepared Time",
        effects: [
          { 
            coefficient: 0.645985,
            table: -8, // No idea why this is -8
            stacks: {Raid: 0.2, Dungeon: 1.5} // Revisit dungeon stacks.
          },
        ],
        runFunc: function(data, player, itemLevel, additionalData) {
          let bonus_stats = {};
          // TODO

          bonus_stats.haste = processedValue(data[0], itemLevel) * data[0].stacks[additionalData.contentType];

          return bonus_stats;
        }
      },
      {
        /* -------------------- */
        /* Playful Spirit's Fur (Magic Snowball)       
        /* -------------------- */
        /* 
        */
        name: "Playful Spirit's Fur",
        effects: [
          { 
            coefficient: 24.55177,
            table: -9, // No idea why this is -8
            ppm: 1, // 2 / 2
            secondaries: ['haste', 'crit', 'versatility'],
            efficiency: 0.8,
          },
          {  // Damage
            coefficient: 10.91173,
            table: -9, // No idea why this is -8
            ppm: 1, // 2 / 2
            secondaries: ['haste', 'crit', 'versatility'],
            efficiency: 1,
          },
        ],
        runFunc: function(data, player, itemLevel, additionalData) {
          let bonus_stats = {};
          // TODO

          bonus_stats.hps = processedValue(data[0], itemLevel, data[0].efficiency) * player.getStatMults(data[0].secondaries) * data[0].ppm / 60;
          bonus_stats.dps = processedValue(data[1], itemLevel, data[1].efficiency) * player.getStatMults(data[1].secondaries) * data[1].ppm / 60;
          return bonus_stats;
        }
      },
      {
        /* -------------------- */
        /* Rallied to Victory            
        /* -------------------- */
        /* 
        */
        name: "Rallied to Victory",
        effects: [
          { 
            coefficient: 0.74681,
            table: -8, // No idea why this is -8
            duration: 10,
            ppm: 1,
          },
        ],
        runFunc: function(data, player, itemLevel, additionalData) {
          let bonus_stats = {};
          // TODO
          bonus_stats.versatility = runGenericPPMTrinket(data[0], itemLevel);
          if (additionalData.settings.includeGroupBenefits) bonus_stats.allyStats = bonus_stats.versatility * 3.5;

          return bonus_stats;
        }
      },
      {
        /* -------------------- */
        /* Woven Chronocloth            
        /* -------------------- */
        /* 
        */
        name: "Woven Chronocloth",
        effects: [
          { 
            coefficient: 1.478889,
            table: -7, 
            duration: 20,
            ppm: 9,
          },
        ],
        runFunc: function(data, player, itemLevel, additionalData) {
          let bonus_stats = {};

          const uptime = data[0].ppm / 20 * (data[0].duration / 60);

          bonus_stats.haste = processedValue(data[0], itemLevel) * uptime;

          return bonus_stats;
        }
      },
      {
        /* -------------------- */
        /* Blue Dragon Soles            
        /* -------------------- */
        /* 
        */
        name: "Blue Dragon Soles",
        effects: [
          { 
            coefficient: 0.256837,
            table: -1, 
          },
        ],
        runFunc: function(data, player, itemLevel, additionalData) {
          let bonus_stats = {};

          const uptime = 4 / 60; // There isn't a way to play around this where it isn't terrible. This assumes it hits 4 spells per minute.

          bonus_stats.intellect = processedValue(data[0], itemLevel) * uptime;

          return bonus_stats;
        }
      },
      {
        /* -------------------- */
        /* Unstable Frostfire Belt    
        /* -------------------- */
        /* 
        */
        name: "Unstable Frostfire Belt",
        effects: [
          {  // Damage
            coefficient: 3.389522,
            table: -8,
            ppm: 3, 
            ticks: 5,
            secondaries: ['haste', 'crit', 'versatility'],

          },
        ],
        runFunc: function(data, player, itemLevel, additionalData) {
          let bonus_stats = {};
          // TODO: Check if the DoT is hasted. The proc rate is not.

          bonus_stats.dps = processedValue(data[0], itemLevel) * player.getStatMults(data[0].secondaries) * data[0].ppm * data[0].ticks / 60;

          return bonus_stats;
        }
      },
      {
        /* -------------------- */
        /* Flaring Cowl
        /* -------------------- */
        /* 
        */
        name: "Flaring Cowl",
        effects: [
          {  // Damage
            coefficient: 3.313529,
            table: -8,
            ppm: 20, // It ticks every 3 seconds.
            targets: {Raid: 1, Dungeon: 1}, // Damage is split so target count doesn't matter.
            secondaries: ['crit', 'versatility'], // TODO: Check if the tick rate scales with Haste.
          },
        ],
        runFunc: function(data, player, itemLevel, additionalData) {
          let bonus_stats = {};
          // TODO: Check if the DoT is hasted. The proc rate is not.
          // Doesn't currently scale with item level correctly.
          bonus_stats.dps = processedValue(data[0], 350) * player.getStatMults(data[0].secondaries) * 
                                data[0].ppm * data[0].targets[additionalData.contentType] / 60;

          return bonus_stats;
        }
      },
      {
        /* -------------------- */
        /* Amice of the Blue  
        /* -------------------- */
        /* 
        */
        name: "Amice of the Blue",
        effects: [
          {  // Damage
            coefficient: 44.45392,
            table: -8,
            ppm: 2, 
            secondaries: ['haste', 'crit', 'versatility'],

          },
        ],
        runFunc: function(data, player, itemLevel, additionalData) {
          let bonus_stats = {};
          // TODO: Check if the DoT is hasted. The proc rate is not.

          bonus_stats.dps = processedValue(data[0], itemLevel) * player.getStatMults(data[0].secondaries) * data[0].ppm / 60;

          return bonus_stats;
        }
      },
      {
        /* -------------------- */
        /* Potion Absorption Inhibitor  
        /* -------------------- */
        /* 
        */
        name: "Potion Absorption Inhibitor",
        effects: [
          {  
            potionIncrease: 0.5

          },
        ],
        runFunc: function(data, player, itemLevel, additionalData) {
          let bonus_stats = {};
          // TODO: Check if the DoT is hasted. The proc rate is not.
          const manaSaved = player.getSpecialQuery("chilledClarityExtension", additionalData.contentType);
          bonus_stats.mana = manaSaved * 2 / player.getFightLength(additionalData.contentType);


          return bonus_stats;
        }
      },
      {
        /* -------------------- */
        /* Allied Wristguard of Companionship                  
        /* -------------------- */
        /* Mastery while above 90% health.
        */
        name: "Allied Wristguard of Companionship",
        effects: [
          { 
            coefficient: 0.052152,
            table: -7,
            stacks: 3.9,
          },
        ],
        runFunc: function(data, player, itemLevel, additionalData) {
          let bonus_stats = {};
          // TODO

          bonus_stats.versatility = processedValue(data[0], itemLevel) * data[0].stacks;

          return bonus_stats;
        }
      },
      {
        /* -------------------- */
        /* Fang Adornments            
        /* -------------------- */
        /* 
        */
        name: "Fang Adornments",
        effects: [
          { // Damage Effect
            coefficient: 6.820023,
            table: -9,
            secondaries: ['haste', 'crit', 'versatility'],
            ppm: 2, // 4 / 2
          },
        ],
        runFunc: function(data, player, itemLevel, additionalData) {
          let bonus_stats = {};
          
          bonus_stats.dps = processedValue(data[1], itemLevel, data[1].efficiency) * player.getStatMults(data[1].secondaries) * data[1].ppm / 60;

          return bonus_stats;
        }
      },
]