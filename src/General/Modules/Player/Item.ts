import { calcStatsAtLevel, getItemAllocations, getItemProp } from "../../Engine/ItemUtilities";
import { CONSTRAINTS, setBounds } from "../../Engine/CONSTRAINTS";
import { CONSTANTS } from "General/Engine/CONSTANTS";

// The Item class represents an active item in the app at a specific item level.
// We'll create them when we import a SimC string, or when an item is added manually.
// Items are stored in the players character. They are not currently stored in local storage but that is a likely addition soon after release.
export class Item {
  id: number; // The items ID
  level: number; // The items ilvl
  name: string; // Consider how to store this in a localised form.
  slot: string;
  softScore: number;
  socket: number; // This is an int since items can have more than one socket (neck).
  tertiary: "Leech" | "Avoidance" | ""; // Can probably just be moved to stats.
  stats: Stats = {}; // The stats on a given item.


  effect: ItemEffect;
  uniqueHash: string; // Technically not a hash.
  uniqueEquip: string; // Unique Equip type if relevant.
  active: boolean = false; // An active item is selected for inclusion in Top Gear.
  
  vaultItem: boolean = false; // If true, the item is in a vault and so gains a special Vault color and restriction.
  isEquipped: boolean = false; // If true, the item is currently equipped to the character. This is just used to color differences 
  source = {};
  onUse: boolean = false; // True if the item is an on-use trinket. Can be converted to a tag.
  setID: number = 0; // The set this item belongs to. Frequently used for tier but not exclusively.
  quality: number = 4; // The quality number. 

  upgradeTrack: string = ""; // These two upgrade track variables could be combined into one.
  upgradeRank: number = 0;
  itemConversion?: number = 0; // This tells us which set of items our item can be catalyzed into. 3 = S1, 6 = S2, ? = S3

  bonusIDS: string = "";
  isCatalystItem: boolean = false; // If true, the item has already been catalyzed and is not viable for a second conversion.

  overriddenName: boolean = false; // If true, the effect will be used as the items name instead of its ID. This was used for SL legendaries but nothing in DF.

  offhandID: number = 0; // Only used for correctly translating weapon combos.
  mainHandUniqueHash?: string;
  offHandUniqueHash?: string;
  gemString?: string;

  constructor(id: number, name: string, slot: string, socket: number, tertiary: string, softScore: number = 0, level: number, bonusIDS: string) {
    this.id = id;
    this.name = name;
    this.level = setBounds(level, CONSTRAINTS.Retail.minItemLevel, CONSTRAINTS.Retail.maxItemLevel); //Math.max(1, Math.min(300, level));
    this.slot = slot;
    this.socket = socket;
    this.tertiary = tertiary === "Leech" || tertiary === "Avoidance" ? tertiary : "";
    this.softScore = softScore;
    this.uniqueHash = this.getUnique(id);
    this.stats = calcStatsAtLevel(this.level, getItemProp(id, "slot"), getItemAllocations(id), tertiary);
    this.effect = getItemProp(id, "effect");
    this.setID = getItemProp(id, "itemSetId");
    this.uniqueEquip = getItemProp(id, "uniqueEquip").toLowerCase();
    this.onUse = (slot === "Trinket" && getItemProp(id, "onUseTrinket") === true);
    if (this.onUse) this.effect['onUse'] = true;
    if (slot === "Neck") this.socket = 3; // This is an override to apply 3 sockets to every neck. It makes the app easier to use.

    this.bonusIDS = bonusIDS || "";

  }

  // The stats on the item. These should already be adjusted for item level.
  // HPS is a calculated field. It includes any item effects that provide healing or absorbs.
  /*
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
  }; */

  // To be replaced with a proper method of assigning ID's but this will do for now since duplicates will be very rare and
  // it isn't life crushing if they do ever dup.
  getUnique(id: number) {
    return id + "" + (Math.floor(Math.random() * 100000) + 1).toString();
  }

  canBeCatalyzed() {
    return !this.isCatalystItem && this.itemConversion === CONSTANTS.seasonalItemConversion && ['Head', 'Chest', 'Shoulder', 'Back', 'Wrist', 'Hands', 'Waist', 'Legs', 'Feet'].includes(this.slot);
  }


  // Make an educated guess at what quality an item is based on its level.
  // We'll use this when we don't have access to precise information via SimC string.
  guessItemQuality() {
    if (this.level >= 372) this.quality = 4;
    else if (this.level >= 340) this.quality = 3;
    else this.quality = 2;
  }

  // Get the color tag of an item based on its quality.
  // Special override for legendaries though if we have their SimC string then they'll just naturally be at quality 5 anyway.
  // This could arguably be moved to ItemUtilities.
  getQualityColor() {
    const isLegendary = this.effect.type === "spec legendary" || this.effect.type === "unity" || this.id === 2068200;
    if (isLegendary || this.quality === 5) return "#ff8000";
    else if (this.quality === 4) return "#a73fee";
    else if (this.quality === 3) return "#328CE3";
    else return "#1eff00";
  } 

  isLegendary() {
    return this.effect !== null && (this.effect.type === "unity" || this.effect.type === "spec legendary");
  }

  // This is only of moderate accuracy since there can be non-tier sets that use the same slots as tier.
  // We only use this to color Tier pieces differently so it's ok if it colors non-tier set pieces.
  isTierPiece() {
    return this.setID && this.slot !== "Trinket" && this.slot !== "Finger";
  }

  // This compiles an additional stat array into an item.
  // Useful if an items stats are coming from two different sources.
  addStats(bonus_stats: Stats) {
    for (const stat in this.stats) {
      if (stat in bonus_stats) {
        this.stats[stat as keyof Stats] = (this.stats[stat as keyof Stats] || 0) + (bonus_stats[stat as keyof Stats] || 0)
      }
    }
  }

}

export default Item;
