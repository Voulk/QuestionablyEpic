// Represents a full set of items.
import { getTranslatedItemName } from "../../Engine/ItemUtilities";
import Item from "../../Items/Item";


class ItemSet {
  id: number = 0;
  spec: string;

  // Each item already has a soft score which is a simple stat weight x stat equation. The sumSoftScore adds all of these up.
  // We can use the soft score to quickly eliminate item sets that aren't competitive.
  // The hard score is a proper evaluation of the item set that includes diminishing returns, stats diminishing in relative value as you get more of them,
  // and optimal gemming.
  sumSoftScore: number = 0;
  hardScore: number = 0;

  // The number of sockets in the set
  setSockets: number = 0;

  // The number of each uniquely bound item in the set. Examples include Vault items etc.
  uniques: { [key: string]: number } = {};

  // A list of the effects in the set.
  effectList: ItemEffect[] = []; 

  // The names of the on-use trinkets in the set.
  onUseTrinkets: any[] = []; 
  primGems: any[] = []; // TODO: Check if this is a string or number array. 

  // Enchant Breakdown consists of key: value combos where key is the slot, and the value is the *name* of the enchant.
  // We only use it for display purposes on the report end.
  enchantBreakdown: { [key: string]: string | number | number[] } = {};

  // A list of all items in the set.
  itemList: Item[];

  // The sum stat breakdown of the items in the set.
  setStats: Stats = {
    intellect: 0,
    haste: 0,
    crit: 0,
    versatility: 0,
    mastery: 0,
    leech: 0,
    hps: 0,
    dps: 0,
    mana: 0,
    allyStats: 0,
  };

  // Set bonuses.
  // SetID: Num Pieces pair.
  sets: any =  {};

  // Classic Socket List
  bcSockets: any = {};

  firstSocket: string = ""; // The slot of the first socket in the set. Used to work out where to put our int gem. No effect on scoring.

  report: any;

  constructor(id: number, itemList: Item[], sumSoft: number, spec: string) {
    this.id = id;
    this.itemList = itemList;
    this.sumSoftScore = Math.round(1000 * sumSoft) / 1000;
    this.spec = spec;
  }

    // Create a clone of the current instance
    clone(): ItemSet {
      const clonedSet = new ItemSet(this.id, this.itemList.slice(), this.sumSoftScore, this.spec);
  
      // Copy other properties
      clonedSet.spec = this.spec;
      clonedSet.sumSoftScore = this.sumSoftScore;
      clonedSet.hardScore = this.hardScore;
      clonedSet.setSockets = this.setSockets;
      clonedSet.uniques = { ...this.uniques };
      clonedSet.effectList = this.effectList.slice();
      clonedSet.onUseTrinkets = this.onUseTrinkets.slice();
      clonedSet.primGems = this.primGems.slice();
      clonedSet.enchantBreakdown = { ...this.enchantBreakdown };
      clonedSet.itemList = this.itemList.slice();
      clonedSet.setStats = { ...this.setStats };
      clonedSet.sets = { ...this.sets };
      clonedSet.bcSockets = { ...this.bcSockets };
      clonedSet.firstSocket = this.firstSocket;
      clonedSet.report = this.report;
  
      return clonedSet;
    }

  // This is for testing purposes only. It will print every item in the collection to the console.
  // printSet() {
  //   console.log("Printing Set with ID: " + this.id + ". Soft score: " + this.sumSoftScore + ". Hard Score: " + this.hardScore + " with stats: " + JSON.stringify(this.setStats));
  //   console.log("Sockets: " + this.setSockets);
  //   for (var i = 0; i < this.itemList.length; i++) {
  //     console.log(getTranslatedItemName(this.itemList[i].id, "en") + ". Soft: " + this.itemList[i].softScore + ". Crit: " + this.itemList[i].stats.crit);
  //   }
  // }

