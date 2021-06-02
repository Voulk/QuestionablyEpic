import { calcStatsAtLevel, getItemAllocations, getItemProp } from "../../Engine/ItemUtilities";
import { CONSTRAINTS, setBounds } from "../../Engine/CONSTRAINTS";
import Item from "./Item";

// Based on, but not inheriting from Item. Ideally both should use an Interface, or both RetailItem and BCItem should inherit from a higher Item parent.
class BCItem {
  constructor(id, name, slot, bonusIDS) {
    this.id = id;
    this.name = name;
    this.level = getItemProp(id, "itemLevel", "BurningCrusade"); //Math.max(1, Math.min(300, level));
    this.slot = slot;
    this.uniqueHash = this.getUnique(id);
    this.bonusIDS = bonusIDS || "";
    this.effect = getItemProp(id, "effect", "BurningCrusade");
    this.stats = getItemProp(id, "stats", "BurningCrusade");
    //console.log("Item ID: " + id + ". Stats: " + this.stats);
    this.setID = getItemProp(id, "itemset", "BurningCrusade");
    if (this.stats !== "") this.stats['bonus_stats'] = {};
    this.sockets = getItemProp(id, "sockets", "BurningCrusade");
    this.socketedGems = {};

    //console.log("Setting level to " + level);
  }

  id = 0; // The items ID
  level = 200; // The items ilvl
  name = ""; // Consider how to store this in a localised form.
  slot = "";
  softScore = 0;
  suffix = 0;

  sockets = {}; // Quantity of each color.
  setID = -1;
  effect = "";
  uniqueHash = ""; // Technically not a hash.
  uniqueEquip = ""; // Unique Equip type if relevant.
  offhandID = 0; // Only used for correctly translating weapon combos.
  active = false;
  isEquipped = false;
  source = {};

  // The stats on the item. These should already be adjusted for item level.
  // HPS is a calculated field. It includes any item effects that provide healing or absorbs.
  stats = {
  };

  // To be replaced with a proper method of assigning ID's but this will do for now since duplicates will be very rare and
  // it isn't life crushing if they do ever dup.
  getUnique(id) {
    return id + "" + (Math.floor(Math.random() * 100000) + 1).toString();
  }

  getQualityColor() {
    const quality = getItemProp(this.id, "quality", "BurningCrusade")
    if (quality === 5) return "#ff8000";
    else if (quality === 4) return "#a73fee";
    else if (quality === 3) return "#328CE3";
    else if (quality === 2) return "#1eff00";
    else return "#ffffff";
  }

  addStats(bonus_stats) {
    for (var stat in this.stats) {
      if (stat in bonus_stats) {
        this.stats[stat] = this.stats[stat] + bonus_stats[stat];
      }
    }
  }

}



export default BCItem;
