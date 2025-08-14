import { convertPPMToUptime, runGenericFlatProc, getSetting, processedValue, runGenericPPMTrinket, runGenericOnUseTrinket, getDiminishedValue, buildIdolTrinket } from "Retail/Engine/EffectFormulas/EffectUtilities";
import { Player } from "General/Modules/Player/Player";

export const timewalkingTrinketData = [
    {
    name: "Energy Siphon",
    effects: [
      { // 
        coefficient: 2.399108, 
        table: -7,
        duration: 20,
        cooldown: 120,
      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
        let bonus_stats: Stats = {};
        bonus_stats.crit = runGenericOnUseTrinket(data[0], itemLevel, additionalData.castModel);
        return bonus_stats;
    }
  },
  {
    name: "Scale of Fates",
    effects: [
      { // 
        coefficient: 2.39909, 
        table: -7,
        duration: 20,
        cooldown: 120,
      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
        let bonus_stats: Stats = {};
        bonus_stats.haste = runGenericOnUseTrinket(data[0], itemLevel, additionalData.castModel);
        return bonus_stats;
    }
  },
  {
        name: "Living Flame",
        effects: [
          { // 
            coefficient: 2.000788, 
            table: -1,
            duration: 20,
            cooldown: 120,
          },
        ],
        runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
            let bonus_stats: Stats = {};
            bonus_stats.intellect = runGenericOnUseTrinket(data[0], itemLevel, additionalData.castModel);
            return bonus_stats;
        }
  },
    {
        name: "Memento of Tyrande",
        effects: [
            { // Mana proc chance.
            coefficient: 2.03251,
            table: -7,
            ppm: 2.5,
            },
        ],
        runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
            let bonus_stats: Stats = {};

            bonus_stats.mana = processedValue(data[0], itemLevel) * data[0].ppm! / 60 * player.getStatPerc('haste');

            return bonus_stats;
        }
    },
    {
        name: "The Skull of Gul'dan",
        effects: [
          { // (Fel infusion)
            coefficient: 1.815054, 
            table: -7,
            duration: 20,
            cooldown: 120,
          },
        ],
        runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
            let bonus_stats: Stats = {};
            bonus_stats.haste = runGenericOnUseTrinket(data[0], itemLevel, additionalData.castModel);
            return bonus_stats;
        }
      },
      {
        /* ---------------------------------------------------------------------------------------------- */
        /*                                    Spark of Hope                                     */
        /* ---------------------------------------------------------------------------------------------- */
        /* 
        */
        name: "Spark of Hope",
        effects: [
          { // Mastery portion
            coefficient: 0.450353,
            table: -7,
            ppm: {"Restoration Druid": 35-5, "Holy Priest": 14, "Restoration Shaman": 12, "Holy Paladin": 10, "Mistweaver Monk": 12, 
                  "Preservation Evoker": 6, "Discipline Priest": 9} // Relevant casts per minute. Can auto-pull from logs.
          },
        ],
        runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
          let bonus_stats: Stats = {};
          bonus_stats.mana = data[0].ppm[player.spec] * processedValue(data[0], itemLevel) / 60;
          return bonus_stats;
        }
      },
      {
        /* ---------------------------------------------------------------------------------------------- */
        /*                                      Show of Faith                                          */
        /* ---------------------------------------------------------------------------------------------- */
        /* 
        */
        name: "Show of Faith",
        effects: [
          { // 
            coefficient: 1.595796,
            table: -7,
            ppm: 2
          },
        ],
        runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
          let bonus_stats: Stats = {};
          bonus_stats.mana = data[0].ppm * processedValue(data[0], itemLevel) / 60;
          return bonus_stats;
        }
      },
      {
        /* ---------------------------------------------------------------------------------------------- */
        /*                                      Sif's Remembrance                                          */
        /* ---------------------------------------------------------------------------------------------- */
        /* 
        */
        name: "Sif's Remembrance",
        effects: [
          { // 
            coefficient: 1.125146,
            duration: 15,
            table: -1,
            ppm: 2
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
        /*                                        Pandora's Plea                                          */
        /* ---------------------------------------------------------------------------------------------- */
        /* 
        */
        name: "Pandora's Plea",
        effects: [
          { // 
            coefficient: 1.561615,
            duration: 10,
            table: -1,
            ppm: 2
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
        /*                                        Eye of the Broodmother                                          */
        /* ---------------------------------------------------------------------------------------------- */
        /* 100% uptime on full stacks since it procs off everything.
        */
        name: "Eye of the Broodmother",
        effects: [
          { // 
            coefficient: 0.10503,
            duration: 10,
            stacks: 5,
            table: -1,
          },
        ],
        runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
          let bonus_stats: Stats = {};
          bonus_stats.intellect = processedValue(data[0], itemLevel) * data[0].stacks!;
          return bonus_stats;
        }
      },
      { // Stacks once per spell cast for the rest of the duration.
        name: "Burst of Knowledge",
        effects: [
          { // 469925
            coefficient: 0.137649, 
            table: -1,
            duration: 20,
            cooldown: 120,
          },
        ],
        runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
            let bonus_stats: Stats = {};

            const averageStacks = 20 / (1.5 / player.getStatPerc('haste'));
            const intPerStack = processedValue(data[0], itemLevel);

            bonus_stats.intellect = averageStacks * intPerStack * data[0].duration! / data[0].cooldown!;

            
            return bonus_stats;
        }
      },
      { // Standard heal proc trinket
        name: "Bottled Magma",
        description: "Bog standard healing proc trinket.",
        effects: [
          {
            coefficient: 42.78218, 
            table: -9,
            efficiency: 0.9,
            secondaries: ["crit", "haste", "versatility"], // Crit untested, haste in PPM scaling
            ppm: 3,
          },
        ],
        runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
          let bonus_stats: Stats = {};
    
          bonus_stats.hps = runGenericFlatProc(data[0], itemLevel, player, additionalData.contentType);
    
          return bonus_stats;
        }
      },
      {
        name: "Second Wind",
        effects: [
            { // Mana proc chance.
              coefficient: 2.240427,
              table: -1,
              cooldown: 300,
              ticks: 10,
            },
        ],
        runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
            let bonus_stats: Stats = {};

            bonus_stats.mana = processedValue(data[0], itemLevel) * data[0].ticks / data[0].cooldown!;

            return bonus_stats;
        }
    },


]