  getStartingStats(gameType: gameTypes): Stats {
      const stats: Stats = gameType === "Retail" ? {
        intellect: 2091,
        haste: 0,
        crit: 0,
        mastery: 0,
        versatility: 0,
        leech: 0,
        hps: 0, // Items and effects that give HPS.
        dps: 0,
        mana: 0, // Evoker 2091
        allyStats: 0,
        bonusHPS: 0, // Percent increases to score.
      } :
      {
        spellpower: 0,
        intellect: 169, // Technically changes per race.
        spirit: 188, // Technically changes per race.
        hps: 0,
        mp5: 0,
      }
      if (this.spec === "Restoration Shaman" || this.spec === "Holy Paladin" || this.spec === "Preservation Evoker") stats.intellect = 17647;
      else if (this.spec === "Discipline Priest" || this.spec === "Holy Priest" || this.spec === "Restoration Druid") stats.intellect = 17647;
      else if (this.spec === "Mistweaver Monk") stats.intellect = 17647;
      return stats
  }

  // Compiles the stats from the individual item list.
  compileStats(gameType: gameTypes = "Retail", settings = {}) {
    //console.log("Compiling Stats for Item List of legnth: " + this.itemList.length);
    let setStats =  this.getStartingStats(gameType)
    let setSockets = 0;
    
    if (gameType === "Classic") {
      // Replace every item with a duplicate.
      this.itemList = this.itemList.map(item => JSON.parse(JSON.stringify(item)));
    }

    for (let i = 0; i < this.itemList.length; i++) {
      let item = this.itemList[i];

      for (const [stat, value] of Object.entries(item.stats)) {
        
        //if (stat in setStats) {
          //setStats[stat as keyof Stats] += value || 0;
          setStats[stat as keyof Stats] = (setStats[stat as keyof Stats] || 0) + value;
        //}

      }
      
      if (item.socket) {
        if (this.firstSocket === "") {this.firstSocket = item.slot;}
        setSockets += item.socket;
      }
      
      if (item.uniqueEquip) this.uniques[item.uniqueEquip] = (this.uniques[item.uniqueEquip] || 0) + 1;
      if (item.isCatalystItem) this.uniques['catalyst'] = (this.uniques['catalyst'] || 0) + 1

      if (item.setID) {
        this.sets[item.setID] = (item.setID in this.sets) ? this.sets[item.setID] + 1 : 1;

      }
      if (item.onUse) this.onUseTrinkets.push({name: item.effect.name, level: item.level});
        
      if (item.effect) {
        let effect = item.effect;
        effect.level = item.level;
        if (item.selectedOptions) effect.selectedOptions = item.selectedOptions;
        this.effectList.push(effect);
      }
    }


    this.setStats = setStats;
    //this.baseStats = {...setStats};
    this.setSockets = setSockets;
    
    return this;
  }

  // Check if an item exists in the set
  checkHasItem(itemID: number) {
    return this.itemList.filter(item => item.id === itemID).length > 0
  }

  // Verifies that the set is usable in game. We'll test if it has the correct number of embellishments, no more than 1 vault item and so on.
  verifySet(settings = {}) {
    /*
    if (this.uniques["legendary"] && this.uniques["legendary"] > 1) {
      return false;
    } else if (this.uniques["unity"] && this.uniques["unity"] > 1) {

      return false;
    }  */
    if (this.uniques["embellishment"] && this.uniques["embellishment"] > 2) {
      return false;
    } 
    else if (this.uniques["vault"] && this.uniques["vault"] > 1) {
      return false;
    }
    else if (this.uniques["alchstone"] && this.uniques["alchstone"] > 1) {
      return false;
    }
    else if (this.uniques["crafted"] && this.uniques["crafted"] > 1) {
      return false;
    }
    // TODO: Come back to this when TopGearEngine has been converted to TS and remove the any override.
    else if (this.uniques["catalyst"] && 'catalystLimit' in settings && this.uniques["catalyst"] > ((settings.catalystLimit as any).value as any)) {
      return false;
    } 
     else {
      return true;
    }
  }
}

export default ItemSet;
