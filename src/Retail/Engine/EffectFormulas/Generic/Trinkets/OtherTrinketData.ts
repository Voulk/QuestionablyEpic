import { convertPPMToUptime, runGenericFlatProc, getSetting, processedValue, runGenericPPMTrinket, getHighestStat, forceGenericOnUseTrinket, runGenericOnUseTrinket, getDiminishedValue, buildIdolTrinket, runGenericRandomPPMTrinket } from "Retail/Engine/EffectFormulas/EffectUtilities";
import { Player } from "General/Modules/Player/Player";
import trinketRawData from "Retail/Engine/EffectFormulas/Generic/Trinkets/TrinketData.json"
import { STATCONVERSION } from "General/Engine/STAT"

export const otherTrinketData = [
        { 
    name: "Crucible of Erratic Energies",
    description: "A fantastic crit / leech stat stick. The extra text about empowering the trinket only works in Voidstorm and ",
    addonDescription: "",
    effects: [
      {
        duration: 10,
        ppm: 4,
        stat: "crit",
      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      let bonus_stats: Stats = {};

      bonus_stats.crit = runGenericPPMTrinket({...data[0], ...trinketRawData["Crucible of Erratic Energies"][0]}, itemLevel);
      bonus_stats.leech = convertPPMToUptime(data[0].ppm, data[0].duration) * 2 * STATCONVERSION.LEECH;

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