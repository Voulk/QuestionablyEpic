import { convertPPMToUptime, processedValue, runGenericPPMTrinket, forceGenericOnUseTrinket, runGenericRandomPPMTrinket, runGenericOnUseTrinket, getHighestStat, runGenericPPMTrinketHasted, runGenericFlatProc } from "../EffectUtilities";

export const effectData = [
    { 
    name: "Voidglass Shards", // Shards of the Void
    effects: [
      {
        coefficient: 55.44585, 
        table: -9,
        ppm: 2.5,
        secondaries: ['haste', 'versatility'], // Check Crit
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};
      //console.log(processedValue(data[0], 571));
      let mult = 1;
      if (additionalData.setVariables && additionalData.setVariables.hasVoidcore) { 
        mult *= (3 * 0.6 + 0.4);
      }


      bonus_stats.hps = runGenericFlatProc(data[0], itemLevel, player) * mult;
      console.log("Voidglas S: " + bonus_stats.hps);

      return bonus_stats;
    },
  },
    { 
    name: "Reshii Wraps",
    effects: [
      {
        coefficient: 75.3012, 
        table: -9,
        ppm: 2,
        efficiency: 0.95, // Converts to absorb so high efficiency.
        secondaries: ['haste', 'crit', 'versatility'], // Check Crit
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};
      //console.log(processedValue(data[0], 571));

      bonus_stats.hps = runGenericFlatProc(data[0], itemLevel, player); 

      if (additionalData.setVariables && additionalData.setVariables.reshiiBoots) { 
        bonus_stats.hps *= (1 + additionalData.setVariables.reshiiBoots);
      }
      console.log("Reshii Wraps: " + bonus_stats.hps);

      return bonus_stats;
    },
  },
  { // Settings for number of Signetbearers in party? This is party only, not raid wide.
    name: "Neural Synapse Enhancer",
    effects: [
      {
        coefficient: 1.792, 
        table: -1,
        duration: 15,
        cooldown: 45,
        stat: "intellect",
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      bonus_stats.intellect = forceGenericOnUseTrinket(data[0], itemLevel, additionalData.castModel, 60);
      return bonus_stats;
    }
  },
  { 
    name: "Voltaic Stormcaller",
    effects: [
      {
        coefficient: 0.764501, 
        stat: "haste",
        table: -7,
        duration: 10,
        ppm: 1,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      bonus_stats.haste = runGenericPPMTrinket(data[0], itemLevel);

      if (player.spec !== "Discipline Priest" && additionalData.contentType === "Raid") {
        bonus_stats.haste = bonus_stats.haste * 0.5; // DPS procs only
      }

      return bonus_stats;
    }
  },
  {
    name: "The Jastor Diamond",
    effects: [
      {
        coefficient: 0.048536, 
        table: -7,
        maxStacks: 10,
        stat: "random",
        averageStacks: 5.15, // This is just simulated directly since the Jastor parameters are fixed.
        averageGifted: 1.2, // Also simulated
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};
      const statsPerStack = processedValue(data[0], itemLevel);

      const totalPersonalStats = statsPerStack * data[0].averageStacks;

      bonus_stats.versatility = totalPersonalStats / 4;
      bonus_stats.haste = totalPersonalStats / 4;
      bonus_stats.crit = totalPersonalStats / 4;
      bonus_stats.mastery = totalPersonalStats / 4;

      bonus_stats.allyStats = statsPerStack * data[0].averageGifted;
      
      return bonus_stats;
    }
  },
  {
    name: "Best-in-Slots",
    effects: [
      {
        coefficient: 1.374509, 
        table: -7,
        stat: "random",
        duration: 15,
        ppm: 3 * 0.875, // Can't proc while on-use is active.
      },
      {
        coefficient: 1.374509 * 1.1, // The on-use is 10% higher. 
        table: -7,
        stat: "best",
        duration: 15,
        cooldown: 120,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};
      bonus_stats = runGenericRandomPPMTrinket(data[0], itemLevel)

      Object.keys(bonus_stats).forEach((key) => {
        // Ultimately healers just do not get full uptime from this and Evoker sees barely more than a proc per fight.
        if (player.spec === "Preservation Evoker") bonus_stats[key] = bonus_stats[key] * 0.25; 
        else bonus_stats[key] = bonus_stats[key] * 0.5; //
      });

      // On use portion
      const bestStat = player.getHighestStatWeight(additionalData.contentType)
      bonus_stats[bestStat] = (bonus_stats[bestStat] || 0) + runGenericOnUseTrinket({...data[1], stat: bestStat}, itemLevel, additionalData.castModel);

      return bonus_stats;
    }
  },
  { 
    name: "Lingering Grace",
    effects: [
      {
        coefficient: 57.11988067627, 
        table: -8,
        ppm: 3,
        secondaries: ['haste', 'crit', 'versatility'], // Check Crit
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};
      //console.log(processedValue(data[0], 571));

      bonus_stats.hps = runGenericFlatProc(data[0], 571, player) * 0.65; // Appears to be a flat item level but will need to be checked.

      return bonus_stats;
    },
  },
  { 
    name: "Guiding Stave of Wisdom",
    effects: [
      {
        coefficient: 1.469991, 
        table: -7,
        ppm: 2,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};
      bonus_stats = runGenericRandomPPMTrinket(data[0], itemLevel);

      return bonus_stats;
    }
  },
  { // This is a channel so kind of awful. I don't see why you would ever wear this.
    name: "Circle of Flame",
    effects: [
      { 
        coefficient: 2.105363,
        table: -7,
        cooldown: 60,
        ticks: 10,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      return bonus_stats;
    }
  },
  {
    name: "Fateweaved Needle",
    effects: [
      {  // Int
        coefficient: 0.611248, //1.440925,
        table: -1,
        ppm: 2,
        duration: 5,
      },
      {  // DPS
        coefficient: 35.653 * 0.66,
        table: -9,
        ppm: 2,
        secondaries: ["crit", "haste", "versatility"]
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};
      
      const intValue = runGenericPPMTrinket(data[0], itemLevel);
      bonus_stats.intellect = intValue;
      bonus_stats.allyStats = intValue;

      bonus_stats.dps = runGenericFlatProc(data[1], itemLevel, player);

      return bonus_stats;
    }
  },
  {

    name: "Sureki Zealot's Insignia",
    effects: [
      {  // Versatility
        coefficient: 0.139572 * 0.5,
        table: -7,
        ppm: 4,
        duration: 10,
      },
      {  // Mana
        value: 6500, // Yeah they just hard coded this one in.
        ppm: 4,

      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      // Review logs but given this procs off healing received but not your own there's a decent chance we do lose a little value.
      const versAvg = runGenericPPMTrinket(data[0], itemLevel) * 0.9;
      bonus_stats.versatility = versAvg;
      bonus_stats.allyStats = versAvg;


      // This mana is technically distributed through the raid but it's fairly reasonable to value it as our own with a penalty.
      bonus_stats.mana = data[1].value * data[1].ppm / 60 * 0.7;
    
      return bonus_stats;
    }
  },
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