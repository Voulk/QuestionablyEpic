import { createModifiersFromModifierFlags } from "typescript";
import SPEC from "../../Engine/SPECS";
import { druidDefaultSpecialQueries, druidDefaultSpellData, druidDefaultStatWeights } from "./ClassDefaults/DruidDefaults";
import { paladinVenthyrSpecialQueries, paladinVenthyrSpellData, paladinVenthyrStatWeights } from "./ClassDefaults/Paladin/PaladinDefaults";
import { paladinKyrianSpecialQueries, paladinKyrianSpellData, paladinKyrianStatWeights } from "./ClassDefaults/Paladin/PaladinKyrian";
import { paladinMaraadsSpellData, paladinMaraadsSpecialQueries, paladinMaraadsStatWeights } from "./ClassDefaults/Paladin/PaladinMaraadsRaid";
import { shamanDefaultSpecialQueries, shamanDefaultSpellData, shamanDefaultStatWeights } from "./ClassDefaults/ShamanDefaults";
import { monkDefaultSpecialQueries, monkDefaultSpellData, monkDefaultStatWeights } from "./ClassDefaults/Monk/MonkDefaults";
import { monkSinSpecialQueries, monkSinSpellData, monkSinStatWeights } from "./ClassDefaults/Monk/MonkSinTeachings";
import { holyPriestDefaultSpecialQueries, holyPriestDefaultSpellData, holyPriestDefaultStatWeights } from "./ClassDefaults/HolyPriestDefaults";
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
      hps: 9500,
      rawhps: 12540,
      dps: 1000,
      fightLength: 340,
      reportID: "Default",
      bossName: "Default",
    };

    let spellList = {};
    let specialQueries = {};
    if (spec === SPEC.RESTODRUID) {
      this.modelName = "Default";
      spellList = druidDefaultSpellData(contentType);
      specialQueries = druidDefaultSpecialQueries(contentType);
      this.baseStatWeights = druidDefaultStatWeights(contentType);
      this.fightInfo.dps = (contentType === "Raid" ? 700 : 3600);

    } else if (spec === SPEC.HOLYPALADIN) {
      if (modelID === "Kyrian Default") {
        this.modelName = "Kyrian Default";
        spellList = paladinKyrianSpellData(contentType);
        specialQueries = paladinKyrianSpecialQueries(contentType);
        this.baseStatWeights = paladinKyrianStatWeights("Raid");
        this.fightInfo.dps = 1650;
      }
      else if (modelID === "Venthyr Maraads") {
        this.modelName = "Venthyr Maraads"
        spellList = paladinMaraadsSpellData(contentType);
        specialQueries = paladinMaraadsSpecialQueries(contentType);
        this.baseStatWeights = paladinMaraadsStatWeights("Raid");
        this.fightInfo.dps = 1900;
      }
      else if (modelID === "Venthyr Default") {
        this.modelName = "Venthyr Default";
        spellList = paladinVenthyrSpellData(contentType);
        specialQueries = paladinVenthyrSpecialQueries(contentType);
        this.baseStatWeights = paladinVenthyrStatWeights("Raid");
        this.fightInfo.dps = 2100;
      }
      else if (modelID === "Default") { // Dungeon
        this.modelName = "Default";
        spellList = paladinKyrianSpellData(contentType);
        specialQueries = paladinKyrianSpecialQueries(contentType);
        this.baseStatWeights = paladinKyrianStatWeights(contentType);
        this.fightInfo.dps = 4800;
      }

    } else if (spec === SPEC.RESTOSHAMAN) {
      this.modelName = "Default";
      spellList = shamanDefaultSpellData(contentType);
      specialQueries = shamanDefaultSpecialQueries(contentType);
      this.baseStatWeights = shamanDefaultStatWeights(contentType);
      this.fightInfo.dps = (contentType === "Raid" ? 825 : 4600);

      // --- Mistweaver Monk
    } else if (spec === SPEC.MISTWEAVERMONK) {

      if (modelID === "Raid Default") {
        this.modelName = "Raid Default"
        spellList = monkDefaultSpellData("Raid");
        specialQueries = monkDefaultSpecialQueries("Raid");
        this.baseStatWeights = monkDefaultStatWeights("Raid");
        this.fightInfo.dps = 1200;
      }
      else if (modelID === "Dungeon Default") {
        this.modelName = "Dungeon Default"
        spellList = monkDefaultSpellData("Dungeon");
        specialQueries = monkDefaultSpecialQueries(contentType);
        this.baseStatWeights = monkDefaultStatWeights("Dungeon");
        this.fightInfo.dps = 2100;
      }
      else if (modelID === "Sinister Teachings") {
        this.modelName = "Sinister Teachings"
        spellList = monkSinSpellData(contentType);
        specialQueries = monkSinSpecialQueries(contentType);
        this.baseStatWeights = monkSinStatWeights("Raid");
        this.fightInfo.dps = 1600;
      }

    } else if (spec === SPEC.DISCPRIEST) {
      if (modelID === "Kyrian Evangelism") {
        this.modelName = "Kyrian Evangelism";
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
        this.fightInfo.dps = (contentType === "Raid" ? 1300 : 4100);
      }


    } else if (spec === SPEC.HOLYPRIEST) {
      this.modelName = "Default";
      spellList = holyPriestDefaultSpellData(contentType);
      specialQueries = holyPriestDefaultSpecialQueries(contentType);
      this.baseStatWeights = holyPriestDefaultStatWeights(contentType);
      this.fightInfo.dps = (contentType === "Raid" ? 875 : 2100);
    } 
    
    // Burning Crusade Profiles
    else if (spec === "Restoration Druid BC") {
      spellList = this.getClassicDruid();
    } else if (spec === "Restoration Shaman BC") {
      spellList = this.getClassicShaman();
    } else if (spec === "Holy Priest BC") {
      spellList = this.getClassicPriest();
    } else if (spec === "Holy Paladin BC") {
      spellList = this.getClassicPaladin();
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
    this.specialQueries.rampData = getRampData(stats, trinkets);
    //this.baseStatWeights = genStatWeights(stats);

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
