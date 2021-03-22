import { getAvailableClassConduits } from "../Covenants/CovenantUtilities";
import SPEC from "../Engine/SPECS";
import STAT from "../Engine/STAT";
import { scoreItem } from "../Engine/ItemUtilities";
import { getUnique } from "./PlayerUtilities";
import CastModel from "./CastModel";
import { druidDefaultStatWeights } from "./ClassDefaults/DruidDefaults";
import { paladinDefaultStatWeights } from "./ClassDefaults/PaladinDefaults";
import { shamanDefaultStatWeights } from "./ClassDefaults/ShamanDefaults";
import { discPriestDefaultStatWeights } from "./ClassDefaults/DiscPriestDefaults";
import { holyPriestDefaultStatWeights } from "./ClassDefaults/HolyPriestDefaults";
import { monkDefaultStatWeights } from "./ClassDefaults/MonkDefaults";
import { reportError } from "../ErrorLogging/ErrorReporting";

var averageHoTCount = 1.4; // TODO: Build this in correctly and pull it from logs where applicable.

class Player {
  constructor(playerName, specName, charID, region, realm, race, statWeights = "default") {
    this.spec = specName;
    this.charName = playerName;
    this.charID = charID;
    this.setupDefaults(specName);
    this.activeItems = [];
    this.activeConduits = [];
    this.renown = 0;
    this.region = region;
    this.realm = realm;
    this.race = race;
    this.uniqueHash = getUnique();

    if (statWeights !== "default" && statWeights.DefaultWeights === false) this.statWeights = statWeights;
    this.activeConduits = getAvailableClassConduits(specName);

    //this.getStatPerc = getStatPerc;
  }

  uniqueHash = ""; // used for deletion purposes.
  spec = "";
  charID = 0;
  activeItems = [];
  activeConduits = [];
  renown = 0;
  castModel = {};
  covenant = "";
  region = "";
  realm = "";
  race = "";
  talents = [];


  // The players active stats from their character page. These are raw rather than being percentages.
  // They can either be pulled automatically from the entered log, or calculated from an entered SimC string.
  // These are used for items like trinkets or conduits, where a flat healing portion might scale with various secondary stats.
  activeStats = {
    intellect: 1420,
    haste: 400,
    crit: 350,
    mastery: 0,
    versatility: 200,
    stamina: 1490,
  };


  // Stat weights are normalized around intellect.
  // Players who don't insert their own stat weights can use the QE defaults.
  // - Since these change quite often we use a tag. If default = true then their weights will automatically update whenever they open the app.
  // - If they manually enter weights on the other hand, then this automatic-update won't occur.
  statWeights = {
    Raid: {
    },
    Dungeon: {
    },
    DefaultWeights: true,
  };

  editChar = (contentType, name, realm, region, race, weights) => {
    this.charName = name;
    this.realm = realm;
    this.region = region;
    this.race = race;
    this.statWeights[contentType] = weights;
    this.statWeights.DefaultWeights = false;
  };

  getRace = () => {
    return this.race;
  };

  getStatWeight = (contentType, stat) => {
    const lcStat = stat.toLowerCase();
    if (!this.statWeights[contentType]) {
      reportError(this, "Player", "Invalid Stat Weight", stat);
      return 0;
    }

    if (lcStat in this.statWeights[contentType]) {
      return this.statWeights[contentType][lcStat];
    }

    return 0;
  };

  setStatWeights = (newWeights, contentType) => {
    this.statWeights[contentType] = newWeights;
  }

  getCovenant = () => {
    return this.covenant;
  };

  setCovenant = (cov) => {
    if (["night_fae", "venthyr", "necrolord", "kyrian"].includes(cov.toLowerCase())) this.covenant = cov;
    else {
      reportError(this, "Player", "Invalid Covenant Supplied", cov);
      throw new Error("Invalid Covenant Supplied");
    }
  };

  calculateConduits = (contentType) => {
    this.activeConduits.forEach((conduit) => {
      conduit.setHPS(this, contentType);

      //return conduit;
    });
  };

  getActiveConduits = (type) => {
    return this.activeConduits.filter(function (conduits) {
      return conduits.type == type;
    });
  };

  getConduitLevel = (id) => {
    let tempDict = this.activeConduits.filter(function (conduits) {
      return conduits.id === id;
    });

    if (tempDict.length > 0) return tempDict[0].itemLevel;
    else return 142;
  };

