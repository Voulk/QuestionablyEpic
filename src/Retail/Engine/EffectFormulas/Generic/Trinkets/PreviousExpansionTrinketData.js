import { convertPPMToUptime, getSetting, processedValue, runGenericPPMTrinket, runGenericFlatProc, getDiminishedValue, runGenericOnUseTrinket } from "../../EffectUtilities";
import { setBounds } from "General/Engine/CONSTRAINTS"

// Note that raid trinket data is stored here. For other trinket data, see the dungeon, timewalking and other trinket data files.
export const raidTrinketData = [
  // -- THE WAR WITHIN TRINKET DATA --
      {  
    id: 242392,
    name: "Diamantine Voidcore",
    description: "The ranking on the chart does not include the set, however top gear will take both into account.",
    addonDescription: "A decent on-use that truly shines when combined with a special effect weapon from raid to complete the set.",
    effects: [
      {
        coefficient: 0.699867, 
        table: -1,
        duration: 15,
        ppm: 2.5 * (0.25 * 1.25 + 0.75),
        stat: "intellect",
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      bonus_stats.intellect = processedValue(data[0], itemLevel) * data[0].ppm * data[0].duration / 60; // These stacks can overlap so there should be no proc munching.

      return bonus_stats;
    }
  },
  {  // Heartbeat flag??
    name: "Astral Antenna",
    description: "Requires you pick up balls that'll float toward you. Assumes 100% pick up rate since they are quite hard to miss.",
    setting: true,
    addonDescription: "Requires you pick up balls that'll float toward you. They are quite hard to miss and you shouldn't need to play around them.",
    effects: [
      {
        coefficient: 1.511713 * 0.97, 
        table: -7,
        duration: 10,
        ppm: 2.5,
        stat: "crit",
        canOverlap: true,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      //bonus_stats.crit = getDiminishedValue(data[0].stat, processedValue(data[0], itemLevel), additionalData.setStats['crit'])* data[0].ppm * data[0].duration / 60 * 0.95; // These stacks can overlap so there should be no proc munching.
      const ballPickupRate = Math.min(100, getSetting(additionalData.settings, "antennaPickupRate") / 100, 1);
      bonus_stats.crit = runGenericPPMOverlapTrinket(data[0], itemLevel, additionalData.setStats) * ballPickupRate;

      return bonus_stats;
    }
  },
      { // 
    name: "Loom'ithar's Living Silk",
    description: "Average on HPS but invaluable utility in Mythic+.",
    effects: [
      { // Shield proc
        coefficient: 479.0941,
        table: -8,
        secondaries: ['versatility'],
        targets: 5,
        efficiency: {Raid: 0.75, Dungeon: 0.94}, // While absorbs are often consumed well in raid, this has quite heavy general usage problems.
        cooldown: 90,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      bonus_stats.hps = runGenericFlatProc(data[0], itemLevel, player, additionalData.contentType);

      return bonus_stats;
    }
  },
    { 
    name: "Araz's Ritual Forge",
    description: "The health penalty is temporary and you can heal it back. Decent if you have powerful 2 minute cooldowns.",
    effects: [
      {
        coefficient: 2.461964,
        table: -1,
        duration: 30,
        //multiplier: 0.725, // Assumes boss is around 50% health.
        cooldown: 120,
        stat: "intellect",
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      bonus_stats.intellect = runGenericOnUseTrinket(data[0], itemLevel, additionalData.castModel) / 2;

      return bonus_stats;
    }
  },



  // Undermine
  { // Stacking mastery buff that turns into a healing buff when you reach full stacks.
    name: "Eye of Kezan",
    description: "Takes 2 minutes to be good and 3.5 to reach maximum power. Ignore the healing proc - it's not a significant part of the trinkets power. Weaker if fight duration is short or if damage is frontloaded.",
    effects: [
      { 
        coefficient: 0.045686 * 0.95 * 0.9, 
        table: -1,
        ppm: 5,
        maxStacks: 20,
        stat: "mastery",
      },
      { 
        coefficient: 13.85549, 
        table: -9,
        duration: 0, 
        ppm: 5,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      const fightLength = additionalData.castModel.fightInfo.fightLength;
      const timeToMax = data[0].maxStacks / data[0].ppm * 60;
      const timeMaxed = fightLength - timeToMax;

      let averageStackCount = (data[0].maxStacks * timeMaxed) / fightLength + (timeToMax * data[0].maxStacks / 2) / fightLength;
      if (additionalData.contentType === "Dungeon") averageStackCount *= 0.74; // This has potential in M+ so lets revisit it with logs.

      bonus_stats.intellect = processedValue(data[0], itemLevel) * averageStackCount;
      bonus_stats.hps = runGenericFlatProc(data[1], itemLevel, player, additionalData.contentType) * (timeMaxed / fightLength);
      // TODO: Shared DPS proc.

      return bonus_stats;
    }
  },
  { // On-use heal effect. Number of targets scales with haste. TODO: Check Haste scaling.
    name: "Gallagio Bottle Service",
    description: "Requires channeling for 4 seconds. Every 10% haste you get gives you +1 drink (rounded up). Slightly undertuned for a trinket with quite a few downsides.",
    setting: true,
    effects: [
      {  // Heal effect but used in different ways.
        coefficient: 187.105, 
        table: -8,
        secondaries: ['versatility', 'crit'], // Crit TODO
        targets: 10, // 
        efficiency: {Raid: 0.8, Dungeon: 0.8},
        specPenalty: {"Holy Priest": 2.25, "Restoration Druid": 3.2, "Mistweaver Monk": 3, "Restoration Shaman": 2, "Discipline Priest": 2.5,
                       "Holy Paladin": 2, "Preservation Evoker": 1.4},
        holyMasteryFlag: true,
        cooldown: 90,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      const newData = {...data[0], targets: data[0].targets * (1 + Math.ceil((player.getStatMults(['haste'])-1)*10)/10)};
      const penalty = player.getHPS() * data[0].specPenalty[player.spec] / data[0].cooldown; 
      bonus_stats.hps = runGenericFlatProc(newData, itemLevel, player, additionalData.contentType, additionalData.setStats) - penalty;

      return bonus_stats;
    }
  },
  { // 1:30 cooldown mastery on-use. 
    name: "House of Cards",
    description: "Good if your spec has powerful 90s cooldowns like Preservation Evoker and Disc Priest but a higher ilvl Lily of the Eternal Weave is better in Season 3.",
    effects: [
      {
        coefficient: 2.736594 * 0.9, 
        table: -7,
        duration: 15, 
        cooldown: 90,
        mult: (0.966 + 1.15) / 2
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      const variance = data[0].mult; // House of Cards variance is -10% to +15%. Every time you use the trinket the floor by 3.3% up to 3 times, which we'll average at 2.

      if (additionalData.castModel.modelName.includes("Oracle")) {
        bonus_stats.hps = additionalData.castModel.modelOnUseTrinket(additionalData.setStats, "House of Cards", itemLevel) * 0.7; // Expected additional overhealing.
      }
      else if ((player.spec === "Holy Priest" || player.spec === "Restoration Druid" || player.spec === "Mistweaver Monk") && getSetting(additionalData.settings, "delayOnUseTrinkets")) bonus_stats.mastery = forceGenericOnUseTrinket(data[0], itemLevel, additionalData.castModel, 120) * variance;
      else bonus_stats.mastery = runGenericOnUseTrinket(data[0], itemLevel, additionalData.castModel) * variance;

      return bonus_stats;
    }
  },
  { // Crit proc trinket. Spells cast while crit buff is up increase the crit.
    name: "Mug's Moxie Jug",
    description: "Heavily overbudget crit trinket. Procs off several things that aren't spell casts which increases your average stack count by a lot.",
    effects: [
      {
        coefficient: 0.276886 * 0.9, 
        averageStacks: 1 + 15 / (1.5 / 1.2) / 2, // TODO
        table: -7,
        duration: 15, 
        ppm: 2,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      // We should just hook average stacks into cast models.
      // Uptime on this looks way worse than 2ppm would suggest.
      bonus_stats.crit = runGenericPPMTrinket(data[0], itemLevel) * data[0].averageStacks * 0.8; // Worse than expected uptime on PTR, recheck.
      if (player.spec === "Preservation Evoker") bonus_stats.crit *= 0.7;
      if (player.spec === "Mistweaver Monk") bonus_stats.crit *= 1.2; // RJW procs, greatly upping stack count.

      //bonus_stats.haste = processedValue(data[0], itemLevel) * averageStackCount;

      return bonus_stats;
    }
  },
  { // 
    name: "Reverb Radio",
    description: "It's a fine stat stick, you just really need to be able to take advantage of the big haste proc which won't always line up with incoming damage.",
    effects: [
      {
        coefficient: 0.117104, 
        table: -7,
        duration: 15, 
        ppm: 5,
        stat: "haste",
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};
      const value = processedValue(data[0], itemLevel);

      // Giga Buff
      const uptime = data[0].duration / (75);
      bonus_stats.haste = uptime * value * 10;

      const averageStackCount = 2;
      bonus_stats.haste += processedValue(data[0], itemLevel) * averageStackCount;
      //bonus_stats.haste = processedValue(data[0], itemLevel) * averageStackCount;

      return bonus_stats;
    }
  },
  { // Coagulum at home
    name: "Mister Pick-Me-Up",
    description: "A strong flat healing trinket with low overhealing. In Mythic+ the trinket heals for less but does absurb amounts of damage - particularly in groups with pets. Default overhealing: 15%.",
    setting: true,
    effects: [
      {  // Heal effect
        coefficient: 9.28509 * 0.85, //10.31673, 
        table: -9,
        secondaries: ['versatility', 'crit', 'haste'], // Secondaries confirmed.
        targets: 5 * 3, // Lasts 6 seconds and heals 5 people per tick.
        efficiency: {Raid: 0.8, Dungeon: 0.55},
        ppm: 2.5, // Incorrect flagging. Needs to be double checked.
        holyMasteryFlag: true,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};
      const efficiency = 1 - (getSetting(additionalData.settings, "misterPickMeUpOverheal") / 100 || 0);
      const newData = {...data[0], efficiency: efficiency};

      bonus_stats.hps = runGenericFlatProc(newData, itemLevel, player, additionalData.contentType, additionalData.setStats);
      bonus_stats.dps = 0;

      return bonus_stats;
    }
  },

    { // While the buffs appear in the same stack, they are individual buffs. This does mean it's impossible to lose any value if you get an int proc while you already have one.
        name: "Gruesome Syringe",
        description: "The problem with Gruesome Syringe is that the backup prize of an int proc if nobody drops low is much stronger than the heal proc but you're unlikely to get the int when you need it.",
        setting: true,
        effects: [
          {  // Heal effect
            coefficient: 94.21494, 
            table: -8,
            secondaries: ['versatility', 'crit'], // Crit?
            ppm: 6,
            percentProcced: 0.9,
            efficiency: {Raid: 0.95, Dungeon: 0.95}, // This procs on lower health targets, so efficiency should be very high.
          },
          {  // Intellect effect
            coefficient: 0.755798,
            table: -1,
            duration: 10,
          },
        ],
        runFunc: function(data, player, itemLevel, additionalData) {
          let bonus_stats = {};

          const percentHealProc = 0.9 // getSetting(additionalData.settings, "syringeHealProcs") / 100;
          
          bonus_stats.hps = runGenericFlatProc(data[0], itemLevel, player, additionalData.contentType) * percentHealProc;
          bonus_stats.intellect = processedValue(data[1], itemLevel) * data[1].duration * data[0].ppm * 1.13 * (1 - percentHealProc) / 60;
    
          return bonus_stats;
        }
      },
      { 
        // Actually absorbs 20% of your healing done until it reaches the cap.
        // Bursts immediately upon reaching it. 
        // Targeting TBA but won't hit full health players.
        name: "Creeping Coagulum",
        description: "Does reduce your healing done until it bursts but it's still fairly strong. DPS value is based on the raw overhealing done by the trinket, not the overhealing percentage.",
        setting: true,
        effects: [
          {  // Heal effect but used in different ways.
            coefficient: 468.2967, 
            table: -9,
            secondaries: ['versatility', 'crit'], // Crit confirmed.
            targets: 5, 
            cooldown: 90,
          },
          {  // The damage portion.
            coefficient: 3.335683,
            table: -9,
          },
        ],
        runFunc: function(data, player, itemLevel, additionalData) {
          let bonus_stats = {};
          const s1 = processedValue(data[0], itemLevel)
          const efficiency = 1 - getSetting(additionalData.settings, "creepingCoagOverheal") / 100 - (additionalData.contentType === "Dungeon" ? 0.15 : 0);
          const healingConsumed = s1 * 40 / 100;
          const healingDealt = (s1 + (s1 * 40 * 0.01*(1 + 3 / 100)))/5;

          bonus_stats.hps = (healingDealt * data[0].targets * efficiency * player.getStatMults(data[0].secondaries) - healingConsumed) / data[0].cooldown;


          // Damage portion bugged beyond belief. Not implementing yet as a result.
    
          return bonus_stats;
        }
      },
      { 
        // Possible conditions to get the buff:
        // -- Jump 3 times
        // -- Stand in a portal for a second or two. It spawns close-ish.
        // -- Spawns an orb that you have to chase.
        name: "Treacherous Transmitter",
        description: "Complete 1 of 3 mini-games to get the buff. Jump 3 times, stand in a portal for a second or two, or chase an orb.",
        effects: [
          {  // Intellect effect
            coefficient: 2.354015 * 0.9, // In-game nerf
            table: -1,
            duration: 15,
            cooldown: 90,
            penalty: 0.16,
          },

        ],
        runFunc: function(data, player, itemLevel, additionalData) {
          let bonus_stats = {};
    
          bonus_stats.intellect = runGenericOnUseTrinket(data[0], itemLevel, additionalData.castModel) * (1 - data[0].penalty);
    
          return bonus_stats;
        }
      },
      { // Might be worth adding options for "Avg Int stacks" and auto calc the other.
        name: "Ovi'nax's Mercurial Egg",
        setting: true,
        effects: [
          {  // Intellect effect
            coefficient: 0.024938 * 1.05,
            table: -1,
            avgStacks: 15, // Setting
          },
          {  // Secondary effect
            coefficient: 0.05418 * 1.05,
            table: -7,
            avgStacks: 15, // Setting
          },

        ],
        runFunc: function(data, player, itemLevel, additionalData) {
          let bonus_stats = {};
          const bestStat = player.getHighestStatWeight(additionalData.contentType);
          const intStacks = 15; // Setting removed in season 3.
          const secStacks = 30 - intStacks;
          const processedData = {intellect: processedValue(data[0], itemLevel), secondary: processedValue(data[1], itemLevel)};

          bonus_stats.intellect = (intStacks * processedData.intellect) - (intStacks > 20 ? (intStacks - 20) * processedData.intellect * 0.6 : 0)
          bonus_stats[bestStat] = (secStacks * processedData.secondary) - (secStacks > 20 ? (secStacks - 20) * processedData.secondary * 0.6 : 0);
    
          return bonus_stats;
        }
      },
      { // -- Can gain stacks while the active is going.
        name: "Spymaster's Web",
        description: "Spymaster's Web is an incredibly powerful on-use trinket that you can combine with your other cooldowns to handle burst damage. It does require you DPS though, so if you don't do that as part of your standard rotation then you'll need to tick the 'DPS' flag in the QE Live settings to assess its true value.",
        setting: true,
        effects: [
          {  // Passive Int
            coefficient: 0.014709 * 0.9 * 0.9,
            table: -1,
          },
          {  // On-use Int
            coefficient: 0.141408 * 0.95 * 0.9 * 0.9,
            table: -1,
            duration: 20,
            cooldown: 60, // Technically 20
          },

        ],
        runFunc: function(data, player, itemLevel, additionalData) {
          let bonus_stats = {};

          // You can kind of curate this to your preferred cooldown curve.
          if (player.spec === "Discipline Priest" || player.spec === "Preservation Evoker") {
            bonus_stats.intellect = processedValue(data[0], itemLevel) * (60 / 7.1);
            bonus_stats.intellect += runGenericOnUseTrinket({...data[1], coefficient: data[1].coefficient * (90 / 7.1), cooldown: 90}, itemLevel, additionalData.castModel);
          }
          else if (player.spec === "Holy Paladin" || player.spec === "Mistweaver Monk") {
            bonus_stats.intellect = processedValue(data[0], itemLevel) * (60 / 7.9);
            bonus_stats.intellect += runGenericOnUseTrinket({...data[1], coefficient: data[1].coefficient * (60 / 7.9)}, itemLevel, additionalData.castModel);
          }

          else if (getSetting(additionalData.settings, "dpsFlag") || player.spec === "Restoration Druid" || player.spec === "Mistweaver Monk") {
            bonus_stats.intellect = processedValue(data[0], itemLevel) * (60 / 6.9);
            bonus_stats.intellect += runGenericOnUseTrinket({...data[1], coefficient: data[1].coefficient * (60 / 6.9)}, itemLevel, additionalData.castModel);
          }
    
          return bonus_stats;
        }
  },
      // --
      // DRAGONFLIGHT TRINKET DATA
      // --
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
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                    Amalgam's Seventh Spine                                     */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "Amalgam's Seventh Spine",
    effects: [
      { // Be cautious using log values for some of these. Resto Druid for example is broken. 
        coefficient: 0.666804,
        table: -7,
        ppm: {"Restoration Druid": 29.8, "Holy Priest": 14, "Restoration Shaman": 12, "Holy Paladin": 10, "Mistweaver Monk": 12, 
              "Preservation Evoker": 6, "Discipline Priest": 9} // Relevant casts per minute. Can auto-pull from logs.
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};
      bonus_stats.mana = data[0].ppm[player.spec] * processedValue(data[0], itemLevel) / 60;
      if (player.spec === "Restoration Druid") bonus_stats.mana *= 0.6; // Druid has a -40% aura on Amalgam's Spine.
      else if (player.spec === "Preservation Evoker") bonus_stats.mana *= 1.1; // Evoker has a +10% aura.

      return bonus_stats;
    }
  },
  
  // -----------------------------------------
  // ----- DRAGONFLIGHT DUNGEON TRINKETS -----
  // -----------------------------------------
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                               Leaf of the Ancient Protectors                                   */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "Leaf of the Ancient Protectors",
    effects: [
      {  // Absorb
        coefficient: 486.278931,
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
        coefficient: 1.830916, //2.883274,
        table: -7,
        stat: "crit",
        duration: 10,
        ppm: 1.66,
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
        efficiency: {Raid: 0.78, Dungeon: 0.76},
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
      //bonus_stats.dps = runGenericFlatProc(data[1], itemLevel, player, additionalData.contentType);

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
        efficiency: {Raid: 0.45, Dungeon: 0.45},
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
    /*                                    Time-Thief's Gambit                                         */
    /* ---------------------------------------------------------------------------------------------- */
    //
    name: "Balefire Branch",
    effects: [
      { 
        coefficient: 0.03685, 
        table: -1,
        duration: 20,
        cooldown: 90, 
        effectiveDecayRate: 44, // You start with 100 stacks, and decay down to 0. This includes minor losses to damage taken.
      },
      { // 

      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};
      bonus_stats.intellect = runGenericOnUseTrinket(data[0], itemLevel, additionalData.castModel) * data[0].effectiveDecayRate;

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
        expectedWastage: 0.7,
      },
      { // Clone portion. The clone will spam healing spells, but if the party is topped off he'll take a break for a while. 
        coefficient: 34.79113, 
        table: -9,
        duration: 20,
        castTime: 2.5, // Not affected by Haste.
        efficiency: 0.5,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};
      const bestStat = getHighestStat(additionalData.setStats);//player.getHighestStatWeight(additionalData.contentType);
      bonus_stats[bestStat] = runGenericOnUseTrinket(data[0], itemLevel, additionalData.castModel) * data[0].expectedWastage;

      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                        Echoing Tyrstone                                        */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "Echoing Tyrstone",
    effects: [
      {  // Healing effect. No longer splits to pets. Can be pre-charged but we're opting not to include this for now.
        coefficient: 283.4695, 
        table: -9,
        secondaries: ["versatility", "crit"],
        cooldown: 120,
        meteorSize: 0.15, // Multiplier is capped at 5 allies, or 4x 0.15 (since first player isn't included)
        efficiency: 0.48, // Effective Healing x Usage Rate
      },
      { // AoE Haste effect - Each target gets full value. No splitting.
        coefficient: 0.189052, 
        table: -7,
        targets: {Raid: 18, Dungeon: 5}, // This can hit all 20 people, but in practice you often miss a few on most late game fights.
        cooldown: 120,
        efficiency: 0.75, // No overhealing, but we're still expecting a little wastage here.
        duration: 15,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      bonus_stats.hps = runGenericFlatProc(data[0], itemLevel, player, additionalData.contentType || "Raid") * (1 + 0.15 * 4);
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
      { // Negative Vers portion - When you have debuff.
        coefficient: -0.299875, 
        table: -7,
        uptime: 8 / 45, // This is the amount of time the debuff stays on you until you refresh it.
      },
      { // Positive vers portion
        coefficient: 1.260259, 
        table: -7,
        duration: 15,
        cooldown: 53,
      },
      { 
        coefficient: 25.77058, // This is the shield portion applied to allies.
        table: -9,
        secondaries: ['versatility'],
        efficiency: 0.92,
        targets: 1.9, 
        cooldown: 53,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      bonus_stats.versatility = (processedValue(data[1], itemLevel) * data[1].duration / data[1].cooldown) - (processedValue(data[0], itemLevel) * data[0].uptime);
      bonus_stats.hps = runGenericFlatProc(data[2], itemLevel, player, additionalData.contentType || "Raid") // processedValue(data[2], itemLevel, data[2].efficiency) * data[2].targets / data[2].cooldown;

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
        coefficient: 53.31175, // 161.5508, 
        table: -9,
        secondaries: ['haste', 'crit', 'versatility'],
        ppm: 4,
        mult: 0.55, // Our expected overhealing.
      },
      { // Damage portion
        // Damage is split, so we don't need any kind of target multiplier in here.
        coefficient: 20.87553,
        table: -9,
        secondaries: ['haste', 'crit', 'versatility'],
        ppm: 4,
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
      const whelpSetting = getSetting(additionalData.settings, "rubyWhelpShell");
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
      

      if (additionalData.player.getSpec() === "Discipline Priest" && false) {
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
        coefficient: 101.9246, // 89.95994, 
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

      if (additionalData.player.getSpec() === "Discipline Priest Ramp") {

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
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                           Paracausal Fragment of Frostmourne                                   */
    /* ---------------------------------------------------------------------------------------------- */

    name: "Paracausal Fragment of Frostmourne",
    effects: [
      { // Mana Portion
        coefficient: 0.602795, // 1.506561 * 0.7, 
        table: -9,
        soulsPerUse: 3,
        cooldown: 150,
      },
      { // Heal on attack portion -- S8
        coefficient: 19.10983, //3.86182,
        table: -9, 
        efficiency: 0.8,
        duration: 20,
        ppm: 30 * (20 / 150), // ppm is 30 while active, but it's only active 13% of the time.
        secondaries: ["versatility", "crit"], 
      },
      { // Haste portion -- S9
        coefficient: 1.80037,
        table: -7, 
        duration: 10,
        cooldown: 150,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      // This can probably be rewritten in a much easier way now that it doesn't have weird haste scaling.

      let bonus_stats = {};
      const contentType = additionalData.contentType || "Raid";
      //if (additionalData.settings.includeGroupBenefits) bonus_stats.allyStats = processedValue(data[0], itemLevel, versBoost);
      // Healing Portion
      bonus_stats.hps = runGenericFlatProc(data[1], itemLevel, player);

      // Mana Portion
      bonus_stats.mana = processedValue(data[0], itemLevel) * data[0].soulsPerUse / data[0].cooldown;

      // Haste portion
      if (additionalData.settings.includeGroupBenefits) bonus_stats.allyStats = runGenericOnUseTrinket(data[2], itemLevel, player, contentType);

      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                             Paracausal Fragment of Seschenal                                   */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "Paracausal Fragment of Seschenal",
    effects: [
      { 
        coefficient: 22.03581, 
        table: -9,
        secondaries: ['haste', 'crit', 'versatility'],
        ticks: 5 * 2, // Can be extended to 10 ticks. This is a best case scenario.
        ppm: 1,
        efficiency: 0.65,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      bonus_stats.hps = runGenericFlatProc(data[0], itemLevel, player);

      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                             Paracausal Fragment of Val'anyr                                    */
    /* ---------------------------------------------------------------------------------------------- */
    /* Can it procs off HoTs? Is the 10 shield limit per player? Do AoE spells work?
    /* Current rating could change drastically based on the above.
    */
    name: "Paracausal Fragment of Val'anyr",
    effects: [
      { 
        coefficient: 21.15372, // 
        table: -9,
        secondaries: ['haste', 'versatility'],
        ticks: 10, // Says it can tick 10 times "per target". This appears to be an overall 10 shield cap.
        ppm: 1,
        efficiency: 0.94,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      bonus_stats.hps = runGenericFlatProc(data[0], itemLevel, player);

      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                             Rune of the Umbramane                                    */
    /* ---------------------------------------------------------------------------------------------- */
    name: "Rune of the Umbramane",
    effects: [
      { 
        coefficient: 79.32618, // 
        table: -9,
        secondaries: ['haste', 'versatility'],
        ppm: 1,
        efficiency: 0.92,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      bonus_stats.hps = runGenericFlatProc(data[0], itemLevel, player);

      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                    Pinch of Dream Magic                                        */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "Pinch of Dream Magic",
    effects: [
      { 
        coefficient: 1.424874,
        table: -7,
        duration: 9, // Check in-game. Could be 9s. Doesn't make much of a difference since trinket is not good.
        ppm: 2,
      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      let bonus_stats: Stats = {};
      bonus_stats.intellect = runGenericPPMTrinket(data[0], itemLevel) * 0.94; // The 10s ICD will cut average uptime. We can revisit it and give it a proper adjusted uptime if we have time.
      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                    Static-Charged Scale                                        */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "Static-Charged Scale",
    effects: [
      { 
        coefficient: 1.457055,
        table: -7,
        stat: "haste",
        duration: 15,
        ppm: 2,
      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      let bonus_stats: Stats = {};
      bonus_stats.haste = runGenericPPMTrinket(data[0], itemLevel);
      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                  Alacritous Alchemist Stone                                    */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "Alacritous Alchemist Stone",
    effects: [
      { 
        coefficient: 1.172515,
        table: -1,
        stat: "intellect",
        duration: 10,
        ppm: 2,
      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      let bonus_stats: Stats = {};
      //const extraPotions = getSetting(additionalData.settings, "alchStonePotions")
      const extraPotions = 1;

      bonus_stats.intellect = runGenericPPMTrinket(data[0], itemLevel);

      bonus_stats.mana = 27600 * extraPotions / 420 * 0.7; // Rest in peace Chilled Clarity potion. It is very difficult to use this potion on cooldown.


      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                  Sustaining Alchemist Stone                                    */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "Sustaining Alchemist Stone",
    effects: [
      { 
        coefficient: 1.405902,
        table: -1,
        stat: "intellect",
        duration: 10,
        ppm: 2,
      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      let bonus_stats: Stats = {};
      bonus_stats.intellect = runGenericPPMTrinket(data[0], itemLevel);

      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                       Darkmoon Deck: Dance                                     */
    /* ---------------------------------------------------------------------------------------------- */
    /* There might be some special deck modifiers that we have to add later.
    */
    name: "Darkmoon Deck: Dance",
    effects: [
      { 
        coefficient: 22.356917, // Previously: 20.32447, // 45.81175 - Damage
        table: -8,
        efficiency: 0.6,
        cooldown: 90
      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      let bonus_stats: Stats = {};
      const averageHealTargets = 5; // ceil((5 + 12) / 2 / 2)
      const averageDamageTargets = 4; // floor((5 + 12) / 2 / 2)
      bonus_stats.hps = processedValue(data[0], itemLevel, data[0].efficiency) * averageHealTargets / data[0].cooldown!;
      bonus_stats.dps = processedValue(data[0], itemLevel, data[0].efficiency) * averageDamageTargets / data[0].cooldown!;
      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                    Azure Arcanic Amplifier                                      */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "Azure Arcanic Amplifier",
    effects: [
      { 
        coefficient: 2.881377,
        table: -7,
        stat: "crit",
        duration: 10,
        ppm: 1,
      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      let bonus_stats: Stats = {};
      bonus_stats.crit = runGenericPPMTrinket(data[0], itemLevel);

      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                       Razorwind Talisman                                       */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "Razorwind Talisman",
    effects: [
      { 
        coefficient: 2.881377,
        table: -7,
        stat: "crit",
        duration: 10,
        ppm: 1,
      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      let bonus_stats: Stats = {};
      bonus_stats.crit = runGenericPPMTrinket(data[0], itemLevel);

      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                      Breath of the Plains                                      */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "Breath of the Plains",
    effects: [
      { 
        coefficient: 1.560047,
        table: -7,
        stat: "haste",
        duration: 20,
        ppm: 1,
      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      let bonus_stats: Stats = {};
      bonus_stats.haste = runGenericPPMTrinket(data[0], itemLevel);

      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                  The Cartographer's Calipers                                   */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "The Cartographer's Calipers",
    effects: [
      { 
        coefficient: 24.1169,
        table: -9,
        duration: 3,
        secondaries: ['haste', 'versatility', 'crit'],
        efficiency: 1,
        ppm: 1,
      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      let bonus_stats: Stats = {};
      bonus_stats.hps = processedValue(data[0], itemLevel, data[0].efficiency) * data[0].ppm! / 60 * player.getStatMults(data[0].secondaries);
      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                        Dreamscape Prism                                        */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "Dreamscape Prism",
    effects: [
      { // Mastery Proc
        coefficient: 1.441087,
        table: -7,
        duration: 20,
        ppm: 0.5,
      },
      { // Mana Proc. TODO
        coefficient: 0.001597,
        table: -7,
        duration: 20,
        ppm: 0.5,
      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      let bonus_stats: Stats = {};
      // The mana proc currently gives 1 MP5 while active.
      bonus_stats.mastery = runGenericPPMTrinket(data[0], itemLevel);
      //bonus_stats.mana = processedValue(data[0], itemLevel, data[0].efficiency) * data[0].ppm / 60 * player.getStatMults(data[0].secondaries);
      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                        Dreamscape Prism                                        */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "Wind-Sealed Mana Capsule",
    effects: [
      { // Mana proc chance.
        coefficient: 1.641399,
        table: -7,
        ppm: 1,
      },
      { // Mana Unleash
        coefficient: 24.62098,
        table: -7,
        ppm: 1.5,
      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      let bonus_stats: Stats = {};

      bonus_stats.mana = processedValue(data[0], itemLevel) * data[0].ppm! / 60;
      bonus_stats.mana += processedValue(data[1], itemLevel) * data[1].ppm! / 340 //additionalData.castModel.fightLength;

      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                          Primal Ritual Shell                                   */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "Primal Ritual Shell",
    effects: [
      {  // Heal effect
        coefficient: 182.4512,
        table: -9,
        secondaries: ['versatility', 'crit'],
        efficiency: 0.65,
        ppm: 2,
      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      let bonus_stats: Stats = {};
      bonus_stats.hps = processedValue(data[0], itemLevel, data[0].efficiency) * data[0].ppm! / 60 * player.getStatMults(data[0].secondaries);

      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                             Breezy Companion                                   */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "Breezy Companion",
    effects: [
      {  // Heal effect
        coefficient: 81.48583,
        table: -9,
        secondaries: ['versatility', 'crit'],
        efficiency: 0.75,
        ppm: 2,
      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      let bonus_stats: Stats = {};
      bonus_stats.hps = processedValue(data[0], itemLevel, data[0].efficiency) * data[0].ppm! / 60 * player.getStatMults(data[0].secondaries);
      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                   Blood of the Khansguard                                      */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "Blood of the Khansguard",
    effects: [
      { // Mastery portion
        coefficient: 1.500168,
        table: -1,
        stat: "intellect",
        duration: 15,
        ppm: 1,
      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      let bonus_stats: Stats = {};
      bonus_stats.intellect = runGenericPPMTrinket(data[0], itemLevel);

      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                          Gladiator's Insignia of Alacrity                                      */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "Gladiator's Insignia of Alacrity",
    effects: [
      { // Mastery portion
        coefficient: 1.00266,
        table: -1,
        stat: "intellect",
        duration: 20,
        ppm: 1.5,
      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      let bonus_stats: Stats = {};
      bonus_stats.intellect = runGenericPPMTrinket(data[0], itemLevel);

      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                     Idol of the Dreamer                                        */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "Idol of the Dreamer",
    effects: [
      { // Haste Proc
        coefficient: 0.049358,
        table: -7,
        ppm: 2.2,
      },
      { // Split proc
        coefficient: 0.839092,
        table: -7,
        duration: 15,

      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      return buildIdolTrinket(data, itemLevel, "haste", additionalData.settings, additionalData.setStats);
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                     Idol of the Lifebinder                                        */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "Idol of the Life-Binder",
    effects: [
      { // Small Proc
        coefficient: 0.049358,
        table: -7,
        ppm: 2.2,
      },
      { // Split proc
        coefficient: 0.839092,
        table: -7,
        duration: 15,

      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      return buildIdolTrinket(data, itemLevel, "crit", additionalData.settings, additionalData.setStats);
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                Idol of the Spellweaver                                         */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "Idol of the Spell-Weaver",
    effects: [
      { // Small Proc
        coefficient: 0.049358,
        table: -7,
        ppm: 2.2,
      },
      { // Split proc
        coefficient: 0.839092,
        table: -7,
        duration: 15,

      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      return buildIdolTrinket(data, itemLevel, "versatility", additionalData.settings, additionalData.setStats);
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                               Idol of the Earth Warder                                         */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "Idol of the Earth-Warder",
    effects: [
      { // Small Proc
        coefficient: 0.049358,
        table: -7,
        ppm: 2.2,
      },
      { // Split proc
        coefficient: 0.839092,
        table: -7,
        duration: 15,

      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {

      return buildIdolTrinket(data, itemLevel, "mastery", additionalData.settings, additionalData.setStats);
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                             Magmaclaw Lure                                     */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "Magmaclaw Lure",
    effects: [
      { 
        coefficient: 448.172 * 0.331, // Nerf
        table: -9,
        secondaries: ['versatility'],
        cooldown: 150,
        efficiency: {Raid: 0.62, Dungeon: 0.76}, //
        targets: 5,
      },
    ],
    runFunc: function(data: ReadonlyArray<effectData>, player: Player, itemLevel: number, additionalData: any) {
      let bonus_stats: Stats = {};
      const contentType : string = additionalData.contentType || "Raid";
      const efficiency = // This needs to be cleaned up or moved to a function.
        typeof data[0].efficiency === "object"
          ? (data[0].efficiency as { Raid: number; Dungeon: number })[contentType as keyof { Raid: number; Dungeon: number }]
          : data[0].efficiency;
    
    
      bonus_stats.hps = processedValue(data[0], itemLevel, efficiency) * data[0].targets! / data[0].cooldown! * player.getStatMults(data[0].secondaries);

      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                       Engraved Spearhead                                       */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "Engraved Spearhead",
    effects: [
      { 
        coefficient: 0.526455,
        table: -7,
        stat: "crit",
        duration: 10,
        ppm: 4,
        maxStacks: 3,
      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      let bonus_stats: Stats = {};
      const effect = data[0];
      const a = effect.ppm! * effect.duration! / 60;
      const averageStacks = 1.13*(Math.exp(a)-1)*(1-Math.pow((1-Math.exp(-a)), effect.maxStacks))

      bonus_stats.crit = averageStacks * processedValue(data[0], itemLevel);

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
