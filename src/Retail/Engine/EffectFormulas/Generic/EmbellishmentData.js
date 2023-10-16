import { itemLevels } from "Databases/itemLevelsDB";
import { convertPPMToUptime, processedValue, runGenericPPMTrinket, runGenericPPMTrinketHasted,
  getHighestStat, getLowestStat, runGenericOnUseTrinket, getDiminishedValue, runDiscOnUseTrinket, getSetting } from "Retail/Engine/EffectFormulas/EffectUtilities";


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
    /* -------------------- */
    /* Flourishing Dream Helm                       
    /* -------------------- */
    /* No duration in spell data. Maybe just moves around who you're attached to?
    */
    name: "Flourishing Dream Helm",
    effects: [
      { // Self shield portion
        coefficient: 91.45733, 
        table: -9,
        duration: 15, // 
        ppm: 0,
        efficiency: 0.8,
      },
      { // Ally + Self Shield
        coefficient: 60.97212, 
        table: -9,
        duration: 15, 
        ppm: 0,
        efficiency: 0.8,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};
      // 

      return bonus_stats;
    }
  },
  {
    /* -------------------- */
    /* Verdant Tether                       
    /* -------------------- */
    /* No duration in spell data. Maybe just moves around who you're attached to?
    */
    name: "Verdant Tether",
    effects: [
      { 
        coefficient: 0.229097, // 0.482408 * 0.95,
        table: -7,
        duration: 15, 
        ppm: 2.2,
        multiplier: 0.75, // Mult: 1 = you are next to the target. Mult: 0.5 = You are far away from the target.
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};
      // TODO Add top gear support for auto-generating gems.
      const versAvg = runGenericPPMTrinket(data[0], itemLevel);
      bonus_stats.versatility = versAvg;
      if (additionalData.settings.includeGroupBenefits) bonus_stats.allyStats = versAvg;

      return bonus_stats;
    }
  },
  {
    /* -------------------- */
    /* Verdant Conduit                       
    /* -------------------- */
    /* Gain X of a random secondary. PPM but with 10s internal cooldown. 
    */
    name: "Verdant Conduit",
    effects: [
      { 
        coefficient: 0.213265, 
        table: -7,
        duration: 10, 
        ppm: 5,
        uptime: 0.48588,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};
      // TODO Add top gear support for auto-generating gems.

      ['haste', 'crit', 'versatility', 'mastery'].forEach((stat) => {
        bonus_stats[stat] = processedValue(data[0], itemLevel) * data[0].uptime / 4;
      });

      return bonus_stats;
    }
  },
    {
        /* ---------------------------------------------------------------------------------------------- */
        /*                         Potent Venom (Venom-Steeped Stompers)                                  */
        /* ---------------------------------------------------------------------------------------------- */
        /* Chance to gain X of your highest secondary stat, and lose X of your lowest secondary stat. 
        */
        name: "Venom-Steeped Stompers",
        effects: [
          { 
            coefficient: 0.744362, // 0.722681,
            table: -7,
            duration: 10,
            ppm: 2,
          },
          { 
            coefficient: -0.297361, //-0.2887,
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
            coefficient: 0.458195, // 0.482408 * 0.95,
            table: -7,
            duration: 8, // 5s + 1s per equipped gem. 
            ppm: 2,
          },
        ],
        runFunc: function(data, player, itemLevel, additionalData) {
          let bonus_stats = {};
          // TODO Add top gear support for auto-generating gems.
          const gems = getSetting(additionalData.settings, "lariatGems") || 3;
          const duration = 5 + parseInt(gems);

          const newData = {...data[0], duration: duration};
          const playerBestSecondary = player.getHighestStatWeight(additionalData.contentType);
          bonus_stats[playerBestSecondary] = runGenericPPMTrinket(newData, itemLevel);
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
            coefficient: 117.1906 * 1.15 * 0.65, // Inexplicitly heals for 15% more than tooltip value. It isn't talents, nor secondaries. //44.02832,
            table: -8,
            ppm: 2,
            secondaries: ['haste', 'crit', 'versatility'],
            efficiency: 0.5,
          },
        ],
        runFunc: function(data, player, itemLevel, additionalData) {
          let bonus_stats = {};
          // TODO
          let expectedEfficiency = (1 - getSetting(additionalData.settings, "healingDartsOverheal") / 100);
          if (additionalData.contentType === "Dungeon") expectedEfficiency * 0.6;
          bonus_stats.hps = processedValue(data[0], itemLevel, expectedEfficiency) * player.getStatMults(data[0].secondaries) * data[0].ppm / 60;
          if (player.spec === "Holy Priest") bonus_stats.hps *= player.getStatPerc('mastery');
          return bonus_stats;
        }
      },
      {
        /* -------------------- */
        /* Bronzed Grip Wrappings                      
        /* -------------------- */
        /* This has a 4ppm but it's split between the damage and healing effect.
        /* 
        */
        name: "Bronzed Grip Wrappings",
        effects: [
          { // Healing Effect
            coefficient: 14.83545, // 3.268828,
            table: -7,
            ppm: 4 * 0.75,
            secondaries: ['haste', 'crit', 'versatility'],
            efficiency: 0.6,
          },
          { // DPS Effect
            coefficient: 8.901271,
            table: -7,
            ppm: 4 * 0.25,
            secondaries: ['haste', 'crit', 'versatility'],
          },
        ],
        runFunc: function(data, player, itemLevel, additionalData) {
          let bonus_stats = {};
          // TODO

          bonus_stats.hps = processedValue(data[0], itemLevel, data[0].efficiency) * player.getStatMults(data[0].secondaries) * data[0].ppm / 60;
          bonus_stats.dps = processedValue(data[1], itemLevel) * player.getStatMults(data[1].secondaries) * data[1].ppm / 60;

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
            coefficient: 0.389637,
            table: -9, // Changed from -7 in 10.1. I have no idea why and -7 was more technically correct.
            uptime: 0.3,
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
        /* 
        */
        name: "Allied Wristguard of Companionship",
        effects: [
          { 
            coefficient: 0.052152,
            table: -7,
            stacks: 4,
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
            coefficient: 34.05239 * 0.65, //15.34544,
            table: -9,
            secondaries: ['haste', 'crit'],
            efficiency: 0.55,
            ppm: 3, // 4 / 2
          },
          { // Damage Effect
            coefficient: 20.43177 * 0.65, //6.820023,
            table: -9,
            secondaries: ['haste', 'crit'],
            ppm: 1, // 4 / 2
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
            stacks: {Raid: 0.2, Dungeon: 0.9} // Revisit dungeon stacks.
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
            coefficient: 21.79298 * 0.65, //24.55177,
            table: -9, // 
            ppm: 1, // 2 / 2
            secondaries: ['haste', 'crit'],
            efficiency: 0.8,
          },
          {  // Damage
            coefficient: 13.07579 * 0.65, //10.91173,
            table: -9, // 
            ppm: 1, // 2 / 2
            secondaries: ['haste', 'crit'],
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
          bonus_stats.versatility = runGenericPPMTrinketHasted(data[0], itemLevel, player.getStatPerc('haste'));

          if (additionalData.settings.includeGroupBenefits) bonus_stats.allyStats = bonus_stats.versatility * 3.8;

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
        /* Unstable Frostfire Belt (Unstable Frostfire)   
        /* -------------------- */
        /* 
        */
        name: "Unstable Frostfire Belt",
        effects: [
          {  // Damage
            coefficient: 7.785769 * 0.65, //3.389522,
            table: -8,
            ppm: 3, 
            ticks: 5,
            secondaries: ['haste', 'crit'],

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
            coefficient: 5.105057, //3.313529,
            table: -8,
            ppm: 20, // It ticks every 3 seconds.
            targets: {Raid: 1, Dungeon: 1}, // Damage is split so target count doesn't matter.
            secondaries: ['crit'], // Tick rate doesn't scale with haste.
          },
        ],
        runFunc: function(data, player, itemLevel, additionalData) {
          let bonus_stats = {};
          bonus_stats.dps = processedValue(data[0], itemLevel) * player.getStatMults(data[0].secondaries) * 
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
            coefficient: 44.45392 * 0.65,
            table: -8,
            ppm: 2, 
            secondaries: ['haste', 'crit'],

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
          // TODO: Convert to using int potions I guess?
          //const manaSaved = player.getSpecialQuery("chilledClarityExtension", additionalData.contentType);
          //bonus_stats.mana = manaSaved * 2 / player.getFightLength(additionalData.contentType);


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
            coefficient: 15.56666 * 0.65, //7.794756,
            table: -9,
            secondaries: ['haste'],
            ppm: 1, //
          },
        ],
        runFunc: function(data, player, itemLevel, additionalData) {
          let bonus_stats = {};
          
          bonus_stats.dps = processedValue(data[0], itemLevel) * player.getStatMults(data[0].secondaries) * data[0].ppm / 60 * 0.6;

          return bonus_stats;
        }
      },
      {
        /* -------------------- */
        /* Adaptive Dracothyst Armguards                
        /* -------------------- */
        /* 
        */
        name: "Adaptive Dracothyst Armguards",
        effects: [
          { 
            coefficient: 0.248319,
            table: -7,
            duration: 12, 
            ppm: 2,
          },
        ],
        runFunc: function(data, player, itemLevel, additionalData) {
          let bonus_stats = {};
          // TODO
          const proc = runGenericPPMTrinket(data[0], itemLevel);
          bonus_stats['haste'] = proc;
          bonus_stats['mastery'] = proc;
          bonus_stats['versatility'] = proc * 0.75;
          bonus_stats['crit'] = proc * 0.75;

          /*['versatility', 'haste', 'crit', 'mastery'].forEach((stat) => {
            // A proc can either be haste / mast or crit / vers.
            bonus_stats[stat] = proc / 2;
          }); */

          return bonus_stats;
        }
      },
      {
        /* -------------------- */
        /* Undulating Sporecloak                    
        /* -------------------- */
        /* Self-HoT every 5s. Big shield if you drop low.
        */
        name: "Undulating Sporecloak",
        effects: [
          { // Passive Heal
            coefficient: 10.73745, //44.02832,
            table: -9,
            ppm: 60 / 5, // The cloak heals every 5 seconds.
            secondaries: ['versatility'],
            efficiency: 0.55,
          },
          { // Shield portion
            coefficient: 129.4445, //257.6989, 
            table: -9,
            ppm: 0.07, // 120s cooldown, but will proc rarely. Max PPM is 0.5.
            secondaries: ['versatility'],
            efficiency: 0.52,
          },
          { // Vers portion
            coefficient: 0.30097,
            table: -9, // They will probably correct this.
            expectedUptime: 0.85,
          },
        ],
        runFunc: function(data, player, itemLevel, additionalData) {
          let bonus_stats = {};
          // TODO

          bonus_stats.hps = processedValue(data[0], itemLevel, data[0].efficiency) * player.getStatMults(data[0].secondaries) * data[0].ppm / 60;
          bonus_stats.hps += processedValue(data[1], itemLevel, data[1].efficiency) * player.getStatMults(data[1].secondaries) * data[1].ppm / 60;
          bonus_stats.versatility = processedValue(data[2], itemLevel) * data[2].expectedUptime;

          return bonus_stats;
        }
      },
      {
        /* -------------------- */
        /* Spore Keeper's Baton (Sporeadic Adaptability)     
        /* -------------------- */
        /* 
        */
        name: "Spore Keeper's Baton",
        effects: [
          { // Ally buff effect.
            coefficient: 0.875413,
            table: -7, 
            duration: 12,
            ppm: 2 / 2, // Haste scaling. Also has an internal CD of 12s because why not.
          },
          { // DPS effect
            coefficient: 2.855669,
            table: -9, 
            ticks: 12, // TODO: Confirm it's 12 ticks.
            ppm: 2 / 2,
            secondaries: ['crit'], // Check DoT haste scaling but shouldn't have it.
          },
          { // Shield effect. Procs with the damage.
            coefficient: 23.53642,
            table: -9, 
            efficiency: 0.95,
            secondaries: ['versatility'],
            ppm: 2 / 2,
          },
        ],
        runFunc: function(data, player, itemLevel, additionalData) {
          let bonus_stats = {};
          // 
          const versEffect = runGenericPPMTrinket(data[0], itemLevel) * player.getStatPerc('haste');
          if (additionalData.settings.includeGroupBenefits) bonus_stats.allyStats = versEffect;

          // Damage effect
          const ppm = data[0].ppm * player.getStatPerc('haste');
          bonus_stats.dps = processedValue(data[1], itemLevel) * player.getStatMults(data[1].secondaries) * data[1].ticks * ppm / 60;
          bonus_stats.hps = processedValue(data[2], itemLevel, data[2].efficiency) * player.getStatMults(data[2].secondaries) * ppm / 60;

          return bonus_stats;
        }
      },
      {
        /* -------------------- */
        /* Shadowflame-Tempered Armor Patch           
        /* -------------------- */
        /* 
        */
        name: "Shadowflame-Tempered Armor Patch",
        effects: [
          { // Damage Effect
            coefficient: 7.845473,
            table: -9,
            secondaries: ['haste', 'crit', 'versatility'],
            ppm: 5, // 4 / 2
            stackBonus: 0.2,
            maxStacks: 5,
          },
        ],
        runFunc: function(data, player, itemLevel, additionalData) {
          let bonus_stats = {};
          const averageMult = 1 + (data[0].stackBonus * data[0].maxStacks / 2);
          bonus_stats.dps = processedValue(data[0], itemLevel) * player.getStatMults(data[0].secondaries) * data[0].ppm * averageMult / 60;

          return bonus_stats;
        }
      },
      {
        /* -------------------- */
        /* Slimy Expulsion Boots         
        /* -------------------- */
        /* 
        */
        name: "Slimy Expulsion Boots",
        effects: [
          { // Damage Effect
            coefficient: 20.43177,
            table: -9,
            secondaries: ['haste', 'crit', 'versatility'],
            ppm: 4,
          },
          { // -Haste
            coefficient: -0.095923,
            table: -7,
          },
        ],
        runFunc: function(data, player, itemLevel, additionalData) {
          let bonus_stats = {};
          bonus_stats.dps = processedValue(data[0], itemLevel) * player.getStatMults(data[0].secondaries) * data[0].ppm / 60;
          bonus_stats.haste = processedValue(data[1], itemLevel);
          return bonus_stats;
        }
      },
]