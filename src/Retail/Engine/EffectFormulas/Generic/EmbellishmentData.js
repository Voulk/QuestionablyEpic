import { itemLevels } from "Databases/itemLevelsDB";
import { convertPPMToUptime, processedValue, runGenericPPMTrinket, runGenericPPMTrinketHasted,
  getHighestStat, getLowestStat, runGenericOnUseTrinket, getDiminishedValue, runDiscOnUseTrinket, getSetting, runGenericFlatProc } from "Retail/Engine/EffectFormulas/EffectUtilities";


export const getEmbellishmentEffect = (effectName, itemLevel, additionalData) => {
    let activeEffect;
    
    
    if (effectName.includes("Allied") && effectName !== "Allied Wristguard of Companionship") activeEffect = embellishmentData.find((effect) => effect.name === "Rallied to Victory");
    else activeEffect = embellishmentData.find((effect) => effect.name === effectName);

    //let additionalData = {contentType: contentType, setStats: setStats, settings: settings};
    if (activeEffect !== undefined) {
      return activeEffect.runFunc(activeEffect.effects, additionalData.player, itemLevel, additionalData);
    }
    else {
      return {};
    }

}

export const embellishmentData = [
  // ---------- THE WAR WITHIN
  {
    /* -------------------- */
    /* Captured Starlight                      
    /* -------------------- */

    name: "Captured Starlight",
    description: "A useful idea in theory but the shield isn't very big for how ridiculous the cooldown is.",
    effects: [
      { 
        coefficient: 66.05486, // Check this. I guess it scales with num gem types they have?
        table: -9,
        ppm: 60 / (240 - 48),
        efficiency: 0.7
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      bonus_stats.hps = runGenericFlatProc(data[0], itemLevel, player, additionalData.contentType);

      return bonus_stats;
    }
  },
  {
    /* -------------------- */
    /* Binding of Binding                      
    /* -------------------- */

    name: "Binding of Binding",
    description: "A purely support embellishment effect but a reasonable choice in Mythic+ where the alternatives can be dreadful.",
    effects: [
      { 
        coefficient: 0.27231, // Check this. I guess it scales with num gem types they have?
        table: -571,
        duration: 15, 
        ppm: 2,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};
      // TODO Add top gear support for auto-generating gems.
      const statAvg = runGenericPPMTrinket(data[0], itemLevel);

      bonus_stats.allyStats = statAvg;

      return bonus_stats;
    }
  },
  {
    name: "Waders of the Unifying Flame",
    description: "An overly convoluted way of getting a minimal amount of stats.",
    effects: [
      { 
        coefficient: 0.204581,
        table: -571,
        duration: 15, 
        ppm: 2,
        efficiency: 0.7,
      },
      { 
        coefficient: 0.040916,
        table: -571,
        duration: 15, 
        ppm: 2,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      const bestStat = player.getHighestStatWeight(additionalData.contentType);
      bonus_stats[bestStat] = runGenericPPMTrinket(data[0], itemLevel) * data[0].efficiency;
      bonus_stats.allyStats = runGenericPPMTrinket(data[1], itemLevel) * data[0].efficiency;

      return bonus_stats;
    }
  },
  {
    name: "Embrace of the Cinderbee",
    description: "An overly convoluted way of getting a minimal amount of stats.",
    effects: [
      { 
        coefficient: 0.181946,
        table: -571,
        duration: 12, 
        ppm: 3,
        efficiency: 0.7,
      },
      { 
        coefficient: 0.022634,
        table: -571,
        duration: 15, 
        ppm: 3,
        targets: 2,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};
      const bestStat = player.getHighestStatWeight(additionalData.contentType);

      bonus_stats[bestStat] = runGenericPPMTrinket(data[0], itemLevel) * data[0].efficiency;
      bonus_stats.allyStats = runGenericPPMTrinket(data[1], itemLevel) * data[0].efficiency * data[1].targets;

      return bonus_stats;
    }
  },
  { // 2pc set. Coefficient is likely doubled.
    name: "Fury of the Stormrook",
    effects: [
      { 
        coefficient: 0.54462,
        table: -571,
        duration: 12, 
        ppm: 2.5,
        efficiency: 0.8,
        stat: "haste",
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      bonus_stats.haste = runGenericPPMTrinket(data[0], itemLevel) * data[0].efficiency;

      return bonus_stats;
    }
  },
  { // This basically just gives out stat with high uptime for each gem you have socketed.
    name: "Fractured Gemstone Locket",
    effects: [
      { 
        coefficient: 0.02455, 
        table: -571,
        uptime: 0.95
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      bonus_stats.allyStats = processedValue(data[0], itemLevel) * data[0].uptime * getSetting(additionalData.settings, "socketedGems");

      return bonus_stats;
    }
  },
  { // DPS Spells
    name: "Woven Dusk",
    description: "Appears to be bugged in-game and the uptime is much lower than it should be.",
    effects: [
      { 
        coefficient: 0.453908, 
        table: -571,
        ppm: 1.2 * 0.5,
        duration: 30,
        stat: "haste",
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      if (player.spec === "Discipline Priest" || getSetting(additionalData.settings, "dpsFlag")) {
        bonus_stats.haste = runGenericPPMTrinket(data[0], itemLevel);
      }

      return bonus_stats;
    }
  },
  { // Healing Spells
    name: "Woven Dawn",
    effects: [
      { 
        coefficient: 0.453908, 
        table: -571,
        ppm: 1.2,
        duration: 30,
        stat: "mastery",
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      bonus_stats.mastery = runGenericPPMTrinket(data[0], itemLevel);

      return bonus_stats;
    }
  },
  { // Vers while above 80% health. Need to check if heartbeat or cooldown.
    name: "Duskthread Lining",
    description: "While uptime can be good, uptime tends to be much lower during moments where your healing is actually relevant making these just ok. Often better in Mythic+.",
    setting: true,
    effects: [
      { 
        coefficient: 0.131628, 
        table: -571,
        uptime: 0.6,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      bonus_stats.versatility = processedValue(data[0], itemLevel) * getSetting(additionalData.settings, "liningUptime") / 100;

      return bonus_stats;
    }
  },
  { // Crit while above 80% health. Need to check if heartbeat or cooldown.
    name: "Dawnthread Lining",
    description: "While uptime can be good, uptime tends to be much lower during moments where your healing is actually relevant making these just ok. Often better in Mythic+.",
    setting: true,
    effects: [
      { 
        coefficient: 0.131628, 
        table: -571,
        uptime: 0.6,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      bonus_stats.crit = processedValue(data[0], itemLevel) * getSetting(additionalData.settings, "liningUptime") / 100;

      return bonus_stats;
    }
  },
  { // Stacking stat buff
    name: "Darkmoon Sigil: Ascension",
    description: "Powerful, but note it can only be put on a weapon or offhand slot. Weaker in Mythic+ where stacks often fall off in between packs.",
    effects: [
      { // Gives 89 of a random stat
        coefficient: 0.021938, // 0.025246 appears to be the trinket, // 0.034796 at -9 in the spell data too, 0.007428
        table: -571,
        maxStacks: 10,
        timer: 8,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      const armorPatch = additionalData.setVariables && additionalData.setVariables.nerubianArmorPatch;

      const fightLength = additionalData.castModel.fightInfo.fightLength
      // The Sigil gives a random stat so we'll split our value into quarters after we calculate it.
      // It takes 80 seconds of combat to reach max buffs which we'll then have for the rest of the fight.
      let averageStacks = ((fightLength - 80) * 10 + 80 * 5) / fightLength;
      if (additionalData.contentType === "Dungeon") averageStacks *= 0.6;

      
      ['haste', 'crit', 'versatility', 'mastery'].forEach((stat) => {
        bonus_stats[stat] = 89 /*processedValue(data[0], itemLevel)*/ * averageStacks / 4;
        if (armorPatch) bonus_stats[stat] *= 2;
      })

      return bonus_stats;
    }
  },
  { // Stacking vers buff
    name: "Darkmoon Sigil: Symbiosis",
    description: "Strong, but note it can only be put on a weapon or offhand slot. It also tends to just lose to the Ascension sigil quite often so you might just use that instead.",
    effects: [
      { 
        coefficient: 0.022809, // 0.088359 at -9 in the spell data too.
        table: -571,
        maxStacks: 5,
        timer: 10,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      const fightLength = additionalData.castModel.fightInfo.fightLength
      // The Sigil gives a random stat so we'll split our value into quarters after we calculate it.
      // It takes 80 seconds of combat to reach max buffs which we'll then have for the rest of the fight.
      let averageStacks = ((fightLength - 50) * 5 + 50 * 2.5) / fightLength;
      if (additionalData.contentType === "Dungeon") averageStacks *= 0.6;
      
      bonus_stats.versatility = processedValue(data[0], itemLevel) * averageStacks;

      if (additionalData.setVariables && additionalData.setVariables.nerubianArmorPatch) {  
        bonus_stats.versatility *= 2;
      }


      return bonus_stats;
    }
  },
  { // Healing Spells
    name: "Adrenal Surge Clasp", 
    description: "This doesn't proc regularly enough to make it a competitive option for a non-tank.",
    effects: [
      { 
        coefficient: 0.312343, 
        table: -1,
        ppm: 2,
        duration: 12,
        stat: "intellect",
      },
      { 
        coefficient: -0.053974, 
        table: -571,
        ppm: 2,
        duration: 12,
        stat: "mastery",
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      bonus_stats.intellect = runGenericPPMTrinket(data[0], itemLevel) * 0.3;
      bonus_stats.mastery = runGenericPPMTrinket(data[1], itemLevel) * 0.3;

      return bonus_stats;
    }
  },
  { // DPS Spells
    name: "Blessed Weapon Grip",
    description: "Procs off DPS spells. Effect starts strong and then fades over its duration.",
    effects: [
      { 
        coefficient: 0.032211, 
        table: -571,
        ppm: 1,
        duration: 30,
        stat: "mixed",
        maxStacks: 10,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      if (player.spec === "Discipline Priest" || getSetting(additionalData.settings, "dpsFlag") || additionalData.contentType === "Dungeon") {
        const bestStat = player.getHighestStatWeight(additionalData.contentType)
        const effectData = {...data[0], stat: bestStat};
        bonus_stats[bestStat] = runGenericPPMTrinket(effectData, itemLevel, additionalData.castModel) * data[0].maxStacks / 2;
      }

      return bonus_stats;
    }
  },
  { // DPS Spells
    name: "Prismatic Null Stone",
    description: "Most of the time you will use a movement speed Blasphemite gem which means this is purely a quality of life embellishment. The numbers shown here are for if you are using the crit effect gem. This is basically no advantage at all and you should not craft this.",
    effects: [
      { 
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      // With four stones equipped our crit mult is 200.6%. With the stone it goes to 200.75%. 
      const critChance = player.getStatPerc('crit');
      const nonCritChance = 1 - critChance;
      bonus_stats.hps = ((nonCritChance + critChance * 2.0075) / (nonCritChance + critChance * 2.006) - 1) * player.getHPS();

      return bonus_stats;
    }
  },
  { // NOT YET FULLY IMPLEMENTED
    /*
      -- Weapons only --
      Can have multiple buffs active at a time
      Fire / Shadow damage gives haste
      Nature / Frost damage gives crit
      Holy / Arcane damage gives mastery
      Multischool damage gives vers

    */
    name: "Darkmoon Sigil: Vivacity",
    effects: [
      { 
        coefficient: 0.14016,
        table: -571,
        ppm: 2,
        duration: 15,
        stat: "mixed"
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};
      const dpsFlag = getSetting(additionalData.settings, "dpsFlag");
      
      let validStats = [];
      if (player.spec === "Discipline Priest") validStats = ["haste", "mastery", "versatility"];
      else if (player.spec === "Holy Priest" && dpsFlag) validStats = ["crit", "mastery"];
      else if (player.spec === "Restoration Druid") validStats = ["crit"]
      else if (player.spec === "Preservation Evoker") validStats = ["haste", "mastery", "versatility"];
      else if (player.spec === "Restoration Shaman") validStats = ["crit", "versatility"];
      else validStats = [];

      const rawValue = processedValue(data[0], itemLevel);
      const uptime = convertPPMToUptime(data[0].ppm, data[0].duration);
    
      validStats.forEach((stat) => {
        bonus_stats[stat] = getDiminishedValue(stat, rawValue, additionalData.setStats[stat] || 0) * uptime / validStats.length;
      });

      return bonus_stats;
    }
  },


  // ---------- DRAGONFLIGHT
  {
    /* -------------------- */
    /* Flourishing Dream Helm                       
    /* -------------------- */
    name: "Flourishing Dream Helm",
    effects: [
      { // Self shield portion
        coefficient: 91.45733, 
        table: -9,
        duration: 15, // 
        ppm: 1.21,
        efficiency: 0,
      },
      { // Ally + Self Shield
        coefficient: 60.97212, 
        table: -9,
        duration: 15, 
        ppm: 1.21,
        efficiency: 0,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};
      // 
      bonus_stats.hps = runGenericFlatProc(data[0], itemLevel, player, additionalData.contentType);
      bonus_stats.hps += runGenericFlatProc(data[1], itemLevel, player, additionalData.contentType) * 2;

      return bonus_stats;
    }
  },
  {
    /* -------------------- */
    /* Verdant Tether                       
    /* -------------------- */
    /* Max value at 0yd distance, min value at 30yds distance. Procs on the target of your heal, can't proc on self heals. 
       Adds a little green trail going from you to your target.
    */
    name: "Verdant Tether",
    effects: [
      { 
        coefficient: 0.229097,
        table: -72,
        duration: 15, 
        ppm: 2.2,
        multiplier: 0.7, // Mult: 1 = you are next to the target. Mult: 0.5 = You are far away from the target.
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};
      // TODO Add top gear support for auto-generating gems.
      const versAvg = runGenericPPMTrinket(data[0], itemLevel) * data[0].multiplier;
      bonus_stats.versatility = versAvg;
      bonus_stats.allyStats = versAvg;

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
        coefficient: 0.195571, 
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
            table: -72,
            duration: 8, // 5s + 1s per equipped gem. 
            ppm: 2,
          },
        ],
        runFunc: function(data, player, itemLevel, additionalData) {
          let bonus_stats = {};
          
          let gems = 0;
          let lariatSecondary = "";

          if ('setVariables' in additionalData && 'setSockets' in additionalData.setVariables) {
            // This is a Top Gear calculation and we'll use set variables instead of our defaults or settings.
            // This is a 100% accurate Lariat calculation instead of the close estimate we use in lossier modules. 
            gems = additionalData.setVariables.setSockets || 3;
            const element = additionalData.setVariables.socketElement;

            if (element === "Fire") lariatSecondary = "crit";
            else if (element === "Frost") lariatSecondary = "versatility";
            else if (element === "Earth") lariatSecondary = "mastery";
            else lariatSecondary = "haste"; // Air but we'll use it as a fall back too. 

          }
          else {
            // This is Quick Compare or Embellishment chart. We're happy to just use an estimate here since we have no knowledge of particular gems used.
            // Note that this tends to be an overestimation.
            gems = getSetting(additionalData.settings, "lariatGems") || 3;
            lariatSecondary = player.getHighestStatWeight(additionalData.contentType);
          }

          const duration = Math.min(13, 5 + parseInt(gems));
          const newData = {...data[0], duration: duration};
          bonus_stats[lariatSecondary] = runGenericPPMTrinket(newData, itemLevel);

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
            coefficient: 76.17424, //117.1906 * 1.15 * 0.65, // Inexplicitly heals for 15% more than tooltip value. It isn't talents, nor secondaries. Not included for now.
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
            secondaries: ['haste', 'versatility'],
            efficiency: 0.6,
          },
          { // DPS Effect
            coefficient: 8.901271,
            table: -7,
            ppm: 4 * 0.25,
            secondaries: ['haste', 'versatility'],
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
            uptime: 0.21,
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
            efficiency: 0.5,
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
            table: -8, // 
            stacks: {Raid: 0.2, Dungeon: 0.5} // Revisit dungeon stacks.
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
        /* Horizon Strider's Garments       
        /* -------------------- */
        /* 
        */
        name: "Horizon Strider's Garments",
        effects: [
          { 
            coefficient: 0.046937,
            table: -7,
            stacks: {Raid: 4.1, Dungeon: 3.9} // Revisit dungeon stacks.
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
            table: -8, // It no longer incorrectly scales with Haste.
            duration: 10,
            ppm: 1,
          },
        ],
        runFunc: function(data, player, itemLevel, additionalData) {
          let bonus_stats = {};
          // We're going to ignore overlapping procs here since we have a reasonable expectation that they'll go on different targets.
          // This ends up a minor overestimation since in practice you might clip the same target twice but it doesn't meaningfully change the value.
          const allyVers = processedValue(data[0], itemLevel) * data[0].duration * data[0].ppm / 60 * 1.13;
          bonus_stats.versatility = runGenericPPMTrinket(data[0], itemLevel);

          bonus_stats.allyStats = allyVers * 4;
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
            ppm: 9, // May have haste scaling. 
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
        cardDescription: "",
        cardType: "special",
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
        cardDescription: "",
        cardType: "special",
        effects: [
          { // Passive Heal
            coefficient: 2.33081, //44.02832,
            table: -9,
            ppm: 60 / 5,
            secondaries: ['versatility'],
            efficiency: 0.57,
          },
          { // Shield portion
            coefficient: 55.9565,
            table: -9,
            ppm: 0.09, // 120s cooldown, but will proc rarely. Max PPM is 0.5.
            secondaries: ['versatility'],
            efficiency: 0.52,
          },
          { // Vers portion
            coefficient: 0.0572,
            table: -7, 
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
        /* This has a 12s ICD which means our ppm is a little lower than a regular proc trinket might be. We can refine this later but realistically this isn't a top pick.
        */
        name: "Spore Keeper's Baton",
        effects: [
          { // Ally buff effect.
            coefficient: 0.875413,
            table: -7, 
            duration: 12,
            ppm: 2 / 2 / 1.1, // Haste scaling removed. Also has an internal CD of 12s because why not.
          },
          { // DPS effect
            coefficient: 2.855669,
            table: -9, 
            ticks: 12, // TODO: Confirm it's 12 ticks.
            ppm: 2 / 2 / 1.1,
            secondaries: ['crit'], // Check DoT haste scaling but shouldn't have it. Didn't originally have vers scaling either. What a nice item.
          },
          { // Shield effect. Procs with the damage.
            coefficient: 23.53642,
            table: -9, 
            efficiency: 0.95,
            secondaries: ['versatility'],
            ppm: 2 / 2 / 1.1,
          },
        ],
        runFunc: function(data, player, itemLevel, additionalData) {
          let bonus_stats = {};
          // 
          const versEffect = runGenericPPMTrinket(data[0], itemLevel);
          bonus_stats.allyStats = versEffect;

          // Damage effect
          const ppm = data[0].ppm;
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
      {
        /* -------------------- */
        /* Weathered Explorer's Stave         
        /* -------------------- */
        /* Strong on paper due to its incorrect scaling, but has tough competition from on-use damage weapons in raid and M+.
        */
        name: "Weathered Explorer's Stave",
        effects: [
          { // Haste
            coefficient: 3.114016,
            table: -9,
            ppm: 1.21,
          },

        ],
        runFunc: function(data, player, itemLevel, additionalData) {
          let bonus_stats = {};
          bonus_stats.haste = runGenericPPMTrinket(data[0], itemLevel)

          // TODO: Deduct regular secondaries from it if we're looking at the chart.
          return bonus_stats;
        }
      },
]