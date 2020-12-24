import { getAvailableClassConduits } from "../Covenants/CovenantUtilities";
import SPEC from "../Engine/SPECS";
import STAT from "../Engine/STAT";
import { scoreItem } from "../Engine/ItemUtilities";
import { getUnique } from "./PlayerUtilities";
import CastModel from "./CastModel";

var averageHoTCount = 1.4; // TODO: Build this in correctly and pull it from logs where applicable.

class Player {
  constructor(
    playerName,
    specName,
    charID,
    region,
    realm,
    race,
    statWeights = "default"
  ) {
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

    if (statWeights !== "default" && statWeights.DefaultWeights === false)
      this.statWeights = statWeights;
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

  region = "";
  realm = "";
  race = "";

  // A players spell casting patterns. These are averaged from entered logs and a default is provided too.
  // CASTS, HEALING, HEALINGPERC, HPS,
  castPattern = {
    Raid: {},
    Dungeon: {},
  };

  // Consider special queries a sister dictionary to CastPattern. CastPattern includes *raw* spell data pulled from logs but sometimes
  // we need something more particular. Healing done while channeling Convoke or healing done to a specific target for example.
  // We'll store these here instead for easy access.
  specialQueries = {
    Raid: {},
    Dungeon: {},
  };
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

  fightInfo = {
    hps: 6000,
    rawhps: 9420,
    fightLength: 139,
  };

  // Stat weights are normalized around intellect.
  // Players who don't insert their own stat weights can use the QE defaults.
  // - Since these change quite often we use a tag. If default = true then their weights will automatically update whenever they open the app.
  // - If they manually enter weights on the other hand, then this automatic-update won't occur.
  statWeights = {
    Raid: {
      intellect: 1,
      haste: 0.4,
      crit: 0.4,
      mastery: 0.45,
      versatility: 0.4,
      leech: 0.7,
    },
    Dungeon: {
      intellect: 1,
      haste: 0.4,
      crit: 0.4,
      mastery: 0.4,
      versatility: 0.45,
      leech: 0.7,
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
      return 0;
    }

    if (lcStat in this.statWeights[contentType]) {
      return this.statWeights[contentType][lcStat];
    }

    return 0;
  };

  calculateConduits = (contentType) => {
    //console.log("Calculating Conduits")
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
    let maxValue = 0;
    let weights = this.statWeights[contentType];

    for (var stat in weights) {
      if (
        weights[stat] > maxValue &&
        !ignore.includes(stat) &&
        ["crit", "haste", "mastery", "versatility"].includes(stat)
      ) {
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

  getActiveItems = (slot, active = false) => {
    let temp = this.activeItems.filter(function (item) {
      if (slot === "AllMainhands") {
        return (
          (item.slot === "1H Weapon" || item.slot === "2H Weapon") &&
          (!active || item.active)
        );
      } else if (slot === "Offhands") {
        return (
          (item.slot === "Holdable" ||
            item.slot === "Offhand" ||
            item.slot === "Shield") &&
          (!active || item.active)
        );
      } else {
        return item.slot === slot && (!active || item.active);
      }
    });
    return this.sortItems(temp);
  };

  scoreActiveItems = (contentType) => {
    for (var i = 0; i < this.activeItems.length; i++) {
      let item = this.activeItems[i];
      //console.log(item);
      item.softScore = scoreItem(item, this, contentType);
      //console.log("Updating Score");
    }
  };

  // TODO: Right now this just returns all items for testing. Remove the comment to return to it's intended functionality.
  getSelectedItems = () => {
    let temp = this.activeItems.filter(function (item) {
      return item.active === true;
      //return item;
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
          statPerc = (0.12 + this.activeStats.mastery / 23.3 / 100) * 0.7 + 1;
        } else if (this.spec === SPEC.RESTOSHAMAN) {
          statPerc =
            1 + (0.25 * 8 * 35 + this.activeStats.mastery) / (35 / 3) / 100; // .25 is placeholder for mastery effectiveness
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
    //console.log("Stat: " + stat + ". Perc: " + statPerc);
    return Math.round(statPerc * 10000) / 10000;
  };

  // Returns a stat multiplier.
  getStatMultiplier = (flag, statList = []) => {
    let mult = 1;
    if (flag === "ALL") {
      // Returns a multiplier that includes raw intellect.
      mult =
        this.getStatPerc("Haste") *
        this.getStatPerc("Crit") *
        this.getStatPerc("Versatility") *
        this.getStatPerc("Mastery") *
        this.activeStats.intellect;
    } else if (flag === "NOHASTE") {
      // Returns a multiplier that includes raw intellect.
      mult =
        this.getStatPerc("Haste") *
        this.getStatPerc("Crit") *
        this.getStatPerc("Versatility") *
        this.getStatPerc("Mastery") *
        this.activeStats.intellect;
    } else if (flag === "ALLSEC") {
      // Returns a multiplier that includes all secondaries but NOT intellect.
      mult =
        this.getStatPerc("Haste") *
        this.getStatPerc("Crit") *
        this.getStatPerc("Versatility") *
        this.getStatPerc("Mastery");
    } else if (flag === "NOMAST") {
      // Returns a multiplier of Haste / Vers / Crit.
      mult =
        this.getStatPerc("Haste") *
        this.getStatPerc("Crit") *
        this.getStatPerc("Versatility");
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
        this.activeConduits[i].itemLevel = Math.max(
          145,
          Math.min(newLevel, 226)
        );
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
    //console.log("Fight Length: " + contentType);
    return this.castModel[contentType].getFightInfo("fightLength");
  };

  getInt = () => {
    return this.activeStats.intellect;
  };

  getSpecialQuery = (queryIdentifier, contentType) => {
    return this.castModel[contentType].getSpecialQuery(queryIdentifier);
  };

  getSingleCast = (spellID, contentType) => {
    return (
      this.castModel[contentType].getSpellData(spellID, "healing") /
      this.castModel[contentType].getSpellData(spellID, "casts")
    );
  };

  getSpellCPM = (spellID, contentType) => {
    return (
      (this.getSpellCasts(spellID, contentType) /
        this.getFightLength(contentType)) *
      60
    );
  };

  getSpellCasts = (spellID, contentType) => {
    return this.castModel[contentType].getSpellData(spellID, "casts");
  };

  getSpellHPS = (spellID, contentType) => {
    return this.castModel[contentType].getSpellData(spellID, "hps");
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

  // Consider replacing this with an external table for cleanliness and ease of editing.
  setupDefaults = (spec) => {
    this.castModel = {
      Raid: new CastModel(spec, "Raid"),
      Dungeon: new CastModel(spec, "Dungeon"),
    };

    if (spec === SPEC.RESTODRUID) {
      this.activeStats = {
        intellect: 1420,
        haste: 690,
        crit: 280,
        mastery: 230,
        versatility: 220,
        stamina: 1400,
      };
      this.statWeights = {
        Raid: {
          intellect: 1,
          haste: 0.38,
          crit: 0.34,
          mastery: 0.31,
          versatility: 0.32,
          leech: 0.55,
        },
        Dungeon: {
          intellect: 1,
          haste: 0.38,
          crit: 0.33,
          mastery: 0.37,
          versatility: 0.34,
          leech: 0.23,
        },
        DefaultWeights: true,
      };
    } else if (spec === SPEC.HOLYPALADIN) {
      this.fightInfo = {
        hps: 5500,
        rawhps: 9420,
        fightLength: 180,
      };

      this.activeStats = {
        intellect: 1420,
        haste: 500,
        crit: 200,
        mastery: 210,
        versatility: 240,
        stamina: 1490,
      };

      this.statWeights = {
        Raid: {
          intellect: 1,
          haste: 0.39,
          crit: 0.27,
          mastery: 0.33,
          versatility: 0.32,
          leech: 0.51,
        },
        Dungeon: {
          intellect: 1,
          haste: 0.4,
          crit: 0.36,
          mastery: 0.21,
          versatility: 0.33,
          leech: 0.2,
        },
        DefaultWeights: true,
      };
    } else if (spec === SPEC.RESTOSHAMAN) {
      // all of this needs a proper input once
      this.fightInfo = {
        hps: 5500,
        rawhps: 7000,
        fightLength: 465,
      };
      this.activeStats = {
        intellect: 1420,
        haste: 125,
        crit: 590,
        mastery: 200,
        versatility: 370,
        stamina: 1490,
      };
      this.statWeights = {
        Raid: {
          intellect: 1,
          haste: 0.31,
          crit: 0.36,
          mastery: 0.29,
          versatility: 0.36,
          leech: 0.45,
        },
        Dungeon: {
          intellect: 1,
          haste: 0.34,
          crit: 0.33,
          mastery: 0.29,
          versatility: 0.34,
          leech: 0.19,
        },
        DefaultWeights: true,
      };
    } else if (spec === SPEC.DISCPRIEST) {
      this.fightInfo = {
        hps: 5500,
        rawhps: 9420,
        fightLength: 193,
      };
      this.activeStats = {
        intellect: 1420,
        haste: 500,
        crit: 280,
        mastery: 270,
        versatility: 220,
        stamina: 1400,
      };

      this.statWeights = {
        Raid: {
          intellect: 1,
          haste: 0.36,
          crit: 0.33,
          mastery: 0.34,
          versatility: 0.32,
          leech: 0.49,
        },
        Dungeon: {
          intellect: 1,
          haste: 0.38,
          crit: 0.34,
          mastery: 0.3,
          versatility: 0.33,
          leech: 0.23,
        },
        DefaultWeights: true,
      };
    } else if (spec === SPEC.HOLYPRIEST) {
      this.activeStats = {
        intellect: 1420,
        haste: 125,
        crit: 475,
        mastery: 470,
        versatility: 400,
        stamina: 1400,
      };

      this.statWeights = {
        Raid: {
          intellect: 1,
          haste: 0.28,
          crit: 0.35,
          mastery: 0.35,
          versatility: 0.34,
          leech: 0.56,
        },
        Dungeon: {
          intellect: 1,
          haste: 0.32,
          crit: 0.35,
          mastery: 0.28,
          versatility: 0.35,
          leech: 0.25,
        },
        DefaultWeights: true,
      };
    } else if (spec === SPEC.MISTWEAVERMONK) {
      this.fightInfo = {
        hps: 5500,
        rawhps: 9420,
        fightLength: 193,
      };
      this.activeStats = {
        intellect: 1420,
        haste: 125,
        crit: 590,
        mastery: 200,
        versatility: 370,
        stamina: 1490,
      };

      this.statWeights = {
        Raid: {
          intellect: 1,
          haste: 0.29,
          crit: 0.35,
          mastery: 0.28,
          versatility: 0.34,
          leech: 0.54,
        },
        Dungeon: {
          intellect: 1,
          haste: 0.34,
          crit: 0.35,
          mastery: 0.29,
          versatility: 0.35,
          leech: 0.25,
        },
        DefaultWeights: true,
      };
    }
  };
}

export default Player;
