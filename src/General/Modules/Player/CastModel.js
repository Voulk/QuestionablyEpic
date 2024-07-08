import { createModifiersFromModifierFlags } from "typescript";
import SPEC from "../../Engine/SPECS";
import { druidDefaultSpecialQueries, druidDefaultSpellData, druidDefaultStatWeights } from "./RestorationDruid/DruidHealingFocus";
import { druidBalancedSpecialQueries, druidBalancedSpellData, druidBalancedStatWeights } from "./RestorationDruid/DruidBalancedFocus";

import { paladinACSpecialQueries, paladinACSpellData, paladinACStatWeights } from "./ClassDefaults/Paladin/PaladinAvengingCrusader";
import { paladinMeleeSpecialQueries, paladinMeleeSpellData, paladinMeleeStatWeights } from "./ClassDefaults/Paladin/PaladinMelee";

import { shamanDefaultSpecialQueries, shamanDefaultSpellData, shamanDefaultStatWeights } from "./ClassDefaults/ShamanDefaults";
import { monkDefaultSpecialQueries, monkDefaultSpellData, monkDefaultStatWeights } from "./ClassDefaults/Monk/MonkDefaults";
import { monkTearSpecialQueries, monkTearSpellData, monkTearStatWeights } from "./ClassDefaults/Monk/MonkTear";
import { holyPriestDefaultSpecialQueries, holyPriestDefaultSpellData, holyPriestDefaultStatWeights } from "./ClassDefaults/HolyPriestDefaults";
import { evokerDefaultSpecialQueries, evokerDefaultSpellData, evokerDefaultStatWeights } from "./ClassDefaults/EvokerDefaults";
import { discPriestDefaultSpecialQueries, discPriestDefaultSpellData, discPriestDefaultStatWeights } from "./DiscPriest/DiscPriestDefaults";
import { getRampData, genStatWeights } from "General/Modules/Player/DiscPriest/DiscPriestUtilities";

class CastModel {
  constructor(spec, contentType, modelID, arrID) {
    this.contentType = contentType;
    this.arrayID = arrID;
    this.setDefaults(spec, contentType, modelID);
  }

  spellList = {};
  specialQueries = {};
  fightInfo = {};
  contentType = "";
  reportID = "";
  bossName = "";
  statWeights = {};
  modelName = "";
  arrayID = 0;
  baseStatWeights = {}

  setSpellList = (spellListing) => {
    this.spellList = spellListing;
  };

  setFightInfo = (info) => {
    this.fightInfo = info;
  };

  getSpellData = (spellName, tag) => {
    if (spellName in this.spellList && tag in this.spellList[spellName]) {
      return this.spellList[spellName][tag];
    } else {
      return 0;
    }
  };

  getFightInfo = (tag) => {
    if (tag in this.fightInfo) {
      return this.fightInfo[tag];
    } else {
      return 0;
    }
  };

  getSpecialQuery = (tag, CDFlag = "") => {
    if (CDFlag === "cooldownMult" && "cooldownMult" in this.specialQueries) return this.specialQueries["cooldownMult"][tag];
    else if (CDFlag === "rampID" && "rampData" in this.specialQueries) return this.specialQueries["rampData"][tag];
    else if (tag in this.specialQueries) return this.specialQueries[tag];
    else return 0;
  };

