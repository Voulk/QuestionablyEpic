import { convertPPMToUptime, getHighestStat, runGenericFlatProc, getSetting, processedValue, runGenericPPMTrinket, runGenericOnUseTrinket, getDiminishedValue, runDiscOnUseTrinket } from "../EffectUtilities";

export const dungeonTrinketData = [
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                               Leaf of the Ancient Protectors                                   */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "Leaf of the Ancient Protectors",
    effects: [
      {  // Absorb
        coefficient: 155.9272,
        table: -8,
        secondaries: ["versatility"],
        cooldown: 60,
        efficiency: 0.95, // This is a fairly medium sized absorb. You should be able to use it fine in most content.
      },
      { // Gifted Versatility
        coefficient: 0.964816, 
        table: -7,
        cooldown: 60,
        efficiency: 0.95, // If the absorb is not fully consumed, then they don't get the versatility.
        duration: 15,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      bonus_stats.hps = runGenericFlatProc(data[0], itemLevel, player);
      bonus_stats.allyStats = processedValue(data[1], itemLevel) * data[1].efficiency * data[1].duration / data[1].cooldown;

      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                  Coagulated Genesaur Blood                                     */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "Coagulated Genesaur Blood",
    effects: [
      {
        coefficient: 2.883274,
        table: -7,
        stat: "crit",
        duration: 10,
        ppm: 1,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};
      bonus_stats.crit = runGenericPPMTrinket(data[0], itemLevel);

      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                          Sea Star                                              */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "Sea Star",
    effects: [
      {
        coefficient: 1.415952,
        table: -1,
        stat: "intellect",
        duration: 15,
        ppm: 1.5,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};
      bonus_stats.intellect = runGenericPPMTrinket(data[0], itemLevel);

      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                     Lady Waycrests Music Box                                   */
    /* ---------------------------------------------------------------------------------------------- */
    /* Damage and healing procs appear to be split. Ring NYI.
    */
    name: "Lady Waycrest's Music Box",
    effects: [
      { // Healing
        coefficient: 26.44263,
        table: -9,
        secondaries: ['haste', 'crit', 'versatility'],
        ppm: 3,
        efficiency: {Raid: 0.82, Dungeon: 0.8},
      },
      { // Damage
        coefficient: 17.61531,
        table: -9,
        secondaries: ['haste', 'crit', 'versatility'],
        ppm: 3,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};
      
      bonus_stats.hps = runGenericFlatProc(data[0], itemLevel, player, additionalData.contentType);
      bonus_stats.dps = runGenericFlatProc(data[1], itemLevel, player, additionalData.contentType);

      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                     Revitalizing Voodoo Totem                                  */
    /* ---------------------------------------------------------------------------------------------- */
    /* Caps at 13. Everything after that is just full strength.
    */
    name: "Revitalizing Voodoo Totem",
    effects: [
      { 
        coefficient: 3.182418,
        table: -9,
        secondaries: ['haste', 'crit', 'versatility'],
        ticks: 12, // Haste adds ticks / partial ticks. 
        cooldown: 90,
        tickRate: 0.5,
        maxStacks: 13,
        efficiency: {Raid: 0.55, Dungeon: 0.65},
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};
      const timeToMax = (13 * (0.5/player.getStatPerc('haste')))
      const averageStacks = timeToMax / 6 * 6.5 + (1-(timeToMax / 6)) * 13;
      
      bonus_stats.hps = processedValue(data[0], itemLevel, data[0].efficiency[additionalData.contentType]) * player.getStatMults(data[0].secondaries) * data[0].ticks * averageStacks / data[0].cooldown;

      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                    Time-Thief's Gambit                                         */
    /* ---------------------------------------------------------------------------------------------- */
    //
    name: "Time-Thief's Gambit",
    effects: [
      { // Haste. Stun portion not included.
        coefficient: 1.680047, 
        table: -7,
        duration: 15,
        cooldown: 60, 
        penalty: 0.2,
      },
      { // 

      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};
      bonus_stats.haste = runGenericOnUseTrinket(data[0], itemLevel, additionalData.castModel) * data[0].penalty;

      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                            Mirror of Fractured Tomorrows                                       */
    /* ---------------------------------------------------------------------------------------------- */
    //
    name: "Mirror of Fractured Tomorrows",
    effects: [
      { // Highest secondary
        coefficient: 2.521002, 
        table: -7,
        duration: 20,
        cooldown: 180, 
      },
      { // Clone portion (currently unknown)

      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};
      const bestStat = getHighestStat(additionalData.setStats);//player.getHighestStatWeight(additionalData.contentType);
      bonus_stats[bestStat] = runGenericOnUseTrinket(data[0], itemLevel, additionalData.castModel);

      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                        Echoing Tyrstone                                        */
    /* ---------------------------------------------------------------------------------------------- */
    /* Can currently hit pets and full health allies which increases overhealing and kills off a quarter of the value.
    */
    name: "Echoing Tyrstone",
    effects: [
      { 
        coefficient: 167.2488 * 1.7, 
        table: -9,
        secondaries: ["versatility", "crit"],
        targets: {Raid: 1, Dungeon: 1}, // This is now split.
        cooldown: 120,
        efficiency: 0.68, // No longer splits to pets.
      },
      { // AoE Haste effect
        coefficient: 0.189052, 
        table: -7,
        targets: {Raid: 20, Dungeon: 5}, // TODO: Test that this isn't split too.
        cooldown: 120,
        efficiency: 0.82, // No overhealing, but we're still expecting a little wastage here.
        duration: 15,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      bonus_stats.hps = runGenericFlatProc(data[0], itemLevel, player, additionalData.contentType || "Raid") * (1 + 0.15 * 5);
      bonus_stats.allyStats = processedValue(data[1], itemLevel) * data[1].targets[additionalData.contentType] * data[1].efficiency * data[1].duration / data[1].cooldown;
      if (player.spec === "Holy Priest") bonus_stats.hps *= ((player.getStatPerc("mastery") - 1) * 0.75 + 1);

      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                            Rainsong                                            */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "Rainsong",
    effects: [
      { 
        coefficient: 1.200433,
        table: -7,
        stat: "haste",
        duration: 15,
        ppm: 1,
      },
      { // Ally buff
        coefficient: 0.599751,
        table: -7,
        stat: "haste",
        duration: 10,
        ppm: 8,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};
      bonus_stats.haste = runGenericPPMTrinket(data[0], itemLevel);

      // Ally buff portion
      if (getSetting(additionalData.settings, 'includeGroupBenefits')) {
        const allyHasteBuff = processedValue(data[1], itemLevel);
        const allyPPM = data[1].ppm * data[0].duration / 60; // This has a high ppm, but we can only proc it for 15s out of every minute. We can expect 2 procs on average.
        bonus_stats.allyStats = allyPPM * allyHasteBuff * data[1].duration / 60;
      }

      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                    Emerald Coach's Whistle                                      */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "Emerald Coach's Whistle",
    effects: [
      { // Mastery portion
        coefficient: 0.780421,
        table: -7,
        stat: "mastery",
        duration: 10,
        ppm: 1,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};
      bonus_stats.mastery = runGenericPPMTrinket(data[0], itemLevel);
      if (getSetting(additionalData.settings, 'includeGroupBenefits')) bonus_stats.allyStats = bonus_stats.mastery;
      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                     Water's Beating Heart                                      */
    /* ---------------------------------------------------------------------------------------------- */
    /* Armor bonus not included (and rarely useful).
    */
    name: "Water's Beating Heart",
    effects: [
      { 
        coefficient: 39.11369, // Note that this coefficient is for when the target is below 20% health.
        table: -9,
        secondaries: ['haste', 'crit', 'versatility'],
        ticks: 4, // Haste adds ticks / partial ticks. 
        cooldown: 120,
        mult: 0.7, // Mult = 1 is the target being sub 20% health for it's duration. Mult = 0.5 would be a full health target.
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      bonus_stats.hps = processedValue(data[0], itemLevel, data[0].mult) * player.getStatMults(data[0].secondaries) * data[0].ticks / data[0].cooldown;

      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                  Kyrakka's Searing Embers                                      */
    /* ---------------------------------------------------------------------------------------------- */

    name: "Kyrakka's Searing Embers",
    effects: [
      { // Healing Portion
        coefficient: 88.852905, // 161.5508, 
        table: -9,
        secondaries: ['haste', 'crit', 'versatility'],
        ppm: 2,
        mult: 0.55, // Our expected overhealing.
      },
      { // Damage portion
        // Damage is split, so we don't need any kind of target multiplier in here.
        coefficient: 41.75107,
        table: -9,
        secondaries: ['haste', 'crit', 'versatility'],
        ppm: 2,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      bonus_stats.hps = processedValue(data[0], itemLevel, data[0].mult) * player.getStatMults(data[0].secondaries) * data[0].ppm / 60;
      bonus_stats.dps = processedValue(data[1], itemLevel) * player.getStatMults(data[1].secondaries) * data[1].ppm / 60;

      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                        Ruby Whelp Shell                                        */
    /* ---------------------------------------------------------------------------------------------- */

    name: "Ruby Whelp Shell",
    effects: [
      { // Healing Portion - Single Target Heal
        coefficient: 198.7088,
        table: -9,
        secondaries: ['crit', 'versatility'],
        ppm: 1.01,
        efficiency: 0.55, // Our expected overhealing.
      },
      { // Healing Portion - Mending  Breath (AoE)
        coefficient: 165.5901,
        table: -9,
        secondaries: ['crit', 'versatility'],
        ppm: 1.01,
        targets: 3.2,
        efficiency: 0.35, // Our expected overhealing. It's extremely high for this and it can also just whiff and hit pets. 
      },
      { // Crit Stat Buff (Sleepy Ruby Warmth)
        coefficient: 2.661627,
        table: -7,
        ppm: 1.01,
        stat: "crit",
        duration: 12,
      },
      { // Haste Stat Buff (Under Ruby Wings)
        // Like other mega haste buffs, some specs are unable to take advantage of it in a useful way. 
        // The spec multiplier ensures the rating is more practical, but it's acknowledged that this is somewhat spurious. 
        coefficient: 2.903762,
        table: -7,
        stat: "haste",
        ppm: 1.01,
        duration: 12,
        specMult: {"Preservation Evoker": 0.5, "Restoration Druid": 0.8, "Holy Paladin": 0.67, "Mistweaver Monk": 0.8, "Restoration Shaman": 0.65, "Holy Priest": 0.7, "Discipline Priest": 0.7},
      },
      { // ST Damage Portion
        coefficient: 41.75107,
        table: -9,
        secondaries: ['haste', 'crit', 'versatility'],
        ppm: 2,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};
      let procRates = {
        "STHeal": 0.167,
        "AoEHeal": 0.167,
        "STDamage": 0.167,
        "AoEDamage": 0.167,
        "CritProc": 0.167,
        "HasteProc":  0.167,
      }
      const bigProc = 0.65; // This is likely to be an underestimation but it's better to be cautious until we have more data.
      const smallProc = (1 - bigProc) / 5;
      // We still require more data using fully trained dragons to lock down specific ratios of abilities
      const whelpSetting = "Crit Buff"; // getSetting(additionalData.settings, "rubyWhelpShell");
      if (whelpSetting === "AoE Heal") { procRates["AoEHeal"] = bigProc; procRates["STHeal"] = smallProc; procRates["STDamage"] = smallProc; procRates["AoEDamage"] = smallProc; procRates["CritProc"] = smallProc; procRates["HasteProc"] = smallProc; }
      else if (whelpSetting === "ST Heal") { procRates["AoEHeal"] = smallProc; procRates["STHeal"] = bigProc; procRates["STDamage"] = smallProc; procRates["AoEDamage"] = smallProc; procRates["CritProc"] = smallProc; procRates["HasteProc"] = smallProc; }
      else if (whelpSetting === "Crit Buff") { procRates["AoEHeal"] = smallProc; procRates["STHeal"] = smallProc; procRates["STDamage"] = smallProc; procRates["AoEDamage"] = smallProc; procRates["CritProc"] = bigProc; procRates["HasteProc"] = smallProc; }
      else if (whelpSetting === "Haste Buff") { procRates["AoEHeal"] = smallProc; procRates["STHeal"] = smallProc; procRates["STDamage"] = smallProc; procRates["AoEDamage"] = smallProc; procRates["CritProc"] = smallProc; procRates["HasteProc"] = bigProc; }
      else if (whelpSetting === "ST Damage") { procRates["AoEHeal"] = smallProc; procRates["STHeal"] = smallProc; procRates["STDamage"] = bigProc; procRates["AoEDamage"] = smallProc; procRates["CritProc"] = smallProc; procRates["HasteProc"] = smallProc; }
      else if (whelpSetting === "AoE Damage") { procRates["AoEHeal"] = smallProc; procRates["STHeal"] = smallProc; procRates["STDamage"] = smallProc; procRates["AoEDamage"] = bigProc; procRates["CritProc"] = smallProc; procRates["HasteProc"] = smallProc; }
      else { procRates["AoEHeal"] = 0.1667; procRates["STHeal"] = 0.1667; procRates["STDamage"] = 0.1667; procRates["AoEDamage"] = 0.1667; procRates["CritProc"] = 0.1667; procRates["HasteProc"] = 0.1667; }

      // ST Heal
      bonus_stats.hps = processedValue(data[0], itemLevel, data[0].efficiency * procRates["STHeal"]) * player.getStatMults(data[0].secondaries) * data[0].ppm / 60;
      // AoE Heal
      bonus_stats.hps = processedValue(data[1], itemLevel, data[1].efficiency * procRates["AoEHeal"]) * player.getStatMults(data[1].secondaries) * (Math.sqrt(1 / data[1].targets) * data[1].targets) * data[0].ppm / 60;
      // Crit Proc
      bonus_stats.crit = runGenericPPMTrinket(data[2], itemLevel, additionalData.setStats) * procRates["CritProc"];
      // Haste Proc
      bonus_stats.haste = runGenericPPMTrinket(data[3], itemLevel, additionalData.setStats) * procRates["HasteProc"] * data[3].specMult[player.spec];

      // ST DPS and AoE DPS TODO
      //bonus_stats.dps = processedValue(data[1], itemLevel) * player.getStatMults(data[1].secondaries) * data[1].ppm / 60;

      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                   Tome of Unstable Power                                       */
    /* ---------------------------------------------------------------------------------------------- */
    // This is technically a party buff but because it comes with downside, that portion isn't currently included.
    name: "Tome of Unstable Power",
    effects: [
      { // +Int Portion
        coefficient: 1.453919, 
        table: -1,
        duration: 15,
        cooldown: 180,
        efficiency: 0.25, // The rune is tiny. This functionally is incompatible with most fight designs.
      },
      { // -Crit Portion
        coefficient: 0.907077, 
        table: -7,
        duration: 15,
        cooldown: 180,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      bonus_stats.intellect = runGenericOnUseTrinket(data[0], itemLevel, additionalData.castModel) * data[0].efficiency;
      bonus_stats.crit = -1 * runGenericOnUseTrinket(data[1], itemLevel, additionalData.castModel)* data[0].efficiency;

      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                    Time Breaching Talon                                        */
    /* ---------------------------------------------------------------------------------------------- */
    // 
    name: "Time-Breaching Talon",
    effects: [
      { // +Int Portion
        coefficient: 3.477437, 
        table: -7,
        duration: 15,
        cooldown: 150,
        efficiency: 1,
      },
      { // -Int portion
        coefficient: 1.391347, 
        table: -7,
        duration: 15,
        cooldown: 150,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};
      

      if (additionalData.player.getSpec() === "Discipline Priest") {
        // This is a naive implementation and should be updated.
          const buffValue = processedValue(data[0], itemLevel);
          bonus_stats.hps = runDiscOnUseTrinket("Time-Breaching Talon", buffValue, additionalData.setStats, additionalData.castModel, additionalData.player);
          bonus_stats.intellect = -1 * runGenericOnUseTrinket(data[1], itemLevel, additionalData.castModel);
      }
      else {
        bonus_stats.intellect = runGenericOnUseTrinket(data[0], itemLevel, additionalData.castModel) * data[0].efficiency;
        bonus_stats.intellect -= runGenericOnUseTrinket(data[1], itemLevel, additionalData.castModel);
      }


      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                       Irideus Fragment                                         */
    /* ---------------------------------------------------------------------------------------------- */
    // This is technically a party buff but because it comes with downside, that portion isn't currently included.
    name: "Irideus Fragment",
    effects: [
      { // +Int Portion
        coefficient: 0.214403, 
        table: -1,
        duration: 20,
        cooldown: 180,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};
      const averageStacks = 20 / 2;

      bonus_stats.intellect = processedValue(data[0], itemLevel) * averageStacks * 20 / data[0].cooldown * (additionalData.castModel.getSpecialQuery("c" + data[0].cooldown, "cooldownMult") || 1);

      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                     Miniature Singing Stone                                      */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
   // Singing Stone hits 1 target, and then bounces to a new target when it expires or when it's consumed.
   // Each bounce is at full strength and it'll bounce four times total for 5 absorbs.
    name: "Miniature Singing Stone",
    effects: [
      { 
        coefficient: 89.95994, 
        table: -9,
        secondaries: ['versatility'],
        cooldown: 120,
        mult: 5, 
        efficiency: {Raid: 0.62, Dungeon: 0.45} //
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      bonus_stats.hps = processedValue(data[0], itemLevel, data[0].mult * data[0].efficiency[additionalData.contentType], "round") * player.getStatMults(data[0].secondaries) / data[0].cooldown;
      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                  Flask of the Solemn Night                                     */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "Flask of the Solemn Night",
    effects: [
      {
        coefficient: 0.186258,
        table: -7,
        duration: 10,
        efficiency: {"Preservation Evoker": 0.5, "Restoration Druid": 0.8, "Holy Paladin": 0.67, "Mistweaver Monk": 0.7, "Restoration Shaman": 0.65, "Holy Priest": 0.7, "Discipline Priest": 0.7},
        stacks: 15, // You start with 20, lose 1 every second and end with 10 for an average of 15.
        ppm: 1,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      // trinketRaw represents a single stack of the buff.
      const trinketRaw = processedValue(data[0], itemLevel)
      let trinketSum = 0
      // Add raw values for stacks 10 through 19.
      for (var i = 10; i <= 19; i++) {
        // We're going to adjust each stack individually for diminishing returns. 
        // The more stacks we have, the harder we'll be hit.
        let adjVal = getDiminishedValue('Haste', trinketRaw * i, additionalData.setStats.haste)
        trinketSum += adjVal
      }
    
      // Take an average of our stacks. Note that the trinket decreases from 19 to 10, NOT to 0.
      bonus_stats.haste = (trinketSum / 10) * convertPPMToUptime(data[0].ppm, data[0].duration) * data[0].efficiency[player.spec];

      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                    Mote of Sanctification                                      */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "Mote of Sanctification",
    effects: [
      { 
        coefficient: 180.9063, 
        table: -8,
        secondaries: ['versatility', 'crit'],
        cooldown: 90,
        efficiency: {Raid: 0.65, Dungeon: 0.85}, //
        targets: 5,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      bonus_stats.hps = processedValue(data[0], itemLevel, data[0].efficiency[additionalData.contentType]) * data[0].targets / data[0].cooldown * player.getStatMults(data[0].secondaries);

      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                         Horn of Valor                                          */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "Horn of Valor",
    effects: [
      { 
        coefficient: 1.334434,
        table: -1,
        stat: "intellect",
        duration: 30,
        cooldown: 120,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};
      bonus_stats.intellect = runGenericOnUseTrinket(data[0], itemLevel, additionalData.castModel);
      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                 Voidmender's Shadowgem                                         */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "Voidmender's Shadowgem",
    effects: [
      { 
        coefficient: 1.92032,
        table: -7,
        stat: "crit",
        duration: 15,
        cooldown: 120,
      },
      { // This is the crit bonus effect. It's on a 20ppm.
        coefficient: 0.240273,
        table: -7,
        ppm: 20,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};


      const critPerStack = processedValue(data[1], itemLevel)
      const effectiveCrit = processedValue(data[0], itemLevel) + critPerStack * (data[1].ppm * (data[0].duration / 60)/2)

      if (additionalData.player.getSpec() === "Discipline Priest") {

        bonus_stats.hps = runDiscOnUseTrinket("Voidmender's Shadowgem", effectiveCrit, additionalData.setStats, additionalData.castModel, additionalData.player)
      }
      else {
        bonus_stats.crit = effectiveCrit * data[0].duration / data[0].cooldown * (additionalData.castModel.getSpecialQuery("c90", "cooldownMult") || 1); 
      }
      

      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                 Erupting Spear Fragment                                        */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "Erupting Spear Fragment",
    effects: [
      { 
        coefficient: 0.540148,
        table: -7,
        stat: "crit",
        duration: 10,
        cooldown: 90,
      },
      { // This is the damage bonus effect. TODO.
        coefficient: 0.240273,
        table: -7,
        ppm: 20,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};
      const enemyTargets = additionalData.contentType === "Dungeon" ? 5 : 1;

      bonus_stats.crit = runGenericOnUseTrinket(data[0], itemLevel, additionalData.castModel) * enemyTargets;

      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                   Spoils of Neltharus                                          */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "Spoils of Neltharus",
    effects: [
      { 
        coefficient: 2.521002,
        table: -7,
        stat: "N/A",
        duration: 20,
        cooldown: 120,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};
      const averageStatGain = runGenericOnUseTrinket(data[0], itemLevel, additionalData.castModel)
      bonus_stats.haste = averageStatGain / 4;
      bonus_stats.crit = averageStatGain / 4;
      bonus_stats.mastery = averageStatGain / 4;
      bonus_stats.versatility = averageStatGain / 4;

      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                          Infernal Writ                                         */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "Infernal Writ",
    effects: [
      { // Mastery portion
        coefficient: 0.149006,
        table: -7,
        duration: 20,
        ppm: { "Restoration Druid": 0.5, "Preservation Evoker": 0.7, "Discipline Priest": 1, "Holy Paladin": 0, "Mistweaver Monk": 0, "Restoration Shaman": 0.4, "Holy Priest": 0.4 }, // Baseline: 0.7
        averageStacks: 10.5,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};
      bonus_stats.crit = processedValue(data[0], itemLevel) * convertPPMToUptime(data[0].ppm[player.getSpec()], data[0].duration) * data[0].averageStacks;
      return bonus_stats;
    }
  },



]; // End

/* ------------------------------------------- Unused ------------------------------------------- */
// export const TAGS = {
//   It should be noted that this is longer used anywhere, and were part of a different trinket draft.
//   ON_USE: "on-use",
//   MULTIPLIER: "multiplier",
//   DURATION: "duration",
//   PPM: "ppm",
//   HASTED_PPM: "hasted-ppm",
//   DURATION_BASED: "duration-based",
//   METEOR: "meteor", // The meteor effect increases a trinkets value by X based on targets hit up to Y. X should be represented as 'multiplier' and Y as the 'cap'.
//   TICKS: "ticks",
// };
