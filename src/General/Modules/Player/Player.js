
import SPEC from "../../Engine/SPECS";
import { STATCONVERSION } from "../../Engine/STAT";
import Item from "../../Items/Item";
import { scoreItem, getItemDB } from "../../Engine/ItemUtilities";
import { getUnique } from "./PlayerUtilities";
import CastModel from "./CastModel";
import { druidDefaultStatWeights } from "./ClassDefaults/RestoDruid/DruidHealingFocus";
import { shamanDefaultStatWeights } from "./ClassDefaults/RestoShaman/ShamanDefaults";
import { discPriestDefaultStatWeights } from "./ClassDefaults/DisciplinePriest/DiscPriestDefaults";
import { holyPriestDefaultStatWeights } from "./ClassDefaults/HolyPriest/HolyPriestDefaults";
import { monkDefaultStatWeights } from "./ClassDefaults/MistweaverMonk/MonkDefaults";
import { reportError } from "../../SystemTools/ErrorLogging/ErrorReporting";
import ItemSet from "../../../General/Modules/TopGear/ItemSet";
import { apiGetPlayerImage2, apiGetPlayerAvatar2 } from "../SetupAndMenus/ConnectionUtilities";
import { getBestCombo, convertGemNameToID } from "Retail/Engine/EffectFormulas/Generic/PatchEffectItems/OnyxAnnuletData";
import { classRaceDB } from "Databases/ClassRaceDB";

export class Player {
  constructor(playerName, specName, charID, region, realm, race, statWeights = "default", gameType = "Retail") {
    this.spec = specName.replace("BC", "Classic");
    this.charName = playerName;
    this.charID = charID;

    this.activeItems = [];
    this.region = region || "";
    this.realm = realm || "";
    this.race = race || "";
    this.uniqueHash = getUnique();
    this.charImageURL = "";
    this.charAvatarURL = "";
    this.gameType = gameType;
    this.setupDefaults(specName);
    this.talents = [];
    
    if (gameType === "Retail") {
      
      this.gameType = "Retail";
      if (this.race === "Default" || this.race === "") this.race = classRaceDB[this.spec].races[0];
    }

  }

  uniqueHash = ""; // used for deletion purposes.
  spec = "";
  charID = 0;
  activeItems = [];
  castModel = {}; // Remove once CastModels is complete.
  castModels = [];
  region = "";
  realm = "";
  race = "";
  talents = [];
  gameType = ""; // Currently the options are Retail or Classic
  activeModelID = { Raid: 0, Dungeon: 1 }; // Currently active Cast Model.
  savedPTRString = "";

  // The players active stats from their character page. These are raw rather than being percentages.
  // They can either be pulled automatically from the entered log, or calculated from an entered SimC string.
  // These are used for items like trinkets or spell effects, where a flat healing portion might scale with various secondary stats.
  activeStats = {
    intellect: 1420,
    haste: 400,
    crit: 350,
    mastery: 0,
    versatility: 200,
    stamina: 1900,
  };


