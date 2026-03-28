import { Player } from "General/Modules/Player/Player";
import { convertPPMToUptime, getSetting, processedValue, runGenericPPMTrinket, runGenericFlatProc, convertPPMToUptimeExtended, runGenericOnUseTrinket, forceGenericOnUseTrinket, runGenericPPMOverlapTrinket } from "../../EffectUtilities";
import { setBounds } from "General/Engine/CONSTRAINTS"
import trinketRawData from "Retail/Engine/EffectFormulas/Generic/Trinkets/TrinketData.json"

// Note that raid trinket data is stored here. For other trinket data, see the dungeon, timewalking and other trinket data files.
export const raidTrinketData = [
  {
        name: "Litany of Lightblind Wrath",
        description: "An awkward to use but numerically powerful healer trinket option. Should be easier to obtain than other S-tier trinkets, just remember to press it close to its cooldown to maximize value.",
        addonDescription: "An awkward to use but numerically powerful healer trinket option. Should be easier to obtain than other S-tier trinkets, just remember to press it close to its cooldown to maximize value.",
        effects: [
          {  // Damage Effect - Need to check if it double dips Vers
            secondaries: ['crit', 'versatility'],
            cooldown: 90,
            efficiency: 0.88, // Unlikely to be able to use it perfectly on CD.
            ticks: 5,
          },
          
        ],
        runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
          let bonus_stats: Stats = {};
    
          let dps = runGenericFlatProc({...data[0], ...trinketRawData["Litany of Lightblind Wrath"][0]}, itemLevel, player, additionalData.contentType)
          if (["Holy Paladin"].includes(player.spec) && additionalData.contentType === "Raid") dps = 0;
          else if (player.spec === "Restoration Shaman" && additionalData.contentType === "Raid") dps *= 0.6
          else if (["Preservation Evoker", "Restoration Druid"].includes(player.spec) && additionalData.contentType === "Raid") dps *= 0.80; // These specs can use it on more targets in raid, but it's still not amazing for them.

          bonus_stats.dps = dps;
          bonus_stats.hps = dps * 5;
  
          return bonus_stats;
        }
      },
  { // 
    name: "Vaelgor's Final Stare",
    description: "A powerful on-use trinket that that diminishes linearly over 15 seconds. Great for all healer specs that like Mastery.",
    addonDescription: "A powerful on-use trinket that that diminishes linearly over 15 seconds. Great for all healer specs that like Mastery.",
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
        description: "Gaze continues to get bugfixes and in-game tuning.",
        addonDescription: "Gaze continues to get bugfixes and in-game tuning.",
        effects: [
        { // Stat Proc Portion
            stat: "intellect",
            duration: 12,
            ppm: 2,
        },
        ],
        runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
            let bonus_stats: Stats = {};

            const specData = { // This trinket just does random shit. We can try and calculate it dynamically later.
              "Holy Priest": 8.9,
              "Discipline Priest": 10.7,
              "Restoration Druid": 10.2,
              "Preservation Evoker": 11.2,
              "Mistweaver Monk": 11.6,
              "Restoration Shaman": 10,
              "Holy Paladin": 10.8,
            }
            const spellsCastInDuration = specData[player.spec]
            
            //buggedSpecs.includes(player.spec) ? 12 : (12 / 1.5 * player.getStatPerc("haste"));

            

            const alnUptime = convertPPMToUptimeExtended(data[0].ppm, data[0].duration)
            // Currently bugged and accruing a stack per second.
            const stacksPerMinute = alnUptime * 60;
            bonus_stats.intellect = stacksPerMinute * spellsCastInDuration / 60 * processedValue(trinketRawData["Gaze of the Alnseer"][0], itemLevel, 1, "ceil");

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

            bonus_stats.intellect = runGenericPPMTrinket({...data[0], ...trinketRawData["Locus-Walker's Ribbon"][0]}, itemLevel, additionalData.setStats, ["RefreshExtends"]);

            const fightLength = player.getFightLength(additionalData.contentType) / 60;
            const timeToMax = 10 / (data[0].ppm! * 1.13); // 4 minutes
            const timeAtMax = fightLength - timeToMax; // 2 minutes
            const averageStacks = (10 * (timeAtMax / fightLength)) + (5 * timeToMax / fightLength);

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
              targets: 2.5, // Heals for more per healed ally, up to 5.
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
