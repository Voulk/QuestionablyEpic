import Player from "General/Modules/Player/Player";
import { convertPPMToUptime, getHighestStat, runGenericFlatProc, getSetting, forceGenericOnUseTrinket, processedValue, runGenericPPMTrinket, runGenericRandomPPMTrinket, runGenericOnUseTrinket, getDiminishedValue, runDiscOnUseTrinket, runGenericPPMTrinketHasted, runGenericPPMOverlapTrinket } from "../../EffectUtilities";
import trinketRawData from "Retail/Engine/EffectFormulas/Generic/Trinkets/TrinketData.json"

export const dungeonTrinketData = 
[
      {
      name: "Litany of Lightblind Wrath",
      description: "",
      addonDescription: "",
      effects: [
        {  // Damage Effect - Need to check if it double dips Vers
          secondaries: ['crit', 'versatility'],
          cooldown: 90,
          ticks: 5,
          efficiency: 1 //
        },
        
      ],
      runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
        let bonus_stats: Stats = {};
  
        const dps = runGenericFlatProc({...data[0], ...trinketRawData["Litany of Lightblind Wrath"][0]}, itemLevel, player, additionalData.contentType)
        bonus_stats.dps = dps;
        bonus_stats.hps = dps// * 5;

        return bonus_stats;
      }
    },
    { //
        id: 193718,
        name: "Emerald Coach's Whistle",
        description: "Really shines as a support-trinket. Poor if you only care about personal benefit.",
        addonDescription: "Really shines as a support-trinket. Poor if you only care about personal benefit.",
        effects: [
        { // Stat Proc Portion
            stat: "mastery",
            duration: 10,
            ppm: 1,
        },
        ],
        runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
            let bonus_stats: Stats = {};

            bonus_stats.mastery = runGenericPPMTrinket({...data[0], ...trinketRawData["Emerald Coach's Whistle"][0]}, itemLevel);
            bonus_stats.allyStats = bonus_stats.mastery;

            return bonus_stats;
            }
    },

    {
      name: "Echo of L'ura",
      description: "Procs a lot when active (about 20 times) but the very long cooldown prevents it from being a real contender.",
      addonDescription: "Procs a lot when active (about 20 times) but the very long cooldown prevents it from being a real contender.",
      effects: [
        { 
          secondaries: ['versatility', 'crit'],
          cooldown: 180,
          duration: 45,
          ppm: 25 * (45 / 180), // Only active while the trinket is up which is 45/180 of the time.
          efficiency: {Raid: 0.7, Dungeon: 0.55} //
        },
      ],
      runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
        let bonus_stats: Stats = {};
  
        bonus_stats.hps = runGenericFlatProc({...data[0], ...trinketRawData["Echo of L'ura"][0]}, itemLevel, player, additionalData.contentType)
        return bonus_stats;
      }
    },
        { // Passive mastery at all times, + a light effect you have to stand in.
        id: 250214,
        name: "Lightspire Core",
        description: "Most of Lightspire Cores power comes from the passive mastery buff, so don't worry too much if you're not able to stand in the light beam it occasionally summons.",
        addonDescription: "Most of Lightspire Cores power comes from the passive mastery buff, so don't worry too much if you're not able to stand in the light beam it occasionally summons.",
        effects: [
        { // Stat Proc Portion
            stat: "mastery",
            duration: 12,
            ppm: 1.25,
            efficiency: 0.4,
        },
        ],
        runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
            let bonus_stats: Stats = {};

            // Passive Mastery Portion
            bonus_stats.mastery = processedValue(trinketRawData["Lightspire Core"][0], itemLevel);

            const beamStats = runGenericPPMTrinket({...data[0], ...trinketRawData["Lightspire Core"][1]}, itemLevel) * data[0].efficiency!
            bonus_stats.mastery += beamStats;

            return bonus_stats;
            }
    },
    { //
        id: 250256,
        name: "Heart of Wind",
        description: "A solid stat stick if your spec enjoys Haste.",
        addonDescription: "A solid stat stick if your spec enjoys Haste.",
        effects: [
        { // Stat Proc Portion
            stat: "haste",
            duration: 10,
            ppm: 3,
        },
        ],
        runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
            let bonus_stats: Stats = {};

            bonus_stats[data[0].stat!] = runGenericPPMTrinket({...data[0], ...trinketRawData["Heart of Wind"][0]}, itemLevel);

            return bonus_stats;
      }
    },
    {
      name: "Seed of Radiant Hope",
      description: "Currently undertuned.",
      addonDescription: "Currently undertuned.",
      effects: [
        {  // HoT effect
          secondaries: ['crit', 'versatility'],
          cooldown: 90,
          ticks: 8,
          efficiency: 0.65 //
        },
        { // Direct Heal effect
          secondaries: ['crit', 'versatility'],
          cooldown: 90,
          efficiency: {Raid: 0.3, Dungeon: 0.4} //
        },
        
      ],
      runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
        let bonus_stats: Stats = {};
  
        bonus_stats.hps = runGenericFlatProc({...data[0], ...trinketRawData["Seed of Radiant Hope"][0]}, itemLevel, player, additionalData.contentType)
        bonus_stats.hps += runGenericFlatProc({...data[1], ...trinketRawData["Seed of Radiant Hope"][1]}, itemLevel, player, additionalData.contentType)
        return bonus_stats;
      }
    },
        {
      name: "Unstable Felheart Crystal",
      description: "A strong niche, but poor tuning prevents Unstable Felheart Crystal from being useful - even in Mythic+.",
      addonDescription: "A strong niche, but poor tuning prevents Unstable Felheart Crystal from being useful - even in Mythic+.",
      effects: [
        { 
          secondaries: ['versatility'],
          cooldown: 120,
          efficiency: {Raid: 0.7, Dungeon: 0.85} //
        },
      ],
      runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
        let bonus_stats: Stats = {};
  
        bonus_stats.hps = runGenericFlatProc({...data[0], ...trinketRawData["Unstable Felheart Crystal"][0]}, itemLevel, player, additionalData.contentType)
        return bonus_stats;
      }
    },
    {
      name: "Mycolic Medicine",
      description: "Dreadful Trinket",
      addonDescription: "Dreadful Trinket",
      effects: [
        {  // Instant Heal
          secondaries: ['haste', 'crit', 'versatility'],
          ppm: 3,
          efficiency: 0.7 //
        },
        { // Mushroom they need to stand on
          secondaries: ['haste', 'crit', 'versatility'],
          ppm: 3,
          efficiency: {Raid: 0.4, Dungeon: 0.5} //
        },
        
      ],
      runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
        let bonus_stats: Stats = {};
  
        bonus_stats.hps = runGenericFlatProc({...data[0], ...trinketRawData["Mycolic Medicine"][0]}, itemLevel, player, additionalData.contentType)
        bonus_stats.hps += runGenericFlatProc({...data[1], ...trinketRawData["Mycolic Medicine"][1]}, itemLevel, player, additionalData.contentType)
        return bonus_stats;
      }
    },
    {
      name: "Whisper of the Duskwraith",
      description: "A great idea for a trinket, but the numbers aren't high enough to put it in the top leagues. B-tier.",
      addonDescription: "A great idea for a trinket, but the numbers aren't high enough to put it in the top leagues. B-tier.",
      effects: [
        {  // Instant Heal, no haste scaling - probably because of the vers
          secondaries: ['crit', 'versatility'],
          ppm: 4,
          efficiency: 0.7 //
        },
        { // Vers portion
          ppm: 4,
          duration: 10,
          efficiency: 0.3 //
        },
        
      ],
      runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
        let bonus_stats: Stats = {};
  
        bonus_stats.hps = runGenericFlatProc({...data[0], ...trinketRawData["Whisper of the Duskwraith"][0]}, itemLevel, player, additionalData.contentType)
        bonus_stats.allyStats = runGenericPPMTrinket({...data[1], ...trinketRawData["Whisper of the Duskwraith"][1]}, itemLevel, player) * data[1].efficiency!;

        return bonus_stats;
      }
    },
        {
      name: "Refueling Orb",
      description: "Was nerfed shortly after going live. Now just an adequate support trinket.",
      addonDescription: "Was nerfed shortly after going live. Now just an adequate support trinket.",
      effects: [
        { // Vers portion. Hasted for some reason.
          ppm: 2,
          targets: 5,
          duration: 12,
        },
        {  // Instant Heal, procs if the target is below 50% health.
          secondaries: ['haste', 'crit', 'versatility'],
          ppm: 2,
          efficiency: 0.7 //
        },

        
      ],
      runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
        let bonus_stats: Stats = {};
  
        const versatilityRatio = 0.85; // Procs Vers if the target is above 50% health, a heal otherwise.
        bonus_stats.allyStats = runGenericPPMTrinketHasted({...data[0], ...trinketRawData["Refueling Orb"][0]}, itemLevel, player.getStatPerc("haste")) * data[0].targets! * versatilityRatio;
        bonus_stats.hps = runGenericFlatProc({...data[1], ...trinketRawData["Refueling Orb"][1]}, itemLevel, player, additionalData.contentType) * (1 - versatilityRatio);
        

        return bonus_stats;
      }
    },
    { // Passive mastery at all times, + a light effect you have to stand in.
        name: "Vessel of Tortured Souls",
        description: "Summons a soul that you have to chase around to get the stats. As a result, not very good.",
        addonDescription: "Summons a soul that you have to chase around to get the stats. As a result, not very good.",
        effects: [
        { // Stat Proc Portion
            stat: "intellect",
            duration: 60,
            ppm: 3,
            efficiency: 0.5,
        },
        ],
        runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
            let bonus_stats: Stats = {};

            const orbStats = runGenericPPMOverlapTrinket({...data[0], ...trinketRawData["Vessel of Tortured Souls"][0]}, itemLevel)
            bonus_stats.intellect = orbStats * data[0].efficiency!;

            return bonus_stats;
            }
    },
      { // 
        name: "Freightrunner's Flask",
        description: "A fine on-use trinket that has better alternatives elsewhere in the game. C-tier.",
        addonDescription: "A fine on-use trinket that has better alternatives elsewhere in the game. C-tier.",
        effects: [
          { // Int Proc
            duration: 15,
            cooldown: 90, //
            stat: "crit",
          },
        ],
        runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
          let bonus_stats: Stats = {};
    
          //bonus_stats.intellect = processedValue(data[0], itemLevel) * data[0].duration / data[0].cooldown; // These stacks can overlap so there should be no proc munching.
          bonus_stats[data[0].stat!] = runGenericOnUseTrinket({...data[0], ...trinketRawData["Freightrunner's Flask"][0]}, itemLevel, additionalData.castModel)
          return bonus_stats;
        }
      },
       { // 
        name: "Emberwing Feather",
        description: "A solid on-use stat stick. The potential downside (losing stats) is extremely rare and not that punishing anyway.",
        addonDescription: "A solid on-use stat stick. The potential downside (losing stats) is extremely rare and not that punishing anyway.",
        effects: [
          { // 
            duration: 15,
            cooldown: 120, //
            stat: "haste",
          },
          { // Backfire Effect
            duration: 10,
            cooldown: 120, //
            stat: "mixed",
          },
        ],
        runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
          let bonus_stats: Stats = {};
    
          bonus_stats[data[0].stat!] = runGenericOnUseTrinket({...data[0], ...trinketRawData["Emberwing Feather"][0]}, itemLevel, additionalData.castModel)
          
          return bonus_stats;
        }
      },


]; 