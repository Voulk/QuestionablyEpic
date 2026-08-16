import Player from "General/Modules/Player/Player";
import { convertPPMToUptime, getHighestStat, runGenericFlatProc, getSetting, forceGenericOnUseTrinket, processedValue, runGenericPPMTrinket, runGenericRandomPPMTrinket, runGenericOnUseTrinket, getDiminishedValue, runDiscOnUseTrinket, runGenericPPMTrinketHasted, runGenericPPMOverlapTrinket, runGenericRandomOnUseTrinket } from "../../EffectUtilities";
import trinketRawData from "Retail/Engine/EffectFormulas/Generic/Trinkets/TrinketData.json"
import { itemLevels } from "Databases/ItemLevelsDB";

export const dungeonTrinketData = 
[
  { // 
        name: "Vile Vial of Volatile Venom",
        description: "Just not particularly appealing",
        addonDescription: "",
        effects: [
          { // Random stat gain
            duration: 15,
            cooldown: 120, //
            stat: "random",
          },
          { // Random stat loss
            duration: 15,
            cooldown: 120, //
            stat: "random",
          },
        ],
        runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
          let bonus_stats: Stats = {};
    
          const deduction = {...data[1], ...trinketRawData["Vile Vial of Volatile Venom"][5]}
          const processedDeduction = processedValue(deduction, itemLevel) * deduction.duration! / deduction.cooldown!;

          //bonus_stats.intellect = processedValue(data[0], itemLevel) * data[0].duration / data[0].cooldown; // These stacks can overlap so there should be no proc munching.
          bonus_stats = runGenericRandomOnUseTrinket({...data[0], ...trinketRawData["Vile Vial of Volatile Venom"][0]}, itemLevel, additionalData.castModel, additionalData.setStats);
          
          ["versatility", "crit", "mastery", "haste"].forEach((statName : string) => {
            bonus_stats[statName] += processedDeduction / 4;
          });

          return bonus_stats;
        }
      },
    {
      name: "Preternatural Antivenom",
      description: "Will be good if it gets a nice 200% buff",
      addonDescription: "",
      effects: [
        {  // HoT effect
          secondaries: ['haste', 'crit', 'versatility'],
          ppm: 2.5,
          efficiency: 0.95 //
        },
        
      ],
      runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
        let bonus_stats: Stats = {};
  
        bonus_stats.hps = runGenericFlatProc({...data[0], ...trinketRawData["Preternatural Antivenom"][0]}, itemLevel, player, additionalData.contentType)

        return bonus_stats;
      }
    },
    {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                  Kyrakka's Searing Embers                                      */
    /* ---------------------------------------------------------------------------------------------- */

    name: "Kyrakka's Searing Embers",
    description: "Disastrous",
    effects: [
      { // Healing Portion
        secondaries: ['haste', 'crit', 'versatility'],
        ppm: 4,
        efficiency: 0.7, // Our expected overhealing.
      },
      { // Damage portion
        // Damage is split, so we don't need any kind of target multiplier in here.
        secondaries: ['haste', 'crit', 'versatility'],
        ppm: 4,
      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      let bonus_stats: Stats = {};

      bonus_stats.hps = runGenericFlatProc({...data[0], ...trinketRawData["Kyrakka's Searing Embers"][0]}, itemLevel, player, additionalData.contentType)
      bonus_stats.dps = runGenericFlatProc({...data[1], ...trinketRawData["Kyrakka's Searing Embers"][1]}, itemLevel, player, additionalData.contentType)

      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                        Ruby Whelp Shell                                        */
    /* ---------------------------------------------------------------------------------------------- */

    name: "Ruby Whelp Shell",
    description: "CHART DEFAULT IS UNTRAINED. Can be trained over 6 days in order to proc one of its 6 effects more frequently. There's a setting in QE Live for this and it will impact its value.",
    setting: true,
    warningFlag: true,
    effects: [
      { // ST Damage Portion
        secondaries: ['crit', 'versatility'],
        ppm: 1.01,
      },
      { // AoE Damage Portion
        secondaries: ['crit', 'versatility'],
        ppm: 1.01,
      },
      { // Healing Portion - Single Target Heal
        //coefficient: 198.7088,
        //table: -9,
        secondaries: ['crit', 'versatility'],
        ppm: 1.01,
        efficiency: 0.6, // Our expected overhealing.
      },
      { // Healing Portion - Mending Breath (AoE)
        //coefficient: 165.5901,
        //table: -9,
        secondaries: ['crit', 'versatility'],
        ppm: 1.01,
        targets: 3.2,
        efficiency: 0.45, // Our expected overhealing. It's extremely high for this and it can also just whiff and hit pets. 
      },
      { // Crit Stat Buff (Sleepy Ruby Warmth)
        //coefficient: 2.661627,
        //table: -7,
        ppm: 1.01,
        stat: "crit",
        duration: 12,
      },
      { // Haste Stat Buff (Under Ruby Wings)
        // Like other mega haste buffs, some specs are unable to take advantage of it in a useful way. 
        //coefficient: 2.903762,
        //table: -7,
        stat: "haste",
        ppm: 1.01,
        duration: 12,
        //specMult: {"Preservation Evoker": 0.5, "Restoration Druid": 0.8, "Holy Paladin": 0.67, "Mistweaver Monk": 0.8, "Restoration Shaman": 0.65, "Holy Priest": 0.7, "Discipline Priest": 0.7},
      },

    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      
      let bonus_stats: Stats = {};
      const setStats = additionalData.setStats;
      const updatedData = data.map((effect, index) => {
        return {...effect, ...trinketRawData["Ruby Whelp Shell"][index]};
      });
      
      const bigProc = 0.75; // This is likely to be an underestimation but it's better to be cautious until we have more data.
      const smallProc = (1 - bigProc) / 5;

       let procRates = {
        "ST Heal": smallProc,
        "AoE Heal": smallProc,
        "ST Damage": smallProc,
        "AoE Damage": smallProc,
        "Crit": smallProc,
        "Haste":  smallProc,
      }

      // We still require more data using fully trained dragons to lock down specific ratios of abilities
      const whelpSetting = getSetting(additionalData.settings, "rubyWhelpShell");

      if (whelpSetting && whelpSetting !== "Untrained") {
        procRates[whelpSetting] = bigProc;
      }
      else {
          procRates["AoE Heal"] = 0.1667; 
          procRates["ST Heal"] = 0.1667; 
          procRates["ST Damage"] = 0.1667; 
          procRates["AoE Damage"] = 0.1667; 
          procRates["Crit"] = 0.1667; 
          procRates["Haste"] = 0.1667;
      }

      // ST Heal
      bonus_stats.hps = runGenericFlatProc(updatedData[2], itemLevel, player, additionalData.contentType) * procRates["ST Heal"];

      // AoE Heal
      bonus_stats.hps += runGenericFlatProc(updatedData[3], itemLevel, player, additionalData.contentType) * procRates["AoE Heal"]; // Might need sqrt data. TODO.
      // processedValue(data[1], itemLevel, data[1].efficiency * procRates["AoE Heal"]) * player.getStatMults(data[1].secondaries) * (Math.sqrt(1 / data[1].targets) * data[1].targets) * data[0].ppm / 60;
      
      // Crit Proc
      bonus_stats.crit = runGenericPPMTrinket(updatedData[4], itemLevel, setStats) * procRates["Crit"];
      // Haste Proc
      bonus_stats.haste = runGenericPPMTrinket(updatedData[5], itemLevel, setStats) * procRates["Haste"]// * data[3].specMult[player.spec];

      // ST DPS and AoE DPS TODO
      //bonus_stats.dps = processedValue(data[1], itemLevel) * player.getStatMults(data[1].secondaries) * data[1].ppm / 60;

      return bonus_stats;
    }
  },
    { //
        id: 193718,
        name: "Emerald Coach's Whistle",
        description: "Nerfed! Still an ok support trinket but no longer a frontrunner.",
        addonDescription: "Nerfed! Still an ok support trinket but no longer a frontrunner.",
        effects: [
        { // Stat Proc Portion
            stat: "mastery",
            duration: 10,
            ppm: 1.9,
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
          secondaries: ['versatility', 'crit', 'haste'],
          ppm: 25 * (45 / 180), // Only active while the trinket is up which is 45/180 of the time.
          efficiency: {Raid: 0.8, Dungeon: 0.65} //
        },
      ],
      runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
        let bonus_stats: Stats = {};
  
        bonus_stats.hps = runGenericFlatProc({...data[0], ...trinketRawData["Echo of L'ura"][0]}, itemLevel, player, additionalData.contentType)

        if (additionalData.includeTooltip) {
          additionalData.tooltipData.push({name: "Expected Overhealing", value: data[0].efficiency[additionalData.contentType!]})

        }

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
      description: "Extremely undertuned. Quite bad even if you proc the extra heal every time.",
      addonDescription: "",
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
      name: "Radiant Sunstone",
      description: "Doesn't include the extra heal portion which is currently undertested.",
      addonDescription: "Doesn't include the extra heal portion which is currently undertested.",
      effects: [
        {  // HoT effect
          secondaries: ['crit', 'versatility'],
          cooldown: 120,
          efficiency: 0.7 //
        },
        
      ],
      runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
        let bonus_stats: Stats = {};
  
        bonus_stats.hps = runGenericFlatProc({...data[0], ...trinketRawData["Radiant Sunstone"][0]}, itemLevel, player, additionalData.contentType)
        //bonus_stats.hps += runGenericFlatProc({...data[1], ...trinketRawData["Radiant Sunstone"][1]}, itemLevel, player, additionalData.contentType)
        return bonus_stats;
      }
    },
        {
      name: "Unstable Felheart Crystal",
      description: "Might find niche use in Mythic+ as a single target shield. The tuning is not really great for its 2-minute cooldown.",
      addonDescription: "",
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
      description: "The flat intellect is the only thing keeping it from the bottom of the chart.",
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
        
        if (additionalData.includeTooltip) {
          additionalData.tooltipData.push({name: "Expected Ally Buff %", value: (versatilityRatio * 100) + "%"})

        }

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

            if (additionalData.includeTooltip) {
              additionalData.tooltipData.push({name: "Pick up %", value: data[0].efficiency! * 100 + "%"})
            }

            return bonus_stats;
            }
    },
      { // 
        name: "Freightrunner's Flask",
        description: "A reasonable crit on-use trinket that just isn't tuned high enough to find a permanent home.",
        addonDescription: "",
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
        name: "Stormbound Emblem of Dazar",
        description: "An on-use haste trinket is hypothetically fine, but the 2s channel time absolutely buries it - even for specs that really enjoy Haste.",
        addonDescription: "",
        effects: [
          { // Haste on-use, does have a ramp up period.
            duration: 20,
            cooldown: 120, //
            stat: "haste",
          },
        ],
        runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
          let bonus_stats: Stats = {};
    
          bonus_stats[data[0].stat!] = runGenericOnUseTrinket({...data[0], ...trinketRawData["Stormbound Emblem of Dazar"][0]}, itemLevel, additionalData.castModel)
          bonus_stats.hps = (-2 * player.getHPS(additionalData.contentType) / 60);

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
      { // Could be modelled better, but the trinket isn't very relevant.
        name: "Nevermelting Ice Crystal",
        description: "A brutally long cooldown reduces any real potential.",
        addonDescription: "A brutally long cooldown reduces any real potential.",
        effects: [
          { // 
            duration: 20,
            cooldown: 180, //
            stat: "crit",
          },
        ],
        runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
          let bonus_stats: Stats = {};
    
          bonus_stats[data[0].stat!] = runGenericOnUseTrinket({...data[0], ...trinketRawData["Nevermelting Ice Crystal"][0]}, itemLevel, additionalData.castModel) * 2.5
          
          return bonus_stats;
        }
      },


]; 