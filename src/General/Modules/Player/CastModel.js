import { createModifiersFromModifierFlags } from "typescript";
import SPEC from "../../Engine/SPECS";
import { druidDefaultSpecialQueries, druidDefaultSpellData, druidDefaultStatWeights } from "./RestorationDruid/DruidHealingFocus";
import { druidBalancedSpecialQueries, druidBalancedSpellData, druidBalancedStatWeights } from "./RestorationDruid/DruidBalancedFocus";

import { paladinACSpecialQueries, paladinACSpellData, paladinACStatWeights } from "./ClassDefaults/Paladin/PaladinAvengingCrusader";
import { paladinMeleeSpecialQueries, paladinMeleeSpellData, paladinMeleeStatWeights } from "./ClassDefaults/Paladin/PaladinHerald";

import { shamanDefaultSpecialQueries, shamanDefaultSpellData, shamanDefaultStatWeights } from "./ClassDefaults/ShamanDefaults";
import { monkDefaultSpecialQueries, monkDefaultSpellData, monkDefaultStatWeights } from "./ClassDefaults/Monk/MonkDefaults";
import { runChijiCastModel, modelChijiOnUseTrinket, chijiSpecialQueries, chijiSpellData, chijiStatWeights } from "./ClassDefaults/Monk/MonkChiji";
import { holyPriestDefaultSpecialQueries, holyPriestDefaultSpellData, holyPriestDefaultStatWeights } from "./ClassDefaults/HolyPriestDefaults";
import { chronoDefaultSpecialQueries, chronoDefaultSpellData, chronoDefaultStatWeights } from "./ClassDefaults/Evoker/ChronowardenEvokerDefaults";
import { evokerDefaultSpecialQueries, evokerDefaultSpellData, evokerDefaultStatWeights, runFlameshaperCastModel } from "./ClassDefaults/Evoker/FlameshaperEvokerDefaults";
import { discPriestDefaultSpecialQueries, discPriestDefaultSpellData, discPriestDefaultStatWeights } from "./DisciplinePriest/DiscPriestVoidweaver";
import { discPriestOracleSpecialQueries, discPriestOracleStatWeights, runOracleCastModel, modelOracleOnUseTrinket } from "./DisciplinePriest/DiscPriestOracle";

import { holyPriestDefaults } from "General/Modules/Player/ClassDefaults/Classic/HolyPriestClassic"
import { discPriestDefaults } from "General/Modules/Player/ClassDefaults/Classic/DisciplinePriestClassic"
import { holyPaladinDefaults } from "General/Modules/Player/ClassDefaults/Classic/HolyPaladinClassic"
import { restoDruidDefaults } from "General/Modules/Player/ClassDefaults/Classic/RestoDruidClassic"

import { getRampData, genStatWeights } from "General/Modules/Player/DisciplinePriest/DiscPriestUtilities";

