import { Player } from "General/Modules/Player/Player";
import { convertPPMToUptime, getSetting, processedValue, runGenericPPMTrinket, runGenericFlatProc, convertPPMToUptimeExtended, runGenericOnUseTrinket, forceGenericOnUseTrinket, runGenericPPMOverlapTrinket, runGenericRandomPPMTrinket } from "../../EffectUtilities";
import { setBounds } from "General/Engine/CONSTRAINTS"
import trinketRawData from "Retail/Engine/EffectFormulas/Generic/Trinkets/TrinketData.json"

// Note that raid trinket data is stored here. For other trinket data, see the dungeon, timewalking and other trinket data files.
export const raidTrinketData = [
  { //
    /*
      Effects
      - 

    */
    id: 270164,
    name: "Gebbo's Bottomless Bag",
    description: "",
    addonDescription: "",
    effects: [
    { // Crit Proc (S1) that increases every second + self-DoT (S5) - Seriously Sharp Seashell. Peaks at 652
        stat: "crit",
        duration: 12,
        ppm: 3,
    },
    { // Vers proc (S2) that removes S8 every time you cast - Brittle Torga Totem e.g 709
        stat: "versatility",
        ppm: 3,
    },
    { // Mastery Proc (S3) that diminishes over its duration - Tattered Tortollan Scroll
        stat: "mastery",
        ppm: 3,
        duration: 12,
    },
    { // Haste Proc (S4) that also gives speed - Slick and Slimy Gralstone. E.g 355
        stat: "haste",
        ppm: 3,
        duration: 12,
    },
    { // All secondaries (S6) - 50lb Midnight Salmon - 222 x 4
        stat: "all",
        ppm: 3,
        duration: 12,
    },
    { // All secondaries reduced (S7) - Rotting Voidfin
        stat: "all",
        ppm: 3,
        duration: 12,
    },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
        let bonus_stats: Stats = {};

        const buffShare = 1/6 * data[0].ppm! * 1.13;;

        // Vers portion
        const versBuff = processedValue({...data[1], ...trinketRawData["Gebbo's Bottomless Bag"][1]}, itemLevel);
        const versLossPerCast = processedValue({...data[1], ...trinketRawData["Gebbo's Bottomless Bag"][7]}, itemLevel);
        bonus_stats.versatility = versBuff / versLossPerCast * 1.2 / 60 * (versBuff / 2) * buffShare;

        // Crit portion
        const critBuff = processedValue({...data[0], ...trinketRawData["Gebbo's Bottomless Bag"][0]}, itemLevel);
        const averageCritStacks = data[0].duration! / 2;
        bonus_stats.crit = averageCritStacks * critBuff * data[0].duration! / 60 * buffShare;

        // Haste portion
        const hasteBuff = processedValue({...data[3], ...trinketRawData["Gebbo's Bottomless Bag"][3]}, itemLevel);
        bonus_stats.haste = hasteBuff * data[3].duration! / 60 * buffShare;

        // Mastery portion
        const masteryBuff = processedValue({...data[2], ...trinketRawData["Gebbo's Bottomless Bag"][2]}, itemLevel);
        bonus_stats.mastery = masteryBuff * data[2].duration! / 60 * buffShare / 2;
       
        // All stats portion
        const allBuff = processedValue({...data[4], ...trinketRawData["Gebbo's Bottomless Bag"][5]}, itemLevel);
        const allBuffAverage = allBuff * data[4].duration! / 60 * buffShare;

        const rottingFin = processedValue({...data[5], ...trinketRawData["Gebbo's Bottomless Bag"][5]}, itemLevel);
        const rottingAverage = rottingFin * data[5].duration! / 60 * buffShare;

        console.log(allBuffAverage, rottingAverage);
        bonus_stats.crit += allBuffAverage - rottingAverage;
        bonus_stats.haste += allBuffAverage - rottingAverage;
        bonus_stats.mastery += allBuffAverage - rottingAverage;
        bonus_stats.versatility += allBuffAverage - rottingAverage;

        return bonus_stats;
    }
  },
  { // -- Can gain stacks while the active is going.
        name: "Hex Lord's Dooming Idol",
        description: "",
        effects: [
          {  // Passive Int loss
          },
          {  // On-use Int
            duration: 30,
            cooldown: 30, // Technically 20
          },

        ],
        runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
          let bonus_stats: Stats = {};

          bonus_stats.intellect = processedValue({...data[1], ...trinketRawData["Hex Lord's Dooming Idol"][1]}, itemLevel) * 5; // You can keep 5 stacks at all times.

          const intellectDeduction = processedValue({...data[0], ...trinketRawData["Hex Lord's Dooming Idol"][0]}, itemLevel)
          bonus_stats.intellect -= intellectDeduction * 2.5;
    
          return bonus_stats;
        }
  },
  { //
    id: 270167,
    name: "Wavecaller's Seastone",
    description: "",
    addonDescription: "",
    effects: [
    { // Stat Proc Portion
        stat: "intellect",
        duration: 12,
        ppm: 2,
    },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
        let bonus_stats: Stats = {};

        const averageStacks = 3;

        bonus_stats.intellect = processedValue({...data[0], ...trinketRawData["Wavecaller's Seastone"][0]}, itemLevel) * averageStacks;

        return bonus_stats;
    }
    },
    {
      name: "Preternatural Antivenom",
      description: "",
      setting: true,
      addonDescription: "",
      effects: [
        { 
          secondaries: ['haste', 'versatility'],
          ppm: 2.5,
          targets: 1, // Heals for more per healed ally, up to 5.
          //efficiency: {Raid: 0.9, Dungeon: 0.55}, //
        },
      ],
      runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
        let bonus_stats: Stats = {};

        bonus_stats.hps = runGenericFlatProc({...data[0], ...trinketRawData["Preternatural Antivenom"][0]}, itemLevel, player, additionalData.contentType);
        
        return bonus_stats;
      }
    },
    {
          name: "Soulcoiler Ritual Vessel",
          description: "",
          setting: true,
          addonDescription: "",
          
          effects: [
            { 
              secondaries: ['versatility'],
              cooldown: 120,
              targets: 5, // Heals for more per healed ally, up to 5.
              //efficiency: {Raid: 0.9, Dungeon: 0.55}, //
            },
          ],
          runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
            let bonus_stats: Stats = {};

      
            bonus_stats.hps = runGenericFlatProc({...data[0], ...trinketRawData["Soulcoiler Ritual Vessel"][0]}, itemLevel, player, additionalData.contentType);
            

            return bonus_stats;
          }
        },
      { //
        id: 249809,
        name: "Sporelord's Mycelial Insignia",
        description: "",
        addonDescription: "",
        effects: [
        { // Stat Proc Portion
            stat: "random",
            duration: 12,
            ppm: 2,
        },
        ],
        runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
            let bonus_stats: Stats = {};

            bonus_stats = runGenericRandomPPMTrinket({...data[0], ...trinketRawData["Sporelord's Mycelial Insignia"][0]}, itemLevel, additionalData.setStats);
            bonus_stats.leech = runGenericPPMTrinket({...data[0], ...trinketRawData["Sporelord's Mycelial Insignia"][0], stat: "leech"}, itemLevel, additionalData.setStats)


            return bonus_stats;
            }
    },
  {
        name: "Litany of Lightblind Wrath",
        description: "An awkward to use but numerically powerful healer trinket option. Should be easier to obtain than other S-tier trinkets, just remember to press it close to its cooldown to maximize value.",
        addonDescription: "An awkward to use but numerically powerful healer trinket option. Should be easier to obtain than other S-tier trinkets, just remember to press it close to its cooldown to maximize value.",
        effects: [
          {  // Damage Effect - Need to check if it double dips Vers
            secondaries: ['crit', 'versatility'],
            cooldown: 90,
            efficiency: 0.87, // Unlikely to be able to use it perfectly on CD.
            ticks: 5,
          },
          
        ],
        runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
          let bonus_stats: Stats = {};
    
          let dps = runGenericFlatProc({...data[0], ...trinketRawData["Litany of Lightblind Wrath"][0]}, itemLevel, player, additionalData.contentType)
          if (["Holy Paladin"].includes(player.spec) && additionalData.contentType === "Raid") dps = 0;
          else if (player.spec === "Restoration Shaman" && additionalData.contentType === "Raid") dps *= 0.6
          else if (["Preservation Evoker", "Restoration Druid"].includes(player.spec) && additionalData.contentType === "Raid") dps *= 0.7; // These specs can use it on more targets in raid, but it's still not amazing for them.

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
        description: "Gaze is a dominant trinket option that has been changed many times over the current patch. It's assumed there won't be further changes.",
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
            const stacksPerMinute = specData[player.spec] * data[0].ppm * 1.13;

            if (additionalData.includeTooltip) additionalData.tooltipData.push({name: "Expected Stacks per Proc", value: specData[player.spec]})

            
            bonus_stats.intellect = stacksPerMinute / 60 * processedValue(trinketRawData["Gaze of the Alnseer"][0], itemLevel, 1, "ceil") * data[0].duration;

            return bonus_stats;
        }
  },
    { //
        id: 249809,
        name: "Locus-Walker's Ribbon",
        description: "Good in Mythic+ (even if stacks drop often) but truly shines in raid.",
        addonDescription: "Good in Mythic+ (even if stacks drop often) but truly shines in raid.",
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

            if (additionalData.includeTooltip) {
              additionalData.tooltipData.push({name: "Time to Max Stacks", value: Math.round(100 * timeToMax)/100 + " minutes"})
              additionalData.tooltipData.push({name: "Average Stacks", value: Math.round(100 * averageStacks)/100})
            }


            return bonus_stats;
            }
    },
    { //
        id: 249341,
        name: "Volatile Void Suffuser",
        description: "A reasonable stat stick that can be very powerful if your raid isn't frequently at full health.",
        addonDescription: "A reasonable stat stick that can be very powerful if your raid isn't frequently at full health.",
        setting: true,
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
            const averageRaidHealth = getSetting(additionalData.settings, "averageRaidHealth") / 100; // Can we just put this in settings maybe?
            bonus_stats.intellect *= (1 + (1 - averageRaidHealth));

            if (additionalData.includeTooltip) additionalData.tooltipData.push({name: "Average Raid Health (Adjustable)", value: `${getSetting(additionalData.settings, "averageRaidHealth")}%`})

            return bonus_stats;
            }
    },
        {
          name: "Light of the Cosmic Crescendo",
          description: "A good trinket, but highly dependent on doing difficult content where your raid drops below 60% often.",
          setting: true,
          addonDescription: "A good trinket, but highly dependent on doing difficult content where your raid drops below 60% often.",
          
          effects: [
            { // Damage effect. NYI.
              secondaries: ['haste', 'versatility', 'crit'],
              ppm: 5,
            },
            { 
              secondaries: ['haste', 'versatility', 'crit'],
              ppm: 5, 
              targets: 2.5, // Heals for more per healed ally, up to 5.
              //efficiency: {Raid: 0.9, Dungeon: 0.55}, //
            },
          ],
          runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
            let bonus_stats: Stats = {};

            const usageRate = getSetting(additionalData.settings, "cosmicCrescendoUsage") / 100;
      
            bonus_stats.hps = runGenericFlatProc({...data[1], ...trinketRawData["Light of the Cosmic Crescendo"][1]}, itemLevel, player, additionalData.contentType) * (usageRate || 0.7)
            
            if (additionalData.includeTooltip) {
              additionalData.tooltipData.push({name: "Stacks Consumed (Adjustable)", value: usageRate})
            }

            return bonus_stats;
          }
        },


];
