import { calcStatsAtLevel, getItemAllocations, getItemProp } from "../../Engine/ItemUtilities";
import { CONSTRAINTS, setBounds } from "../../Engine/CONSTRAINTS";

// The Item class represents an active item in the app at a specific item level.
// We'll create them when we import a SimC string, or when an item is added manually.
// Items are stored in the players character. They are not currently stored in local storage but that is a likely addition soon after release.
class Item {
  constructor(id, name, slot, socket, tertiary, softScore = 0, level, bonusIDS) {
    this.id = id;
    this.name = name;
    this.level = setBounds(level, CONSTRAINTS.Retail.minItemLevel, CONSTRAINTS.Retail.maxItemLevel); //Math.max(1, Math.min(300, level));
    this.slot = slot;
    this.socket = socket;
    this.tertiary = tertiary === "Leech" || tertiary === "Avoidance" ? tertiary : "";
    this.softScore = softScore;
    this.uniqueHash = this.getUnique(id);
    this.bonusIDS = bonusIDS || "";
    this.stats = calcStatsAtLevel(this.level, getItemProp(id, "slot"), getItemAllocations(id), tertiary);
    this.effect = getItemProp(id, "effect");
    this.setID = getItemProp(id, "itemSetId");
    this.uniqueEquip = getItemProp(id, "uniqueEquip").toLowerCase();
    this.onUse = (slot === "Trinket" && getItemProp(id, "onUseTrinket") === true);
    if (this.onUse) this.effect['onUse'] = true;
    if (slot === "Neck") this.socket = 3;

  }

  id = 0; // The items ID
  level = 300; // The items ilvl
  name = ""; // Consider how to store this in a localised form.
  slot = "";
  softScore = 0;
  socket = 0; // Items can once again have more than one socket so we'll store this is an int.
  tertiary = "";
  effect = "";
  uniqueHash = ""; // Technically not a hash.
  uniqueEquip = ""; // Unique Equip type if relevant.
  offhandID = 0; // Only used for correctly translating weapon combos.
  active = false;
  overriddenName = false; // If true, the effect will be used as the items name instead of its ID. So far this is just used for legendaries.
  vaultItem = false;
  isEquipped = false;
  source = {};
  onUse = false;
  setID = 0;
  quality = 3;
  //canBeCatalyzed = false;

  // The stats on the item. These should already be adjusted for item level.
  // HPS is a calculated field. It includes any item effects that provide healing or absorbs.
  stats = {
    intellect: 0,
    stamina: 0,
    haste: 0,
    mastery: 0,
    versatility: 0,
    crit: 0,
    leech: 0,
    hps: 0,
    dps: 0,
    bonus_stats: {
      intellect: 0,
      haste: 0,
      mastery: 0,
      versatility: 0,
      leech: 0,
      hps: 0,
    },
  };

  // To be replaced with a proper method of assigning ID's but this will do for now since duplicates will be very rare and
  // it isn't life crushing if they do ever dup.
  getUnique(id) {
    return id + "" + (Math.floor(Math.random() * 100000) + 1).toString();
  }

  canBeCatalyzed() {
    return !this.isCatalystItem && !this.isLegendary() && ['Head', 'Chest', 'Shoulder', 'Back', 'Wrist', 'Hands', 'Waist', 'Legs', 'Feet'].includes(this.slot);
  }

  /*
  getQualityColor() {
    const isLegendary = this.effect.type === "spec legendary" || this.effect.type === "unity";
    if (isLegendary) return "#ff8000";
    else if (this.level >= 372) return "#a73fee";
    else if (this.level >= 340) return "#328CE3";
    else return "#1eff00";

  } 
  */
  guessQualityColor() {

    if (this.level >= 372) this.quality = 4;
    else if (this.level >= 340) this.quality = 3;
    else this.quality = 2;
  }

  getQualityColor() {
    const isLegendary = this.effect.type === "spec legendary" || this.effect.type === "unity" || this.id === 2068200;
    if (isLegendary) return "#ff8000";
    else if (this.quality === 4) return "#a73fee";
    else if (this.quality === 3) return "#328CE3";
    else return "#1eff00";

  } 

  isLegendary() {
    return this.effect !== "" && (this.effect.type === "unity" || this.effect.type === "spec legendary");
  }

  isTierPiece() {
    return this.setID !== "" && this.slot !== "Trinket"
  }

  addStats(bonus_stats) {
    for (var stat in this.stats) {
      if (stat in bonus_stats) {
        this.stats[stat] = this.stats[stat] + bonus_stats[stat];
      }
    }
  }
}

export default Item;
