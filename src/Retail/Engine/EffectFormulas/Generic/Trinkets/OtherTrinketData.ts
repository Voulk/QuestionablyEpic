import { convertPPMToUptime, runGenericFlatProc, getSetting, processedValue, runGenericPPMTrinket, getHighestStat, forceGenericOnUseTrinket, runGenericOnUseTrinket, getDiminishedValue, buildIdolTrinket, runGenericRandomPPMTrinket } from "Retail/Engine/EffectFormulas/EffectUtilities";
import { Player } from "General/Modules/Player/Player";
import trinketRawData from "Retail/Engine/EffectFormulas/Generic/Trinkets/TrinketData.json"
import { STATCONVERSION } from "General/Engine/STAT"

export const otherTrinketData = [
    {
      name: "Drum of Renewed Bonds",
      description: "Not available on Myth track but quite good as an early trinket. You are able to pick which secondary stat it gives.",
      addonDescription: "Not available on Myth track but quite good as an early trinket. You are able to pick which secondary stat it gives.",
      effects: [
        {
          duration: 12,
          ppm: 1.5,
          stat: "highest",
        },
      ],
      runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
        let bonus_stats = {};

        //console.log(JSON.stringify(additionalData.selectedOptions));

        const bestStat = player.getHighestStatWeight(additionalData.contentType);
        bonus_stats[bestStat] = runGenericPPMTrinket({...data[0], ...trinketRawData["Drum of Renewed Bonds"][0], stat: bestStat}, itemLevel, player);
  
        return bonus_stats;
      }
  },
    { 
    name: "Gift of Light",
    description: "",
    addonDescription: "",
    effects: [
      {
        duration: 10,
        ppm: 0.9, // 2 ppm with a 1 minute lockout. Weird.
        stat: "mastery",
      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      let bonus_stats: Stats = {};

      bonus_stats.mastery = runGenericPPMTrinket({...data[0], ...trinketRawData["Gift of Light"][0]}, itemLevel);

      return bonus_stats;
    }
  },
        { 
    name: "Crucible of Erratic Energies",
    description: "A powerful crit / leech stat stick that's very overbudget. Includes the world buffs available since they work in raids / dungeons too. You can turn this off in settings.",
    warningFlag: true,
    hasSetting: true,
    addonDescription: "A powerful crit / leech stat stick that's very overbudget. Includes the world buffs available since they work in raids / dungeons too.",
    effects: [
      {
        duration: 10,
        ppm: 4,
        stat: "crit",
      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      let bonus_stats: Stats = {};

      const trinketData = {...data[0], ...trinketRawData["Crucible of Erratic Energies"][0]}

      if (getSetting(additionalData.settings, "crucibleUpgrades") === "Fully Upgraded") {
        trinketData.coefficient *= 1.2; 
        trinketData.duration = 20;
        trinketData.ppm = 5;
      }

      bonus_stats.crit = runGenericPPMTrinket(trinketData, itemLevel);
      bonus_stats.leech = convertPPMToUptime(trinketData.ppm, trinketData.duration) * 2 * STATCONVERSION.LEECH;

      return bonus_stats;
    }
  },
      { 
    name: "Magister's Alchemist Stone",
    description: "High variance, low uptime and uses an embellishment slot. Do not craft.",
    addonDescription: "High variance, low uptime and uses an embellishment slot. Do not craft.",
    effects: [
      {
        coefficient: 2, //0.277491, 
        table: -1,
        duration: 15,
        ppm: 1,
        stat: "intellect",
      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      let bonus_stats: Stats = {};

      bonus_stats.intellect = runGenericPPMTrinket({...data[0], ...trinketRawData["Magister's Alchemist Stone"][0]}, itemLevel);

      return bonus_stats;
    }
  },
        { 
    name: "Galactic Gladiator's Insignia of Alacrity",
    description: "",
    addonDescription: "",
    effects: [
      {
        duration: 20,
        ppm: 1.5,
        stat: "intellect",
      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      let bonus_stats: Stats = {};

      bonus_stats.intellect = runGenericPPMTrinket({...data[0], ...trinketRawData["Galactic Gladiator's Insignia of Alacrity"][0]}, itemLevel);

      return bonus_stats;
    }
  },
  {
      name: "Glorious Crusader's Keepsake",
      description: "Not available on Myth track but quite good as an early trinket - regardless of whether others are also using it.",
      addonDescription: "Not available on Myth track but quite good as an early trinket - regardless of whether others are also using it.",
      effects: [
        {
          duration: 15,
          ppm: 2,
          stat: "highest",
        },
        { // This only fires if you have other people wearing it.
          duration: 15,
          ppm: 2,
          stat: "allyStats",
        },
      ],
      runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
        let bonus_stats = {};

        //console.log(JSON.stringify(additionalData.selectedOptions));

        const bestStat = getHighestStat(additionalData.setStats);
        bonus_stats[bestStat] = runGenericPPMTrinket({...data[0], ...trinketRawData["Glorious Crusader's Keepsake"][0], stat: bestStat}, itemLevel, player);
        //bonus_stats.allyStats = runGenericPPMTrinket({...data[1], ...trinketRawData["Glorious Crusader's Keepsake"][1]}, itemLevel, player);
  
        return bonus_stats;
      }
  },
      {
        name: "Cosmic Bell",
        description: "Does not heal for anywhere CLOSE to enough to be more than bottom tier. ",
        addonDescription: "Does not heal for anywhere CLOSE to enough to be more than bottom tier. ",
        effects: [
          { 
            secondaries: ['versatility', 'crit'],
            cooldown: 150,
            efficiency: {Raid: 0.7, Dungeon: 0.55} //
          },
        ],
        runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
          let bonus_stats: Stats = {};
    
          bonus_stats.hps = runGenericFlatProc({...data[0], ...trinketRawData["Cosmic Bell"][0]}, itemLevel, player, additionalData.contentType)
          return bonus_stats;
        }
      },
      {
        name: "Consecrated Chalice",
        description: "Stacks actually drop outside of combat!",
        addonDescription: "Stacks actually drop outside of combat!",
        effects: [
          { 
            secondaries: ['versatility', 'crit', 'haste'],
            ppm: 5,
            efficiency: {Raid: 0.8, Dungeon: 0.85} //
          },
        ],
        runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
          let bonus_stats: Stats = {};
    
          bonus_stats.hps = runGenericFlatProc({...data[0], ...trinketRawData["Consecrated Chalice"][0]}, itemLevel, player, additionalData.contentType)
          return bonus_stats;
        }
      },
            {
        name: "Tangle of Vibrant Vines",
        description: "Adding a rare G tier to my tier list to handle this monstrosity.",
        addonDescription: "Dreadful.",
        effects: [
          { 
            secondaries: ['haste', 'versatility', 'crit'],
            ppm: 1.5,
            targets: 1,
            efficiency: {Raid: 0.7, Dungeon: 0.55} //
          },
        ],
        runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
          let bonus_stats: Stats = {};
    
          bonus_stats.hps = runGenericFlatProc({...data[0], ...trinketRawData["Tangle of Vibrant Vines"][1]}, itemLevel, player, additionalData.contentType)
          return bonus_stats;
        }
      },
    {
        name: "Ultradon Cuirass",
        description: "A legitimately huge absorb that you could find niche use for, but not generally useful. ",
        addonDescription: "A legitimately huge absorb that you could find niche use for, but not generally useful. ",
        effects: [
          { 
            secondaries: ['versatility'],
            cooldown: 150,
            efficiency: {Raid: 0.7, Dungeon: 0.55} //
          },
        ],
        runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
          let bonus_stats: Stats = {};
    
          bonus_stats.hps = runGenericFlatProc({...data[0], ...trinketRawData["Ultradon Cuirass"][0]}, itemLevel, player, additionalData.contentType)
          return bonus_stats;
        }
      },

  

]