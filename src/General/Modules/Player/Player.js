import { getAvailableClassConduits } from "../../../Retail/Modules/Covenants/CovenantUtilities";
import SPEC from "../../Engine/SPECS";
import STAT from "../../Engine/STAT";
import { scoreItem } from "../../Engine/ItemUtilities";
import { getUnique } from "./PlayerUtilities";
import CastModel from "./CastModel";
import { druidDefaultStatWeights } from "./ClassDefaults/DruidDefaults";
import { shamanDefaultStatWeights } from "./ClassDefaults/ShamanDefaults";
import { discPriestDefaultStatWeights } from "./DiscPriest/DiscPriestDefaults";
import { holyPriestDefaultStatWeights } from "./ClassDefaults/HolyPriestDefaults";
import { monkDefaultStatWeights } from "./ClassDefaults/Monk/MonkDefaults";
import { reportError } from "../../SystemTools/ErrorLogging/ErrorReporting";
import ItemSet from "../../../General/Modules/TopGear/ItemSet";
import { apiGetPlayerImage2, apiGetPlayerAvatar2 } from "../SetupAndMenus/ConnectionUtilities";

class Player {
  constructor(playerName, specName, charID, region, realm, race, statWeights = "default", gameType = "Retail") {
    this.spec = specName;
    this.charName = playerName;
    this.charID = charID;

    this.activeItems = [];
    this.activeConduits = [];
    this.renown = 1;
    this.region = region;
    this.realm = realm;
    this.race = race;
    this.uniqueHash = getUnique();
    this.charImageURL = "";
    this.charAvatarURL = "";

    if (gameType === "Retail") {
      this.setupDefaults(specName);
      this.setDefaultCovenant(specName);
      this.activeConduits = getAvailableClassConduits(specName);
      this.gameType = "Retail";
    }
    // console.log(this.charImageURL);
    //if (statWeights !== "default" && statWeights.DefaultWeights === false) this.statWeights = statWeights;

    //this.getStatPerc = getStatPerc;
  }

  uniqueHash = ""; // used for deletion purposes.
  spec = "";
  charID = 0;
  activeItems = [];
  activeConduits = [];
  renown = 1;
  castModel = {}; // Remove once CastModels is complete.
  castModels = [];
  covenant = "";
  region = "";
  realm = "";
  race = "";
  talents = [];
  dominationGemRanks = {
    "Shard of Bek": 0,
    "Shard of Jas": 0,
    "Shard of Rev": 0,
    "Shard of Cor": 0,
    "Shard of Tel": 0,
    "Shard of Kyr": 0,
    "Shard of Dyz": 0,
    "Shard of Zed": 0,
    "Shard of Oth": 0,
  };
  gameType = ""; // Currently the options are Retail or Burning Crusade.
  activeModelID = { Raid: 0, Dungeon: 1 }; // Currently active Cast Model.

  // The players active stats from their character page. These are raw rather than being percentages.
  // They can either be pulled automatically from the entered log, or calculated from an entered SimC string.
  // These are used for items like trinkets or conduits, where a flat healing portion might scale with various secondary stats.
  activeStats = {
    intellect: 1420,
    haste: 400,
    crit: 350,
    mastery: 0,
    versatility: 200,
    stamina: 1900,
  };

  // Stat weights are normalized around intellect.
  // Players who don't insert their own stat weights can use the QE defaults.
  // - Since these change quite often we use a tag. If default = true then their weights will automatically update whenever they open the app.
  // - If they manually enter weights on the other hand, then this automatic-update won't occur.
  statWeights = {
    Raid: {},
    Dungeon: {},
    DefaultWeights: true,
  };

  setPlayerAvatars = () => {
    apiGetPlayerImage2(this.region, this.charName, this.realm).then((res) => {
      this.charImageURL = res;
    });

    apiGetPlayerAvatar2(this.region, this.charName, this.realm, this.spec).then((res) => {
      this.charAvatarURL = res;
    });
  }

  editChar = (contentType, name, realm, region, race, weights) => {
    this.charName = name;
    this.realm = realm;
    this.region = region;
    this.race = race;
    this.getActiveModel(contentType).baseStatWeights = weights;
    //this.statWeights.DefaultWeights = false;
  };

  getRace = () => {
    return this.race;
  };

  getStatWeight = (contentType, stat) => {
    const lcStat = stat.toLowerCase();
    const weights = this.getActiveModel(contentType).getBaseStatWeights();
    if (!weights) {
      reportError(this, "Player", "Invalid Stat Weight", stat);
      return 0;
    }

    if (lcStat in weights) {
      return weights[lcStat];
    }

    return 0;
  };