  // Used for the purpose of maximising stuff like ring enchants and gems.
  // Returns the players stat that has the highest weight. We should consider how to handle tie breaks.
  getHighestStatWeight = (contentType, ignore = []) => {
    let max = "";
    let maxValue = -1;
    let weights = this.statWeights[contentType];

    for (var stat in weights) {
      if (weights[stat] > maxValue && !ignore.includes(stat) && ["crit", "haste", "mastery", "versatility"].includes(stat)) {
        max = stat;
        maxValue = weights[stat];
      }
    }

    return max;
  };

  addActiveItem = (item) => {
    this.activeItems.push(item);
  };

  clearActiveItems = () => {
    this.activeItems = [];
  };

  getActiveItems = (slot, active = false, equipped = false) => {
    let temp = this.activeItems.filter(function (item) {
      if (slot === "AllMainhands") {
        return (item.slot === "1H Weapon" || item.slot === "2H Weapon") && (!active || item.active) && (!equipped || item.isEquipped);
      } else if (slot === "Offhands") {
        return (item.slot === "Holdable" || item.slot === "Offhand" || item.slot === "Shield") && (!active || item.active) && (!equipped || item.isEquipped);
      } else {
        return item.slot === slot && (!active || item.active) && (!equipped || item.isEquipped);
      }
    });
    return this.sortItems(temp);
  };

  getEquippedItems = (weaponFlag = false) => {
    let temp = this.activeItems.filter(function (item) {
      return item.isEquipped || (weaponFlag && ["Offhand", "Shield", "1H Weapon", "2H Weapon"].includes(item.slot));
    });

    return temp;
  };

  // Returns the players weapons and offhands.
  getTopWeapons = () => {
    let wepArray = [];
    let temp = this.activeItems.filter(function (item) {
      return ["Holdable", "Shield", "Offhand", "1H Weapon", "2H Weapon"].includes(item.slot);
    });
    return this.sortItems(temp);
  };

  scoreActiveItems = (contentType) => {
    for (var i = 0; i < this.activeItems.length; i++) {
      let item = this.activeItems[i];
      item.softScore = scoreItem(item, this, contentType);

      // Error checking
      if (item.softScore < 0) {
        // Scores should never go below 0.
        reportError(this, "Player", "Item scored at below 0", item.softScore);
        throw new Error("Invalid score when scoring active items.");
      }
    }
  };

  // TODO: Right now this just returns all items for testing. Remove the comment to return to it's intended functionality.
  getSelectedItems = () => {
    let temp = this.activeItems.filter(function (item) {
      return item.active === true;
    });
    return this.sortItems(temp);
  };

  deleteActiveItem = (unique) => {
    let tempArray = this.activeItems.filter(function (item) {
      return item.uniqueHash !== unique;
    });
    this.activeItems = tempArray;
  };
  activateItem = (unique) => {
    let tempArray = this.activeItems.filter(function (item) {
      if (item.uniqueHash === unique) item.active = !item.active;
      return item;
    });
    this.activeItems = tempArray;
  };

  sortItems = (container) => {
    // Current default sorting is by HPS but we could get creative here in future.
    container.sort((a, b) => (a.softScore < b.softScore ? 1 : -1));

    return container;
  };

  // Convert the players given stats into a percentage.
  // TODO: Implement Mastery
  getStatPerc = (stat) => {
    var statPerc = 1.0;
    switch (stat) {
      case "Haste":
        statPerc = 1 + this.activeStats.haste / 33 / 100;
        break;
      case "Crit":
        statPerc = 1.05 + this.activeStats.crit / 35 / 100;
        break;
      case "Mastery":
        statPerc = 1; // TODO
        if (this.spec === SPEC.HOLYPALADIN) {
          statPerc = (0.12 + this.activeStats.mastery / 23.3 / 100) * 0.8 + 1; // 0.8 is our average mastery effectiveness.
        } else if (this.spec === SPEC.RESTOSHAMAN) {
          statPerc = 1 + (0.25 * 8 * 35 + this.activeStats.mastery) / (35 / 3) / 100; // .25 is placeholder for mastery effectiveness
        } else if (this.spec === SPEC.RESTODRUID) {
          statPerc = 1 + (0.04 + this.activeStats.mastery / 70 / 100) * 1.8; // 1.8 is the average HoT multiplier.
        } else if (this.spec === SPEC.HOLYPRIEST) {
          statPerc = 1 + (0.1 + this.activeStats.mastery / 27.95 / 100) * 0.9; // Assumes 10% echo of light overhealing. TODO: revisit.
        } else if (this.spec === SPEC.DISCPRIEST) {
          statPerc = 1 + (0.108 + this.activeStats.mastery / 25.9 / 100);
        } else if (this.spec === SPEC.MISTWEAVERMONK) {
          statPerc = 1; // TODO
        }
        break;
      case "Versatility":
        statPerc = 1 + this.activeStats.versatility / 40 / 100;
        break;
      default:
        break;
    }

    // Round to four decimal places. I'd heavily caution against ever rounding more heavily than this.
    return Math.round(statPerc * 10000) / 10000;
  };

