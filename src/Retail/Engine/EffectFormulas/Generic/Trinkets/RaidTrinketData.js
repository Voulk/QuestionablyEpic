import { convertPPMToUptime, getSetting, processedValue, runGenericPPMTrinket, runGenericFlatProc, getDiminishedValue, runGenericOnUseTrinket } from "../../EffectUtilities";
import { setBounds } from "General/Engine/CONSTRAINTS"

// Note that raid trinket data is stored here. For other trinket data, see the dungeon, timewalking and other trinket data files.
export const raidTrinketData = [
    { // While the buffs appear in the same stack, they are individual buffs. This does mean it's impossible to lose any value if you get an int proc while you already have one.
        name: "Gruesome Syringe",
        description: "The problem with Gruesome Syringe is that the backup prize of an int proc if nobody drops low is much stronger than the heal proc but you're unlikely to get the int when you need it.",
        effects: [
          {  // Heal effect
            coefficient: 63.84857, 
            table: -8,
            secondaries: ['versatility', 'crit'], // Crit?
            ppm: 6,
            percentProcced: 0.75,
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
    
          bonus_stats.hps = runGenericFlatProc(data[0], itemLevel, player, additionalData.contentType) * data[0].percentProcced;
          bonus_stats.intellect = processedValue(data[1], itemLevel) * data[1].duration * data[0].ppm * 1.13 * (1 - data[0].percentProcced) / 60;
    
          return bonus_stats;
        }
      },
      { 
        // Actually absorbs 20% of your healing done until it reaches the cap.
        // Bursts immediately upon reaching it. 
        // Targeting TBA but won't hit full health players.
        name: "Creeping Coagulum",
        description: "Hello",
        effects: [
          {  // Heal effect but used in different ways.
            coefficient: 317.3604, 
            table: -9,
            secondaries: ['versatility', 'crit'], // Crit confirmed.
            targets: 5,
            efficiency: 0.80, 
            cooldown: 90,
          },
          {  // The damage portion. Currently unused.
            coefficient: 2.260543,
            table: -9,
          },
        ],
        runFunc: function(data, player, itemLevel, additionalData) {
          let bonus_stats = {};
          const s1 = processedValue(data[0], itemLevel)
          const healingConsumed = s1 * 40 / 100;
          const healingDealt = (s1 + (s1 * 40 * 0.01*(1 + 3 / 100)))/5;

          bonus_stats.hps = (healingDealt * data[0].targets * data[0].efficiency * player.getStatMults(data[0].secondaries) - healingConsumed) / data[0].cooldown;


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
            coefficient: 2.354015,
            table: -1,
            duration: 15,
            cooldown: 90,
            penalty: 0.3,
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
        effects: [
          {  // Intellect effect
            coefficient: 0.024938,
            table: -1,
            avgStacks: 15,
          },
          {  // Secondary effect
            coefficient: 0.05418,
            table: -7,
            avgStacks: 15,
          },

        ],
        runFunc: function(data, player, itemLevel, additionalData) {
          let bonus_stats = {};
          const bestStat = player.getHighestStatWeight(additionalData.contentType);
          const processedData = {intellect: processedValue(data[0], itemLevel), secondary: processedValue(data[1], itemLevel)};
          bonus_stats.intellect = processedData.intellect * data[0].avgStacks;
          bonus_stats[bestStat] = processedData.secondary * data[1].avgStacks;
    
          return bonus_stats;
        }
      },
      { // -- Can gain stacks while the active is going.
        name: "Spymaster's Web",
        effects: [
          {  // Passive Int
            coefficient: 0.014709,
            table: -1,
          },
          {  // On-use Int
            coefficient: 0.141408,
            table: -1,
            duration: 20,
            cooldown: 60, // Technically 20
          },

        ],
        runFunc: function(data, player, itemLevel, additionalData) {
          let bonus_stats = {};

          // You can kind of curate this to your preferred cooldown curve.
          if (player.spec === "Restoration Druid") {
            bonus_stats.intellect = processedValue(data[0], itemLevel) * (60 / 6.4);
            bonus_stats.intellect += runGenericOnUseTrinket({...data[1], coefficient: data[1].coefficient * (60 / 6.4)}, itemLevel, additionalData.castModel);
          }
    
          return bonus_stats;
        }
      },

];
