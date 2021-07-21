import { createModifiersFromModifierFlags } from "typescript";
import SPEC from "../../Engine/SPECS";
import { druidDefaultSpecialQueries, druidDefaultSpellData } from "./ClassDefaults/DruidDefaults";
import { paladinDefaultSpecialQueries, paladinDefaultSpellData } from "./ClassDefaults/PaladinDefaults";
import { shamanDefaultSpecialQueries, shamanDefaultSpellData } from "./ClassDefaults/ShamanDefaults";
import { monkDefaultSpecialQueries, monkDefaultSpellData } from "./ClassDefaults/MonkDefaults";
import { holyPriestDefaultSpecialQueries, holyPriestDefaultSpellData } from "./ClassDefaults/HolyPriestDefaults";
import { discPriestDefaultSpecialQueries, discPriestDefaultSpellData } from "./ClassDefaults/DiscPriestDefaults";

// THIS IS NOT YET IN USE BUT WILL BE VERY SHORTLY.
class CastModel {
  constructor(spec, contentType) {
    this.contentType = contentType;
    this.setDefaults(spec, contentType);
  }

  spellList = {};
  specialQueries = {};
  fightInfo = {};
  contentType = "";
  reportID = "";
  bossName = "";

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
    else if (tag in this.specialQueries) return this.specialQueries[tag];
    else return 0;
  };

  setDefaults = (spec, contentType) => {
    this.fightInfo = {
      hps: 9300,
      rawhps: 11020,
      dps: 1000,
      fightLength: 340,
      reportID: "Default",
      bossName: "Default",
    };

    let spellList = {};
    let specialQueries = {};
    if (spec === SPEC.RESTODRUID) {
      spellList = druidDefaultSpellData(contentType);
      specialQueries = druidDefaultSpecialQueries(contentType);
      this.fightInfo.dps = 700;
    } else if (spec === SPEC.HOLYPALADIN) {
      spellList = paladinDefaultSpellData(contentType);
      specialQueries = paladinDefaultSpecialQueries(contentType);
      this.fightInfo.dps = 1650;
    } else if (spec === SPEC.RESTOSHAMAN) {
      spellList = shamanDefaultSpellData(contentType);
      specialQueries = shamanDefaultSpecialQueries(contentType);
      this.fightInfo.dps = 725;
    } else if (spec === SPEC.MISTWEAVERMONK) {
      spellList = monkDefaultSpellData(contentType);
      specialQueries = monkDefaultSpecialQueries(contentType);
      this.fightInfo.dps = 1180;
    } else if (spec === SPEC.DISCPRIEST) {
      spellList = discPriestDefaultSpellData(contentType);
      specialQueries = discPriestDefaultSpecialQueries(contentType);
      this.fightInfo.dps = 1300;
    } else if (spec === SPEC.HOLYPRIEST) {
      spellList = holyPriestDefaultSpellData(contentType);
      specialQueries = holyPriestDefaultSpecialQueries(contentType);
      this.fightInfo.dps = 775;
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

}

export default CastModel;
