import { convertPPMToUptime, getSetting, processedValue, runGenericPPMTrinket, runGenericFlatProc, getDiminishedValue, runGenericOnUseTrinket, forceGenericOnUseTrinket } from "../../EffectUtilities";
import { setBounds } from "General/Engine/CONSTRAINTS"

// Note that raid trinket data is stored here. For other trinket data, see the dungeon, timewalking and other trinket data files.
export const raidTrinketData = [
  { // Stacking mastery buff that turns into a healing buff when you reach full stacks.
    name: "Eye of Kezan",
    description: "Overtuned. Takes 2 minutes to be good and 4 to reach maximum power. Ignore the healing proc - it's not a significant part of the trinkets power. ",
    effects: [
      { 
        coefficient: 0.045686 * 0.95, 
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
    description: "Requires channeling for 5 seconds. Every 10% haste you get gives you +1 drink (rounded up). Slightly undertuned for a trinket with quite a few downsides.",
    setting: true,
    effects: [
      {  // Heal effect but used in different ways.
        coefficient: 187.105, 
        table: -8,
        secondaries: ['versatility', 'crit'], // Crit TODO
        targets: 10, // 
        efficiency: {Raid: 0.8, Dungeon: 0.8},
        specPenalty: {"Holy Priest": 1, "Restoration Druid": 3, "Mistweaver Monk": 1.5, "Restoration Shaman": 2, "Discipline Priest": 2,
                       "Holy Paladin": 1, "Preservation Evoker": 1},
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
    description: "Very good if your spec has powerful 90s cooldowns like Preservation Evoker and Disc Priest. Fairly poor otherwise.",
    effects: [
      {
        coefficient: 2.736594, 
        table: -7,
        duration: 15, 
        cooldown: 90,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      const variance = (0.9 + 1.15) / 2; // House of Cards variance is -10% to +15%. Every time you use the trinket the floor by 3.3% up to 3 times.

      if ((player.spec === "Holy Priest" || player.spec === "Restoration Druid") && getSetting(additionalData.settings, "delayOnUseTrinkets")) bonus_stats.mastery = forceGenericOnUseTrinket(data[0], itemLevel, additionalData.castModel, 120) * variance;
      else bonus_stats.mastery = runGenericOnUseTrinket(data[0], itemLevel, additionalData.castModel) * variance;

      return bonus_stats;
    }
  },
  { // Crit proc trinket. Spells cast while crit buff is up increase the crit.
    name: "Mug's Moxie Jug",
    description: "",
    effects: [
      {
        coefficient: 0.276886, 
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
    description: "A surprisingly strong flat healing trinket with low overhealing. Default overhealing: 22%.",
    setting: true,
    effects: [
      {  // Heal effect
        coefficient: 10.31673, 
        table: -9,
        secondaries: ['versatility', 'crit', 'haste'], // Secondaries confirmed.
        targets: 5 * 3, // Lasts 6 seconds and heals 5 people per tick.
        efficiency: {Raid: 0.78, Dungeon: 0.6},
        holyMasteryFlag: true,
        ppm: 2.5 * 0.8, // Incorrect flagging
      },
      {  // The damage portion.
        coefficient: 0,
        table: -9,
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
          const intStacks = getSetting(additionalData.settings, "ovinaxAverageIntStacks")
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

];
