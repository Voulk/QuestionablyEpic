import { calcStatsAtLevel, getItemAllocations, getItemProp } from "../../Engine/ItemUtilities";
import { CONSTRAINTS, setBounds } from "../../Engine/CONSTRAINTS";
import Item from "./Item";

// Based on, but not inheriting from Item. Ideally both should use an Interface, or both RetailItem and ClassicItem should inherit from a higher Item parent.
/** 
 * @deprecated
*/
class ClassicItem {
  constructor(id, name, slot, bonusIDS) {
    this.id = id;
    this.name = name;
    this.level = getItemProp(id, "itemLevel", "Classic"); //Math.max(1, Math.min(300, level));
    this.slot = slot;
    this.uniqueHash = this.getUnique(id);
    this.bonusIDS = bonusIDS || "";
    this.effect = getItemProp(id, "effect", "Classic");
    this.stats = getItemProp(id, "stats", "Classic");
    this.setID = getItemProp(id, "itemset", "Classic");
    if (this.stats !== "") this.stats['bonus_stats'] = {};
    this.sockets = getItemProp(id, "sockets", "Classic");
    this.socketedGems = {};

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

  isTierPiece() {
    return false
  }

  canBeCatalyzed() {
    return false;
  }

  getQualityColor() {
    const quality = getItemProp(this.id, "quality", "Classic")
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



export default ClassicItem;