  setDefaults = (spec, contentType, modelID) => {
    this.fightInfo = {
      hps: 315000,
      rawhps: 475000,
      dps: 12000,
      fightLength: 400,
      reportID: "Default",
      bossName: "Default",
    };

    let spellList = {};
    let specialQueries = {};
    if (spec === SPEC.RESTODRUID) {
      if (modelID === "Healing Focused") {
        this.modelName = "Healing Focused";
        spellList = druidDefaultSpellData(contentType);
        specialQueries = druidDefaultSpecialQueries(contentType);
        this.baseStatWeights = druidDefaultStatWeights(contentType);
        this.fightInfo.dps = (contentType === "Raid" ? 7000 : 50000);
      }
      else if (modelID === "Balanced") {
        this.modelName = "Balanced";
        spellList = druidBalancedSpellData(contentType);
        specialQueries = druidBalancedSpecialQueries(contentType);
        this.baseStatWeights = druidBalancedStatWeights(contentType);
        this.fightInfo.dps = (contentType === "Raid" ? 7000 : 90000);

      }

    } else if (spec === SPEC.HOLYPALADIN) {
      if (modelID === "Melee Default") {
        this.modelName = "Melee Default";
        spellList = paladinMeleeSpellData(contentType);
        specialQueries = paladinMeleeSpecialQueries(contentType);
        this.baseStatWeights = paladinMeleeStatWeights("Raid");
        this.fightInfo.dps = 17000;
      }
      else if (modelID === "Avenging Crusader") {
        this.modelName = "Avenging Crusader";
        spellList = paladinACSpellData(contentType);
        specialQueries = paladinACSpecialQueries(contentType);
        this.baseStatWeights = paladinACStatWeights("Raid");
        this.fightInfo.dps = 15000;
      }
      else if (modelID === "Default") { // Dungeon
        this.modelName = "Default";
        spellList = paladinMeleeSpellData(contentType);
        specialQueries = paladinMeleeSpecialQueries(contentType);
        this.baseStatWeights = paladinMeleeStatWeights(contentType);
        this.fightInfo.dps = 40000;
      }
    } else if (spec === SPEC.RESTOSHAMAN) {
      this.modelName = "Default";
      spellList = shamanDefaultSpellData(contentType);
      specialQueries = shamanDefaultSpecialQueries(contentType);
      this.baseStatWeights = shamanDefaultStatWeights(contentType);
      this.fightInfo.dps = (contentType === "Raid" ? 6000 : 28000);

      // --- Mistweaver Monk
    } else if (spec === SPEC.MISTWEAVERMONK) {

      if (modelID === "Rising Mist") {
        this.modelName = "Rising Mist"
        spellList = monkDefaultSpellData("Raid");
        specialQueries = monkDefaultSpecialQueries("Raid");
        this.baseStatWeights = monkDefaultStatWeights("Raid");
        this.fightInfo.dps = 14000;
      }
      else if (modelID === "Dungeon Default") {
        this.modelName = "Dungeon Default"
        spellList = monkDefaultSpellData("Dungeon");
        specialQueries = monkDefaultSpecialQueries(contentType);
        this.baseStatWeights = monkDefaultStatWeights("Dungeon");
        this.fightInfo.dps = 16000;
      }
      else if (modelID === "Tear of Morning") {
        this.modelName = "Tear of Morning"
        spellList = monkTearSpellData(contentType);
        specialQueries = monkTearSpecialQueries(contentType);
        this.baseStatWeights = monkTearStatWeights("Raid");
        this.fightInfo.dps = 6000;
      }

    } else if (spec === SPEC.DISCPRIEST) {
      if (modelID === "Kyrian Evangelism") {
        this.modelName = "Kyrian Evangelism";
        spellList = discPriestDefaultSpellData(contentType);
        specialQueries = discPriestDefaultSpecialQueries(contentType);
        this.baseStatWeights = discPriestDefaultStatWeights(contentType);
        this.fightInfo.dps = (contentType === "Raid" ? 1300 : 4100);
      }
      else if (modelID === "Venthyr Evangelism") {
        this.modelName = "Venthyr Evangelism";
        spellList = discPriestDefaultSpellData(contentType);
        specialQueries = discPriestDefaultSpecialQueries(contentType);
        this.baseStatWeights = discPriestDefaultStatWeights(contentType);
        this.fightInfo.dps = (contentType === "Raid" ? 1300 : 4100);
      }
      else {
        this.modelName = "Default";
        spellList = discPriestDefaultSpellData(contentType);
        specialQueries = discPriestDefaultSpecialQueries(contentType);
        this.baseStatWeights = discPriestDefaultStatWeights(contentType);
        this.fightInfo.dps = (contentType === "Raid" ? 14000 : 90000);
      }


    } else if (spec === SPEC.HOLYPRIEST) {
      this.modelName = "Default";
      spellList = holyPriestDefaultSpellData(contentType);
      specialQueries = holyPriestDefaultSpecialQueries(contentType);
      this.baseStatWeights = holyPriestDefaultStatWeights(contentType);
      this.fightInfo.dps = (contentType === "Raid" ? 7000 : 90000);
    } 
    else if (spec === SPEC.PRESEVOKER) {
      // TODO
      this.modelName = "Default";
      spellList = evokerDefaultSpellData(contentType);
      specialQueries = evokerDefaultSpecialQueries(contentType);
      this.baseStatWeights = evokerDefaultStatWeights(contentType);
      this.fightInfo.dps = (contentType === "Raid" ? 6000 : 60000);
    } 
    
    // Burning Crusade Profiles
    else if (spec === "Restoration Druid Classic") {
      spellList = this.getClassicDruid();
        this.baseStatWeights = {
          spellpower: 1,
          intellect: 1.9,
          crit: 0.701,
          mastery: 0.801,
          haste: 0.3,
          mp5: 1.46,
          spirit: 0.791,
        };
    } else if (spec === "Restoration Shaman Classic") {
      spellList = this.getClassicShaman();
      this.baseStatWeights = druidDefaultStatWeights(contentType);
    } else if (spec === "Holy Priest Classic") {
      spellList = this.getClassicPriest();
      this.baseStatWeights = druidDefaultStatWeights(contentType);
    } else if (spec === "Holy Paladin Classic") {
      spellList = this.getClassicPaladin();
      this.baseStatWeights = {
        spellpower: 1,
        intellect: 1.645,
        crit: 0.785,
        mastery: 0.398,
        haste: 1.083,
        spirit: 1.123,
        mp5: 1.199
      };
    } 
    else if (spec === "Discipline Priest Classic") {
      spellList = this.getClassicPriest();
      this.baseStatWeights = {
        spellpower: 1,
        intellect: 2.668,
        crit: 0.545,
        mastery: 0.461,
        haste: 0.914,
        spirit: 0.711,
        mp5: 1.028
      }
    } else {
      spellList = {};
      specialQueries = {};
    }

    this.setSpellList(spellList);
    this.specialQueries = specialQueries;
  };

