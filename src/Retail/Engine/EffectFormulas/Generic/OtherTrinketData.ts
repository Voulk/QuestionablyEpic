import { convertPPMToUptime, runGenericFlatProc, getSetting, processedValue, runGenericPPMTrinket, runGenericOnUseTrinket, getDiminishedValue, buildIdolTrinket } from "../EffectUtilities";
import { Player } from "General/Modules/Player/Player";

export const otherTrinketData = [
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                        Dreamscape Prism                                        */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
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

      bonus_stats.mana = 48300 * extraPotions / 420 * 0.7; // Rest in peace Chilled Clarity potion. It is very difficult to use this potion on cooldown.


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
        ppf: 1.5,
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
    /*                                         Eye of Blazing Power                                   */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "Eye of Blazing Power",
    effects: [
      {  // Heal effect
        coefficient: 118.3393,
        table: -9,
        secondaries: ['versatility', 'crit'],
        efficiency: 0.85,
        ppm: 60 / 50, // ICD: 45
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
    /*                                     Necromantic Focus                                          */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "Necromantic Focus",
    effects: [
      { // Small Proc
        coefficient: 0.058876 * 0.8, // Nerfed
        table: -7,
      },

    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      let bonus_stats: Stats = {};
      let averageStacks = 0;
      const spec = player.spec;

      if (spec === "Discipline Priest") averageStacks = 10;
      else if (spec === "Holy Paladin") averageStacks = 8.7;
      else if (spec === "Holy Priest" || spec === "Resto Druid" || spec === "Restoration Shaman") averageStacks = 1.5;
      else if (spec === "Mistweaver Monk") averageStacks = 0;
      else if (spec === "Preservation Evoker") {
        const fireBreathCPM = 1.95;
        averageStacks = 20 * 5 * player.getStatPerc('haste') * fireBreathCPM / 60; // duration x average stacks x cpm / 60
      }


      bonus_stats.mastery = processedValue(data[0], itemLevel) * averageStacks;
      return bonus_stats;

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

]