  // Returns a stat multiplier.
  getStatMultiplier = (flag, statList = []) => {
    let mult = 1;
    if (flag === "ALL") {
      // Returns a multiplier that includes raw intellect.
      mult = this.getStatPerc("Haste") * this.getStatPerc("Crit") * this.getStatPerc("Versatility") * this.getStatPerc("Mastery") * this.activeStats.intellect;
    } else if (flag === "NOHASTE") {
      // Returns a multiplier that includes raw intellect.
      mult = this.getStatPerc("Haste") * this.getStatPerc("Crit") * this.getStatPerc("Versatility") * this.getStatPerc("Mastery") * this.activeStats.intellect;
    } else if (flag === "ALLSEC") {
      // Returns a multiplier that includes all secondaries but NOT intellect.
      mult = this.getStatPerc("Haste") * this.getStatPerc("Crit") * this.getStatPerc("Versatility") * this.getStatPerc("Mastery");
    } else if (flag === "NOMAST") {
      // Returns a multiplier of Haste / Vers / Crit.
      mult = this.getStatPerc("Haste") * this.getStatPerc("Crit") * this.getStatPerc("Versatility");
    } else if (flag === "CRITVERS") {
      // Returns a multiplier that includes raw intellect.
      mult = this.getStatPerc("Crit") * this.getStatPerc("Versatility");
    } else {
      // Our multiplier consists of whatever is in the stat list array.
      statList.forEach((stat) => {
        mult *= this.getStatPerc(stat);
      });
    }

    return mult;
  };

  updateConduitLevel = (id, newLevel) => {
    for (let i = 0; i < this.activeConduits.length; i++) {
      if (this.activeConduits[i].id === id) {
        this.activeConduits[i].itemLevel = Math.max(145, Math.min(newLevel, 226));
      }
    }
  };

  getRealmString = () => {
    if (this.realm !== undefined && this.region !== undefined) {
      return this.region + " - " + this.realm;
    } else {
      return "Unknown Realm";
    }
  };

  getSpec = () => {
    return this.spec;
  };

  getHPS = (contentType) => {
    return this.castModel[contentType].getFightInfo("hps");
  };
  // HPS including overhealing.
  getRawHPS = (contentType) => {
    return this.castModel[contentType].getFightInfo("rawhps");
  };

  getFightLength = (contentType) => {
    return this.castModel[contentType].getFightInfo("fightLength");
  };

  getInt = () => {
    return this.activeStats.intellect;
  };

  getSpecialQuery = (queryIdentifier, contentType) => {
    return this.castModel[contentType].getSpecialQuery(queryIdentifier);
  };

  getCooldownMult = (queryIdentifier, contentType) => {
    return this.castModel[contentType].getSpecialQuery(queryIdentifier, "cooldownMult");
  }

  getSingleCast = (spellID, contentType, castType = "casts") => {
    return this.castModel[contentType].getSpellData(spellID, "healing") / this.castModel[contentType].getSpellData(spellID, castType);
  };

  getSpellCPM = (spellID, contentType) => {
    return (this.getSpellCasts(spellID, contentType) / this.getFightLength(contentType)) * 60;
  };


  getSpellCasts = (spellID, contentType) => {
    return this.castModel[contentType].getSpellData(spellID, "casts");
  };

  getSpellHPS = (spellID, contentType) => {
    return this.castModel[contentType].getSpellData(spellID, "hps");
  };

  getSpellRawHPS = (spellID, contentType) => {
    return this.castModel[contentType].getSpellData(spellID, "hps") / (1 - this.castModel[contentType].getSpellData(spellID, "overhealing"));
  };

  /* --------------- Return the Spell List for the content Type --------------- */

  getSpellList = (contentType) => {
    return this.castModel[contentType].spellList;
  };

  /* ------------- Return the Saved ReportID from the imported log ------------ */
  getReportID = (contentType) => {
    return this.castModel[contentType].fightInfo.reportID;
  };

  /* ------------ Return the Saved Boss Name from the imported log ------------ */
  getBossName = (contentType) => {
    return this.castModel[contentType].fightInfo.bossName;
  };

  setSpellPattern = (spellList) => {
    if (spellList !== {}) this.castModel["Raid"].setSpellList(spellList);
  };

  setActiveStats = (stats) => {
    if (Object.keys(stats).length > 0) this.activeStats = stats;
  };

