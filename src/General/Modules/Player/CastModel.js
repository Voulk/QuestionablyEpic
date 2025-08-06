import { createModifiersFromModifierFlags } from "typescript";
import SPEC from "../../Engine/SPECS";
import { druidDefaultSpecialQueries, druidDefaultSpellData, druidDefaultStatWeights } from "./ClassDefaults/RestoDruid/DruidHealingFocus";
import { druidBalancedSpecialQueries, druidBalancedSpellData, druidBalancedStatWeights } from "./ClassDefaults/RestoDruid/DruidBalancedFocus";

import { paladinACSpecialQueries, paladinACSpellData, paladinACStatWeights } from "./ClassDefaults/HolyPaladin/PaladinAvengingCrusader";
import { paladinMeleeSpecialQueries, paladinMeleeSpellData, paladinMeleeStatWeights } from "./ClassDefaults/HolyPaladin/PaladinHerald";

import { shamanDefaultSpecialQueries, shamanDefaultSpellData, shamanDefaultStatWeights } from "./ClassDefaults/RestoShaman/ShamanDefaults";
import { monkDefaultSpecialQueries, monkDefaultSpellData, monkDefaultStatWeights } from "./ClassDefaults/MistweaverMonk/MonkDefaults";
import { runChijiCastModel, modelChijiOnUseTrinket, chijiSpecialQueries, chijiSpellData, chijiStatWeights } from "./ClassDefaults/MistweaverMonk/MonkChiji";
import { holyPriestDefaultSpecialQueries, holyPriestDefaultSpellData, holyPriestDefaultStatWeights } from "./ClassDefaults/HolyPriest/HolyPriestDefaults";
import { chronoDefaultSpecialQueries, chronoDefaultSpellData, chronoDefaultStatWeights } from "./ClassDefaults/PreservationEvoker/ChronowardenEvokerDefaults";
import { evokerDefaultSpecialQueries, evokerDefaultSpellData, evokerDefaultStatWeights, runFlameshaperCastModel } from "./ClassDefaults/PreservationEvoker/FlameshaperEvokerDefaults";
import { discPriestDefaultSpecialQueries, discPriestDefaultSpellData, discPriestDefaultStatWeights } from "./ClassDefaults/DisciplinePriest/DiscPriestDefaults";
import { discPriestOracleSpecialQueries, discPriestOracleStatWeights, runOracleCastModel, modelOracleOnUseTrinket } from "./ClassDefaults/DisciplinePriest/DiscPriestOracle";


import { holyPriestDefaults } from "General/Modules/Player/ClassDefaults/Classic/Priest/HolyPriestClassic"
import { discPriestDefaults } from "General/Modules/Player/ClassDefaults/Classic/Priest/DisciplinePriestClassic"
import { holyPaladinDefaults } from "General/Modules/Player/ClassDefaults/Classic/Paladin/HolyPaladinClassic"
import { restoDruidDefaults } from "General/Modules/Player/ClassDefaults/Classic/Druid/RestoDruidClassic"
import { mistweaverMonkDefaults } from "./ClassDefaults/Classic/Monk/MistweaverMonkClassic";

import { getRampData, genStatWeights } from "General/Modules/Player/ClassDefaults/DisciplinePriest/DiscPriestUtilities";


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
      hps: 3800000,
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
      this.modelName = "Default";
      this.profile = restoDruidDefaults;
      this.baseStatWeights = this.profile.defaultStatWeights;

    } 
    else if (spec === "Holy Priest Classic") {
      this.modelName = "Default";
      this.profile = holyPriestDefaults;
      this.baseStatWeights = this.profile.defaultStatWeights;
    } 
    else if (spec === "Holy Paladin Classic") {
      this.modelName = "Default";
      this.profile = holyPaladinDefaults;
      this.baseStatWeights = this.profile.defaultStatWeights;
    } 
    else if (spec === "Discipline Priest Classic") {
      this.modelName = "Default";
      this.profile = discPriestDefaults;
      this.baseStatWeights = this.profile.defaultStatWeights;
    } 
    else if (spec === "Restoration Shaman Classic") {
      this.modelName = "Default";
      spellList = {};
      this.baseStatWeights = druidDefaultStatWeights(contentType);
    } 
    else if (spec === "Mistweaver Monk Classic") {
      this.modelName = "Default";
      this.profile = mistweaverMonkDefaults;
      this.baseStatWeights = this.profile.defaultStatWeights;
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

}

export default CastModel;