  getBaseStatWeights = () => {
    return this.baseStatWeights;
  }

  setStatWeights = (newWeights) => {
    this.baseStatWeights = newWeights;
  };

  setRampInfo = (stats, trinkets) => {
    this.specialQueries.rampData = getRampData(stats, trinkets, this.modelName);

  }

  getClassicDruid = () => {
    return {
      33763: { cpm: 21.2, avgcast: 4197, overhealing: 0.29 }, // Lifebloom
      774: { cpm: 5.6, avgcast: 3245, overhealing: 0.18 }, // Rejuv
      26980: { cpm: 3.7, avgcast: 5452, overhealing: 0.13 }, // Regrowth R10
      8936: { cpm: 0.6, avgcast: 4321, overhealing: 0.11 }, // Regrowth R8

    };
  }
  // TODO
  getClassicPaladin = () => {
    return {
      27137: { cpm: 19.5, avgcast: 1443, overhealing: 0.14 }, // Flash of Light R7
      19943: { cpm: 4.3, avgcast: 1054, overhealing: 0.18 }, // Flash of Light R6
      27136: { cpm: 4.2, avgcast: 3339, overhealing: 0.19 }, // Holy Light R11

    };
  }
  //TODO
  getClassicShaman = () => {
    return {
      25423: { cpm: 16, avgcast: 5210, overhealing: 0.21 }, // Chain heal generic

    };
  }

  // TODO
  getClassicPriest = () => {
    return {
      774: { cpm: 21.2, avgcast: 4197, overhealing: 0.29 }, // Rejuv - Rankless
      33763: { cpm: 5.6, avgcast: 3245, overhealing: 0.18 }, // Lifebloom R1
      26980: { cpm: 3.7, avgcast: 5452, overhealing: 0.13 }, // Regrowth R10
      8936: { cpm: 0.6, avgcast: 4321, overhealing: 0.11 }, // Regrowth R8

    };
  }

    // Currently being trialled as Discipline only.
  updateStatWeights = (stats, contentType) => {

    // Take the stats on our set and add 5% for the armor bonus and 5% for Arcane Intellect.
    stats.intellect = Math.round(stats.intellect * 1.05 * 1.05);

    // These are stat weights with 0 of each stat on top of the default profile.
    let base_weights = {
        intellect: 1,
        haste: 0.47,
        crit: 0.44,
        mastery: 0.42,
        versatility: 0.43,
        leech: 0.59
    }

    let scaling = {
      haste: 1,
      mastery: 0.72,
      versatility: 0.99,
      intellect: 0.991,
      crit: 0.968,
      leech: 0.31,
    };

    let new_weights = {};

    const baselineScore =
      stats.intellect *
      scaling.intellect *
      (1 + (stats.crit / 35 / 100) * scaling.crit) *
      (1 + (stats.haste / 33 / 100) * scaling.haste) *
      (1 + (stats.mastery / 27.9 / 100) * scaling.mastery) *
      (1 + (stats.versatility / 40 / 100) * scaling.versatility);

    const intScore =
      ((10 + stats.intellect) *
        scaling.intellect *
        (1 + (stats.crit / 35 / 100) * scaling.crit) *
        (1 + (stats.haste / 33 / 100) * scaling.haste) *
        (1 + (stats.mastery / 27.9 / 100) * scaling.mastery) *
        (1 + (stats.versatility / 40 / 100) * scaling.versatility) -
        baselineScore) /
      10;

    /*(((((stats.intellect) * scaling.intellect) * (1 + ((5 + stats.crit) / 35 / 100 * scaling.crit)) * 
                            (1 + (stats.haste / 33 / 100 * scaling.haste)) * (1 + (stats.mastery / 27.9 / 100 * scaling.mastery)) * 
                            (1 + stats.versatility / 40 / 100 * scaling.versatility))) - baselineScore) / 5 / intScore;         */

    //new_weights.intellect = ((100 + stats.intellect * percent_scaling.intellect) * (1 + (stats.crit / 35) * (1 + (stats.haste / 33)))

    for (const [stat, value] of Object.entries(base_weights)) {
      new_weights[stat] = this.getSecWeight(stats, scaling, baselineScore, intScore, stat);
    }
    new_weights.leech = base_weights.leech;

    //console.log(JSON.stringify(base_weights));

    //console.log(JSON.stringify(new_weights));

    this.setStatWeights(new_weights);
  }

  getSecWeight = (baseStats, scaling, baselineScore, intScore, statName) => {
    let stats = { ...baseStats };
    stats[statName] += 5;

    const newWeight =
      (stats.intellect *
        scaling.intellect *
        (1 + (stats.crit / 35 / 100) * scaling.crit) *
        (1 + (stats.haste / 33 / 100) * scaling.haste) *
        (1 + (stats.mastery / 27.9 / 100) * scaling.mastery) *
        (1 + (stats.versatility / 40 / 100) * scaling.versatility) -
        baselineScore) /
      5 /
      intScore;

    return Math.round(1000 * newWeight) / 1000;
  }

}

export default CastModel;