  setFightInfo = (info) => {
    if (Object.keys(info).length > 0) this.castModel["Raid"].setFightInfo(info);
  };

  setDefaultWeights = (spec, contentType) => {
    if (spec === SPEC.RESTODRUID) {
      this.statWeights[contentType] = druidDefaultStatWeights(contentType);
      this.statWeights.DefaultWeights = true;
    } else if (spec === SPEC.HOLYPALADIN) {
      this.statWeights[contentType] = paladinDefaultStatWeights(contentType);
      this.statWeights.DefaultWeights = true;
    } else if (spec === SPEC.DISCPRIEST) {
      this.statWeights[contentType] = discPriestDefaultStatWeights(contentType);
      this.statWeights.DefaultWeights = true;
    } else if (spec === SPEC.HOLYPRIEST) {
      this.statWeights[contentType] = holyPriestDefaultStatWeights(contentType);
      this.statWeights.DefaultWeights = true;
    } else if (spec === SPEC.MISTWEAVERMONK) {
      this.statWeights[contentType] = monkDefaultStatWeights(contentType);
      this.statWeights.DefaultWeights = true;
    } else if (spec === SPEC.RESTOSHAMAN) {
      this.statWeights[contentType] = shamanDefaultStatWeights(contentType);
      this.statWeights.DefaultWeights = true;
    } else {
      // Invalid spec replied. Error.
      reportError(this, "Player", "Invalid Spec Supplied for Default Weights", spec);
      throw new Error("Invalid Spec Supplied");
    }
  };

  // Consider replacing this with an external table for cleanliness and ease of editing.
  setupDefaults = (spec) => {
    this.castModel = {
      Raid: new CastModel(spec, "Raid"),
      Dungeon: new CastModel(spec, "Dungeon"),
    };

    if (spec === SPEC.RESTODRUID) {
      this.activeStats = {
        intellect: 1600,
        haste: 790,
        crit: 480,
        mastery: 200,
        versatility: 320,
        stamina: 1400,
      };
      this.statWeights.Raid = druidDefaultStatWeights("Raid");
      this.statWeights.Dungeon = druidDefaultStatWeights("Dungeon");
      this.statWeights.DefaultWeights = true;
    } else if (spec === SPEC.HOLYPALADIN) {

      this.activeStats = {
        intellect: 1600,
        haste: 800,
        crit: 200,
        mastery: 550,
        versatility: 340,
        stamina: 1490,
      };

      this.statWeights.Raid = paladinDefaultStatWeights("Raid");
      this.statWeights.Dungeon = paladinDefaultStatWeights("Dungeon");
      this.statWeights.DefaultWeights = true;
    } else if (spec === SPEC.RESTOSHAMAN) {
      // all of this needs a proper input once
      this.activeStats = {
        intellect: 1600,
        haste: 125,
        crit: 590,
        mastery: 200,
        versatility: 370,
        stamina: 1490,
      };
      this.statWeights.Raid = shamanDefaultStatWeights("Raid");
      this.statWeights.Dungeon = shamanDefaultStatWeights("Dungeon");
      this.statWeights.DefaultWeights = true;
    } else if (spec === SPEC.DISCPRIEST) {
      this.activeStats = {
        intellect: 1600,
        haste: 700,
        crit: 480,
        mastery: 370,
        versatility: 320,
        stamina: 1400,
      };

      this.statWeights.Raid = discPriestDefaultStatWeights("Raid");
      this.statWeights.Dungeon = discPriestDefaultStatWeights("Dungeon");
      this.statWeights.DefaultWeights = true;
    } else if (spec === SPEC.HOLYPRIEST) {
      this.activeStats = {
        intellect: 1600,
        haste: 125,
        crit: 475,
        mastery: 470,
        versatility: 400,
        stamina: 1400,
      };

      this.statWeights.Raid = holyPriestDefaultStatWeights("Raid");
      this.statWeights.Dungeon = holyPriestDefaultStatWeights("Dungeon");
      this.statWeights.DefaultWeights = true;
    } else if (spec === SPEC.MISTWEAVERMONK) {
      this.activeStats = {
        intellect: 1600,
        haste: 125,
        crit: 590,
        mastery: 200,
        versatility: 370,
        stamina: 1490,
      };

      this.statWeights.Raid = monkDefaultStatWeights("Raid");
      this.statWeights.Dungeon = monkDefaultStatWeights("Dungeon");
      this.statWeights.DefaultWeights = true;
    } else {
      // Invalid spec replied. Error.
      reportError(this, "Player", "Invalid Spec Supplied during setupDefaults", spec);
      throw new Error("Invalid Spec Supplied");
    }
  };
}

export default Player;
