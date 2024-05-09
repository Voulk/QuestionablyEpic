import { convertPPMToUptime, getSetting, processedValue, runGenericPPMTrinket, runGenericFlatProc, getDiminishedValue, runGenericOnUseTrinket } from "../../EffectUtilities";
import { setBounds } from "General/Engine/CONSTRAINTS"

// Note that raid trinket data is stored here. For other trinket data, see the dungeon, timewalking and other trinket data files.
export const raidTrinketData = [
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                     Ashes of the Embersoul                                 */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "Ashes of the Embersoul",
    effects: [
      { // 
        coefficient: 4.106037 / 2, // Average. This is not integrated into any cast sequences currently but could be.  
        table: -1,
        cooldown: 120,
        duration: 20,
      },
      { // 
        coefficient: -0.500103, 
        table: -7,
        duration: 60,
        cooldown: 120,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      bonus_stats.intellect = runGenericOnUseTrinket(data[0], itemLevel, additionalData.castModel);
      
      bonus_stats.haste = processedValue(data[1], itemLevel) * data[1].duration / data[1].cooldown;
      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                     Nymue's Unraveling Spindle                                 */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "Nymue's Unraveling Spindle",
    effects: [
      { // 
        coefficient: 259.8929, 
        table: -9,
        cooldown: 120,
        ticks: 6,
      },
      { // Mastery benefit
        coefficient: 2.263035, 
        table: -7,
        duration: 18,
        cooldown: 120,
        stacks: 6,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      //bonus_stats.dps = processedValue(data[0], itemLevel) / data[0].cooldown;

      bonus_stats.mastery = runGenericOnUseTrinket(data[1], itemLevel, additionalData.castModel) * data[1].stacks / data[1].cooldown;

      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                  Smoldering Treant Seedling                                */
    /* ---------------------------------------------------------------------------------------------- */
    /* Seedlings calculation is better explained further below but this is a more difficult trinket to model than most.
    /* 
    */
    name: "Smoldering Seedling",
    effects: [
      { // 
        coefficient: 534.5043 * 1.05, 
        table: -9,
        duration: 12,
        cooldown: 120,
        targetScaling: 1, // While healing is multiplied by 1.5x, the additional healing offered is constant.
        efficiency: {Raid: 0.75, Dungeon: 0.38}, // The tree does pulse smart healing but it's also very inefficient to pushing healing into a tree instead of the raid.
        specEfficiency: { "Restoration Druid": 0, "Holy Paladin": 0.07, "Holy Priest": 0.07, "Discipline Priest": 0, "Mistweaver Monk": 0.32, 
                          "Restoration Shaman": 0, "Preservation Evoker": 0 }, // This is the difference in spell efficiency. It does not apply to the bonus healing.
      },
      { // Mastery benefit. This is short and not all that useful.
        coefficient: 0.518729, 
        table: -7,
        duration: 10,
        cooldown: 120,
      },
      { // Appears unused.
        coefficient: 617.6665, 
        table: -1,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      // If seedling can grant X bonus healing, and we heal it for X / 2.5 then we get the full bonus value. 
      // Note that this isn't a great investment in itself but it's a good baseline for the trinket.
      const bonusValue = processedValue(data[0], itemLevel, data[0].efficiency[additionalData.contentType])
      bonus_stats.hps = bonusValue / data[0].cooldown;

      // The other, often more significant amount of Seedlings value is in the efficiency increase you can get from turning your single target healing
      // into AoE smart healing. This is very difficult to estimate, since in most cases swapping to a single target rotation is a healing loss 
      // compared to spending those GCDs on regular AoE healing. The only specs with a clear niche here are:
      // - Mistweaver: who has an ultra efficient single target healing rotation.
      // - Holy Priest with Guardian Spirit: Fine on HPS but a difficult trade on progression.
      // Note here that the real gain is the efficiency increase from reducing the overhealing on your ST rotation, NOT all healing the Seedling radiates.
      const expectedSingleTargetHPS = player.getHPS(additionalData.contentType) * data[0].specEfficiency[player.spec] * data[0].duration / data[0].cooldown;
      bonus_stats.hps += expectedSingleTargetHPS;

      //bonus_stats.hps = processedValue(data[0], itemLevel, data[0].efficiency[additionalData.contentType]) / data[0].cooldown * data[0].targetScaling
      //                    * data[0].specEfficiency[player.spec];

      // The mastery portion is a bit of a meme but it still adds a little value.
      bonus_stats.mastery = processedValue(data[1], itemLevel) * data[1].duration / data[1].cooldown;

      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                  Pip's Emerald Friendship Badge                                */
    /* ---------------------------------------------------------------------------------------------- */
    /* Not final. 
    */
    name: "Pip's Emerald Friendship Badge",
    effects: [
      { //
        coefficient: 2.328225, // This is the coefficient of the passive value.
        table: -7,
        duration: 12,
        ppm: 2,
        uptime: 0.328986,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      ['crit', 'versatility', 'mastery'].forEach(stat => {
        const passiveValue = processedValue(data[0], itemLevel) / 12;

        // Passive stat bonus
        bonus_stats[stat] = passiveValue * (1 - data[0].uptime) / 3;

        // Active bonus. The code here is a little long since we need to check for diminishing returns at every stack count.
        // The earlier into the proc we are, the more we lose to diminishing returns.
        let trinketSum = 0
        const setStat = additionalData.setStats ? additionalData.setStats[stat] || 0 : 0
        // Add raw values for stacks 1 through 12.
        for (var i = 1; i <= 12; i++) {
          let adjVal = getDiminishedValue(stat, passiveValue * i, setStat)
          trinketSum += adjVal
        }
        bonus_stats[stat] = bonus_stats[stat] + trinketSum / 12 * data[0].uptime / 3;

      });


      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                      Blossom of Amirdrrassil                                   */
    /* ---------------------------------------------------------------------------------------------- */
    /* Check crit / haste scaling. Check if HoT coefficients are one tick or full heal split into ticks.
    */
    name: "Blossom of Amirdrassil",
    effects: [
      {  // HoT effect
        coefficient: 44.99676, // 40.9063, // This is probably 1 HoT tick.
        table: -9,
        secondaries: ['versatility', 'crit'], // Crit added post-release.
        efficiency: {Raid: 0.5, Dungeon: 0.4}, 
        ppm: 60/65, // 1 min hard CD. ~5s to heal someone below 85%.
        ticks: 6,
      },
      {  // Spread HoT effect
        coefficient: 22.49753, // 20.45229, // 46.75641,
        table: -9,
        targets: 3, // 
        secondaries: ['versatility', 'crit'],
        efficiency: {Raid: 0.46, Dungeon: 0.4}, 
        percentProc: 0.82,
        ticks: 6,
      },
      {  // Shield effect
        coefficient: 404.9657, // 368.1498,
        table: -9,
        secondaries: ['versatility'],
        efficiency: {Raid: 0.93, Dungeon: 0.8}, // This is an absorb so you won't lose much value.
        percentProc: 0.18,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      bonus_stats.hps = processedValue(data[0], itemLevel, data[0].efficiency[additionalData.contentType]) * data[0].ticks * player.getStatMults(data[0].secondaries);
      bonus_stats.hps += processedValue(data[1], itemLevel, data[1].efficiency[additionalData.contentType]) * data[1].percentProc * data[1].targets * data[0].ticks * player.getStatMults(data[0].secondaries);
      bonus_stats.hps += processedValue(data[2], itemLevel, data[2].efficiency[additionalData.contentType]) * data[2].percentProc;

      bonus_stats.hps = bonus_stats.hps * data[0].ppm / 60;

      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                  Neltharion's Call to Suffering                                */
    /* ---------------------------------------------------------------------------------------------- */
    /* Now fixed and procs off HoTs.
    */
    name: "Neltharion's Call to Suffering",
    effects: [
      { // Int portion
        coefficient: 2.637718 * 1.05, //2.901138,
        table: -1,
        stat: "intellect",
        duration: 12,
        ppm: 1 * 0.8, // Call to Suffering is high variance, and also just procs a bit less than expected. 
      },
      { // Self-damage portion
        coefficient: -16.71962,
        table: -8,
        ticks: 6,
        ppm: 1 * 0.8,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      bonus_stats.intellect = runGenericPPMTrinket(data[0], itemLevel);
      bonus_stats.hps = runGenericFlatProc(data[1], itemLevel, player);
      //if (player.spec === "Restoration Druid" || player.spec === "Holy Priest") bonus_stats.intellect *= 0.25;

      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                     Neltharion's Call to Dominance                                 */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "Neltharion's Call to Dominance",
    effects: [
      { // Int portion
        coefficient: 0.442388 * 0.85,
        table: -1,
        stat: "intellect",
        duration: 20,
        ppm: 3,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      const averageIntellect = processedValue(data[0], itemLevel) * data[0].ppm;
      const effect = data[0];
      bonus_stats.intellect = averageIntellect * effect.duration / 60 * (additionalData.castModel.getSpecialQuery("c60", "cooldownMult") || 1);

      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                     Neltharion's Call to Chaos                                 */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "Neltharion's Call to Chaos",
    effects: [
      { // Int portion
        coefficient: 1.844795 * 1.1 * 0.936,
        table: -1,
        stat: "intellect",
        duration: 18,
        classMod: {"Preservation Evoker": 1, "Holy Paladin": 1},
        ppm: 1 * 0.7, // Ultimately neither spec generates enough AoE events to get close to the advertised PPM.
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      bonus_stats.intellect = runGenericPPMTrinket(data[0], itemLevel) * (data[0].classMod[player.spec] || 0.5);
      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                         Ward of Faceless Ire                                   */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "Ward of Faceless Ire",
    effects: [
      {  // Heal effect
        coefficient: 240.4646, // 371.7325,
        table: -9,
        secondaries: ['versatility'],
        efficiency: {Raid: 0.62, Dungeon: 0.74}, // This is an absorb so you won't lose much value but it's really hard to find good uses for it on a 2 min cadence.
        cooldown: 60, 
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      bonus_stats.hps = processedValue(data[0], itemLevel, data[0].efficiency[additionalData.contentType]) * player.getStatMults(data[0].secondaries) / data[0].cooldown;

      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                    Rashok's Molten Heart                                       */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    -- Spells that can proc it (incomplete list) --
    Evoker: 
    - Emerald Blossom
    - Time Spiral

    */
    name: "Rashok's Molten Heart",
    effects: [
      { // Mana Portion
        coefficient: 0.133174,
        table: -7,
        ppm: 2,
        ticks: 10,
        secondaries: []
      },
      { // Heal over time portion.
        coefficient: 2.221365, //4.441092, //3.86182,
        table: -9, 
        targets: {"Raid": 7.5, "Dungeon": 5},
        efficiency: 0.5,
        ticks: 10,
        secondaries: ["versatility"], 
      },
      { // Gifted Versatility portion
        coefficient: 0.347837, // 0.386485, //0.483271,
        table: -7, 
        targets: {"Raid": 7.5, "Dungeon": 5}, // Average. The maximum is 10. 
        duration: 12,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      // This can probably be rewritten in a much easier way now that it doesn't have weird haste scaling.
      const BLP = 1; //1.13;
      const effectivePPM = data[0].ppm * BLP;
      let bonus_stats = {};
      const contentType = additionalData.contentType || "Raid";
      //if (additionalData.settings.includeGroupBenefits) bonus_stats.allyStats = processedValue(data[0], itemLevel, versBoost);
      // Healing Portion
      let oneHoT = processedValue(data[1], itemLevel, data[1].efficiency) * player.getStatMults(data[1].secondaries) * data[1].ticks;
      bonus_stats.hps = oneHoT * data[1].targets[contentType] * data[0].ppm / 60 * BLP;

      // Mana Portion
      bonus_stats.mana = processedValue(data[0], itemLevel) * data[1].ticks * data[0].ppm / 60 * BLP;

      // Versatility Portion
      const versEfficiency = 1 - data[1].efficiency; // The strength of the vers portion is inverse to the strength of the HoT portion.

      if (additionalData.settings.includeGroupBenefits) bonus_stats.allyStats = processedValue(data[2], itemLevel) * versEfficiency * effectivePPM * data[2].targets[contentType] * data[2].duration / 60;

      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                  Screaming Black Dragonscale                                   */
    /* ---------------------------------------------------------------------------------------------- */
    /* This has an awkward 15s internal cooldown which makes modelling expected uptime much more annoying.
    // This is an annoying PPM + ICD based trinket and so we're actually going to simulate the uptime outside of the app and use that fixed value 
    // instead of calculating it here since simulating it each time would be much slower and still end on the same result.
    */
    name: "Screaming Black Dragonscale",
    effects: [
      { // Crit Portion
        coefficient: 0.919472, //0.815295, //0.906145,
        table: -7,
        stat: "crit",
        duration: 15,
        ppm: 3,
        expectedUptime: 0.475,
      },
      { // Leech Portion
        coefficient: 0.256105,
        table: -7,
        stat: "leech",
        duration: 15,
        ppm: 3,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      
      //bonus_stats.crit = runGenericPPMTrinket(data[0], itemLevel);
      //bonus_stats.leech = runGenericPPMTrinket(data[1], itemLevel);

      bonus_stats.crit = processedValue(data[0], itemLevel) * data[0].expectedUptime;
      bonus_stats.leech = processedValue(data[1], itemLevel) * data[0].expectedUptime;

      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                Ominous Chromatic Essence                                       */
    /* ---------------------------------------------------------------------------------------------- */
    name: "Ominous Chromatic Essence",
    effects: [
      { // 100% uptime.
        coefficient: 0.434074, // 0.456332, //0.4861,
        table: -7,
      },
      { // This is for the proc if you have Earth and Frost in party.
        coefficient: 0.046006, //0.054011,
        table: -7,
        num: 3,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      // Versatility Portion
      let bonus_stats = {haste: 0, crit: 0, mastery: 0, versatility: 0};
      const buffSetting = getSetting(additionalData.settings, "chromaticEssenceBuff");
      const includeAllies = getSetting(additionalData.settings, "chromaticEssenceAllies");
      let primaryBuff = (buffSetting === "Automatic" ? player.getHighestStatWeight(additionalData.contentType) : buffSetting).toLowerCase();
      const primaryValue = processedValue(data[0], itemLevel);
      const secondaryValue = includeAllies ? processedValue(data[1], itemLevel) : 0;

      // Buffs from allies

      ["haste", "versatility", "crit", "mastery", "quad buff"].forEach(stat => {
        if (stat === "quad buff") {
          if (primaryBuff === "quad buff") {
            bonus_stats["haste"] += primaryValue / 4;
            bonus_stats["crit"] += primaryValue / 4;
            bonus_stats["versatility"] += primaryValue / 4;
            bonus_stats["mastery"] += primaryValue / 4;
          }
          else {
            bonus_stats["haste"] += secondaryValue / 4;
            bonus_stats["crit"] += secondaryValue / 4;
            bonus_stats["versatility"] += secondaryValue / 4;
            bonus_stats["mastery"] += secondaryValue / 4;
          }
        }
        else {
          if (stat === primaryBuff) bonus_stats[stat] += primaryValue;
          else bonus_stats[stat] += secondaryValue;
        }
        
      });
      return bonus_stats;
    }
  },
  // ========= Season 1 Trinkets =========
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                    Broodkeeper's Promise                                       */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "Broodkeeper's Promise",
    effects: [
      { // Versatility Portion. 100% uptime.
        coefficient: 0.096854 * 0.8,
        table: -7,
        stat: "versatility",
        percentBoosted: 0.7,
        boostValue: 1.5,
      },
      { // Heal over time portion. Remember this is on both yourself and your bonded target.
        coefficient: 1.983667 * 0.6,
        table: -9, 
        percentBoosted: 0.7,
        boostValue: 2.33,
        efficiency: 0.7,
        secondaries: ["versatility"], // Currently cannot Crit and doesn't scale with Haste.
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      // Versatility Portion
      let bonus_stats = {};
      let percentBoosted = data[0].percentBoosted;
      if (additionalData.settings.broodkeeperCloseTime) percentBoosted = setBounds(getSetting(additionalData.settings, "broodkeeperCloseTime") / 100, 0, 1);

      const versBoost = percentBoosted * data[0].boostValue + (1-percentBoosted)
      bonus_stats.versatility = processedValue(data[0], itemLevel, versBoost);

      if (additionalData.settings.includeGroupBenefits) bonus_stats.allyStats = processedValue(data[0], itemLevel, versBoost);

      // Healing Portion
      let healing = processedValue(data[1], itemLevel) * player.getStatMults(data[1].secondaries) * 2;
      bonus_stats.hps = healing * data[1].efficiency * ( percentBoosted * data[1].boostValue + (1-percentBoosted));

      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                    Conjured Chillglobe                                         */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "Conjured Chillglobe",
    effects: [
      { // Damage portion
        coefficient: 133.4993,
        table: -9,
        percentUsed: 0.3,
        cooldown: 60,
        secondaries: ["crit", "versatility"],
      },
      { // Mana portion
        coefficient: 4.92373, // 9.0419, //30.13977,
        table: -7, 
        percentUsed: 0.7,
        cooldown: 60,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      // Damage Portion
      bonus_stats.dps = processedValue(data[0], itemLevel, data[0].percentUsed) * player.getStatMults(data[0].secondaries) / data[0].cooldown;

      // Mana Portion
      bonus_stats.mana = processedValue(data[1], itemLevel, data[1].percentUsed) / data[1].cooldown;

      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                Whispering Incarnate Icon                                       */
    /* ---------------------------------------------------------------------------------------------- */
    /*  DPS: Frost
        Healer: Fire
        Tank: Earth
        Possible group-only requirement.
        If you have both Frost & Fire in group then you'll get both buffs when it procs. It's based on what you do and does proc off healing.
    */
    name: "Whispering Incarnate Icon",
    effects: [
      { // 100% uptime. Probably add a setting for the rest?
        coefficient: 0.500103, //0.599658,
        table: -7,
      },
      { // This is for the proc if you have Earth and Frost in party.
        coefficient: 0.137528, // 0.250517,
        table: -7,
        ppm: 2,
        duration: 12,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      // Versatility Portion
      let bonus_stats = {};
      bonus_stats.haste = processedValue(data[0], itemLevel);

      // Ally buff
      let sharedBuff = runGenericPPMTrinket(data[1], itemLevel);
      // Incarnate Allies has been removed as a setting and now defaults to own only.
      const iconSetting = getSetting(additionalData.settings, "incarnateAllies")

      // Check if buffs are active and if they are, add them to bonus stats.
      if (iconSetting === "Tank") bonus_stats.versatility = sharedBuff;
      else if (iconSetting === "DPS") bonus_stats.crit = sharedBuff;
      else if (iconSetting === "Tank + DPS")  {
        bonus_stats.crit = sharedBuff;
        bonus_stats.versatility = sharedBuff;
      }     
      
      return bonus_stats;
    }
  },

];

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
