// Represents a full set of items.
import { getTranslatedItemName, getDomGemEffect } from "../../Engine/ItemUtilities";
import Item from "../Player/Item";
import { STATPERONEPERCENT, BASESTAT } from "../../Engine/STAT";

class ItemSet {
  constructor(id, itemList, sumSoft, spec) {
    this.id = id;
    this.itemList = itemList;
    this.sumSoftScore = Math.round(1000 * sumSoft) / 1000;
    this.spec = spec;
  }

  id = 0;
  spec = "";

  // Each item already has a soft score which is a simple stat weight x stat equation. The sumSoftScore adds all of these up.
  // We can use the soft score to quickly eliminate item sets that aren't competitive.
  // The hard score is a proper evaluation of the item set that includes diminishing returns, stats diminishing in relative value as you get more of them,
  // and optimal gemming.
  sumSoftScore = 0;
  hardScore = 0;
  setSockets = 0;
  setDoms = 0;
  uniques = {};
  effectList = [];
  onUseTrinkets = []; // The names of the on-use trinkets in the set.

  // Enchant Breakdown consists of key: value combos where key is the slot, and the value is the *name* of the enchant.
  // We only use it for display purposes on the report end.
  enchantBreakdown = {};

  // A list of all items in the set.
  itemList = [];

  // The sum stat breakdown of the items in the set.
  setStats = {};

  // Set bonuses
  sets = {};

  // Classic Socket List
  bcSockets = {};

  domSockets = 0; // Number of domination sockets.



  // This is for testing purposes only. It will print every item in the collection to the console.
  // printSet() {
  //   console.log("Printing Set with ID: " + this.id + ". Soft score: " + this.sumSoftScore + ". Hard Score: " + this.hardScore + " with stats: " + JSON.stringify(this.setStats));
  //   console.log("Sockets: " + this.setSockets);
  //   for (var i = 0; i < this.itemList.length; i++) {
  //     console.log(getTranslatedItemName(this.itemList[i].id, "en") + ". Soft: " + this.itemList[i].softScore + ". Crit: " + this.itemList[i].stats.crit);
  //   }
  // }

  getStartingStats(gameType) {
    if (gameType === "Retail") {
      const stats = {
        intellect: 450,
        haste: 0,
        crit: 0,
        mastery: 0,
        versatility: 0,
        leech: 0,
        hps: 0,
        dps: 0,
        mana: 0,
      }
      if (this.spec === "Restoration Shaman" || this.spec === "Holy Paladin") stats.intellect = 473;
      else if (this.spec === "Discipline Priest" || this.spec === "Holy Priest" || this.spec === "Restoration Druid" || this.spec === "Preservation Evoker") stats.intellect = 450;
      else if (this.spec === "Mistweaver Monk") stats.intellect = 452;
      return stats
    }
    else {
      return {
        intellect: 0,
        bonushealing: 0,
        spelldamage: 0,
        spirit: 0,
        spellcrit: 0,
        stamina: 0,
        mp5: 0,
        spellhaste: 0,
        hps: 0,
      }
    }
  }

  // Compiles the stats from the individual item list.
  compileStats(gameType = "Retail", settings = {}) {
    //console.log("Compiling Stats for Item List of legnth: " + this.itemList.length);
    let setStats = this.getStartingStats(gameType)
    let setSockets = 0;
    //let domSockets = 0;
    for (var i = 0; i < this.itemList.length; i++) {
      let item = this.itemList[i];
      for (const [stat, value] of Object.entries(item.stats)) {
        if (stat in setStats) {
          setStats[stat] += value;
          
          //if (stat in item.stats["bonus_stats"]) setStats[stat] += item.stats["bonus_stats"][stat]; // Disabled for now since we handle effects separately. 
        }
      }

      if (item.socket) setSockets++;
      //if (item.hasDomSocket) domSockets++;
      if (item.uniqueEquip) this.uniques[item.uniqueEquip] = (this.uniques[item.uniqueEquip] || 0) + 1;
      if (item.isCatalystItem) this.uniques['catalyst'] = (this.uniques['catalyst'] || 0) + 1
      if (item.effect.type === "spec legendary") this.setLegendary = item.effect.name;
      if (item.effect.type === "unity") this.unity = true;

      if (item.setID) {
        this.sets[item.setID] = (item.setID in this.sets) ? this.sets[item.setID] + 1 : 1;
      }
      if (item.onUse) this.onUseTrinkets.push({name: item.effect.name, level: item.level});
        

      if (item.effect !== "") {
        let effect = item.effect;
        effect.level = item.level;
        this.effectList.push(effect);
      }
    }


    this.setStats = setStats;
    //this.baseStats = {...setStats};
    this.setSockets = setSockets;
    //this.domSockets = domSockets;
    return this;
  }

  verifySet(settings = {}) {
    // Verifies that the set is possible.
    if (this.uniques["legendary"] && this.uniques["legendary"] > 1) {
      return false;
    } else if (this.uniques["unity"] && this.uniques["unity"] > 1) {

      return false;
    } 
    else if (this.uniques["vault"] && this.uniques["vault"] > 1) {
      return false;
    }
    else if (this.uniques["crafted"] && this.uniques["crafted"] > 1) {
      return false;
    }
    else if (this.uniques["catalyst"] && 'catalystLimit' in settings && this.uniques["catalyst"] > settings.catalystLimit) {
      return false;
    } 
     else {
      return true;
    }
  }
}

export default ItemSet;
