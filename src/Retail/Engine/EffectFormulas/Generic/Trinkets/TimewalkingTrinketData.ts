import { convertPPMToUptime, runGenericFlatProc, getSetting, processedValue, runGenericPPMTrinket, runGenericOnUseTrinket, getDiminishedValue, buildIdolTrinket } from "Retail/Engine/EffectFormulas/EffectUtilities";
import { Player } from "General/Modules/Player/Player";

export const timewalkingTrinketData = [
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


]