  setPlayerAvatars = () => {
    apiGetPlayerImage2(this.region, this.charName, this.realm).then((res) => {
      this.charImageURL = res;
    });

    apiGetPlayerAvatar2(this.region, this.charName, this.realm, this.spec).then((res) => {
      this.charAvatarURL = res;
    });
  };

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
    this.getActiveModel(contentType).setStatWeights(newWeights);
  };

  getCovenant = () => {
    return this.covenant;
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

  scoreActiveItems = (contentType, playerSettings) => {
    for (var i = 0; i < this.activeItems.length; i++) {
      let item = this.activeItems[i];
      item.softScore = scoreItem(item, this, contentType, this.gameType, playerSettings);

      // Error checking
      if (item.softScore < 0) {
        // Scores should never go below 0.
        reportError(this, "Player", "Item scored at below 0. ID: " + item.id, item.softScore);
        throw new Error("Invalid score when scoring active items.");
      }
    }
  };

  // Saved = preset gems from Top Gear.
  getBestPrimordialIDs = (settings, contentType, itemLevel = 242, saved = []) => {

    const automatic = true;

    if (saved.length > 0) return saved;
    else if (automatic) return getBestCombo(this, contentType, 424, this.activeStats, settings);


  }

  // TODO: Right now this just returns all items for testing. Remove the comment to return to it's intended functionality.
  getSelectedItems = () => {
    let temp = this.activeItems.filter(function (item) {
      return item.active === true;
    });
    return this.sortItems(temp);
  };

  getItemByHash = (uniqueHash) => {
    let temp = this.activeItems.filter(function (item) {
      return item.uniqueHash === uniqueHash;
    });
    return temp;
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

  activateAll = () => {
    this.activeItems.forEach((item) => {
      item.active = true;
    })
  }
  
  catalyzeItem = (item) => {
    const slot = item.slot;
    const pClass = this.spec;
    const classTag = {
      "Holy Priest": "Confessor's Unshakable",
      "Discipline Priest": "Confessor's Unshakable",
      "Restoration Druid": "of Reclaiming Blight",
      "Restoration Shaman": "Gale Sovereign's",
      "Mistweaver Monk": "Ageless Serpent's",
      "Holy Paladin": "Aureate Sentry's",
      "Preservation Evoker": "Opulent Treasurescale's",
    };

    const temp = getItemDB("Retail").filter(function (item) {
      return item.slot === slot && item.name.includes(classTag[pClass]);
    });

    if (temp.length > 0) {
      const match = temp[temp.length - 1];
      const newItem = new Item(match.id, "", slot, item.socket, item.tertiary, 0, item.level, "");
      Object.assign(newItem, { isCatalystItem: true });
      newItem.active = true;
      if (item.uniqueEquip === "vault") {
        newItem.uniqueEquip = "vault";
        newItem.vaultItem = true;
      }
      newItem.quality = 4;
      newItem.upgradeTrack = item.upgradeTrack;
      newItem.upgradeRank = item.upgradeRank;
      this.activeItems = this.activeItems.concat(newItem);
    } else {
      // We should probably write an error check here.
    }
  };

  // Options: Convert to Vault, Add socket, change item level.
  upgradeItem = (item, newLevel, socketFlag, vaultFlag) => {

    /*
    const newItem = new Item(item.id, "", item.slot, item.socket, item.tertiary, 0, item.level, "");
    newItem.active = true;
    if (newLevel !== 0) item.level = newLevel;
    if (socketFlag) item.socket = 1;
    if (item.uniqueEquip === "vault") {
      newItem.uniqueEquip = "vault";
      newItem.vaultItem = true;
    }
    newItem.quality = item.quality || 4;
    newItem.itemConversion = item.itemConversion || 0;
    this.activeItems = this.activeItems.concat(newItem); */

    const newItem = item.clone();
    newItem.active = true;
    if (newLevel !== 0) newItem.updateLevel(newLevel, item.missiveStats);
    if (socketFlag) {
      if ((newItem.slot === "Finger" || newItem.slot === "Neck")) {
        newItem.socket = 2;
        newItem.bonusIDS += ":10879"
      }
      else {
        newItem.socket = 1;
        newItem.bonusIDS += ":523"
      }

    }
    if (vaultFlag) {
      newItem.vaultItem = true;
      newItem.uniqueEquip = "vault";
    }
    if (newItem) this.activeItems = this.activeItems.concat(newItem);
    
  };

  embellishItem = (item, embellishmentName) => {

    const newItem = item.clone();
    newItem.active = true;

    newItem.effect = {
      type: "embellishment",
      name: embellishmentName,
      level: item.level,
    }
    newItem.uniqueEquip = "embellishment";
    newItem.bonusIDS = newItem.bonusIDS// + ":" + 11109;
    newItem.updateLevel(item.level, item.missiveStats);

    if (newItem) this.activeItems = this.activeItems.concat(newItem);
    
  };

  changeCustomOption = (item, selectedOption) => {
    const newItem = item.clone();
    newItem.active = true;

    newItem.selectedOptions = selectedOption;
    newItem.bonusIDS = newItem.bonusIDS// + ":" + 11109;
    newItem.updateLevel(item.level, item.missiveStats);
    if (newItem) this.activeItems = this.activeItems.concat(newItem);
    
  };

  // TODO: Move to playerUtilities and just call addItem.
  // @deprecated
  // Use UpgradeItem above.
  cloneAndSocketItem = (item) => {
    const newItem = new Item(item.id, "", item.slot, item.socket, item.tertiary, 0, item.level, "");
    newItem.active = true;
    newItem.socket = 1;
    if (item.uniqueEquip === "vault") {
      newItem.uniqueEquip = "vault";
      newItem.vaultItem = true;
    }
    newItem.quality = item.quality || 4;
    this.activeItems = this.activeItems.concat(newItem);
  }


  sortItems = (container) => {
    // Current default sorting is by HPS but we could get creative here in future.
    container.sort((a, b) => (a.softScore < b.softScore ? 1 : -1));

    return container;
  };


  // Convert the players given stats into a percentage.
  // TODO: Implement Mastery
  getStatPerc = (stat) => {
    stat = stat.toLowerCase();
    let statPerc = 1.0;
    switch (stat) {
      case "haste":
        statPerc = 1 + this.activeStats.haste / STATCONVERSION.HASTE / 100;
        break;
      case "crit":
        statPerc = 1.05 + this.activeStats.crit / STATCONVERSION.CRIT / 100;
        break;
      case "mastery":
        statPerc = 1 + (8 * STATCONVERSION.MASTERY + this.activeStats.mastery) / STATCONVERSION.MASTERY * STATCONVERSION.MASTERYMULT[this.spec] / 100;
        break;
      case "versatility":
        statPerc = 1 + this.activeStats.versatility / STATCONVERSION.VERSATILITY / 100;
        break;
      default:
        break;
    }

    // Round to four decimal places. I'd heavily caution against ever rounding more heavily than this.
    return Math.round(statPerc * 10000) / 10000;
  };

 
  /**
   * @deprecated
   * Use getStatMults now instead. It's much cleaner. This is an abomination.
   */
  getStatMultiplier = (flag, statList = []) => {
    let mult = 1;
    if (flag === "ALL") {
      // Returns a multiplier that includes raw intellect.
      mult = this.getStatPerc("Haste") * this.getStatPerc("Crit") * this.getStatPerc("Versatility") * this.getStatPerc("Mastery") * this.activeStats.intellect;
    } else if (flag === "NOHASTE") {
      // Returns a multiplier that includes raw intellect.
      mult = this.getStatPerc("Crit") * this.getStatPerc("Versatility") * this.getStatPerc("Mastery") * this.activeStats.intellect;
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

  getStatMults = (statList) => {
    let mult = 1;
    statList.forEach((stat) => {
      if (stat === "intellect") mult *= this.activeStats.intellect;
      else mult *= this.getStatPerc(stat);
    });
    return mult;
  }

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
      //reportError(this, "Player", "Invalid Cast Model", this.getSpec());
      return this.castModels[0];
    }
  };

    getActiveProfile = (contentType) => {
    if (this.castModels[this.activeModelID[contentType]]) return this.castModels[this.activeModelID[contentType]].profile;
    else {
      //reportError(this, "Player", "Invalid Cast Model", this.getSpec());
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
      //this.getActiveModel("Raid").updateStatWeights(stats, "Raid");
      this.getActiveModel("Raid").setRampInfo(stats);
      this.getActiveModel("Dungeon").setRampInfo(stats);
    }
  };

  setModelID = (id, contentType) => {
    if ((contentType === "Raid" || contentType === "Dungeon") && id < this.castModels.length) {
      // Check that it's a valid ID.
      this.activeModelID[contentType] = id;

        this.getActiveModel("Raid").setRampInfo(this.activeStats);
        this.getActiveModel("Dungeon").setRampInfo(this.activeStats);
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
  getModelName = (contentType) => {
    return this.getActiveModel(contentType).modelName;
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
    if (spellList) this.getActiveModel("Raid").setSpellList(spellList);
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


  // Consider replacing this with an external table for cleanliness and ease of editing.
  setupDefaults = (spec) => {
    this.castModel = {
      Raid: new CastModel(spec, "Raid"),
      Dungeon: new CastModel(spec, "Dungeon"),
    };
    //console.log(this.castModels);

    if (spec === SPEC.RESTODRUID) {
      this.castModels.push(new CastModel(spec, "Raid", "Healing Focused", 0));
      this.castModels.push(new CastModel(spec, "Dungeon", "Healing Focused", 1));
      this.castModels.push(new CastModel(spec, "Dungeon", "Balanced", 2));

      this.activeStats = {
        intellect: 85000,
        haste: 18500,
        crit: 2050,
        mastery: 14000,
        versatility: 5500,
        stamina: 1900,
      };
    } else if (spec === SPEC.HOLYPALADIN) {
      this.castModels.push(new CastModel(spec, "Raid", "Herald of the Sun", 0));
      this.castModels.push(new CastModel(spec, "Dungeon", "Default", 1));
      this.castModels.push(new CastModel(spec, "Raid", "Lightsmith", 2));
      
      this.activeStats = {
        intellect: 85000,
        haste: 11200,
        crit: 12000,
        mastery: 10800,
        versatility: 1900,
        stamina: 1900,
      };
    } else if (spec === SPEC.RESTOSHAMAN) {
      // all of this needs a proper input once
      this.castModels.push(new CastModel(spec, "Raid", "Default", 0));
      this.castModels.push(new CastModel(spec, "Dungeon", "Default", 1));
      this.activeStats = {
        intellect: 80000,
        haste: 4250,
        crit: 12000,
        mastery: 3300,
        versatility: 11000,
        stamina: 1900,
      };
    } else if (spec === SPEC.DISCPRIEST) {
      this.castModels.push(new CastModel(spec, "Raid", "Voidweaver", 0));
      this.castModels.push(new CastModel(spec, "Dungeon", "Voidweaver", 1));
      this.castModels.push(new CastModel(spec, "Raid", "Oracle (Beta)", 2));
      this.castModels.push(new CastModel(spec, "Dungeon", "Oracle (Beta)", 3));

      this.activeStats = {
        intellect: 85000, 
        haste: 17000,
        crit: 10000,
        mastery: 9800,
        versatility: 2700,
        stamina: 1900,
        critMult: 2,
      };
      this.getActiveModel("Raid").setRampInfo(this.activeStats, []); // TODO; Renable
      this.getActiveModel("Dungeon").setRampInfo(this.activeStats, []); // TODO; Renable
    } else if (spec === SPEC.HOLYPRIEST) {
      this.castModels.push(new CastModel(spec, "Raid", "Default", 0));
      this.castModels.push(new CastModel(spec, "Dungeon", "Default", 1));
      this.activeStats = {
        intellect: 85000,
        haste: 4200,
        crit: 12000,
        mastery: 9700,
        versatility: 6200,
        stamina: 1900,
      }
    }
      else if (spec === SPEC.PRESEVOKER) {
        this.castModels.push(new CastModel(spec, "Raid", "Flameshaper", 0));
        this.castModels.push(new CastModel(spec, "Raid", "Chronowarden", 1));
        this.castModels.push(new CastModel(spec, "Dungeon", "Default", 2));
        this.activeStats = {
          intellect: 85000,
          haste: 2600,
          crit: 7000,
          mastery: 10000,
          versatility: 3400,
          stamina: 30000,
        }
    } else if (spec === SPEC.MISTWEAVERMONK) {
      const models = [
        { identifier: "Yu'lon", content: "Raid" },
        { identifier: "Dungeon Default", content: "Dungeon" },
        { identifier: "Chi-Ji (Beta)", content: "Raid" },
      ];
      models.forEach((model, i) => this.castModels.push(new CastModel(spec, model.content, model.identifier, i)));

      this.activeStats = {
        intellect: 90000,
        haste: 15000,
        crit: 10000,
        mastery: 3400,
        versatility: 8000,
        stamina: 1900,
      };
    } 
    else if (spec.includes("Classic")) {
      //console.log("Setting up classic spec");
      this.castModels.push(new CastModel(spec, "Raid", "Healing Focused", 0));
      this.castModels.push(new CastModel(spec, "Dungeon", "Healing Focused", 0));

      this.activeStats = {
        intellect: 6000,
        spellpower: 3500,
        haste: 1200,
        crit: 1500,
        mastery: 1500,
        spirit: 3000,
        stamina: 1900,
      }
    } else {
      // Invalid spec replied. Error.
      reportError(this, "Player", "Invalid Spec Supplied during setupDefaults", spec);
      throw new Error("Invalid Spec Supplied");
    }
  };
}

export default Player;
