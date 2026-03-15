import { Player } from "General/Modules/Player/Player";
import { convertPPMToUptime, getSetting, processedValue, runGenericPPMTrinket, runGenericFlatProc, getDiminishedValue, runGenericOnUseTrinket, forceGenericOnUseTrinket, runGenericPPMOverlapTrinket } from "../../EffectUtilities";
import { setBounds } from "General/Engine/CONSTRAINTS"
import trinketRawData from "Retail/Engine/EffectFormulas/Generic/Trinkets/TrinketData.json"

// Note that raid trinket data is stored here. For other trinket data, see the dungeon, timewalking and other trinket data files.
export const raidTrinketData = [
  {
        name: "Litany of Lightblind Wrath",
        description: "",
        addonDescription: "",
        effects: [
          {  // Damage Effect - Need to check if it double dips Vers
            secondaries: ['crit', 'versatility'],
            cooldown: 90,
            efficiency: 0.9, // Unlikely to be able to use it perfectly on CD.
            ticks: 5,
          },
          
        ],
        runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
          let bonus_stats: Stats = {};
    
          const dps = runGenericFlatProc({...data[0], ...trinketRawData["Litany of Lightblind Wrath"][0]}, itemLevel, player, additionalData.contentType)
          if (["Mistweaver Monk", "Holy Paladin"].includes(player.spec))
          bonus_stats.dps = dps;
          bonus_stats.hps = dps * 5;
  
          return bonus_stats;
        }
      },
  { // 
    name: "Vaelgor's Final Stare",
    description: "An absurdly powerful on-use trinket that that diminishes linearly over 15 seconds. Great for all healer specs that like Mastery.",
    addonDescription: "An absurdly powerful on-use trinket that that diminishes linearly over 15 seconds. Great for all healer specs that like Mastery.",
    effects: [
      { // Int Proc
        duration: 15,
        cooldown: 90, //
        stat: "mastery",
      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      let bonus_stats: Stats = {};

      bonus_stats[data[0].stat!] = runGenericOnUseTrinket({...data[0], ...trinketRawData["Vaelgor's Final Stare"][0]}, itemLevel, additionalData.castModel) / 2
      return bonus_stats;
    }
  },
      { //
        id: 249343,
        name: "Gaze of the Alnseer",
        description: "Extremely powerful but bugged on Beta, and you would gain stacks by doing nothing at all. Check in a few weeks to see if they've fixed it.",
        addonDescription: "Extremely powerful but bugged on Beta, and you would gain stacks by doing nothing at all. Check in a few weeks to see if they've fixed it.",
        effects: [
        { // Stat Proc Portion
            stat: "intellect",
            duration: 12,
            ppm: 2,
        },
        ],
        runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
            let bonus_stats: Stats = {};

            const spellsCastInduration = 12 / 2; // Placeholder obviously

            const alnUptime = convertPPMToUptime(data[0].ppm, data[0].duration)
            // Currently bugged and accruing a stack per second.
            const stacksPerMinute = alnUptime * 60;
            bonus_stats.intellect = stacksPerMinute * 12 / 60 * processedValue(trinketRawData["Gaze of the Alnseer"][0], itemLevel) * 0.8;

            return bonus_stats;
        }
  },
    { //
        id: 249809,
        name: "Locus-Walker's Ribbon",
        description: "Fine in Mythic+ (even if stacks drop often) but truly shines in raid.",
        addonDescription: "Fine in Mythic+ (even if stacks drop often) but truly shines in raid.",
        effects: [
        { // Stat Proc Portion
            stat: "intellect",
            duration: 10,
            ppm: 2.5,
        },
        ],
        runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
            let bonus_stats: Stats = {};

            bonus_stats.intellect = runGenericPPMTrinket({...data[0], ...trinketRawData["Locus-Walker's Ribbon"][0]}, itemLevel);

            const timeToMax = 10 / data[0].ppm!;
            const timeAtMax = 6 - timeToMax; 
            const averageStacks = timeAtMax + (timeToMax / 2);

            bonus_stats.intellect *= averageStacks * 0.05 + 1;

            return bonus_stats;
            }
    },
    { //
        id: 249341,
        name: "Volatile Void Suffuser",
        description: "A reasonable stat stick, though don't expect a ton of extra value from the low-health-allies portion.",
        addonDescription: "A reasonable stat stick, though don't expect a ton of extra value from the low-health-allies portion.",
        effects: [
        { // Stat Proc Portion
            stat: "intellect",
            duration: 12,
            ppm: 2.5,
        },
        ],
        runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
            let bonus_stats: Stats = {};

            bonus_stats.intellect = runGenericPPMOverlapTrinket({...data[0], ...trinketRawData["Volatile Void Suffuser"][0]}, itemLevel);
            const averageRaidHealth = 0.9; // Can we just put this in settings maybe?
            bonus_stats.intellect *= (1 + (1 - averageRaidHealth));

            return bonus_stats;
            }
    },
        {
          name: "Light of the Cosmic Crescendo",
          description: "",
          addonDescription: "",
          effects: [
            { // Damage effect. NYI.
              secondaries: ['haste', 'versatility', 'crit'],
              ppm: 5,
            },
            { 
              secondaries: ['haste', 'versatility', 'crit'],
              ppm: 5, 
              targets: 1.5, // Heals for more per healed ally, up to 5.
              efficiency: {Raid: 0.7, Dungeon: 0.55} //
            },
          ],
          runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
            let bonus_stats: Stats = {};
      
            bonus_stats.hps = runGenericFlatProc({...data[1], ...trinketRawData["Light of the Cosmic Crescendo"][1]}, itemLevel, player, additionalData.contentType)
            
            return bonus_stats;
          }
        },


];