  setStatWeights = (newWeights, contentType) => {
    //this.statWeights[contentType] = newWeights;
    this.getActiveModel(contentType).setStatWeights(newWeights);
  };

  getCovenant = () => {
    return this.covenant;
  };

  setCovenant = (cov) => {
    let selectedCov = "";
    if (!cov) selectedCov = "";
    else selectedCov = cov;

    selectedCov = selectedCov.toLowerCase().replace(/"/g, "");
    if (["night_fae", "venthyr", "necrolord", "kyrian"].includes(selectedCov)) this.covenant = selectedCov;
    else {
      this.setDefaultCovenant(this.spec);
      //reportError(this, "Player", "Invalid Covenant Supplied", selectedCov);
    }
  };

  getDominationRanks = () => {
    return this.dominationGemRanks;
  };

  getOwnedDominationShards = () => {
    let shardsArray = [];
    for (const [key, value] of Object.entries(this.dominationGemRanks)) {
      if (value >= 0) shardsArray.push(key);
    }
    return shardsArray;
  };

  getDominationSingleRank = (gem) => {
    return this.dominationGemRanks[gem];
  };

  getDominationSetRank = (color) => {
    let setRank = 0;
    if (color === "Unholy") setRank = Math.min(this.dominationGemRanks["Shard of Dyz"], this.dominationGemRanks["Shard of Oth"], this.dominationGemRanks["Shard of Zed"]);
    else if (color === "Blood") setRank = Math.min(this.dominationGemRanks["Shard of Jas"], this.dominationGemRanks["Shard of Rev"], this.dominationGemRanks["Shard of Bek"]);
    else if (color === "Frost") setRank = Math.min(this.dominationGemRanks["Shard of Tel"], this.dominationGemRanks["Shard of Cor"], this.dominationGemRanks["Shard of Kyr"]);

    return Math.max(0, setRank);
  };

  setDominationRanks = (newRanks) => {
    this.dominationGemRanks = newRanks;
  };

  setDefaultCovenant = (spec) => {
    if (spec === "Holy Paladin") this.covenant = "venthyr";
    else if (spec === "Restoration Druid") this.covenant = "night_fae";
    else if (spec === "Restoration Shaman") this.covenant = "necrolord";
    else if (spec === "Mistweaver Monk") this.covenant = "venthyr";
    else if (spec === "Discipline Priest") this.covenant = "kyrian";
    else if (spec === "Holy Priest") this.covenant = "night_fae";
    // This one is very flexible, but is also not used in any current formulas. It will be replaced when the models are updated.
    else {
      reportError(this, "Player", "Invalid Covenant Supplied", spec);
      this.covenant = "night_fae";
      //throw new Error("Invalid Spec Supplied to Cov Default");
    }
  };

  calculateConduits = (contentType) => {
    this.activeConduits.forEach((conduit) => {
      conduit.setHPS(this, contentType);
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
    let weights = this.getActiveModel(contentType).getBaseStatWeights();

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
      item.softScore = scoreItem(item, this, contentType, this.gameType);

      // Error checking
      if (item.softScore < 0) {
        // Scores should never go below 0.
        reportError(this, "Player", "Item scored at below 0. ID: " + item.id, item.softScore);
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

  // Returns a stat multiplier. This function is really bad and needs to be rewritten.
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
        this.activeConduits[i].itemLevel = Math.max(145, Math.min(newLevel, 278));
      }
    }
  };

  /* ------------------------------------- Update renown level ------------------------------------ */
  updateRenownLevel = (renownLevel) => {
    this.renown = Math.max(0, Math.min(renownLevel, 80));
  };

  /* --------------------------------- Return current renown level -------------------------------- */
  getRenownLevel = () => {
    return this.renown;
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

  initializeModels = (raid, dungeon) => {
    if (raid && dungeon && raid !== dungeon && raid < this.castModels.length && dungeon < this.castModels.length) {
      // Check if models are valid choices
      this.activeModelID = { Raid: raid, Dungeon: dungeon };
    } else {
      // The given model IDs were invalid so we'll set the defaults instead.
      this.activeModelID = { Raid: 0, Dungeon: 1 };
    }
  };

  getActiveModel = (contentType) => {
    if (this.castModels[this.activeModelID[contentType]]) return this.castModels[this.activeModelID[contentType]];
    else {
      reportError(this, "Player", "Invalid Cast Model", this.getSpec());
      return this.castModels[0];
    }
  };

  updatePlayerStats = () => {
    let equippedSet = new ItemSet(0, this.getEquippedItems(false), 0, this.spec);

    equippedSet = equippedSet.compileStats();

    let stats = equippedSet.setStats;

    this.activeStats = stats;
    this.activeStats.intellect = Math.round(stats.intellect * 1.05);
    this.activeStats.stamina = 2100; // Stamina is currently not compiled. This is a TODO, but is low impact and priority.
    if (this.spec === "Discipline Priest") {
      this.getActiveModel("Raid").updateStatWeights(stats, "Raid");
      this.getActiveModel("Raid").setRampInfo(stats);
    }
  };

  setModelID = (id, contentType) => {
    if ((contentType === "Raid" || contentType === "Dungeon") && id < this.castModels.length) {
      // Check that it's a valid ID.
      this.activeModelID[contentType] = id;
    } else {
      // This is a critical error that could crash the app so we'll reset models to defaults
      this.activeModelID["Raid"] = 0;
      this.activeModelID["Dungeon"] = 1;
      reportError(this, "Player", "Attempt to set invalid Model ID", id + "/" + contentType);
    }
  };

  getAllModels = (contentType) => {
    if (contentType) {
      return this.castModels.filter(function (model) {
        return model.contentType == contentType;
      });
    } else {
      return this.castModels;
    }
  };

  getHPS = (contentType) => {
    return this.getActiveModel(contentType).getFightInfo("hps");
  };
  getDPS = (contentType) => {
    return this.getActiveModel(contentType).getFightInfo("dps");
  };
  // HPS including overhealing.
  getRawHPS = (contentType) => {
    return this.getActiveModel(contentType).getFightInfo("rawhps");
  };

  // Returns the players health.
  getHealth = (contentType) => {
    const hasFort = contentType === "Raid" || this.spec.includes("Priest");
    return this.activeStats.stamina * 20 * (hasFort ? 1.1 : 1);
  };

  getFightLength = (contentType) => {
    return this.getActiveModel(contentType).getFightInfo("fightLength");
  };

  getInt = () => {
    return this.activeStats.intellect;
  };

  getSpecialQuery = (queryIdentifier, contentType) => {
    return this.getActiveModel(contentType).getSpecialQuery(queryIdentifier);
  };

  getCooldownMult = (queryIdentifier, contentType) => {
    return this.getActiveModel(contentType).getSpecialQuery(queryIdentifier, "cooldownMult");
  };

  getRampID = (queryIdentifier, contentType) => {
    return this.getActiveModel(contentType).getSpecialQuery(queryIdentifier, "rampID");
  };

  getSingleCast = (spellID, contentType, castType = "avgcast") => {
    return this.getActiveModel(contentType).getSpellData(spellID, castType);
  };

  getSpellCPM = (spellID, contentType) => {
    return this.getActiveModel(contentType).getSpellData(spellID, "cpm");
  };

  // Use getSpellCPM where possible.
  getSpellCasts = (spellID, contentType) => {
    return (this.getActiveModel(contentType).getSpellData(spellID, "cpm") * this.getFightLength(contentType)) / 60;
  };

  getSpellHPS = (spellID, contentType) => {
    return this.getActiveModel(contentType).getSpellData(spellID, "hps");
  };

  getSpellRawHPS = (spellID, contentType) => {
    return this.getActiveModel(contentType).getSpellData(spellID, "hps") / (1 - this.getActiveModel(contentType).getSpellData(spellID, "overhealing"));
  };

  /* --------------- Return the Spell List for the content Type --------------- */

  getSpellList = (contentType) => {
    return this.getActiveModel(contentType).spellList;
  };

  /* ------------- Return the Saved ReportID from the imported log ------------ */
  getReportID = (contentType) => {
    if (this.getActiveModel(contentType) && "fightInfo" in this.getActiveModel(contentType)) return this.getActiveModel(contentType).fightInfo.reportID;
    else return "Unknown";
  };

  /* ------------ Return the Saved Boss Name from the imported log ------------ */
  getBossName = (contentType) => {
    return this.getActiveModel(contentType).fightInfo.bossName;
  };

  setSpellPattern = (spellList) => {
    if (spellList !== {}) this.getActiveModel("Raid").setSpellList(spellList);
  };

  setActiveStats = (stats) => {
    if (Object.keys(stats).length > 0) this.activeStats = stats;
  };

  getActiveStats = () => {
    return this.activeStats;
  };

  setFightInfo = (info) => {
    if (Object.keys(info).length > 0) this.getActiveModel("Raid").setFightInfo(info);
  };

  setModelDefaults = (contentType) => {
    const activeModel = this.getActiveModel(contentType);
    activeModel.setDefaults(this.spec, contentType, activeModel.modelName);
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

    //console.log(this.castModels);

    if (spec === SPEC.RESTODRUID) {
      this.castModels.push(new CastModel(spec, "Raid", "Default", 0));
      this.castModels.push(new CastModel(spec, "Dungeon", "Default", 1));

      this.activeStats = {
        intellect: 2000,
        haste: 790,
        crit: 480,
        mastery: 200,
        versatility: 320,
        stamina: 1900,
      };
      /*
      this.statWeights.Raid = druidDefaultStatWeights("Raid");
      this.statWeights.Dungeon = druidDefaultStatWeights("Dungeon");
      this.statWeights.DefaultWeights = true;
      */
    } else if (spec === SPEC.HOLYPALADIN) {
      this.castModels.push(new CastModel(spec, "Raid", "Kyrian Default", 0));
      this.castModels.push(new CastModel(spec, "Dungeon", "Default", 1));
      this.castModels.push(new CastModel(spec, "Raid", "Venthyr Default", 2));
      this.castModels.push(new CastModel(spec, "Raid", "Venthyr Maraads", 3));

      this.activeStats = {
        intellect: 1800,
        haste: 800,
        crit: 240,
        mastery: 550,
        versatility: 340,
        stamina: 1900,
      };
    } else if (spec === SPEC.RESTOSHAMAN) {
      // all of this needs a proper input once
      this.castModels.push(new CastModel(spec, "Raid", "Default", 0));
      this.castModels.push(new CastModel(spec, "Dungeon", "Default", 1));
      this.activeStats = {
        intellect: 1800,
        haste: 125,
        crit: 590,
        mastery: 200,
        versatility: 370,
        stamina: 1900,
      };
      /*
      this.statWeights.Raid = shamanDefaultStatWeights("Raid");
      this.statWeights.Dungeon = shamanDefaultStatWeights("Dungeon");
      this.statWeights.DefaultWeights = true;
      */
    } else if (spec === SPEC.DISCPRIEST) {
      this.castModels.push(new CastModel(spec, "Raid", "Kyrian Evangelism", 0));
      this.castModels.push(new CastModel(spec, "Dungeon", "Default", 1));

      this.activeStats = {
        intellect: 2100,
        haste: 920,
        crit: 610,
        mastery: 220,
        versatility: 415,
        stamina: 1900,
      };
      //this.getActiveModel("Raid").setRampInfo(this.activeStats, []); // TODO; Renable
    } else if (spec === SPEC.HOLYPRIEST) {
      this.castModels.push(new CastModel(spec, "Raid", "Default", 0));
      this.castModels.push(new CastModel(spec, "Dungeon", "Default", 1));
      this.activeStats = {
        intellect: 1800,
        haste: 125,
        crit: 475,
        mastery: 470,
        versatility: 400,
        stamina: 1900,
      };
      /*
      this.statWeights.Raid = holyPriestDefaultStatWeights("Raid");
      this.statWeights.Dungeon = holyPriestDefaultStatWeights("Dungeon");
      this.statWeights.DefaultWeights = true; */
    } else if (spec === SPEC.MISTWEAVERMONK) {
      const models = [
        { identifier: "Raid Default", content: "Raid" },
        { identifier: "Dungeon Default", content: "Dungeon" },
        { identifier: "Sinister Teachings", content: "Raid" },
        { identifier: "Sinister Teachings", content: "Dungeon" },
      ];
      models.forEach((model, i) => this.castModels.push(new CastModel(spec, model.content, model.identifier, i)));

      this.activeStats = {
        intellect: 2000,
        haste: 520,
        crit: 950,
        mastery: 150,
        versatility: 410,
        stamina: 1900,
      };
      /*
      this.statWeights.Raid = monkDefaultStatWeights("Raid");
      this.statWeights.Dungeon = monkDefaultStatWeights("Dungeon");
      this.statWeights.DefaultWeights = true; */
    } else if (spec.includes("BC")) {
    } else {
      // Invalid spec replied. Error.
      reportError(this, "Player", "Invalid Spec Supplied during setupDefaults", spec);
      throw new Error("Invalid Spec Supplied");
    }
  };
}

export default Player;
