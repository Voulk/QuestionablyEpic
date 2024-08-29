import { convertPPMToUptime, processedValue, runGenericPPMTrinket, getHighestStat } from "../EffectUtilities";

export const effectData = [
  {

    name: "Voltaic Stormcaller",
    effects: [
      {  // DPS
        coefficient: 43.5994,
        table: -8,
        ppm: 1,
      },
      {  // Haste
        coefficient: 0.764501,
        table: -7,
        ppm: 1,
        duration: 10,

      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};
    

      return bonus_stats;
    }
  },

  // Dragonflight
  {

    name: "String of Delicacies",
    effects: [
      { 
        coefficient: 0.392073,
        table: -72,
        ppm: 2,
        alliesHit: 4,
        duration: 10,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};
      
      // We split the mastery formula here because we'll lose some personal value from procs overlapping which is much less likely for our allies (since it's likely to apply to others).
      const mastValue = processedValue(data[0], itemLevel) * data[0].ppm * data[0].duration / 60;
      bonus_stats.mastery = runGenericPPMTrinket(data[0], itemLevel);
      bonus_stats.allyStats = mastValue * data[0].alliesHit;

      return bonus_stats;
    }
  },
  {
    /* -------------------- */
    /* Crystal Spire of Karabor                       
    /* -------------------- */
    /* Healing spells have a chance to do more healing
    */
    name: "Crystal Spire of Karabor",
    effects: [
      { 
        coefficient: 16.3376,
        table: -9,
        efficiency: 0.6,
        ppm: 8,
        secondaries: ['crit', 'versatility'],
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};
      bonus_stats.hps = processedValue(data[0], itemLevel, data[0].efficiency) * player.getStatMults(data[0].secondaries) * data[0].ppm / 60;

      return bonus_stats;
    }
  },
  {
    /* -------------------- */
    /* Imbued Frostweave Slipper (Spirit)                  
    /* -------------------- */
    /* Capped?
    */
    name: "Imbued Frostweave Slippers",
    effects: [
      { 
        coefficient: 0.040201,
        table: -1,
        ppm: 60, // Ticks every second.
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      bonus_stats.mana = processedValue(data[0], 415); // This effect is capped 
      return bonus_stats;
    }
  },
{
    /* -------------------- */
    /* Assembly Preserver's Band                       
    /* -------------------- */
    /* Heal proc on a Cobolt Assembly ring.
    */
    name: "Assembly Preserver's Band",
    effects: [
      { 
        coefficient: 98.46344,
        table: -9,
        efficiency: 0.45,
        ppm: 2,
        secondaries: ['crit', 'versatility'],
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};
      bonus_stats.hps = processedValue(data[0], itemLevel, data[0].efficiency) * player.getStatMults(data[0].secondaries) * data[0].ppm / 60;

      return bonus_stats;
    }
  },
  {
    /* -------------------- */
    /* Assembly Guardian's Band                      
    /* -------------------- */
    /* This is the "Tank" version of the ring. It's a self-absorb but is tuned a little higher than the heal ring.
    */
    name: "Assembly Guardian's Ring",
    effects: [
      { 
        coefficient: 183.679,
        table: -9,
        efficiency: {Raid: 0.7, Dungeon: 0.45},
        ppm: 2,
        secondaries: ['versatility'],
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};
      bonus_stats.hps = processedValue(data[0], itemLevel, data[0].efficiency[additionalData.contentType]) * player.getStatMults(data[0].secondaries) * data[0].ppm / 60;

      return bonus_stats;
    }
  },
  {
    /* -------------------- */
    /* Seal of Filial Duty                  
    /* -------------------- */
    /* An absorb ring that procs off dealing Fire damage.
    */
    name: "Seal of Filial Duty",
    effects: [
      { 
        coefficient: 86.2502,
        table: -9,
        efficiency: {Raid: 0.7, Dungeon: 0.45},
        ppm: 2,
        specValue: { "Restoration Druid": 0, "Preservation Evoker": 1, "Discipline Priest": 1, "Holy Paladin": 0, "Mistweaver Monk": 0, "Restoration Shaman": 0.2, "Holy Priest": 0 },
        secondaries: ['versatility', 'haste'],
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      const fireEfficiency = Math.max(additionalData.settings.fireMult || 0, data[0].specValue[additionalData.player.spec]) 

      bonus_stats.hps = processedValue(data[0], itemLevel, data[0].efficiency[additionalData.contentType]) * player.getStatMults(data[0].secondaries) * data[0].ppm * fireEfficiency / 60;

      return bonus_stats;
    }
  },
  {
    /* -------------------- */
    /* Seal of Diurna's Chosen                 
    /* -------------------- */
    /* A DPS ring that procs off Fire damage.
    */
    name: "Seal of Diurna's Chosen",
    effects: [
      { 
        coefficient: 11.33085,
        table: -9,
        ppm: 2,
        specValue: { "Restoration Druid": 0, "Preservation Evoker": 1, "Discipline Priest": 1, "Holy Paladin": 0, "Mistweaver Monk": 0, "Restoration Shaman": 0.2, "Holy Priest": 0 },
        secondaries: ['versatility', 'haste'],
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};
      bonus_stats.dps = processedValue(data[0], itemLevel) * player.getStatMults(data[0].secondaries) * data[0].ppm * data[0].specValue[additionalData.player.spec] / 60;

      return bonus_stats;
    }
  },
  {
    /* -------------------- */
    /* Drakebreaker's Versatility                       
    /* -------------------- */
    /* Flat Versatility. We don't need to do anything fancy for it, just return 105 vers.
    */
    name: "Drakebreaker's Versatility",
    effects: [
      { 

      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};
      bonus_stats.versatility = 105;

      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                 Primal Storms 2pc                                              */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "Primal Storms 2pc",
    effects: [

    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};
      // TODO
      const highestSecondary = getHighestStat(additionalData.setStats);

      bonus_stats[highestSecondary] = 340;

      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                 Nasz'uro, the Unbound Legacy                                              */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "Nasz'uro, the Unbound Legacy",
    effects: [
      { 
        coefficient: 0.377525,
        table: -1,
        duration: 10,
        ppm: 6.5,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};
      // TODO

      const totalStatGain = processedValue(data[0], itemLevel) * data[0].duration * data[0].ppm / 60
      bonus_stats.intellect = totalStatGain * 0.7; // We'll assume we get about half the uptime, and our allies get about half the uptime. 
      bonus_stats.allyStats = totalStatGain * 0.3;

      return bonus_stats;
    }
  },

]