class CastModel {
  constructor(spec, contentType, modelID, arrID) {
    this.contentType = contentType;
    this.arrayID = arrID;
    this.modelType = {"Raid": "", "Dungeon": ""};
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
  modelType = {"Raid": "Default", "Dungeon": "Default"};

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
      hps: 2250000,
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
        this.fightInfo.dps = (contentType === "Raid" ? 30000 : 90000);
      }
      else if (modelID === "Balanced") {
        this.modelName = "Balanced";
        spellList = druidBalancedSpellData(contentType);
        specialQueries = druidBalancedSpecialQueries(contentType);
        this.baseStatWeights = druidBalancedStatWeights(contentType);
        this.fightInfo.dps = (contentType === "Raid" ? 7000 : 180000);

      }

    } else if (spec === SPEC.HOLYPALADIN) {
      if (modelID === "Herald of the Sun") {
        this.modelName = "Herald of the Sun";
        spellList = paladinMeleeSpellData(contentType);
        specialQueries = paladinMeleeSpecialQueries(contentType);
        this.baseStatWeights = paladinMeleeStatWeights("Raid");
        this.fightInfo.dps = 17000;
      }
      else if (modelID === "Lightsmith") {
        this.modelName = "Lightsmith";
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

      if (modelID === "Yu'lon") {
        this.modelName = "Yu'lon"
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
      else if (modelID === "Chi-Ji (Beta)") {
        this.modelName = "Chi-Ji (Beta)"
        this.modelType["Raid"] = "CastModel";
        this.modelType["Dungeon"] = "Default";
        this.runCastModel = runChijiCastModel;
        this.modelOnUseTrinket = modelChijiOnUseTrinket;
        spellList = chijiSpellData(contentType);
        specialQueries = chijiSpecialQueries(contentType);
        this.baseStatWeights = chijiStatWeights("Raid");
        this.fightInfo.dps = 600000;
      }

    } else if (spec === SPEC.DISCPRIEST) {
        if (modelID === "Oracle (Beta)") {
          this.modelName = "Oracle (Beta)";
          this.modelType["Raid"] = "Default";
          this.modelType["Dungeon"] = "Default";
          this.runCastModel = runOracleCastModel;
          this.modelOnUseTrinket = modelOracleOnUseTrinket;
          spellList = {};
          specialQueries = discPriestOracleSpecialQueries(contentType);
          this.baseStatWeights = discPriestOracleStatWeights(contentType);
          this.fightInfo.dps = (contentType === "Raid" ? 200000 : 400000);
        }
        else {
          this.modelName = "Voidweaver";
          spellList = discPriestDefaultSpellData(contentType);
          specialQueries = discPriestDefaultSpecialQueries(contentType);
          this.baseStatWeights = discPriestDefaultStatWeights(contentType);
          this.fightInfo.dps = (contentType === "Raid" ? 200000 : 400000);
        }

    } else if (spec === SPEC.HOLYPRIEST) {
      this.modelName = "Default";
      spellList = holyPriestDefaultSpellData(contentType);
      specialQueries = holyPriestDefaultSpecialQueries(contentType);
      this.baseStatWeights = holyPriestDefaultStatWeights(contentType);
      this.fightInfo.dps = (contentType === "Raid" ? 7000 : 90000);
    } 
    else if (spec === SPEC.PRESEVOKER) {
      if (modelID === "Chronowarden" || modelID === "Default") {
        // TODO
        this.modelName = "Chronowarden";
        //this.modelType = "CastModel";
        spellList = chronoDefaultSpellData(contentType);
        specialQueries = chronoDefaultSpecialQueries(contentType);
        this.baseStatWeights = chronoDefaultStatWeights(contentType);
        this.fightInfo.dps = (contentType === "Raid" ? 6000 : 60000);
      }
      else if (modelID === "Flameshaper") {
        // TODO
        this.modelName = "Flameshaper";
        this.modelType["Raid"] = "CastModel";
        this.modelType["Dungeon"] = "Default";
        this.runCastModel = runFlameshaperCastModel;
        spellList = evokerDefaultSpellData(contentType);
        specialQueries = evokerDefaultSpecialQueries(contentType);
        this.baseStatWeights = evokerDefaultStatWeights(contentType);
        this.fightInfo.dps = (contentType === "Raid" ? 6000 : 60000);
      }

    } 
    
    // Classic Profiles
    else if (spec === "Restoration Druid Classic") {
      this.profile = restoDruidDefaults;
      this.baseStatWeights = this.profile.defaultStatWeights;
    } 
    else if (spec === "Holy Priest Classic") {
      this.profile = holyPriestDefaults;
      this.baseStatWeights = this.profile.defaultStatWeights;
    } 
    else if (spec === "Holy Paladin Classic") {
      this.profile = holyPaladinDefaults;
      this.baseStatWeights = this.profile.defaultStatWeights;
    } 
    else if (spec === "Discipline Priest Classic") {
      this.profile = discPriestDefaults;
      this.baseStatWeights = this.profile.defaultStatWeights;
    } 
    else if (spec === "Restoration Shaman Classic") {
      spellList = {};
      this.baseStatWeights = druidDefaultStatWeights(contentType);
    } 
    else if (spec === "Mistweaver Monk Classic") {
      spellList = {};
      this.baseStatWeights = druidDefaultStatWeights(contentType);
    } 
    else {
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
